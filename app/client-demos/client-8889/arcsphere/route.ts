const SOURCE_URL = 'https://arcsphere-studio.framer.website/';

export const revalidate = 3600;

const CLEANUP = `
<style id="designedbytd-client-demo-cleanup">
  #__framer-badge-container,
  [id^="__framer-editorbar"],
  [class*="framer-editorbar"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
</style>`;


const REPLACEMENTS: Array<[RegExp, string]> = [
  [/ArcSphere Studio/gi, 'NGUYEN ARCHITECTURE & ENGINEERING'],
  [/ArcSphere/gi, 'NGUYEN'],
  [/Interior & Architecture/gi, 'Architecture · Engineering · Permit'],
  [/Interior and Architecture/gi, 'Architecture · Engineering · Permit'],
  [/Where Architecture Meets Experience/gi, 'Commercial Architecture — Engineering & Permit'],
  [/Where Architecture/gi, 'Commercial Architecture'],
  [/Meets Experience/gi, 'Engineering & Permit'],
  [/Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment\.?/gi, 'Based in Orange County, we provide commercial architecture, engineering and permit support from existing-condition survey and business layout through plan check and approval.'],
  [/We offer a complete range of architecture and interior design services tailored to create spaces\.?/gi, 'ARCHITECTURE, ENGINEERING & PERMITTING FOR RESIDENTIAL AND COMMERCIAL PROJECTS.'],
  [/A selection of our recent architecture and interior design work\.?/gi, 'A SELECTION OF OUR RECENT RESIDENTIAL, COMMERCIAL & DEVELOPMENT PROJECTS.'],
  [/12\+ YEARS EXPERIENCE/gi, '15+ YEARS EXPERIENCE'],
  [/150\+ PROJECTS COMPLETED/gi, '500+ SUCCESSFUL PROJECTS'],
  [/250\+ PROJECTS WORLDWIDE/gi, '500+ SUCCESSFUL PROJECTS'],
  [/SERENITY VILLA/gi, 'CUSTOM HOME'],
  [/DUBAI, 2025/gi, 'LOS ANGELES, CA'],
  [/VIEW PROJECTS/gi, 'VIEW PROJECT TYPES'],
  [/BOOK CONSULTATION/gi, 'START A PROJECT'],
  [/DESIGN PROCESS/gi, 'HOME'],
  [/Residential Interior/gi, 'Architectural Design & Tenant Improvement (TI)'],
  [/Commercial Interior/gi, 'Commercial Architecture'],
  [/Space Planning/gi, 'Existing-Condition Survey & Business Layout'],
  [/Design Consultation/gi, 'Zoning, Occupancy & Local Requirements'],
  [/Project Management/gi, 'Building Permit, Plan Check & Corrections'],
  [/Architecture Design/gi, 'Architectural, Structural & MEP'],
  [/Interior Styling/gi, 'Electrical, Plumbing & HVAC Coordination'],
  [/Furniture Selection/gi, 'Title 24 & Code Compliance'],
  [/Lighting Design/gi, 'Electrical, Plumbing & HVAC Coordination'],
  [/3D Visualization/gi, 'Permit Drawing Documentation'],
  [/Material Selection/gi, 'Consultant & City Coordination'],
  [/Renovation/gi, 'Commercial Remodel & Renovation'],
  [/Office Design/gi, 'Office & Tenant Improvements'],
  [/Retail Design/gi, 'Retail Stores'],
  [/Hospitality Design/gi, 'Restaurants, Cafés & Boba Shops'],
  [/Concept Development/gi, 'Existing-Condition Survey & Project Planning'],
  [/Design Development/gi, 'Architecture & Engineering'],
  [/Documentation/gi, 'Permit Documentation'],
  [/Implementation/gi, 'Plan Check & Corrections'],
  [/We begin by understanding your goals, requirements, and design vision\.?/gi, 'We begin with existing conditions, business needs, zoning, occupancy and local requirements.'],
  [/We refine the concept into a cohesive and functional design direction\.?/gi, 'We develop coordinated Architectural, Structural and MEP documentation for the commercial project.'],
  [/We prepare detailed drawings and specifications for execution\.?/gi, 'We prepare permit-ready drawings with Title 24 and applicable code compliance.'],
  [/We oversee the final execution to ensure the design is realized as intended\.?/gi, 'We support building permit, plan check, corrections, consultants and city coordination through approval.'],
  [/Functional and visually compelling spaces for offices, retail stores, hospitality, and businesses\.?/gi, 'Commercial architecture and engineering for restaurants, cafés, boba shops, salons, retail stores, offices and tenant improvements.'],
  [/Our Projects/gi, 'Commercial Project Types'],
  [/About Us/gi, 'About NGUYEN'],
  [/About us/gi, 'About NGUYEN'],
  [/Get in touch/gi, 'Start a Project'],
  [/Contact Us/gi, 'Contact'],
  [/Contact us/gi, 'Contact'],
  [/Dubai/gi, 'Huntington Beach, CA'],
  [/United Arab Emirates/gi, 'Orange County, CA'],
];


function removeNonVisualTelemetry(html: string) {
  return html
    .replace(/<script\b(?=[^>]*\bsrc=["']https:\/\/events\.framer\.com\/script(?:\?[^"']*)?["'])[^>]*>\s*<\/script>/gi, '')
    .replace(/<link\b(?=[^>]*\bhref=["']https:\/\/events\.framer\.com\/[^"']*["'])[^>]*>/gi, '');
}

function optimizeImageDecoding(html: string) {
  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    if (/\bdecoding\s*=/i.test(tag)) return tag;
    return tag.replace(/<img\b/i, '<img decoding="async"');
  });
}

const CLIENT_PATCH = `
<script id="nguyen-arcsphere-content-patch">
(() => {
  const pairs = [
    ['ArcSphere Studio', 'NGUYEN ARCHITECTURE & ENGINEERING'], ['ArcSphere', 'NGUYEN'],
    ['Interior & Architecture', 'Architecture · Engineering · Permit'], ['Interior and Architecture', 'Architecture · Engineering · Permit'],
    ['Where Architecture Meets Experience', 'Commercial Architecture — Engineering & Permit'], ['Where Architecture', 'Commercial Architecture'], ['Meets Experience', 'Engineering & Permit'],
    ['Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment', 'Based in Orange County, we provide commercial architecture, engineering and permit support from existing-condition survey and business layout through plan check and approval.'],
    ['We offer a complete range of architecture and interior design services tailored to create spaces.', 'ARCHITECTURE, ENGINEERING & PERMITTING FOR RESIDENTIAL AND COMMERCIAL PROJECTS.'],
    ['A selection of our recent architecture and interior design work.', 'A SELECTION OF OUR RECENT RESIDENTIAL, COMMERCIAL & DEVELOPMENT PROJECTS.'],
    ['12+ YEARS EXPERIENCE', '15+ YEARS EXPERIENCE'], ['150+ PROJECTS COMPLETED', '500+ SUCCESSFUL PROJECTS'], ['250+ PROJECTS WORLDWIDE', '500+ SUCCESSFUL PROJECTS'],
    ['SERENITY VILLA', 'CUSTOM HOME'], ['DUBAI, 2025', 'LOS ANGELES, CA'],
    ['VIEW PROJECTS', 'VIEW PROJECT TYPES'], ['BOOK CONSULTATION', 'START A PROJECT'], ['DESIGN PROCESS', 'HOME'],
    ['Residential Interior', 'Architectural Design & Tenant Improvement (TI)'], ['Commercial Interior', 'Commercial Architecture'],
    ['Space Planning', 'Existing-Condition Survey & Business Layout'], ['Design Consultation', 'Zoning, Occupancy & Local Requirements'],
    ['Project Management', 'Building Permit, Plan Check & Corrections'], ['Architecture Design', 'Architectural, Structural & MEP'],
    ['Interior Styling', 'Electrical, Plumbing & HVAC Coordination'], ['Furniture Selection', 'Title 24 & Code Compliance'],
    ['Lighting Design', 'Electrical, Plumbing & HVAC Coordination'], ['3D Visualization', 'Permit Drawing Documentation'],
    ['Material Selection', 'Consultant & City Coordination'], ['Renovation', 'Commercial Remodel & Renovation'],
    ['Office Design', 'Office & Tenant Improvements'], ['Retail Design', 'Retail Stores'], ['Hospitality Design', 'Restaurants, Cafés & Boba Shops'],
    ['Concept Development', 'Existing-Condition Survey & Project Planning'], ['Design Development', 'Architecture & Engineering'],
    ['Documentation', 'Permit Documentation'], ['Implementation', 'Plan Check & Corrections'],
    ['We begin by understanding your goals, requirements, and design vision.', 'We begin with existing conditions, business needs, zoning, occupancy and local requirements.'],
    ['We refine the concept into a cohesive and functional design direction.', 'We develop coordinated Architectural, Structural and MEP documentation for the commercial project.'],
    ['We prepare detailed drawings and specifications for execution.', 'We prepare permit-ready drawings with Title 24 and applicable code compliance.'],
    ['We oversee the final execution to ensure the design is realized as intended.', 'We support building permit, plan check, corrections, consultants and city coordination through approval.'],
    ['Functional and visually compelling spaces for offices, retail stores, hospitality, and businesses.', 'Commercial architecture and engineering for restaurants, cafés, boba shops, salons, retail stores, offices and tenant improvements.'],
    ['Our Projects', 'Commercial Project Types'], ['About Us', 'About NGUYEN'], ['About us', 'About NGUYEN'],
    ['Get in touch', 'Start a Project'], ['Contact Us', 'Contact'], ['Contact us', 'Contact'],
    ['Dubai', 'Huntington Beach, CA'], ['United Arab Emirates', 'Orange County, CA']
  ];
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const compact = (value) => normalize(value).replace(/\\s+/g, '').toLowerCase();
  const exact = new Map(pairs.map(([a,b]) => [normalize(a), b]));
  const splitTextReplacements = new Map([
    [compact('We offer a complete range of architecture and interior design services tailored to create spaces.'), 'ARCHITECTURE, ENGINEERING & PERMITTING FOR RESIDENTIAL AND COMMERCIAL PROJECTS.'],
    [compact('A selection of our recent architecture and interior design work.'), 'A SELECTION OF OUR RECENT RESIDENTIAL, COMMERCIAL & DEVELOPMENT PROJECTS.']
  ]);
  const counterReplacements = new Map([
    [compact('12+ YEARS EXPERIENCE'), '15+ YEARS EXPERIENCE'],
    [compact('150+ PROJECTS COMPLETED'), '500+ SUCCESSFUL PROJECTS'],
    [compact('250+ PROJECTS WORLDWIDE'), '500+ SUCCESSFUL PROJECTS']
  ]);
  const officeCardReplacements = new Map([
    [compact('CORPORATE OFFICE SPACE'), 'OFFICE BUILD-OUT'],
    [compact('COMMERCIAL ARCHITECTURE'), 'COMMERCIAL ARCHITECTURE'],
    [compact('NEW YORK, 2026'), 'IRVINE, CA']
  ]);
  const officeCardKeys = Array.from(officeCardReplacements.keys());
  const customHomeCardReplacements = new Map([
    [compact('SERENITY VILLA'), 'CUSTOM HOME'],
    [compact('RESIDENTIAL ARCHITECTURE'), 'RESIDENTIAL ARCHITECTURE'],
    [compact('DUBAI, 2025'), 'LOS ANGELES, CA']
  ]);
  const customHomeCardKeys = Array.from(customHomeCardReplacements.keys());
  const thirdCardTextReplacements = new Map([
    [compact('MINIMALIST APPARTMENT INTERIOR'), 'COMMERCIAL BUILDING'],
    [compact('MINIMALIST APARTMENT INTERIOR'), 'COMMERCIAL BUILDING'],
    [compact('RESIDENTIAL ARCHITECTURE'), 'COMMERCIAL ARCHITECTURE'],
    [compact('LONDON, 2025'), 'SAN FRANCISCO, CA']
  ]);
  const thirdCardImage = window.location.origin + '/nguyen-commercial-building.svg?v=office-exact-20260825';
  const thirdCardLabels = [compact('MINIMALIST APPARTMENT INTERIOR'), compact('MINIMALIST APARTMENT INTERIOR'), compact('COMMERCIAL BUILDING')];
  const serviceSpecs = [
    {
      sourceDescription: 'Designing modern buildings that combine aesthetics, efficiency, and long-term value.',
      sourceTitles: ['Architectural'],
      title: 'RESIDENTIAL',
      description: 'Custom homes, additions, remodels, and multifamily residential design with coordinated engineering and permitting.',
      href: '/client-demos/client-8889/residential'
    },
    {
      sourceDescription: 'Creating refined interiors through thoughtful materials, lighting, and spatial composition.',
      sourceTitles: ['Interior Design'],
      title: 'COMMERCIAL',
      description: 'Architecture and engineering for offices, retail, restaurants, tenant improvements, and other commercial projects.',
      href: '/client-demos/client-8889/residential/services/commercial'
    },
    {
      sourceDescription: 'Transforming outdated spaces into modern and carefully designed environments',
      sourceTitles: ['Renovation & Remodeling', 'Commercial Remodel & Renovation & Remodeling'],
      title: 'ADU',
      description: 'ADU design, engineering, Title 24, permit documentation, and city coordination from concept through approval.',
      href: '/client-demos/client-8889/residential/services/adus'
    },
    {
      sourceDescription: 'High-quality visualizations that help clients clearly understand the design before construction begins.',
      sourceTitles: ['3D Visualization', 'Permit Drawing Documentation'],
      title: 'LAND DEVELOPMENT',
      description: 'Site planning, entitlement support, grading and utility coordination, and development documentation for residential and commercial sites.',
      href: '/client-demos/client-8889/residential/services/land-development'
    }
  ];
  const extraServiceDescriptions = [
    // 'Optimizing layouts...' is intentionally NOT hidden here — the socal layer converts that card into
    // the Engineering card. Hiding it on all breakpoints left the phone Engineering card missing.
    'Professional guidance during construction to ensure the design vision is executed correctly.'
  ];
  const phones = ['(209) 233-8888', '(714) 707-8889'];

  function patchTextNode(node) { const next = exact.get(normalize(node.nodeValue)); if (next && node.nodeValue !== next) node.nodeValue = next; }
  function patchSplitParagraph(paragraph) {
    const replacement = splitTextReplacements.get(compact(paragraph.textContent)); if (!replacement) return false;
    paragraph.style.setProperty('white-space', 'normal', 'important'); paragraph.style.setProperty('word-break', 'normal', 'important'); paragraph.style.setProperty('overflow-wrap', 'normal', 'important'); paragraph.textContent = replacement; return true;
  }
  function patchSplitParagraphs(root) { if (!root || root.nodeType !== Node.ELEMENT_NODE) return; const element = root; if (element.matches('p')) patchSplitParagraph(element); element.querySelectorAll('p').forEach(patchSplitParagraph); }
  function patchCounters(root) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return;
    const element = root;
    const candidates = [element, ...element.querySelectorAll('*')];
    candidates.forEach((candidate) => {
      const key = compact(candidate.textContent);
      const replacement = counterReplacements.get(key);
      if (!replacement) return;
      const hasSameTextChild = Array.from(candidate.children).some((child) => compact(child.textContent) === key);
      if (hasSameTextChild) return;
      candidate.textContent = replacement;
    });
  }
  function patchMappedCard(root, replacements, keys) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return false;
    const element = root;
    const all = [element, ...element.querySelectorAll('*')];
    // Framer ships one DOM copy of the card per breakpoint (desktop / tablet / phone). Collect the
    // minimal container holding all keys in EACH copy — patching only one left the phone project card
    // with its original label (e.g. "Serenity Villa"), which also broke click-routing that matches on
    // the card's category text.
    let cards = all.filter((el) => { const t = compact(el.textContent); return keys.every((k) => t.includes(k)) && el.querySelector?.('img'); });
    cards = cards.filter((el) => !cards.some((other) => other !== el && el.contains(other)));
    if (!cards.length) {
      let cursor = element;
      for (let depth = 0; cursor && depth < 10; depth += 1, cursor = cursor.parentElement) {
        if (keys.every((key) => compact(cursor.textContent).includes(key))) { cards = [cursor]; break; }
      }
    }
    if (!cards.length) return false;
    cards.forEach((card) => {
      const cardCandidates = [card, ...card.querySelectorAll('*')];
      cardCandidates.forEach((candidate) => {
        const key = compact(candidate.textContent);
        const replacement = replacements.get(key);
        if (!replacement) return;
        const hasSameTextChild = Array.from(candidate.children).some((child) => compact(child.textContent) === key);
        if (hasSameTextChild) return;
        candidate.textContent = replacement;
      });
    });
    return true;
  }
  function patchOfficeCard(root) { return patchMappedCard(root, officeCardReplacements, officeCardKeys); }
  function patchCustomHomeCard(root) { return patchMappedCard(root, customHomeCardReplacements, customHomeCardKeys); }
  function patchThirdProjectImage(root) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return false;
    const element = root;
    const candidates = [element, ...element.querySelectorAll('*')];
    let label = null;
    for (const candidate of candidates) {
      if (thirdCardLabels.includes(compact(candidate.textContent))) { label = candidate; break; }
    }
    if (!label) return false;
    let card = label;
    for (let depth = 0; card && depth < 10; depth += 1, card = card.parentElement) {
      const img = card.querySelector?.('img');
      if (!img) continue;
      const cardCandidates = [card, ...card.querySelectorAll('*')];
      cardCandidates.forEach((candidate) => {
        const key = compact(candidate.textContent);
        const replacementText = thirdCardTextReplacements.get(key);
        if (!replacementText) return;
        const hasSameTextChild = Array.from(candidate.children).some((child) => compact(child.textContent) === key);
        if (hasSameTextChild) return;
        candidate.textContent = replacementText;
      });
      if (img.getAttribute('src') !== thirdCardImage) img.setAttribute('src', thirdCardImage);
      img.removeAttribute('srcset');
      img.removeAttribute('sizes');
      img.style.setProperty('filter', 'none', 'important');
      img.style.setProperty('opacity', '1', 'important');
      img.style.setProperty('visibility', 'visible', 'important');
      const picture = img.closest('picture');
      if (picture) picture.querySelectorAll('source').forEach((source) => { source.setAttribute('srcset', thirdCardImage); source.removeAttribute('sizes'); });
      const mediaParent = img.parentElement;
      if (mediaParent) {
        let replacement = mediaParent.querySelector(':scope > img[data-nguyen-third-card-image="true"]');
        if (!replacement) {
          replacement = img.cloneNode(false);
          replacement.setAttribute('data-nguyen-third-card-image', 'true');
          replacement.removeAttribute('srcset');
          replacement.removeAttribute('sizes');
          replacement.setAttribute('src', thirdCardImage);
          const computed = window.getComputedStyle(img);
          replacement.style.setProperty('position', 'absolute', 'important');
          replacement.style.setProperty('inset', '0', 'important');
          replacement.style.setProperty('width', '100%', 'important');
          replacement.style.setProperty('height', '100%', 'important');
          replacement.style.setProperty('object-fit', computed.objectFit || 'cover', 'important');
          replacement.style.setProperty('object-position', computed.objectPosition || 'center', 'important');
          replacement.style.setProperty('filter', 'none', 'important');
          replacement.style.setProperty('opacity', '1', 'important');
          replacement.style.setProperty('visibility', 'visible', 'important');
          replacement.style.setProperty('z-index', '2', 'important');
          replacement.style.setProperty('pointer-events', 'none', 'important');
          if (window.getComputedStyle(mediaParent).position === 'static') mediaParent.style.setProperty('position', 'relative', 'important');
          mediaParent.appendChild(replacement);
        } else if (replacement.getAttribute('src') !== thirdCardImage) {
          replacement.setAttribute('src', thirdCardImage);
        }
      }
      return true;
    }
    return false;
  }
  function findServiceCardsByDescription(root, description) {
    // Framer ships a separate DOM copy of every section per breakpoint (desktop / tablet / phone), so a
    // service card's description text appears three times. Return ALL matching cards — not just the first
    // — otherwise only the desktop card gets patched and the phone card keeps the original extra card,
    // unreplaced text and unwired link. An img-bearing ancestor is the card; if none is found we fall back
    // to a compact ancestor that still wraps the description so mobile layouts without a direct img match.
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return [];
    const target = compact(description);
    const element = root;
    const candidates = [element, ...element.querySelectorAll('*')];
    const cards = [];
    for (const candidate of candidates) {
      if (compact(candidate.textContent) !== target) continue;
      let picked = null;
      let card = candidate;
      for (let depth = 0; card && depth < 8; depth += 1, card = card.parentElement) {
        if (!card.querySelector?.('img')) continue;
        if (!compact(card.textContent).includes(target)) continue;
        picked = card;
        break;
      }
      if (!picked) {
        // No image ancestor (some mobile card layouts) — take the grandparent that still wraps the text.
        picked = candidate.parentElement?.parentElement || candidate.parentElement || candidate;
      }
      if (picked && cards.indexOf(picked) === -1) cards.push(picked);
    }
    return cards;
  }
  function patchServiceCard(card, spec) {
    const sourceTitleKeys = new Set(spec.sourceTitles.map(compact));
    const sourceDescriptionKey = compact(spec.sourceDescription);
    if (spec.href) {
      const target = window.location.origin + spec.href;
      card.setAttribute('data-nguyen-link', target);
      card.style.setProperty('cursor', 'pointer', 'important');
    }
    const candidates = [card, ...card.querySelectorAll('*')];
    candidates.forEach((candidate) => {
      const key = compact(candidate.textContent);
      const hasSameTextChild = Array.from(candidate.children).some((child) => compact(child.textContent) === key);
      if (hasSameTextChild) return;
      if (sourceTitleKeys.has(key)) {
        candidate.textContent = spec.title;
        candidate.style.setProperty('white-space', 'normal', 'important');
        return;
      }
      if (key === sourceDescriptionKey) {
        candidate.textContent = spec.description;
        candidate.style.setProperty('white-space', 'normal', 'important');
        candidate.style.setProperty('word-break', 'normal', 'important');
        candidate.style.setProperty('overflow-wrap', 'normal', 'important');
      }
    });
  }
  function patchServicesSection(root) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return;
    serviceSpecs.forEach((spec) => {
      findServiceCardsByDescription(root, spec.sourceDescription).forEach((card) => patchServiceCard(card, spec));
    });
    extraServiceDescriptions.forEach((description) => {
      findServiceCardsByDescription(root, description).forEach((card) => card.style.setProperty('display', 'none', 'important'));
    });
  }
  function keepResidentialLabelOnOneLine(root) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return; const element = root; const candidates = [element, ...element.querySelectorAll('*')];
    candidates.forEach((candidate) => { const text = compact(candidate.textContent); if (text !== 'residential' && text !== 'residentialdesign') return; const hasSameTextChild = Array.from(candidate.children).some((child) => compact(child.textContent) === text); if (hasSameTextChild) return; candidate.style.setProperty('white-space', 'nowrap', 'important'); candidate.style.setProperty('word-break', 'keep-all', 'important'); candidate.style.setProperty('overflow-wrap', 'normal', 'important'); });
  }
  function patchContactAnchor(anchor) {
    if (anchor.matches('a[href^="mailto:"]')) { anchor.setAttribute('href', 'mailto:info@nguyenarchitecture.com'); if (/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(normalize(anchor.textContent))) anchor.textContent = 'info@nguyenarchitecture.com'; return; }
    if (anchor.matches('a[href^="tel:"]')) { const allPhones = Array.from(document.querySelectorAll('a[href^="tel:"]')); const index = Math.max(0, allPhones.indexOf(anchor)); const phone = phones[Math.min(index, phones.length - 1)]; anchor.setAttribute('href', 'tel:' + phone.replace(/[^+\\d]/g, '')); if (/^[+()\\d .-]{7,}$/.test(normalize(anchor.textContent))) anchor.textContent = phone; }
  }
  function patchRoot(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) { patchTextNode(root); const paragraph = root.parentElement?.closest('p'); if (paragraph) patchSplitParagraph(paragraph); const parent = root.parentElement; if (parent) { patchCounters(parent); patchOfficeCard(parent); patchCustomHomeCard(parent); patchThirdProjectImage(parent); patchServicesSection(parent); keepResidentialLabelOnOneLine(parent); } return; }
    if (root.nodeType !== Node.ELEMENT_NODE) return; const element = root; patchSplitParagraphs(element); patchCounters(element); patchOfficeCard(element); patchCustomHomeCard(element); patchThirdProjectImage(element); patchServicesSection(element); keepResidentialLabelOnOneLine(element);
    if (element.matches('a[href^="mailto:"], a[href^="tel:"]')) patchContactAnchor(element);
    element.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]').forEach(patchContactAnchor);
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT); let node; while ((node = walker.nextNode())) patchTextNode(node);
  }
  function installServiceLinkInterceptor() {
    if (window.__nguyenServiceLinkInterceptor) return;
    window.__nguyenServiceLinkInterceptor = true;
    const findLink = (event) => {
      const start = event.target && event.target.nodeType === Node.TEXT_NODE ? event.target.parentElement : event.target;
      return start && start.closest ? start.closest('[data-nguyen-link]') : null;
    };
    // Block Framer's own tap/modal handlers before they fire.
    ['pointerdown', 'mousedown', 'touchstart'].forEach((type) => {
      document.addEventListener(type, (event) => {
        if (!findLink(event)) return;
        event.preventDefault();
        event.stopPropagation();
        if (event.stopImmediatePropagation) event.stopImmediatePropagation();
      }, true);
    });
    // Navigate on click (capture phase, before Framer sees it).
    document.addEventListener('click', (event) => {
      const el = findLink(event);
      if (!el) return;
      const href = el.getAttribute('data-nguyen-link');
      event.preventDefault();
      event.stopPropagation();
      if (event.stopImmediatePropagation) event.stopImmediatePropagation();
      if (href) window.location.href = href;
    }, true);
  }
  var HERO_CTA_KEYS = ['startaproject','bookconsultation','bookaconsultation','getintouch','startyourproject','requestconsultation','scheduleaconsultation','scheduleconsultation','letswork','letsworktogether'];
  function isHeroCta(a) {
    var k = (a.textContent || '').replace(/\s+/g,'').toLowerCase();
    for (var i = 0; i < HERO_CTA_KEYS.length; i++) {
      var key = HERO_CTA_KEYS[i];
      if (k === key || k === key + key || k === key + key + key) return true;
    }
    return false;
  }
  function isInFooter(a) {
    var el = a;
    while (el) {
      if (el.tagName && el.tagName.toLowerCase() === 'footer') return true;
      var fn = el.getAttribute ? el.getAttribute('data-framer-name') : null;
      if (fn && /footer/i.test(fn)) return true;
      el = el.parentElement;
    }
    return false;
  }
  function fixNav(){
    var home = window.location.origin + window.location.pathname;
    var navLinks = document.querySelectorAll('nav a, [data-framer-name] a');
    navLinks.forEach(function(a){
      // Skip footer links — handled by FOOTER_NAV_PATCH in the socal layer
      if (isInFooter(a)) return;
      var text = (a.textContent || '').trim().toLowerCase().replace(/\s+/g,' ');
      if (/^projects?$|^view project/i.test(text) || text === 'projectsprojects' || text === 'view project typesview project types') {
        var wrap = a.closest('[class*="container"]') || a.parentElement;
        if (wrap) wrap.style.setProperty('display','none','important');
        return;
      }
      // Never intercept hero CTA buttons — they are handled by the socal layer and must
      // navigate to the contact form, not loop back to the current page.
      if (isHeroCta(a)) return;
      if (!a.querySelector('img') && !a.dataset.nnav && !a.matches('[href^="mailto:"], [href^="tel:"]')) {
        a.dataset.nnav = '1';
        a.setAttribute('href', home);
        a.addEventListener('click', function(e){ e.preventDefault(); e.stopImmediatePropagation(); window.location.href = home; }, true);
      }
    });
  }
  installServiceLinkInterceptor();
  patchRoot(document.body);
  window.addEventListener('load', () => { patchThirdProjectImage(document.body); patchServicesSection(document.body); }, { once: true });
  const observer = new MutationObserver((mutations) => { for (const mutation of mutations) { if (mutation.type === 'characterData') { patchTextNode(mutation.target); const paragraph = mutation.target.parentElement?.closest('p'); if (paragraph) patchSplitParagraph(paragraph); const parent = mutation.target.parentElement; if (parent) { patchCounters(parent); patchOfficeCard(parent); patchCustomHomeCard(parent); patchThirdProjectImage(parent); patchServicesSection(parent); keepResidentialLabelOnOneLine(parent); } continue; } if (mutation.type === 'childList') mutation.addedNodes.forEach(patchRoot); } });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  // Framer renders this page from its own external bundles, so none of the rewriting above can
  // take effect until that render lands. Disconnecting the observer at 6s meant any content
  // Framer finished after that was never patched and kept its original template text
  // permanently — routinely the case on desktop, which pulls the larger images. Keep observing,
  // and re-apply on the same schedule the socal patches already use. patchRoot re-runs every
  // rule and each one is idempotent, so the repeats are no-ops once the page is correct.
  [800, 1600, 3000, 5000, 8000, 12000, 20000, 40000].forEach(function(t){ setTimeout(function(){ patchRoot(document.body); fixNav(); }, t); });
  setTimeout(function(){ patchRoot(document.body); fixNav(); observer.disconnect(); }, 60000);
})();
</script>`;

// Desktop safety net: Framer ships the page hidden (opacity:0) and reveals it with its client
// runtime. On a slow or cache-cold load that reveal can stall, leaving the cream blank. This checks
// a few seconds in whether anything actually rendered; only if the page still looks blank does it
// force the content visible. On a normal load it does nothing, so all animations (including scroll
// reveals) are preserved.
const DESKTOP_SAFETYNET_SCRIPT = `
<script id="nguyen-desktop-safetynet">
(function(){
  try {
    function effectiveOpacity(el) {
      var o = 1, n = el;
      while (n && n !== document.body) {
        var v = parseFloat(window.getComputedStyle(n).opacity);
        if (!isNaN(v)) o *= v;
        if (o < 0.05) return 0;
        n = n.parentElement;
      }
      return o;
    }
    function looksBlank() {
      var root = document.getElementById('main'); if (!root) return false;
      var els = root.querySelectorAll('h1,h2,h3,p,a,button,span,li'); var visible = 0;
      var vh = window.innerHeight || 800;
      for (var i = 0; i < els.length && visible < 3; i++) {
        var el = els[i], cs = window.getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;
        if (effectiveOpacity(el) < 0.5) continue;
        var r = el.getBoundingClientRect();
        // Only count content in the first screenful — the cream blank is the hero area up top being
        // hidden, even though lower sections may carry visible text.
        if (r.top >= vh || r.bottom <= 0 || r.width <= 0 || r.height <= 0) continue;
        if (el.textContent && el.textContent.trim()) visible++;
      }
      return visible < 3;
    }
    function reveal() {
      var root = document.getElementById('main'); if (!root) return;
      var els = root.querySelectorAll('*');
      for (var i = 0; i < els.length; i++) {
        var el = els[i], cs = window.getComputedStyle(el);
        if (cs.display === 'none') continue;
        if (cs.visibility === 'hidden') el.style.setProperty('visibility', 'visible', 'important');
        if (parseFloat(cs.opacity) < 0.05) {
          el.style.setProperty('opacity', '1', 'important');
          if (cs.transform && cs.transform !== 'none') el.style.setProperty('transform', 'none', 'important');
          if (cs.filter && cs.filter !== 'none') el.style.setProperty('filter', 'none', 'important');
        }
      }
    }
    [5000, 8000].forEach(function (t) { setTimeout(function () { if (looksBlank()) reveal(); }, t); });
  } catch (e) {}
})();
</script>`;

async function getSource() {
  let lastError: unknown = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(SOURCE_URL, { next: { revalidate: 3600 }, headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'text/html,application/xhtml+xml' } });
      if (response.ok) return response.text(); lastError = new Error(`Upstream returned ${response.status}`);
    } catch (error) { lastError = error; }
    if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 200 * (attempt + 1)));
  }
  throw lastError instanceof Error ? lastError : new Error('Unable to load source');
}

export async function GET() {
  try {
    let html = await getSource(); html = removeNonVisualTelemetry(html); html = optimizeImageDecoding(html);
    html = html.replace(/<head([^>]*)>/i, `<head$1><base href="${SOURCE_URL}"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="description" content="NGUYEN ARCHITECTURE & ENGINEERING — commercial architecture, engineering, tenant improvement and building permit support in Orange County.">${CLEANUP}`);
    html = html.replace(/<title>[^<]*<\/title>/i, '<title>NGUYEN ARCHITECTURE & ENGINEERING — Website Demo</title>');

    // Apply the server-side rebranding for every device. Both desktop and phones now get the same
    // server-rewritten HTML and Framer renders its own responsive layout for each — desktop breakpoint
    // on a computer, Framer's purpose-built phone layout on a phone — with the content already correct
    // in the markup (no in-browser text patching to fight, no desktop layout crammed onto a phone).
    for (const [pattern, replacement] of REPLACEMENTS) html = html.replace(pattern, replacement);
    // The branding replacements above run over the whole document, which rewrites "arcsphere"
    // to "NGUYEN" inside the injected <base> tag too — restore the real origin.
    html = html.replace(/<base\b[^>]*>/i, `<base href="${SOURCE_URL}">`);
    html = html.replace(/info@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/gi, 'info@nguyenarchitecture.com');
    html = html.replace(/href=["']mailto:[^"']+["']/gi, 'href="mailto:info@nguyenarchitecture.com"');
    const phoneReplacements = ['(209) 233-8888', '(714) 707-8889']; let phoneIndex = 0;
    html = html.replace(/<a([^>]*href=["']tel:[^"']+["'][^>]*)>([\s\S]*?)<\/a>/gi, (_match, attrs, body) => { const phone = phoneReplacements[Math.min(phoneIndex, phoneReplacements.length - 1)]; phoneIndex += 1; const nextAttrs = attrs.replace(/href=["']tel:[^"']+["']/i, `href="tel:${phone.replace(/[^+\d]/g, '')}"`); const nextBody = body.replace(/>\s*[+()\d .-]{7,}\s*</g, `>${phone}<`); return `<a${nextAttrs}>${nextBody}</a>`; });

    html = html.replace('</body>', `${CLIENT_PATCH}${DESKTOP_SAFETYNET_SCRIPT}</body>`);
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store' } });
  } catch {
    return new Response('<!doctype html><html><body style="font-family:Arial,sans-serif;padding:40px">Concept 1 is temporarily unavailable. Please refresh in a moment.</body></html>', { status: 502, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
}