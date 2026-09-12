const SOURCE_URL = 'https://architectured.framer.website/';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const CLIENT_PATCH = String.raw`
(() => {
  const TARGETS = {
    hero: {
      'Years of creating spaces': 'Years of experience',
      '90+': '500+',
      'Amazing projects brought to life': 'Successful projects',
      '75+': '2',
      'Happy clients, happy spaces': 'California regions',
      '11': '100%',
      'Designs that earn awards': 'Focused on our clients',
      'Architecture that connects people and places': 'Architecture, engineering and permits—one team.',
      'We design more than buildings—we create spaces that foster connection, creativity, and community': 'NGUYEN Architecture & Engineering provides full-service design, engineering, code compliance and permit support for commercial, residential and ADU projects across California.',
      'Get Template': 'Request Consultation'
    },
    services: {
      'Explore our services and see how we bring creativity and expertise to every project': 'One coordinated team for planning, architecture, structural, MEP, code, energy compliance and permit services.',
      'Architectural Design': 'Site & Planning + Architectural Design',
      'Site Planning': 'Site Survey & Existing Conditions',
      'Layout Design': 'Zoning & Code Review',
      '3D Visualization': 'Space Planning',
      'Rendering': 'Concept Design',
      'Construction Documentation': 'Floor Plans',
      'Schematic Design Development': 'Elevations & Sections',
      'BIM': 'Reflected Ceiling Plans',
      'And more...': 'Construction Details · 3D Renderings · TI Plans',
      'Interior Design & Planning': 'Structural Engineering',
      'Space Planning & Optimization': 'Structural Design',
      'Furniture & Fixture Selection': 'Structural Details',
      'Material Selection': 'Structural Calculations',
      'Lighting Design': 'Foundation & Framing',
      'Art & Accessory Curation': 'Retaining Walls',
      'Custom Cabinetry Design': 'Existing Building Modification',
      'Interior Landscaping': 'ADU & Commercial TI Structural Support',
      'Consulting Services': 'MEP Engineering',
      'Site & Building Code Consultation': 'Electrical Design',
      'Design & Concept Review': 'Plumbing Design',
      'Technical Advisory Services': 'HVAC Design',
      'Cost Estimation & Budgeting': 'Electrical Load Calculations',
      'Project Feasibility Consulting': 'Equipment Coordination',
      'Project Management': 'Code, Energy & Permit Services',
      'Pre-Construction Planning': 'Title 24',
      'Site Inspection & Supervision': 'CalGreen',
      'Cost Estimation': 'ADA Compliance',
      'Resource Allocation': 'Building Code Review',
      'Timeline & Milestone Tracking': 'Accessibility · Occupancy & Egress',
      'Contractor & Vendor Management': 'Permit Submittal · City Submittal',
      'Final Inspection & Handover': 'Plan Check · Corrections · Resubmittal · Approval Support',
      'Explore All Services': 'Start a Project'
    },
    about: {
      'Welcome to our world of creativity, where every project starts with a dream and ends with a space that feels like home.': 'At NGUYEN, every project starts with a clear plan and moves through design, engineering and permit approval.',
      'Take a glimpse into our world of creativity and innovation.': 'One team. Complete solution.',
      'Our journey began 15 years ago, with a simple idea: to design spaces that blend beauty and functionality seamlessly. What started as a small team with big dreams has grown into a thriving studio, known for turning ideas into reality. Along the way, we’ve collaborated with incredible clients, tackled exciting challenges, and built spaces we’re truly proud of.': 'NGUYEN Architecture & Engineering provides full-service solutions from design and engineering through permit processing for commercial projects, custom homes and ADUs. Our in-house team coordinates architectural, structural, MEP and Title 24 work with local code and permit requirements to help projects move efficiently from concept to approval.',
      'Know About Us': 'About NGUYEN'
    },
    differences: {
      'Our Differences': 'Why Choose Us',
      'what makes us different (and totally awesome)': 'Built on values. Focused on results.',
      'Designs with heart and soul': 'Client Focused',
      'We don’t just design buildings; we craft spaces where life happens, memories are made, and dreams come true. Every project is as unique as the people living in it.': 'We listen, understand project goals and communicate clearly from the first conversation through approval.',
      'Expert guidance': 'Quality Driven',
      'Smooth and stress-free process': 'Code & Safety Compliant',
      'Save time and stay on budget': 'On Time & On Budget'
    },
    process: {
      'How we work': 'Our Process',
      'Let’s turn your big ideas into a masterpiece with a clear and fun process': 'A clear, coordinated path from the first conversation through design, engineering, permit submittal and approval.',
      'Initial Consultation': 'Consultation & Feasibility',
      'We begin by sitting down with you to understand your vision, goals, and preferences. This is where we listen carefully to your ideas, discuss your needs, and explore what’s possible.': 'We discuss goals, scope, budget and schedule, then review the site, existing conditions, zoning, land use and code requirements to define a practical approval path.',
      'Concept Development': 'Concept Design',
      'Once we have a clear understanding of your goals, we move on to brainstorming and designing. We create initial sketches, layouts, and concepts tailored to your unique vision.': 'We develop conceptual design, preliminary layouts, 3D massing or renderings and the design direction that will guide the project.',
      'Planning & Preparation': 'Design & Engineering',
      'With the concept approved, we focus on the practicalities. From detailed drawings and material selection to project timelines and budgets, we ensure every aspect is planned meticulously.': 'Architecture, structural engineering, MEP and Title 24 documentation are coordinated as one complete permit-ready package.',
      'Execution & Delivery': 'Permit & Approval',
      'This is the exciting part—bringing the plan to life! Whether it’s overseeing construction, managing installations, or delivering the final design, we’re with you every step of the way. We ensure the project is completed to the highest standards, turning your vision into reality.': 'We prepare and submit the permit package, coordinate plan check, respond to comments, manage revisions and resubmittals, and support the project through final approval.'
    },
    gallery: {
      '800+': '500+',
      'Project images': 'Successful projects',
      'Don’t just take our word for it—see how we turn ideas into stunning spaces. Our gallery is full of inspiration for your next big project!': 'Commercial experience includes boba shops and cafés, restaurants, nail and beauty salons, retail stores, offices and tenant improvements, commercial remodels, new commercial buildings and TI projects—plus custom homes and ADUs.',
      'Browse Gallery': 'View Project Types'
    },
    blogs: {
      'Blogs': 'Project Insights',
      'No fluff, no jargon—just simple, practical advice for making your space look and feel amazing. .': 'Practical guidance around commercial design, engineering, code compliance, ADUs and the permit process.',
      'Latest Blogs': 'Latest Insights',
      'All Blogs': 'Start a Project'
    },
    faq: {
      'FAQs': 'Project FAQs',
      'We’ve answered the big questions, but if you still have something on your mind, we’re here to help.': 'Questions about architecture, engineering, project types, ADUs, code compliance or permitting? Start here.',
      'We’re just a form away—send us your question, and we’ll be happy to help!': 'Tell NGUYEN about your project and the team can help map the next steps.',
      'Messsage': 'Message',
      'Send Message': 'Email NGUYEN'
    },
    footer: {
      'The #1 architecture firm in Texas turning dreams into beautiful, functional spaces. from cozy homes to innovative designs, we bring your vision to life—one detail at a time. let’s create something amazing together!': 'Full-service architecture, engineering, Title 24, code compliance and permitting for commercial projects, custom homes and ADUs across Northern and Southern California.',
      '(217) 555-0134': '(209) 233-8888',
      '(217) 444-0134': '(714) 707-8889',
      'architect@email.com': 'info@nguyenarchitecture.com',
      '123 Main Street, Suite 200, Austin, TX 78701': '7171 Warner Ave. Ste. B, Huntington Beach, CA 92647',
      'Opening Hours': 'Service Area',
      'Mon to Sat: 9.00am - 8.30pm': 'Northern California · Sacramento',
      'Sun: Closed': 'Southern California · Orange County',
      'Subscribe to the newsletter': 'Start a project',
      'Subscribe': 'Email Us',
      'Albums': 'Project Types',
      'Career': 'Contact',
      'Linkedin': 'Website',
      'Facebook': 'Email',
      'Twitter/X': 'Call Orange County',
      'Youtube': 'Call Sacramento',
      'Instagram': 'Orange County',
      'Pinterest': 'Northern California',
      'Architect': 'NGUYEN',
      'Privacy Policy': 'Architecture · Engineering',
      'Terms': 'Design · Engineer · Permit',
      '©Template by RealMehedi': '© NGUYEN Architecture & Engineering',
      'Built in Framer': 'Concept 04'
    }
  };

  const PROJECTS = [
    {
      oldTitle: 'Skyline Corporate Hub',
      pairs: {
        'Skyline Corporate Hub': 'Boba Shops & Cafés',
        'Office': 'Tenant Improvement',
        'Central Business District.': 'Garden Grove, CA',
        '2022': 'Interior TI',
        '350,000 sq. ft.': '1,200 SF'
      }
    },
    {
      oldTitle: 'LuxeHaven Villa',
      pairs: {
        'LuxeHaven Villa': 'Restaurants',
        'Residential': 'Commercial',
        'Luxury Villa': 'Tenant Improvement',
        'Savannah, Georgia': 'Anaheim, CA',
        '2023': 'Full-service restaurant',
        '4000sqft': '3,500 SF'
      }
    },
    {
      oldTitle: 'Celestial Towers Condominiums',
      pairs: {
        'Celestial Towers Condominiums': 'New Commercial Buildings',
        'Residential': 'Commercial',
        'Apartment and Condo': 'Architecture + Engineering',
        'New Orleans, Louisiana': 'Riverside, CA',
        '2024': 'Ground-Up',
        '300,000 sq. ft.': '8,500 SF'
      }
    }
  ];

  const BLOGS = [
    ['How to turn “cozy” into “wow”: 5 Pro Tips for Making the Most of Small Spaces', 'Tenant Improvement: From Site Review to Permit Approval', 'Permit & Planning'],
    ['Turning Spaces into Stories: How We Create Meaningful Architecture', 'What to Plan for Before Opening a Restaurant or Café', 'Commercial Design'],
    ['Retail Revolution: How Architecture Is Transforming Shopping Experiences', 'ADU Design, Engineering & Permit — One Coordinated Team', 'ADU Solutions'],
    ['Tiny but Mighty: 7 Genius Design Hacks for Compact Living', 'How Title 24, CalGreen & ADA Fit Into Your Project', 'Code & Engineering'],
    ['From Chaos to Cozy: Tips to Turn Your Cramped Space into a Stylish Sanctuary', 'New Commercial Buildings: From Concept to Completion', 'Architecture + Engineering']
  ];

  const FAQS = [
    ['Do you handle permit submittal and plan check?', 'Yes. Permit support includes permit package preparation, city or agency submittal, plan check coordination, corrections, resubmittals and permit approval support.'],
    ['Can NGUYEN coordinate architecture and engineering under one team?', 'Yes. NGUYEN coordinates architectural design, structural engineering, MEP engineering and Title 24 as an integrated project team.'],
    ['What commercial project types do you work on?', 'Commercial work includes boba shops and cafés, restaurants, nail and beauty salons, retail stores, offices and tenant improvements, commercial remodels and renovations, new commercial buildings and TI projects.'],
    ['Can you help with ADUs?', 'Yes. ADU services can include planning, architectural design, structural engineering, MEP engineering, Title 24 and permit coordination.'],
    ['What ADU types do you design?', 'The provided project material includes detached ADUs, attached ADUs, garage conversion ADUs, Junior ADUs (JADUs) and basement ADUs.'],
    ['What engineering services are available?', 'Engineering services include structural design and calculations plus electrical, plumbing and HVAC design, electrical load calculations and equipment coordination.'],
    ['Can I see a 3D model or rendering of my design?', 'Yes. The architectural services include 3D renderings as part of the design and visualization scope.'],
    ['What does permit support include?', 'Permit services include permit and city submittal, plan check coordination, corrections and resubmittals, permit approval support and construction support.'],
    ['Do you handle code and energy compliance?', 'Yes. Services include Title 24, CalGreen, ADA compliance, building code review, accessibility, and occupancy and egress coordination.'],
    ['Where does NGUYEN provide services?', 'NGUYEN’s materials identify service across Northern and Southern California, with Orange County and Sacramento locations or service presence.'],
    ['How do I start a project?', 'Email info@nguyenarchitecture.com or call (714) 707-8889 or (209) 233-8888 to discuss the project scope and next steps.']
  ];

  const norm = (value) => (value || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
  const compact = (value) => norm(value).replace(/\s/g, '');
  const blocked = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'PATH', 'TEXTAREA']);

  function textNodes(el) {
    const out = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.parentElement || blocked.has(node.parentElement.tagName)) continue;
      if (!norm(node.nodeValue)) continue;
      out.push(node);
    }
    return out;
  }

  function writePreservingStructure(el, value) {
    const nodes = textNodes(el);
    if (!nodes.length) {
      el.textContent = value;
      return;
    }
    if (nodes.length === 1) {
      const old = nodes[0].nodeValue || '';
      const lead = old.match(/^\s*/)?.[0] || '';
      const trail = old.match(/\s*$/)?.[0] || '';
      nodes[0].nodeValue = lead + value + trail;
      return;
    }
    const chars = Array.from(value);
    nodes.forEach((node, index) => {
      node.nodeValue = index < chars.length ? chars[index] : '';
    });
    if (chars.length > nodes.length) {
      nodes[nodes.length - 1].nodeValue += chars.slice(nodes.length).join('');
    }
  }

  function patchMap(root, map) {
    const entries = Object.entries(map);
    const elements = Array.from(root.querySelectorAll('*')).reverse();
    for (const el of elements) {
      if (blocked.has(el.tagName)) continue;
      const current = norm(el.textContent);
      if (!current) continue;
      for (const [from, to] of entries) {
        if (current === norm(from) || compact(current) === compact(from)) {
          writePreservingStructure(el, to);
          break;
        }
      }
    }
  }

  function findByText(text, root = document) {
    const wanted = compact(text);
    return Array.from(root.querySelectorAll('h1,h2,h3,h4,p,a,span,div')).find((el) => compact(el.textContent) === wanted) || null;
  }

  function patchProjects() {
    for (const project of PROJECTS) {
      const title = findByText(project.oldTitle);
      if (!title) continue;
      const card = title.closest('a') || title.parentElement?.parentElement || title.parentElement;
      if (card) patchMap(card, project.pairs);
    }
    const heading = findByText('Our Best Projects');
    if (heading) writePreservingStructure(heading, 'Featured Project Types');
    const sub = findByText('What we’ve been up to—check out our latest projects');
    if (sub) writePreservingStructure(sub, 'Commercial spaces designed around customer experience, operations, code requirements and efficient permitting.');
    const all = findByText('View All Projects');
    if (all) writePreservingStructure(all, 'View Project Types');
  }

  function patchBlogs() {
    for (const [oldTitle, newTitle, category] of BLOGS) {
      const title = findByText(oldTitle);
      if (!title) continue;
      const card = title.closest('a') || title.parentElement?.parentElement?.parentElement;
      if (!card) continue;
      patchMap(card, {
        [oldTitle]: newTitle,
        'December 5, 2024': 'PROJECT GUIDE',
        'September 24, 2024': 'PROJECT GUIDE',
        'Tips': category,
        'Design & Inspiration': category,
        'Industry Insights': category,
        'Ryan Milford': 'NGUYEN',
        'James Miller': 'NGUYEN'
      });
    }
  }

  function patchTestimonial() {
    const phrase = compact('We came in with a Pinterest board full of ideas and left with the home of our dreams! The team made everything so easy, listening to every little detail and turning our scattered thoughts into something magical.');
    const candidates = Array.from(document.querySelectorAll('p,div'));
    const matches = candidates.filter((el) => compact(el.textContent).includes(phrase));
    const target = matches.sort((a,b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length)[0];
    if (target) writePreservingStructure(target, '“NGUYEN Architecture & Engineering delivered exceptional service, great communication, and a final result that exceeded our expectations.”');
    const author = findByText('Orion Caldwell, Home Owner');
    if (author) writePreservingStructure(author, 'Client Testimonial');
  }

  function sectionByName(name) {
    return Array.from(document.querySelectorAll('section')).find((el) => el.getAttribute('data-framer-name') === name) || null;
  }

  function setIds() {
    const main = document.querySelector('main');
    if (main) main.id = 'top';
    const ids = [
      ['Section - Services', 'services'],
      ['Section - Projects', 'projects'],
      ['Section - Value and About', 'about'],
      ['Section - Our Differences', 'why-us'],
      ['Testimonial 1', 'testimonial'],
      ['Section - Our Process', 'process'],
      ['Section - Gallery CTA', 'gallery'],
      ['Section - Blogs', 'insights'],
      ['Section - FAQ', 'faq']
    ];
    for (const [name, id] of ids) {
      const section = sectionByName(name);
      if (section) section.id = id;
    }
  }

  function patchFaqs() {
    const section = sectionByName('Section - FAQ') || document.getElementById('faq');
    if (!section) return;
    const questions = Array.from(section.querySelectorAll('h3')).filter((h) => norm(h.textContent));
    questions.slice(0, FAQS.length).forEach((question, index) => {
      const [q, a] = FAQS[index];
      writePreservingStructure(question, q);
      let root = question.parentElement;
      while (root && root !== section && !root.querySelector('[data-framer-name="Answer Wrapper"]')) root = root.parentElement;
      const answerWrapper = root?.querySelector('[data-framer-name="Answer Wrapper"]');
      const answer = answerWrapper?.querySelector('p') || answerWrapper;
      if (answer) writePreservingStructure(answer, a);
    });
  }

  function patchInputs() {
    document.querySelectorAll('input[name="Name"]').forEach((el) => el.setAttribute('placeholder', 'Your name'));
    document.querySelectorAll('input[name="Phone"]').forEach((el) => el.setAttribute('placeholder', '(000) 000-0000'));
    document.querySelectorAll('input[name="Email"]').forEach((el) => el.setAttribute('placeholder', 'you@example.com'));
    document.querySelectorAll('textarea[name="Message"]').forEach((el) => el.setAttribute('placeholder', 'Tell us about your project'));
  }

  function patchLinks() {
    const navTargets = {
      'Home': '#top',
      'About': '#about',
      'About us': '#about',
      'Services': '#services',
      'Projects': '#projects',
      'Project Types': '#projects',
      'Reviews': '#testimonial',
      'Contact': '#faq',
      'Request Consultation': 'mailto:info@nguyenarchitecture.com?subject=Project%20Consultation',
      'Start a Project': 'mailto:info@nguyenarchitecture.com?subject=New%20Project',
      'Start a project': 'mailto:info@nguyenarchitecture.com?subject=New%20Project',
      'Email Us': 'mailto:info@nguyenarchitecture.com',
      'View Project Types': '#projects',
      'About NGUYEN': '#about',
      'Latest Insights': '#insights',
      'Website': 'https://www.nguyenarchitecture.com',
      'Email': 'mailto:info@nguyenarchitecture.com',
      'Call Orange County': 'tel:7147078889',
      'Call Sacramento': 'tel:2092338888',
      'Orange County': '#faq',
      'Northern California': '#faq'
    };
    document.querySelectorAll('a').forEach((a) => {
      const text = norm(a.textContent);
      if (navTargets[text]) a.setAttribute('href', navTargets[text]);
      const href = a.getAttribute('href') || '';
      if (/architectured\.framer\.website|framer\.com\/marketplace|realmehedi/i.test(href)) {
        if (a.closest('#projects')) a.setAttribute('href', '#projects');
        else if (a.closest('#insights')) a.setAttribute('href', '#faq');
        else a.setAttribute('href', '#top');
      }
    });
    document.querySelectorAll('a').forEach((a) => {
      const text = norm(a.textContent);
      if (text.includes('(714) 707-8889')) a.setAttribute('href', 'tel:7147078889');
      if (text.includes('(209) 233-8888')) a.setAttribute('href', 'tel:2092338888');
      if (text.includes('info@nguyenarchitecture.com')) a.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
    });
  }

  function activateForms() {
    document.querySelectorAll('form').forEach((form) => {
      if (form.dataset.nguyenBound === 'true') return;
      form.dataset.nguyenBound = 'true';
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const name = String(data.get('Name') || '');
        const phone = String(data.get('Phone') || '');
        const email = String(data.get('Email') || '');
        const message = String(data.get('Message') || '');
        if (name || phone || message) {
          const body = ['Name: ' + name, 'Phone: ' + phone, 'Email: ' + email, '', message].join('\n');
          location.href = 'mailto:info@nguyenarchitecture.com?subject=' + encodeURIComponent('Website Project Inquiry') + '&body=' + encodeURIComponent(body);
        } else {
          location.href = 'mailto:info@nguyenarchitecture.com?subject=' + encodeURIComponent('Project Inquiry');
        }
      });
    });
  }

  function fixNav() {
    var home = window.location.origin + window.location.pathname;
    var navLinks = document.querySelectorAll('nav a, header a, [data-framer-name] a');
    navLinks.forEach(function (a) {
      var text = (a.textContent || '').trim().toLowerCase().replace(/\s+/g, ' ');
      if (/^(projects?|project types?|commercial projects?|view projects?)$/.test(text)) {
        var wrap = a.closest('[class*="container"]') || a.closest('li') || a.parentElement;
        if (wrap && wrap !== document.body) wrap.style.setProperty('display', 'none', 'important');
        return;
      }
      if (!a.querySelector('img') && !a.dataset.nnav && !a.matches('[href^="mailto:"], [href^="tel:"], [href^="#"]')) {
        a.dataset.nnav = '1';
        a.setAttribute('href', home);
        a.addEventListener('click', function (e) { e.preventDefault(); e.stopImmediatePropagation(); window.location.href = home; }, true);
      }
    });
  }

  function patchAll() {
    setIds();
    patchMap(document, TARGETS.hero);
    patchMap(document, TARGETS.services);
    patchProjects();
    patchMap(document, TARGETS.about);
    patchMap(document, TARGETS.differences);
    patchTestimonial();
    patchMap(document, TARGETS.process);
    patchMap(document, TARGETS.gallery);
    patchMap(document, TARGETS.blogs);
    patchBlogs();
    patchMap(document, TARGETS.faq);
    patchMap(document, TARGETS.footer);
    patchFaqs();
    patchInputs();
    patchLinks();
    fixNav();
    activateForms();
    document.title = 'NGUYEN Architecture & Engineering — Concept 04';
  }

  let queued = false;
  const queuePatch = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      patchAll();
    });
  };

  const observer = new MutationObserver(queuePatch);
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });

  patchAll();
  document.addEventListener('DOMContentLoaded', () => {
    patchAll();
    requestAnimationFrame(() => {
      patchAll();
      document.documentElement.classList.remove('nguyen-template-boot');
      document.documentElement.classList.add('nguyen-template-ready');
    });
  }, { once: true });

  let checks = 0;
  const timer = setInterval(() => {
    patchAll();
    checks += 1;
    if (checks >= 40) clearInterval(timer);
  }, 125);

  window.__nguyenPatchConcept04 = patchAll;
})();
`;

const BOOT_STYLE = String.raw`<style id="nguyen-concept04-boot">
html.nguyen-template-boot body{opacity:0!important;visibility:hidden!important}
html.nguyen-template-ready body{opacity:1!important;visibility:visible!important}
#__framer-badge-container,#__framer-editorbar,#phia-extension-root{display:none!important}
</style><script>document.documentElement.classList.add('nguyen-template-boot')</script>`;

function replaceMeta(html: string) {
  let output = html;
  output = output.replace(/<title>[\s\S]*?<\/title>/i, '<title>NGUYEN Architecture &amp; Engineering — Concept 04</title>');
  output = output.replace(/<meta name="description" content="[^"]*">/i, '<meta name="description" content="Full-service architecture, engineering, Title 24, code compliance and permit solutions for commercial, residential and ADU projects across California.">');
  output = output.replace(/<meta property="og:title" content="[^"]*">/i, '<meta property="og:title" content="NGUYEN Architecture &amp; Engineering — Concept 04">');
  output = output.replace(/<meta property="og:description" content="[^"]*">/i, '<meta property="og:description" content="Architecture, engineering and permit solutions for commercial, residential and ADU projects across California.">');
  output = output.replace(/<meta name="twitter:title" content="[^"]*">/i, '<meta name="twitter:title" content="NGUYEN Architecture &amp; Engineering — Concept 04">');
  output = output.replace(/<meta name="twitter:description" content="[^"]*">/i, '<meta name="twitter:description" content="Architecture, engineering and permit solutions for commercial, residential and ADU projects across California.">');
  output = output.replace(/<link rel="canonical"[^>]*>/i, '<link rel="canonical" href="https://designedbytd.com/client-demos/client-8889/architectured">');
  output = output.replace(/<meta property="og:url"[^>]*>/i, '<meta property="og:url" content="https://designedbytd.com/client-demos/client-8889/architectured">');
  return output;
}

export async function GET() {
  let source = '';
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(SOURCE_URL, {
        cache: 'no-store',
        headers: { 'user-agent': 'Mozilla/5.0 NGUYEN Concept 04' },
      });
      if (!response.ok) throw new Error('Template fetch failed: ' + response.status);
      source = await response.text();
      break;
    } catch (error) {
      lastError = error;
    }
  }
  if (!source) throw lastError instanceof Error ? lastError : new Error('Unable to load template source');

  let html = replaceMeta(source);
  html = html.replace('<head>', '<head><base href="https://architectured.framer.website/">' + BOOT_STYLE);
  const moduleMarker = '<script type="module"';
  const moduleIndex = html.indexOf(moduleMarker);
  const injected = '<script id="nguyen-concept04-patch">' + CLIENT_PATCH + '<\/script>';
  if (moduleIndex >= 0) html = html.slice(0, moduleIndex) + injected + html.slice(moduleIndex);
  else html = html.replace('</body>', injected + '</body>');

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store, max-age=0, must-revalidate',
      pragma: 'no-cache',
      expires: '0',
    },
  });
}
