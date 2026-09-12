const SOURCE_URL = 'https://orkan.framer.website/';

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
