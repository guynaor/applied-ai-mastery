import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=path=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const html=read('document.html');
const viewer=read('site/assets/js/markdown-viewer.js');
const css=read('site/assets/css/course.css');

assert.match(html,/data-copy-journal-template/);
assert.match(html,/data-copy-journal-template[^>]*hidden/);
assert.match(viewer,/params\.get\('context'\)/);
assert.match(viewer,/context=\$\{encodeURIComponent\(documentContext\)\}/);
assert.match(viewer,/personal-course\/student\/ai-learning-journal\.md/);
assert.match(viewer,/personal-course\/he\/learning-journal\.md/);
assert.match(viewer,/navigator\.clipboard\.writeText/);
assert.match(viewer,/Copy journal template/);
assert.match(viewer,/העתקת תבנית היומן/);
assert.match(viewer,/class="table-wrap" tabindex="0" role="region"/);
assert.match(viewer,/aria-label="\$\{tableLabel\}"/);
assert.match(css,/\.document-copy-button/);
assert.match(css,/\.table-wrap:focus-visible/);

console.log('Personal document context and journal-copy contract passed');
