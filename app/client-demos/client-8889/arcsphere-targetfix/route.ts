import { GET as getConcept } from "../arcsphere-imagefix/route"

const TARGET_IMAGE_PATCH = `
<script id="nguyen-custom-home-target-image-patch-v4">
(() => {
  if (window.matchMedia('(max-width: 767px)').matches) return;

  const TARGET_SRC = window.location.origin + '/client-8889/residential/house-2-custom.avif?v=custom-home-house-20260828-2';
  const compact = (value) => (value || '').replace(/\\s+/g, '').trim().toLowerCase();
  const WRONG_WIDTH = 1377;
  const WRONG_HEIGHT = 768;

  function isCustomHomeDetail() {
    const text = compact(document.body?.textContent);
    return text.includes(compact('CUSTOM HOME')) && text.includes(compact('Project Details'));
  }

  function isExactWrongImage(img) {
    return img instanceof HTMLImageElement &&
      img.naturalWidth === WRONG_WIDTH &&
      img.naturalHeight === WRONG_HEIGHT;
  }

  function replaceImage(img) {
    if (!img || img.dataset.nguyenCustomHomeExactReplacement === 'true') return false;

    img.dataset.nguyenCustomHomeExactReplacement = 'true';
    img.setAttribute('src', TARGET_SRC);
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
    img.style.setProperty('filter', 'none', 'important');
    img.style.setProperty('opacity', '1', 'important');
    img.style.setProperty('visibility', 'visible', 'important');

    const picture = img.closest('picture');
    if (picture) {
      picture.querySelectorAll('source').forEach((source) => {
        source.setAttribute('srcset', TARGET_SRC);
        source.removeAttribute('sizes');
      });
    }

    const parent = img.parentElement;
    if (!parent) return true;

    if (window.getComputedStyle(parent).position === 'static') {
      parent.style.setProperty('position', 'relative', 'important');
    }
    parent.style.setProperty('overflow', 'hidden', 'important');

    let overlay = parent.querySelector(':scope > img[data-nguyen-custom-home-exact-overlay="true"]');
    if (!overlay) {
      overlay = img.cloneNode(false);
      overlay.setAttribute('data-nguyen-custom-home-exact-overlay', 'true');
      overlay.removeAttribute('srcset');
      overlay.removeAttribute('sizes');
      overlay.setAttribute('src', TARGET_SRC);
      const computed = window.getComputedStyle(img);
      overlay.style.setProperty('position', 'absolute', 'important');
      overlay.style.setProperty('inset', '0', 'important');
      overlay.style.setProperty('width', '100%', 'important');
      overlay.style.setProperty('height', '100%', 'important');
      overlay.style.setProperty('object-fit', computed.objectFit || 'cover', 'important');
      overlay.style.setProperty('object-position', computed.objectPosition || 'center', 'important');
      overlay.style.setProperty('display', 'block', 'important');
      overlay.style.setProperty('filter', 'none', 'important');
      overlay.style.setProperty('opacity', '1', 'important');
      overlay.style.setProperty('visibility', 'visible', 'important');
      overlay.style.setProperty('z-index', '2147483646', 'important');
      overlay.style.setProperty('pointer-events', 'none', 'important');
      parent.appendChild(overlay);
    }

    return true;
  }

  function inspectImage(img) {
    if (!isCustomHomeDetail()) return;
    if (isExactWrongImage(img)) replaceImage(img);
  }

  function scan() {
    if (!isCustomHomeDetail()) return;
    Array.from(document.images).forEach((img) => {
      if (img.complete) inspectImage(img);
      else img.addEventListener('load', () => inspectImage(img), { once: true });
    });
  }

  scan();
  window.addEventListener('load', scan, { once: true });
  [250, 700, 1500, 3000, 5000].forEach((delay) => setTimeout(scan, delay));

  const observer = new MutationObserver((mutations) => {
    if (!isCustomHomeDetail()) return;
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        if (node instanceof HTMLImageElement) {
          if (node.complete) inspectImage(node);
          else node.addEventListener('load', () => inspectImage(node), { once: true });
        }
        node.querySelectorAll?.('img').forEach((img) => {
          if (img.complete) inspectImage(img);
          else img.addEventListener('load', () => inspectImage(img), { once: true });
        });
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => { scan(); observer.disconnect(); }, 7000);
})();
</script>`

export async function GET() {
  const response = await getConcept()
  if (!response.ok) return response

  const html = (await response.text()).replace('</body>', `${TARGET_IMAGE_PATCH}</body>`)
  const headers = new Headers(response.headers)
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'no-store')
  return new Response(html, { status: response.status, headers })
}
