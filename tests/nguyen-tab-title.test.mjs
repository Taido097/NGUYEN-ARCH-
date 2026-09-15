import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const routePath = new URL('../app/client-demos/client-8889/arcsphere-socal/route.ts', import.meta.url)

test('Nguyen Architecture homepage rewrites the inherited Framer document title', async () => {
  const source = await readFile(routePath, 'utf8')

  assert.match(source, /const DOCUMENT_TITLE = 'NGUYEN Architecture \\| Architecture & Engineering'/)
  assert.match(source, /html = html\\.replace\\(\\/<title\\[\\^>\\]\\*>\\[\\\\s\\\\S\\]\\*\\?<\\\\\\/title>\\/i, \\`<title>\\$\\{DOCUMENT_TITLE\\}<\\\\\\/title>\\`\\)/)
})

test('Nguyen Architecture homepage keeps its title after Framer hydration', async () => {
  const source = await readFile(routePath, 'utf8')

  assert.match(source, /const DOCUMENT_TITLE_LOCK_PATCH = \\`/)
  assert.match(source, /nguyen-document-title-lock/)
  assert.match(source, /new MutationObserver\\(apply\\)\\.observe\\(document\\.head/)
  assert.match(source, /<head>\\$\\{DOCUMENT_TITLE_LOCK_PATCH\\}\\$\\{FRAMER_FORM_INQUIRY_CAPTURE_PATCH\\}/)
})
