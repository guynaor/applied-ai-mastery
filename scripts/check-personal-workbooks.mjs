import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import JSZip from 'jszip';

const workbooks={
 English:'site/assets/downloads/applied-ai-mastery-personal-journal-en.docx',
 Hebrew:'site/assets/downloads/applied-ai-mastery-personal-journal-he.docx',
};
for(const [locale,path] of Object.entries(workbooks)){
 assert.ok(existsSync(path),`Missing ${locale} downloadable personal workbook: ${path}`);
 const archive=await JSZip.loadAsync(readFileSync(path));
 const xml=await archive.file('word/document.xml').async('string');
 for(const term of locale==='English'
  ? ['Session 1: Decide What to Do Next','Session 7: Build a Personal System','Bronze','Silver','Gold']
  : ['מפגש 1: להחליט מה הצעד הבא','מפגש 7: לבנות מערכת אישית','Bronze','Silver','Gold']){
  assert.match(xml,new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),`${locale} workbook must include ${term}`);
 }
 assert.match(xml,/w:fill="4E356F"/,`${locale} workbook must use the Personal-course primary color`);
 assert.match(xml,/w:fill="F0EAFA"/,`${locale} workbook must use the Personal-course soft background color`);
 assert.match(xml,/w:fill="C98A2E"/,`${locale} workbook must visually distinguish Bronze tasks`);
 assert.match(xml,/w:fill="94A3B8"/,`${locale} workbook must visually distinguish Silver tasks`);
 assert.match(xml,/w:fill="D4A72C"/,`${locale} workbook must visually distinguish Gold tasks`);
 if(locale==='Hebrew')assert.match(xml,/<w:bidi\/?>/,`Hebrew workbook must mark its paragraphs as RTL`);
}
console.log('Personal downloadable workbook contract passed');
