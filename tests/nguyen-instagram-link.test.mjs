import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const routePath = new URL('../app/client-demos/client-8889/arcsphere-socal/route.ts', import.meta.url)

test('connects only the Instagram social item to Nguyen Architecture Instagram', async () => {
  const source = await readFile(routePath, 'utf8')

  assert.match(source, /const NGUYEN_INSTAGRAM_URL = 'https:\/\/www\\.instagram\\.com\/nguyen_architecture\/'/)
  assert.match(source, /instagram/)
  assert.match(source, /data-nguyen-instagram-link/)
  assert.match(source, /NGUYEN_INSTAGRAM_URL/)
})
