const SOURCE_URL = 'https://dark-autonomy-026178.framer.app/';
const DEMO_PATH = '/client-demos/client-8889/forma';

export const revalidate = 3600;

const CLEANUP = `
<style id="designedbytd-forma-cleanup">
  #__framer-badge-container,
  [id^="__framer-editorbar"],
  [class*="framer-editorbar"],
  #template-overlay {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }

  /* Forma's stock counters are unsupported claims for this client demo. */
  .framer-qyW0h .framer-mw1c8p {
    display: none !important;
  }
</style>`;

const REPLACEMENTS: Array<[string, string]> = [
  ['<title>Forma Studio</title>', '<title>NGUYEN Architecture & Engineering — Website Demo</title>'],
  ['content="Forma Studio"', 'content="NGUYEN Architecture & Engineering"'],
  ['A minimal Framer template for interior designers, architects, and creative studios. Showcase projects, services, and studio information with a clean layout and CMS-powered project pages.', 'NGUYEN Architecture & Engineering provides commercial architecture, engineering, tenant improvement and permit support in Orange County.'],
  ['Forma Studio®', 'NGUYEN'],
  ['Forma Studio', 'NGUYEN'],
  ['Forma®', 'NGUYEN'],
  ['About Us', 'About NGUYEN'],
  ['Projects', 'Commercial Projects'],
  ['Selected Work', 'Commercial Project Types'],
  ['A collection of spaces defined by simplicity and intention.', 'Commercial project support for restaurants, cafés, boba shops, salons, retail stores, offices, tenant improvements, remodels and new commercial buildings.'],
  ['Horizon Villa', 'Restaurant & Café'],
  ['Urban Apartment Interior', 'Boba & Coffee Shop'],
  ['Linear Workspace', 'Office & Tenant Improvement'],
  ['Studio Minimal', 'Retail Store'],
  ['Concrete House', 'Commercial Remodel'],
  ['Axis Office', 'New Commercial Building'],
  ['See All Works', 'Explore Project Types'],
  ['Services', 'Services'],
  ['What we design', 'Commercial Design, Engineering & Permit'],
  ['We follow a clear process to keep every step simple, structured, and easy to manage.', 'Full-service commercial project support from existing conditions and layout planning through coordinated engineering, permit documentation, plan check and corrections.'],
  ['Interior Design', 'Architectural Design & Tenant Improvement (TI)'],
  ['We design interiors that are simple, functional, and aligned with how the space is used every day.', 'Existing-condition survey, optimized business layout and Tenant Improvement design tailored to commercial operations.'],
  ['Layout planning · Material selection · Furniture guidance', 'Existing conditions · Business layout · Tenant Improvement'],
  ['Architecture', 'Architectural, Structural & MEP'],
  ['We create structures that are practical, well-planned, and built to last.', 'Coordinated Architectural, Structural and MEP documents prepared for commercial projects and permit review.'],
  ['Concept design · Floor plans · Working drawings', 'Permit drawings · Structural · MEP coordination'],
  ['Space Planning', 'Zoning, Occupancy & Code Compliance'],
  ['We organize layouts to improve flow, usability, and overall efficiency.', 'We coordinate zoning, occupancy, Title 24 and applicable local code requirements for the project.'],
  ['Zoning layout · Circulation flow · Space optimization', 'Zoning · Occupancy · Title 24 / Code'],
  ['Renovation', 'Building Permit, Plan Check & Corrections'],
  ['We update existing spaces to improve layout, function, and overall usability.', 'Permit-ready documentation, plan check responses, corrections and consultant/city coordination through approval.'],
  ['Site assessment · Layout updates · Material upgrades', 'Permit submittal · Plan check · Corrections'],
  ['Process', 'Process'],
  ['How We Work', 'Concept → Design → Engineering → Permit'],
  ['Discover', 'Existing Conditions'],
  ['We understand your vision, lifestyle, and spatial requirements.', 'We review existing conditions, business needs, zoning, occupancy and local requirements.'],
  ['Concept', 'Design'],
  ['We define the layout, atmosphere, and overall design direction.', 'We develop the commercial layout and Architectural Design / Tenant Improvement direction.'],
  ['Developement', 'Engineering'],
  ['We refine materials, lighting, furniture, and spatial details.', 'We coordinate Architectural, Structural and MEP documents, including Electrical, Plumbing and HVAC.'],
  ['Execution', 'Permit'],
  ['We execute the design with consistency and attention to detail.', 'We support Building Permit, Plan Check, Corrections and city/consultant coordination through approval.'],
  ['Testimonials', 'Why NGUYEN'],
  ['What Our Client Say', 'Commercial Project Support'],
  ['Emma Carter', 'NGUYEN Architecture & Engineering'],
  ['Homeowner', 'Design • Engineering • Permit'],
  ['4.9/5', 'Orange County'],
  ['Rated by 1200+ Verified Clients', 'Commercial Architecture & Permit Support'],
  ['FAQ', 'FAQ'],
  ['Your Questions, Answered', 'Commercial Project Questions'],
  ['Find quick answers to the most common questions about our services and process.', 'A quick overview of Nguyen’s commercial architecture, engineering and permit support.'],
  ['How long does a project take?', 'What does your permit support include?'],
  ['Most projects are completed within 4 to 12 weeks, depending on scope and requirements.', 'Building Permit support includes permit-ready documentation, plan check coordination, corrections and communication with consultants and city agencies.'],
  ['What services do you offer?', 'What services do you provide?'],
  ['We provide interior design, architecture, space planning, and renovation services.', 'Existing-condition survey and business layout, Architectural Design / TI, zoning and occupancy review, Architectural / Structural / MEP documents, Title 24, Electrical / Plumbing / HVAC coordination, Building Permit, Plan Check and Corrections.'],
  ['Do you handle both residential and commercial projects?', 'What commercial projects do you specialize in?'],
  ['Yes, we work on a range of residential and commercial spaces tailored to client needs.', 'Restaurants, boba shops, coffee shops, cafés, nail and beauty salons, retail stores, offices, tenant improvements, commercial remodels and new commercial buildings.'],
  ['What is included in the design process?', 'How does your project process work?'],
  ['The process typically includes consultation, concept development, space planning, material selection, and final documentation.', 'The process moves from Concept to Design to Engineering to Permit, with coordinated documentation and support through plan check and corrections.'],
  ['How do we get started?', 'How do we start a commercial project?'],
  ["Simply get in touch through our contact form, and we'll schedule an initial consultation.", 'Contact NGUYEN Architecture & Engineering to discuss the project scope, existing conditions, business use and permit requirements.'],
  ['Ready to Elevate Your Space?', 'Ready to Start Your Commercial Project?'],
  ['Let’s create something memorable together', 'Commercial architecture, engineering and permit support from concept through approval.'],
  ['Studio Insights & Updates', 'Design • Engineering • Permit'],
  ['Subscribe', 'Contact NGUYEN'],
  ['hello@studio.com', 'info@nguyenarchitecture.com'],
  ['(+91) 114 567 8900', '(209) 233-8888 · (714) 707-8889'],
  ['New Delhi, India', 'Huntington Beach / Orange County, CA'],
  ['Twitter', 'Facebook'],
  ['Instagram', 'Email'],
  ['Linkedin', 'Call'],
  ['Made by Hariom', 'NGUYEN Architecture & Engineering'],
];

const CLIENT_PATCH = `
<script id="nguyen-forma-content-patch">
(() => {
  const DEMO_PATH = '${DEMO_PATH}';
  const SOURCE_ORIGIN = 'https://dark-autonomy-026178.framer.app';
  const FACEBOOK = 'https://www.facebook.com/profile.php?id=61579114646057&mibextid=wwXIfr&mibextid=wwXIfr';

  const pairs = [
    ['Forma Studio®', 'NGUYEN'],
    ['Forma Studio', 'NGUYEN'],
    ['Forma®', 'NGUYEN'],
    ['About Us', 'About NGUYEN'],
    ['Projects', 'Commercial Projects'],
    ['Selected Work', 'Commercial Project Types'],
    ['A collection of spaces defined by simplicity and intention.', 'Commercial project support for restaurants, cafés, boba shops, salons, retail stores, offices, tenant improvements, remodels and new commercial buildings.'],
    ['Horizon Villa', 'Restaurant & Café'],
    ['Urban Apartment Interior', 'Boba & Coffee Shop'],
    ['Linear Workspace', 'Office & Tenant Improvement'],
    ['Studio Minimal', 'Retail Store'],
    ['Concrete House', 'Commercial Remodel'],
    ['Axis Office', 'New Commercial Building'],
    ['See All Works', 'Explore Project Types'],
    ['What we design', 'Commercial Design, Engineering & Permit'],
    ['We follow a clear process to keep every step simple, structured, and easy to manage.', 'Full-service commercial project support from existing conditions and layout planning through coordinated engineering, permit documentation, plan check and corrections.'],
    ['Interior Design', 'Architectural Design & Tenant Improvement (TI)'],
    ['We design interiors that are simple, functional, and aligned with how the space is used every day.', 'Existing-condition survey, optimized business layout and Tenant Improvement design tailored to commercial operations.'],
    ['Layout planning · Material selection · Furniture guidance', 'Existing conditions · Business layout · Tenant Improvement'],
    ['Architecture', 'Architectural, Structural & MEP'],
    ['We create structures that are practical, well-planned, and built to last.', 'Coordinated Architectural, Structural and MEP documents prepared for commercial projects and permit review.'],
    ['Concept design · Floor plans · Working drawings', 'Permit drawings · Structural · MEP coordination'],
    ['Space Planning', 'Zoning, Occupancy & Code Compliance'],
    ['We organize layouts to improve flow, usability, and overall efficiency.', 'We coordinate zoning, occupancy, Title 24 and applicable local code requirements for the project.'],
    ['Zoning layout · Circulation flow · Space optimization', 'Zoning · Occupancy · Title 24 / Code'],
    ['Renovation', 'Building Permit, Plan Check & Corrections'],
    ['We update existing spaces to improve layout, function, and overall usability.', 'Permit-ready documentation, plan check responses, corrections and consultant/city coordination through approval.'],
    ['Site assessment · Layout updates · Material upgrades', 'Permit submittal · Plan check · Corrections'],
    ['How We Work', 'Concept → Design → Engineering → Permit'],
    ['Discover', 'Existing Conditions'],
    ['We understand your vision, lifestyle, and spatial requirements.', 'We review existing conditions, business needs, zoning, occupancy and local requirements.'],
    ['Concept', 'Design'],
    ['We define the layout, atmosphere, and overall design direction.', 'We develop the commercial layout and Architectural Design / Tenant Improvement direction.'],
    ['Developement', 'Engineering'],
    ['We refine materials, lighting, furniture, and spatial details.', 'We coordinate Architectural, Structural and MEP documents, including Electrical, Plumbing and HVAC.'],
    ['Execution', 'Permit'],
    ['We execute the design with consistency and attention to detail.', 'We support Building Permit, Plan Check, Corrections and city/consultant coordination through approval.'],
    ['Testimonials', 'Why NGUYEN'],
    ['What Our Client Say', 'Commercial Project Support'],
    ['Emma Carter', 'NGUYEN Architecture & Engineering'],
    ['Homeowner', 'Design • Engineering • Permit'],
    ['4.9/5', 'Orange County'],
    ['Rated by 1200+ Verified Clients', 'Commercial Architecture & Permit Support'],
    ['Your Questions, Answered', 'Commercial Project Questions'],
    ['Find quick answers to the most common questions about our services and process.', 'A quick overview of Nguyen’s commercial architecture, engineering and permit support.'],
    ['How long does a project take?', 'What does your permit support include?'],
    ['Most projects are completed within 4 to 12 weeks, depending on scope and requirements.', 'Building Permit support includes permit-ready documentation, plan check coordination, corrections and communication with consultants and city agencies.'],
    ['What services do you offer?', 'What services do you provide?'],
    ['We provide interior design, architecture, space planning, and renovation services.', 'Existing-condition survey and business layout, Architectural Design / TI, zoning and occupancy review, Architectural / Structural / MEP documents, Title 24, Electrical / Plumbing / HVAC coordination, Building Permit, Plan Check and Corrections.'],
    ['Do you handle both residential and commercial projects?', 'What commercial projects do you specialize in?'],
    ['Yes, we work on a range of residential and commercial spaces tailored to client needs.', 'Restaurants, boba shops, coffee shops, cafés, nail and beauty salons, retail stores, offices, tenant improvements, commercial remodels and new commercial buildings.'],
    ['What is included in the design process?', 'How does your project process work?'],
    ['The process typically includes consultation, concept development, space planning, material selection, and final documentation.', 'The process moves from Concept to Design to Engineering to Permit, with coordinated documentation and support through plan check and corrections.'],
    ['How do we get started?', 'How do we start a commercial project?'],
    ["Simply get in touch through our contact form, and we'll schedule an initial consultation.", 'Contact NGUYEN Architecture & Engineering to discuss the project scope, existing conditions, business use and permit requirements.'],
    ['Ready to Elevate Your Space?', 'Ready to Start Your Commercial Project?'],
    ['Let’s create something memorable together', 'Commercial architecture, engineering and permit support from concept through approval.'],
    ['Studio Insights & Updates', 'Design • Engineering • Permit'],
    ['Subscribe', 'Contact NGUYEN'],
    ['hello@studio.com', 'info@nguyenarchitecture.com'],
    ['(+91) 114 567 8900', '(209) 233-8888 · (714) 707-8889'],
    ['New Delhi, India', 'Huntington Beach / Orange County, CA'],
    ['Twitter', 'Facebook'],
    ['Instagram', 'Email'],
    ['Linkedin', 'Call'],
    ['Made by Hariom', 'NGUYEN Architecture & Engineering']
  ];

  const exact = new Map(pairs.map(([from, to]) => [normalize(from), to]));

  function normalize(value) {
    return (value || '').replace(/\\s+/g, ' ').trim();
  }

  function patchAnimatedPhrase(original, replacement) {
    const originalWords = original.split(/\\s+/);
    const replacementWords = replacement.split(/\\s+/);
    if (originalWords.length !== replacementWords.length) return;

    const elements = Array.from(document.querySelectorAll('h1,h2,h3,p,div[data-framer-component-type="RichTextContainer"]'));
    const target = elements.find((element) => normalize(element.textContent) === original && !Array.from(element.children).some((child) => normalize(child.textContent) === original));
    if (!target) return;

    const leafTextNodes = [];
    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (normalize(node.nodeValue)) leafTextNodes.push(node);
    }

    if (leafTextNodes.length === replacementWords.length) {
      leafTextNodes.forEach((textNode, index) => {
        textNode.nodeValue = replacementWords[index];
      });
    }
  }

  function patchText() {
    patchAnimatedPhrase(
      'We design spaces that are simple, functional, and thoughtfully planned to improve how you live and work.',
      'We design commercial spaces with architecture, engineering, and permit support built around your business, code, and requirements.'
    );
    patchAnimatedPhrase(
      'Forma® a studio focused on crafting calm, intentional interiors that balance aesthetics, functionality, and everyday living.',
      'NGUYEN provides architecture, engineering, and permit services for restaurants, cafés, salons, retail, offices, and tenant improvements.'
    );
    patchAnimatedPhrase(
      '"The design decisions were practical and well thought out, making the space easy to use and maintain."',
      'Our coordinated architecture and engineering process supports permitting, plan check, corrections, code compliance, and clear city coordination.'
    );

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const next = exact.get(normalize(node.nodeValue));
      if (next && node.nodeValue !== next) node.nodeValue = next;
    }

    document.querySelectorAll('a').forEach((anchor) => {
      const href = anchor.getAttribute('href') || '';
      const label = normalize(anchor.textContent);

      if (href.startsWith(SOURCE_ORIGIN)) {
        const url = new URL(href);
        if (url.pathname.startsWith('/projects/')) {
          anchor.setAttribute('href', DEMO_PATH + '#projects');
        } else if (url.pathname.startsWith('/contact')) {
          anchor.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
        } else if (url.pathname.startsWith('/about')) {
          anchor.setAttribute('href', DEMO_PATH + '#about');
        } else if (url.pathname.startsWith('/legals/')) {
          anchor.setAttribute('href', DEMO_PATH);
        } else {
          anchor.setAttribute('href', DEMO_PATH + (url.hash || ''));
        }
      }

      if (href.includes('x.com/DesignsByGolem') || label === 'Facebook') {
        anchor.setAttribute('href', FACEBOOK);
        anchor.setAttribute('target', '_blank');
      }
      if (href.includes('instagram.com/hariom_022') || label === 'Email') {
        anchor.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
        anchor.removeAttribute('target');
      }
      if (href.includes('linkedin.com/in/hari-om') || label === 'Call') {
        anchor.setAttribute('href', 'tel:7147078889');
        anchor.removeAttribute('target');
      }
      if (href.startsWith('mailto:')) {
        anchor.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
      }
      if (href.startsWith('tel:')) {
        anchor.setAttribute('href', 'tel:7147078889');
      }
      if (href.includes('maps.google.com')) {
        anchor.setAttribute('href', 'https://maps.google.com/?q=Huntington+Beach+California');
      }
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
    if (runs >= 32) clearInterval(timer);
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

    if (attempt < 2) {
      await new Promise((resolve) => setTimeout(resolve, 200 * (attempt + 1)));
    }
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

    for (const [from, to] of REPLACEMENTS) {
      html = html.split(from).join(to);
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
      '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="refresh" content="2"><title>Loading NGUYEN Concept 03</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f2f2f2;color:#0f0f0f;font-family:Arial,sans-serif}main{text-align:center;padding:24px}p{opacity:.6}</style></head><body><main><h1>NGUYEN Architecture & Engineering</h1><p>Loading Concept 03…</p></main></body></html>',
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store',
          'X-Robots-Tag': 'noindex, nofollow, noarchive',
        },
      },
    );
  }
}
