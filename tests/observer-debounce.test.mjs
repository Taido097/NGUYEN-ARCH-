import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const routeSource = readFileSync(
  new URL("../app/client-demos/client-8889/arcsphere-socal/route.ts", import.meta.url),
  "utf8",
)

// Long-lived body/subtree observers that re-scan the DOM (querySelectorAll, getBoundingClientRect,
// getComputedStyle, tree walks) must be debounced. Running them on every mutation batch that Framer
// fires during a mobile momentum scroll piled up enough work to crash the tab and reload it. Debounce
// uses the trailing edge, so during a continuous scroll they do not run until it settles.
test("heavy body-level observers are debounced, never calling their patch fn directly", () => {
  // These direct-call forms are the pre-fix, un-debounced observers. None should remain.
  const forbidden = [
    /new MutationObserver\(\(\) => patchEngineering\(\)\)/,
    /new MutationObserver\(patchFooter\)/,
    /new MutationObserver\(rewrite\)/,
    /new MutationObserver\(patchCards\)/,
    /new MutationObserver\(patchHeroCtas\)/,
    /new MutationObserver\(\(\) => patchNav\(\)\)/,
    /new MutationObserver\(patchFooterNav\)/,
  ]
  for (const re of forbidden) {
    assert.doesNotMatch(routeSource, re, `un-debounced observer still present: ${re}`)
  }
})

test("each heavy observer routes through a clearTimeout/setTimeout debounce scheduler", () => {
  // Schedulers passed directly as the observer callback.
  for (const name of [
    "scheduleEngineering",
    "scheduleFooter",
    "scheduleRewrite",
    "scheduleCards",
    "scheduleCtas",
    "scheduleNav",
    "scheduleFooterNav",
  ]) {
    assert.match(routeSource, new RegExp(`const ${name} = \\(\\) => \\{ clearTimeout`))
    assert.match(routeSource, new RegExp(`new MutationObserver\\(${name}\\)`))
  }
  // Design-panels debounces the panel re-scan from inside a record-processing callback.
  assert.match(routeSource, /const schedulePanels = \(\) => \{ clearTimeout/)
  assert.match(routeSource, /schedulePanels\(\);\n  \}\);/)
})
