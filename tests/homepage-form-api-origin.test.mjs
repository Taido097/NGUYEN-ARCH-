import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(
  new URL('../app/client-demos/client-8889/arcsphere-socal/route.ts', import.meta.url),
  'utf8',
)

test('homepage form posts to Nguyen Architecture when Framer supplies an external base URL', () => {
  const apiDeclaration = source.match(/const API = ([^;]+);/)
  assert.ok(apiDeclaration, 'homepage form API declaration should exist')

  const apiUrl = Function('window', `return (${apiDeclaration[1]})`)({
    location: { origin: 'https://nguyenarchitecture.com' },
  })

  assert.equal(apiUrl, 'https://nguyenarchitecture.com/api/contact')
})
