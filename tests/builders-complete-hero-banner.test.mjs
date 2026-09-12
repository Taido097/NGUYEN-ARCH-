import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const src = readFileSync(
  new URL('../app/client-demos/client-8889/residential/services/builders-complete-delivery/page.tsx', import.meta.url),
  'utf8',
)

test('the Builders page reuses the shared HeroBanner so the entrance animation matches the other service pages', () => {
  assert.match(src, /import HeroBanner from '\.\.\/\[slug\]\/hero-banner'/)
  const banner = src.match(/<HeroBanner[\s\S]*?\/>/)?.[0]
  assert.ok(banner, 'expected a <HeroBanner /> element')
  // The best/most-complete framing shot is the banner hero, same asset the homepage patch uses.
  assert.match(banner, /hero=\{`\$\{BASE\}\/builders-complete-04-framing-complete\.webp`\}/)
  assert.match(banner, /label="Builders Complete Delivery"/)
  assert.match(banner, /caption=\{\['Planning & Permitting', 'Design & Engineering', 'Construction & Completion'\]\}/)
})

test('the banner CSS carries the same WAAPI-fallback keyframes and pre-animation state as the shared pages', () => {
  // Scoped under .bcd so it cannot leak, but the class names must match the component markup.
  for (const rule of [
    /\.bcd \.nrd-banner\{/,
    /\.bcd \.nrd-banner-ov\{/,
    /\.bcd \.nrd-rule-h\{/,
    /\.bcd \.nrd-anim img\{clip-path:inset\(0% 0% 100% 0%\)/,
    /\.bcd \.nrd-anim \.nrd-rule-l\{transform:translateX\(-600px\)/,
    /\.bcd \.nrd-anim \.nrd-rule-r\{transform:translateX\(600px\)/,
  ]) {
    assert.match(src, rule)
  }
  for (const kf of [/@keyframes nrd-img-in\{/, /@keyframes nrd-fade-in\{/, /@keyframes nrd-slide-in\{/]) {
    assert.match(src, kf)
  }
})

test('the banner sits full-bleed above the content shell, replacing the old split hero', () => {
  const banner = src.indexOf('<HeroBanner')
  const shell = src.indexOf('<div className="bcd-shell">')
  assert.ok(banner !== -1 && shell !== -1 && banner < shell, 'HeroBanner must render before the .bcd-shell wrapper')
  // The static split hero (image column + tag) is gone; the page now uses the STAGES journey layout.
  assert.doesNotMatch(src, /<section className="bcd-hero">/)
  assert.doesNotMatch(src, /className="bcd-hero-media"/)
  assert.match(src, /className="bcd-journey"/)
  assert.match(src, /className="bcd-stage"/)
})
