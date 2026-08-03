import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=path=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const englishGuide=read('personal-course/instructor/real-life-mission-review-guide.md');
const hebrewGuide=read('personal-course/he/instructor-review-guide.md');

assert.match(englishGuide,/Agree on one external channel before the course begins/);
assert.match(englishGuide,/- Google Classroom\n/);
assert.doesNotMatch(englishGuide,/^- .*;$/m,'English guide has a bullet ending in a semicolon');
assert.match(hebrewGuide,/Google Classroom/);
assert.doesNotMatch(hebrewGuide,/^- .*;$/m,'Hebrew guide has a bullet ending in a semicolon');

for(const path of [
  'materials/shared/AF-REF-001-ai-geography.md',
  'personal-course/he/ai-geography.md',
  'professional-course/he/ai-geography.md',
]){
  const content=read(path);
  assert.match(content,/## (?:Check your answers|תשובות לבדיקה)/,`${path} has no answer section`);
  const answerSection=content.split(/## (?:Check your answers|תשובות לבדיקה)/)[1].split('\n## ')[0];
  assert.equal((answerSection.match(/^\d+\./gm)||[]).length,4,`${path} must contain four answers`);
}

console.log('Personal course reviewer content contract passed');
