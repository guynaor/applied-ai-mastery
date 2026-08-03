# Personal Course Review Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve the reviewer’s personal-course content and navigation findings, add a copyable bilingual learning-journal workflow, and make Firebase Hosting the repository’s only documented deployment path.

**Architecture:** Keep the course static and dependency-free. Add focused Node contract scripts for each change area, extend the shared Markdown viewer with explicit course context and an opt-in journal copy command, and keep shared learning content canonical rather than duplicated. Deployment remains a direct repository-root Firebase Hosting release with no build step.

**Tech Stack:** Static HTML, CSS, browser JavaScript, Markdown content, Node.js assertion scripts, Firebase Hosting CLI, Chromium via `agent-browser`.

---

## File Map

**Create:**

- `scripts/check-personal-content-review.mjs` — reviewer wording, punctuation, Google Classroom, and AI Geography answers.
- `scripts/check-personal-document-review.mjs` — journal copy hooks and origin-context routing contract.
- `scripts/check-firebase-deployment-docs.mjs` — Firebase-only documentation and obsolete-config contract.

**Modify:**

- `personal-course/instructor/real-life-mission-review-guide.md` — corrected English submission guidance and list punctuation.
- `personal-course/he/instructor-review-guide.md` — matching Hebrew channel and punctuation updates.
- `materials/shared/AF-REF-001-ai-geography.md` — English quick-check answers.
- `personal-course/he/ai-geography.md` — personal Hebrew quick-check answers.
- `professional-course/he/ai-geography.md` — professional Hebrew quick-check answers.
- `document.html` — hidden journal-copy command.
- `site/assets/js/markdown-viewer.js` — explicit course context, localized copy behavior, and return navigation.
- `site/assets/css/course.css` — document command styling and mobile wrapping.
- `DEPLOYMENT.md` — detailed Firebase-only release guide.
- `README.md` — Firebase-only current deployment statement.
- `BETA_READINESS.md` — remove active Vercel readiness language.
- `ROADMAP.md` — replace the active Vercel deployment item with Firebase Hosting.

**Delete:**

- `vercel.json` — unsupported deployment configuration.

## Task 1: Instructor Guidance and AI Geography Answers

**Files:**

- Create: `scripts/check-personal-content-review.mjs`
- Modify: `personal-course/instructor/real-life-mission-review-guide.md`
- Modify: `personal-course/he/instructor-review-guide.md`
- Modify: `materials/shared/AF-REF-001-ai-geography.md`
- Modify: `personal-course/he/ai-geography.md`
- Modify: `professional-course/he/ai-geography.md`

- [ ] **Step 1: Write the failing content contract**

Create `scripts/check-personal-content-review.mjs`:

```js
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=path=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const englishGuide=read('personal-course/instructor/real-life-mission-review-guide.md');
const hebrewGuide=read('personal-course/he/instructor-review-guide.md');

assert.match(englishGuide,/Agree on one external channel before the course begins/);
assert.match(englishGuide,/- Google Classroom\n/);
assert.doesNotMatch(englishGuide,/^- .*;$/m,'English guide has a bullet ending in a semicolon');
assert.match(hebrewGuide,/Google Classroom/);
assert.doesNotMatch(hebrewGuide,/^- .*;$/m,'Hebrew guide has a bullet ending in a semicolon');

for(const path of [
  'materials/shared/AF-REF-001-ai-geography.md',
  'personal-course/he/ai-geography.md',
  'professional-course/he/ai-geography.md',
]){
  const content=read(path);
  assert.match(content,/## (?:Check your answers|תשובות לבדיקה)/,`${path} has no answer section`);
  const answerSection=content.split(/## (?:Check your answers|תשובות לבדיקה)/)[1].split('\n## ')[0];
  assert.equal((answerSection.match(/^\d+\./gm)||[]).length,4,`${path} must contain four answers`);
}

console.log('Personal course reviewer content contract passed');
```

- [ ] **Step 2: Run the content contract and verify RED**

Run:

```bash
node scripts/check-personal-content-review.mjs
```

Expected: FAIL on the missing phrase `Agree on one external channel before the course begins`.

- [ ] **Step 3: Correct the instructor guides**

In `personal-course/instructor/real-life-mission-review-guide.md`, replace the submission introduction and channel list with:

```markdown
Agree on one external channel before the course begins, such as:

- a shared Google Drive folder
- Google Classroom
- email
- a private GitHub repository
- a shared document
- an existing learning platform
```

Remove the final semicolon from every other fragment-style bullet in that file. Keep periods on complete sentences.

In `personal-course/he/instructor-review-guide.md`, replace the first paragraph under `## לפני תחילת הקורס` with:

```markdown
בחרו ערוץ הגשה חיצוני אחד: תיקיית Google Drive, ‏Google Classroom, דוא״ל, מסמך משותף, GitHub פרטי או מערכת הלימוד הקיימת. בקשו שמות קבצים עקביים:
```

Remove final semicolons from the fragment list under `## רמות המשימה` if present. Do not change semicolons inside prose sentences.

- [ ] **Step 4: Add the English quick-check answers**

Immediately after the four questions in `materials/shared/AF-REF-001-ai-geography.md`, add:

```markdown
## Check your answers

1. ChatGPT is primarily an application, but the name is also used informally for the models available through it. Check which model and features are active when the distinction matters.
2. An agent can work toward a goal over several steps and use permitted tools to inspect or change external systems. A plain text-only chat only returns text.
3. A saved presentation is an artifact. A skill is a reusable workflow for producing or handling a class of outputs.
4. Links make verification possible, but a source can be weak, outdated, misread, or unable to support the exact claim. Open the source and check the claim in context.
```

- [ ] **Step 5: Add the Hebrew quick-check answers**

Immediately after the four questions in both `personal-course/he/ai-geography.md` and `professional-course/he/ai-geography.md`, add:

```markdown
## תשובות לבדיקה

1. ChatGPT הוא בעיקר אפליקציה, אך בשימוש יומיומי השם מתייחס לפעמים גם למודלים הזמינים דרכה. כשלהבדל יש משמעות, בדקו איזה מודל ואילו יכולות פעילים.
2. סוכן יכול להתקדם לעבר מטרה בכמה שלבים ולהשתמש בכלים שהותרו לו כדי לבדוק או לשנות מערכות חיצוניות. צ׳אט טקסט בלבד מחזיר טקסט.
3. מצגת שנשמרה היא artifact. ‏Skill הוא תהליך עבודה לשימוש חוזר שמסביר איך ליצור או לטפל בסוג של תוצרים.
4. קישורים מאפשרים אימות, אבל מקור עלול להיות חלש, מיושן, מפורש לא נכון או לא לתמוך בטענה המדויקת. פתחו את המקור ובדקו את הטענה בהקשר שלה.
```

- [ ] **Step 6: Run the content contract and verify GREEN**

Run:

```bash
node scripts/check-personal-content-review.mjs
```

Expected: `Personal course reviewer content contract passed`.

- [ ] **Step 7: Commit the content fixes**

```bash
git add scripts/check-personal-content-review.mjs personal-course/instructor/real-life-mission-review-guide.md personal-course/he/instructor-review-guide.md materials/shared/AF-REF-001-ai-geography.md personal-course/he/ai-geography.md professional-course/he/ai-geography.md
git commit -m "content: address personal course review feedback"
```

## Task 2: Personal Document Context and Journal Copy Command

**Files:**

- Create: `scripts/check-personal-document-review.mjs`
- Modify: `document.html`
- Modify: `site/assets/js/markdown-viewer.js`
- Modify: `site/assets/css/course.css`

- [ ] **Step 1: Write the failing viewer contract**

Create `scripts/check-personal-document-review.mjs`:

```js
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=path=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const html=read('document.html');
const viewer=read('site/assets/js/markdown-viewer.js');
const css=read('site/assets/css/course.css');

assert.match(html,/data-copy-journal-template/);
assert.match(html,/hidden/);
assert.match(viewer,/params\.get\('context'\)/);
assert.match(viewer,/context=\$\{encodeURIComponent\(documentContext\)\}/);
assert.match(viewer,/personal-course\/student\/ai-learning-journal\.md/);
assert.match(viewer,/personal-course\/he\/learning-journal\.md/);
assert.match(viewer,/navigator\.clipboard\.writeText/);
assert.match(viewer,/Copy journal template/);
assert.match(viewer,/העתקת תבנית היומן/);
assert.match(css,/\.document-copy-button/);

console.log('Personal document context and journal-copy contract passed');
```

- [ ] **Step 2: Run the viewer contract and verify RED**

Run:

```bash
node scripts/check-personal-document-review.mjs
```

Expected: FAIL because `document.html` has no `data-copy-journal-template` hook.

- [ ] **Step 3: Add the hidden document command**

In `document.html`, add this button as the last item in the document navigation:

```html
<button class="document-copy-button" type="button" data-copy-journal-template hidden>Copy journal template</button>
```

Keep the existing back and source links unchanged.

- [ ] **Step 4: Add explicit document context**

At the top of `site/assets/js/markdown-viewer.js`, after reading `source`, add:

```js
const requestedContext=params.get('context');
const inferredContext=source.startsWith('personal-course/')?'personal':'professional';
const documentContext=['personal','professional'].includes(requestedContext)?requestedContext:inferredContext;
```

Replace the current personal/professional source classification with:

```js
const personalContext=documentContext==='personal';
const personalHebrewSource=source.startsWith('personal-course/he/');
const professionalHebrewSource=source.startsWith('professional-course/he/');
const hebrewSource=personalHebrewSource||professionalHebrewSource;
const personalHebrewPreference=localStorage.getItem('aam-personal-language')==='he';
const professionalHebrewPreference=localStorage.getItem('aam-professional-language')==='he';
const hebrewNavigation=hebrewSource||(personalContext?personalHebrewPreference:professionalHebrewPreference);
```

In the back-link block, use `personalContext` instead of `personalSource`:

```js
if(personalContext){
  backLink.href=hebrewNavigation?'personal.html?lang=he#lessons':'personal.html#lessons';
  backLink.textContent=hebrewNavigation?'חזרה לשיעורים האישיים':'Back to personal lessons';
}else{
  backLink.href=hebrewNavigation?'professional.html?lang=he#missions':'professional.html?lang=en#missions';
  backLink.textContent=hebrewNavigation?'חזרה למסלול המקצועי':'Back to professional missions';
}
```

Update the Markdown branch in `routeLink` so context survives shared-document navigation:

```js
if(resolved&&resolved.toLowerCase().endsWith('.md')){
  return `document.html?src=${encodeURIComponent(resolved)}&context=${encodeURIComponent(documentContext)}`;
}
```

- [ ] **Step 5: Add localized journal copy behavior**

Near the viewer’s other element lookups, add:

```js
const copyJournalButton=document.querySelector('[data-copy-journal-template]');
const journalSources=new Set([
  'personal-course/student/ai-learning-journal.md',
  'personal-course/he/learning-journal.md',
]);
const journalCopy={
  en:{idle:'Copy journal template',copied:'Journal template copied',failed:'Copy failed'},
  he:{idle:'העתקת תבנית היומן',copied:'תבנית היומן הועתקה',failed:'ההעתקה נכשלה'},
};
```

After the rendered article becomes visible inside `load()`, enable the button only for journal sources:

```js
if(copyJournalButton&&journalSources.has(source)){
  const language=personalHebrewSource?'he':'en';
  const labels=journalCopy[language];
  copyJournalButton.textContent=labels.idle;
  copyJournalButton.hidden=false;
  copyJournalButton.onclick=async()=>{
    try{
      await navigator.clipboard.writeText(article.innerText.trim());
      copyJournalButton.textContent=labels.copied;
    }catch{
      copyJournalButton.textContent=labels.failed;
    }
    window.setTimeout(()=>{copyJournalButton.textContent=labels.idle;},1800);
  };
}
```

- [ ] **Step 6: Style the command without adding a new visual system**

In `site/assets/css/course.css`, add:

```css
.document-copy-button{padding:0;border:0;background:transparent;color:var(--primary);font:inherit;font-weight:700;cursor:pointer}
.document-copy-button:hover{text-decoration:underline}
.document-copy-button:focus-visible{outline:3px solid var(--accent);outline-offset:4px}
```

The existing flex-wrapping header handles mobile placement; do not add a fixed width.

- [ ] **Step 7: Run viewer checks and verify GREEN**

Run:

```bash
node scripts/check-personal-document-review.mjs
node --check site/assets/js/markdown-viewer.js
node scripts/check-professional-i18n.mjs
```

Expected: both contracts pass and the syntax check exits 0.

- [ ] **Step 8: Commit the viewer behavior**

```bash
git add scripts/check-personal-document-review.mjs document.html site/assets/js/markdown-viewer.js site/assets/css/course.css
git commit -m "fix: preserve personal context in shared documents"
```

## Task 3: Firebase-Only Deployment Documentation

**Files:**

- Create: `scripts/check-firebase-deployment-docs.mjs`
- Modify: `DEPLOYMENT.md`
- Modify: `README.md`
- Modify: `BETA_READINESS.md`
- Modify: `ROADMAP.md`
- Delete: `vercel.json`

- [ ] **Step 1: Write the failing deployment contract**

Create `scripts/check-firebase-deployment-docs.mjs`:

```js
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const read=path=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const deployment=read('DEPLOYMENT.md');
const readme=read('README.md');
const readiness=read('BETA_READINESS.md');
const roadmap=read('ROADMAP.md');

assert.doesNotMatch(deployment,/Vercel|Netlify|GitHub Pages/i);
assert.doesNotMatch(readme,/Vercel|Netlify|GitHub Pages/i);
assert.doesNotMatch(readiness,/Vercel/i);
assert.doesNotMatch(roadmap,/Vercel/i);
assert.equal(existsSync(new URL('../vercel.json',import.meta.url)),false,'vercel.json must be removed');

for(const required of [
  'firebase login',
  'firebase login:list',
  'firebase projects:list',
  'firebase emulators:start --only hosting',
  'firebase hosting:channel:deploy',
  'firebase deploy --only hosting --project applied-ai-mastery',
  'Release history',
])assert.ok(deployment.includes(required),`DEPLOYMENT.md is missing: ${required}`);

assert.match(deployment,/no build step/i);
assert.match(deployment,/Student mode.*not access control/is);

console.log('Firebase-only deployment documentation contract passed');
```

- [ ] **Step 2: Run the deployment contract and verify RED**

Run:

```bash
node scripts/check-firebase-deployment-docs.mjs
```

Expected: FAIL because `DEPLOYMENT.md` still recommends Vercel.

- [ ] **Step 3: Rewrite `DEPLOYMENT.md` as the Firebase runbook**

Replace the file with these sections and exact commands:

```markdown
# Firebase Hosting Deployment Guide

Applied AI Mastery is deployed only through Firebase Hosting. It is a static site with no package installation, build step, server, database, or environment variables.

## Production target

- Firebase project and Hosting site: `applied-ai-mastery`
- Primary URL: `https://applied-ai-mastery.web.app`
- Alternate Firebase URL: `https://applied-ai-mastery.firebaseapp.com`
- Deployable branch: `main`

The committed `.firebaserc` maps the default project to `applied-ai-mastery`. Production commands below also pass `--project applied-ai-mastery` explicitly so a developer’s previously active Firebase project cannot receive this site accidentally.

## 1. Prerequisites

Install Node.js 18 or later and confirm access to the `applied-ai-mastery` Firebase project.

```bash
node --version
npm install -g firebase-tools
firebase --version
```

You can replace `firebase` with `npx firebase-tools` in every command if you do not want a global installation.

## 2. Authenticate and verify project access

```bash
firebase login
firebase login:list
firebase projects:list
firebase use
```

The project list must contain `applied-ai-mastery`, and `firebase use` must show it as the default project. Stop if either check points elsewhere.

## 3. Review the Hosting configuration

`firebase.json` publishes the repository root (`.`). Its ignore list excludes Firebase configuration, dotfiles, and `node_modules`. Review that list before adding private, generated, or backend files.

This repository has no build step. Do not introduce an output-directory or framework build command for deployment.

## 4. Test locally

From the repository root:

```bash
firebase emulators:start --only hosting --project applied-ai-mastery
```

Open the URL printed by the emulator. Test the course selector, both tracks, both languages, Markdown documents, downloadable artifacts, and browser-local progress.

## 5. Optional review channel

For a shareable temporary review URL:

```bash
firebase hosting:channel:deploy review-YYYYMMDD --project applied-ai-mastery
```

Use a short, lowercase channel identifier. Share the returned preview URL, verify it, and do not treat a preview channel as production.

## 6. Prepare the production branch

```bash
git checkout main
git pull --ff-only origin main
git status --short
```

`git status --short` must print nothing. Deploy only reviewed commits already merged into `main`.

## 7. Deploy Hosting

```bash
firebase deploy --only hosting --project applied-ai-mastery
```

Keep `--only hosting`. Future Functions, database rules, or other backend resources must be reviewed and deployed explicitly; do not widen this command unintentionally.

## 8. Verify production

- Open the home page on desktop and mobile.
- Enter the professional and personal tracks in English and Hebrew.
- Switch Student and Instructor modes.
- Open translated Markdown and canonical English artifacts.
- Confirm personal shared documents return to the personal course.
- Mark progress, refresh, and confirm it persists.
- Check capstone, company, learning-journal, CSV, and OpenSCAD links.
- Check the browser console for missing files or JavaScript errors.

## 9. Roll back

In Firebase Console, open **Hosting**, locate **Release history**, open the menu for the last known good release, and choose **Roll back**. Verify both Firebase URLs after rollback.

## Instructor-content warning

Student mode hides instructor files in the interface only; it is not access control. Answer keys remain publicly accessible in the deployed files. Use a separate student-only repository or deployment before requiring answer-key confidentiality.
```

- [ ] **Step 4: Align active repository documentation**

In `README.md`:

- replace “static-hosting configuration for Vercel and Firebase” with “Firebase Hosting configuration”;
- replace the multi-platform deployment sentence with: `See [DEPLOYMENT.md](DEPLOYMENT.md). Production is deployed only through Firebase Hosting.`

In `BETA_READINESS.md`, remove the Vercel configuration checkbox and keep the Firebase Hosting configuration item.

In `ROADMAP.md`, replace `Establish Vercel deployment from main` with `Maintain Firebase Hosting deployment from main`.

Delete `vercel.json` with `apply_patch`.

- [ ] **Step 5: Run the deployment contract and verify GREEN**

Run:

```bash
node scripts/check-firebase-deployment-docs.mjs
```

Expected: `Firebase-only deployment documentation contract passed`.

- [ ] **Step 6: Commit Firebase-only documentation**

```bash
git add scripts/check-firebase-deployment-docs.mjs DEPLOYMENT.md README.md BETA_READINESS.md ROADMAP.md vercel.json
git commit -m "docs: standardize deployment on Firebase Hosting"
```

## Task 4: Browser and Release Verification

**Files:**

- Verify: all modified files

- [ ] **Step 1: Run all static contracts and syntax checks**

Run each command and require exit 0:

```bash
node scripts/check-personal-content-review.mjs
node scripts/check-personal-document-review.mjs
node scripts/check-firebase-deployment-docs.mjs
node scripts/check-professional-i18n.mjs
node scripts/validate-professional-localization.mjs
node --check site/assets/js/markdown-viewer.js
node --check site/assets/js/personal-course.js
git diff --check
```

Expected: all contracts pass. The professional validator may print its existing non-blocking numeric-parity review notice.

- [ ] **Step 2: Start a local static server**

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Keep the session running only for browser verification.

- [ ] **Step 3: Verify personal context through AI Geography**

Open:

```text
http://127.0.0.1:4173/document.html?src=personal-course%2Fmaterials%2Flesson-01-better-requests%2Fstudent%2Factivity.md
```

In Chromium:

1. Set `aam-personal-language` to `en` in local storage and reload.
2. Follow “AI Geography — A 10-Minute Map.”
3. Assert the new URL contains `context=personal`.
4. Assert the shared document is `lang=en`, `dir=ltr`.
5. Assert `[data-back-link]` points to `personal.html#lessons` and reads “Back to personal lessons.”
6. Assert the page contains the four check answers.

- [ ] **Step 4: Verify both journal copy commands**

Open the English journal, click `[data-copy-journal-template]`, and assert:

- the button begins as “Copy journal template”;
- the button changes to “Journal template copied”;
- `navigator.clipboard.readText()` includes `My AI Learning Journal` and `Entry template`.

Repeat with `personal-course/he/learning-journal.md` and assert the Hebrew label and copied Hebrew title.

- [ ] **Step 5: Verify desktop and mobile presentation**

Capture screenshots at `1440x900` and `390x844` for:

- the shared AI Geography document with personal return navigation;
- the English journal with the copy command;
- the Hebrew journal with the copy command.

Assert `document.documentElement.scrollWidth === document.documentElement.clientWidth`, inspect screenshots for overlap, and run browser error and WCAG A/AA scans.

- [ ] **Step 6: Stop browser and server sessions**

Close `agent-browser` and interrupt the static-server process. Do not leave either session running.

- [ ] **Step 7: Confirm branch state**

Run:

```bash
git status --short --branch
git log --oneline main..HEAD
```

Expected: branch `fix/personal-course-review-feedback`, no uncommitted files, and the design plus three implementation commits ahead of `main`.
