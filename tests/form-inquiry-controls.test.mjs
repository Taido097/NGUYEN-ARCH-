import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const contactPage = readFileSync(
  new URL('../app/client-demos/client-8889/residential/contact/page.tsx', import.meta.url),
  'utf8',
)
const homepageRoute = readFileSync(
  new URL('../app/client-demos/client-8889/arcsphere-socal/route.ts', import.meta.url),
  'utf8',
)
const apiRoute = readFileSync(
  new URL('../app/api/contact/route.ts', import.meta.url),
  'utf8',
)

test('contact page presents Project Inquiry and Collaboration as two buttons', () => {
  assert.match(contactPage, /type="button"[\s\S]*Project Inquiry/)
  assert.match(contactPage, /type="button"[\s\S]*Collaboration/)
  assert.doesNotMatch(contactPage, /<select[\s\S]*name="inquiryType"/)
})

test('homepage form injects the same two inquiry buttons and stores one selection', () => {
  assert.match(homepageRoute, /data-inquiry-type="consultation"/)
  assert.match(homepageRoute, /data-inquiry-type="collaboration"/)
  assert.match(homepageRoute, /dataset\.nguyenInquiryType/)
  assert.match(homepageRoute, /window\.addEventListener\('pointerdown', selectInquiry, true\)/)
})

test('homepage sends the selected service as one projectType value', () => {
  assert.match(homepageRoute, /data\.projectType\s*=\s*v/)
  assert.match(homepageRoute, /data\.inquiryType\s*=\s*container\.querySelector\('\.nf-inquiry-choice'\)/)
})

test('API forwards structured selection fields to the client Apps Script', () => {
  assert.match(apiRoute, /inquiryType,\s*projectType,\s*budget,/)
  assert.match(apiRoute, /company,\s*message,\s*inquiryType,/)
  assert.doesNotMatch(apiRoute, /message:\s*notificationMessage/)
})
