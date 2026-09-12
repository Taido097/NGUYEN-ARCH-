import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataFile = join(
  root,
  'app/client-demos/client-8889/residential/services/services-data.ts',
);
const source = readFileSync(dataFile, 'utf8');

const images = [
  'multifamily-townhomes-gallery-01.jpeg',
  'multifamily-townhomes-gallery-02.jpeg',
  'multifamily-townhomes-gallery-03.jpeg',
];

test('the Multifamily and Townhomes gallery includes all three uploaded images', () => {
  const multifamilyBlock = source.match(
    /slug: 'multifamily',[\s\S]*?(?=\n  \{\n    slug:)/,
  )?.[0];

  assert.ok(multifamilyBlock, 'expected the multifamily service data');
  for (const image of images) {
    assert.match(multifamilyBlock, new RegExp(image.replace('.', '\\.'), 'g'));
    assert.match(
      multifamilyBlock,
      new RegExp(`${image.replace('.', '\\.')}[^\n]+cat: 'Townhomes'`),
    );
  }
});

test('all three Multifamily and Townhomes gallery assets exist', () => {
  const assetDirectory = join(root, 'public/client-8889/residential/detail');
  for (const image of images) {
    assert.ok(existsSync(join(assetDirectory, image)), `missing ${image}`);
  }
});
