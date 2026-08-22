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
 'trustworthy-visual-story',
 'design-physical-project',
 'build-personal-tool',
 'workflow-portfolio-project',
];

// Look a session's briefs up by slug rather than by number: the course order
// has changed before and these assertions should survive the next change.
const briefsForSlug=slug=>{
 const number=String(sessionSlugs.indexOf(slug)+1).padStart(2,'0');
 return {
  English:readFileSync(`personal-course/sessions/session-${number}-${slug}.md`,'utf8'),
  Hebrew:readFileSync(`personal-course/he/sessions/session-${number}-${slug}.md`,'utf8'),
 };
};
const numberForSlug=slug=>sessionSlugs.indexOf(slug)+1;

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

const appSession=briefsForSlug('build-personal-tool');
const appNumber=numberForSlug('build-personal-tool');
for(const [locale,brief] of Object.entries(appSession)){
 assert.match(brief,/Claude Artifacts/i,`${locale} Session ${appNumber} must use Claude Artifacts for the small web tool`);
 const normalAndEdge=locale==='English'
  ? /(?:normal (?:case|test)[\s\S]*edge (?:case|test)|edge (?:case|test)[\s\S]*normal (?:case|test))/i
  : /(?:מקרה רגיל[\s\S]*מקרה קצה|מקרה קצה[\s\S]*מקרה רגיל)/;
 assert.match(brief,normalAndEdge,
  `${locale} Session ${appNumber} must test both a normal case and an edge case`);
}

const capstone=briefsForSlug('workflow-portfolio-project');
// Session 7 became a mentored home capstone on 2026-08-20. Claude Desktop,
// Claude for Chrome and OpenClaw were that session's demonstration vehicles
// and do not carry over — learners build their own app now. Least privilege
// and the stop rule do carry, folded into the app deliverable.
// These assert concepts, not sentences, so wording can improve freely.
for(const [locale,brief] of Object.entries(capstone)){
 const en=locale==='English';
 assert.match(brief,en?/One Project, Every Skill/:/פרויקט אחד, כל המיומנויות/,
  `${locale} session 7 must carry its title`);
 assert.match(brief,en?/\*\*Time:\*\*\s*60 minutes/:/\*\*משך:\*\*\s*60 דקות/,
  `${locale} session 7 must state its 60-minute length`);
 assert.match(brief,en?/session 6|built in session 6/i:/מפגש 6/,
  `${locale} session 7 must review the app built in session 6`);
 assert.match(brief,en?/least[- ]privilege/i:/הרשאה מזערית/,
  `${locale} capstone must name least-privilege access`);
 assert.match(brief,en?/what it may touch/i:/למה מותר לו לגעת/,
  `${locale} capstone must require the app to state what it may touch`);
 assert.match(brief,en?/needs your approval|always needs your/i:/דורש את האישור שלכם/,
  `${locale} capstone must require the app to state what needs approval`);
 assert.match(brief,en?/what makes it stop|stop rule|stop condition/i:/מה עוצר אותו|כלל עצירה/,
  `${locale} capstone must require a stop rule on the app`);
 assert.match(brief,en?/propose your subject|subject.{0,20}confirmed/i:/מציעים נושא|הנושא אושר/,
  `${locale} capstone must gate work behind a confirmed subject`);
 assert.match(brief,en?/visible to the group|post .{0,30}group/i:/גלויה לקבוצה|מתפרסם בצ׳אט/,
  `${locale} capstone must say the work is shared with the group`);
 assert.match(brief,en?/skip that deliverable/i:/ותרו על התוצר/,
  `${locale} capstone must tell a learner who missed a session to skip that deliverable`);
 assert.doesNotMatch(brief,/Claude Desktop|OpenClaw|Claude for Chrome/i,
  `${locale} capstone must not retain session 7's demonstration tooling`);
}

assert.match(portal,/\bsession\w*\s*=\s*\[/i,
 'Personal portal must expose its integrated sessions as an array');
assert.match(portal,/aam-personal-sessions/,'Personal progress must use the session storage key');
assert.match(portal,/\bsessions?\.length\b/i,
 'Personal progress must derive its total from the session collection');
assert.match(portal,/data-personal-progress/,'Personal portal must expose a session progress control');
assert.match(portal,/data-personal-progress-label/,'Personal portal must expose a session progress label');
assert.match(portal,/90\s*(?:minutes|דקות|-minute)/i,'Personal portal must label sessions as 90 minutes');

const journal=readFileSync('personal-course/student/en/ai-learning-journal.md','utf8');
assert.match(journal,/six integrated sessions and the capstone/i,
 'English journal home must describe six sessions plus the capstone');
assert.doesNotMatch(journal,/throughout all 12 lessons|Each lesson has (?:its )?own tab|all 7 integrated sessions/i,
 'English journal home must not retain twelve-lesson or seven-session wording');
const expectedJournalSessionTitles={
 English:[
  'Session 1: Decide What to Do Next',
  'Session 2: Buy With Confidence',
  'Session 3: Make a Shared Plan Work',
  'Session 4: From Prompt to Presentation',
  'Session 5: Make a Space Work Better',
  'Session 6: Solve a Recurring Problem',
  'Session 7: One Project, Every Skill',
 ],
 Hebrew:[
  'מפגש 1: להחליט מה הצעד הבא',
  'מפגש 2: לקנות בביטחון',
  'מפגש 3: לבנות תוכנית משותפת שעובדת',
  'מפגש 4: מהנחיה למצגת',
  'מפגש 5: לשפר מרחב',
  'מפגש 6: לפתור בעיה חוזרת',
  'מפגש 7: פרויקט אחד, כל המיומנויות',
 ],
};
for(const [locale,source] of Object.entries({
 English:journal,
 Hebrew:readFileSync('personal-course/student/he/ai-learning-journal.md','utf8'),
})){
 for(const title of expectedJournalSessionTitles[locale])assert.match(source,new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),
  `${locale} journal must use the current tab title: ${title}`);
}
assert.doesNotMatch(journal,/^# Session [1-7]: (?:Ask, Summarize, and Decide|Research, Buy, and Monitor|Plan Real Life Together|Build a Personal Tool|Design a Physical Project|Trustworthy Visual Story|Workflow, Portfolio, and Project)/m,
 'English journal must not retain legacy bundled-session titles');
// The capstone replaced session 7's class on 2026-08-20. Its tab logs a
// subject, five deliverables and the app's boundary — not a workflow and
// portfolio, and not the Claude Desktop / OpenClaw demonstration tooling.
const capstoneJournal=journal.match(/<!-- journal-tab: \{"id":"session-07"[^]*$/)?.[0] ?? '';
for(const term of [/capstone/i,/deliverable log/i,/my end date/i,/mentor confirmed/i,/what it may touch/i,/needs my approval/i,/what makes it stop/i,/post(?:ed)? .{0,20}group|to the group/i]){
 assert.match(capstoneJournal,term,`English capstone journal must include ${term}`);
}
for(const term of [/Claude Desktop/i,/OpenClaw/i,/Claude for Chrome/i,/personal workflow/i]){
 assert.doesNotMatch(capstoneJournal,term,`English capstone journal must not retain session 7 framing: ${term}`);
}
// Predates the capstone: this tab was once an application package. The guard
// is cheap and still guards a real historical regression, so it stays.
for(const term of [/application package/i,/audience-specific application/i,/target role or audience/i,/CV revised/i,/application is logged/i]){
 assert.doesNotMatch(capstoneJournal,term,`English capstone journal must not retain application-package framing: ${term}`);
}

// The syllabuses are linked from the portal as "Syllabus" and are what a
// learner or instructor opens to see the course shape. Nothing checked them,
// so they drifted for two renames and a reorder — still listing the original
// titles with the app at 4 and the visual session at 6. They carry the
// canonical titles now, in order, and must keep doing so.
for(const [locale,path,titles] of [
 ['English','personal-course/README.md',expectedJournalSessionTitles.English],
 ['Hebrew','personal-course/he/README.md',expectedJournalSessionTitles.Hebrew],
]){
 const syllabus=readFileSync(path,'utf8');
 const positions=titles.map(full=>{
  // The syllabus lists bare titles; the journal list carries a "Session N: " prefix.
  const bare=full.replace(/^(?:Session|מפגש|Capstone|פרויקט סיום)[^:]*:\s*/,'');
  const at=syllabus.indexOf(bare);
  assert.notEqual(at,-1,`${locale} syllabus (${path}) is missing the current session title: ${bare}`);
  return at;
 });
 for(let i=1;i<positions.length;i+=1)assert.ok(positions[i]>positions[i-1],
  `${locale} syllabus lists sessions out of order — "${titles[i]}" appears before "${titles[i-1]}"`);
 // Scope this to the section that describes session length, or it passes on
 // any stray "60 minutes" elsewhere in the prose.
 const formatSection=syllabus.match(locale==='English'?/## Session format[^]*?(?=\n## )/:/## מבנה המסלול[^]*?(?=\n## )/)?.[0] ?? '';
 assert.ok(formatSection,`${locale} syllabus has no session-format section to state durations in`);
 assert.match(formatSection,/\b90\b/,`${locale} syllabus must state the 90-minute length of sessions 1-6`);
 assert.match(formatSection,/\b60\b/,`${locale} syllabus must state session 7's shorter 60-minute length`);
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
