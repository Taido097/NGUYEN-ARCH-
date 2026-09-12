const SOURCE_URL = 'https://forgiving-consistency-572880.framer.app/';

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

  a[data-framer-name="Logo"] img {
    display: none !important;
  }

  .framer-f3O3P a[data-framer-name="Logo"]::after {
    content: "DesignedbyTD Studio";
    color: #000;
    font-family: "Host Grotesk", Arial, sans-serif;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1;
    white-space: nowrap;
  }

  .framer-4uMl1 a[data-framer-name="Logo"]::after {
    content: "DesignedbyTD Studio";
    color: #fff;
    font-family: "Host Grotesk", Arial, sans-serif;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1;
    white-space: nowrap;
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

    html = html
      .replaceAll('Dento - Dental Clinic Template', 'DesignedbyTD Studio')
      .replaceAll('Dento', 'DesignedbyTD Studio');

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
