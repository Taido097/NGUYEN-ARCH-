import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const routePath = new URL('../app/client-demos/client-8889/arcsphere-socal/route.ts', import.meta.url)

test('connects the visible Instagram icon without card-routing interception', async () => {
  const source = await readFile(routePath, 'utf8')

  assert.match(source, /footer a\[data-framer-name="InstagramLogo"\]/)
  assert.match(source, /removeAttribute\('data-nguyen-card-url'\)/)
  assert.match(source, /data-nguyen-instagram-icon/)
  assert.match(source, /attributeFilter: \['data-nguyen-card-url', 'href', 'data-nguyen-routed'\]/)
})
