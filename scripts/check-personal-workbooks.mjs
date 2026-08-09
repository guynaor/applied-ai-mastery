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
}
console.log('Personal downloadable workbook contract passed');
