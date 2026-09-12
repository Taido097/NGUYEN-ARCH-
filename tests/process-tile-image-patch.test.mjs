import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const routeSource = readFileSync(
  new URL("../app/client-demos/client-8889/arcsphere-socal/route.ts", import.meta.url),
  "utf8",
)

const processPatch = routeSource.match(
  /const PROCESS_TILE_IMAGE_PATCH = `([\s\S]*?)`\n\n\/\/ Universal card routing/,
)?.[1]

test("process cards replace their image without injecting a second image layer", () => {
  assert.ok(processPatch, "expected to find PROCESS_TILE_IMAGE_PATCH")
  assert.doesNotMatch(processPatch, /document\.createElement\(['"]img['"]\)/)
  assert.doesNotMatch(processPatch, /data-nguyen-overlay/)
})

test("process cards keep all four supplied image mappings", () => {
  assert.ok(processPatch, "expected to find PROCESS_TILE_IMAGE_PATCH")
  for (const filename of [
    "01_discovery.png",
    "02_existing_condition_survey_design.png",
    "03_architecture_engineering.png",
    "04_execution.png",
  ]) {
    assert.match(processPatch, new RegExp(filename.replaceAll(".", "\\.")))
  }
})

test("every breakpoint copy of a process card gets the replacement, not just the first", () => {
  assert.ok(processPatch, "expected to find PROCESS_TILE_IMAGE_PATCH")
  // Framer ships one copy of each card per breakpoint. Resolving a single img per step (querySelector,
  // cached) left the mobile copy showing the old Framer image. Collect and lock ALL copies instead.
  assert.match(processPatch, /function findAllCardsByDesc/)
  assert.match(processPatch, /function collectStepImages/)
  assert.match(processPatch, /document\.querySelectorAll\('\[data-nguyen-process-step="' \+ spec\.step \+ '"\]'\)\.forEach/)
  assert.match(processPatch, /collectStepImages\(spec\)\.forEach\(\(img\) => lockImage\(img, spec\.src, spec\.alt\)\)/)
  // The old single-resolve path must be gone.
  assert.doesNotMatch(processPatch, /const resolved = new Map\(\)/)
  assert.doesNotMatch(processPatch, /function findCardByDesc\b/)
})
