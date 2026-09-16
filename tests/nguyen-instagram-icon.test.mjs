import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const routePath = new URL('../app/client-demos/client-8889/arcsphere-socal/route.ts', import.meta.url)

test('ships the Nguyen Instagram URL on the rendered icon before browser scripts run', async () => {
  const source = await readFile(routePath, 'utf8')

  assert.match(source, /data-framer-name="InstagramLogo"/)
  assert.match(source, /https:\\\\/\\\\/instagram\\\\.com/)
  assert.match(source, /NGUYEN_INSTAGRAM_URL/)
  assert.match(source, /html = html\.replace\(/)
})

test('keeps the browser guard for Framer hydration changes', async () => {
  const source = await readFile(routePath, 'utf8')
  assert.match(source, /const INSTAGRAM_SELECTOR = 'a\\[data-framer-name="InstagramLogo"\\]'/)
  assert.match(source, /data-nguyen-instagram-icon/)
})
