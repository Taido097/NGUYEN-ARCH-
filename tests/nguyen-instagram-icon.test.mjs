import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const socalRoutePath = new URL('../app/client-demos/client-8889/arcsphere-socal/route.ts', import.meta.url)
const baseRoutePath = new URL('../app/client-demos/client-8889/arcsphere/route.ts', import.meta.url)

test('ships the Nguyen Instagram URL on the rendered icon before browser scripts run', async () => {
  const source = await readFile(socalRoutePath, 'utf8')
  assert.match(source, /const INSTAGRAM_ICON_HREF_RE = \/\(/)
  assert.match(source, /html = html\.replace\(INSTAGRAM_ICON_HREF_RE, \`\$1\$\{NGUYEN_INSTAGRAM_URL\}\$2\`\)/)
})

test('all three earlier routing layers ignore the Instagram icon', async () => {
  const [base, socal] = await Promise.all([
    readFile(baseRoutePath, 'utf8'),
    readFile(socalRoutePath, 'utf8'),
  ])

  assert.match(base, /if \(start\?\.closest\?\.\('a\[data-framer-name="InstagramLogo"\]'\)\) return null;/)
  assert.match(base, /if \(a\.matches\('a\[data-framer-name="InstagramLogo"\]'\)\) return;/)
  assert.match(socal, /if \(start\?\.closest\?\.\('a\[data-framer-name="InstagramLogo"\]'\)\) return;/)
})

test('keeps the browser guard for Framer hydration changes', async () => {
  const source = await readFile(socalRoutePath, 'utf8')
  assert.match(source, /const INSTAGRAM_SELECTOR = 'a\[data-framer-name="InstagramLogo"\]'/)
  assert.match(source, /data-nguyen-instagram-icon/)
})


test('keeps only Instagram in the Social Media icon row', async () => {
  const source = await readFile(socalRoutePath, 'utf8')
  assert.match(source, /const SOCIAL_MEDIA_INSTAGRAM_ONLY_PATCH = \`/)
  assert.match(source, /const SOCIAL_MEDIA_SELECTOR = '\[data-framer-name="Social Media"\]'/)
  assert.match(source, /document\.querySelectorAll\(SOCIAL_MEDIA_SELECTOR\)\.forEach\(\(social\) =>/)
  assert.match(source, /a:not\(\[data-framer-name="InstagramLogo"\]\)/)
  assert.match(source, /social\.querySelectorAll\(removeSelector\)\.forEach\(\(icon\) => icon\.remove\(\)\)/)
})


test('removes non-Instagram social links from the server-rendered page before a tap can occur', async () => {
  const source = await readFile(socalRoutePath, 'utf8')
  assert.match(source, /const NON_INSTAGRAM_SOCIAL_ANCHOR_RE =/)
  assert.match(source, /html = html\.replace\(NON_INSTAGRAM_SOCIAL_ANCHOR_RE, ''\)/)
  assert.match(source, /LinkedinLogo\|PinterestLogo\|Behance/)
})


test('prevents Social Media taps from entering the Custom Homes card router', async () => {
  const source = await readFile(socalRoutePath, 'utf8')
  const socialGuard = source.indexOf(`if (start?.closest?.('[data-framer-name="Social Media"]')) return;`)
  const cardLookup = source.indexOf("const card = start && start.closest ? start.closest('[data-nguyen-card-url]') : null;")
  assert.ok(socialGuard >= 0, 'Social Media must be excluded from card routing')
  assert.ok(cardLookup >= 0 && socialGuard < cardLookup, 'Social Media exclusion must run before card lookup')
})
