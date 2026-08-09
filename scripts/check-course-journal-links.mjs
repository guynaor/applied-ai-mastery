import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=path=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const personalHtml=read('personal.html');
const personalJs=read('site/assets/js/personal-course.js');
const professionalHtml=read('professional.html');
const professionalJs=read('site/assets/js/course.js');
const teacherHtml=read('teacher.html');
const teacherJs=read('site/assets/js/teacher-course.js');

const urls={
  personalEn:'site/assets/downloads/applied-ai-mastery-personal-journal-en.docx',
  personalHe:'site/assets/downloads/applied-ai-mastery-personal-journal-he.docx',
  professionalEn:'https://docs.google.com/document/d/102K0ED3qFCT2V0Kkz9XHTvLouQCkNvY1Xr7f8GpsPk0/edit',
  professionalHe:'https://docs.google.com/document/d/1g6RS11QayPUVbyAf-JIXzCKPIvEctz9l0S9_YY7idxk/edit',
};

assert.match(personalHtml,new RegExp(urls.personalEn));
assert.match(personalJs,new RegExp(urls.personalEn));
assert.match(personalJs,new RegExp(urls.personalHe));
assert.match(personalJs,/journalUrls\[language\]/);
assert.match(personalHtml,/data-journal-link[^>]*download/);
assert.match(personalHtml,/data-i18n="journalInstruction"/);
assert.match(personalJs,/Download the editable Word workbook/);

assert.match(professionalHtml,new RegExp(urls.professionalEn));
assert.match(professionalJs,new RegExp(urls.professionalEn));
assert.match(professionalJs,new RegExp(urls.professionalHe));
assert.match(professionalJs,/journalUrls\[state\.language\]/);
assert.match(professionalHtml,/data-professional-journal-link[^>]*target="_blank"[^>]*rel="noopener noreferrer"/);
assert.match(professionalHtml,/data-i18n="journalInstruction"/);
assert.match(professionalJs,/File -> Make a copy/);

assert.match(teacherHtml,/data-teacher-journal-link/);
assert.match(teacherHtml,/document\.html\?src=teacher-course%2Fstudent%2Fai-learning-journal\.md/);
assert.match(teacherJs,/const prefix=hebrew\?'teacher-course\/he\/':'teacher-course\//);
assert.match(teacherJs,/resourceHref\(`\$\{prefix\}student\/ai-learning-journal\.md`\)/);

console.log('Bilingual journal-link contract passed');
