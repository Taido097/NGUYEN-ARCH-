import assert from 'node:assert/strict'
import test from 'node:test'

import {
  buildContactDetails,
  getContactRecipient,
  getContactSubject,
} from '../app/api/contact/routing.ts'

test('project consultations route to the consultant inbox with the testing copy', () => {
  assert.equal(
    getContactRecipient('consultation'),
    'consultant@nguyenarchitecture.com,taido097@gmail.com',
  )
})

test('collaborations route to the info inbox with the testing copy', () => {
  assert.equal(
    getContactRecipient('collaboration'),
    'info@nguyenarchitecture.com,taido097@gmail.com',
  )
})

test('unknown inquiry types are rejected instead of accepting a client-selected recipient', () => {
  assert.throws(
    () => getContactRecipient('attacker@example.com'),
    /invalid inquiry type/i,
  )
})

test('project inquiries use the selected project type in the email subject', () => {
  assert.equal(
    getContactSubject('consultation', 'Custom Home'),
    'New Project Inquiry — Custom Home',
  )
})

test('collaborations use the selected project type in the email subject', () => {
  assert.equal(
    getContactSubject('collaboration', 'Commercial'),
    'New Collaboration Request — Commercial',
  )
})

test('the notification includes every project field submitted by the form', () => {
  assert.equal(
    buildContactDetails({
      inquiryType: 'consultation',
      projectType: 'Custom Home',
      budget: '$300K – $600K',
      message: 'A new two-story home in Huntington Beach.',
    }),
    [
      'Inquiry Type: Project Inquiry',
      'Project Type: Custom Home',
      'Budget: $300K – $600K',
      '',
      'Project Description:',
      'A new two-story home in Huntington Beach.',
    ].join('\n'),
  )
})
