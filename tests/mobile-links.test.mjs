import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const homepageRoute = fs.readFileSync(
  new URL('../app/client-demos/client-8889/arcsphere-socal/route.ts', import.meta.url),
  'utf8',
);

test('homepage does not inject the obsolete project-panel tap blocker', () => {
  const injection = homepageRoute
    .split('\n')
    .find((line) => line.includes("html = html.replace('</body>'")) || '';

  assert.doesNotMatch(injection, /\$\{NON_LINKING_PROJECT_PANEL_PATCH\}/);
});
