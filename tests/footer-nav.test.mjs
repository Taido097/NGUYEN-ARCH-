import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';

const source = readFileSync(new URL('../app/client-demos/client-8889/arcsphere-socal/route.ts', import.meta.url), 'utf8');
const patch = source.split('const FOOTER_NAV_PATCH = `')[1].split('const ICON_BAR_PATCH')[0];
test('footer has an independent five-link navigation, not animated text matching', () => {
  assert.match(patch, /createElement\('nav'\)/);
  assert.match(patch, /\['home', 'services', 'projects', 'process', 'contact'\]/);
  assert.match(patch, /#featured-projects/);
  assert.doesNotMatch(patch, /commonAncestor|compact\(a.textContent\)/);
});
test('replacement is scoped to footer-links with a mobile position reset', () => {
  assert.match(patch, /footer > \.nguyen-footer-links/);
  assert.match(patch, /@media \(max-width: 809px\)/);
  assert.match(patch, /right: clamp\(24px, 11vw, 180px\)/);
});

test('footer navigation never uses a fixed horizontal percentage that can overlap the heading', () => {
  assert.doesNotMatch(patch, /left: 71\.5%/);
  assert.match(patch, /@media \(max-width: 1180px\)/);
  assert.match(patch, /nguyen-footer-links--compact-flow/);
  assert.match(patch, /const compactFooter = window\.innerWidth <= 1180/);
  assert.doesNotMatch(patch, /--footer-nav-compact-top/);
  assert.match(patch, /max-width: calc\(100% - 360px\) !important/);
});

test('wide desktop keeps the footer navigation beside a space-reserved heading', () => {
  assert.match(patch, /@media \(min-width: 1181px\)/);
  assert.match(patch, /right: clamp\(24px, 11vw, 180px\)/);
});
test('footer nav observer is debounced and disconnects so mobile scroll cannot thrash layout', () => {
  // patchFooterNav walks every footer subtree and reads getBoundingClientRect; running it on every
  // mutation Framer fires during a mobile scroll crashed the tab and reloaded it to the top.
  assert.match(patch, /navTimer = setTimeout\(patchFooterNav, 100\);/);
  assert.match(patch, /new MutationObserver\(scheduleFooterNav\)/);
  assert.match(patch, /setTimeout\(\(\) => observer\.disconnect\(\), 60000\)/);
  assert.doesNotMatch(patch, /new MutationObserver\(patchFooterNav\)/);
});
test('breakpoint copies of the old nav are hidden by label, not only by Framer name', () => {
  // Not every footer copy carries data-framer-name="footer-links", so the stylesheet alone left one
  // showing through underneath the injected nav.
  assert.match(patch, /function hideLegacyNavGroups/);
  assert.match(patch, /LEGACY_NAV_LABELS/);
  assert.match(patch, /document\.querySelectorAll\('footer'\)\.forEach\(hideLegacyNavGroups\)/);
});
test('hiding the old nav never takes the social, legal or injected columns with it', () => {
  assert.match(patch, /OTHER_COLUMN_LABELS/);
  assert.match(patch, /pinterest/);
  assert.match(patch, /privacypolicy/);
  assert.match(patch, /el\.querySelector\('\.nguyen-footer-links'\)\) return/);
  assert.match(patch, /el\.closest\('\.nguyen-footer-links'\)\) return/);
  // Only the tightest container holding the labels is hidden; a wider one holds real content.
  assert.match(patch, /matches\.some\(\(other\) => other !== el && el\.contains\(other\)\)/);
});
test('mobile footer navigation flows directly after the visible get-in-touch label', () => {
  assert.match(patch, /nguyen-footer-links--mobile-flow/);
  assert.match(patch, /host\.insertBefore\(nav, getInTouch\.nextSibling\)/);
  assert.match(patch, /position: static !important/);
  assert.doesNotMatch(patch, /setProperty\('--footer-nav-mobile-top'/);
  assert.doesNotMatch(patch, /reference\.bottom - bounds\.top \+ 42/);
});
test('mobile footer navigation selects only a visible get-in-touch label', () => {
  assert.match(patch, /getClientRects\(\)\.length === 0/);
  assert.match(patch, /for \(let current = el; current && current !== footer; current = current\.parentElement\)/);
});
test('tablet footer navigation follows get-in-touch rather than the contact row', () => {
  assert.match(patch, /nguyen-footer-links--compact-flow/);
  assert.match(patch, /compactHost\.insertBefore\(nav, getInTouch\.nextSibling\)/);
  assert.match(patch, /@media \(max-width: 1180px\) and \(min-width: 810px\)/);
});
test('header navigation styling never targets footer links after scrolling', () => {
  const main = source.split('const MAIN_NAV_PATCH')[1].split('const ENGINEERING_SERVICE_PATCH')[0];
  assert.match(main, /anchor\.closest\('footer'\)/);
});
test('extra-card cleanup cannot collapse page or footer containers', () => {
  const cleanup = source.split('const EXTRA_CARD_CLEANUP_PATCH = `')[1].split('const PROCESS_TILE_IMAGE_PATCH')[0];
  assert.match(cleanup, /isProtectedContainer/);
  assert.match(cleanup, /el\.matches\('body, main, footer'\)/);
  assert.match(cleanup, /el\.querySelector\('footer'\)/);
  assert.match(cleanup, /card\.closest\('footer'\)/);
});
test('the hidden extra service collapses its outer list row on mobile only', () => {
  const cleanup = source.split('const EXTRA_CARD_CLEANUP_PATCH = \`')[1].split('const PROCESS_TILE_IMAGE_PATCH')[0];
  assert.match(cleanup, /@media \(max-width: 809px\)/);
  assert.match(cleanup, /\[data-nguyen-extra-service-row="true"\]/);
  assert.match(cleanup, /const row = el\.closest\('li'\)/);
  assert.match(cleanup, /row\.parentElement\?\.getAttribute\('data-framer-name'\) === 'service_list'/);
  assert.match(cleanup, /row\.setAttribute\('data-nguyen-extra-service-row', 'true'\)/);
  assert.doesNotMatch(cleanup, /@media \(min-width:/);
});
test('main nav project hiding cannot hide a Framer page wrapper', () => {
  const main = source.split('const MAIN_NAV_PATCH')[1].split('const ENGINEERING_SERVICE_PATCH')[0];
  assert.match(main, /function hideProjects\(anchor\)/);
  assert.match(main, /anchor\.closest\('footer'\)/);
  assert.doesNotMatch(main, /setStyle\(item, 'display', 'none'\)/);
});
test('project-card routing ignores whole-page wrappers with header or footer content', () => {
  const projects = source.split('const PROJECT_CARDS_PATCH = `')[1].split('const DESIGN_PANELS_PATCH')[0];
  assert.match(projects, /function isPageWrapper/);
  assert.match(projects, /el\.querySelector\('header, footer'\)/);
  assert.match(projects, /if \(isPageWrapper\(cursor\)\) break;/);
  assert.match(projects, /if \(isPageWrapper\(el\)\) return;/);
});
test('page visibility guard repairs accidental hidden Framer content wrapper last', () => {
  const guard = source.split('const PAGE_VISIBILITY_GUARD_PATCH = `')[1].split('export async function GET')[0];
  assert.match(guard, /data-framer-name="content"/);
  assert.match(guard, /display', 'flex', 'important'/);
  assert.match(guard, /removeAttribute\('data-nguyen-card-url'\)/);
  assert.match(source, /\$\{PAGE_VISIBILITY_GUARD_PATCH\}<\/body>/);
});
test('page visibility guard does not run on every scroll-driven style mutation', () => {
  const guard = source.split('const PAGE_VISIBILITY_GUARD_PATCH = `')[1].split('export async function GET')[0];
  assert.doesNotMatch(guard, /subtree: true/);
  assert.doesNotMatch(guard, /observer\.observe\(document\.body/);
  assert.match(guard, /observer\.observe\(wrapper/);
  assert.match(guard, /attributeFilter: \['style'/);
  assert.match(guard, /if \(!needsRepair\) return;/);
});
test('mobile engineering row collapses leftover media area before project expertise', () => {
  const engineering = source.split('const ENGINEERING_SERVICE_PATCH = `')[1].split('const PROJECT_CARDS_PATCH')[0];
  assert.match(engineering, /nguyen-socal-engineering-service-styles/);
  assert.match(engineering, /data-nguyen-engineering-service/);
  assert.match(engineering, /height: auto/);
  assert.match(engineering, /data-nguyen-engineering-media/);
  assert.match(engineering, /max-height: 0/);
});
