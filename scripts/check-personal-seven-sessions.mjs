import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const portalPath='site/assets/js/personal-course.js';
const publicPaths=[
 'personal.html',
 portalPath,
 'personal-course/README.md',
 'personal-course/he/README.md',
];
const sessionSlugs=[
 'ask-summarize-decide',
 'research-buy-monitor',
 'plan-real-life-together',
 'build-personal-tool',
 'design-physical-project',
 'trustworthy-visual-story',
 'workflow-portfolio-project',
];

for(const path of publicPaths)assert.ok(existsSync(path),`Missing Personal course source: ${path}`);
const portal=readFileSync(portalPath,'utf8');

const sessionsDeclaration=portal.match(/const sessions\s*=\s*\[([\s\S]*?)\n\];/);
assert.ok(sessionsDeclaration,'Personal portal must declare a sessions metadata array');
const sessionIds=[...sessionsDeclaration[1].matchAll(/\bid\s*:\s*(\d+)/g)].map(match=>Number(match[1]));
assert.deepEqual(sessionIds,[1,2,3,4,5,6,7],'Personal portal must define exactly seven session records, numbered 1–7');

assert.match(portal,/aam-personal-sessions/,'Personal progress must use the seven-session storage key');
assert.match(portal,/max=["']7["']/,'Personal progress control must have a maximum of 7');
assert.match(portal,/7\s+(?:sessions|שיעורים)/i,'Personal progress copy must describe seven sessions');
assert.match(portal,/45[–-]60\s*(?:minutes|דקות)/i,'Personal portal must label sessions as 45–60 minutes');

for(const [index,slug] of sessionSlugs.entries()){
 const number=String(index+1).padStart(2,'0');
 const english=`personal-course/sessions/session-${number}-${slug}.md`;
 const hebrew=`personal-course/he/sessions/session-${number}-${slug}.md`;
 assert.ok(existsSync(english),`Missing English session brief: ${english}`);
 assert.ok(existsSync(hebrew),`Missing Hebrew session brief: ${hebrew}`);
 assert.match(portal,new RegExp(english.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),
  `Personal portal must link English Session ${index+1} to its integrated brief`);
 assert.match(portal,new RegExp(hebrew.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),
  `Personal portal must link Hebrew Session ${index+1} to its integrated brief`);
}

const sessionOne=[
 readFileSync('personal-course/sessions/session-01-ask-summarize-decide.md','utf8'),
 readFileSync('personal-course/he/sessions/session-01-ask-summarize-decide.md','utf8'),
].join('\n');
for(const term of [/prompt/i,/summary|summari/i,/decision/i,/privacy|private|sensitive/i,/Claude/i,/ChatGPT/i,/Gemini/i]){
 assert.match(sessionOne,term,`Session 1 must include ${term}`);
}

const sessionTwo=[
 readFileSync('personal-course/sessions/session-02-research-buy-monitor.md','utf8'),
 readFileSync('personal-course/he/sessions/session-02-research-buy-monitor.md','utf8'),
].join('\n');
for(const term of [/Gemini Deep Research/i,/evidence matrix|מטריצת ראיות/i,/verif|אימות/i,/free-access|גישה חינמית|ללא תשלום/i]){
 assert.match(sessionTwo,term,`Session 2 must include ${term}`);
}

const audienceCopy=publicPaths.map(path=>readFileSync(path,'utf8')).join('\n');
for(const term of [/young adults?/i,/before university/i,/צעירים|צעירות/,/לפני\s+(?:או\s+אחרי\s+)?(?:הלימודים\s+)?האוניברסיט(?:ה|איים)/i]){
 assert.doesNotMatch(audienceCopy,term,`Personal course must be audience-neutral; found ${term}`);
}

console.log('Personal seven-session contract passed');
