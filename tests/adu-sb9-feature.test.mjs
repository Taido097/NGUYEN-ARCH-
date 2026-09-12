import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const src = readFileSync(
  new URL("../app/client-demos/client-8889/residential/services/[slug]/page.tsx", import.meta.url),
  "utf8",
)

test("the SB 9 featured section exists with the requested content", () => {
  assert.match(src, /function Sb9Feature\(\)/)
  assert.match(src, /SB 9 Development/)
  assert.match(src, /Maximize Your Property Potential/)
  assert.match(src, /Explore opportunities for lot splits and additional residential units under California SB 9\./)
  assert.match(src, />Learn More /)
  for (const f of ["Feasibility Analysis", "Lot Split Planning", "Architectural Design", "Permitting Support"]) {
    assert.match(src, new RegExp(f))
  }
})

test("the LEARN MORE button links to the existing SB 9 page route", () => {
  assert.match(src, /const SB9_HREF = `\$\{RESIDENTIAL_HREF\}\/services\/sb9-development`/)
  assert.match(src, /<a className="sb9-btn" href=\{SB9_HREF\}>/)
})

test("the section renders only on the ADU page, between ADU types and the gallery", () => {
  // Gated to the adus slug so no other service page is affected.
  assert.match(src, /\{slug === 'adus' \? <Sb9Feature \/> : null\}/)
  const feat = src.indexOf("{slug === 'adus' ? <Sb9Feature")
  const gallery = src.indexOf('title="Project Gallery"')
  const aduTypes = src.indexOf("{slug === 'adus' ? <AduTypes")
  assert.ok(aduTypes !== -1 && feat !== -1 && gallery !== -1)
  assert.ok(aduTypes < feat && feat < gallery, "SB9 feature must sit after ADU types and before the gallery")
})

test("the section reuses the page's design tokens (no new page created)", () => {
  assert.match(src, /\.sb9-card\{[^}]*background:var\(--surface\)/)
  assert.match(src, /\.sb9-feat svg\{color:var\(--gold\)/)
  // Uses an existing local SB 9 image, not a newly invented asset.
  assert.match(src, /sb9-01-modern-duplex\.jpg/)
})

test("the ADU page's back arrow points to the Services listing, other pages unchanged", () => {
  // The site nav's "Services" link targets the homepage #services section; the ADU back arrow matches
  // it for consistent navigation. Only the adus slug is affected.
  assert.match(src, /const SERVICES_HREF = `\$\{HOME_HREF\}#services`/)
  assert.match(src, /href=\{slug === 'adus' \? SERVICES_HREF : RESIDENTIAL_HREF\}/)
  assert.match(src, /← Back to \{slug === 'adus' \? 'Services' : 'Residential'\}/)
})
