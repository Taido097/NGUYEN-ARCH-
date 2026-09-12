import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const routeSource = readFileSync(
  new URL("../app/client-demos/client-8889/arcsphere-socal/route.ts", import.meta.url),
  "utf8",
)
const fixedRouteSource = readFileSync(
  new URL("../app/client-demos/client-8889/arcsphere-fixed/route.ts", import.meta.url),
  "utf8",
)

const engineeringPatch = routeSource.match(
  /const ENGINEERING_SERVICE_PATCH = `([\s\S]*?)`\n\nconst PROJECT_CARDS_PATCH/,
)?.[1]

test("phone-width hiding is limited to media explicitly marked on the Engineering card", () => {
  assert.ok(engineeringPatch, "expected to find ENGINEERING_SERVICE_PATCH")
  assert.match(engineeringPatch, /\[data-nguyen-engineering-service="true"\] \[data-nguyen-engineering-media="true"\] \{/)
  assert.doesNotMatch(engineeringPatch, /\[data-nguyen-engineering-service="true"\] img/)
  assert.doesNotMatch(engineeringPatch, /\[data-nguyen-engineering-service="true"\] picture/)
})

test("the card search refuses containers broader than a single service card", () => {
  assert.ok(engineeringPatch)
  assert.match(engineeringPatch, /function isTooBroad/)
  assert.match(engineeringPatch, /body, main, header, footer, nav/)
  assert.match(engineeringPatch, /h1, h2, h3, h4, h5, h6'\) \|\| \[\]\)\.length > 1/)
  assert.match(engineeringPatch, /img'\) \|\| \[\]\)\.length > 2/)
  assert.match(engineeringPatch, /if \(isTooBroad\(card\)\) break/)
})

test("breadth is judged by content, not by the section and article tags", () => {
  assert.ok(engineeringPatch)
  assert.doesNotMatch(engineeringPatch, /body, main, header, footer, nav, section, article/)
})

test("the card search anchors on the card title rather than on finding an image", () => {
  assert.ok(engineeringPatch)
  assert.match(engineeringPatch, /function containsTitle/)
  assert.match(engineeringPatch, /if \(!containsTitle\(card\)\) continue/)
  assert.doesNotMatch(engineeringPatch, /if \(!card\.querySelector\?\.\('img'\)\) continue/)
})

test("title matching requires an exact leaf so the description cannot match itself", () => {
  assert.ok(engineeringPatch)
  assert.match(engineeringPatch, /if \(!titleKeys\.has\(key\)\) continue/)
  assert.match(engineeringPatch, /compact\(child\.textContent\) === key/)
})

test("markers left on a container by an earlier render are cleared", () => {
  assert.ok(engineeringPatch)
  assert.match(engineeringPatch, /function dropStaleMarkers/)
  assert.match(engineeringPatch, /removeAttribute\('data-nguyen-engineering-service'\)/)
  assert.match(engineeringPatch, /removeAttribute\('data-nguyen-engineering-media'\)/)
})

test("the media column is collapsed, not just the image, so no blank row is left on mobile", () => {
  assert.ok(engineeringPatch)
  assert.match(engineeringPatch, /function holdsCardText/)
  assert.match(engineeringPatch, /while \(cell\.parentElement && cell\.parentElement !== card && !holdsCardText\(cell\.parentElement\)\)/)
  assert.match(engineeringPatch, /if \(cell !== card && !holdsCardText\(cell\)\) cell\.setAttribute\('data-nguyen-engineering-media', 'true'\)/)
})

test("a CSS-background image (no <img>) is also collapsed, so the mobile gap closes", () => {
  assert.ok(engineeringPatch)
  assert.match(engineeringPatch, /function hasBgImage/)
  assert.match(engineeringPatch, /background-image/)
  assert.match(engineeringPatch, /if \(!holdsCardText\(el\) && hasBgImage\(el\)\) collapseFrom\(el\)/)
})

test("Engineering routes on every breakpoint via a marker-keyed capture handler", () => {
  assert.ok(engineeringPatch)
  assert.match(engineeringPatch, /__nguyenEngineeringRouting/)
  assert.match(engineeringPatch, /closest\('\[data-nguyen-engineering-service="true"\]'\)/)
  assert.match(engineeringPatch, /window\.location\.href = targetUrl/)
})

test("first click after a fresh load routes without waiting for the card to be marked", () => {
  assert.ok(engineeringPatch)
  assert.match(engineeringPatch, /function engineeringRowFor/)
  assert.match(engineeringPatch, /if \(!start \|\| !engineeringRowFor\(start\)\) return/)
  assert.match(engineeringPatch, /t\.indexOf\(targetDescriptionKey\) !== -1 \|\| t\.indexOf\(sourceDescription\) !== -1/)
  assert.match(engineeringPatch, /if \(isTooBroad\(el\)\) break/)
})

test("an early fixed-layer guard claims the whole Engineering service-list row before Commercial routers", () => {
  assert.match(fixedRouteSource, /const ENGINEERING_ROUTE_GUARD_PATCH = `/)
  assert.match(fixedRouteSource, /engineering-approvals/)
  assert.match(fixedRouteSource, /data-framer-name[^\n]*service_list/)
  assert.match(fixedRouteSource, /closest\('li'\)/)
  assert.match(fixedRouteSource, /stopImmediatePropagation/)
  assert.match(fixedRouteSource, /\$\{BUILDERS_COMPLETE_PATCH\}\$\{ENGINEERING_ROUTE_GUARD_PATCH\}/)
})

test("the Engineering title is rewritten server-side so React hydrates with ENGINEERING", () => {
  assert.match(routeSource, /const ENGINEERING_TITLE_SOURCES = \[/)
  assert.match(routeSource, /'Existing-Condition Survey & Business Layout'/)
  assert.match(routeSource, /'Existing-Condition Survey &amp; Business Layout'/)
  assert.match(routeSource, /for \(const source of ENGINEERING_TITLE_SOURCES\) html = html\.split\(source\)\.join\(ENGINEERING_TITLE\)/)

  const sources = ["Existing-Condition Survey & Business Layout", "Existing-Condition Survey &amp; Business Layout"]
  let html = `<h2>${sources[0]}</h2><script>{"t":"${sources[1]}"}</script>`
  for (const s of sources) html = html.split(s).join("ENGINEERING")
  assert.doesNotMatch(html, /Existing-Condition/)
  assert.equal((html.match(/ENGINEERING/g) || []).length, 2)
})
