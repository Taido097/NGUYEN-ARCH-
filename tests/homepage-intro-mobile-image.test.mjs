import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const routeSource = readFileSync(
  new URL('../app/client-demos/client-8889/arcsphere-socal/route.ts', import.meta.url),
  'utf8',
)

test('mobile intro image uses the selected project instead of the centered Framer interior', () => {
  const patch = routeSource.match(
    /const HOMEPAGE_INTRO_IMAGE_SWAP_PATCH = `([\s\S]*?)`\n\nconst PAGE_VISIBILITY_GUARD_PATCH/,
  )?.[1]

  assert.ok(patch, 'expected HOMEPAGE_INTRO_IMAGE_SWAP_PATCH')
  assert.match(patch, /matchMedia\('\(max-width: 809px\)'\)\.matches/)
  assert.match(patch, /const visibleImages =/)
  assert.match(patch, /visibleImages\.forEach\(\(img, index\) => paintImage\(img, index === 0 \? LEFT_URL : RIGHT_URL\)\)/)
  assert.match(patch, /if \(mobile\) \{[\s\S]*?return true/)
})
