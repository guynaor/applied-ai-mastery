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
  'teacher-course/he/',
  'student data',
  'teacher approval',
  'accessibility'
]){
  assert.match(courseJs,new RegExp(requirement),`missing teacher course requirement: ${requirement}`);
}

const resourcePaths=[...courseJs.matchAll(/['"](teacher-course\/(?:he\/)?(?:materials|capstone)\/[^'"\s]+)['"]/g)]
  .map(([,path])=>path);
assert.ok(resourcePaths.length>0,'teacher mission metadata must list local resources');
for(const path of resourcePaths){
  assert.ok(exists(path),`missing local teacher resource: ${path}`);
}

console.log('Teacher course contract passed');
