import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const socalRoutePath = new URL('../app/client-demos/client-8889/arcsphere-socal/route.ts', import.meta.url)
const baseRoutePath = new URL('../app/client-demos/client-8889/arcsphere/route.ts', import.meta.url)

test('ships the Nguyen Instagram URL on the rendered icon before browser scripts run', async () => {
  const source = await readFile(socalRoutePath, 'utf8')
  assert.match(source, /const INSTAGRAM_ICON_HREF_RE = \/\(/)
  assert.match(source, /html = html\.replace\(INSTAGRAM_ICON_HREF_RE, \`\$1\$\{NGUYEN_INSTAGRAM_URL\}\$2\`\)/)
})

test('base service routing ignores the Instagram icon', async () => {
  const source = await readFile(baseRoutePath, 'utf8')
  assert.match(source, /if \(start\?\.closest\?\.\('a\[data-framer-name="InstagramLogo"\]'\)\) return null;/)
})

test('base navigation does not attach a home-route click listener to the Instagram icon', async () => {
  const source = await readFile(baseRoutePath, 'utf8')
  assert.match(source, /if \(a\.matches\('a\[data-framer-name="InstagramLogo"\]'\)\) return;/)
})

test('keeps the browser guard for Framer hydration changes', async () => {
  const source = await readFile(socalRoutePath, 'utf8')
  assert.match(source, /const INSTAGRAM_SELECTOR = 'a\[data-framer-name="InstagramLogo"\]'/)
  assert.match(source, /data-nguyen-instagram-icon/)
})
