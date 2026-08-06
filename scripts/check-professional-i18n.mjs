import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=path=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');

const professionalHtml=read('professional.html');
const courseJs=read('site/assets/js/course.js');
const indexHtml=read('index.html');
const indexJs=read('site/assets/js/index-i18n.js');
const viewerJs=read('site/assets/js/markdown-viewer.js');
const documentContextJs=read('site/assets/js/hebrew-document-context.js');

assert.match(professionalHtml,/data-language="en"/);
assert.match(professionalHtml,/data-language="he"/);
assert.match(professionalHtml,/data-i18n="heroTitle"/);
assert.match(professionalHtml,/data-professional-capstone-link/);
assert.match(professionalHtml,/data-professional-overview-link/);

for(const key of ['skip','nav','chooseView','progressionTitle','capstoneTitle','companyTitle','footerBrand']){
  assert.match(professionalHtml,new RegExp(`data-i18n(?:-aria-label)?="${key}"`),`missing ${key} localization hook`);
}

assert.match(courseJs,/aam-professional-language/);
assert.match(courseJs,/professional-course\/he\//);
assert.match(courseJs,/URLSearchParams/);
assert.match(indexHtml,/data-professional-link/);
assert.match(indexJs,/data-professional-link/);
assert.match(indexJs,/professional\.html\?lang=/);
assert.match(indexHtml,/data-teacher-link/);
assert.match(indexJs,/data-teacher-link/);
assert.match(indexJs,/teacher\.html\?lang=/);
assert.match(viewerJs,/professional-course\/he\//);
assert.match(viewerJs,/aam-professional-language/);
assert.match(viewerJs,/professional\.html\?lang=he#missions/);
assert.match(documentContextJs,/professional-course\/he\//);
assert.match(documentContextJs,/aam-professional-language/);

console.log('Professional localization contract passed');
