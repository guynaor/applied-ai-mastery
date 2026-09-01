import assert from 'node:assert/strict';
import {hebrewPhrase} from './lib/hebrew-matchers.mjs';
import {existsSync,readdirSync,readFileSync} from 'node:fs';
import path from 'node:path';

const read=path=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const exists=path=>existsSync(new URL(`../${path}`,import.meta.url));
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const listMarkdown=directory=>readdirSync(path.join(root,directory),{withFileTypes:true}).flatMap(entry=>{
  const relative=path.posix.join(directory,entry.name);
  return entry.isDirectory()?listMarkdown(relative):relative.endsWith('.md')?[relative]:[];
});

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

const missionTwo=sessionBlock(2,3);
for(const {path,enLabel,heLabel} of [
  {path:'teacher-course/materials/session-02-research/sources/EDU-SRC-201-district-guidance.md',enLabel:'Source 1 — District guidance',heLabel:'מקור 1 — הנחיית מחוז (חומר עבודה באנגלית)'},
  {path:'teacher-course/materials/session-02-research/sources/EDU-SRC-202-vendor-claim.md',enLabel:'Source 2 — Vendor claim',heLabel:'מקור 2 — טענת ספק (חומר עבודה באנגלית)'},
  {path:'teacher-course/materials/session-02-research/sources/EDU-SRC-203-classroom-observation.md',enLabel:'Source 3 — Classroom observation',heLabel:'מקור 3 — תצפית כיתתית (חומר עבודה באנגלית)'},
  {path:'teacher-course/materials/session-02-research/sources/EDU-SRC-204-research-summary.md',enLabel:'Source 4 — Research summary',heLabel:'מקור 4 — סיכום מחקר (חומר עבודה באנגלית)'}
]){
  assert.ok(missionTwo.includes(path),`Mission 2 must link research source: ${path}`);
  assert.ok(missionTwo.includes(enLabel),`Mission 2 must label research source in English: ${enLabel}`);
  assert.ok(missionTwo.includes(heLabel),`Mission 2 must label canonical-English research source in Hebrew: ${heLabel}`);
}

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

const hebrewTeacherSources=[
  ...listMarkdown('teacher-course/he'),
  'site/assets/js/teacher-course.js'
];
const hebrewTeacherText=hebrewTeacherSources.map(path=>read(path)).join('\n');
for(const term of ['יסודי','חטיבה','תיכון']){
  assert.match(hebrewTeacherText,new RegExp(term),`missing Israeli Hebrew grade-band term: ${term}`);
}
for(const legacyTerm of ['K–12','K-12','K–2','K-2','3–5','3-5','6–8','6-8','9–12','9-12']){
  const lines=hebrewTeacherText.split('\n').filter(line=>/[\u0590-\u05ff]/.test(line));
  assert.ok(!lines.some(line=>line.includes(legacyTerm)),`legacy Hebrew grade-band term remains: ${legacyTerm}`);
}

assert.match(courseJs,/יחידת לימוד ליסודי, לחטיבה או לתיכון בבדיקת מורה/,'missing simplified Hebrew capstone title');
assert.match(courseJs,hebrewPhrase('א׳–י״ב'),'missing broad Hebrew course grade range');
for(const detailedRange of ['יסודי א׳–ו׳','חטיבה ז׳–ט׳','תיכון י׳–י״ב']){
  const lines=hebrewTeacherText.split('\n').filter(line=>/[\u0590-\u05ff]/.test(line));
  assert.ok(!lines.some(line=>line.includes(detailedRange)),`detailed Hebrew grade range remains: ${detailedRange}`);
}

console.log('Teacher course contract passed');
