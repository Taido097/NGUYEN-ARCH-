import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const routePath = new URL('../app/client-demos/client-8889/arcsphere-socal/route.ts', import.meta.url)

test('replaces only the Pinterest social item with Nguyen Architecture Facebook', async () => {
  const source = await readFile(routePath, 'utf8')

  assert.match(source, /const NGUYEN_FACEBOOK_URL = 'https:\/\/www\\.facebook\\.com\/p\/Nguyen-Architecture-100067629215747\/'/)
  assert.match(source, /pinterest/)
  assert.match(source, /facebook/)
  assert.match(source, /NGUYEN_FACEBOOK_URL/)
})
