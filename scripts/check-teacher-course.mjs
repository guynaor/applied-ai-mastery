import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const read=path=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const exists=path=>existsSync(new URL(`../${path}`,import.meta.url));

const teacherHtml=read('teacher.html');
const courseJs=read('site/assets/js/teacher-course.js');

for(const hook of [
  'data-language="en"',
  'data-language="he"',
  'data-teacher-journal-link',
  'data-mode="student"',
  'data-mode="instructor"',
  'data-session-grid',
  'data-teacher-capstone-link'
]){
  assert.match(teacherHtml,new RegExp(hook),`missing teacher page hook: ${hook}`);
}

assert.match(courseJs,/const sessions=\[/,`teacher course must declare session metadata`);
assert.equal((courseJs.match(/\bn:\s*\d+/g)??[]).length,8,'teacher course must contain exactly 8 session records');

for(const requirement of [
  'aam-teacher-language',
  'aam-teacher-mode',
  'teacher-course/he/'
]){
  assert.match(courseJs,new RegExp(requirement),`missing teacher course requirement: ${requirement}`);
}

const sessionBlock=(number,nextNumber)=>{
  const match=courseJs.match(new RegExp(`\\{\\s*n:\\s*${number}\\s*,([\\s\\S]*?)(?=\\s*(?:(?:\\/\\*[\\s\\S]*?\\*\\/|\\/\\/[^\\n]*)\\s*)*(?:\\{\\s*n:\\s*${nextNumber}\\s*,|\\];))`));
  assert.ok(match,`could not isolate Mission ${number} metadata`);
  return match[0];
};

const missionSix=sessionBlock(6,7);
assert.match(missionSix,/\b(?:no|without|exclude(?:s|d|ing)?|never)\s+(?:real\s+)?student data\b/i,'Mission 6 must exclude student data');
assert.match(missionSix,/teacher approval/i,'Mission 6 must require teacher approval');

const missionSeven=sessionBlock(7,8);
assert.match(missionSeven,/accessibility/i,'Mission 7 must address accessibility');
assert.match(missionSeven,/no data collection/i,'Mission 7 must prohibit data collection');

const resourcePaths=[...courseJs.matchAll(/['"](teacher-course\/(?:he\/)?(?:materials|capstone)\/[^'"\s]+)['"]/g)]
  .map(([,path])=>path);
assert.ok(resourcePaths.length>0,'teacher mission metadata must list local resources');
for(const path of resourcePaths){
  assert.ok(exists(path),`missing local teacher resource: ${path}`);
}

console.log('Teacher course contract passed');
