import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const routePath = new URL('../app/client-demos/client-8889/arcsphere-socal/route.ts', import.meta.url)

test('Nguyen Architecture homepage rewrites the inherited Framer document title', async () => {
  const source = await readFile(routePath, 'utf8')

  assert.ok(source.includes("const DOCUMENT_TITLE = 'NGUYEN ARCHITECTURE & ENGINEERING'"))
  assert.ok(source.includes('html = html.replace(/<title[^>]*>'))
  assert.ok(source.includes('<title>${DOCUMENT_TITLE}</title>'))
})

test('Nguyen Architecture homepage keeps its title after Framer hydration', async () => {
  const source = await readFile(routePath, 'utf8')

  assert.ok(source.includes('const DOCUMENT_TITLE_LOCK_PATCH = `'))
  assert.ok(source.includes('nguyen-document-title-lock'))
  assert.ok(source.includes('new MutationObserver(apply).observe(document.head'))
  assert.ok(source.includes('${DOCUMENT_TITLE_LOCK_PATCH}${FOOTER_FIRST_PAINT_STYLE}</head>'))
})
