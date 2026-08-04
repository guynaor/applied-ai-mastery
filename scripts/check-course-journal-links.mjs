import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=path=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const personalHtml=read('personal.html');
const personalJs=read('site/assets/js/personal-course.js');
const professionalHtml=read('professional.html');
const professionalJs=read('site/assets/js/course.js');

const urls={
  personalEn:'https://docs.google.com/document/d/1IHBKI8awtoKUCrxSvxyLP9rD0VwqvV4AJ3OqdZhXTuc/edit',
  personalHe:'https://docs.google.com/document/d/1dhFjUdFiVm1FGhYmxcpLGz3DG4MyfG_whxJkmjbBDXA/edit',
  professionalEn:'https://docs.google.com/document/d/102K0ED3qFCT2V0Kkz9XHTvLouQCkNvY1Xr7f8GpsPk0/edit',
  professionalHe:'https://docs.google.com/document/d/1g6RS11QayPUVbyAf-JIXzCKPIvEctz9l0S9_YY7idxk/edit',
};

assert.match(personalHtml,new RegExp(urls.personalEn));
assert.match(personalJs,new RegExp(urls.personalEn));
assert.match(personalJs,new RegExp(urls.personalHe));
assert.match(personalJs,/journalUrls\[language\]/);
assert.match(personalHtml,/data-journal-link[^>]*target="_blank"[^>]*rel="noopener noreferrer"/);
assert.match(personalHtml,/data-i18n="journalInstruction"/);
assert.match(personalJs,/File -> Make a copy/);

assert.match(professionalHtml,new RegExp(urls.professionalEn));
assert.match(professionalJs,new RegExp(urls.professionalEn));
assert.match(professionalJs,new RegExp(urls.professionalHe));
assert.match(professionalJs,/journalUrls\[state\.language\]/);
assert.match(professionalHtml,/data-professional-journal-link[^>]*target="_blank"[^>]*rel="noopener noreferrer"/);
assert.match(professionalHtml,/data-i18n="journalInstruction"/);
assert.match(professionalJs,/File -> Make a copy/);

console.log('Bilingual Google Docs journal-link contract passed');
