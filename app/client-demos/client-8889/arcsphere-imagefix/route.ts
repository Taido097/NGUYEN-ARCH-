import { GET as getConcept } from "../arcsphere-fixed/route"

const BRAND_LINK_PATCH = `
<script id="nguyen-custom-home-brand-link-patch">
(() => {
  const TARGET_TEXT = 'NGUYEN ARCHITECTURE & ENGINEERING';
  const TARGET_URL = 'https://nguyen-studio.framer.website/';
  const normalize = (value) => (value || '').replace(/\s+/g, ' ').trim();

  function patchBrand(root = document.body) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const matches = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = normalize(node.nodeValue);
      if (text === 'ArcSphere' || text === 'ArcSphere Studio' || text === TARGET_TEXT) matches.push(node);
    }

    matches.forEach((node) => {
      node.nodeValue = TARGET_TEXT;
      const element = node.parentElement;
      if (!element) return;
      const anchor = element.closest('a');
      if (anchor) {
        anchor.setAttribute('href', TARGET_URL);
        anchor.removeAttribute('target');
        anchor.removeAttribute('rel');
        return;
      }

      const link = document.createElement('a');
      link.href = TARGET_URL;
      link.style.color = 'inherit';
      link.style.textDecoration = 'none';
      element.parentNode?.insertBefore(link, element);
      link.appendChild(element);
    });
  }

  patchBrand();
  window.addEventListener('load', () => patchBrand(), { once: true });
  const observer = new MutationObserver(() => patchBrand());
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => observer.disconnect(), 6000);
})();
</script>`

export async function GET() {
  const response = await getConcept()
  if (!response.ok) return response

  const html = (await response.text()).replace('</body>', `${BRAND_LINK_PATCH}</body>`)

  const headers = new Headers(response.headers)
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'no-store')

  return new Response(html, { status: response.status, headers })
}
