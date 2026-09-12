export const TESTIMONIAL_PATCH = `
<style id="nguyen-client-testimonial-style">
  #nguyen-client-testimonial {
    --ng-bg: #f0ebe6;
    --ng-ink: #4f4742;
    --ng-muted: #8f8780;
    --ng-line: rgba(79, 71, 66, 0.15);
    width: 100%;
    margin: 0;
    padding: clamp(16px, 2vw, 28px) 24px clamp(76px, 8vw, 118px);
    background: var(--ng-bg);
    color: var(--ng-ink);
    font-family: var(--nguyen-testimonial-font, Arial, Helvetica, sans-serif);
    box-sizing: border-box;
  }

  #nguyen-client-testimonial * { box-sizing: border-box; }

  #nguyen-client-testimonial .ng-section-heading {
    max-width: 920px;
    margin: 0 auto clamp(44px, 5vw, 72px);
    text-align: center;
  }

  #nguyen-client-testimonial .ng-section-heading h2 {
    margin: 0;
    color: var(--ng-ink);
    font-family: var(--nguyen-testimonial-font, Arial, Helvetica, sans-serif);
    font-size: clamp(36px, 4.2vw, 54px);
    font-weight: 500;
    line-height: 1.04;
    letter-spacing: -0.045em;
    text-transform: uppercase;
  }

  #nguyen-client-testimonial .ng-section-heading p {
    max-width: 620px;
    margin: 22px auto 0;
    color: var(--ng-muted);
    font-size: clamp(14px, 1.45vw, 18px);
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: -0.02em;
    text-transform: uppercase;
  }

  #nguyen-client-testimonial .ng-testimonial-card {
    width: min(1180px, 100%);
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    overflow: hidden;
    background: var(--ng-bg);
    border: 1px solid var(--ng-line);
    border-radius: 8px;
  }

  #nguyen-client-testimonial .ng-testimonial-media {
    flex: 0 0 41%;
    min-width: 320px;
    min-height: 570px;
    align-self: stretch;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    filter: none !important;
  }

  #nguyen-client-testimonial .ng-media-img {
    flex: 1 1 0;
    min-width: 0;
    width: 50%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    image-rendering: -webkit-optimize-contrast;
  }

  #nguyen-client-testimonial .ng-media-img + .ng-media-img {
    border-left: 1px solid var(--ng-line);
  }

  #nguyen-client-testimonial .ng-testimonial-content {
    flex: 1 1 0;
    min-width: 0;
    padding: clamp(38px, 4.8vw, 68px) clamp(30px, 4.7vw, 66px) 0;
    display: flex;
    flex-direction: column;
    background: var(--ng-bg);
  }

  #nguyen-client-testimonial .ng-stars {
    margin: 0 0 18px;
    color: var(--ng-ink);
    font-size: 15px;
    line-height: 1;
    letter-spacing: 5px;
  }

  #nguyen-client-testimonial .ng-testimonial-title {
    margin: 0;
    color: var(--ng-ink);
    font-family: var(--nguyen-testimonial-font, Arial, Helvetica, sans-serif);
    font-size: clamp(34px, 3.5vw, 50px);
    font-weight: 400;
    line-height: 1.08;
    letter-spacing: -0.045em;
  }

  #nguyen-client-testimonial .ng-quote {
    position: relative;
    margin: 24px 0 26px;
    padding: 0 24px;
  }

  #nguyen-client-testimonial .ng-quote-mark {
    position: absolute;
    color: var(--ng-ink);
    font-size: 38px;
    font-weight: 500;
    line-height: 1;
    opacity: .82;
  }

  #nguyen-client-testimonial .ng-quote-open { left: 0; top: -4px; }
  #nguyen-client-testimonial .ng-quote-close { right: 0; bottom: -13px; }

  #nguyen-client-testimonial .ng-quote p {
    max-width: 570px;
    margin: 0;
    color: var(--ng-muted);
    font-size: clamp(15px, 1.4vw, 18px);
    font-weight: 400;
    line-height: 1.58;
    letter-spacing: -0.018em;
  }

  #nguyen-client-testimonial .ng-quote strong {
    color: var(--ng-ink);
    font-weight: 500;
  }

  #nguyen-client-testimonial .ng-divider {
    width: 100%;
    height: 1px;
    margin: 0 0 16px;
    background: var(--ng-line);
  }

  #nguyen-client-testimonial .ng-caption {
    margin: 0 0 18px;
    color: var(--ng-ink);
    font-size: 10px;
    font-weight: 500;
    line-height: 1.2;
  }

  #nguyen-client-testimonial .ng-client-art-wrap {
    margin: auto calc(clamp(30px, 4.7vw, 66px) * -1) 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    overflow: hidden;
    border-top: 1px solid var(--ng-line);
    background: var(--ng-bg);
  }

  #nguyen-client-testimonial .ng-client-logo-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 88px;
    padding: 16px 14px;
    border-right: 1px solid var(--ng-line);
    border-bottom: 1px solid var(--ng-line);
  }

  #nguyen-client-testimonial .ng-client-logo-cell:nth-child(3n) {
    border-right: none;
  }

  #nguyen-client-testimonial .ng-client-logo-cell:nth-last-child(-n+3) {
    border-bottom: none;
  }

  #nguyen-client-testimonial .ng-client-logo-img {
    display: block;
    max-width: 88%;
    max-height: 68px;
    width: auto;
    height: auto;
    object-fit: contain;
    mix-blend-mode: multiply;
  }

  #nguyen-client-testimonial .ng-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity .8s cubic-bezier(.22,.61,.36,1), transform .8s cubic-bezier(.22,.61,.36,1);
    will-change: opacity, transform;
  }

  #nguyen-client-testimonial .ng-reveal.ng-visible {
    opacity: 1;
    transform: translateY(0);
  }

  #nguyen-client-testimonial .ng-testimonial-media.ng-reveal {
    transform: scale(1.025);
  }

  #nguyen-client-testimonial .ng-testimonial-media.ng-reveal.ng-visible {
    transform: scale(1);
  }

  #nguyen-client-testimonial .ng-client-art-wrap.ng-reveal {
    transform: translateY(14px);
    transition-delay: 140ms;
  }

  #nguyen-client-testimonial .ng-client-art-wrap.ng-reveal.ng-visible {
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    #nguyen-client-testimonial .ng-reveal {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
  }

  @media (max-width: 809.98px) {
    #nguyen-client-testimonial { padding: 16px 14px 72px; }
    #nguyen-client-testimonial .ng-section-heading { margin-bottom: 40px; padding: 0 12px; }
    #nguyen-client-testimonial .ng-section-heading h2 { font-size: clamp(34px, 10.2vw, 48px); }
    #nguyen-client-testimonial .ng-section-heading p { margin-top: 17px; font-size: 14px; }
    #nguyen-client-testimonial .ng-testimonial-card { width: min(100%, 680px); flex-direction: column; border-radius: 6px; }
    #nguyen-client-testimonial .ng-testimonial-media { min-height: 0; aspect-ratio: auto; flex-direction: column; }
    #nguyen-client-testimonial .ng-media-img { width: 100%; height: auto; aspect-ratio: 16 / 10; }
    #nguyen-client-testimonial .ng-media-img + .ng-media-img { border-left: none; border-top: 1px solid var(--ng-line); }
    #nguyen-client-testimonial .ng-testimonial-content { padding: 34px 24px 0; }
    #nguyen-client-testimonial .ng-testimonial-title { font-size: clamp(30px, 9vw, 42px); }
    #nguyen-client-testimonial .ng-quote { margin-top: 22px; padding: 0 18px; }
    #nguyen-client-testimonial .ng-client-art-wrap { margin-left: -24px; margin-right: -24px; }
  }

  @media (max-width: 480px) {
    #nguyen-client-testimonial .ng-section-heading h2 { font-size: 35px; }
    #nguyen-client-testimonial .ng-section-heading p { font-size: 13px; }
    #nguyen-client-testimonial .ng-client-logo-cell { min-height: 72px; padding: 12px 8px; }
    #nguyen-client-testimonial .ng-client-logo-img { max-height: 52px; }
  }
</style>
<script id="nguyen-client-testimonial-patch">
(() => {
  const SECTION_ID = 'nguyen-client-testimonial';
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();

  const LOGOS = [
    ['/nguyen-testimonial/boba_and_brew.png', 'Boba & Brew'],
    ['/nguyen-testimonial/the_loop_nail_bar.png', 'The Loop Nail Bar'],
    ['/nguyen-testimonial/phoenix_restaurant.png', 'Phoenix Restaurant'],
    ['/nguyen-testimonial/sage_coffee_co.png', 'Sage Coffee Co.'],
    ['/nguyen-testimonial/urban_cutz_barbershop.png', 'Urban Cutz Barbershop'],
    ['/nguyen-testimonial/luxe_boutique.png', 'Luxe Boutique'],
    ['/nguyen-testimonial/hasaki_beauty_skincare.png', 'Hasaki Beauty & Skincare'],
    ['/nguyen-testimonial/vitality_wellness.png', 'Vitality Wellness'],
    ['/nguyen-testimonial/district_eatery.png', 'District Eatery']
  ];

  function findSourceTestimonial() {
    const all = Array.from(document.querySelectorAll('section, [data-framer-name], div, article'));
    const matches = all.filter((element) => {
      const text = normalize(element.textContent).toLowerCase();
      if (!text || text.length > 5000) return false;
      return text.includes('game-changing experience') &&
        text.includes('working with claryo brought clarity to decisions') &&
        text.includes('michael turner');
    });
    matches.sort((a, b) => normalize(a.textContent).length - normalize(b.textContent).length);
    return matches[0] || null;
  }

  function copySourceFont(source) {
    const title = Array.from(source.querySelectorAll('h1,h2,h3,h4,p,span')).find((el) => normalize(el.textContent).toLowerCase() === 'game-changing experience');
    const body = Array.from(source.querySelectorAll('p,div,span')).find((el) => normalize(el.textContent).toLowerCase().startsWith('working with claryo brought clarity to decisions'));
    const sample = title || body;
    if (sample) document.documentElement.style.setProperty('--nguyen-testimonial-font', window.getComputedStyle(sample).fontFamily);
  }

  function buildLogoGrid() {
    var origin = window.location.origin;
    return LOGOS.map(function(pair) {
      return '<div class="ng-client-logo-cell"><img class="ng-client-logo-img" src="' + origin + pair[0] + '" alt="' + pair[1].replace(/&/g, '&amp;') + '" decoding="async" loading="lazy"></div>';
    }).join('');
  }

  function createSection() {
    const origin = window.location.origin;
    const restaurantImg = origin + '/nguyen-testimonial/restaurant_image.png';
    const hasakiImg = origin + '/nguyen-testimonial/hasaki_storefront.jpg';
    const section = document.createElement('section');
    section.id = SECTION_ID;
    section.setAttribute('aria-label', 'What our clients say');
    section.innerHTML = [
      '<div class="ng-testimonial-card">',
        '<div class="ng-testimonial-media ng-reveal">',
          '<img class="ng-media-img" src="' + restaurantImg + '" alt="Restaurant interior" decoding="async">',
          '<img class="ng-media-img" src="' + hasakiImg + '" alt="Hasaki Beauty & Skincare storefront" decoding="async">',
        '</div>',
        '<div class="ng-testimonial-content ng-reveal">',
          '<div class="ng-stars" aria-label="5 out of 5 stars">★★★★★</div>',
          '<h3 class="ng-testimonial-title">Game-Changing Experience</h3>',
          '<blockquote class="ng-quote">',
            '<span class="ng-quote-mark ng-quote-open" aria-hidden="true">"</span>',
            '<p><strong>NGUYEN ARCHITECTURE &amp; ENGINEERING</strong> delivered exceptional service, great communication, and a final result that exceeded our expectations.</p>',
            '<span class="ng-quote-mark ng-quote-close" aria-hidden="true">"</span>',
          '</blockquote>',
          '<div class="ng-divider" aria-hidden="true"></div>',
          '<p class="ng-caption">Client Testimonial</p>',
          '<div class="ng-client-art-wrap ng-reveal" aria-label="Selected clients">',
            buildLogoGrid(),
          '</div>',
        '</div>',
      '</div>'
    ].join('');

    return section;
  }

  function setupAnimations(section) {
    const items = Array.from(section.querySelectorAll('.ng-reveal'));
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((item) => item.classList.add('ng-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('ng-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    items.forEach((item) => observer.observe(item));
  }

  // --- width alignment ---------------------------------------------------------------------------
  // The card ships capped at min(1180px, 100%) and centred. On desktop we widen it so its outer
  // edges line up with the content frame of the section directly below, whatever width Framer gives
  // that section. We only ever touch the section's horizontal padding and the card's outer width —
  // never the internal layout — and we never make the card narrower than its default, so a failed or
  // low-confidence measurement leaves the original centred card untouched.
  const MOBILE_QUERY = '(max-width: 809.98px)';

  function findSectionBelow(section) {
    let node = section;
    for (let depth = 0; depth < 6 && node && node !== document.body; depth++) {
      let sib = node.nextElementSibling;
      while (sib) {
        const tag = sib.tagName;
        if (tag !== 'SCRIPT' && tag !== 'STYLE' && tag !== 'FOOTER' && !sib.querySelector('footer')) {
          const r = sib.getBoundingClientRect();
          if (r.height > 40 && r.width > 120) return sib;
        }
        sib = sib.nextElementSibling;
      }
      node = node.parentElement;
    }
    return null;
  }

  // Estimate where a section's content actually sits by the *most common* left and right edges of
  // its non-full-bleed, in-flow, visible descendants. Using the modal edge (rather than the extreme)
  // targets the line real content aligns to and ignores a lone wider wrapper or an inner padding box.
  // Returns null when it cannot find a confident content edge (so the card stays as-is).
  function measureContentFrame(el) {
    const rect = el.getBoundingClientRect();
    if (rect.width < 200) return null;
    const bucket = (x) => Math.round(x / 3) * 3;
    const lefts = {}, rights = {};
    let any = 0, extLeft = Infinity, extRight = -Infinity;
    const kids = el.querySelectorAll('*');
    for (let i = 0; i < kids.length; i++) {
      const k = kids[i];
      const cs = window.getComputedStyle(k);
      if (cs.position === 'absolute' || cs.position === 'fixed') continue;
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const r = k.getBoundingClientRect();
      if (r.height < 10 || r.width < 60) continue;
      if (r.width > rect.width * 0.985) continue;
      const lb = bucket(r.left), rb = bucket(r.right);
      lefts[lb] = (lefts[lb] || 0) + 1;
      rights[rb] = (rights[rb] || 0) + 1;
      if (r.left < extLeft) extLeft = r.left;
      if (r.right > extRight) extRight = r.right;
      any++;
    }
    if (any < 2) return null;
    // Prefer the most frequent edge (the line real content aligns to); on a tie prefer the inner one
    // (larger left / smaller right) so the card never overhangs. Fall back to the outer content
    // extent when no edge repeats, rather than giving up and leaving the card too narrow.
    const pick = (map, inner) => {
      let bestX = null, bestC = 0;
      for (const key in map) {
        const x = Number(key), c = map[key];
        if (c > bestC || (c === bestC && bestX !== null && (inner ? x > bestX : x < bestX))) { bestC = c; bestX = x; }
      }
      return bestC >= 2 ? bestX : null;
    };
    let left = pick(lefts, true);
    let right = pick(rights, false);
    if (left === null) left = extLeft;
    if (right === null) right = extRight;
    if (!isFinite(left) || !isFinite(right) || (right - left) < rect.width * 0.4) return null;
    return { left: Math.max(left, rect.left), right: Math.min(right, rect.right) };
  }

  function clearAlignment(section) {
    section.style.removeProperty('padding-left');
    section.style.removeProperty('padding-right');
    const card = section.querySelector('.ng-testimonial-card');
    if (card) {
      card.style.removeProperty('width');
      card.style.removeProperty('max-width');
      card.style.removeProperty('margin');
    }
  }

  function alignToSectionBelow(section) {
    if (!section) return;
    if (window.matchMedia(MOBILE_QUERY).matches) { clearAlignment(section); return; }
    const card = section.querySelector('.ng-testimonial-card');
    if (!card) return;
    const below = findSectionBelow(section);
    if (!below) return;
    const frame = measureContentFrame(below);
    if (!frame) return;
    const targetWidth = frame.right - frame.left;
    if (targetWidth <= card.getBoundingClientRect().width + 1) return;
    const secRect = section.getBoundingClientRect();
    section.style.paddingLeft = Math.max(0, Math.round(frame.left - secRect.left)) + 'px';
    section.style.paddingRight = Math.max(0, Math.round(secRect.right - frame.right)) + 'px';
    card.style.width = '100%';
    card.style.maxWidth = 'none';
    card.style.margin = '0';
  }

  function install() {
    if (!document.body || document.getElementById(SECTION_ID)) return !!document.getElementById(SECTION_ID);
    const source = findSourceTestimonial();
    if (!source || !source.parentElement) return false;
    copySourceFont(source);
    const section = createSection();
    source.replaceWith(section);
    setupAnimations(section);
    return true;
  }

  function installAndAlign() {
    install();
    const section = document.getElementById(SECTION_ID);
    if (section) alignToSectionBelow(section);
    return !!section;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installAndAlign, { once: true });
  else installAndAlign();
  window.addEventListener('load', installAndAlign, { once: true });
  [250, 800, 1800, 3500, 6000].forEach((delay) => setTimeout(installAndAlign, delay));

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const section = document.getElementById(SECTION_ID);
      if (section) alignToSectionBelow(section);
    }, 160);
  });
})();
</script>`
