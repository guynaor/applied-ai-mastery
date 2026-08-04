# Course Journals and Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Address the review feedback, create four language-specific learning-journal templates in Google Docs, and connect each course language to the correct public-view template.

**Architecture:** Markdown files remain the canonical journal sources in the repository. A shared document viewer owns return navigation, while each course script owns its English and Hebrew external journal URLs. Google Docs creation is a supervised external step using an isolated Chrome profile, after which the resulting URLs are committed into the static site.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Markdown, Node.js contract scripts, Firebase Hosting, Playwright-backed Chrome automation.

---

## File Map

- Modify `personal-course/student/ai-learning-journal.md`: canonical English personal journal.
- Modify `personal-course/he/learning-journal.md`: canonical Hebrew personal journal.
- Create `professional-course/student/ai-learning-journal.md`: canonical English professional journal.
- Create `professional-course/he/student/ai-learning-journal.md`: canonical Hebrew professional journal.
- Create `scripts/check-learning-journal-sources.mjs`: journal-content contract.
- Create `scripts/check-personal-course-punctuation.mjs`: personal-course line-ending punctuation contract.
- Modify `document.html`: remove source/copy controls and add bottom return navigation.
- Modify `site/assets/js/markdown-viewer.js`: synchronize header and bottom return links; remove local journal copy behavior.
- Modify `site/assets/css/course.css`: style bottom return navigation without adding a card.
- Modify `scripts/check-personal-document-review.mjs`: replace clipboard assertions with navigation assertions.
- Modify `personal.html` and `site/assets/js/personal-course.js`: language-specific personal journal URLs and copy instructions.
- Modify `professional.html` and `site/assets/js/course.js`: add language-specific professional journal access and copy instructions.
- Create `scripts/check-course-journal-links.mjs`: external-link mapping and safe-target contract.
- Modify `DEPLOYMENT.md`: replace obsolete clipboard smoke check with four external-template checks.

### Task 1: Canonical Journal Sources

**Files:**
- Create: `scripts/check-learning-journal-sources.mjs`
- Modify: `personal-course/student/ai-learning-journal.md`
- Modify: `personal-course/he/learning-journal.md`
- Create: `professional-course/student/ai-learning-journal.md`
- Create: `professional-course/he/student/ai-learning-journal.md`

- [ ] **Step 1: Write the failing journal-source contract**

Create a Node contract that loads all four files and asserts distinct English/Hebrew titles, a reusable entry template, privacy guidance, verification and human-judgment prompts, an end-of-course reflection, and professional prompts for missions 1 through 7 plus the capstone.

```js
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=path=>readFileSync(path,'utf8');
const personalEn=read('personal-course/student/ai-learning-journal.md');
const personalHe=read('personal-course/he/learning-journal.md');
const professionalEn=read('professional-course/student/ai-learning-journal.md');
const professionalHe=read('professional-course/he/student/ai-learning-journal.md');

assert.match(personalEn,/^# My AI Learning Journal/m);
assert.match(personalHe,/^# יומן הלמידה האישי שלי ב-AI/m);
assert.match(professionalEn,/^# My Applied AI Professional Journal/m);
assert.match(professionalHe,/^# יומן הלמידה המקצועי שלי ב-AI יישומי/m);

for(const source of [personalEn,personalHe,professionalEn,professionalHe]){
  assert.match(source,/verification|אימות/i);
  assert.match(source,/human|אנושי/i);
  assert.match(source,/private|sensitive|פרטי|רגיש/i);
}

for(let mission=1;mission<=7;mission+=1){
  assert.match(professionalEn,new RegExp(`Mission ${mission}`));
  assert.match(professionalHe,new RegExp(`משימה ${mission}`));
}
assert.match(professionalEn,/Capstone/);
assert.match(professionalHe,/פרויקט מסכם/);

console.log('Learning journal source contract passed');
```

- [ ] **Step 2: Run the contract and confirm it fails**

Run: `node scripts/check-learning-journal-sources.mjs`

Expected: failure because the professional journal files do not exist.

- [ ] **Step 3: Write the four journal sources**

Use this personal entry structure in both languages:

```markdown
## Entry template

### Lesson and date
### This week's biggest AI win
### Prompt worth saving
### What made the prompt work?
### This week's most useful AI mistake
### How I checked it
### Something I learned about myself
### What I would do differently next time
### One future use or automation idea
### Evidence saved
```

Use this professional repeated entry structure in both languages:

```markdown
## Mission entry template

### Mission, role, and date
### Work problem and required decision
### Evidence used
### Prompt or workflow worth reusing
### Where AI failed or remained uncertain
### Verification performed and result
### Human decision or approval point
### Artifact and evidence saved
### Transfer to real work
### Capstone connection
```

Add a `Mission-specific reflection prompts` section covering prompting/model selection, deep research, spreadsheet engineering, technical communication, operations planning, bounded agents, parametric CAD, and the AquaNode Mini capstone. Add final-course reflection and privacy guidance to every document.

- [ ] **Step 4: Run the journal-source contract**

Run: `node scripts/check-learning-journal-sources.mjs`

Expected: `Learning journal source contract passed`.

- [ ] **Step 5: Commit the journal sources**

```bash
git add scripts/check-learning-journal-sources.mjs personal-course/student/ai-learning-journal.md personal-course/he/learning-journal.md professional-course/student/ai-learning-journal.md professional-course/he/student/ai-learning-journal.md
git commit -m "content: add bilingual course journal templates"
```

### Task 2: Personal-Course Punctuation Cleanup

**Files:**
- Create: `scripts/check-personal-course-punctuation.mjs`
- Modify: every `*.md` file under `personal-course/` with a trailing semicolon

- [ ] **Step 1: Write the failing punctuation contract**

```js
import assert from 'node:assert/strict';
import {readdirSync,readFileSync} from 'node:fs';
import {join} from 'node:path';

const markdownFiles=directory=>readdirSync(directory,{withFileTypes:true}).flatMap(entry=>{
  const path=join(directory,entry.name);
  return entry.isDirectory()?markdownFiles(path):entry.name.endsWith('.md')?[path]:[];
});

const violations=[];
for(const path of markdownFiles('personal-course')){
  readFileSync(path,'utf8').split(/\r?\n/).forEach((line,index)=>{
    if(/;\s*$/.test(line))violations.push(`${path}:${index+1}`);
  });
}
assert.deepEqual(violations,[],`Trailing semicolons: ${violations.join(', ')}`);
console.log('Personal-course punctuation contract passed');
```

- [ ] **Step 2: Run the contract and confirm it fails**

Run: `node scripts/check-personal-course-punctuation.mjs`

Expected: failure listing personal-course Markdown lines ending in semicolons.

- [ ] **Step 3: Remove only line-ending semicolons**

Apply the mechanical replacement `;([ \t]*)$` -> `$1` to every personal-course Markdown file. Do not alter semicolons inside sentences, code, or non-Markdown assets.

- [ ] **Step 4: Run punctuation and content contracts**

Run:

```bash
node scripts/check-personal-course-punctuation.mjs
node scripts/check-personal-content-review.mjs
node scripts/check-learning-journal-sources.mjs
```

Expected: all three contracts pass.

- [ ] **Step 5: Commit the punctuation cleanup**

```bash
git add personal-course scripts/check-personal-course-punctuation.mjs
git commit -m "content: remove personal course trailing semicolons"
```

### Task 3: Shared Document Return Navigation

**Files:**
- Modify: `document.html`
- Modify: `site/assets/js/markdown-viewer.js`
- Modify: `site/assets/css/course.css`
- Modify: `scripts/check-personal-document-review.mjs`

- [ ] **Step 1: Replace clipboard assertions with failing navigation assertions**

The contract must assert that `document.html` contains two `[data-back-link]` anchors, contains one hidden `[data-document-bottom-nav]`, and contains neither `[data-source-link]` nor `[data-copy-journal-template]`. It must also assert that the viewer uses `querySelectorAll('[data-back-link]')`, reveals the bottom navigation only after successful rendering, and contains no `navigator.clipboard` or `journalCopy` logic.

```js
assert.equal((html.match(/data-back-link/g)||[]).length,2);
assert.match(html,/data-document-bottom-nav[^>]*hidden/);
assert.doesNotMatch(html,/data-source-link|data-copy-journal-template/);
assert.match(viewer,/querySelectorAll\('\[data-back-link\]'\)/);
assert.match(viewer,/bottomNavigation\.hidden=false/);
assert.doesNotMatch(viewer,/navigator\.clipboard|journalCopy/);
```

- [ ] **Step 2: Run the contract and confirm it fails**

Run: `node scripts/check-personal-document-review.mjs`

Expected: failure because source/copy controls remain and bottom navigation does not exist.

- [ ] **Step 3: Implement the shared navigation**

Keep one back anchor in the header, remove the source and copy elements, and insert this after `main`:

```html
<nav class="document-return" data-document-bottom-nav aria-label="Document navigation" hidden>
  <a class="button" data-back-link href="professional.html#missions">Back to professional missions</a>
</nav>
```

In `markdown-viewer.js`, replace the single back-link reference with:

```js
const backLinks=[...document.querySelectorAll('[data-back-link]')];
const bottomNavigation=document.querySelector('[data-document-bottom-nav]');

const backTarget=personalContext
  ? (hebrewNavigation?'personal.html?lang=he#lessons':'personal.html#lessons')
  : (hebrewNavigation?'professional.html?lang=he#missions':'professional.html?lang=en#missions');
const backLabel=personalContext
  ? (hebrewNavigation?'חזרה לשיעורים האישיים':'Back to personal lessons')
  : (hebrewNavigation?'חזרה למסלול המקצועי':'Back to professional missions');
backLinks.forEach(link=>{link.href=backTarget;link.textContent=backLabel;});
```

After `article.hidden=false`, reveal the bottom navigation with `if(bottomNavigation)bottomNavigation.hidden=false;`. Remove all local journal clipboard state and handlers.

Add restrained layout CSS:

```css
.document-return{display:flex;margin-top:24px}
.document-return[hidden]{display:none}
```

- [ ] **Step 4: Run viewer contracts and syntax checks**

Run:

```bash
node scripts/check-personal-document-review.mjs
node --check site/assets/js/markdown-viewer.js
node scripts/check-professional-i18n.mjs
```

Expected: all commands pass.

- [ ] **Step 5: Commit the viewer change**

```bash
git add document.html site/assets/js/markdown-viewer.js site/assets/css/course.css scripts/check-personal-document-review.mjs
git commit -m "fix: add end-of-document return navigation"
```

### Task 4: Create and Share Four Google Docs

**Files:**
- Read: the four Markdown journal sources
- Temporary only: `/tmp/applied-ai-mastery-google-docs-profile/`
- Temporary only: rendered journal HTML under `/tmp/`

- [ ] **Step 1: Render the four Markdown sources for rich-text transfer**

Start a local static server and open each journal through `document.html` so the existing renderer produces headings, lists, and text direction correctly.

Run: `python3 -m http.server 4173`

Expected: `http://127.0.0.1:4173/personal.html` responds with HTTP 200.

- [ ] **Step 2: Launch isolated headed Chrome**

Launch a Playwright-backed Chrome session with a dedicated profile at `/tmp/applied-ai-mastery-google-docs-profile`, navigate to Google Docs, and pause. Ask the user to complete Google sign-in in that window. Do not inspect, print, or persist credentials outside the isolated browser profile.

- [ ] **Step 3: Verify sign-in before changing Drive**

After the user confirms login, verify the browser can open `https://docs.new` without returning to the sign-in page. Stop and ask the user to finish authentication if it cannot.

- [ ] **Step 4: Create four formatted documents**

Create documents with these titles:

```text
Applied AI Mastery - Personal Learning Journal Template (English)
Applied AI Mastery - Personal Learning Journal Template (Hebrew)
Applied AI Mastery - Professional Learning Journal Template (English)
Applied AI Mastery - Professional Learning Journal Template (Hebrew)
```

Copy the rendered journal article into each new Google Doc. Verify representative H1, H2, H3, list formatting, and right-to-left direction in both Hebrew documents.

- [ ] **Step 5: Set template permissions**

For each document, open Share, set **General access** to **Anyone with the link**, keep the role as **Viewer**, and save. Reopen Share to verify the saved access state.

- [ ] **Step 6: Record and verify the four URLs**

Record each final Google Docs `/edit` URL with its course and language in `/tmp/applied-ai-mastery-journal-urls.json` under `personal.en`, `personal.he`, `professional.en`, and `professional.he`. Open each recorded URL in the authenticated session and verify its title and representative content. Keep the browser session open until site integration is complete.

### Task 5: Wire Language-Specific Journal Links

**Files:**
- Create: `scripts/check-course-journal-links.mjs`
- Modify: `personal.html`
- Modify: `site/assets/js/personal-course.js`
- Modify: `professional.html`
- Modify: `site/assets/js/course.js`
- Modify: `DEPLOYMENT.md`

- [ ] **Step 1: Write the failing journal-link contract**

Assert that both course pages contain journal anchors with `target="_blank"` and `rel="noopener noreferrer"`, both scripts define distinct English and Hebrew Google Docs URLs, and each language setter assigns the correct URL.

```js
const googleDoc=/https:\/\/docs\.google\.com\/document\/d\/[A-Za-z0-9_-]+\/edit/;
assert.match(personalScript,googleDoc);
assert.match(professionalScript,googleDoc);
assert.equal(new Set(personalScript.match(new RegExp(googleDoc.source,'g'))||[]).size,2);
assert.equal(new Set(professionalScript.match(new RegExp(googleDoc.source,'g'))||[]).size,2);
for(const html of [personalHtml,professionalHtml]){
  assert.match(html,/data-(?:professional-)?journal-link[^>]*target="_blank"[^>]*rel="noopener noreferrer"/);
}
```

- [ ] **Step 2: Run the contract and confirm it fails**

Run: `node scripts/check-course-journal-links.mjs`

Expected: failure because the four new URLs are not wired and the professional page has no journal link.

- [ ] **Step 3: Integrate the personal journals**

Read `personal.en` and `personal.he` from `/tmp/applied-ai-mastery-journal-urls.json` and define `journalUrls` in `personal-course.js` with those two exact literal values. Do not retain the temporary JSON path or load external configuration at runtime. In `setLanguage`, assign `journalUrls[language]` to every `[data-journal-link]`. Give every journal anchor safe new-tab attributes. Add a localized `journalInstruction` string and a visible `[data-i18n="journalInstruction"]` paragraph in the existing practice section: open the template and choose **File -> Make a copy** before writing.

- [ ] **Step 4: Integrate the professional journals**

Read `professional.en` and `professional.he` from `/tmp/applied-ai-mastery-journal-urls.json` and define `journalUrls` in `course.js` with those two exact literal values. Do not retain the temporary JSON path or load external configuration at runtime. Add `[data-professional-journal-link]` anchors to the professional header and hero actions, both with safe new-tab attributes. Add localized `journal`, `openJournal`, and `journalInstruction` UI strings. In `setLanguage`, assign `journalUrls[state.language]` to every professional journal anchor. Place the concise instruction directly beneath the hero actions.

- [ ] **Step 5: Update deployment smoke checks**

Replace `Open both learning journals and test the copy-template command` with checks that switch each course between English and Hebrew, open all four templates, verify the expected document titles, and confirm the source course remains open in its original tab.

- [ ] **Step 6: Run journal and localization contracts**

Run:

```bash
node scripts/check-course-journal-links.mjs
node scripts/check-learning-journal-sources.mjs
node scripts/check-professional-i18n.mjs
node scripts/validate-professional-localization.mjs
node --check site/assets/js/personal-course.js
node --check site/assets/js/course.js
```

Expected: all commands exit 0; the localization inventory may retain its existing human-review notices.

- [ ] **Step 7: Commit course integration**

```bash
git add scripts/check-course-journal-links.mjs personal.html professional.html site/assets/js/personal-course.js site/assets/js/course.js DEPLOYMENT.md
git commit -m "feat: connect bilingual Google Docs journals"
```

### Task 6: End-to-End Verification

**Files:**
- Verify all changed files

- [ ] **Step 1: Run the full focused contract set**

```bash
node scripts/check-personal-course-punctuation.mjs
node scripts/check-personal-content-review.mjs
node scripts/check-personal-document-review.mjs
node scripts/check-learning-journal-sources.mjs
node scripts/check-course-journal-links.mjs
node scripts/check-firebase-deployment-docs.mjs
node scripts/check-professional-i18n.mjs
node scripts/validate-professional-localization.mjs
```

Expected: every command exits 0; only previously documented nonblocking localization review notices may remain.

- [ ] **Step 2: Run syntax and whitespace checks**

```bash
node --check site/assets/js/markdown-viewer.js
node --check site/assets/js/personal-course.js
node --check site/assets/js/course.js
git diff --check main...HEAD
```

Expected: all commands exit 0 with no whitespace errors.

- [ ] **Step 3: Verify document navigation in a browser**

At desktop and mobile widths, open English personal, Hebrew personal, English professional, and Hebrew professional Markdown documents. Confirm the source link is absent, both return links are localized and point to the same destination, the bottom link follows the article, and failed document loads do not reveal bottom navigation.

- [ ] **Step 4: Verify all four journal routes**

Switch each course language, open its journal from every visible entry point, and verify the correct Google Doc opens in a new tab with the source course left intact. Confirm the File -> Make a copy instruction is localized and does not overflow on mobile.

- [ ] **Step 5: Verify Google sharing outside the authenticated session**

Open each of the four Google Docs URLs in a fresh incognito browser context. Confirm the document is readable without sign-in and cannot be edited directly.

- [ ] **Step 6: Run accessibility checks**

Run automated WCAG A/AA checks on both course pages and the document viewer in English and Hebrew. Confirm zero new violations and manually keyboard-test header and bottom return links plus external journal links.

- [ ] **Step 7: Commit any verification-only corrections**

If verification required code or content fixes, rerun the affected checks and commit only those corrections with a scoped message. If no files changed, do not create an empty commit.

- [ ] **Step 8: Report branch readiness**

Run:

```bash
git status --short --branch
git log --oneline main..HEAD
```

Expected: a clean `fix/personal-course-review-round-2` branch containing the design, plan, journal, punctuation, viewer, and course-integration commits.
