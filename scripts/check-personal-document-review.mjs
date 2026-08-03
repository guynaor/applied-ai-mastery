import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=path=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const html=read('document.html');
const viewer=read('site/assets/js/markdown-viewer.js');
const css=read('site/assets/css/course.css');

assert.equal((html.match(/data-back-link/g)||[]).length,2);
assert.match(html,/data-document-bottom-nav[^>]*hidden/);
assert.doesNotMatch(html,/data-source-link|data-copy-journal-template/);
assert.match(viewer,/params\.get\('context'\)/);
assert.match(viewer,/context=\$\{encodeURIComponent\(documentContext\)\}/);
assert.match(viewer,/querySelectorAll\('\[data-back-link\]'\)/);
assert.match(viewer,/bottomNavigation\.hidden=false/);
assert.doesNotMatch(viewer,/navigator\.clipboard|journalCopy|sourceLink/);
assert.match(viewer,/class="table-wrap" tabindex="0" role="region"/);
assert.match(viewer,/aria-label="\$\{tableLabel\}"/);
assert.match(css,/\.document-return/);
assert.match(css,/\.document-return\[hidden\]/);
assert.doesNotMatch(css,/\.document-copy-button/);
assert.match(css,/\.table-wrap:focus-visible/);

console.log('Document context and return-navigation contract passed');
