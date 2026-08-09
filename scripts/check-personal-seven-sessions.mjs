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

for(const [index,slug] of sessionSlugs.entries()){
 const number=String(index+1).padStart(2,'0');
 const english=`personal-course/sessions/session-${number}-${slug}.md`;
 const hebrew=`personal-course/he/sessions/session-${number}-${slug}.md`;
 const englishGuide=`personal-course/instructor/sessions/session-${number}-guide.md`;
 const hebrewGuide=`personal-course/he/instructor/sessions/session-${number}-guide.md`;
 assert.ok(existsSync(english),`Missing English session brief: ${english}`);
 assert.ok(existsSync(hebrew),`Missing Hebrew session brief: ${hebrew}`);
 assert.ok(existsSync(englishGuide),`Missing English facilitator guide: ${englishGuide}`);
 assert.ok(existsSync(hebrewGuide),`Missing Hebrew facilitator guide: ${hebrewGuide}`);
 assert.match(portal,new RegExp(english.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),
  `Personal portal must link English Session ${index+1} to its integrated brief`);
 assert.match(portal,new RegExp(hebrew.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),
  `Personal portal must link Hebrew Session ${index+1} to its integrated brief`);

 const briefs=[
  ['English',readFileSync(english,'utf8')],
  ['Hebrew',readFileSync(hebrew,'utf8')],
 ];
 for(const [locale,brief] of briefs){
  const requiredHeadings=locale==='English'
   ? [/^## Scenario\b/im,/^## Sequence\b/im,/^## Integrated artifact\b/im,/^## Optional resources\b/im]
   : [/^## תרחיש(?:\s|$)/im,/^## מהלך(?:\s|$)/im,/^## תוצר משולב(?:\s|$)/im,/^## משאבים אופציונליים(?:\s|$)/im];
  for(const heading of requiredHeadings)assert.match(brief,heading,
   `${locale} Session ${index+1} must contain ${heading}`);

  const legacyHeadings=locale==='English'
   ? [/^##?\s*Phase [ABC]\b/im,/^##?\s*Required integrated phases\b/im]
   : [/^##?\s*שלב[\s׳']*[אבג](?:\s|$|—|-)/im,/^##?\s*שלבים משולבים נדרשים(?:\s|$|—|-)/im];
  for(const heading of legacyHeadings)assert.doesNotMatch(brief,heading,
   `${locale} Session ${index+1} must not expose legacy phase headings`);
 }
}

const sessionFour={
 English:readFileSync('personal-course/sessions/session-04-build-personal-tool.md','utf8'),
 Hebrew:readFileSync('personal-course/he/sessions/session-04-build-personal-tool.md','utf8'),
};
for(const [locale,brief] of Object.entries(sessionFour)){
 assert.match(brief,/Claude Artifacts/i,`${locale} Session 4 must use Claude Artifacts for the small web tool`);
 const normalAndEdge=locale==='English'
  ? /(?:normal (?:case|test)[\s\S]*edge (?:case|test)|edge (?:case|test)[\s\S]*normal (?:case|test))/i
  : /(?:מקרה רגיל[\s\S]*מקרה קצה|מקרה קצה[\s\S]*מקרה רגיל)/;
 assert.match(brief,normalAndEdge,
  `${locale} Session 4 must test both a normal case and an edge case`);
}

const sessionSeven={
 English:readFileSync('personal-course/sessions/session-07-workflow-portfolio-project.md','utf8'),
 Hebrew:readFileSync('personal-course/he/sessions/session-07-workflow-portfolio-project.md','utf8'),
};
for(const [locale,brief] of Object.entries(sessionSeven)){
 assert.match(brief,/Claude Desktop/i,`${locale} Session 7 must include Claude Desktop`);
 assert.match(brief,locale==='English' ? /least privilege|minimum (?:necessary|required) access/i : /הרשאה מזערית|גישה מזערית|המינימום הנדרש/,
  `${locale} Session 7 must teach least-privilege access`);
 assert.match(brief,/Claude for Chrome/i,`${locale} Session 7 must mention Claude for Chrome`);
 assert.match(brief,locale==='English' ? /further exploration/i : /להעמקה|לחקירה נוספת/,
  `${locale} Session 7 must position Claude for Chrome as further exploration`);
 assert.match(brief,/OpenClaw/i,`${locale} Session 7 must mention OpenClaw`);
 assert.match(brief,locale==='English' ? /paper[- ]only/i : /על הנייר בלבד/,
  `${locale} Session 7 must keep OpenClaw paper-only`);
}

assert.match(portal,/\bsession\w*\s*=\s*\[/i,
 'Personal portal must expose its integrated sessions as an array');
assert.match(portal,/aam-personal-sessions/,'Personal progress must use the seven-session storage key');
assert.match(portal,/\bsessions?\.length\b/i,
 'Personal progress must derive its total from the session collection');
assert.match(portal,/data-personal-progress/,'Personal portal must expose a session progress control');
assert.match(portal,/data-personal-progress-label/,'Personal portal must expose a session progress label');
assert.match(portal,/45[–-]60\s*(?:minutes|דקות)/i,'Personal portal must label sessions as 45–60 minutes');

const journal=readFileSync('personal-course/student/ai-learning-journal.md','utf8');
assert.match(journal,/throughout all 7 integrated sessions\. Each session has its own tab/i,
 'English journal home must describe the seven integrated sessions');
assert.doesNotMatch(journal,/throughout all 12 lessons|Each lesson has its own tab/i,
 'English journal home must not retain twelve-lesson wording');
const sessionSevenJournal=journal.match(/<!-- journal-tab: \{"id":"session-07"[^]*$/)?.[0] ?? '';
for(const term of [/personal workflow/i,/portfolio/i,/capstone|final personal project/i,/Claude Desktop/i,/permission/i,/OpenClaw/i,/no install|paper-only/i]){
 assert.match(sessionSevenJournal,term,`English Session 7 journal must include ${term}`);
}
for(const term of [/application package/i,/audience-specific application/i,/target role or audience/i,/CV revised/i,/application is logged/i]){
 assert.doesNotMatch(sessionSevenJournal,term,`English Session 7 journal must not retain application-package framing: ${term}`);
}

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

const sessionOneGuides={
 English:readFileSync('personal-course/instructor/sessions/session-01-guide.md','utf8'),
 Hebrew:readFileSync('personal-course/he/instructor/sessions/session-01-guide.md','utf8'),
};
for(const term of [
 /^## AI Geography/im,
 /Large language model/i,
 /AI application/i,
 /Tools and connectors/i,
 /Artifact/i,
 /Skill/i,
 /Agent/i,
 /public page/i,
 /local (?:sample|page|fallback)/i,
 /What to say/i,
 /video/i,
 /troubleshoot/i,
])assert.match(sessionOneGuides.English,term,
 `English Session 1 guide must include its full teacher-ready AI orientation: ${term}`);
for(const term of [
 /^## מפת עולם ה-AI/im,
 /מודל שפה גדול/,
 /יישום AI/,
 /כלים ומחברים/,
 /תוצר/,
 /מיומנות/,
 /סוכן/,
 /דף ציבורי/,
 /(?:דף (?:אפשרויות )?הדוגמה המקומי|חלופה מקומית)/,
 /מה לומר/,
 /וידאו/,
 /תקלות/,
])assert.match(sessionOneGuides.Hebrew,term,
 `Hebrew Session 1 guide must include its full teacher-ready AI orientation: ${term}`);

assert.match(sessionOneGuides.English,/\[Learning Journal\]\(\.\.\/\.\.\/student\/ai-learning-journal\.md\)/,
 'English Session 1 guide must link the learner learning journal');
assert.match(sessionOneGuides.Hebrew,/\[יומן הלמידה\]\(\.\.\/\.\.\/learning-journal\.md\)/,
 'Hebrew Session 1 guide must link the learner learning journal');
assert.match(sessionOneGuides.Hebrew,/\[מפת עולם ה-AI בעשר דקות\]\(\.\.\/\.\.\/ai-geography\.md\)/,
 'Hebrew Session 1 guide must link its Hebrew AI Geography page');

const sessionOneCopy=[
 readFileSync('personal-course/sessions/session-01-ask-summarize-decide.md','utf8'),
 readFileSync('personal-course/he/sessions/session-01-ask-summarize-decide.md','utf8'),
 sessionOneGuides.English,
 sessionOneGuides.Hebrew,
].join('\n');
for(const term of [/\b(?:non-sensitive|sensitive|password|private message|confidential|health information)\b/i,/לא־רגיש|רגיש|סיסמ|הודעות פרטיות|חסוי|מידע רפואי/])assert.doesNotMatch(sessionOneCopy,term,
 `Session 1 materials must leave privacy/secrets discussion to the facilitator: ${term}`);

const audienceCopy=publicPaths.map(path=>readFileSync(path,'utf8')).join('\n');
for(const term of [/young adults?/i,/before university/i,/צעירים|צעירות/,/לפני\s+(?:או\s+אחרי\s+)?(?:הלימודים\s+)?האוניברסיט(?:ה|איים)/i]){
 assert.doesNotMatch(audienceCopy,term,`Personal course must be audience-neutral; found ${term}`);
}

console.log('Personal seven-session contract passed');
