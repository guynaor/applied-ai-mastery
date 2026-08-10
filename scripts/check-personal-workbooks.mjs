import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import JSZip from 'jszip';

const outputDirectory=process.env.PERSONAL_WORKBOOK_OUTPUT_DIR??'site/assets/downloads';
const workbooks={
 English:`${outputDirectory}/applied-ai-mastery-personal-journal-en.docx`,
 Hebrew:`${outputDirectory}/applied-ai-mastery-personal-journal-he.docx`,
};
for(const [locale,path] of Object.entries(workbooks)){
 assert.ok(existsSync(path),`Missing ${locale} downloadable personal workbook: ${path}`);
 const archive=await JSZip.loadAsync(readFileSync(path));
 const xml=await archive.file('word/document.xml').async('string');
 for(const term of locale==='English'
  ? ['Goal','Steps','Bronze','Silver','Gold']
  : ['מטרה','שלבים','Bronze','Silver','Gold']){
  assert.match(xml,new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),`${locale} workbook must include ${term}`);
 }
 assert.match(xml,/w:fill="4E356F"/,`${locale} workbook must use the Personal-course primary color`);
 assert.match(xml,/w:fill="F0EAFA"/,`${locale} workbook must use the Personal-course soft background color`);
 assert.match(xml,/w:fill="C98A2E"/,`${locale} workbook must visually distinguish Bronze tasks`);
 assert.match(xml,/w:fill="94A3B8"/,`${locale} workbook must visually distinguish Silver tasks`);
 assert.match(xml,/w:fill="D4A72C"/,`${locale} workbook must visually distinguish Gold tasks`);
 assert.match(xml,locale==='English' ? /bounded agent-monitor test/ : /סוכן ניטור מוגבל/,
  `${locale} workbook must include the Session 2 agent-monitor homework`);
 const exampleRows=(xml.match(/w:fill="F1F3F6"/g)||[]).length;
 assert.ok(exampleRows>=40,`${locale} workbook must fill its tables with worked examples, found ${exampleRows} example cells`);
 const homeworkHeading=locale==='English' ? 'Homework' : 'משימת בית';
 const lessonFlowHeading=locale==='English' ? 'Lesson flow' : 'מהלך השיעור';
 const homeworkCount=(xml.match(new RegExp(homeworkHeading,'g'))||[]).length;
 assert.equal(homeworkCount,7,`${locale} workbook must give every session a Homework heading`);
 const lessonFlowCount=(xml.match(new RegExp(lessonFlowHeading,'g'))||[]).length;
 assert.equal(lessonFlowCount,7,`${locale} workbook must give every session a Lesson flow heading`);
 const paragraphs=xml.match(/<w:p[\s\S]*?<\/w:p>/g)||[];
 const homeworkParagraphs=paragraphs.filter(paragraph=>paragraph.includes(homeworkHeading));
 assert.equal(homeworkParagraphs.length,7,`${locale} workbook must contain seven Homework paragraphs`);
 assert.ok(homeworkParagraphs.every(paragraph=>/w:pStyle w:val="Heading1"/.test(paragraph)),
  `${locale} Homework must use Heading 1`);
 const goalHeading=locale==='English' ? 'Goal' : 'מטרה';
 const goalParagraphs=paragraphs.filter(paragraph=>paragraph.includes(`>${goalHeading}<`));
 assert.ok(goalParagraphs.some(paragraph=>/w:pStyle w:val="Heading2"/.test(paragraph)),
  `${locale} Goal must use Heading 2 under Homework`);
 const taskLevelHeading=locale==='English' ? 'Choose your task level' : 'בחירת רמת המשימה';
 const taskLevelParagraphs=paragraphs.filter(paragraph=>paragraph.includes(taskLevelHeading));
 assert.equal(taskLevelParagraphs.length,7,`${locale} workbook must contain seven task-level headings`);
 assert.ok(taskLevelParagraphs.every(paragraph=>/w:pStyle w:val="Heading2"/.test(paragraph)),
  `${locale} task-level headings must use Heading 2 under Homework`);
 if(locale==='Hebrew'){
  assert.match(xml,/<w:bidi\/?>/,`Hebrew workbook must mark its paragraphs as RTL`);
  // w:jc is logical inside w:bidi: "right" means end-of-line, which renders visually left. Word also needs bidiVisual for RTL column order and w:rtl for mixed Hebrew/Latin runs.
  assert.doesNotMatch(xml,/<w:jc w:val="right"/,'Hebrew workbook must not set w:jc="right", which renders RTL paragraphs visually left-aligned');
  const tables=(xml.match(/<w:tbl>/g)||[]).length;
  const rtlTables=(xml.match(/<w:bidiVisual\/?>/g)||[]).length;
  assert.equal(rtlTables,tables,'every Hebrew table needs w:bidiVisual so Word orders its columns right-to-left');
  assert.ok((xml.match(/<w:rtl\/?>/g)||[]).length>0,'Hebrew runs must set w:rtl so mixed Hebrew and Latin text orders correctly');
 }
}
console.log('Personal downloadable workbook contract passed');
