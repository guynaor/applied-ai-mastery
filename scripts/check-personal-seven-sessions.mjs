import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const portalPath='site/assets/js/personal-course.js';
const publicPaths=[
 'index.html',
 'site/assets/js/index-i18n.js',
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

const legacyLessons={
 1:[1,2,3],
 2:[4,5,8],
 3:[6,7],
 4:[9],
 5:[10],
 6:[11],
 7:[12],
};
const legacyMaterialSlugs={
 1:'better-requests',2:'summaries',3:'decisions',4:'online-buying',5:'deal-alerts',
 6:'travel-planning',7:'event-planning',8:'investment-research',9:'mini-app',
 10:'room-design',11:'visual-storytelling',12:'personal-brand',
};
const instructorFiles={
 1:'step-by-step-guide.md',2:'step-by-step-guide.md',3:'step-by-step-guide.md',
 4:'step-by-step-script.md',5:'step-by-step-script.md',6:'step-by-step-script.md',
 7:'step-by-step-guide.md',8:'step-by-step-guide.md',9:'step-by-step-guide.md',
 10:'step-by-step-script.md',11:'step-by-step-script.md',12:'step-by-step-script.md',
};
const workbookFiles={
 1:'prompt-workbook.md',2:'verification-workbook.md',3:'decision-workbook.md',
 4:'comparison-workbook.md',5:'alert-specification.md',6:'trip-planning-workbook.md',
 7:'event-workbook.md',8:'research-workbook.md',9:'app-workbook.md',
 10:'design-workbook.md',11:'storyboard-workbook.md',12:'portfolio-workbook.md',
};

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

 const briefs=[
  ['English',readFileSync(english,'utf8')],
  ['Hebrew',readFileSync(hebrew,'utf8')],
 ];
 for(const [locale,brief] of briefs){
  const phaseTerms=locale==='English'
   ? [/Required integrated phases/i,/optional (?:full )?activit(?:y|ies)|optional extension/i,/selected excerpts/i]
   : [/שלבים משולבים נדרשים/,/הרחבה אופציונלית/,/הקטעים הנבחרים/];
  for(const term of phaseTerms)assert.match(brief,term,
   `${locale} Session ${index+1} must distinguish selected integrated work from optional full legacy activities`);
  for(const legacyLesson of legacyLessons[index+1]){
   const lessonRoot=`personal-course/materials/lesson-${String(legacyLesson).padStart(2,'0')}-${legacyMaterialSlugs[legacyLesson]}`;
   for(const legacyFile of [
    'student/activity.md',
    `student/${workbookFiles[legacyLesson]}`,
    'student/real-life-mission.md',
    `instructor/${instructorFiles[legacyLesson]}`,
   ]){
    const legacyPath=`${lessonRoot}/${legacyFile}`;
    assert.match(brief,new RegExp(legacyPath.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),
     `${locale} Session ${index+1} must retain Lesson ${legacyLesson}'s ${legacyFile}`);
   }
  }
 }
}

assert.match(portal,/\bsession\w*\s*=\s*\[/i,
 'Personal portal must expose its integrated sessions as an array');
assert.match(portal,/aam-personal-sessions/,'Personal progress must use the seven-session storage key');
assert.match(portal,/\bsessions?\.length\b/i,
 'Personal progress must derive its total from the session collection');
assert.match(portal,/data-personal-progress/,'Personal portal must expose a session progress control');
assert.match(portal,/data-personal-progress-label/,'Personal portal must expose a session progress label');
assert.match(portal,/45[–-]60\s*(?:minutes|דקות)/i,'Personal portal must label sessions as 45–60 minutes');

const sessionOne={
 English:readFileSync('personal-course/sessions/session-01-ask-summarize-decide.md','utf8'),
 Hebrew:readFileSync('personal-course/he/sessions/session-01-ask-summarize-decide.md','utf8'),
};
for(const [locale,terms] of Object.entries({
 English:[/Facilitator flow[^\n]*55 minutes/i,/AI geography[^\n]*10 minutes/i,/Frame the request[^\n]*10 minutes/i,/Summarize for a purpose[^\n]*10 minutes/i,/Compare and decide[^\n]*15 minutes/i,/Verify and journal[^\n]*10 minutes/i,/privacy|private|sensitive/i,/Claude/i,/ChatGPT/i,/Gemini/i,/optionally demonstrate/i,/work on paper|observe/i,/free access/i],
 Hebrew:[/מהלך הנחיה משולב[^\n]*55 דקות/,/גאוגרפיית AI[^\n]*10 דקות/,/בניית בקשה מובנית[^\n]*10 דקות/,/סיכום המעוגן במקור[^\n]*10 דקות/,/השוואה והחלטה[^\n]*15 דקות/,/אימות ויומן[^\n]*10 דקות/,/פרטיות|פרטי|רגיש/,/Claude/i,/ChatGPT/i,/Gemini/i,/הדגמה/,/צפו בהדגמה|צפו במנחה/,/מנוי|גישה/],
})){
 for(const term of terms)assert.match(sessionOne[locale],term,`${locale} Session 1 must include ${term}`);
}

const journal=readFileSync('personal-course/student/ai-learning-journal.md','utf8');
assert.match(journal,/throughout all 7 integrated sessions\. Each session has its own tab/i,
 'English journal home must describe the seven integrated sessions');
assert.doesNotMatch(journal,/throughout all 12 lessons|Each lesson has its own tab/i,
 'English journal home must not retain twelve-lesson wording');

const sessionTwo={
 English:readFileSync('personal-course/sessions/session-02-research-buy-monitor.md','utf8'),
 Hebrew:readFileSync('personal-course/he/sessions/session-02-research-buy-monitor.md','utf8'),
};
for(const [locale,terms] of Object.entries({
 English:[/Gemini Deep Research/i,/evidence matrix|evidence/i,/verif/i,/free[- ]access|free option|free tier|without payment/i],
 Hebrew:[/Gemini Deep Research/i,/מטריצת ראיות|ראיות/,/אימות/,/גישה חינמית|ללא תשלום|חינם/],
})){
 for(const term of terms)assert.match(sessionTwo[locale],term,`${locale} Session 2 must include ${term}`);
}

const audienceCopy=publicPaths.map(path=>readFileSync(path,'utf8')).join('\n');
for(const term of [/young adults?/i,/before university/i,/צעירים|צעירות/,/לפני\s+(?:או\s+אחרי\s+)?(?:הלימודים\s+)?האוניברסיט(?:ה|איים)/i]){
 assert.doesNotMatch(audienceCopy,term,`Personal course must be audience-neutral; found ${term}`);
}

console.log('Personal seven-session contract passed');
