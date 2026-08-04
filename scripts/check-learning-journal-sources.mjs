import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {parseJournalTabs} from './lib/journal-tabs.mjs';

const paths={
 personalEn:'personal-course/student/ai-learning-journal.md',
 personalHe:'personal-course/he/learning-journal.md',
 professionalEn:'professional-course/student/ai-learning-journal.md',
 professionalHe:'professional-course/he/student/ai-learning-journal.md',
};

for(const path of Object.values(paths))assert.ok(existsSync(path),`Missing journal source: ${path}`);

const personalEn=readFileSync(paths.personalEn,'utf8');
const personalHe=readFileSync(paths.personalHe,'utf8');
const professionalEn=readFileSync(paths.professionalEn,'utf8');
const professionalHe=readFileSync(paths.professionalHe,'utf8');

assert.match(personalEn,/^# My AI Learning Journal/m);
assert.match(personalHe,/^# יומן הלמידה האישי שלי ב-AI/m);
assert.match(professionalEn,/^# My Applied AI Professional Journal/m);
assert.match(professionalHe,/^# יומן הלמידה המקצועי שלי ב-AI יישומי/m);

for(const source of [personalEn,personalHe,professionalEn,professionalHe]){
 assert.match(source,/verification|אימות/i);
 assert.match(source,/human|אנושי/i);
 assert.match(source,/private|sensitive|פרטי|רגיש/i);
 assert.match(source,/end-of-course reflection|סיכום בסוף הקורס/i);
}

for(let mission=1;mission<=7;mission+=1){
 assert.match(professionalEn,new RegExp(`Mission ${mission}`));
 assert.match(professionalHe,new RegExp(`משימה ${mission}`));
}
assert.match(professionalEn,/Capstone/);
assert.match(professionalHe,/פרויקט מסכם/);

const expected={
 personal:[
  'journal-home','entry-template','prompt-library','course-reflection',
  'lesson-01','lesson-02','lesson-03','lesson-04','lesson-05','lesson-06',
  'lesson-07','lesson-08','lesson-09','lesson-10','lesson-11','lesson-12',
 ],
 professional:[
  'journal-home','entry-template','workflow-library','course-reflection',
  'mission-01','mission-02','mission-03','mission-04','mission-05','mission-06',
  'mission-07','capstone',
 ],
};

const journals={personalEn,personalHe,professionalEn,professionalHe};
const parsed=Object.fromEntries(Object.entries(journals).map(([key,source])=>[key,parseJournalTabs(source)]));
assert.deepEqual(parsed.personalEn.map(tab=>tab.id),expected.personal);
assert.deepEqual(parsed.personalHe.map(tab=>tab.id),expected.personal);
assert.deepEqual(parsed.professionalEn.map(tab=>tab.id),expected.professional);
assert.deepEqual(parsed.professionalHe.map(tab=>tab.id),expected.professional);

for(const tabs of Object.values(parsed)){
 for(const tab of tabs){
  assert.match(tab.title,/\S/);
  assert.match(tab.markdown,/^# /m);
  assert.match(tab.markdown,/verification|verify|אימות|בדיקה/i);
  assert.match(tab.markdown,/evidence|saved|ראיות|שמר/i);
  assert.match(tab.markdown,/reflection|next time|רפלקציה|בפעם הבאה/i);
 }
}

assert.throws(()=>parseJournalTabs('plain markdown'),/no journal-tab markers/);
assert.throws(()=>parseJournalTabs('<!-- journal-tab: nope -->'),/Invalid journal-tab metadata/);
const extracted=parseJournalTabs('<!-- journal-tab: {"id":"one","title":"One"} -->\n# One\n\nVerify evidence and reflect next time.');
assert.equal(extracted[0].id,'one');
assert.match(extracted[0].markdown,/^# One/);

console.log('Learning journal source contract passed');
