import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

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

console.log('Learning journal source contract passed');
