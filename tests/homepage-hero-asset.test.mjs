import assert from 'node:assert/strict'
import { existsSync, readFileSync, statSync } from 'node:fs'
import test from 'node:test'

const routeSource = readFileSync(
  new URL('../app/client-demos/client-8889/arcsphere-socal/route.ts', import.meta.url),
  'utf8',
)
const heroPath = new URL(
  '../public/client-8889/homepage-hero-courtyard-morning.webp',
  import.meta.url,
)
const leftSidePath = new URL(
  '../public/client-8889/homepage-hero-side-left-coastal.webp',
  import.meta.url,
)
const rightSidePath = new URL(
  '../public/client-8889/homepage-hero-side-right-commercial.webp',
  import.meta.url,
)

test('homepage hero uses the selected morning courtyard asset on every breakpoint', () => {
  assert.match(routeSource, /const HOMEPAGE_HERO_IMAGE = '\/client-8889\/homepage-hero-courtyard-morning\.webp'/)
  assert.match(routeSource, /vVqkA2phwOpc7kzAHksLgpPasxY\.png/)
  assert.match(routeSource, /for \(const source of HOMEPAGE_HERO_SOURCES\) html = html\.split\(source\)\.join\(HOMEPAGE_HERO_IMAGE\)/)
  assert.doesNotMatch(routeSource, /matchMedia[^\n]+homepage-hero-courtyard-morning/)
})

test('hero lock survives Framer hydration without revealing or restyling side images', () => {
  assert.match(routeSource, /const HOMEPAGE_HERO_LOCK_PATCH = `/)
  assert.match(routeSource, /header\[data-framer-name="hero-section"\] img/)
  assert.match(routeSource, /data-nguyen-homepage-hero/)
  assert.match(routeSource, /removeAttribute\('srcset'\)/)
  assert.match(routeSource, /removeAttribute\('sizes'\)/)
  assert.doesNotMatch(routeSource, /HOMEPAGE_HERO_LOCK_PATCH[\s\S]*?img-left/)
  assert.doesNotMatch(routeSource, /HOMEPAGE_HERO_LOCK_PATCH[\s\S]*?img-right/)
  assert.doesNotMatch(routeSource, /HOMEPAGE_HERO_LOCK_PATCH[\s\S]*?forceVisible/)
  assert.match(routeSource, /TESTIMONIAL_PATCH\}\$\{HOMEPAGE_MOBILE_HERO_CROP\}\$\{HOMEPAGE_HERO_LOCK_PATCH\}\$\{HOMEPAGE_SIDE_HERO_LOCK_PATCH\}\$\{HERO_CTA_PATCH\}/)
})

test('mobile hero crop favors the house without changing desktop positioning', () => {
  const mobileCrop = routeSource.match(
    /const HOMEPAGE_MOBILE_HERO_CROP = \`([\s\S]*?)\`\n\n\/\/ Framer can restore/,
  )?.[1]
  assert.ok(mobileCrop, 'expected HOMEPAGE_MOBILE_HERO_CROP')
  assert.match(mobileCrop, /@media \(max-width: 809px\)/)
  assert.match(mobileCrop, /img\[data-nguyen-homepage-hero="true"\]/)
  assert.match(mobileCrop, /object-position: 72% center !important/)
  assert.doesNotMatch(mobileCrop, /min-width/)
  assert.match(
    routeSource,
    /TESTIMONIAL_PATCH\}\$\{HOMEPAGE_MOBILE_HERO_CROP\}\$\{HOMEPAGE_HERO_LOCK_PATCH\}\$\{HOMEPAGE_SIDE_HERO_LOCK_PATCH\}/,
  )
})
test('selected homepage hero image is present and non-empty', () => {
  assert.equal(existsSync(heroPath), true)
  assert.ok(statSync(heroPath).size > 100_000)
})

test('selected side images replace only the original left and right Framer sources', () => {
  const sideSources = routeSource.match(/const HOMEPAGE_SIDE_HERO_SOURCES = \[([\s\S]*?)\] as const/)?.[1]
  assert.ok(sideSources, 'expected HOMEPAGE_SIDE_HERO_SOURCES')
  assert.match(routeSource, /JEOoI9AUjiorAUapWVh1gnkvdBI\.png/)
  assert.match(routeSource, /eJtReq8aEIEdVjdWqNPxJAANXJQ\.jpg/)
  assert.match(routeSource, /'\/client-8889\/homepage-hero-side-left-coastal\.webp'/)
  assert.match(routeSource, /'\/client-8889\/homepage-hero-side-right-commercial\.webp'/)
  assert.match(routeSource, /for \(const \[source, target\] of HOMEPAGE_SIDE_HERO_SOURCES\) html = html\.split\(source\)\.join\(target\)/)
  assert.doesNotMatch(sideSources, /vVqkA2phwOpc7kzAHksLgpPasxY/)
})

test('side-image hydration lock preserves Framer layout and visibility', () => {
  const patch = routeSource.match(/const HOMEPAGE_SIDE_HERO_LOCK_PATCH = `([\s\S]*?)`\n\n\/\/ The base arcsphere layer/)?.[1]
  assert.ok(patch, 'expected HOMEPAGE_SIDE_HERO_LOCK_PATCH')
  assert.match(patch, /header\[data-framer-name="hero-section"\] img/)
  assert.match(patch, /data-nguyen-homepage-hero-side/)
  assert.match(patch, /removeAttribute\('srcset'\)/)
  assert.match(patch, /removeAttribute\('sizes'\)/)
  assert.doesNotMatch(patch, /forceVisible|style\.display|visibility|opacity/)
  assert.doesNotMatch(patch, /matchMedia|max-width|min-width/)
  assert.doesNotMatch(patch, /homepage-hero-courtyard-morning|vVqkA2phwOpc7kzAHksLgpPasxY/)
  assert.match(routeSource, /HOMEPAGE_HERO_LOCK_PATCH\}\$\{HOMEPAGE_SIDE_HERO_LOCK_PATCH\}\$\{HERO_CTA_PATCH\}/)
})

test('selected homepage side images are present and non-empty', () => {
  for (const path of [leftSidePath, rightSidePath]) {
    assert.equal(existsSync(path), true)
    assert.ok(statSync(path).size > 100_000)
  }
})
