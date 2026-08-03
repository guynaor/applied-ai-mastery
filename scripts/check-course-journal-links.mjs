import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=path=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const personalHtml=read('personal.html');
const personalJs=read('site/assets/js/personal-course.js');
const professionalHtml=read('professional.html');
const professionalJs=read('site/assets/js/course.js');

const urls={
  personalEn:'https://docs.google.com/document/d/1UceZDI2bb8yrXONp5cMjf8-oFOKuIZpD2rlymuq-8aM/edit',
  personalHe:'https://docs.google.com/document/d/1opR4a6uGRh8jaKJU4AK9PKIaB3lHDK57AJiLuPqFRdk/edit',
  professionalEn:'https://docs.google.com/document/d/1jCA_128e9MWrn-ULXzFEcGf2HQ9CCKsiLUuJ0hfdYzQ/edit',
  professionalHe:'https://docs.google.com/document/d/1iPmulu1pq0U3N6QYcTdWFOfEd9w_AikfnQNn2B8IFSk/edit',
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
