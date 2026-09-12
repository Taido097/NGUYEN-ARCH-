import assert from "node:assert/strict"
import { existsSync, statSync, readFileSync } from "node:fs"
import test from "node:test"

const routeSource = readFileSync(
  new URL("../app/client-demos/client-8889/arcsphere-socal/route.ts", import.meta.url),
  "utf8",
)
const patch = routeSource.match(
  /const HOMEPAGE_INTRO_IMAGE_SWAP_PATCH = `([\s\S]*?)`\n\nconst PAGE_VISIBILITY_GUARD_PATCH/,
)?.[1]

test("intro band swaps left=Japanese, right=Mediterranean by heading + side", () => {
  assert.ok(patch, "expected HOMEPAGE_INTRO_IMAGE_SWAP_PATCH")
  assert.match(patch, /homepage-intro-left-japanese\.webp/)
  assert.match(patch, /homepage-intro-right-mediterranean\.webp/)
  assert.match(patch, /designingtimeless|spaceswithpurpose/)
  assert.match(patch, /paintImage\(img, c < centerX \? LEFT_URL : RIGHT_URL\)/)
  assert.match(patch, /setImp\(img, 'object-fit', 'cover'\)/)
})

test("intro swap never touches the locked hero and never forces display/visibility/opacity", () => {
  assert.ok(patch, "expected HOMEPAGE_INTRO_IMAGE_SWAP_PATCH")
  assert.match(patch, /const HERO = 'header\[data-framer-name="hero-section"\]'/)
  assert.match(patch, /if \(!img \|\| img\.closest\(HERO\)\) return/)
  assert.match(patch, /if \(img\.closest\(HERO\)\) return/)
  assert.match(patch, /if \(!heading \|\| heading\.closest\(HERO\)\) return null/)
  assert.doesNotMatch(patch, /setProperty\('display'/)
  assert.doesNotMatch(patch, /setProperty\('visibility'/)
  assert.doesNotMatch(patch, /setProperty\('opacity'/)
})

test("intro swap caches the band so the observer does not re-scan the whole document", () => {
  assert.ok(patch, "expected HOMEPAGE_INTRO_IMAGE_SWAP_PATCH")
  // The band is cached after the first find; a cached, still-connected band short-circuits findBand,
  // keeping the observer off the heavy full-document scan path.
  assert.match(patch, /if \(band && band\.isConnected && !band\.closest\(HERO\)\) return band/)
  assert.match(patch, /querySelectorAll\('h1,h2,h3,h4'\)\)\.find\(matchesHeading\)/)
})

test("intro swap is injected after the hero patches and before the visibility guard", () => {
  assert.match(routeSource, /\$\{HERO_CTA_PATCH\}\$\{HOMEPAGE_INTRO_IMAGE_SWAP_PATCH\}\$\{PAGE_VISIBILITY_GUARD_PATCH\}/)
})

test("intro images are present and non-empty", () => {
  for (const name of [
    "homepage-intro-left-japanese.webp",
    "homepage-intro-right-mediterranean.webp",
  ]) {
    const p = new URL(`../public/client-8889/${name}`, import.meta.url)
    assert.equal(existsSync(p), true)
    assert.ok(statSync(p).size > 100_000)
  }
})
