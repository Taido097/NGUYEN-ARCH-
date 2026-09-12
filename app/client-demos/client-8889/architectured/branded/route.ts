// Concept 04: deterministically replace the Framer testimonial with the approved handbook.
import { GET as getHandbookDemo } from "./route-handbook-live"

export const dynamic = "force-dynamic"
export const revalidate = 0

const EXACT_TESTIMONIAL_REPLACEMENT = String.raw`<script id="td-concept04-exact-testimonial-replacement">
(() => {
  const HANDBOOK_URL = location.origin + '/client-demos/client-8889/architectured/handbook?v=exact-nguyen-24188c1';

  function normalized(value) {
    return (value || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function findTarget() {
    const exact = document.querySelector('section[data-framer-name="Testimonial 1"]')
      || document.querySelector('[data-framer-name="Testimonial 1"]')
      || document.getElementById('testimonial');
    if (exact instanceof HTMLElement) return exact;

    const candidates = Array.from(document.querySelectorAll('p,div,span,button'))
      .filter((el) => !el.hasAttribute('data-td-concept04-runtime-sentinel'));

    const quote = candidates.find((el) => normalized(el.textContent).includes('exceeded our expectations'));
    if (quote) {
      const section = quote.closest('section') || quote.closest('[data-framer-name]');
      if (section instanceof HTMLElement) return section;
    }

    const label = candidates.find((el) => normalized(el.textContent) === 'client testimonial');
    if (label) {
      const section = label.closest('section') || label.closest('[data-framer-name]');
      if (section instanceof HTMLElement) return section;
    }

    return null;
  }

  function disableLegacyHandbookRuntime() {
    let sentinel = document.getElementById('td-concept04-runtime-sentinel');
    if (!(sentinel instanceof HTMLElement)) {
      sentinel = document.createElement('div');
      sentinel.id = 'td-concept04-runtime-sentinel';
      sentinel.setAttribute('data-td-concept04-runtime-sentinel', 'true');
      sentinel.setAttribute('data-td-nguyen-handbook', 'true');
      sentinel.setAttribute('aria-hidden', 'true');
      sentinel.style.setProperty('display', 'none', 'important');
      sentinel.style.setProperty('position', 'absolute', 'important');
      sentinel.style.setProperty('width', '0', 'important');
      sentinel.style.setProperty('height', '0', 'important');
      sentinel.style.setProperty('overflow', 'hidden', 'important');
      document.body.appendChild(sentinel);
    }

    document.querySelectorAll('[data-td-nguyen-handbook-host="true"]').forEach((node) => {
      node.removeAttribute('data-td-nguyen-handbook-host');
    });

    document.querySelectorAll('[data-td-nguyen-handbook="true"]').forEach((node) => {
      if (node !== sentinel) node.remove();
    });
  }

  function styleTarget(target) {
    const styles = {
      display: 'block',
      position: 'relative',
      width: '100%',
      maxWidth: 'none',
      height: 'clamp(940px, 76vw, 1080px)',
      minHeight: '940px',
      margin: '0',
      padding: '0',
      overflow: 'hidden',
      background: '#181715',
      visibility: 'visible',
      opacity: '1'
    };

    Object.entries(styles).forEach(([property, value]) => {
      target.style.setProperty(property.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase()), value, 'important');
    });
  }

  function replaceTestimonial() {
    disableLegacyHandbookRuntime();

    const target = findTarget();
    if (!(target instanceof HTMLElement)) return false;

    target.id = 'testimonial';
    target.setAttribute('data-td-exact-concept04-handbook', 'true');
    styleTarget(target);

    let frame = target.querySelector('iframe[data-td-exact-handbook-frame="true"]');
    const onlyFrame = frame instanceof HTMLIFrameElement && target.children.length === 1 && target.firstElementChild === frame;

    if (!onlyFrame) {
      if (!(frame instanceof HTMLIFrameElement)) {
        frame = document.createElement('iframe');
        frame.setAttribute('data-td-exact-handbook-frame', 'true');
        frame.title = 'NGUYEN Architecture & Engineering Project Handbook';
        frame.setAttribute('loading', 'eager');
        frame.setAttribute('allow', 'fullscreen');
      }

      target.replaceChildren(frame);
    }

    const wantedUrl = new URL(HANDBOOK_URL, location.href).href;
    if (frame.src !== wantedUrl) frame.src = HANDBOOK_URL;

    frame.style.setProperty('display', 'block', 'important');
    frame.style.setProperty('width', '100%', 'important');
    frame.style.setProperty('height', 'clamp(940px, 76vw, 1080px)', 'important');
    frame.style.setProperty('min-height', '940px', 'important');
    frame.style.setProperty('border', '0', 'important');
    frame.style.setProperty('margin', '0', 'important');
    frame.style.setProperty('padding', '0', 'important');
    frame.style.setProperty('background', '#181715', 'important');
    frame.style.setProperty('visibility', 'visible', 'important');
    frame.style.setProperty('opacity', '1', 'important');

    return true;
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      replaceTestimonial();
    });
  };

  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });

  document.addEventListener('DOMContentLoaded', schedule, { once: true });
  window.addEventListener('load', schedule, { once: true });
  schedule();
  [20, 60, 120, 220, 400, 700, 1100, 1700, 2600, 4000, 6500, 9000].forEach((delay) => window.setTimeout(schedule, delay));
})();
</script>`

export async function GET() {
  const response = await getHandbookDemo()
  if (!response.ok) return response

  let html = await response.text()
  html = html.replace("</body>", `${EXACT_TESTIMONIAL_REPLACEMENT}</body>`)

  const headers = new Headers(response.headers)
  headers.set("Content-Type", "text/html; charset=utf-8")
  headers.set("Cache-Control", "no-store, max-age=0, must-revalidate")
  headers.set("Pragma", "no-cache")
  headers.set("Expires", "0")
  headers.delete("Content-Encoding")
  headers.delete("Content-Length")

  return new Response(html, {
    status: response.status,
    headers,
  })
}
