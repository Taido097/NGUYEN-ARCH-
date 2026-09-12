const SOURCE_URL = 'https://authentic-embeds-919183.framer.app/';

export const revalidate = 86400;

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
      `<head$1><base href="${SOURCE_URL}"><meta name="robots" content="noindex,follow">`,
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
