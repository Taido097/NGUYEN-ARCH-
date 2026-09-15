import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'

const source = readFileSync(
  new URL('../google-apps-script/contact-form.gs', import.meta.url),
  'utf8',
)
const context = vm.createContext({ console })
vm.runInContext(source, context)

test('Apps Script writes only to the Nguyen Architecture client spreadsheet', () => {
  assert.match(
    source,
    /const SPREADSHEET_ID = '1ukYVkQToxQBO5_ASzjNdUb4U0Ek39Ll21kDuRO2kDr4'/,
  )
})

test('Apps Script sends project inquiries only to the consultant inbox and testing copy', () => {
  assert.equal(
    vm.runInContext("getNotificationRecipients('consultation')", context),
    'consultant@nguyenarchitecture.com,taido097@gmail.com',
  )
})

test('Apps Script sends collaborations only to the info inbox and testing copy', () => {
  assert.equal(
    vm.runInContext("getNotificationRecipients('collaboration')", context),
    'info@nguyenarchitecture.com,taido097@gmail.com',
  )
})

test('Apps Script subject contains only the selected project type', () => {
  assert.equal(
    vm.runInContext(
      "getEmailSubject('consultation', 'Addition / Remodel')",
      context,
    ),
    'New Project Inquiry — Addition / Remodel',
  )
})
