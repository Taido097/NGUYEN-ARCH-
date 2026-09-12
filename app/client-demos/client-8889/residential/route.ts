import { headers } from 'next/headers';

const SOURCE_URL = 'https://arcsphere-studio.framer.website/projects/serenity-villa';
const BASE_URL = 'https://arcsphere-studio.framer.website/';

export const revalidate = 3600;

function isMobileUserAgent(userAgent: string) {
  return /Android|iPhone|iPad|iPod|Mobile|IEMobile|Opera Mini/i.test(userAgent);
}

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

// Rebrand the reference (ArcSphere "Serenity Villa" project page) to NGUYEN residential content.
// These run as substring rules server-side on desktop and, deferred, client-side on mobile.
const REPLACEMENTS: Array<[RegExp, string]> = [
  // Full-sentence residential copy first, so it matches the original text before the word rules run.
  [/A tranquil residential sanctuary blending natural beauty with luxury\.?/gi, 'From land to building.'],
  [/Dubai['’]s Serenity Villa emphasizes calm, minimalist living\. Open interiors, light-filled rooms, and natural textures create a serene home that perfectly aligns with the owners['’] vision of peaceful luxury\.?/gi, 'One coordinated team for planning, architecture, engineering, permitting, and project support.'],
  [/Serenity Villa, completed in 2025 in Dubai, is a tranquil residential project that highlights minimalism and natural harmony — designed to create a peaceful and elegant living atmosphere\.?/gi, 'NGUYEN provides full-service residential architecture, engineering, Title 24 and permitting — from custom homes and additions to ADUs and multifamily — coordinated from first conversation through approval.'],
  [/ArcSphere Studio/gi, 'NGUYEN ARCHITECTURE'],
  [/ArcSphere/gi, 'NGUYEN'],
  [/Serenity Villa/gi, 'Residential'],
  [/\bSerenity\b/gi, 'Residential'],
  [/\bVilla\b/gi, 'Design'],
  [/Khalid &amp; Fatima Al-Mansoori/gi, 'NGUYEN Architecture &amp; Engineering'],
  [/Khalid & Fatima Al-Mansoori/gi, 'NGUYEN Architecture & Engineering'],
  [/Project Owners/gi, 'Studio'],
  [/€4 million/gi, 'Custom Homes · ADUs · Multifamily'],
  [/\bBudget\b/gi, 'Focus'],
  [/680 m²/gi, 'Architecture · Structural · MEP · Permit'],
  [/\bSurface\b/gi, 'Scope'],
  [/\bAddress\b/gi, 'Region'],
  [/Other Projects?/gi, 'Our Services'],
  [/Corporate Office Space/gi, 'ADU'],
  [/Modern Co-working Space/gi, 'Land Development'],
  [/Modern Co-Working Space/gi, 'Land Development'],
  [/Harmony Living Space/gi, 'Commercial'],
  [/Minimalist Apartment Interior/gi, 'Engineering'],
  [/Dubai, 2025/gi, 'Los Angeles'],
  [/Dubai/gi, 'Southern California'],
  [/United Arab Emirates/gi, 'California'],
  [/Your Architecture Studio/gi, 'NGUYEN ARCHITECTURE'],
  [/Get in touch/gi, 'Start a Project'],
  [/\bDesign Process\b/gi, 'Home'],
];

function removeNonVisualTelemetry(html: string) {
  return html
    .replace(/<script\b(?=[^>]*\bsrc=["']https:\/\/events\.framer\.com\/script(?:\?[^"']*)?["'])[^>]*>\s*<\/script>/gi, '')
    .replace(/<link\b(?=[^>]*\bhref=["']https:\/\/events\.framer\.com\/[^"']*["'])[^>]*>/gi, '');
}

// The reference project page has no services grid, so we inject NGUYEN's eight residential services
// after hydration, just before the "Project Details" section, styled to match the reference.
const SERVICES = [
  { n: '01', t: 'Custom Homes', c: 'Bespoke homes designed around your lifestyle, site, and long-term goals.', img: '/client-8889/residential/svc-01-custom-homes.jpg', slug: 'custom-homes' },
  { n: '02', t: 'Additions &amp; Major Remodels', c: 'Seamlessly expand and transform your home with careful planning and detail.', img: '/client-8889/residential/svc-02-additions-remodels.jpg', slug: 'additions-remodels' },
  { n: '04', t: 'Multifamily / Townhomes / Condos', c: 'Well-designed residences that balance livability, efficiency, and community.', img: '/client-8889/residential/svc-04-multifamily.jpg', slug: 'multifamily' },
];
const SERVICES_BASE = '/client-demos/client-8889/residential/services/';
const SERVICES_STYLE = `
  #nguyen-residential-services{display:block;background:transparent;padding:clamp(56px,8vw,120px) 0;font-family:"Inter Display","Inter",system-ui,-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#4f4742}
  #nguyen-residential-services .nrs-shell{width:min(1460px,100%);margin:0 auto;padding:0 clamp(20px,4vw,60px);box-sizing:border-box}
  #nguyen-residential-services .nrs-eyebrow{font-size:12px;text-transform:uppercase;letter-spacing:.2em;font-weight:600;color:#736b62;margin:0 0 clamp(32px,4vw,54px)}
  #nguyen-residential-services .nrs-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(248px,1fr));gap:clamp(20px,2vw,30px)}
  #nguyen-residential-services .nrs-card{display:flex;flex-direction:column;color:inherit;text-decoration:none;cursor:pointer}
  #nguyen-residential-services .nrs-img{aspect-ratio:3/4;overflow:hidden;background:#e7e0d5;border-radius:0}
  #nguyen-residential-services .nrs-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease}
  #nguyen-residential-services .nrs-card:hover .nrs-img img{transform:scale(1.045)}
  #nguyen-residential-services .nrs-text{padding-top:clamp(18px,1.5vw,24px)}
  #nguyen-residential-services .nrs-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
  #nguyen-residential-services .nrs-title{text-transform:uppercase;font-size:clamp(15px,1.15vw,18.5px);line-height:1.22;font-weight:600;letter-spacing:.005em;color:#1f1c19;margin:0}
  #nguyen-residential-services .nrs-arrow{flex:none;width:38px;height:38px;border:1px solid #b7afa3;border-radius:50%;display:grid;place-items:center;font-size:15px;color:#1f1c19;transition:background .3s,color .3s}
  #nguyen-residential-services .nrs-card:hover .nrs-arrow{background:#1f1c19;color:#f3f0e9;border-color:#1f1c19}
  #nguyen-residential-services .nrs-copy{font-size:13px;line-height:1.5;color:#8a8177;margin:14px 0 0;max-width:94%}
  @media(max-width:1100px){#nguyen-residential-services .nrs-grid{grid-template-columns:repeat(2,1fr);gap:32px}}
  @media(max-width:560px){#nguyen-residential-services .nrs-grid{grid-template-columns:1fr}#nguyen-residential-services .nrs-img{aspect-ratio:4/3}}`;
const SERVICES_HTML =
  `<style>${SERVICES_STYLE}</style><div class="nrs-shell"><p class="nrs-eyebrow">Our Residential Services</p><div class="nrs-grid">` +
  SERVICES.map((s) => `<a class="nrs-card" data-nhref="${SERVICES_BASE}${s.slug}"><div class="nrs-img"><img data-nsrc="${s.img}" alt="${s.t}" loading="lazy"></div><div class="nrs-text"><div class="nrs-head"><h3 class="nrs-title">${s.t}</h3><span class="nrs-arrow">↗</span></div><p class="nrs-copy">${s.c}</p></div></a>`).join('') +
  `</div></div>`;

// One client script for both surfaces. It applies the same REPLACEMENTS as substring rules to text
// nodes (a WeakSet stops any rule whose output contains its input from growing on re-runs), rewrites
// mailto, injects the residential services section after hydration, and rescues any content the
// runtime leaves hidden. It defers on mobile (clean hydration) and runs immediately + observes on
// desktop; a shared safety net reveals the page if the runtime ever stalls and leaves it blank.
const RULES_JSON = JSON.stringify(REPLACEMENTS.map(([re, rep]) => [re.source, re.flags, rep]));

const BLUEPRINT_CSS = [
  '.rbpg{--rbpg-bg:#f3f0e9;--rbpg-surface:#faf8f3;--rbpg-line:#ddd5c4;--rbpg-ink:#1a1814;--rbpg-muted:#6b6358;--rbpg-soft:#9a9188;--rbpg-gold:#b3894f;width:100%;background:var(--rbpg-bg);border-top:1px solid var(--rbpg-line);border-bottom:1px solid var(--rbpg-line);padding:clamp(40px,5vw,72px) clamp(24px,4vw,80px) clamp(32px,4vw,56px);font-family:"Inter Display","Inter",system-ui,-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:var(--rbpg-ink)}',
  '.rbpg *{box-sizing:border-box}',
  '.rbpg-inner{max-width:1600px;margin:0 auto}',
  '.rbpg-label-row{display:flex;align-items:center;gap:14px;margin:0 0 clamp(20px,2.6vw,36px)}',
  '.rbpg-label-line{flex:none;width:36px;height:1px;background:var(--rbpg-ink)}',
  '.rbpg-label-txt{font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;font-weight:600;color:var(--rbpg-ink);margin:0}',
  '.rbpg-main{display:grid;grid-template-columns:26fr 48fr 26fr;gap:0;align-items:stretch}',
  '.rbpg-left{display:flex;flex-direction:column;justify-content:space-between;padding-right:clamp(20px,2.4vw,36px);border-right:1px solid var(--rbpg-line);min-height:620px}',
  '.rbpg-left-heading{font-size:clamp(26px,3vw,42px);line-height:1.04;font-weight:600;letter-spacing:-.02em;color:var(--rbpg-ink);margin:0 0 16px}',
  '.rbpg-left-desc{font-size:13.5px;line-height:1.6;color:var(--rbpg-muted);margin:0;max-width:30ch}',
  '.rbpg-left-divider{width:40px;height:1px;background:var(--rbpg-line);margin:clamp(20px,2.4vw,32px) 0}',
  '.rbpg-tagline{display:flex;flex-direction:column;gap:1px}',
  '.rbpg-tagline span{font-size:10px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;color:var(--rbpg-soft);line-height:1.5}',
  '.rbpg-center{display:flex;align-items:stretch;padding:0 clamp(12px,1.6vw,24px)}',
  '.rbpg-featured-wrap{width:100%;height:620px;display:flex;align-items:center;justify-content:center;background:transparent;padding:0}',
  '.rbpg-featured-wrap img{max-width:100%;max-height:100%;width:100%;height:100%;object-fit:contain;display:block}',
  '.rbpg-right{display:flex;flex-direction:column;padding-left:clamp(20px,2.4vw,36px);border-left:1px solid var(--rbpg-line)}',
  '.rbpg-tabs{display:flex;gap:0;border-bottom:1px solid var(--rbpg-line);margin:0 0 clamp(16px,2vw,26px)}',
  '.rbpg-tab{background:transparent;border:0;border-bottom:2px solid transparent;padding:10px 0;margin-right:clamp(10px,1.4vw,18px);margin-bottom:-1px;font-size:11.5px;font-weight:400;letter-spacing:.01em;color:var(--rbpg-muted);cursor:pointer;transition:color .2s,border-color .2s;font-family:inherit;white-space:nowrap}',
  '.rbpg-tab:hover{color:var(--rbpg-ink)}',
  '.rbpg-tab.is-active{color:var(--rbpg-ink);border-bottom-color:var(--rbpg-ink);font-weight:500}',
  '.rbpg-plan-eyebrow{font-size:10px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;color:var(--rbpg-soft);margin:0 0 8px;display:flex;align-items:center;gap:10px}',
  '.rbpg-plan-eyebrow::before{content:"";display:inline-block;width:20px;height:1px;background:var(--rbpg-gold)}',
  '.rbpg-plan-sqft{font-size:clamp(17px,1.7vw,22px);font-weight:700;letter-spacing:.04em;color:var(--rbpg-ink);margin:0 0 4px;text-transform:uppercase}',
  '.rbpg-plan-name{font-size:clamp(22px,2.2vw,32px);font-weight:600;line-height:1.08;letter-spacing:-.015em;color:var(--rbpg-ink);margin:0 0 clamp(10px,1.2vw,16px)}',
  '.rbpg-plan-rule{height:1px;background:var(--rbpg-line);margin:0 0 clamp(10px,1.2vw,14px)}',
  '.rbpg-plan-desc{font-size:13px;line-height:1.65;color:var(--rbpg-muted);margin:0 0 clamp(14px,1.8vw,22px)}',
  '.rbpg-features{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:clamp(12px,1.6vw,18px) 0;border-top:1px solid var(--rbpg-line);border-bottom:1px solid var(--rbpg-line);margin:0}',
  '.rbpg-feature{display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center}',
  '.rbpg-feature-icon{width:40px;height:40px;display:flex;align-items:center;justify-content:center;color:var(--rbpg-ink);opacity:.8}',
  '.rbpg-feature-label{font-size:10px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;color:var(--rbpg-ink);line-height:1.3}',
  '.rbpg-feature-sub{font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--rbpg-soft);line-height:1.2;margin-top:-4px}',
  '.rbpg-cards{margin-top:clamp(20px,2.6vw,36px);display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(10px,1.2vw,16px)}',
  '.rbpg-card{display:flex;flex-direction:row;background:var(--rbpg-surface);border:1px solid var(--rbpg-line);cursor:pointer;transition:border-color .18s;text-align:left;padding:0;font-family:inherit;overflow:hidden;width:100%}',
  '.rbpg-card:hover{border-color:var(--rbpg-gold)}',
  '.rbpg-card.is-active{border-color:var(--rbpg-ink);box-shadow:0 0 0 1px var(--rbpg-ink)}',
  '.rbpg-card-img{flex:none;width:clamp(120px,10vw,170px);background:#fff;display:flex;align-items:center;justify-content:center;padding:10px;border-right:1px solid var(--rbpg-line)}',
  '.rbpg-card-img img{max-width:100%;max-height:140px;object-fit:contain;display:block}',
  '.rbpg-card-body{flex:1;padding:clamp(12px,1.2vw,18px) clamp(14px,1.4vw,20px);display:flex;flex-direction:column;justify-content:space-between}',
  '.rbpg-card-sqft{font-size:10px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;color:var(--rbpg-soft);margin:0 0 4px}',
  '.rbpg-card-name{font-size:clamp(12px,1vw,14px);font-weight:600;line-height:1.2;color:var(--rbpg-ink);margin:0 0 6px}',
  '.rbpg-card-desc{font-size:11.5px;line-height:1.5;color:var(--rbpg-muted);margin:0 0 10px;flex:1}',
  '.rbpg-card-cta{font-size:10px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:var(--rbpg-ink);display:inline-flex;align-items:center;gap:6px}',
  '.rbpg-card.is-active .rbpg-card-sqft{color:var(--rbpg-gold)}',
  '@media(max-width:1100px){.rbpg-featured-wrap{height:480px}.rbpg-left{min-height:480px}}',
  '@media(max-width:860px){.rbpg-main{grid-template-columns:1fr 1fr;grid-template-rows:auto auto}.rbpg-left{grid-column:1/3;flex-direction:row;align-items:flex-start;min-height:auto;border-right:0;border-bottom:1px solid var(--rbpg-line);padding-right:0;padding-bottom:clamp(16px,2.4vw,24px);margin-bottom:clamp(16px,2.4vw,24px);gap:clamp(20px,3vw,40px)}.rbpg-left-divider,.rbpg-tagline{display:none}.rbpg-center{grid-column:1;padding-left:0}.rbpg-featured-wrap{height:380px}.rbpg-right{grid-column:2;border-left:0;padding-left:clamp(14px,2vw,24px)}}',
  '@media(max-width:620px){.rbpg-main{grid-template-columns:1fr}.rbpg-left{grid-column:1;flex-direction:column;gap:0}.rbpg-center{grid-column:1;padding:0}.rbpg-featured-wrap{height:280px}.rbpg-right{grid-column:1;border-left:0;padding-left:0;margin-top:clamp(14px,2vw,20px)}.rbpg-cards{grid-template-columns:1fr}.rbpg-card-img{width:100px}.rbpg-tabs{overflow-x:auto;-webkit-overflow-scrolling:touch}.rbpg-tab{font-size:11px;margin-right:8px}}',
].join('\n');

const BLUEPRINT_TABS = [
  {
    id: 'custom-home',
    label: 'Custom Home',
    heading: 'Explore Custom Homes',
    subheading: 'Bespoke residences designed around your lifestyle, site, and long-term vision — from compact modern homes to expansive estates.',
    tagline: ['CRAFTED', 'FOR HOW', 'YOU LIVE'],
    features: [
      { icon: 'home',    label: 'Fully Custom',   sub: 'Design' },
      { icon: 'ruler',   label: 'Site-Specific',  sub: 'Planning' },
      { icon: 'check',   label: 'Any Style',       sub: 'Architecture' },
    ],
    plans: [
      { sqft: '1,800 SQ FT', name: 'The Modern Starter',    desc: 'An efficient single-story custom home with open-plan living, a chef-ready kitchen, two bedrooms, and indoor-outdoor flow designed for modern California living.',                                          src: '/client-8889/residential/floor-plans/custom_home/custom_home_1800_sq_ft.png' },
      { sqft: '3,000 SQ FT', name: 'The Family Residence',  desc: 'A spacious family home with generous living areas, four bedrooms, a dedicated home office, and a seamless connection between indoor and outdoor entertaining spaces.',                                          src: '/client-8889/residential/floor-plans/custom_home/custom_home_3000_sq_ft.png' },
      { sqft: '4,500 SQ FT', name: 'The Estate Home',       desc: 'A statement residence with a grand entry, expansive living and dining spaces, five bedrooms, a private primary suite, and curated detailing throughout every room.',                                              src: '/client-8889/residential/floor-plans/custom_home/custom_home_4500_sq_ft.png' },
    ],
  },
  {
    id: 'multi-family',
    label: 'Multi-Family / Condos',
    heading: 'Explore Multi-Family & Condos',
    subheading: 'Thoughtfully designed residential buildings that balance livability, unit efficiency, and community — built for owners and investors alike.',
    tagline: ['COMMUNITY', 'BY', 'DESIGN'],
    features: [
      { icon: 'building', label: 'Unit Efficiency',  sub: 'Optimized Layout' },
      { icon: 'grid',     label: 'Shared Amenities', sub: 'Community Spaces' },
      { icon: 'check',    label: 'Zoning Ready',     sub: 'Code Compliant' },
    ],
    plans: [
      { sqft: '1,200 SQ FT', name: 'The Urban Flat',          desc: 'A compact, efficient condominium unit with an open living-kitchen plan, a private bedroom, and thoughtful storage — designed for urban infill sites and first-time buyers.',                                  src: '/client-8889/residential/floor-plans/multi_family_condos/multi_family_condos_1200_sq_ft.png' },
      { sqft: '2,400 SQ FT', name: 'The Garden Condo',         desc: 'A generous two-unit layout with private patios, well-proportioned living areas, and separated bedroom zones — optimized for rental income and long-term tenancy.',                                            src: '/client-8889/residential/floor-plans/multi_family_condos/multi_family_condos_2400_sq_ft.png' },
      { sqft: '3,600 SQ FT', name: 'The Mixed-Use Podium',     desc: 'A three-unit residential building with a shared courtyard entry, stacked living zones, and a flexible ground-level unit adaptable for live-work or retail use.',                                              src: '/client-8889/residential/floor-plans/multi_family_condos/multi_family_condos_3600_sq_ft.png' },
    ],
  },
  {
    id: 'townhomes',
    label: 'Townhomes',
    heading: 'Explore Townhomes',
    subheading: 'Multi-level attached residences that deliver single-family living efficiency — private entries, dedicated outdoor space, and minimal site footprint.',
    tagline: ['VERTICAL', 'LIVING,', 'PRIVATE', 'ENTRY'],
    features: [
      { icon: 'layers', label: 'Shared Wall',    sub: 'Efficient Build' },
      { icon: 'home',   label: 'Private Entry',  sub: 'Each Unit' },
      { icon: 'check',  label: 'Low Footprint',  sub: 'Site Efficient' },
    ],
    plans: [
      { sqft: '1,400 SQ FT', name: 'The Compact Townhome',  desc: 'A well-organized two-story townhome with an open ground-floor living area, two upper bedrooms, and a private entry — efficient to build and easy to live in.',                                               src: '/client-8889/residential/floor-plans/townhomes/townhome_1400_sq_ft.png' },
      { sqft: '2,000 SQ FT', name: 'The Family Townhome',   desc: 'A three-story townhome with a flexible ground-floor bonus room, a bright second-floor living-dining level, and three private bedrooms on the upper floor.',                                                      src: '/client-8889/residential/floor-plans/townhomes/townhome_2000_sq_ft.png' },
      { sqft: '2,800 SQ FT', name: 'The Premium Townhome',  desc: 'A spacious end-unit townhome with abundant natural light, an oversized primary suite, a rooftop terrace, and a garage — maximizing value on infill sites.',                                                     src: '/client-8889/residential/floor-plans/townhomes/townhome_2800_sq_ft.png' },
    ],
  },
];

const CLIENT_REBRAND = `
<script id="nguyen-residential-rebrand">
(function(){
  try {
    var isMobile = window.matchMedia && window.matchMedia('(max-width: 809.98px)').matches;
    var rules = ${RULES_JSON}.map(function (r) { return [new RegExp(r[0], r[1]), r[2]]; });
    var done = new WeakSet();
    var rbpgCss = ${JSON.stringify(BLUEPRINT_CSS)};
    var rbpgData = ${JSON.stringify(BLUEPRINT_TABS)};
    var SERVICES_HTML = ${JSON.stringify(SERVICES_HTML)};
    function findGallery(){
      var details = document.querySelector('section[data-framer-name="Details"]');
      if (!details) return null;
      var el = details.previousElementSibling, guard = 0;
      while (el && guard++ < 8) {
        if (el.querySelectorAll && el.id !== 'nguyen-residential-services') {
          if (el.querySelectorAll('img').length >= 2 && el.querySelectorAll('h1').length === 0) return el;
        }
        el = el.previousElementSibling;
      }
      return null;
    }
    function hideGallery(){
      var g = findGallery();
      if (g) { g.style.setProperty('display', 'none', 'important'); return true; }
      return false;
    }
    function injectServices(){
      if (document.getElementById('nguyen-residential-services')) { hideGallery(); return true; }
      var gallery = findGallery();
      var anchor = gallery || document.querySelector('[data-framer-name="Details"]');
      if (!anchor) {
        var heads = document.querySelectorAll('h1,h2,h3');
        for (var i = 0; i < heads.length; i++) { if (/project\\s*details/i.test((heads[i].textContent || ''))) { anchor = heads[i].closest('[data-framer-name]') || heads[i]; break; } }
      }
      if (!anchor || !anchor.parentNode) return false;
      var sec = document.createElement('section');
      sec.id = 'nguyen-residential-services';
      sec.innerHTML = SERVICES_HTML;
      anchor.parentNode.insertBefore(sec, anchor);
      sec.querySelectorAll('[data-nsrc]').forEach(function (img) { img.setAttribute('src', window.location.origin + img.getAttribute('data-nsrc')); });
      sec.querySelectorAll('[data-nhref]').forEach(function (a) {
        var href = window.location.origin + a.getAttribute('data-nhref');
        a.setAttribute('href', href);
        a.addEventListener('click', function(e) { e.preventDefault(); e.stopImmediatePropagation(); window.location.href = href; }, true);
      });
      if (gallery) gallery.style.setProperty('display', 'none', 'important');
      return true;
    }
    function rebrandNode(node){
      var raw = node.nodeValue; if (!raw || !raw.trim() || done.has(node)) return;
      done.add(node);
      var next = raw;
      for (var i = 0; i < rules.length; i++) next = next.replace(rules[i][0], rules[i][1]);
      if (next !== raw) node.nodeValue = next;
    }
    function rebrand(root){
      if (!root) return;
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); var n;
      while ((n = walker.nextNode())) rebrandNode(n);
      document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) { a.setAttribute('href', 'mailto:info@nguyenarchitecture.com'); });
    }
    function effOpacity(el){ var o = 1, n = el; while (n && n !== document.body) { var v = parseFloat(window.getComputedStyle(n).opacity); if (!isNaN(v)) o *= v; if (o < 0.05) return 0; n = n.parentElement; } return o; }
    function looksBlank(){
      var root = document.getElementById('main'); if (!root) return false;
      var els = root.querySelectorAll('h1,h2,h3,p,a,button,span,li'); var visible = 0, vh = window.innerHeight || 800;
      for (var i = 0; i < els.length && visible < 3; i++) {
        var el = els[i], cs = window.getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden' || effOpacity(el) < 0.5) continue;
        var r = el.getBoundingClientRect();
        if (r.top >= vh || r.bottom <= 0 || r.width <= 0 || r.height <= 0) continue;
        if (el.textContent && el.textContent.trim()) visible++;
      }
      return visible < 3;
    }
    function reveal(){
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
    function squareImages(){
      var imgs = document.querySelectorAll('img');
      for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        var ir = parseFloat(window.getComputedStyle(img).borderTopLeftRadius) || 0;
        var iw = img.getBoundingClientRect().width || 0;
        if (ir > 0 && ir < iw / 2) img.style.setProperty('border-radius', '0', 'important');
        var el = img.parentElement, depth = 0;
        while (el && el !== document.body && depth < 4) {
          var cs = window.getComputedStyle(el);
          var br = parseFloat(cs.borderTopLeftRadius) || 0;
          var w = el.getBoundingClientRect().width || 0;
          if (br > 0 && br < w / 2) el.style.setProperty('border-radius', '0', 'important');
          el = el.parentElement; depth++;
        }
      }
    }
    var SERVICE_CARDS = [
      { href: '/client-demos/client-8889/residential/services/adus', img: '/client-8889/residential/svc-03-adus.jpg' },
      { href: '/client-demos/client-8889/residential/services/land-development', img: '/client-8889/residential/detail/ld-01-golden-meadow.png' },
      { href: '/client-demos/client-8889/residential/services/commercial', img: '/client-8889/residential/detail/cm-01-multifamily-exterior.jpg' },
      { href: '/client-demos/client-8889/residential/services/engineering-approvals', img: '/client-8889/residential/detail/eng-01-structural-frame.jpg' }
    ];
    function routeServices(){
      var sec = document.querySelector('[data-framer-name="More-Projects"]');
      if (!sec) {
        var heads = document.querySelectorAll('h1,h2,h3');
        for (var i = 0; i < heads.length; i++) { if (/our services|other project/i.test(heads[i].textContent || '')) { sec = heads[i].closest('section') || heads[i].parentElement; break; } }
      }
      if (!sec) return false;
      var cards = Array.prototype.slice.call(sec.querySelectorAll('a')).filter(function (a) { return a.querySelector('img'); });
      cards.forEach(function (a, i) {
        if (i >= SERVICE_CARDS.length) return;
        var target = window.location.origin + SERVICE_CARDS[i].href;
        a.setAttribute('href', target);
        a.removeAttribute('target'); a.removeAttribute('rel');
        if (!a.dataset.nrouted) {
          a.dataset.nrouted = '1';
          a.addEventListener('click', function(e) { e.preventDefault(); e.stopImmediatePropagation(); window.location.href = target; }, true);
        }
        var img = a.querySelector('img');
        if (img) { img.removeAttribute('srcset'); img.setAttribute('src', window.location.origin + SERVICE_CARDS[i].img); }
      });
      return true;
    }
    function rbpgBuild(tabIdx, planIdx) {
      var t = rbpgData[tabIdx];
      var p = t.plans[planIdx];
      var origin = window.location.origin;
      var ICONS = {
        home: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>',
        grid: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
        layers: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
        check: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>',
        ruler: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 3v18M3 9h6M3 15h6"/></svg>',
        building: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>',
      };
      var tabsHtml = rbpgData.map(function(tab, i) {
        return '<button class="rbpg-tab' + (i === tabIdx ? ' is-active' : '') + '" data-rbpg-tab="' + i + '">' + tab.label + '</button>';
      }).join('');
      var featuresHtml = t.features.map(function(f) {
        return '<div class="rbpg-feature"><div class="rbpg-feature-icon">' + (ICONS[f.icon] || '') + '</div><span class="rbpg-feature-label">' + f.label + '</span><span class="rbpg-feature-sub">' + f.sub + '</span></div>';
      }).join('');
      var taglineHtml = t.tagline.map(function(w) { return '<span>' + w + '</span>'; }).join('');
      var cardsHtml = t.plans.map(function(plan, i) {
        return '<button class="rbpg-card' + (i === planIdx ? ' is-active' : '') + '" data-rbpg-plan="' + i + '">' +
          '<div class="rbpg-card-img"><img src="' + origin + plan.src + '" alt="' + plan.sqft + ' floor plan" loading="lazy"></div>' +
          '<div class="rbpg-card-body"><div>' +
            '<p class="rbpg-card-sqft">' + plan.sqft + '</p>' +
            '<p class="rbpg-card-name">' + plan.name + '</p>' +
            '<p class="rbpg-card-desc">' + plan.desc + '</p>' +
          '</div><span class="rbpg-card-cta">View Plan &#8594;</span></div></button>';
      }).join('');
      return '<div class="rbpg-inner">' +
        '<div class="rbpg-label-row"><span class="rbpg-label-line" aria-hidden="true"></span><p class="rbpg-label-txt">Residential Blueprint Guide</p></div>' +
        '<div class="rbpg-main">' +
          '<div class="rbpg-left"><div><h2 class="rbpg-left-heading">' + t.heading + '</h2><p class="rbpg-left-desc">' + t.subheading + '</p><div class="rbpg-left-divider"></div></div><div class="rbpg-tagline" aria-hidden="true">' + taglineHtml + '</div></div>' +
          '<div class="rbpg-center"><div class="rbpg-featured-wrap"><img src="' + origin + p.src + '" alt="' + p.sqft + ' floor plan"></div></div>' +
          '<div class="rbpg-right"><div class="rbpg-tabs" role="tablist">' + tabsHtml + '</div>' +
            '<p class="rbpg-plan-eyebrow">Featured Plan</p>' +
            '<p class="rbpg-plan-sqft">' + p.sqft + '</p>' +
            '<h3 class="rbpg-plan-name">' + p.name + '</h3>' +
            '<div class="rbpg-plan-rule"></div>' +
            '<p class="rbpg-plan-desc">' + p.desc + '</p>' +
            '<div class="rbpg-features">' + featuresHtml + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="rbpg-cards">' + cardsHtml + '</div>' +
      '</div>';
    }
    function injectBlueprint() {
      if (document.getElementById('nguyen-blueprint-guide')) return;
      var svc = document.getElementById('nguyen-residential-services');
      if (!svc || !svc.parentNode) return;
      if (!document.getElementById('rbpg-style')) {
        var st = document.createElement('style');
        st.id = 'rbpg-style';
        st.textContent = rbpgCss;
        document.head.appendChild(st);
      }
      var sec = document.createElement('section');
      sec.id = 'nguyen-blueprint-guide';
      sec.className = 'rbpg';
      sec.setAttribute('aria-label', 'Residential Blueprint Guide');
      sec.dataset.curTab = '0';
      sec.dataset.curPlan = '0';
      sec.innerHTML = rbpgBuild(0, 0);
      svc.parentNode.insertBefore(sec, svc);
      sec.addEventListener('click', function(e) {
        var curTab = parseInt(sec.dataset.curTab || '0', 10);
        var curPlan = parseInt(sec.dataset.curPlan || '0', 10);
        var el = e.target;
        while (el && el !== sec) {
          if (el.dataset && el.dataset.rbpgTab !== undefined) {
            curTab = parseInt(el.dataset.rbpgTab, 10);
            curPlan = 0;
            sec.dataset.curTab = String(curTab);
            sec.dataset.curPlan = '0';
            sec.innerHTML = rbpgBuild(curTab, curPlan);
            return;
          }
          if (el.dataset && el.dataset.rbpgPlan !== undefined) {
            curPlan = parseInt(el.dataset.rbpgPlan, 10);
            sec.dataset.curPlan = String(curPlan);
            sec.innerHTML = rbpgBuild(curTab, curPlan);
            return;
          }
          el = el.parentElement;
        }
      });
    }
    function start(){
      rebrand(document.body);
      var observer = new MutationObserver(function (muts) {
        muts.forEach(function (m) {
          if (m.type === 'characterData') { done.delete(m.target); rebrandNode(m.target); return; }
          m.addedNodes.forEach(function (nd) { if (nd.nodeType === 3) rebrandNode(nd); else if (nd.querySelectorAll) rebrand(nd); });
        });
      });
      observer.observe(document.body, { childList: true, subtree: true, characterData: true });
      setTimeout(function () { observer.disconnect(); }, 9000);
    }
    if (isMobile) { setTimeout(start, 1800); setTimeout(function () { reveal(); }, 4500); }
    else { start(); }
    function fixNav(){
      var home = window.location.origin + '/client-demos/client-8889/arcsphere-socal';
      var services = home + '#services';
      var contact = window.location.origin + '/client-demos/client-8889/residential/contact';
      var navLinks = document.querySelectorAll('nav a, [data-framer-name="nav"] a');
      navLinks.forEach(function(a){
        var text = (a.textContent || '').trim().toLowerCase().replace(/\\s+/g,' ');
        var compact = text.replace(/\\s+/g,'');
        if (compact === 'projects' || compact === 'projectsprojects') {
          var wrap = a.closest('[class*="container"]');
          if (wrap) wrap.style.setProperty('display','none','important');
          return;
        }
        var target = null;
        if (compact === 'home' || compact === 'homehome') target = home;
        else if (compact === 'services' || compact === 'servicesservices') target = services;
        else if (compact.indexOf('nguyenarchitecture') !== -1) target = home;
        else if (compact === 'contactus' || compact === 'contactuscontactus') {
          a.setAttribute('href', contact);
          return;
        }
        if (!target) return;
        a.setAttribute('href', target);
        a.removeAttribute('target');
        a.removeAttribute('rel');
        if (a.dataset.nnav !== target) {
          a.dataset.nnav = target;
          a.addEventListener('click', function(e){ e.preventDefault(); e.stopImmediatePropagation(); window.location.href = target; }, true);
        }
      });
    }
    function fixHeroCtas() {
      var ctaUrl = window.location.origin + '/client-demos/client-8889/residential/contact';
      var CTA_KEYS = ['startaproject','bookconsultation','bookaconsultation','getintouch','startyourproject','scheduleaconsultation','scheduleconsultation','requestconsultation','letswork','letsworktogether'];
      // Scan ALL elements so we catch Framer's <div>-based buttons.
      // Use DOM ancestry for nav detection (not getBoundingClientRect which is 0 before Framer positions elements).
      document.body && document.body.querySelectorAll('*').forEach(function(el) {
        if (el.getAttribute('data-nnav') || el.getAttribute('data-nguyen-hero-cta') === '1') return;
        if (el.closest('nav, [role="navigation"]')) return;
        var key = (el.textContent || '').replace(/\s+/g,'').toLowerCase();
        if (CTA_KEYS.indexOf(key) === -1) return;
        // Skip containers — only target innermost matching element.
        var hasMatchingChild = false;
        for (var ci = 0; ci < el.children.length; ci++) {
          if ((el.children[ci].textContent || '').replace(/\s+/g,'').toLowerCase() === key) { hasMatchingChild = true; break; }
        }
        if (hasMatchingChild) return;
        el.setAttribute('data-nguyen-hero-cta', '1');
        if (el.tagName === 'A') {
          if (el.getAttribute('href') === ctaUrl) return;
          el.setAttribute('href', ctaUrl);
          el.removeAttribute('target');
          el.removeAttribute('rel');
        }
      });
    }
    [1600, 2600, 4000, 6000].forEach(function (t) { setTimeout(function () { injectServices(); injectBlueprint(); hideGallery(); squareImages(); routeServices(); fixNav(); fixHeroCtas(); }, t); });
    [800, 5000, 8000].forEach(function (t) { setTimeout(function () { squareImages(); routeServices(); fixNav(); fixHeroCtas(); if (looksBlank()) reveal(); }, t); });
  } catch (e) {}
})();
</script>`;

const SQFT_GUIDE_PATCH = `
<script id="nguyen-sqft-guide-patch">
(function () {
  var O = window.location.origin;

  /* ── plan data ── */
  var PLANS = [
    { id:’p2500’, sqft:’2,500 SQ FT’, name:’The Modern Classic’,
      desc:’A refined balance of space, function, and beauty. The 2,500 sq ft plan offers open living, generous natural light, and a layout designed for the way you live today — and tomorrow.’,
      img:’sfg-2500.png’, tags:[‘4 Bedrooms’,’3 Bathrooms’,’Open Living’,’Covered Outdoor Living’] },
    { id:’p1400’, sqft:’1,400 SQ FT’, name:’The Essential’,
      desc:"Smart, elegant, and efficient. A beautifully designed home with everything you need and nothing you don’t.",
      img:’sfg-1400.png’, tags:[‘2 Bedrooms’,’2 Bathrooms’,’Open Plan’,’Private Yard’] },
    { id:’p3800’, sqft:’3,800 SQ FT’, name:’The Expanded Life’,
      desc:’More room for what matters. Designed for growing families, entertaining, and a life well lived.’,
      img:’sfg-3800.png’, tags:[‘4–5 Bedrooms’,’3.5 Bathrooms’,’Media Room’,’Pool Ready’] },
    { id:’p5000’, sqft:’5,000 SQ FT’, name:’The Estate’,
      desc:’An exceptional scale for extraordinary living. Grand spaces, refined details, and endless possibilities.’,
      img:’sfg-5000.png’, tags:[‘5+ Bedrooms’,’5 Bathrooms’,’Home Theater’,’Resort Outdoor’] }
  ];

  var active = ‘p2500’;

  /* ── icons ── */
  var TAG_ICONS = [
    ‘<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 20V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12"/><path d="M2 14h20"/><path d="M7 8v6"/></svg>’,
    ‘<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 12h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-4z"/><path d="M6 12V5a2 2 0 0 1 2-2h1a1 1 0 0 1 1 1v1"/></svg>’,
    ‘<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20 9V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2"/><path d="M2 11a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5H2z"/><path d="M4 19v2M20 19v2"/></svg>’,
    ‘<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 22v-8"/><path d="M5 15h14M8 10l4-6 4 6"/></svg>’
  ];
  var ICO_LEAF    = ‘<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>’;
  var ICO_COMPASS = ‘<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>’;
  var ICO_HOUSE   = ‘<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>’;

  /* ── CSS (injected once) ── */
  var STYLE = ‘<style id="nsqg-style">’
    + ‘#nguyen-sqft-guide{background:#f0ede6;padding:clamp(64px,8vw,112px) 0;font-family:"Inter Display","Inter",system-ui,-apple-system,sans-serif;color:#3a352e}’
    + ‘#nguyen-sqft-guide *{box-sizing:border-box;margin:0;padding:0}’
    + ‘.nsqg-shell{width:min(1360px,100%);margin:0 auto;padding:0 clamp(24px,4vw,64px)}’
    + ‘.nsqg-eyebrow{font-size:11px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;color:#8a8177;margin:0 0 12px!important}’
    + ‘.nsqg-title{font-size:clamp(34px,4.6vw,58px);line-height:1.06;font-weight:500;letter-spacing:-.025em;color:#1f1c19;margin:0 0 12px!important}’
    + ‘.nsqg-sub{font-size:clamp(14px,1.2vw,16px);line-height:1.55;color:#6f675e;margin:0 0 clamp(36px,5vw,56px)!important}’
    + ‘.nsqg-main{display:grid;grid-template-columns:1.05fr 1fr;gap:14px}’
    /* featured */
    + ‘.nsqg-feat{display:grid;grid-template-columns:1fr 1.25fr;background:#faf8f4;border:1px solid #ddd6c8;overflow:hidden;min-height:400px}’
    + ‘.nsqg-feat-text{padding:clamp(26px,3vw,40px);display:flex;flex-direction:column}’
    + ‘.nsqg-feat-sqft{font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;color:#8a8177;margin:0 0 7px!important}’
    + ‘.nsqg-feat-name{font-size:clamp(20px,1.9vw,27px);font-weight:600;color:#1f1c19;margin:0 0 14px!important;line-height:1.15}’
    + ‘.nsqg-feat-desc{font-size:13px;line-height:1.65;color:#6f675e;flex:1}’
    + ‘.nsqg-feat-rule{border:0;border-top:1px solid #ddd6c8;margin:clamp(18px,2.5vw,28px) 0!important}’
    + ‘.nsqg-feat-list{list-style:none;display:flex;flex-direction:column;gap:11px}’
    + ‘.nsqg-feat-list li{display:flex;align-items:center;gap:10px;font-size:13px;color:#3a352e}’
    + ‘.nsqg-feat-list li svg{flex:none;color:#8a8177}’
    + ‘.nsqg-feat-imgwrap{overflow:hidden;background:#ebe6dc;border-left:1px solid #ddd6c8}’
    + ‘.nsqg-feat-imgwrap img{width:100%;height:100%;object-fit:contain;display:block;padding:clamp(14px,2.5vw,30px)}’
    /* options */
    + ‘.nsqg-options{display:flex;flex-direction:column;gap:11px}’
    + ‘.nsqg-opt{display:grid;grid-template-columns:auto 1fr auto;align-items:center;background:#faf8f4;border:1px solid #ddd6c8;overflow:hidden;cursor:pointer;transition:border-color .2s,background .2s}’
    + ‘.nsqg-opt:hover{border-color:#b7afa3;background:#f5f1ea}’
    + ‘.nsqg-opt:hover .nsqg-opt-arr{background:#1f1c19;color:#f3f0e9;border-color:#1f1c19}’
    + ‘.nsqg-opt-imgwrap{width:clamp(96px,9.5vw,136px);align-self:stretch;overflow:hidden;background:#ebe6dc}’
    + ‘.nsqg-opt-imgwrap img{width:100%;height:100%;object-fit:contain;display:block;padding:clamp(8px,1.4vw,14px)}’
    + ‘.nsqg-opt-body{padding:clamp(14px,1.8vw,22px);border-left:1px solid #ddd6c8}’
    + ‘.nsqg-opt-sqft{font-size:10px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;color:#8a8177;margin:0 0 5px!important}’
    + ‘.nsqg-opt-name{font-size:clamp(13px,1.2vw,17px);font-weight:600;color:#1f1c19;margin:0 0 6px!important;line-height:1.2}’
    + ‘.nsqg-opt-desc{font-size:12.5px;line-height:1.55;color:#6f675e}’
    + ‘.nsqg-opt-arr{flex:none;width:36px;height:36px;border:1px solid #ddd6c8;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 clamp(10px,1.6vw,18px);font-size:15px;color:#1f1c19;flex-shrink:0;transition:background .2s,color .2s,border-color .2s}’
    /* highlights */
    + ‘.nsqg-hl-row{display:grid;grid-template-columns:repeat(3,1fr);margin-top:clamp(36px,4.5vw,56px)!important;border-top:1px solid #ddd6c8}’
    + ‘.nsqg-hl{display:flex;align-items:center;gap:14px;padding:clamp(20px,2.5vw,30px) clamp(18px,2.2vw,28px)}’
    + ‘.nsqg-hl:first-child{padding-left:0}’
    + ‘.nsqg-hl:last-child{padding-right:0}’
    + ‘.nsqg-hl+.nsqg-hl{border-left:1px solid #ddd6c8}’
    + ‘.nsqg-hl svg{flex:none;color:#8a8177}’
    + ‘.nsqg-hl-txt strong{display:block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:#1f1c19;margin:0 0 4px!important}’
    + ‘.nsqg-hl-txt span{font-size:13px;color:#6f675e}’
    /* responsive */
    + ‘@media(max-width:960px){.nsqg-main{grid-template-columns:1fr}}’
    + ‘@media(max-width:640px){‘
      + ‘.nsqg-feat{grid-template-columns:1fr}’
      + ‘.nsqg-feat-imgwrap{border-left:0;border-top:1px solid #ddd6c8;aspect-ratio:4/3}’
      + ‘.nsqg-hl-row{grid-template-columns:1fr}’
      + ‘.nsqg-hl+.nsqg-hl{border-left:0;border-top:1px solid #ddd6c8}’
      + ‘.nsqg-hl:first-child,.nsqg-hl:last-child{padding-left:0}’
    + ‘}’
    + ‘</style>’;

  /* ── render helpers ── */
  function getPlan(id) { for (var i=0;i<PLANS.length;i++) if (PLANS[i].id===id) return PLANS[i]; return PLANS[0]; }
  function otherPlans(id) { return PLANS.filter(function(p){ return p.id!==id; }); }

  function featHTML(p) {
    var tags = p.tags.map(function(t,i){ return ‘<li>’+TAG_ICONS[i%4]+’ ‘+t+’</li>’; }).join(‘’);
    return ‘<div class="nsqg-feat-text">’
      +’<p class="nsqg-feat-sqft">’+p.sqft+’</p>’
      +’<h3 class="nsqg-feat-name">’+p.name+’</h3>’
      +’<p class="nsqg-feat-desc">’+p.desc+’</p>’
      +’<hr class="nsqg-feat-rule">’
      +’<ul class="nsqg-feat-list">’+tags+’</ul>’
      +’</div>’
      +’<div class="nsqg-feat-imgwrap">’
      +’<img src="’+O+’/client-8889/residential/detail/’+p.img+’" alt="’+p.sqft+’ floor plan">’
      +’</div>’;
  }

  function optsHTML(activeId) {
    return otherPlans(activeId).map(function(p){
      return ‘<div class="nsqg-opt" role="button" tabindex="0" data-plan="’+p.id+’">’
        +’<div class="nsqg-opt-imgwrap"><img src="’+O+’/client-8889/residential/detail/’+p.img+’" alt="’+p.sqft+’ floor plan"></div>’
        +’<div class="nsqg-opt-body">’
          +’<p class="nsqg-opt-sqft">’+p.sqft+’</p>’
          +’<h3 class="nsqg-opt-name">’+p.name+’</h3>’
          +’<p class="nsqg-opt-desc">’+p.desc+’</p>’
        +’</div>’
        +’<div class="nsqg-opt-arr">&#8599;</div>’
        +’</div>’;
    }).join(‘’);
  }

  function attachEvents(sec) {
    var feat = sec.querySelector(‘.nsqg-feat’);
    var opts = sec.querySelector(‘.nsqg-options’);
    if (!feat || !opts) return;
    opts.querySelectorAll(‘.nsqg-opt’).forEach(function(el) {
      el.onclick = function() {
        var id = el.getAttribute(‘data-plan’);
        if (!id) return;
        active = id;
        feat.innerHTML = featHTML(getPlan(id));
        opts.innerHTML = optsHTML(id);
        attachEvents(sec);
      };
      el.onkeydown = function(e) { if (e.key===’Enter’||e.key===’ ‘) el.click(); };
    });
  }

  /* ── find hero insertion point ── */
  function findAnchor() {
    // 1. Before the Framer "Description" section — first section after the hero
    var desc = document.querySelector(‘[data-framer-name="Description"]’);
    if (desc && desc.parentNode) return { node: desc, before: true };

    // 2. Before the injected services section (reliable — we know it works)
    var svc = document.getElementById(‘nguyen-residential-services’);
    if (svc && svc.parentNode) return { node: svc, before: true };

    // 3. Before the Framer "Details" section
    var det = document.querySelector(‘[data-framer-name="Details"]’);
    if (det && det.parentNode) return { node: det, before: true };

    return null;
  }

  /* ── inject ── */
  function inject() {
    if (document.getElementById(‘nguyen-sqft-guide’)) return true;
    var anchor = findAnchor();
    if (!anchor) return false;
    var sec = document.createElement(‘section’);
    sec.id = ‘nguyen-sqft-guide’;
    sec.innerHTML = STYLE
      + ‘<div class="nsqg-shell">’
      + ‘<p class="nsqg-eyebrow">Residential Blueprints</p>’
      + ‘<h2 class="nsqg-title">Square Footage Guide</h2>’
      + ‘<p class="nsqg-sub">A range of thoughtfully designed floor plans to fit your lifestyle.</p>’
      + ‘<div class="nsqg-main">’
        + ‘<div class="nsqg-feat">’+featHTML(getPlan(active))+’</div>’
        + ‘<div class="nsqg-options">’+optsHTML(active)+’</div>’
      + ‘</div>’
      + ‘<div class="nsqg-hl-row">’
        + ‘<div class="nsqg-hl">’+ICO_LEAF+’<div class="nsqg-hl-txt"><strong>Inspired Design</strong><span>Rooted in how you live</span></div></div>’
        + ‘<div class="nsqg-hl">’+ICO_COMPASS+’<div class="nsqg-hl-txt"><strong>Expert Guidance</strong><span>From concept to home</span></div></div>’
        + ‘<div class="nsqg-hl">’+ICO_HOUSE+’<div class="nsqg-hl-txt"><strong>A More Considered Life</strong><span>Homes that endure</span></div></div>’
      + ‘</div>’
      + ‘</div>’;
    anchor.node.parentNode.insertBefore(sec, anchor.before ? anchor.node : anchor.node.nextSibling);
    attachEvents(sec);
    return true;
  }

  // Start after 1700ms so services (#nguyen-residential-services, injected at 1600ms)
  // is in the DOM and available as the reliable fallback anchor.
  [1700, 2400, 3800, 6500].forEach(function(t){ setTimeout(inject, t); });

  var timer;
  var obs = new MutationObserver(function(){
    clearTimeout(timer);
    timer = setTimeout(function(){ if (inject()) obs.disconnect(); }, 150);
  });
  if (document.body) obs.observe(document.body, { childList: true, subtree: true });
  setTimeout(function(){ obs.disconnect(); }, 12000);
})();
</script>`;

// In-place text patching of Framer's own footer proved unreliable on mobile, so on mobile we hide
// Framer's footer entirely and drop in a clone of the commercial service page's footer
// (residential/services/[slug]/page.tsx) instead. The markup and styles mirror that footer 1:1;
// everything is scoped under #nguyen-injected-footer so it cannot leak, and the whole patch ships
// on mobile only, so desktop is untouched.
const FOOTER_REPLACE_PATCH = `
<style id="nguyen-residential-footer-replace-styles">
/* Hide Framer's own footer on mobile. The injected clone below is a <div>, not a <footer>, so this
   rule never touches it. */
footer { display: none !important; }
#nguyen-injected-footer{--bg:#efece5;--ink:#1f1c19;--muted:#6f675e;--soft:#8a8177;--line:#e0d9cc;--gold:#b3894f;
  background:var(--bg);color:var(--ink);position:relative;z-index:1;
  font-family:"Inter","Inter Display",system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif;
  -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
#nguyen-injected-footer *{box-sizing:border-box}
#nguyen-injected-footer a{color:inherit;text-decoration:none}
#nguyen-injected-footer .nrd-shell{width:min(1200px,100%);margin:0 auto;padding:0 clamp(20px,4vw,56px)}
#nguyen-injected-footer .nrd-foot{margin-top:0;border-top:1px solid var(--line);padding:clamp(40px,5vw,72px) 0 0;overflow:hidden}
#nguyen-injected-footer .nrd-foot-main{display:grid;grid-template-columns:1fr;gap:clamp(28px,4vw,56px);align-items:start}
#nguyen-injected-footer .nrd-foot-head{font-size:clamp(26px,3.4vw,40px);line-height:1.2;font-weight:500;letter-spacing:-.035em;text-transform:uppercase;margin:0;max-width:14em;color:#4f4742}
#nguyen-injected-footer a.nrd-foot-cta{display:inline-block;margin-top:clamp(20px,2.4vw,30px);font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;border-bottom:1px solid var(--ink);padding-bottom:6px;color:var(--ink)}
#nguyen-injected-footer .nrd-foot-cols{display:grid;grid-template-columns:minmax(150px,220px);justify-content:start}
#nguyen-injected-footer .nrd-foot-col{display:flex;flex-direction:column;gap:clamp(16px,1.55vw,24px)}
#nguyen-injected-footer .nrd-foot-col a{font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
#nguyen-injected-footer .nrd-foot-bottom{display:flex;flex-direction:column;align-items:flex-start;gap:20px;margin-top:clamp(34px,4vw,52px);padding-top:clamp(22px,2.6vw,32px);border-top:1px solid var(--line)}
#nguyen-injected-footer .nrd-foot-copy{font-size:11.5px;color:var(--soft);letter-spacing:.02em;margin:0}
#nguyen-injected-footer .nrd-marquee{overflow:hidden;white-space:nowrap;margin:clamp(30px,4vw,56px) 0 clamp(24px,3vw,40px)}
#nguyen-injected-footer .nrd-marquee-track{display:inline-flex;align-items:center;animation:nrd-inj-scroll 40s linear infinite;will-change:transform}
#nguyen-injected-footer .nrd-marquee-track span{flex:none;white-space:nowrap;font-size:clamp(64px,23vw,340px);line-height:.9;font-weight:800;letter-spacing:-.04em;text-transform:uppercase;color:#4f4742}
#nguyen-injected-footer .nrd-marquee-track span::after{content:"·";padding:0 .3em;color:#4f4742}
@keyframes nrd-inj-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media(prefers-reduced-motion:reduce){#nguyen-injected-footer .nrd-marquee-track{animation:none}}
#nguyen-injected-footer .nrd-foot-img{width:100%;aspect-ratio:16/6;overflow:hidden;background:#e7e0d5}
#nguyen-injected-footer .nrd-foot-img img{width:100%;height:100%;object-fit:cover;display:block}
</style>
<script id="nguyen-residential-footer-replace">
(() => {
  const ORIGIN = window.location.origin;
  const HOME = ORIGIN + '/client-demos/client-8889/arcsphere-socal';
  const CONTACT = ORIGIN + '/client-demos/client-8889/residential/contact';
  const IMG = ORIGIN + '/client-8889/residential/footer-main-1728.jpg?v=footer-hq-20260901';
  const marquee = Array.from({ length: 6 }).map(() => '<span>NGUYEN Architecture &amp; Engineering</span>').join('');
  const HTML = ''
    + '<div class="nrd-foot">'
    +   '<div class="nrd-shell">'
    +     '<div class="nrd-foot-main">'
    +       '<div class="nrd-foot-lead">'
    +         '<h2 class="nrd-foot-head">Open to new projects and collaborations that shape meaningful spaces.</h2>'
    +         '<a class="nrd-foot-cta" href="' + CONTACT + '">Start a Project</a>'
    +       '</div>'
    +       '<div class="nrd-foot-cols"><div class="nrd-foot-col">'
    +         '<a href="' + HOME + '">Home</a>'
    +         '<a href="' + HOME + '#services">Services</a>'
    +         '<a href="' + HOME + '#featured-projects">Projects</a>'
    +         '<a href="' + HOME + '">Process</a>'
    +         '<a href="' + CONTACT + '">Contact</a>'
    +       '</div></div>'
    +     '</div>'
    +     '<div class="nrd-foot-bottom"><p class="nrd-foot-copy">© 2026 NGUYEN ARCHITECTURE. All Rights Reserved.</p></div>'
    +   '</div>'
    +   '<div class="nrd-marquee" aria-hidden="true"><div class="nrd-marquee-track">' + marquee + '</div></div>'
    +   '<div class="nrd-foot-img"><img src="' + IMG + '" alt="NGUYEN residential architecture" /></div>'
    + '</div>';

  function insert() {
    if (document.getElementById('nguyen-injected-footer')) return;
    const foot = document.createElement('div');
    foot.id = 'nguyen-injected-footer';
    foot.innerHTML = HTML;
    const main = document.getElementById('main');
    if (main && main.parentNode) main.parentNode.insertBefore(foot, main.nextSibling);
    else document.body.appendChild(foot);
  }

  // CSS hides semantic <footer>s; this also hides a footer built as a Framer-named <div>.
  function hideFramerFooter() {
    document.querySelectorAll('[data-framer-name]').forEach((el) => {
      if (el.closest('#nguyen-injected-footer')) return;
      if (!/footer/i.test(el.getAttribute('data-framer-name') || '')) return;
      let top = el, p = el.parentElement;
      while (p && p !== document.body) {
        if (/footer/i.test(p.getAttribute('data-framer-name') || '')) top = p;
        p = p.parentElement;
      }
      top.style.setProperty('display', 'none', 'important');
    });
  }

  const run = () => { hideFramerFooter(); insert(); };
  run();
  window.addEventListener('load', run, { once: true });
  [300, 800, 1800, 3500, 6000, 10000].forEach((t) => setTimeout(run, t));
  // Framer keeps re-rendering during hydration; debounce so a mobile scroll cannot thrash it.
  let timer;
  const observer = new MutationObserver(() => { clearTimeout(timer); timer = setTimeout(run, 200); });
  if (document.body) observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 30000);
})();
</script>`;

async function getSource() {
  let lastError: unknown = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(SOURCE_URL, { next: { revalidate: 3600 }, headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'text/html,application/xhtml+xml' } });
      if (response.ok) return response.text();
      lastError = new Error(`Upstream returned ${response.status}`);
    } catch (error) { lastError = error; }
    if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 200 * (attempt + 1)));
  }
  throw lastError instanceof Error ? lastError : new Error('Unable to load source');
}

export async function GET() {
  try {
    let html = await getSource();
    html = removeNonVisualTelemetry(html);
    html = html.replace(/<head([^>]*)>/i, `<head$1><base href="${BASE_URL}"><meta name="robots" content="noindex,nofollow,noarchive">${CLEANUP}`);
    html = html.replace(/<title>[^<]*<\/title>/i, '<title>NGUYEN Architecture — Residential</title>');

    const userAgent = (await headers()).get('user-agent') || '';
    const mobile = isMobileUserAgent(userAgent);

    if (!mobile) {
      for (const [pattern, replacement] of REPLACEMENTS) html = html.replace(pattern, replacement);
      html = html.replace(/<base\b[^>]*>/i, `<base href="${BASE_URL}">`);
      html = html.replace(/info@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/gi, 'info@nguyenarchitecture.com');
      html = html.replace(/href=["']mailto:[^"']+["']/gi, 'href="mailto:info@nguyenarchitecture.com"');
    }

    // Mobile only — replace Framer's footer with a clone of the commercial page footer. Desktop
    // keeps Framer's footer, corrected server-side above.
    const footerReplace = mobile ? FOOTER_REPLACE_PATCH : '';
    html = html.replace('</body>', `${CLIENT_REBRAND}${SQFT_GUIDE_PATCH}${footerReplace}</body>`);
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store' } });
  } catch {
    return new Response('<!doctype html><html><body style="font-family:Arial,sans-serif;padding:40px">Residential page is temporarily unavailable. Please refresh in a moment.</body></html>', { status: 502, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
}
