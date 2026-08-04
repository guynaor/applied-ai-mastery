# Multi-Tab Google Docs Journals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the four single-tab journal templates with polished bilingual Google Docs workbooks that use reviewer-style document tabs and course-specific prompts.

**Architecture:** Four structured Markdown files remain the canonical journal content. A small parser exposes each `journal-tab` block for validation and clipboard export, while Google Docs copies provide the formatted student-facing workbooks. The site continues to select journal URLs client-side by course and language; old documents are moved to Drive Trash only after the new documents and site mappings pass end-to-end verification.

**Tech Stack:** Markdown, Node.js ES modules, static HTML and JavaScript, Google Docs document tabs, standard Chrome with remote debugging, `agent-browser`, Firebase Hosting documentation contracts.

---

## File Map

- Create `scripts/lib/journal-tabs.mjs`: Parse explicit journal-tab markers and validate marker metadata.
- Create `scripts/extract-journal-tab.mjs`: Print one tab's Markdown to stdout for `wl-copy` and Google Docs import.
- Modify `scripts/check-learning-journal-sources.mjs`: Enforce tab counts, IDs, bilingual parity, and required prompts.
- Modify `personal-course/student/ai-learning-journal.md`: Canonical 16-tab personal English workbook.
- Modify `personal-course/he/learning-journal.md`: Canonical 16-tab personal Hebrew workbook.
- Modify `professional-course/student/ai-learning-journal.md`: Canonical 12-tab professional English workbook.
- Modify `professional-course/he/student/ai-learning-journal.md`: Canonical 12-tab professional Hebrew workbook.
- Modify `scripts/check-course-journal-links.mjs`: Validate four distinct live Google Docs URLs without pinning superseded IDs.
- Modify `personal.html`: Use the replacement personal English URL as the no-JavaScript default.
- Modify `professional.html`: Use the replacement professional English URL as the no-JavaScript default.
- Modify `site/assets/js/personal-course.js`: Map English and Hebrew to the replacement personal documents.
- Modify `site/assets/js/course.js`: Map English and Hebrew to the replacement professional documents.
- Modify `DEPLOYMENT.md`: Verify tab counts, Viewer sharing, copy workflow, and language mapping during deployment.
- Create `/tmp/applied-ai-mastery-new-journal-urls.json`: Temporary browser-workflow record of the four replacement URLs; do not commit it.

### Task 1: Add Structured Journal-Tab Parsing

**Files:**
- Create: `scripts/lib/journal-tabs.mjs`
- Create: `scripts/extract-journal-tab.mjs`
- Modify: `scripts/check-learning-journal-sources.mjs`

- [ ] **Step 1: Extend the journal contract with failing parser assertions**

Add these imports and expectations to `scripts/check-learning-journal-sources.mjs`:

```js
import {parseJournalTabs} from './lib/journal-tabs.mjs';

const expected={
  personal:[
    'journal-home','entry-template','prompt-library','course-reflection',
    'lesson-01','lesson-02','lesson-03','lesson-04','lesson-05','lesson-06',
    'lesson-07','lesson-08','lesson-09','lesson-10','lesson-11','lesson-12',
  ],
  professional:[
    'journal-home','entry-template','workflow-library','course-reflection',
    'mission-01','mission-02','mission-03','mission-04','mission-05','mission-06',
    'mission-07','capstone',
  ],
};

const journals={personalEn,personalHe,professionalEn,professionalHe};
const parsed=Object.fromEntries(Object.entries(journals).map(([key,source])=>[key,parseJournalTabs(source)]));
assert.deepEqual(parsed.personalEn.map(tab=>tab.id),expected.personal);
assert.deepEqual(parsed.personalHe.map(tab=>tab.id),expected.personal);
assert.deepEqual(parsed.professionalEn.map(tab=>tab.id),expected.professional);
assert.deepEqual(parsed.professionalHe.map(tab=>tab.id),expected.professional);

for(const tabs of Object.values(parsed)){
  for(const tab of tabs){
    assert.match(tab.title,/\S/);
    assert.match(tab.markdown,/^# /m);
    assert.match(tab.markdown,/verification|verify|אימות|בדיקה/i);
    assert.match(tab.markdown,/evidence|saved|ראיות|שמר/i);
    assert.match(tab.markdown,/reflection|next time|רפלקציה|בפעם הבאה/i);
  }
}
```

- [ ] **Step 2: Run the contract and verify it fails**

Run: `node scripts/check-learning-journal-sources.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `scripts/lib/journal-tabs.mjs`.

- [ ] **Step 3: Implement the journal-tab parser**

Create `scripts/lib/journal-tabs.mjs`:

```js
const marker=/^<!-- journal-tab: (\{.*\}) -->$/gm;

export function parseJournalTabs(markdown){
  const matches=[...markdown.matchAll(marker)];
  if(!matches.length)throw new Error('Journal contains no journal-tab markers');
  return matches.map((match,index)=>{
    let metadata;
    try{metadata=JSON.parse(match[1]);}catch{throw new Error(`Invalid journal-tab metadata at marker ${index+1}`);}
    if(typeof metadata.id!=='string'||!metadata.id)throw new Error(`Missing journal-tab id at marker ${index+1}`);
    if(typeof metadata.title!=='string'||!metadata.title)throw new Error(`Missing journal-tab title for ${metadata.id}`);
    const start=match.index+match[0].length;
    const end=matches[index+1]?.index??markdown.length;
    return {id:metadata.id,title:metadata.title,markdown:markdown.slice(start,end).trim()};
  });
}
```

- [ ] **Step 4: Add the single-tab extraction CLI**

Create `scripts/extract-journal-tab.mjs`:

```js
import {readFileSync} from 'node:fs';
import {parseJournalTabs} from './lib/journal-tabs.mjs';

const [, , sourcePath, tabId]=process.argv;
if(!sourcePath||!tabId){
  console.error('Usage: node scripts/extract-journal-tab.mjs <journal.md> <tab-id>');
  process.exit(2);
}
const tab=parseJournalTabs(readFileSync(sourcePath,'utf8')).find(candidate=>candidate.id===tabId);
if(!tab){
  console.error(`Unknown journal tab: ${tabId}`);
  process.exit(1);
}
process.stdout.write(`${tab.markdown}\n`);
```

- [ ] **Step 5: Add parser edge-case assertions**

Append to `scripts/check-learning-journal-sources.mjs`:

```js
assert.throws(()=>parseJournalTabs('plain markdown'),/no journal-tab markers/);
assert.throws(()=>parseJournalTabs('<!-- journal-tab: nope -->'),/Invalid journal-tab metadata/);
const extracted=parseJournalTabs('<!-- journal-tab: {"id":"one","title":"One"} -->\n# One\n\nVerify evidence and reflect next time.');
assert.equal(extracted[0].id,'one');
assert.match(extracted[0].markdown,/^# One/);
```

- [ ] **Step 6: Verify the parser syntax while the content contract remains red**

Run: `node --check scripts/lib/journal-tabs.mjs && node --check scripts/extract-journal-tab.mjs && node scripts/check-learning-journal-sources.mjs`

Expected: both syntax checks pass; the journal contract fails because the four journals do not yet contain the required markers.

- [ ] **Step 7: Commit the parser and failing contract**

```bash
git add scripts/lib/journal-tabs.mjs scripts/extract-journal-tab.mjs scripts/check-learning-journal-sources.mjs
git commit -m "test: define multi-tab journal contract"
```

### Task 2: Build the Personal English and Hebrew Journal Sources

**Files:**
- Modify: `personal-course/student/ai-learning-journal.md`
- Modify: `personal-course/he/learning-journal.md`

- [ ] **Step 1: Replace the personal English source with 16 explicit tab blocks**

Use this marker shape before every tab:

```markdown
<!-- journal-tab: {"id":"lesson-03","title":"Lesson 3: Decision Workbook"} -->
# Lesson 3: Decision Workbook
```

Create the blocks in the exact ID order from Task 1. Source course-specific fields from these files:

| Tab ID | Canonical course source | Required workbook sections |
| --- | --- | --- |
| `journal-home` | `personal-course/README.md` | Copy instructions, privacy boundary, evidence organization, verification habit, reflection habit |
| `entry-template` | Current journal template | Lesson/date, useful result, saved prompt, failure, verification, evidence, reflection, next use |
| `prompt-library` | Current journal template | Prompt, purpose, context, constraints, verification, safe reuse |
| `course-reflection` | Current journal template | Growth, strongest work, recurring failure, verification, responsibility, next steps |
| `lesson-01` | `personal-course/materials/lesson-01-better-requests/student/prompt-workbook.md` | Request, context, constraints, iterations, final prompt, checks |
| `lesson-02` | `personal-course/materials/lesson-02-summaries/student/verification-workbook.md` | Source/purpose, summary, actions, missing information, claims to verify |
| `lesson-03` | `personal-course/materials/lesson-03-decisions/student/decision-workbook.md` | Decision, criteria, options, assumptions, sensitivity, decision record |
| `lesson-04` | `personal-course/materials/lesson-04-online-buying/student/comparison-workbook.md` | Needs, products, total cost, seller evidence, returns, decision |
| `lesson-05` | `personal-course/materials/lesson-05-deal-alerts/student/alert-specification.md` | Trigger, threshold, sources, duplicate suppression, stop rule, review |
| `lesson-06` | `personal-course/materials/lesson-06-travel-planning/student/trip-planning-workbook.md` | Constraints, itinerary, budget, buffers, fallback, timed rechecks |
| `lesson-07` | `personal-course/materials/lesson-07-event-planning/student/event-workbook.md` | Preferences, poll result, ownership, deadlines, budget, invitation, fallback |
| `lesson-08` | `personal-course/materials/lesson-08-investment-research/student/research-workbook.md` | Question, opposing evidence, uncertainty, privacy, balanced conclusion |
| `lesson-09` | `personal-course/materials/lesson-09-mini-app/student/app-workbook.md` | User need, requirements, build log, tests, defects, maintenance |
| `lesson-10` | `personal-course/materials/lesson-10-room-design/student/design-workbook.md` | Measurements, design contract, parameters, versions, validation boundary |
| `lesson-11` | `personal-course/materials/lesson-11-visual-storytelling/student/storyboard-workbook.md` | Audience, storyboard, prompts, consent, captions, authenticity, export |
| `lesson-12` | `personal-course/materials/lesson-12-personal-brand/student/portfolio-workbook.md` | Evidence inventory, audience, truthful claims, project selection, application log |

Every block must end with these three short headings adapted to the tab's subject:

```markdown
## Verification and evidence

## Reflection and human judgment

## What I will change next time
```

- [ ] **Step 2: Build the Hebrew personal source with matching IDs and localized titles**

Use the same ID order and translate the tab titles and prompts. Preserve `File -> Make a copy`, product names, URLs, and technical terms where the course already retains English. Each block must use an H1 title and end with localized equivalents of verification/evidence, reflection/human judgment, and next-time change.

- [ ] **Step 3: Run the journal contract**

Run: `node scripts/check-learning-journal-sources.mjs`

Expected: FAIL only on missing professional journal markers; personal English and Hebrew inventories match all 16 IDs.

- [ ] **Step 4: Spot-check extraction for both directions**

Run:

```bash
node scripts/extract-journal-tab.mjs personal-course/student/ai-learning-journal.md lesson-03
node scripts/extract-journal-tab.mjs personal-course/he/learning-journal.md lesson-03
```

Expected: each command prints exactly one Decision Workbook tab beginning with its H1 and ending before the next marker.

- [ ] **Step 5: Commit the personal sources**

```bash
git add personal-course/student/ai-learning-journal.md personal-course/he/learning-journal.md
git commit -m "content: build multi-tab personal journals"
```

### Task 3: Build the Professional English and Hebrew Journal Sources

**Files:**
- Modify: `professional-course/student/ai-learning-journal.md`
- Modify: `professional-course/he/student/ai-learning-journal.md`

- [ ] **Step 1: Replace the professional English source with 12 explicit tab blocks**

Use the same JSON marker syntax and this exact content inventory:

| Tab ID | Canonical course source | Required workbook sections |
| --- | --- | --- |
| `journal-home` | `README.md` | Copy instructions, simulation boundary, privacy, evidence organization, verification |
| `entry-template` | Current professional journal | Mission/role/date, decision, evidence, workflow, uncertainty, verification, approval, transfer |
| `workflow-library` | Current professional journal | Workflow/prompt, purpose, inputs, constraints, verification, human checkpoint, reuse boundary |
| `course-reflection` | Current professional journal | Growth, strongest evidence, recurring failure, verification, judgment, transfer to work |
| `mission-01` | `materials/session-01-prompting/student/AF-TRN-102-model-comparison-worksheet.md` and `AF-TRN-103-risen-prompt-template.md` | Task, model comparison, RISEN prompt, assumptions, result, checks |
| `mission-02` | `materials/session-02-deep-research/student/AF-RD-201-decision-brief.md` and `AF-RD-203-research-memo-template.md` | Decision question, source quality, evidence conflicts, uncertainty, recommendation |
| `mission-03` | `materials/session-03-spreadsheet-engineering/student/AF-OPS-301-assignment-brief.md` and `AF-OPS-302-automation-specification.md` | Data contract, cleaning log, preserved evidence, formulas, alert workflow, tests |
| `mission-04` | `materials/session-04-technical-communication/student/AF-COM-401-presentation-brief.md` and `AF-COM-404-critique-checklist.md` | Audience, decision, source notes, storyboard, critique, revision |
| `mission-05` | `materials/session-05-operations-planning/student/AF-OPS-501-mission-brief.md` | Constraints, itinerary, buffers, contingency, calendar output, review |
| `mission-06` | `materials/session-06-agent-workflows/student/AF-AUTO-601-mission-brief.md` | States, triggers, suppression, recovery, observability, human control, tests |
| `mission-07` | `materials/session-07-parametric-cad/student/AF-CAD-701-design-brief.md` | Design contract, parameters, OpenSCAD versions, measurements, validation log |
| `capstone` | `capstone/student/AF-CAP-001-mission-brief.md` | Recommendation, evidence reconciliation, decision log, deliverable checks, human approval |

End every block with verification/evidence, reflection/human judgment, and transfer/next-time prompts.

- [ ] **Step 2: Build the Hebrew professional source with matching IDs and localized titles**

Translate the workbook prompts using the terminology already established under `professional-course/he/`. Preserve AquaForge document IDs, product names, formulas, and code identifiers in LTR form.

- [ ] **Step 3: Run the complete journal contract**

Run: `node scripts/check-learning-journal-sources.mjs`

Expected: `Learning journal source contract passed` with 16 tabs in each personal source and 12 tabs in each professional source.

- [ ] **Step 4: Run localization and punctuation contracts**

Run:

```bash
node scripts/check-personal-course-punctuation.mjs
node scripts/check-professional-i18n.mjs
node scripts/validate-professional-localization.mjs
```

Expected: all commands exit 0; the localization validator may retain its existing numeric-parity human-review warning.

- [ ] **Step 5: Commit the professional sources**

```bash
git add professional-course/student/ai-learning-journal.md professional-course/he/student/ai-learning-journal.md
git commit -m "content: build multi-tab professional journals"
```

### Task 4: Create and Format the Four Replacement Google Docs

**Files:**
- Read: the four journal Markdown sources
- Create temporarily: `/tmp/applied-ai-mastery-new-journal-urls.json`
- External: reviewer Google Doc and four new Google Docs copies

- [ ] **Step 1: Launch authenticated standard Chrome for the browser workflow**

Run Chrome with an isolated persistent profile and remote debugging on an unused port. Open the reviewer document and allow the user to sign in if the session is not authenticated. Attach `agent-browser` to the remote-debugging port and verify the account button identifies the user.

- [ ] **Step 2: Create the four copies from the reviewer document**

Use `File -> Make a copy` four times and rename the copies exactly:

```text
Applied AI Mastery - Personal Learning Journal Template (English)
Applied AI Mastery - Personal Learning Journal Template (Hebrew)
Applied AI Mastery - Professional Learning Journal Template (English)
Applied AI Mastery - Professional Learning Journal Template (Hebrew)
```

Capture each resulting `/document/d/<id>/edit` URL immediately.

- [ ] **Step 3: Record the replacement URLs outside the repository**

Create `/tmp/applied-ai-mastery-new-journal-urls.json` as an object with the keys `personalEn`, `personalHe`, `professionalEn`, and `professionalHe`. Set each value to the exact Google Docs edit URL returned by `agent-browser get url` after creating that named copy. Validate that every value matches `/^https:\/\/docs\.google\.com\/document\/d\/[A-Za-z0-9_-]+\/edit$/` and that all four values are distinct. Do not commit this temporary file.

- [ ] **Step 4: Rebuild the personal English copy**

Retain or recreate exactly 16 top-level document tabs in the Task 2 order. For each tab:

1. Run `node scripts/extract-journal-tab.mjs personal-course/student/ai-learning-journal.md <tab-id> | wl-copy`.
2. Select the matching Google Docs tab.
3. Replace its body and use `Edit -> Paste from Markdown`.
4. Preserve the reviewer-style H1, H2 dividers, bold labels, tables, checklists, and writing space.
5. Re-snapshot the sidebar and document body before continuing.

- [ ] **Step 5: Rebuild the personal Hebrew copy**

Repeat Step 4 using `personal-course/he/learning-journal.md`. Set tab content to RTL, confirm the H1 aligns right, and verify English identifiers remain readable.

- [ ] **Step 6: Rebuild the professional English copy**

Replace the copied personal tabs with exactly 12 professional tabs in the Task 3 order. Populate each from `professional-course/student/ai-learning-journal.md` and verify the AquaForge identifiers and mission numbers remain unchanged.

- [ ] **Step 7: Rebuild the professional Hebrew copy**

Repeat Step 6 using `professional-course/he/student/ai-learning-journal.md`. Set RTL direction and verify AquaForge identifiers remain LTR and unmodified.

- [ ] **Step 8: Configure sharing on all four replacement documents**

For each document, open Share, change General access to `Anyone with the link`, confirm `Viewer`, and close the dialog only after the snapshot displays both values.

- [ ] **Step 9: Verify document structure before touching site URLs**

For each document, confirm:

- saved status is visible;
- title matches the required name;
- sidebar contains 16 personal or 12 professional top-level tabs;
- first, middle, and final tab bodies have reviewer-style formatting;
- Hebrew samples are RTL;
- no instructor answer key content appears.

Do not proceed if any check fails.

### Task 5: Migrate the Static Site to the Replacement URLs

**Files:**
- Modify: `scripts/check-course-journal-links.mjs`
- Modify: `personal.html`
- Modify: `professional.html`
- Modify: `site/assets/js/personal-course.js`
- Modify: `site/assets/js/course.js`

- [ ] **Step 1: Generalize the URL contract before replacing URLs**

Replace hard-coded document IDs in `scripts/check-course-journal-links.mjs` with helpers that extract valid URLs and reject duplicates:

```js
const googleDocPattern=/https:\/\/docs\.google\.com\/document\/d\/[A-Za-z0-9_-]+\/edit/g;
const urls=source=>[...new Set(source.match(googleDocPattern)||[])];

const personalUrls=urls(personalJs);
const professionalUrls=urls(professionalJs);
assert.equal(personalUrls.length,2,'Personal course must map two distinct Google Docs');
assert.equal(professionalUrls.length,2,'Professional course must map two distinct Google Docs');
assert.equal(new Set([...personalUrls,...professionalUrls]).size,4,'All four journal templates must be distinct');
assert.ok(personalUrls.includes(urls(personalHtml)[0]),'Personal HTML default must use a mapped URL');
assert.ok(professionalUrls.includes(urls(professionalHtml)[0]),'Professional HTML default must use a mapped URL');
```

Retain the existing assertions for language-map usage, safe new-tab attributes, and copy instructions.

- [ ] **Step 2: Run the generalized contract against the old mappings**

Run: `node scripts/check-course-journal-links.mjs`

Expected: PASS, proving the contract validates structure independently of a particular document ID.

- [ ] **Step 3: Replace all four site mappings using the captured URL record**

Read `/tmp/applied-ai-mastery-new-journal-urls.json` and replace:

- all personal English default URLs in `personal.html`;
- the `en` and `he` values in `journalUrls` in `site/assets/js/personal-course.js`;
- all professional English default URLs in `professional.html`;
- the `en` and `he` values in `journalUrls` in `site/assets/js/course.js`.

Do not alter the new-tab attributes or localized copy instruction.

- [ ] **Step 4: Run the URL and localization contracts**

Run:

```bash
node scripts/check-course-journal-links.mjs
node scripts/check-professional-i18n.mjs
node --check site/assets/js/personal-course.js
node --check site/assets/js/course.js
```

Expected: all commands exit 0 and the URL contract reports four distinct templates.

- [ ] **Step 5: Commit the URL migration**

```bash
git add scripts/check-course-journal-links.mjs personal.html professional.html site/assets/js/personal-course.js site/assets/js/course.js
git commit -m "feat: publish multi-tab course journals"
```

### Task 6: Update Deployment Verification

**Files:**
- Modify: `DEPLOYMENT.md`
- Modify: `scripts/check-firebase-deployment-docs.mjs`

- [ ] **Step 1: Add a failing deployment-documentation contract**

Append assertions to `scripts/check-firebase-deployment-docs.mjs`:

```js
assert.match(deployment,/16 personal tabs/i);
assert.match(deployment,/12 professional tabs/i);
assert.match(deployment,/Anyone with the link/);
assert.match(deployment,/Viewer/);
assert.match(deployment,/File (?:->|→) Make a copy/);
```

- [ ] **Step 2: Run the deployment contract and verify it fails**

Run: `node scripts/check-firebase-deployment-docs.mjs`

Expected: FAIL because `DEPLOYMENT.md` does not yet state the tab counts.

- [ ] **Step 3: Expand the production journal checklist**

Replace the current two journal bullets in `DEPLOYMENT.md` with:

```markdown
- In both courses, switch between English and Hebrew and open each language's learning-journal link.
- Confirm each personal workbook has 16 document tabs and each professional workbook has 12 document tabs.
- Confirm representative first, middle, and final tabs retain headings, dividers, writing areas, and RTL formatting where applicable.
- Confirm all four Google Docs use **Anyone with the link** and **Viewer** access.
- Confirm the templates instruct students to choose **File -> Make a copy** before writing.
```

- [ ] **Step 4: Run the deployment contract**

Run: `node scripts/check-firebase-deployment-docs.mjs`

Expected: `Firebase-only deployment documentation contract passed`.

- [ ] **Step 5: Commit the deployment checklist**

```bash
git add DEPLOYMENT.md scripts/check-firebase-deployment-docs.mjs
git commit -m "docs: verify multi-tab journal deployment"
```

### Task 7: Verify Replacements End to End

**Files:**
- Read: all modified repository files
- Read temporarily: `/tmp/applied-ai-mastery-new-journal-urls.json`
- External: four replacement Google Docs

- [ ] **Step 1: Run every repository contract from a fresh shell**

Run each command and require exit 0:

```bash
node scripts/check-firebase-deployment-docs.mjs
node scripts/check-learning-journal-sources.mjs
node scripts/check-personal-content-review.mjs
node scripts/check-personal-course-punctuation.mjs
node scripts/check-personal-document-review.mjs
node scripts/check-professional-i18n.mjs
node scripts/validate-professional-localization.mjs
node scripts/check-course-journal-links.mjs
node --check scripts/lib/journal-tabs.mjs
node --check scripts/extract-journal-tab.mjs
node --check site/assets/js/personal-course.js
node --check site/assets/js/course.js
node --check site/assets/js/markdown-viewer.js
git diff --check main...HEAD
```

Expected: all commands exit 0. The professional localization validator may print its existing numeric-parity human-review warning.

- [ ] **Step 2: Verify all four replacements anonymously**

Open each captured URL in a clean unauthenticated browser session. Confirm the expected document title loads without a sign-in or request-access gate and that the document tabs sidebar is present.

- [ ] **Step 3: Verify copy availability**

In an unauthenticated or Viewer session, open the File menu for one English and one Hebrew document and confirm `Make a copy` is available after sign-in. Do not create extra test copies.

- [ ] **Step 4: Verify local course behavior at desktop and mobile sizes**

Start `python3 -m http.server 4173`. At 1440x1000 and 390x844:

- open `personal.html`, switch English and Hebrew, and verify the matching captured document URLs;
- open `professional.html`, switch English and Hebrew, and verify the matching captured document URLs;
- confirm the copy instruction localizes and no controls overlap or clip;
- run WCAG A/AA scans on both course pages and require zero violations.

- [ ] **Step 5: Recheck Google sharing in the authenticated browser**

For each replacement, open Share and capture a snapshot showing `Anyone with the link` and `Viewer`.

- [ ] **Step 6: Confirm the replacement gate**

Before deleting anything, require all of the following evidence in the current turn:

- repository contracts exit 0;
- four replacement titles and tab counts verified;
- anonymous access verified;
- Viewer sharing verified;
- site language mapping verified.

### Task 8: Retire the Four Superseded Documents

**Files:**
- External: the four superseded Google Docs

Superseded document IDs:

```text
1UceZDI2bb8yrXONp5cMjf8-oFOKuIZpD2rlymuq-8aM
1opR4a6uGRh8jaKJU4AK9PKIaB3lHDK57AJiLuPqFRdk
1jCA_128e9MWrn-ULXzFEcGf2HQ9CCKsiLUuJ0hfdYzQ
1iPmulu1pq0U3N6QYcTdWFOfEd9w_AikfnQNn2B8IFSk
```

- [ ] **Step 1: Compare site mappings against the superseded IDs**

Run: `rg '1UceZDI2|1opR4a6u|1jCA_128|1iPmulu1' personal.html professional.html site/assets/js scripts`

Expected: no matches in active site files or tests.

- [ ] **Step 2: Move each superseded document to Drive Trash**

In authenticated Chrome, open each old URL, choose `File -> Move to trash`, confirm the dialog, and verify Google reports that the file is in Trash before proceeding to the next document.

- [ ] **Step 3: Verify the old public URLs no longer serve templates**

Open each old `/preview` URL in the clean anonymous browser session. Confirm none displays the superseded journal template.

- [ ] **Step 4: Verify the replacement URLs once more after cleanup**

Open all four replacement URLs anonymously and confirm each expected title and document tabs sidebar still load.

- [ ] **Step 5: Record the final clean state**

Run:

```bash
git status --short --branch
git log --oneline main..HEAD
```

Expected: clean worktree on `fix/personal-course-review-round-2`, with the content, URL migration, and deployment commits present.
