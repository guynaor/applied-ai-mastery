import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=path=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');

const professionalHtml=read('professional.html');
const courseJs=read('site/assets/js/course.js');

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

console.log('Professional localization contract passed');
