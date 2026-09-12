import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(
  new URL('../app/client-demos/client-8889/residential/route.ts', import.meta.url),
  'utf8',
)
const patch = source.split('const FOOTER_REPLACE_PATCH = `')[1].split('`;')[0]
const commercialFooter = readFileSync(
  new URL('../app/client-demos/client-8889/residential/services/[slug]/page.tsx', import.meta.url),
  'utf8',
)

// On mobile the residential (Framer proxy) page replaces Framer's own footer with a clone of the
// commercial service page footer. Desktop is untouched — the patch ships on mobile only.
test('the footer replace patch is injected on mobile only', () => {
  assert.match(source, /const footerReplace = mobile \? FOOTER_REPLACE_PATCH : ''/)
  assert.match(source, /\$\{CLIENT_REBRAND\}\$\{SQFT_GUIDE_PATCH\}\$\{footerReplace\}<\/body>/)
})

test('it hides Framer\'s footer and injects a non-footer clone that the hide cannot catch', () => {
  assert.match(patch, /footer \{ display: none !important; \}/)
  // The clone is a <div id="nguyen-injected-footer">, never a <footer>, so the hide rule above
  // (and the Framer-named-div hide) never blank it.
  assert.match(patch, /foot\.id = 'nguyen-injected-footer'/)
  assert.doesNotMatch(patch, /createElement\('footer'\)/)
  assert.match(patch, /el\.closest\('#nguyen-injected-footer'\)\) return/)
})

test('the clone mirrors the commercial footer markup', () => {
  for (const cls of ['nrd-foot', 'nrd-foot-main', 'nrd-foot-lead', 'nrd-foot-head', 'nrd-foot-cta', 'nrd-foot-cols', 'nrd-foot-col', 'nrd-foot-bottom', 'nrd-foot-copy', 'nrd-marquee', 'nrd-marquee-track', 'nrd-foot-img', 'nrd-shell']) {
    assert.ok(patch.includes(cls), `clone is missing the commercial footer class "${cls}"`)
    assert.ok(commercialFooter.includes(cls), `commercial footer no longer has class "${cls}"`)
  }
  assert.match(patch, /Open to new projects and collaborations that shape meaningful spaces\./)
  assert.match(patch, /© 2026 NGUYEN ARCHITECTURE\. All Rights Reserved\./)
  assert.match(patch, /footer-main-1728\.jpg/)
  // Same nav destinations as the commercial footer.
  assert.match(patch, /'\/client-demos\/client-8889\/arcsphere-socal'/)
  assert.match(patch, /'\/client-demos\/client-8889\/residential\/contact'/)
})

test('every clone style rule is scoped so it cannot leak onto the Framer page', () => {
  const styleBlock = patch.split('<style')[1].split('</style>')[0]
  for (const line of styleBlock.split('\n')) {
    const rule = line.trim()
    if (!rule || !rule.includes('{') || rule.startsWith('/*') || rule.startsWith('*')) continue
    if (rule.startsWith('@') || rule.startsWith('from') || rule.startsWith('to') || rule === '}') continue
    const selector = rule.split('{')[0].trim()
    if (!selector) continue
    // The only unscoped rule is the intentional Framer-footer hide.
    if (selector === 'footer') continue
    assert.ok(
      selector.includes('#nguyen-injected-footer'),
      `style rule is not scoped to the injected footer: "${selector}"`,
    )
  }
})

test('its observer is debounced and disconnects, so a mobile scroll cannot thrash it', () => {
  assert.match(patch, /clearTimeout\(timer\); timer = setTimeout\(run, 200\)/)
  assert.match(patch, /setTimeout\(\(\) => observer\.disconnect\(\), 30000\)/)
  assert.match(patch, /if \(document\.getElementById\('nguyen-injected-footer'\)\) return;/)
})

// --- behaviour, against a minimal DOM stub -------------------------------------------------------

test('running the patch hides the Framer footer and inserts the clone exactly once', () => {
  const scriptOpen = patch.indexOf('<script')
  const bodyStart = patch.indexOf('>', scriptOpen) + 1
  const script = patch.slice(bodyStart, patch.indexOf('</script>', bodyStart))

  const framerFooter = {
    tag: 'footer',
    attrs: { 'data-framer-name': 'footer' },
    style: { _m: {}, setProperty(k, v) { this._m[k] = v } },
    parentElement: null,
    getAttribute(k) { return this.attrs[k] ?? null },
    closest() { return null },
  }

  const inserted = []
  const bodyChildren = []
  const main = { id: 'main', parentNode: null }

  function makeEl() {
    return {
      id: '', innerHTML: '', className: '',
      appendChild(c) { bodyChildren.push(c) },
    }
  }

  const doc = {
    getElementById(id) {
      if (id === 'main') return main
      return inserted.find((e) => e.id === id) || null
    },
    querySelectorAll(sel) {
      if (sel === '[data-framer-name]') return [framerFooter]
      return []
    },
    createElement() { return makeEl() },
    body: { appendChild(c) { bodyChildren.push(c) } },
  }
  main.parentNode = {
    insertBefore(node) { inserted.push(node) },
  }

  const fn = new Function(
    'window', 'document', 'MutationObserver', 'setTimeout', 'clearTimeout', 'Array',
    script,
  )
  fn(
    { location: { origin: 'https://ex.test' }, addEventListener() {} },
    doc,
    class { observe() {} disconnect() {} },
    () => 0,
    () => {},
    Array,
  )

  assert.equal(framerFooter.style._m.display, 'none', 'Framer footer was not hidden')
  assert.equal(inserted.length, 1, 'expected exactly one injected footer')
  assert.equal(inserted[0].id, 'nguyen-injected-footer')
  assert.ok(inserted[0].innerHTML.includes('nrd-foot'), 'injected footer has no markup')
  assert.ok(
    inserted[0].innerHTML.includes('https://ex.test/client-demos/client-8889/residential/contact'),
    'injected footer links are not origin-absolute',
  )
})
