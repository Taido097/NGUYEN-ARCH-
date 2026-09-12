import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const routeSource = readFileSync(
  new URL("../app/client-demos/client-8889/arcsphere-socal/route.ts", import.meta.url),
  "utf8",
)

test("the ADU service-card title is retargeted server-side to 'ADU & SB9'", () => {
  // The base arcsphere serviceSpecs (serialized into its injected client patch) set the card title.
  // Retargeting that one spec in the served HTML renders "ADU & SB9" with no client-side race.
  assert.match(routeSource, /const ADU_TITLE_SPEC_SOURCE = "title: 'ADU',"/)
  assert.match(routeSource, /const ADU_TITLE_SPEC_TARGET = "title: 'ADU & SB9',"/)
  assert.match(routeSource, /html = html\.split\(ADU_TITLE_SPEC_SOURCE\)\.join\(ADU_TITLE_SPEC_TARGET\)/)
})

test("the replace is unique to the ADU title, not its description or category key", () => {
  const S = "title: 'ADU',"
  const T = "title: 'ADU & SB9',"
  let html = [
    "      title: 'RESIDENTIAL',",
    "      title: 'ADU',",
    "      description: 'ADU design, engineering, Title 24, permit documentation, and city coordination from concept through approval.',",
    "      { key: 'adu', url: base + '/adus' },",
  ].join("\n")
  html = html.split(S).join(T)
  assert.match(html, /title: 'ADU & SB9',/)
  assert.match(html, /description: 'ADU design, engineering/)
  assert.match(html, /key: 'adu'/)
  assert.match(html, /title: 'RESIDENTIAL',/)
})

test("the ADU service-row image matcher is kept in sync with the new title", () => {
  // RESIDENTIAL_ROW_IMAGE_PATCH matches the row by exact compact heading text, so renaming the card
  // requires updating its heading here or the ADU row image would stop swapping.
  const patch = routeSource.match(/const RESIDENTIAL_ROW_IMAGE_PATCH = `([\s\S]*?)`\n/)?.[1]
  assert.ok(patch, "expected RESIDENTIAL_ROW_IMAGE_PATCH")
  assert.match(patch, /heading: 'ADU & SB9'/)
  assert.doesNotMatch(patch, /heading: 'ADU'[,\s]/)
})
