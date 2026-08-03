# Professional Course Hebrew Localization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the professional engineering-AI track fully teachable in Hebrew while keeping English as the canonical language for simulated workplace artifacts.

**Architecture:** Add locale-aware rendering and routing to the existing static professional portal, and store complete Hebrew instructional documents in a one-to-one mirror under `professional-course/he/`. Keep data, source records, templates, prompts, field names, and code in their existing English locations, label those links as English workplace material, and enforce completeness with a manifest plus a dependency-free validator.

**Tech Stack:** Static HTML/CSS, vanilla JavaScript, Markdown curriculum files, dependency-free Node.js validation, Playwright browser checks, Firebase Hosting

---

## File Map

- Modify `professional.html`: add localization hooks, the language control, and locale-aware link hooks for every visible professional-track region.
- Rewrite `site/assets/js/course.js`: hold bilingual UI/session copy, resolve translated versus canonical resources, persist professional language independently, and honor `?lang=`.
- Modify `index.html`: identify the professional course link for locale handoff.
- Modify `site/assets/js/index-i18n.js`: append the active selector language to the professional-course URL.
- Modify `site/assets/js/markdown-viewer.js`: distinguish personal Hebrew, professional Hebrew, and English workplace artifacts opened from Hebrew mode.
- Modify `site/assets/js/hebrew-document-context.js`: apply the correct stored language and back-link context before the document finishes loading.
- Modify `site/assets/css/course.css`: support the added header control, mixed-direction labels, and RTL layout without text overflow.
- Create `scripts/check-professional-i18n.mjs`: static regression checks for the portal and viewer contracts.
- Create `professional-course/he/README.md`: Hebrew professional-track overview and English-artifact policy.
- Create `professional-course/he/ai-geography.md`: professional-context Hebrew copy of the existing orientation.
- Create 35 mirrored session documents under `professional-course/he/materials/`: five instructional documents for each of seven sessions.
- Create five mirrored capstone documents under `professional-course/he/capstone/`.
- Create `professional-course/he/localization-manifest.json`: exact mapping for all 40 translated instructional documents.
- Create `scripts/validate-professional-localization.mjs`: validate coverage, Hebrew content, links, catalog references, and prohibited copied artifacts.
- Create `tests/professional-i18n.spec.js`: browser behavior and responsive-layout coverage.

## Translation Acceptance Contract

Apply this contract to every Hebrew instructional document in Tasks 5-12:

1. Translate every title, explanation, instruction, question, feedback cue, and assessment statement into natural Hebrew; do not summarize or omit sections.
2. Preserve heading hierarchy and order, tables, list structure, blockquotes, code fences, document IDs, product/person names, prompts, formulas, field names, literal output contracts, and file names.
3. Preserve all durations, dates, quantities, dimensions, thresholds, scores, required submissions, uncertainty labels, and human-approval boundaries.
4. Do not add facts, technical diagnoses, expected results, or evidence absent from the English source.
5. Point links to translated instructional documents at their `professional-course/he/` counterpart. Point links to source memos, worksheets, templates, CSV, company records, code, and other canonical artifacts back to the existing English path.
6. Label every canonical artifact link with `חומר עבודה באנגלית` or a more specific Hebrew equivalent such as `גיליון עבודה באנגלית`.
7. On first use, retain an English workplace term in parentheses when the Hebrew term alone would make transfer harder. Keep the English literal unchanged wherever the student must type or submit it.
8. Compare the finished file side by side with its source. Confirm every source heading has a corresponding Hebrew heading and manually review every numeric-literal difference before committing.

### Task 1: Add A Failing Professional Localization Contract

**Files:**
- Create: `scripts/check-professional-i18n.mjs`
- Verify: `professional.html`
- Verify: `site/assets/js/course.js`
- Verify: `site/assets/js/index-i18n.js`
- Verify: `site/assets/js/markdown-viewer.js`

- [ ] **Step 1: Confirm the branch and starting state**

Run:

```bash
git branch --show-current
git status --short
```

Expected: branch `feature/professional-course-hebrew`; no uncommitted files.

- [ ] **Step 2: Create the static contract test**

Create `scripts/check-professional-i18n.mjs` using only `node:assert/strict` and `node:fs`. Read the four verified files and assert all of these contracts:

```javascript
assert.match(professionalHtml, /data-language="en"/);
assert.match(professionalHtml, /data-language="he"/);
assert.match(professionalHtml, /data-i18n="heroTitle"/);
assert.match(professionalHtml, /data-professional-capstone-link/);
assert.match(professionalHtml, /data-professional-overview-link/);
assert.match(courseJs, /aam-professional-language/);
assert.match(courseJs, /professional-course\/he\//);
assert.match(courseJs, /URLSearchParams/);
assert.match(indexJs, /data-professional-link/);
assert.match(viewerJs, /professional-course\/he\//);
assert.match(viewerJs, /professional\.html\?lang=he#missions/);
```

Also assert that `professional.html` contains localization hooks for the skip link, navigation, mode panel, missions heading, capstone section, company section, and footer. Print `Professional localization contract passed` only after every assertion succeeds.

- [ ] **Step 3: Run the contract and observe the expected failure**

Run:

```bash
node scripts/check-professional-i18n.mjs
```

Expected: FAIL on the missing professional language control. Do not weaken the assertions.

### Task 2: Localize The Professional Portal And Language State

**Files:**
- Modify: `professional.html`
- Rewrite: `site/assets/js/course.js`
- Modify: `site/assets/css/course.css`
- Test: `scripts/check-professional-i18n.mjs`

- [ ] **Step 1: Add complete localization hooks to the HTML shell**

Set `<html lang="en" dir="ltr">`. Add the same English/Hebrew segmented control used by `personal.html` to the site header. Add `data-i18n` or `data-i18n-aria-label` to every visible/static label in `professional.html`, including:

```text
skip, brand, nav, courses, missions, capstone, company, about,
heroEyebrow, heroTitle, heroText, startCourse, openCapstoneBrief, version,
chooseView, viewText, student, instructor, progression, progressionTitle,
finalMission, capstoneTitle, capstoneText, openCapstoneMission,
capstoneSubmission and all six submission items,
sharedSimulation, companyTitle, all three company-card titles/descriptions,
footerBrand, repository
```

Add `data-professional-capstone-link` to both capstone links and
`data-professional-overview-link` to About. Add resource hooks to the company
overview, employee directory, and roadmap links so `course.js` can apply
localized labels while keeping those three canonical English destinations.
The About destination is locale-aware: root `README.md` in English and
`professional-course/he/README.md` in Hebrew.

- [ ] **Step 2: Restructure the session catalog around locale-aware resources**

In `site/assets/js/course.js`, keep one `sessions` array. Give each session
bilingual `role`, `title`, and `summary` values. Represent resources with this
shape, using complete repository-relative paths so the release validator can
prove catalog coverage without executing browser code:

```javascript
{
  label:{en:'Start this mission',he:'התחלת המשימה'},
  path:{
    en:'materials/session-01-prompting/student/AF-TRN-100-student-mission-guide.md',
    he:'professional-course/he/materials/session-01-prompting/student/AF-TRN-100-student-mission-guide.md'
  },
  localized:true
}

{
  label:{en:'Source memo',he:'מזכר מקור (חומר עבודה באנגלית)'},
  path:'materials/session-01-prompting/student/AF-TRN-101-source-memo.md',
  localized:false
}
```

For `localized:true`, resolve `resource.path[state.language]`. For
`localized:false`, use the one canonical string in both languages. Keep all
Markdown destinations routed through `document.html?src=`.

The 40 localized resources are exactly the files named in Tasks 5-12. Every other resource remains canonical English and receives an explicit Hebrew English-material label.

- [ ] **Step 3: Add complete bilingual page copy and rendering**

Create a `ui.en` and `ui.he` object for every HTML hook plus dynamic labels:

```text
mission, studentMaterials, instructorMaterials, complete,
progress, metaTitle, metaDescription, language, viewMode
```

Render the mission cards from the active language. In Hebrew, use `משימה ${n}`, `חומרי תלמיד`, `חומרי הוראה`, and `${count} מתוך 8 הושלמו`. Preserve the existing completion set and Student/Instructor mode when language changes.

- [ ] **Step 4: Implement the professional language precedence exactly**

Use storage key `aam-professional-language`. Resolve startup language with:

```javascript
const queryLanguage=new URLSearchParams(location.search).get('lang');
const savedLanguage=localStorage.getItem('aam-professional-language');
const initialLanguage=['en','he'].includes(queryLanguage)
  ? queryLanguage
  : ['en','he'].includes(savedLanguage)
    ? savedLanguage
    : 'en';
```

`setLanguage(language, persist=true)` must update `html.lang`, `html.dir`, the body `rtl` class, pressed states, static copy, ARIA labels, document title/description, dynamic cards, progress text, capstone links, and canonical-artifact labels. A valid query override is saved. An invalid query is ignored. Language-button clicks update the URL with `history.replaceState` while preserving the hash.

Set both capstone links and the About/overview link from explicit locale path
pairs. Never fall back from a missing Hebrew destination to its English source.

- [ ] **Step 5: Add RTL and responsive safeguards**

In `site/assets/css/course.css`:

- keep the language control stable in the three-part header at desktop widths;
- use logical properties for direction-sensitive spacing/alignment;
- set heading and eyebrow letter spacing to `0`;
- set `.rtl .markdown-body blockquote` to use `border-inline-start` rather than a physical left border;
- keep mixed English identifiers and code LTR with `direction:ltr` and `unicode-bidi:isolate` where required;
- ensure long Hebrew artifact labels wrap inside resource groups;
- preserve one-column behavior below the existing mobile breakpoints.

- [ ] **Step 6: Make the contract pass and run syntax checks**

Run:

```bash
node scripts/check-professional-i18n.mjs
node --check site/assets/js/course.js
git diff --check
```

Expected: `Professional localization contract passed`; syntax and whitespace checks are silent.

- [ ] **Step 7: Commit the professional portal**

Run:

```bash
git add professional.html site/assets/js/course.js site/assets/css/course.css scripts/check-professional-i18n.mjs
git commit -m "feat: add professional course language control"
```

### Task 3: Preserve Locale Through The Selector And Document Viewer

**Files:**
- Modify: `index.html`
- Modify: `site/assets/js/index-i18n.js`
- Modify: `site/assets/js/markdown-viewer.js`
- Modify: `site/assets/js/hebrew-document-context.js`
- Test: `scripts/check-professional-i18n.mjs`

- [ ] **Step 1: Add the professional-link hook and index handoff**

Add `data-professional-link` to the professional course card in `index.html`. In `index-i18n.js`, make `setLanguage` set that link to `professional.html?lang=${lang}`. Do not change the personal-course link or the selector's existing language storage behavior.

- [ ] **Step 2: Separate content direction from navigation language in the viewer**

In `markdown-viewer.js`, derive these contexts:

```javascript
const personalSource=source.startsWith('personal-course/');
const personalHebrewSource=source.startsWith('personal-course/he/');
const professionalHebrewSource=source.startsWith('professional-course/he/');
const professionalHebrewPreference=localStorage.getItem('aam-professional-language')==='he';
const professionalArtifactSource=!personalSource&&!professionalHebrewSource;
const hebrewNavigation=personalHebrewSource||professionalHebrewSource||
  (professionalArtifactSource&&professionalHebrewPreference);
```

Only Hebrew document sources set the article/page to RTL and add the body's
`rtl` class. A canonical English artifact stays LTR and has no body `rtl` class
even when `hebrewNavigation` is true.

- [ ] **Step 3: Apply exact back-link and status behavior**

Use these professional outcomes:

```text
professional Hebrew instruction:
  label: חזרה למסלול המקצועי
  href: professional.html?lang=he#missions
  source label: פתיחת קובץ המקור

English artifact opened with saved professional Hebrew:
  label: חזרה למסלול המקצועי
  href: professional.html?lang=he#missions
  source label: פתיחת קובץ המקור
  article direction: LTR

professional English instruction/artifact:
  label: Back to professional missions
  href: professional.html?lang=en#missions
```

Localize invalid-link and load-failure status text according to navigation context. Preserve the existing personal-course behavior.

- [ ] **Step 4: Update the early Hebrew document context**

Extend `hebrew-document-context.js` so `professional-course/he/` stores `aam-professional-language=he`, applies the professional Hebrew back label/href, and does not write `aam-personal-language`. Keep the existing personal behavior unchanged.

- [ ] **Step 5: Verify the routing contract**

Run:

```bash
node scripts/check-professional-i18n.mjs
node --check site/assets/js/index-i18n.js
node --check site/assets/js/markdown-viewer.js
node --check site/assets/js/hebrew-document-context.js
git diff --check
```

Expected: the contract passes and all syntax/whitespace checks are silent.

- [ ] **Step 6: Commit routing and viewer context**

Run:

```bash
git add index.html site/assets/js/index-i18n.js site/assets/js/markdown-viewer.js site/assets/js/hebrew-document-context.js scripts/check-professional-i18n.mjs
git commit -m "feat: preserve professional locale across documents"
```

### Task 4: Create The Hebrew Track Overview And AI Geography Reference

**Files:**
- Create: `professional-course/he/README.md`
- Create: `professional-course/he/ai-geography.md`
- Reference: `materials/shared/AF-REF-001-ai-geography.md`
- Reference: `personal-course/he/ai-geography.md`

- [ ] **Step 1: Confirm both locale-only files are absent**

Run:

```bash
test ! -e professional-course/he/README.md
test ! -e professional-course/he/ai-geography.md
```

Expected: both commands exit 0.

- [ ] **Step 2: Write the Hebrew professional overview**

Create `professional-course/he/README.md` with these sections:

```markdown
# AI יישומי לעבודה ולהנדסה
## למי מיועד המסלול
## מבנה המסלול
## איך עובדים עם החומרים
## מדיניות השפה וחומרי העבודה באנגלית
## גבולות בטיחות ובקרה אנושית
```

Explain the seven missions plus capstone, Student/Instructor modes, browser-local progress, AquaForge simulation, and the exact boundary between Hebrew instruction and canonical English artifacts. Link to the seven translated package overviews, the translated capstone overview, the professional AI-geography reference, and canonical `company/README.md` with an English-material label.

- [ ] **Step 3: Create the professional AI-geography copy**

Start from `personal-course/he/ai-geography.md`, preserve all six definitions, seven current product/category rows, safety rule, four quick-check questions, and ten primary references. Adapt only the navigation/course context for professional students; do not change product claims or add rankings.

- [ ] **Step 4: Verify structure and links**

Run:

```bash
rg -n "מודל שפה|אפליקציית AI|תוצר|מיומנות|סוכן|Codex|Claude Code|Antigravity|OpenClaw" professional-course/he/ai-geography.md
rg -n "חומר.*באנגלית|session-0[1-7]|capstone|company/README" professional-course/he/README.md
git diff --check
```

Expected: every concept, track link, capstone link, and language-policy label appears; whitespace check is silent.

- [ ] **Step 5: Commit the locale foundation**

Run:

```bash
git add professional-course/he/README.md professional-course/he/ai-geography.md
git commit -m "content: add Hebrew professional course overview"
```

### Task 5: Translate Session 1 - Prompting And Model Selection

**Files:**
- Create: `professional-course/he/materials/session-01-prompting/README.md`
- Create: `professional-course/he/materials/session-01-prompting/student/AF-TRN-100-student-mission-guide.md`
- Create: `professional-course/he/materials/session-01-prompting/instructor/AF-TRN-100-instructor-guide.md`
- Create: `professional-course/he/materials/session-01-prompting/instructor/AF-TRN-100-step-by-step-lesson-script.md`
- Create: `professional-course/he/materials/session-01-prompting/instructor/AF-TRN-101-answer-key.md`
- Reference: the same five paths without the `professional-course/he/` prefix

- [ ] **Step 1: Confirm the five targets are absent**

Run `test ! -e` for each target above. Expected: all five commands exit 0.

- [ ] **Step 2: Translate the package overview and student mission**

Apply the Translation Acceptance Contract. Preserve the 10-minute AI-geography opening, RISEN acronym and template fields, controlled two-system comparison, three missing measurements, evidence audit, one controlled revision, submission list, and safety boundary. Link to `professional-course/he/ai-geography.md`. Keep AF-TRN-101/102/103 as canonical English workplace files and label each link accordingly.

- [ ] **Step 3: Translate both instructor guides and answer key**

Preserve the complete 105-minute schedule, all instructor scripts and quoted language, definitions, intervention table, minimum acceptable evidence, fallback plan, fact/inference distinction, red flags, measurements, and debrief questions. Do not convert the source-supported observations into diagnoses.

- [ ] **Step 4: Run the session parity review**

Compare source/target heading counts with `rg -c '^#{1,6} '`. Extract digit-containing tokens from each source/target pair with `rg -o '[[:alnum:].%+/_-]*[0-9][[:alnum:].%+/_-]*' | sort -u` and manually review differences. Open every local link and confirm it resolves to either a Hebrew instructional file or the labeled canonical English artifact.

- [ ] **Step 5: Commit Session 1**

```bash
git add professional-course/he/materials/session-01-prompting
git commit -m "content: translate professional session 1 to Hebrew"
```

### Task 6: Translate Session 2 - Research And Synthesis

**Files:**
- Create: `professional-course/he/materials/session-02-deep-research/README.md`
- Create: `professional-course/he/materials/session-02-deep-research/student/AF-RD-201-decision-brief.md`
- Create: `professional-course/he/materials/session-02-deep-research/instructor/AF-TRN-200-instructor-guide.md`
- Create: `professional-course/he/materials/session-02-deep-research/instructor/AF-TRN-200-step-by-step-lesson-script.md`
- Create: `professional-course/he/materials/session-02-deep-research/instructor/AF-TRN-201-answer-key.md`
- Reference: the same five paths without the `professional-course/he/` prefix

- [ ] **Step 1: Confirm the targets are absent, then translate all five files**

Apply the Translation Acceptance Contract. Preserve the full 120-minute concise plan and the longer scripted flow, decision criteria and operating envelope, evidence-quality vocabulary, comparability test, acceptable recommendation patterns, recommended validation step, red flags, and debrief questions.

- [ ] **Step 2: Preserve the canonical research packet**

Keep AF-RD-202, AF-RD-203, and all four AF-SRC-20x sources at their English paths. Label them respectively as an English evidence matrix, English memo template, and English source documents. Preserve source IDs and all quoted claims exactly.

- [ ] **Step 3: Run heading, numeric, link, and omission parity review**

Use the Task 5 parity commands for all five pairs. Additionally search both instructor targets for all four source IDs and all three acceptable recommendation patterns. Resolve every relative link.

- [ ] **Step 4: Commit Session 2**

```bash
git add professional-course/he/materials/session-02-deep-research
git commit -m "content: translate professional session 2 to Hebrew"
```

### Task 7: Translate Session 3 - Spreadsheet Engineering

**Files:**
- Create: `professional-course/he/materials/session-03-spreadsheet-engineering/README.md`
- Create: `professional-course/he/materials/session-03-spreadsheet-engineering/student/AF-OPS-301-assignment-brief.md`
- Create: `professional-course/he/materials/session-03-spreadsheet-engineering/instructor/AF-TRN-300-instructor-guide.md`
- Create: `professional-course/he/materials/session-03-spreadsheet-engineering/instructor/AF-TRN-300-step-by-step-lesson-script.md`
- Create: `professional-course/he/materials/session-03-spreadsheet-engineering/instructor/AF-TRN-301-answer-key.md`
- Reference: the same five paths without the `professional-course/he/` prefix

- [ ] **Step 1: Confirm the targets are absent, then translate all five files**

Apply the Translation Acceptance Contract. Preserve profiling-before-editing, the data contract, clean working table, dynamic summary, state-machine behavior, validation sequence, required test cases, canonical expectations, human-confirmation rows, formula expectations, and automation acceptance criteria.

- [ ] **Step 2: Preserve data literals and canonical files**

Keep every CSV, AF-OPS-302 specification template, column name, formula, status value, SKU, unit, and alert literal in English. Link to the messy inventory, contract template, automation specification, reference clean inventory, and rubric at their canonical paths with explicit Hebrew English-material labels.

- [ ] **Step 3: Run heading, numeric, field-name, and link parity review**

Use the Task 5 parity commands. Extract backticked literals from each source/target pair and confirm the sets match wherever the source uses literal fields or formulas. Resolve every local link.

- [ ] **Step 4: Commit Session 3**

```bash
git add professional-course/he/materials/session-03-spreadsheet-engineering
git commit -m "content: translate professional session 3 to Hebrew"
```

### Task 8: Translate Session 4 - Technical Communication

**Files:**
- Create: `professional-course/he/materials/session-04-technical-communication/README.md`
- Create: `professional-course/he/materials/session-04-technical-communication/student/AF-COM-401-presentation-brief.md`
- Create: `professional-course/he/materials/session-04-technical-communication/instructor/AF-TRN-400-instructor-guide.md`
- Create: `professional-course/he/materials/session-04-technical-communication/instructor/AF-TRN-400-step-by-step-lesson-script.md`
- Create: `professional-course/he/materials/session-04-technical-communication/instructor/AF-TRN-401-answer-key.md`
- Reference: the same five paths without the `professional-course/he/` prefix

- [ ] **Step 1: Confirm the targets are absent, then translate all five files**

Apply the Translation Acceptance Contract. Preserve the six-slide constraint, audience/decision framing, evidence hierarchy, storyboard and critique sequence, visual-integrity rules, required narrative, instructor interventions, acceptable recommendation structure, red flags, and debrief questions.

- [ ] **Step 2: Preserve canonical communication evidence**

Keep AF-COM-402, AF-COM-403, AF-COM-404, and the rubric canonical English. Retain all AquaForge names, roles, quotations, claims, and presentation labels exactly where they function as workplace inputs. Label each canonical link.

- [ ] **Step 3: Run heading, numeric, stakeholder-name, and link parity review**

Use the Task 5 parity commands. Confirm every named source-note contributor present in the English instructor materials remains present in the Hebrew files. Resolve all links.

- [ ] **Step 4: Commit Session 4**

```bash
git add professional-course/he/materials/session-04-technical-communication
git commit -m "content: translate professional session 4 to Hebrew"
```

### Task 9: Translate Session 5 - Operations Planning

**Files:**
- Create: `professional-course/he/materials/session-05-operations-planning/README.md`
- Create: `professional-course/he/materials/session-05-operations-planning/student/AF-OPS-501-mission-brief.md`
- Create: `professional-course/he/materials/session-05-operations-planning/instructor/AF-TRN-500-instructor-guide.md`
- Create: `professional-course/he/materials/session-05-operations-planning/instructor/AF-TRN-500-step-by-step-lesson-script.md`
- Create: `professional-course/he/materials/session-05-operations-planning/instructor/AF-TRN-501-answer-key.md`
- Reference: the same five paths without the `professional-course/he/` prefix

- [ ] **Step 1: Confirm the targets are absent, then translate all five files**

Apply the Translation Acceptance Contract. Preserve hard/soft constraints, buffers, budget checks, staged verification, both required contingencies, calendar-ready output, every date and time, the strong itinerary pattern, validation expectations, and red flags.

- [ ] **Step 2: Preserve canonical planning artifacts**

Keep AF-OPS-502/503/504/505 and the rubric canonical English. Do not translate CSV headers, place names, currency values, dates, calendar fields, or status values. Label each link as English workplace material.

- [ ] **Step 3: Run heading, numeric, date, and link parity review**

Use the Task 5 parity commands. Separately compare every `2026-` date and every currency/time literal across the answer-key pair. Resolve every link.

- [ ] **Step 4: Commit Session 5**

```bash
git add professional-course/he/materials/session-05-operations-planning
git commit -m "content: translate professional session 5 to Hebrew"
```

### Task 10: Translate Session 6 - Bounded Agent Workflows

**Files:**
- Create: `professional-course/he/materials/session-06-agent-workflows/README.md`
- Create: `professional-course/he/materials/session-06-agent-workflows/student/AF-AUTO-601-mission-brief.md`
- Create: `professional-course/he/materials/session-06-agent-workflows/instructor/AF-TRN-600-instructor-guide.md`
- Create: `professional-course/he/materials/session-06-agent-workflows/instructor/AF-TRN-600-step-by-step-lesson-script.md`
- Create: `professional-course/he/materials/session-06-agent-workflows/instructor/AF-TRN-601-answer-key.md`
- Reference: the same five paths without the `professional-course/he/` prefix

- [ ] **Step 1: Confirm the targets are absent, then translate all five files**

Apply the Translation Acceptance Contract. Preserve trigger/input contracts, state stores, detection rules, duplicate suppression, incident lifecycle, stale-data logic, retries, recovery, observability, test timeline, notification content, and every human-control boundary.

- [ ] **Step 2: Preserve canonical agent artifacts and state literals**

Keep AF-AUTO-602, AF-DATA-601, AF-AUTO-603, and the rubric canonical English. Do not translate schema fields, state names, event values, supplier IDs, or notification contract literals. Label each link.

- [ ] **Step 3: Run heading, numeric, state-transition, and link parity review**

Use the Task 5 parity commands. Extract code-formatted state names from both answer keys and scripts and confirm the literal sets match. Resolve every local link.

- [ ] **Step 4: Commit Session 6**

```bash
git add professional-course/he/materials/session-06-agent-workflows
git commit -m "content: translate professional session 6 to Hebrew"
```

### Task 11: Translate Session 7 - Parametric CAD

**Files:**
- Create: `professional-course/he/materials/session-07-parametric-cad/README.md`
- Create: `professional-course/he/materials/session-07-parametric-cad/student/AF-CAD-701-design-brief.md`
- Create: `professional-course/he/materials/session-07-parametric-cad/instructor/AF-TRN-700-instructor-guide.md`
- Create: `professional-course/he/materials/session-07-parametric-cad/instructor/AF-TRN-700-step-by-step-lesson-script.md`
- Create: `professional-course/he/materials/session-07-parametric-cad/instructor/AF-TRN-701-answer-key.md`
- Reference: the same five paths without the `professional-course/he/` prefix

- [ ] **Step 1: Confirm the targets are absent, then translate all five files**

Apply the Translation Acceptance Contract. Preserve enclosure and board interfaces, manufacturing assumptions, required parameters/outputs, design-contract sequence, starter-model interpretation, parameter sweep, fit-test expectation, manufacturing review, acceptable limitations, and red flags.

- [ ] **Step 2: Preserve all CAD literals and canonical files**

Keep AF-CAD-702, AF-CAD-703, AF-CAD-704, and the rubric canonical English. Do not translate OpenSCAD identifiers, parameter names, dimensions, units, tolerances, file names, or validation-result literals. Label every link.

- [ ] **Step 3: Run heading, numeric, parameter-name, and link parity review**

Use the Task 5 parity commands. Extract backticked identifiers and every `mm` value from source/target pairs and confirm exact parity. Resolve every local link.

- [ ] **Step 4: Commit Session 7**

```bash
git add professional-course/he/materials/session-07-parametric-cad
git commit -m "content: translate professional session 7 to Hebrew"
```

### Task 12: Translate The Integrated Capstone

**Files:**
- Create: `professional-course/he/capstone/README.md`
- Create: `professional-course/he/capstone/student/AF-CAP-001-mission-brief.md`
- Create: `professional-course/he/capstone/instructor/AF-CAP-099-step-by-step-facilitation-script.md`
- Create: `professional-course/he/capstone/instructor/AF-CAP-100-capstone-teaching-guide.md`
- Create: `professional-course/he/capstone/instructor/AF-CAP-101-instructor-guide.md`
- Reference: the same five paths without the `professional-course/he/` prefix

- [ ] **Step 1: Confirm the targets are absent, then translate the overview and student brief**

Apply the Translation Acceptance Contract. Preserve all seven mandatory workstreams, final submission list, evidence/register requirements, recommendation options, dependencies, traceability requirements, and non-negotiable boundaries.

- [ ] **Step 2: Translate all three instructor documents**

Preserve the complete Day 1 through final-defense sequence, every block duration, instructor operating rules, checkpoints, controlled-change exercise, cross-deliverable audit, challenge questions, defensible recommendation patterns, intervention guidance, minimum mastery evidence, red flags, and completion decision.

- [ ] **Step 3: Preserve canonical capstone artifacts**

Keep AF-CAP-002/003/004 and AF-CAP-102 canonical English. Link them with explicit English-material labels. Preserve all register columns, deliverable names, document IDs, and status literals.

- [ ] **Step 4: Run heading, numeric, workstream, and link parity review**

Use the Task 5 parity commands. Confirm the translated student brief still has seven numbered workstreams and the facilitation script retains Blocks 1-13. Resolve every local link.

- [ ] **Step 5: Commit the capstone**

```bash
git add professional-course/he/capstone
git commit -m "content: translate professional capstone to Hebrew"
```

### Task 13: Add The Completeness Manifest And Validator

**Files:**
- Create: `professional-course/he/localization-manifest.json`
- Create: `scripts/validate-professional-localization.mjs`
- Verify: all 40 mapped English/Hebrew document pairs
- Verify: `site/assets/js/course.js`

- [ ] **Step 1: Create the exact 40-entry manifest**

Use this object shape:

```json
{
  "version": 1,
  "canonicalLanguage": "en",
  "locale": "he",
  "entries": [
    {
      "source": "materials/session-01-prompting/README.md",
      "target": "professional-course/he/materials/session-01-prompting/README.md",
      "kind": "overview",
      "status": "reviewed"
    }
  ]
}
```

Add exactly the 40 source/target pairs listed in the approved design: five per session for Sessions 1-7, plus five capstone files. Use `overview`, `student`, `instructor`, or `answer-key` as appropriate and `reviewed` for every completed entry.

- [ ] **Step 2: Create an independent required-source inventory in the validator**

In `scripts/validate-professional-localization.mjs`, hard-code the same 40 canonical source paths as the required release inventory. This independent list ensures deleting a manifest entry cannot make validation pass. Use only `node:fs`, `node:path`, and `node:url`.

- [ ] **Step 3: Implement structural validation**

The validator must accumulate all failures and exit once with status 1. Check:

```text
- manifest parses and has version 1, canonicalLanguage en, locale he;
- entries contains exactly 40 items;
- every required source appears exactly once and no extra source appears;
- every source and target path is repository-relative, normalized, and unique;
- both files exist and every target contains at least one Hebrew character in \u0590-\u05ff;
- kind is one of the four allowed values and status is reviewed;
- professional-course/he/README.md and ai-geography.md exist;
- exactly 42 Markdown files exist under professional-course/he/;
- no .csv, .scad, source-data directory, or copied company tree exists there.
```

- [ ] **Step 4: Implement Markdown-link and catalog validation**

Extract Markdown destinations with `/\[[^\]]*\]\(([^)]+)\)/g`. Ignore hashes and `http:`, `https:`, `mailto:`, and `tel:` URLs. Strip a destination hash/query, resolve relative to the containing file, and require the resolved local file to exist.

For every target, reject local links ending in `.csv` or `.scad` if they resolve inside `professional-course/he/`. Read `site/assets/js/course.js` and require every manifest target path to appear in the catalog. Require canonical artifact paths to remain outside the Hebrew tree.

- [ ] **Step 5: Implement parity diagnostics**

For every pair, compare:

```text
- number and levels of Markdown headings;
- number of fenced-code delimiters;
- set of AquaForge document IDs matching AF-[A-Z]+-[0-9]+;
- normalized digit-containing tokens.
```

Heading-level, code-fence, or document-ID differences are release failures. Print numeric-token differences as a clearly labeled manual-review report rather than failing automatically, because Hebrew punctuation and reordered ranges can differ legitimately. End successful output with `Professional Hebrew localization valid: 40 mapped documents, 42 Hebrew Markdown files`.

- [ ] **Step 6: Run and correct all reported failures**

Run:

```bash
node scripts/validate-professional-localization.mjs
node scripts/check-professional-i18n.mjs
```

Expected: both scripts exit 0 with their success messages. Review every numeric diagnostic against the source before accepting it.

- [ ] **Step 7: Commit the release guard**

```bash
git add professional-course/he/localization-manifest.json scripts/validate-professional-localization.mjs
git commit -m "test: validate professional Hebrew localization"
```

### Task 14: Verify The Full Browser Experience

**Files:**
- Create: `tests/professional-i18n.spec.js`
- Verify: all modified site and localized content files

- [ ] **Step 1: Start the static site locally**

Run:

```bash
python3 -m http.server 4173
```

Expected: the server remains available at `http://127.0.0.1:4173/`. Keep it running through browser verification.

- [ ] **Step 2: Write the Playwright behavior test**

Create `tests/professional-i18n.spec.js` with tests that:

```text
1. open index.html, select Hebrew, and expect the professional card href to contain ?lang=he;
2. open that card and assert html lang=he, dir=rtl, Hebrew hero text, and the Hebrew button pressed;
3. mark Mission 1 complete, switch to Instructor, switch to English and back to Hebrew, and assert completion and mode persist;
4. for missions 1-7 and capstone, open the first student resource and first instructor resource in Hebrew and assert the URL source begins professional-course/he/;
5. open one canonical English artifact from Hebrew mode and assert html/article direction remains LTR while the back link is Hebrew and returns to professional.html?lang=he#missions;
6. open a translated Hebrew document and assert RTL content, Hebrew source label, and the same Hebrew professional back destination;
7. open professional.html?lang=en with saved Hebrew and assert the valid query wins;
8. open professional.html?lang=invalid with saved Hebrew and assert the saved preference wins;
9. collect pageerror and console error events and require both arrays to stay empty.
```

Use fresh browser contexts for precedence tests. Do not rely on one test's localStorage state in another.

- [ ] **Step 3: Add responsive overflow and screenshot checks**

Run the Hebrew professional page in Student and Instructor modes at `1440x900` and `390x844`. At each viewport assert:

```javascript
await expect(page.locator('html')).toHaveAttribute('dir','rtl');
expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
```

Capture screenshots to `/tmp/professional-hebrew-desktop.png` and `/tmp/professional-hebrew-mobile.png`. Inspect both for header wrapping, segmented-control stability, mission-card alignment, long English-artifact labels, tables, mixed-direction identifiers, and overlapping text.

- [ ] **Step 4: Run browser tests and inspect screenshots**

Run:

```bash
npx playwright test tests/professional-i18n.spec.js --reporter=line
```

Expected: all behavior and viewport cases pass. Open both `/tmp` screenshots with the image viewer and correct any visible layout defects before continuing.

- [ ] **Step 5: Run the full release verification**

Run:

```bash
node scripts/check-professional-i18n.mjs
node scripts/validate-professional-localization.mjs
node --check site/assets/js/course.js
node --check site/assets/js/index-i18n.js
node --check site/assets/js/markdown-viewer.js
node --check site/assets/js/hebrew-document-context.js
npx playwright test tests/professional-i18n.spec.js --reporter=line
git diff --check
git status --short --branch
```

Expected: all checks pass; Git shows only the new Playwright test uncommitted.

- [ ] **Step 6: Commit browser coverage**

```bash
git add tests/professional-i18n.spec.js
git commit -m "test: cover professional Hebrew course flow"
```

- [ ] **Step 7: Review the complete branch diff**

Run:

```bash
git diff --stat main...HEAD
git log --oneline main..HEAD
git status --short --branch
```

Expected: the branch contains the approved design, bilingual portal/routing, 42 Hebrew Markdown files, 40-entry manifest, validators, and browser test; the working tree is clean.
