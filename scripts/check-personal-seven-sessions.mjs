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
 assert.match(brief,locale==='English' ? /agent run record|review operations/i : /רישום ההרצה|בודקים תפעול/,
  `${locale} Session 7 must review bounded OpenClaw operations`);
 assert.doesNotMatch(brief,locale==='English' ? /paper[- ]only/i : /על הנייר בלבד/,
  `${locale} Session 7 must not keep OpenClaw paper-only`);
}

assert.match(portal,/\bsession\w*\s*=\s*\[/i,
 'Personal portal must expose its integrated sessions as an array');
assert.match(portal,/aam-personal-sessions/,'Personal progress must use the seven-session storage key');
assert.match(portal,/\bsessions?\.length\b/i,
 'Personal progress must derive its total from the session collection');
assert.match(portal,/data-personal-progress/,'Personal portal must expose a session progress control');
assert.match(portal,/data-personal-progress-label/,'Personal portal must expose a session progress label');
assert.match(portal,/90\s*(?:minutes|דקות|-minute)/i,'Personal portal must label sessions as 90 minutes');

const journal=readFileSync('personal-course/student/en/ai-learning-journal.md','utf8');
assert.match(journal,/throughout all 7 integrated sessions\. Each session has one tab/i,
 'English journal home must describe one coherent tab for each integrated session');
assert.doesNotMatch(journal,/throughout all 12 lessons|Each lesson has (?:its )?own tab/i,
 'English journal home must not retain twelve-lesson wording');
const expectedJournalSessionTitles={
 English:[
  'Session 1: Decide What to Do Next',
  'Session 2: Buy With Confidence',
  'Session 3: Make a Shared Plan Work',
  'Session 4: Solve a Recurring Problem',
  'Session 5: Make a Space Work Better',
  'Session 6: Tell a True Visual Story',
  'Session 7: Build a Personal System',
 ],
 Hebrew:[
  'מפגש 1: להחליט מה הצעד הבא',
  'מפגש 2: לקנות בביטחון',
  'מפגש 3: לבנות תוכנית משותפת שעובדת',
  'מפגש 4: לפתור בעיה חוזרת',
  'מפגש 5: לשפר מרחב',
  'מפגש 6: לספר סיפור חזותי אמין',
  'מפגש 7: לבנות מערכת אישית',
 ],
};
for(const [locale,source] of Object.entries({
 English:journal,
 Hebrew:readFileSync('personal-course/student/he/ai-learning-journal.md','utf8'),
})){
 for(const title of expectedJournalSessionTitles[locale])assert.match(source,new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),
  `${locale} journal must use the current integrated session title: ${title}`);
}
assert.doesNotMatch(journal,/^# Session [1-7]: (?:Ask, Summarize, and Decide|Research, Buy, and Monitor|Plan Real Life Together|Build a Personal Tool|Design a Physical Project|Trustworthy Visual Story|Workflow, Portfolio, and Project)/m,
 'English journal must not retain legacy bundled-session titles');
const sessionSevenJournal=journal.match(/<!-- journal-tab: \{"id":"session-07"[^]*$/)?.[0] ?? '';
for(const term of [/personal workflow/i,/portfolio/i,/capstone|final personal project/i,/Claude Desktop/i,/permission/i,/OpenClaw/i,/bounded run record|account, payment, messaging/i]){
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

// These asserted ../../student/ai-learning-journal.md and ../../learning-journal.md until the journal
// moved under student/en and student/he in ff1c7c5, so the contract guaranteed two dead links in the
// guides. Assert the downloadable workbook the other session guides link, and resolve the path from
// each guide's own directory so a future move fails here instead of shipping.
for(const [locale,guidePath,linkText,file] of [
 ['English','personal-course/instructor/sessions/session-01-guide.md','learning journal','applied-ai-mastery-personal-journal-en.docx'],
 ['Hebrew','personal-course/he/instructor/sessions/session-01-guide.md','יומן הלמידה','applied-ai-mastery-personal-journal-he.docx'],
]){
 const guide=sessionOneGuides[locale];
 const link=new RegExp(`\\[${linkText}\\]\\(([^)]*${file.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})\\)`);
 const found=guide.match(link);
 assert.ok(found,`${locale} Session 1 guide must link the downloadable learning journal (${file})`);
 const resolved=new URL(found[1],new URL(`../${guidePath}`,import.meta.url));
 assert.ok(existsSync(resolved),`${locale} Session 1 guide journal link does not resolve: ${found[1]}`);
}
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
