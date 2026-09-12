import { GET as getBaseConcept } from "../arcsphere/route"
import { BUILDERS_COMPLETE_PATCH } from "./builders-complete-patch"

const PROCESS_PATCH = `
<script id="nguyen-process-service-style-patch">
(() => {
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const compact = (value) => normalize(value).replace(/\\s+/g, '').toLowerCase();

  const processSpecs = [
    {
      sourceDescriptions: [
        'We begin by understanding your goals, requirements, and design vision.',
        'We begin with existing conditions, business needs, zoning, occupancy and local requirements.',
        'We discuss your goals, project scope, budget, timeline, and requirements.'
      ],
      sourceTitles: ['Discovery', 'CONSULTATION'],
      title: 'CONSULTATION',
      number: '1',
      description: 'We discuss your goals, project scope, budget, timeline, and requirements.'
    },
    {
      sourceDescriptions: [
        'Our team develops layouts, ideas, and creative design directions.',
        'We review the site, zoning, codes, constraints, existing conditions, and project feasibility.'
      ],
      sourceTitles: ['Concept Development', 'Existing-Condition Survey & Project Planning', 'SITE ANALYSIS & FEASIBILITY'],
      title: 'SITE ANALYSIS & FEASIBILITY',
      number: '2',
      description: 'We review the site, zoning, codes, constraints, existing conditions, and project feasibility.'
    },
    {
      sourceDescriptions: [
        'Detailed drawings, materials, and spatial specifications are finalized.',
        'We develop the initial layout, massing, design direction, and key project concepts.'
      ],
      sourceTitles: ['Design Development', 'Architecture & Engineering', 'CONCEPT DESIGN'],
      title: 'CONCEPT DESIGN',
      number: '3',
      description: 'We develop the initial layout, massing, design direction, and key project concepts.'
    },
    {
      sourceDescriptions: [
        'We guide implementation to ensure the final result reflects the original design vision.',
        'We support building permit, plan check, corrections, consultants and city coordination through approval.',
        'We coordinate architectural and engineering drawings into a complete permit-ready design.'
      ],
      sourceTitles: ['Execution', 'Implementation', 'Plan Check & Corrections', 'DESIGN & ENGINEERING'],
      title: 'DESIGN & ENGINEERING',
      number: '4',
      description: 'We coordinate architectural and engineering drawings into a complete permit-ready design.'
    }
  ];

  const extraSpecs = [
    {
      title: 'PERMIT SUBMITTAL',
      number: '5',
      description: 'We prepare and submit the permit package to the appropriate city or agency.'
    },
    {
      title: 'PLAN CHECK & APPROVAL',
      number: '6',
      description: 'We respond to plan-check comments and coordinate revisions through approval.'
    }
  ];

  function findProcessCardByDescription(root, spec) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return null;
    const descriptionKeys = new Set(spec.sourceDescriptions.map(compact));
    const titleKeys = new Set(spec.sourceTitles.map(compact));
    const element = root;
    const candidates = [element, ...element.querySelectorAll('*')];

    for (const candidate of candidates) {
      if (!descriptionKeys.has(compact(candidate.textContent))) continue;
      let card = candidate;
      for (let depth = 0; card && depth < 10; depth += 1, card = card.parentElement) {
        const text = compact(card.textContent);
        if (![...titleKeys].some((key) => text.includes(key))) continue;
        if (![...descriptionKeys].some((key) => text.includes(key))) continue;
        return card;
      }
    }
    return null;
  }

  function replaceLeafText(card, sourceValues, replacement) {
    const keys = new Set(sourceValues.map(compact));
    const replacementKey = compact(replacement);
    const candidates = [card, ...card.querySelectorAll('*')];
    for (const candidate of candidates) {
      const key = compact(candidate.textContent);
      if (!keys.has(key)) continue;
      const hasSameTextChild = Array.from(candidate.children).some((child) => compact(child.textContent) === key);
      if (hasSameTextChild) continue;

      // Do not rewrite text that is already correct. Reassigning textContent creates
      // another DOM mutation, which used to retrigger the observer indefinitely and
      // could leave Concept 1 stuck loading.
      if (key !== replacementKey) candidate.textContent = replacement;
      candidate.style.setProperty('white-space', 'normal', 'important');
      candidate.style.setProperty('word-break', 'normal', 'important');
      candidate.style.setProperty('overflow-wrap', 'normal', 'important');
      return candidate;
    }
    return null;
  }

  function patchProcessCard(card, spec, index) {
    card.setAttribute('data-nguyen-process-step', String(index + 1));
    replaceLeafText(card, spec.sourceTitles.concat([spec.title]), spec.title);
    replaceLeafText(card, spec.sourceDescriptions.concat([spec.description]), spec.description);
    replaceLeafText(card, ['01', '02', '03', '04', '1', '2', '3', '4'], spec.number);
  }

  function patchClonedCard(clone, sourceSpec, targetSpec, index) {
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
    clone.setAttribute('data-nguyen-process-step', String(index + 1));
    replaceLeafText(clone, sourceSpec.sourceTitles.concat([sourceSpec.title]), targetSpec.title);
    replaceLeafText(clone, sourceSpec.sourceDescriptions.concat([sourceSpec.description]), targetSpec.description);
    replaceLeafText(clone, ['04', '4'], targetSpec.number);
  }

  function patchProcessSection(root) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return;

    const cards = processSpecs.map((spec, index) => {
      const existing = document.querySelector('[data-nguyen-process-step="' + (index + 1) + '"]');
      const card = existing || findProcessCardByDescription(root, spec) || findProcessCardByDescription(document.body, spec);
      if (card) patchProcessCard(card, spec, index);
      return card;
    });

    if (cards.some((card) => !card)) return;
    const fourth = cards[3];
    const parent = fourth.parentElement;
    if (!parent) return;

    extraSpecs.forEach((spec, offset) => {
      const index = offset + 4;
      if (parent.querySelector(':scope > [data-nguyen-process-step="' + (index + 1) + '"]')) return;
      const clone = fourth.cloneNode(true);
      patchClonedCard(clone, processSpecs[3], spec, index);
      parent.appendChild(clone);
    });
  }

  function patchRoot(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      const parent = root.parentElement;
      if (parent) patchProcessSection(parent);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    patchProcessSection(root);
  }

  patchProcessSection(document.body);
  window.addEventListener('load', () => patchProcessSection(document.body), { once: true });

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') {
        const parent = mutation.target.parentElement;
        if (parent) patchProcessSection(parent);
        continue;
      }
      if (mutation.type === 'childList') mutation.addedNodes.forEach(patchRoot);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => {
    patchProcessSection(document.body);
    observer.disconnect();
  }, 6000);
})();
</script>`;

// The base service interceptor is installed before the later Concept 1 project-card routers. Mark the
// entire Engineering service row with the correct destination at this earlier layer, so every click
// target in the row (including its arrow) resolves to Engineering before any stale Commercial href or
// broad project-card classification can run.
const ENGINEERING_ROUTE_GUARD_PATCH = `
<script id="nguyen-fixed-engineering-route-guard">
(() => {
  if (!window.location.pathname.includes('/client-demos/client-8889/arcsphere-socal')) return;

  const compact = (value) => (value || '').replace(/\\s+/g, '').toLowerCase();
  const TARGET_URL = window.location.origin + '/client-demos/client-8889/residential/services/engineering-approvals';
  const DESCRIPTION_KEYS = [
    'Optimizing layouts to improve functionality, circulation, and spatial flow.',
    'Structural engineering, MEP, Title 24, permitting, and plan-check support coordinated from design through approval.'
  ].map(compact);
  const TITLE_KEYS = new Set([
    compact('ENGINEERING'),
    compact('Existing-Condition Survey & Business Layout')
  ]);

  function hasExactTitle(row) {
    const nodes = [row, ...row.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div')];
    return nodes.some((node) => {
      const key = compact(node.textContent);
      if (!TITLE_KEYS.has(key)) return false;
      return !Array.from(node.children || []).some((child) => compact(child.textContent) === key);
    });
  }

  function isEngineeringRow(row) {
    if (!row || !row.isConnected) return false;
    if (row.parentElement?.getAttribute('data-framer-name') !== 'service_list') return false;
    const text = compact(row.textContent);
    return DESCRIPTION_KEYS.some((key) => text.includes(key)) || hasExactTitle(row);
  }

  function rowFor(start) {
    if (!start || !start.closest) return null;

    const li = start.closest('li');
    if (isEngineeringRow(li)) return li;

    const list = start.closest('[data-framer-name="service_list"]');
    if (!list) return null;
    let row = start;
    while (row && row.parentElement && row.parentElement !== list) row = row.parentElement;
    return isEngineeringRow(row) ? row : null;
  }

  function markRow(row) {
    if (!row || !isEngineeringRow(row)) return;
    row.setAttribute('data-nguyen-engineering-route-guard', 'true');
    row.setAttribute('data-nguyen-link', TARGET_URL);
    row.setAttribute('data-nguyen-card-url', TARGET_URL);
    row.style.setProperty('cursor', 'pointer', 'important');
    row.querySelectorAll('a').forEach((anchor) => {
      anchor.setAttribute('href', TARGET_URL);
      anchor.setAttribute('data-nguyen-link', TARGET_URL);
      anchor.setAttribute('data-nguyen-card-url', TARGET_URL);
      anchor.removeAttribute('target');
      anchor.removeAttribute('rel');
    });
  }

  function markEngineeringRows() {
    document.querySelectorAll('[data-framer-name="service_list"]').forEach((list) => {
      Array.from(list.children).forEach(markRow);
    });
  }

  if (!window.__nguyenFixedEngineeringRouteGuard) {
    window.__nguyenFixedEngineeringRouteGuard = true;
    document.addEventListener('click', (event) => {
      const start = event.target && event.target.nodeType === Node.TEXT_NODE ? event.target.parentElement : event.target;
      const row = start?.closest?.('[data-nguyen-engineering-route-guard="true"]') || rowFor(start);
      if (!row) return;
      event.preventDefault();
      event.stopPropagation();
      if (event.stopImmediatePropagation) event.stopImmediatePropagation();
      window.location.href = TARGET_URL;
    }, true);
  }

  markEngineeringRows();
  window.addEventListener('load', markEngineeringRows, { once: true });
  [50, 150, 300, 700, 1500, 3000, 6000, 12000, 20000, 40000, 60000].forEach((delay) => setTimeout(markEngineeringRows, delay));

  let timer;
  const observer = new MutationObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(markEngineeringRows, 80);
  });
  if (document.body) observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => observer.disconnect(), 61000);
})();
</script>`;

export async function GET() {
  const response = await getBaseConcept();
  if (!response.ok) return response;

  const html = await response.text();
  const patched = html.replace('</body>', `${PROCESS_PATCH}${BUILDERS_COMPLETE_PATCH}${ENGINEERING_ROUTE_GUARD_PATCH}</body>`);

  const headers = new Headers(response.headers);
  headers.set('Content-Type', 'text/html; charset=utf-8');
  headers.set('Cache-Control', 'no-store');
  return new Response(patched, { status: response.status, headers });
}