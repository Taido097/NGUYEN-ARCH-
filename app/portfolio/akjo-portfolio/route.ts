const SOURCE_URL = 'https://agreeable-light-499126.framer.app/';

export const revalidate = 86400;

const CLEANUP_STYLES = `
<style id="designedbytd-demo-cleanup">
  #__framer-badge-container,
  [id^="__framer-editorbar"],
  [class*="framer-editorbar"],
  a[href*="framer.com"]:has([aria-label*="Framer"]),
  a[href*="framer.com"]:has(svg) {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
</style>`;

const EMBED_PREVIEW_SCRIPT = `
<script id="designedbytd-akjo-preview-motion">
(() => {
  if (window.self === window.top) return;

  const run = () => {
    const doc = document.documentElement;
    const body = document.body;
    if (!doc || !body) return;

    doc.style.scrollBehavior = 'auto';
    body.style.scrollBehavior = 'auto';

    const maxScroll = Math.max(
      0,
      doc.scrollHeight - window.innerHeight,
      body.scrollHeight - window.innerHeight,
    );

    if (maxScroll <= 0) return;

    const target = Math.min(maxScroll * 0.18, 760);
    const duration = 1150;
    const delay = 180;

    window.scrollTo(0, 0);

    window.setTimeout(() => {
      const startedAt = performance.now();

      const tick = (now) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, target * eased);

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          window.scrollTo(0, target);
        }
      };

      requestAnimationFrame(tick);
    }, delay);
  };

  if (document.readyState === 'complete') {
    window.setTimeout(run, 120);
  } else {
    window.addEventListener('load', () => window.setTimeout(run, 120), { once: true });
  }
})();
</script>`;

export async function GET() {
  try {
    const response = await fetch(SOURCE_URL, {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return new Response('Demo unavailable', { status: 502 });
    }

    let html = await response.text();

    html = html.replace(
      /<head([^>]*)>/i,
      `<head$1><base href="${SOURCE_URL}"><meta name="robots" content="noindex,follow">${CLEANUP_STYLES}`,
    );

    html = html.replace(/<\/body>/i, `${EMBED_PREVIEW_SCRIPT}</body>`);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    });
  } catch {
    return new Response('Demo unavailable', { status: 502 });
  }
}
