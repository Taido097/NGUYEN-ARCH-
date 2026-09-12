const SOURCE_URL = 'https://prismae.framer.website/';

export const revalidate = 3600;

const CLEANUP = `
<style id="designedbytd-prismae-cleanup">
  #__framer-badge-container,
  [id^="__framer-editorbar"],
  [class*="framer-editorbar"],
  a[title*="Create a free website with Framer"],
  a[href*="framer.com/@olynex-studio"],
  a[href*="contra.com/payment-link"],
  .framer-15bl60r-container {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
</style>`;

const REPLACEMENTS: Array<[RegExp, string]> = [
  [/Prismae\s*—\s*Architecture &amp; Interior Template/gi, 'NGUYEN Architecture & Engineering'],
  [/Prismae\s*—\s*Architecture & Interior Template/gi, 'NGUYEN Architecture & Engineering'],
  [/\bPRISMAE\b/g, 'NGUYEN'],
  [/\bPrismae\b/g, 'NGUYEN'],
  [/Start Your Project/gi, 'Start Your Commercial Project'],
  [/View All Projects/gi, 'View Commercial Projects'],
  [/View Projects/gi, 'View Commercial Projects'],
  [/Explore Dowm/gi, 'Explore Services'],
  [/About Us/gi, 'About NGUYEN'],
  [/Our Approach/gi, 'Our Process'],
  [/Discovery & Strategy/gi, 'Existing Conditions & Project Planning'],
  [/Client Consultation/gi, 'Business Needs Consultation'],
  [/Site Analysis/gi, 'Existing-Condition Survey'],
  [/Budget Planning/gi, 'Project Scope Planning'],
  [/Project Brief/gi, 'Zoning, Occupancy & Local Requirements'],
  [/Concept & Design/gi, 'Architecture & Tenant Improvement'],
  [/Concept Design/gi, 'Architectural Design & Tenant Improvement (TI)'],
  [/Space Planning/gi, 'Optimized Business Layout'],
  [/3D Visualization/gi, 'Architectural, Structural & MEP'],
  [/Material Selection/gi, 'Title 24 & Code Compliance'],
  [/Development & Construction/gi, 'Engineering & Permit Documentation'],
  [/Technical Drawings/gi, 'Architectural, Structural & MEP Documents'],
  [/Construction Documents/gi, 'Permit-Ready Documentation'],
  [/Site Coordination/gi, 'Consultant & City Coordination'],
  [/Quality Control/gi, 'Title 24 & Code Compliance'],
  [/Completion & Handover/gi, 'Building Permit & Plan Check'],
  [/Final Inspection/gi, 'Plan Check Review'],
  [/Styling & Finishing/gi, 'Corrections & Revisions'],
  [/Project Handover/gi, 'Building Permit Approval'],
  [/Ongoing Support/gi, 'City & Consultant Coordination'],
  [/Boutique Hotel/gi, 'Restaurants, Cafés & Boba Shops'],
  [/Urban Apartment/gi, 'Nail Salons & Beauty Salons'],
  [/Luxury Retail Store/gi, 'Retail Stores'],
  [/Office Interior/gi, 'Office & Tenant Improvements'],
  [/Residential Renovation/gi, 'Commercial Remodel & Renovation'],
  [/New Residence/gi, 'New Commercial Buildings'],
  [/Commercial Design/gi, 'Tenant Improvement (TI)'],
  [/Interior Design/gi, 'Engineering & Permit'],
  [/Every successful project starts with understanding your vision\. We explore your goals, lifestyle, site conditions, budget, and aspirations to build a strong creative foundation\./gi, 'We begin with an existing-condition survey, optimized business layout, zoning, occupancy and local requirements to establish a clear commercial project foundation.'],
  [/Once the design is approved, we prepare technical documentation and collaborate with contractors to ensure every element is executed with precision and craftsmanship\./gi, 'We prepare coordinated Architectural, Structural and MEP documents, including Electrical, Plumbing and HVAC design and coordination, for building permit and plan check.'],
  [/After detailed inspections and final refinements, we deliver a fully completed space that reflects your vision and exceeds expectations\./gi, 'We support Building Permit, Plan Check, Corrections, consultants and city agencies through approval while helping reduce revisions, time and project cost.'],
  [/An elegant hospitality destination blending local culture with refined contemporary architecture, creating timeless comfort and memorable experiences\./gi, 'Commercial architecture, engineering and permit support for restaurants, coffee shops, cafés, boba shops and other hospitality spaces.'],
  [/A premium retail space crafted to strengthen brand identity and elevate customer engagement through immersive design experiences daily\./gi, 'Commercial design, Tenant Improvement, engineering and permit support for retail stores and commercial renovations.'],
  [/Designing Homes That Blend Seamlessly with Nature/gi, 'Commercial Architecture Built Around Business Needs'],
  [/Discover how thoughtful planning, natural materials, and modern architecture create homes connected to their surroundings\./gi, 'Commercial architecture planned around business operations, zoning, occupancy, building code and permit requirements.'],
  [/Creating Workspaces That Inspire Innovation/gi, 'Tenant Improvements for Offices and Commercial Spaces'],
  [/Explore how flexible layouts, natural lighting, and employee-focused design improve productivity and workplace well-being\./gi, 'Tenant Improvement design and coordinated engineering for offices, retail, restaurants, salons and other commercial spaces.'],
  [/The Beauty of Minimalist Interiors in Modern Living/gi, 'Engineering, MEP & Permit Coordination'],
  [/Learn how simplicity, texture, and carefully selected materials transform everyday spaces into timeless interiors\./gi, 'Architectural, Structural and MEP documentation with Title 24, Electrical, Plumbing, HVAC, plan check and corrections support.'],
  [/Do you manage construction as well\?/gi, 'Do you help with Building Permits and Plan Check?'],
  [/What types of projects do you specialize in\?/gi, 'What commercial projects do you specialize in?'],
  [/How does your design process work\?/gi, 'How does your commercial design and permit process work?'],
  [/Do you provide both architecture and interior design services\?/gi, 'Do you provide Architectural, Structural and MEP coordination?'],
  [/How long does a typical project take\?/gi, 'Do you coordinate zoning, occupancy and local requirements?'],
  [/Can you renovate or remodel an existing property\?/gi, 'Can you handle commercial remodels and Tenant Improvements?'],
  [/Subscribe to Our Newsletter/gi, 'Start a Commercial Project'],
  [/Say Hello!/gi, 'Contact NGUYEN'],
  [/New York, USA/gi, 'Huntington Beach, CA'],
  [/London, UK/gi, 'Orange County, CA'],
  [/Toronto, Canada/gi, '(209) 233-8888'],
  [/hello@prismae\.com/gi, 'info@nguyenarchitecture.com'],
  [/© 2026 Prismae\./gi, '© 2026 NGUYEN Architecture & Engineering.'],
];

const CLIENT_PATCH = `
<script id="nguyen-prismae-content-patch">
(() => {
  const pairs = [
    ['PRISMAE', 'NGUYEN'],
    ['Prismae', 'NGUYEN'],
    ['Start Your Project', 'Start Your Commercial Project'],
    ['View All Projects', 'View Commercial Projects'],
    ['View Projects', 'View Commercial Projects'],
    ['Explore Dowm', 'Explore Services'],
    ['About Us', 'About NGUYEN'],
    ['Our Approach', 'Our Process'],
    ['Discovery & Strategy', 'Existing Conditions & Project Planning'],
    ['Client Consultation', 'Business Needs Consultation'],
    ['Site Analysis', 'Existing-Condition Survey'],
    ['Budget Planning', 'Project Scope Planning'],
    ['Project Brief', 'Zoning, Occupancy & Local Requirements'],
    ['Concept & Design', 'Architecture & Tenant Improvement'],
    ['Concept Design', 'Architectural Design & Tenant Improvement (TI)'],
    ['Space Planning', 'Optimized Business Layout'],
    ['3D Visualization', 'Architectural, Structural & MEP'],
    ['Material Selection', 'Title 24 & Code Compliance'],
    ['Development & Construction', 'Engineering & Permit Documentation'],
    ['Technical Drawings', 'Architectural, Structural & MEP Documents'],
    ['Construction Documents', 'Permit-Ready Documentation'],
    ['Site Coordination', 'Consultant & City Coordination'],
    ['Quality Control', 'Title 24 & Code Compliance'],
    ['Completion & Handover', 'Building Permit & Plan Check'],
    ['Final Inspection', 'Plan Check Review'],
    ['Styling & Finishing', 'Corrections & Revisions'],
    ['Project Handover', 'Building Permit Approval'],
    ['Ongoing Support', 'City & Consultant Coordination'],
    ['Boutique Hotel', 'Restaurants, Cafés & Boba Shops'],
    ['Urban Apartment', 'Nail Salons & Beauty Salons'],
    ['Luxury Retail Store', 'Retail Stores'],
    ['Office Interior', 'Office & Tenant Improvements'],
    ['Residential Renovation', 'Commercial Remodel & Renovation'],
    ['New Residence', 'New Commercial Buildings'],
    ['Commercial Design', 'Tenant Improvement (TI)'],
    ['Interior Design', 'Engineering & Permit'],
    ['Every successful project starts with understanding your vision. We explore your goals, lifestyle, site conditions, budget, and aspirations to build a strong creative foundation.', 'We begin with an existing-condition survey, optimized business layout, zoning, occupancy and local requirements to establish a clear commercial project foundation.'],
    ['Once the design is approved, we prepare technical documentation and collaborate with contractors to ensure every element is executed with precision and craftsmanship.', 'We prepare coordinated Architectural, Structural and MEP documents, including Electrical, Plumbing and HVAC design and coordination, for building permit and plan check.'],
    ['After detailed inspections and final refinements, we deliver a fully completed space that reflects your vision and exceeds expectations.', 'We support Building Permit, Plan Check, Corrections, consultants and city agencies through approval while helping reduce revisions, time and project cost.'],
    ['An elegant hospitality destination blending local culture with refined contemporary architecture, creating timeless comfort and memorable experiences.', 'Commercial architecture, engineering and permit support for restaurants, coffee shops, cafés, boba shops and other hospitality spaces.'],
    ['A premium retail space crafted to strengthen brand identity and elevate customer engagement through immersive design experiences daily.', 'Commercial design, Tenant Improvement, engineering and permit support for retail stores and commercial renovations.'],
    ['Designing Homes That Blend Seamlessly with Nature', 'Commercial Architecture Built Around Business Needs'],
    ['Discover how thoughtful planning, natural materials, and modern architecture create homes connected to their surroundings.', 'Commercial architecture planned around business operations, zoning, occupancy, building code and permit requirements.'],
    ['Creating Workspaces That Inspire Innovation', 'Tenant Improvements for Offices and Commercial Spaces'],
    ['Explore how flexible layouts, natural lighting, and employee-focused design improve productivity and workplace well-being.', 'Tenant Improvement design and coordinated engineering for offices, retail, restaurants, salons and other commercial spaces.'],
    ['The Beauty of Minimalist Interiors in Modern Living', 'Engineering, MEP & Permit Coordination'],
    ['Learn how simplicity, texture, and carefully selected materials transform everyday spaces into timeless interiors.', 'Architectural, Structural and MEP documentation with Title 24, Electrical, Plumbing, HVAC, plan check and corrections support.'],
    ['Do you manage construction as well?', 'Do you help with Building Permits and Plan Check?'],
    ['What types of projects do you specialize in?', 'What commercial projects do you specialize in?'],
    ['How does your design process work?', 'How does your commercial design and permit process work?'],
    ['Do you provide both architecture and interior design services?', 'Do you provide Architectural, Structural and MEP coordination?'],
    ['How long does a typical project take?', 'Do you coordinate zoning, occupancy and local requirements?'],
    ['Can you renovate or remodel an existing property?', 'Can you handle commercial remodels and Tenant Improvements?'],
    ['Subscribe to Our Newsletter', 'Start a Commercial Project'],
    ['Say Hello!', 'Contact NGUYEN'],
    ['New York, USA', 'Huntington Beach, CA'],
    ['London, UK', 'Orange County, CA'],
    ['Toronto, Canada', '(209) 233-8888'],
    ['hello@prismae.com', 'info@nguyenarchitecture.com'],
    ['© 2026 Prismae.', '© 2026 NGUYEN Architecture & Engineering.']
  ];
  const exact = new Map(pairs.map(([a,b]) => [a.replace(/\\s+/g, ' ').trim(), b]));
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();

  function patchHeroBrand() {
    document.querySelectorAll('[data-framer-name="Hero"] p').forEach((el) => {
      if (normalize(el.textContent).toUpperCase() !== 'PRISMAE') return;

      const leaves = Array.from(el.querySelectorAll('span')).filter((span) => {
        return span.children.length === 0 && normalize(span.textContent).length === 1;
      });

      if (leaves.length >= 7) {
        const letters = ['N', 'G', 'U', 'Y', 'E', 'N'];
        leaves.forEach((span, index) => {
          span.textContent = letters[index] || '';
        });
      } else {
        el.textContent = 'NGUYEN';
      }
    });
  }

  function patchText() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const key = normalize(node.nodeValue);
      const next = exact.get(key);
      if (next && node.nodeValue !== next) node.nodeValue = next;
    }

    patchHeroBrand();

    document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
      a.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
      if (/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(normalize(a.textContent))) {
        a.textContent = 'info@nguyenarchitecture.com';
      }
    });

    const phones = ['(209) 233-8888', '(714) 707-8889'];
    document.querySelectorAll('a[href^="tel:"]').forEach((a, index) => {
      const phone = phones[Math.min(index, phones.length - 1)];
      a.setAttribute('href', 'tel:' + phone.replace(/[^+\\d]/g, ''));
      if (/^[+()\\d .-]{7,}$/.test(normalize(a.textContent))) a.textContent = phone;
    });
  }

  function fixNav() {
    var home = window.location.origin + window.location.pathname;
    var navLinks = document.querySelectorAll('nav a, [data-framer-name] a, header a');
    navLinks.forEach(function (a) {
      var text = (a.textContent || '').trim().toLowerCase().replace(/\s+/g, ' ');
      if (/project/i.test(text)) {
        var wrap = a.closest('[class*="container"]') || a.closest('li') || a.parentElement;
        if (wrap) wrap.style.setProperty('display', 'none', 'important');
        return;
      }
      if (!a.querySelector('img') && !a.dataset.nnav && !a.matches('[href^="mailto:"], [href^="tel:"]')) {
        a.dataset.nnav = '1';
        a.setAttribute('href', home);
        a.addEventListener('click', function (e) { e.preventDefault(); e.stopImmediatePropagation(); window.location.href = home; }, true);
      }
    });
  }

  patchText();
  fixNav();
  document.addEventListener('DOMContentLoaded', function () { patchText(); fixNav(); }, { once: true });
  let runs = 0;
  const timer = setInterval(() => {
    patchText();
    if (runs < 8) fixNav();
    runs += 1;
    if (runs >= 24) clearInterval(timer);
  }, 250);
  [800, 1600, 3000, 5000].forEach(function (t) { setTimeout(fixNav, t); });
})();
</script>`;

async function getSource() {
  let lastError: unknown = null;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(SOURCE_URL, {
        next: { revalidate: 3600 },
        headers: {
          'User-Agent': 'Mozilla/5.0',
          Accept: 'text/html,application/xhtml+xml',
        },
      });
      if (response.ok) return response.text();
      lastError = new Error(`Upstream returned ${response.status}`);
    } catch (error) {
      lastError = error;
    }

    if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 200 * (attempt + 1)));
  }

  throw lastError instanceof Error ? lastError : new Error('Unable to load source');
}

export async function GET() {
  try {
    let html = await getSource();

    html = html.replace(
      /<head([^>]*)>/i,
      `<head$1><base href="${SOURCE_URL}"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="description" content="NGUYEN Architecture & Engineering — commercial architecture, engineering, Tenant Improvement and permit support in Orange County.">${CLEANUP}`,
    );

    html = html.replace(
      /<title>[^<]*<\/title>/i,
      '<title>NGUYEN Architecture & Engineering — Website Demo</title>',
    );

    for (const [pattern, replacement] of REPLACEMENTS) {
      html = html.replace(pattern, replacement);
    }

    html = html.replace(/<\/body>/i, `${CLIENT_PATCH}</body>`);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    });
  } catch {
    return new Response(
      '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="refresh" content="2"><title>Loading NGUYEN Concept 02</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fbf8f2;color:#211b16;font-family:Arial,sans-serif}main{text-align:center;padding:24px}p{opacity:.6}</style></head><body><main><h1>NGUYEN Architecture & Engineering</h1><p>Loading Concept 02…</p></main></body></html>',
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store',
          'X-Robots-Tag': 'noindex, nofollow,noarchive',
        },
      },
    );
  }
}
