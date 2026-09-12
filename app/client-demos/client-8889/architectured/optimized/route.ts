import { GET as getSource } from "../source/route"

export const dynamic = "force-dynamic"
export const revalidate = 0

const PATCH_MAP_RE = /function patchMap\(root, map\) \{[\s\S]*?\n  \}\n\n  function findByText/
const FIND_BY_TEXT_RE = /function findByText\(text, root = document\) \{[\s\S]*?\n  \}\n\n  function sectionFrom/
const SCHEDULER_RE = /let queued = false;[\s\S]*?const timer = setInterval\(\(\) => \{[\s\S]*?\}, 125\);/

const FAST_PATCH_MAP = String.raw`const patchLookupCache = new WeakMap();

  function patchMap(root, map) {
    if (!root) return;

    let lookup = patchLookupCache.get(map);
    if (!lookup) {
      lookup = new Map();
      for (const [from, to] of Object.entries(map)) {
        lookup.set(norm(from), to);
        lookup.set(compact(from), to);
      }
      patchLookupCache.set(map, lookup);
    }

    const elements = root.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,span,div,button,label,li');
    for (let i = 0; i < elements.length; i += 1) {
      const el = elements[i];
      if (blocked.has(el.tagName) || el.children.length > 0) continue;
      const current = norm(el.textContent);
      if (!current) continue;
      const replacement = lookup.get(current) ?? lookup.get(compact(current));
      if (replacement !== undefined) writePreservingStructure(el, replacement);
    }
  }

  function findByText`

const FAST_FIND_BY_TEXT = String.raw`function findByText(text, root = document) {
    const wanted = compact(text);
    const elements = root.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,span,div,li,button');
    for (let i = 0; i < elements.length; i += 1) {
      const el = elements[i];
      if (!blocked.has(el.tagName) && compact(el.textContent) === wanted) return el;
    }
    return null;
  }

  function sectionFrom`

const FRAME_BATCHED_SCHEDULER = String.raw`let queued = false;
  let observerActive = false;
  let hydrationWindowOpen = true;

  const revealPage = () => {
    document.documentElement.classList.remove('nguyen-template-boot');
    document.documentElement.classList.add('nguyen-template-ready');
  };

  const connectObserver = () => {
    if (observerActive || !hydrationWindowOpen) return;
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    observerActive = true;
  };

  const safePatch = () => {
    try {
      patchAll();
    } catch (error) {
      console.error('[NGUYEN Concept 04] content patch failed', error);
    } finally {
      revealPage();
    }
  };

  const runPatch = () => {
    queued = false;

    if (observerActive) {
      observer.disconnect();
      observerActive = false;
    }

    safePatch();
    connectObserver();
  };

  const queuePatch = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(runPatch);
  };

  const observer = new MutationObserver(queuePatch);
  connectObserver();

  // Never allow a patching error to strand the document in the hidden boot state.
  safePatch();

  document.addEventListener('DOMContentLoaded', () => {
    revealPage();
    queuePatch();
    requestAnimationFrame(() => requestAnimationFrame(queuePatch));
  }, { once: true });

  window.addEventListener('load', () => {
    revealPage();
    queuePatch();
  }, { once: true });

  // Mobile Safari can delay or interrupt hydration callbacks. This independent
  // fallback guarantees the page becomes visible even if Framer fails to hydrate.
  window.setTimeout(revealPage, 700);

  window.setTimeout(() => {
    hydrationWindowOpen = false;
    if (observerActive) {
      observer.disconnect();
      observerActive = false;
    }
    if (queued) {
      queued = false;
      safePatch();
    }
    revealPage();
  }, 6000);`

const LOGO_CSS = String.raw`<style id="nguyen-logo-css">
  a[aria-label="Company Logo"] {
    color: inherit !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    text-decoration: none !important;
  }
  a[aria-label="Company Logo"] [data-framer-background-image-wrapper] {
    display: none !important;
  }
  a[aria-label="Company Logo"]::after {
    content: "NGUYEN";
    color: currentColor;
    font-family: "Geist", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 26px;
    font-style: normal;
    font-weight: 650;
    letter-spacing: -0.045em;
    line-height: 1;
    text-transform: uppercase;
    white-space: nowrap;
  }
</style>`

function replaceOnce(html: string, pattern: RegExp, replacement: string, label: string) {
  if (!pattern.test(html)) {
    console.warn(`[Concept04 performance] ${label} optimization pattern not found`)
    return html
  }
  return html.replace(pattern, replacement)
}

export async function GET() {
  const sourceResponse = await getSource()

  if (!sourceResponse.ok) return sourceResponse

  let html = await sourceResponse.text()

  html = replaceOnce(html, PATCH_MAP_RE, FAST_PATCH_MAP, "patchMap")
  html = replaceOnce(html, FIND_BY_TEXT_RE, FAST_FIND_BY_TEXT, "findByText")
  html = replaceOnce(html, SCHEDULER_RE, FRAME_BATCHED_SCHEDULER, "scheduler")

  // Keep the NGUYEN identity/content changes, but leave every page color to
  // the original Architectured/Framer template.
  html = html.replace(
    "</head>",
    `${LOGO_CSS}<style id="nguyen-performance-css">
      @media (min-width: 810px) {
        [data-framer-name="Section"] { contain: paint; }
      }
      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto !important; }
      }
    </style></head>`,
  )

  const headers = new Headers(sourceResponse.headers)
  headers.set("Content-Type", "text/html; charset=utf-8")
  headers.set("Cache-Control", "no-store, max-age=0, must-revalidate")
  headers.set("Pragma", "no-cache")
  headers.set("Expires", "0")
  headers.set("Vary", "Accept-Encoding")

  return new Response(html, {
    status: sourceResponse.status,
    headers,
  })
}
