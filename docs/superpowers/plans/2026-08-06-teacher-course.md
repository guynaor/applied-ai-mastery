# Teacher Track Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual, full-length K–12 Teacher track with seven applied-AI missions and a teacher-reviewed capstone.

**Architecture:** Add a dedicated `teacher.html` portal and `teacher-course/` content tree rather than adapting the AquaForge materials. A small, teacher-specific metadata script renders bilingual missions and links; English canonical material and Hebrew translations remain separate, while shared artifacts use fictional/public data. Extend the document viewer’s three-way course context and add static Node assertion scripts for portal and localization contracts.

**Tech Stack:** Static HTML, vanilla JavaScript, CSS, Markdown, CSV, Node.js assertion scripts.

---

## File structure

- `teacher.html` — Teacher portal shell, navigation, Student/Instructor modes, and capstone panel.
- `site/assets/js/teacher-course.js` — bilingual UI copy, eight-mission metadata, localized resource routing, and namespaced browser progress state.
- `teacher-course/` — English canonical overview, journal, mission packages, capstone, and fictional work artifacts.
- `teacher-course/he/` — Hebrew overview, journal, translations, and localization manifest; no copied canonical CSV/HTML artifacts.
- `index.html`, `site/assets/js/index-i18n.js` — third card and revised “three tracks” catalogue copy.
- `site/assets/js/markdown-viewer.js`, `site/assets/js/hebrew-document-context.js` — Teacher document context, Hebrew preference, and correct return navigation.
- `scripts/check-teacher-course.mjs` — portal and safety/link contract.
- `scripts/validate-teacher-localization.mjs` — source/translation inventory and link parity contract.

### Task 1: Establish the Teacher portal contract before implementation

**Files:**
- Create: `scripts/check-teacher-course.mjs`
- Modify: `scripts/check-professional-i18n.mjs`

- [ ] **Step 1: Write the failing static contract**

Create `scripts/check-teacher-course.mjs` using `node:assert/strict`, `existsSync`, and `readFileSync`. Assert that `teacher.html` has English/Hebrew controls, `data-teacher-journal-link`, Student/Instructor mode controls, `data-session-grid`, and a capstone link; that `teacher-course.js` contains eight mission records, `aam-teacher-language`, `aam-teacher-mode`, `teacher-course/he/`, and Mission 6/7 safety phrases; and that every local resource path in the mission metadata exists.

Also extend `scripts/check-professional-i18n.mjs` into a selector-level check that expects `data-teacher-link` in both `index.html` and `index-i18n.js`, plus `teacher.html?lang=` routing.

- [ ] **Step 2: Run the contract to verify it fails**

Run: `node scripts/check-teacher-course.mjs`

Expected: failure because `teacher.html` and `site/assets/js/teacher-course.js` do not yet exist.

- [ ] **Step 3: Commit the red test**

```bash
git add scripts/check-teacher-course.mjs scripts/check-professional-i18n.mjs
git commit -m "test: define teacher course contract"
```

### Task 2: Add course selection and Teacher portal shell

**Files:**
- Create: `teacher.html`
- Modify: `index.html`
- Modify: `site/assets/js/index-i18n.js`

- [ ] **Step 1: Add the selector card**

Change the home-page catalogue wording from two tracks to three. Add a third `.course-choice` anchor with `data-teacher-link`, default `teacher.html?lang=en`, and the English/Hebrew labels:

```text
Teacher track / המסלול למורים
Applied AI for K–12 Teaching / AI יישומי להוראה ב-K–12
7 missions + integrated capstone / 7 משימות + פרויקט מסכם משולב
```

In `setLanguage`, assign `teacherLink.href = \`teacher.html?lang=${lang}\`` alongside the existing professional route. Update shared-philosophy wording to “all three courses.”

- [ ] **Step 2: Create `teacher.html` from the Professional portal pattern**

Use the same accessible shell, header, language switcher, Student/Instructor mode panel, progress bar, mission grid, and document links as `professional.html`. Rename all IDs and hooks only when needed to distinguish Teacher-specific header links: `#missions`, `#capstone`, `data-teacher-journal-link`, `data-teacher-capstone-link`, and `data-teacher-overview-link`. Do not include AquaForge/company sections.

Set the Teacher-specific hero to explain that the course turns responsible AI into lesson plans, research briefs, gradebook analyses, presentations, classroom workflows, and simple apps, with teacher judgment retained. The capstone panel must list lesson sequence, differentiation, assessment rubric, fictional-data analysis, family communication draft, presentation, and reflection.

- [ ] **Step 3: Run the selector and portal portions of the contract**

Run: `node scripts/check-professional-i18n.mjs && node scripts/check-teacher-course.mjs`

Expected: selector assertions pass; Teacher contract still reports that the metadata script is missing.

- [ ] **Step 4: Commit the portal shell**

```bash
git add index.html site/assets/js/index-i18n.js teacher.html
git commit -m "feat: add teacher course portal"
```

### Task 3: Implement bilingual Teacher portal metadata and viewer context

**Files:**
- Create: `site/assets/js/teacher-course.js`
- Modify: `site/assets/js/markdown-viewer.js`
- Modify: `site/assets/js/hebrew-document-context.js`
- Modify: `teacher.html`

- [ ] **Step 1: Implement the eight-record `sessions` metadata array**

Use the `course.js` object shape (`n`, bilingual `role`, `title`, `summary`, `student`, `instructor`) and helper shape (`text`, `translated`, `artifact`). The mission titles must be: Prompting for Instructional Design; Research and Source Synthesis; Gradebook and Learning-Data Spreadsheets; Classroom Presentations and Visual Learning Artifacts; Lesson and Unit Planning Under Constraints; Bounded Teacher Workflows; Classroom Resources and Simple Apps; and Capstone: Teacher-Reviewed K–12 Unit Plan.

Every first student and instructor link is bilingual Markdown; CSV and HTML artifacts are canonical English. Mission 6 must link to an agent specification and test log; Mission 7 must link to a starter classroom resource hub.

- [ ] **Step 2: Implement isolated state and language behavior**

Mirror `course.js` rendering behavior using only `aam-teacher-language`, `aam-teacher-mode`, and `aam-teacher-completed`, with eight-item progress. Use `?lang=` as the initial language override. In `setLanguage`, update Teacher journal, capstone, and overview links to English or Hebrew Markdown paths; do not use an unconfigured external Google Doc URL.

- [ ] **Step 3: Make document navigation recognize the Teacher context**

In `markdown-viewer.js`, infer `teacher` when `source.startsWith('teacher-course/')`; allow `context=teacher`; include `teacherHebrewSource`, `teacherHebrewPreference`, and Teacher return targets (`teacher.html#missions` / `teacher.html?lang=he#missions`) and labels. In `hebrew-document-context.js`, set `aam-teacher-language` for `teacher-course/he/` sources and send Hebrew documents back to the Teacher portal.

- [ ] **Step 4: Run the portal contract**

Run: `node scripts/check-teacher-course.mjs`

Expected: it fails only on content paths that have not yet been created.

- [ ] **Step 5: Commit the behavior**

```bash
git add teacher.html site/assets/js/teacher-course.js site/assets/js/markdown-viewer.js site/assets/js/hebrew-document-context.js
git commit -m "feat: render bilingual teacher course"
```

### Task 4: Author English missions 1–3 and their fictional artifacts

**Files:**
- Create: `teacher-course/README.md`
- Create: `teacher-course/student/ai-learning-journal.md`
- Create: `teacher-course/materials/session-01-prompting/{README.md,student/EDU-TRN-100-lesson-design-brief.md,student/EDU-TRN-101-context-cards.md,student/EDU-TRN-102-prompt-comparison.md,student/EDU-TRN-103-risen-template.md,instructor/EDU-TRN-100-step-by-step-lesson-script.md,instructor/EDU-TRN-100-instructor-guide.md,instructor/EDU-TRN-101-answer-key.md,instructor/EDU-TRN-102-rubric.csv}`
- Create: `teacher-course/materials/session-02-research/{README.md,student/EDU-RD-201-teaching-brief.md,student/EDU-RD-202-evidence-matrix.csv,student/EDU-RD-203-research-memo-template.md,sources/EDU-SRC-201-district-guidance.md,sources/EDU-SRC-202-vendor-claim.md,sources/EDU-SRC-203-classroom-observation.md,sources/EDU-SRC-204-research-summary.md,instructor/EDU-TRN-200-step-by-step-lesson-script.md,instructor/EDU-TRN-200-instructor-guide.md,instructor/EDU-TRN-201-answer-key.md,instructor/EDU-TRN-202-rubric.csv}`
- Create: `teacher-course/materials/session-03-gradebook/{README.md,student/EDU-DATA-301-fictional-gradebook.csv,student/EDU-DATA-302-data-contract-template.csv,student/EDU-OPS-301-analysis-brief.md,student/EDU-OPS-302-teacher-review-template.md,instructor/EDU-TRN-300-step-by-step-lesson-script.md,instructor/EDU-TRN-300-instructor-guide.md,instructor/EDU-TRN-301-answer-key.md,instructor/EDU-TRN-302-rubric.csv}`

- [ ] **Step 1: Write the English course overview and journal**

State the K–12 scope, English/Hebrew policy, use of fictional data, and human-review limits. Build an eight-tab teacher journal using the existing `journal-tab` metadata format: home, reusable prompt/workflow library, reflection, Missions 1–7, and capstone. Every tab requires evidence, verification, privacy check, and next-step reflection.

- [ ] **Step 2: Author Mission 1 as lesson-design prompting**

Use the fictional “River Systems” inquiry lesson. Include four grade-band context cards (K–2, 3–5, 6–8, 9–12), learning objective, time/resource/accessibility constraints, output comparison, and a reusable RISEN prompt. The answer key explains why the teacher must verify standards alignment and age appropriateness.

- [ ] **Step 3: Author Mission 2 as source-bounded teaching research**

Provide four intentionally unequal fictional sources on a classroom claim, an evidence matrix, and a research memo. Require learners to distinguish evidence, vendor claims, observation, and uncertainty; the final brief recommends what is safe to try and what must be checked locally.

- [ ] **Step 4: Author Mission 3 as fictional gradebook analysis**

Provide a clearly labeled fictional gradebook with no names, IDs, or protected data. Require formula-based cleaning and patterns for teacher review, then a communication-neutral analysis brief. Repeat the prohibition on autonomous grades, placement, behavior, or intervention decisions.

- [ ] **Step 5: Run the course contract and commit**

Run: `node scripts/check-teacher-course.mjs`

```bash
git add teacher-course
git commit -m "content: add teacher course foundations"
```

### Task 5: Author English missions 4–5

**Files:**
- Create: `teacher-course/materials/session-04-visual-artifacts/{README.md,student/EDU-COM-401-presentation-brief.md,student/EDU-COM-402-source-notes.md,student/EDU-COM-403-storyboard-template.csv,student/EDU-COM-404-accessibility-critique.md,instructor/EDU-TRN-400-step-by-step-lesson-script.md,instructor/EDU-TRN-400-instructor-guide.md,instructor/EDU-TRN-401-answer-key.md,instructor/EDU-TRN-402-rubric.csv}`
- Create: `teacher-course/materials/session-05-unit-planning/{README.md,student/EDU-OPS-501-unit-brief.md,student/EDU-OPS-502-constraints.csv,student/EDU-OPS-503-learning-sequence-template.csv,student/EDU-OPS-504-differentiation-plan.md,student/EDU-OPS-505-family-calendar-template.csv,instructor/EDU-TRN-500-step-by-step-lesson-script.md,instructor/EDU-TRN-500-instructor-guide.md,instructor/EDU-TRN-501-answer-key.md,instructor/EDU-TRN-502-rubric.csv}`

- [ ] **Step 1: Author Mission 4 visual-artifact package**

Use a fictional “Local Water, Shared Responsibility” lesson deck. Require a six-slide structure, source notes, alt-text/caption plan, age-appropriate language, and a critique that rejects misleading visuals or unsupported facts. Include variations for early-elementary read-aloud, upper-elementary guided inquiry, middle-school evidence discussion, and high-school civic argument.

- [ ] **Step 2: Author Mission 5 constrained unit-plan package**

Use a two-week interdisciplinary water unit. The constraints file must include bell schedule, materials, inclusion/accommodation needs, assessment dates, and contingency conditions. Learners deliver a feasible lesson sequence, differentiation plan, family-calendar draft, and explicit teacher review checkpoints.

- [ ] **Step 3: Run the contract and commit**

Run: `node scripts/check-teacher-course.mjs`

```bash
git add teacher-course/materials/session-04-visual-artifacts teacher-course/materials/session-05-unit-planning
git commit -m "content: add teacher planning missions"
```

### Task 6: Author English missions 6–7 with the agreed agent and app scope

**Files:**
- Create: `teacher-course/materials/session-06-bounded-workflows/{README.md,student/EDU-AUTO-601-workflow-brief.md,student/EDU-AUTO-602-agent-specification-template.md,student/EDU-DATA-601-public-curriculum-snapshots.csv,student/EDU-AUTO-603-test-log-template.csv,instructor/EDU-TRN-600-step-by-step-lesson-script.md,instructor/EDU-TRN-600-instructor-guide.md,instructor/EDU-TRN-601-answer-key.md,instructor/EDU-TRN-602-rubric.csv}`
- Create: `teacher-course/materials/session-07-classroom-apps/{README.md,student/EDU-APP-701-resource-hub-brief.md,student/EDU-APP-702-resource-inventory.csv,student/EDU-APP-703-starter-resource-hub.html,student/EDU-APP-704-accessibility-test-log.md,instructor/EDU-TRN-700-step-by-step-lesson-script.md,instructor/EDU-TRN-700-instructor-guide.md,instructor/EDU-TRN-701-answer-key.md,instructor/EDU-TRN-702-rubric.csv}`

- [ ] **Step 1: Author Mission 6 bounded-workflow package**

Specify—not deploy—an unattended assistant that monitors fictional public curriculum update snapshots and prepares a weekly planning digest. The specification must include permitted inputs, excluded student data, state/duplicate rules, schedule, test cases, audit log, stop conditions, failure behavior, and a mandatory teacher approval before sending or publishing anything. Explicitly disallow grades, behavioral decisions, placement, and external messages.

- [ ] **Step 2: Author Mission 7 simple-app package**

Build from a local, dependency-free starter resource hub (HTML/CSS/JS in one file) using only fictional/public materials. The brief supports variants such as vocabulary practice, lab-group rotations, resource hub, or parent-night page, but the delivered scenario is a student-facing water-unit resource hub. Require keyboard navigation, readable contrast, alt text, age suitability, and no data collection.

- [ ] **Step 3: Run the contract and commit**

Run: `node scripts/check-teacher-course.mjs`

```bash
git add teacher-course/materials/session-06-bounded-workflows teacher-course/materials/session-07-classroom-apps
git commit -m "content: add teacher workflow and app missions"
```

### Task 7: Author the English capstone

**Files:**
- Create: `teacher-course/capstone/{README.md,student/EDU-CAP-001-unit-plan-brief.md,student/EDU-CAP-002-evidence-register.csv,student/EDU-CAP-003-deliverable-register.csv,student/EDU-CAP-004-decision-log.csv,instructor/EDU-CAP-099-step-by-step-facilitation-script.md,instructor/EDU-CAP-100-capstone-teaching-guide.md,instructor/EDU-CAP-101-instructor-guide.md,instructor/EDU-CAP-102-rubric.csv}`

- [ ] **Step 1: Write the capstone brief and artifacts**

Require a teacher-reviewed K–12 water unit plan incorporating a lesson sequence, grade-band differentiation, evidence-based content choice, assessment rubric, fictional gradebook pattern analysis, family communication draft, six-slide deck, and reflection. Make the optional extension either the local resource hub or the bounded planning-digest design, never real deployment.

- [ ] **Step 2: Write facilitation, answer, and rubric materials**

Require traceability from sources and constraints to every consequential choice. The rubric assesses instructional fit, evidence quality, differentiation, accessibility, privacy/safety boundaries, verification, and explicit human judgment rather than polish alone.

- [ ] **Step 3: Run the contract and commit**

Run: `node scripts/check-teacher-course.mjs`

```bash
git add teacher-course/capstone
git commit -m "content: add teacher course capstone"
```

### Task 8: Localize the full Teacher course to Hebrew

**Files:**
- Create: `teacher-course/he/README.md`
- Create: `teacher-course/he/student/ai-learning-journal.md`
- Create: `teacher-course/he/localization-manifest.json`
- Create: Hebrew Markdown counterparts for every English `README.md`, `student/*.md`, and `instructor/*.md` file created in Tasks 4–7, retaining the same relative structure beneath `teacher-course/he/`.
- Create: `scripts/validate-teacher-localization.mjs`

- [ ] **Step 1: Write the localization validator first**

Copy the structural approach of `validate-professional-localization.mjs`, but use `teacher-course/he` and the Teacher source inventory. Enforce a manifest mapping every canonical Markdown source to exactly one Hebrew target, Hebrew text presence, matching heading/code-fence/document-ID structure, valid local links, and no duplicated `.csv` or `.html` artifacts in the Hebrew tree. Include the three locale-only documents: Hebrew overview, Hebrew journal, and Hebrew AI geography guide.

- [ ] **Step 2: Run it to verify it fails**

Run: `node scripts/validate-teacher-localization.mjs`

Expected: failure because the Hebrew manifest and translations do not exist.

- [ ] **Step 3: Translate instructional materials and add localized navigation sources**

Translate every overview, mission/capstone brief, instructor script, guide, and answer key into Hebrew while preserving headings, document IDs, fenced code, formulas, and artifact links. Translate the course overview, journal, and an `ai-geography.md` orientation document. Keep canonical artifact labels as “חומר עבודה באנגלית” where needed.

- [ ] **Step 4: Run the localization and course contracts**

Run: `node scripts/validate-teacher-localization.mjs && node scripts/check-teacher-course.mjs`

Expected: both pass and report the full mapped inventory.

- [ ] **Step 5: Commit localized materials**

```bash
git add teacher-course/he scripts/validate-teacher-localization.mjs
git commit -m "content: localize teacher course to Hebrew"
```

### Task 9: Final integration verification and documentation

**Files:**
- Modify: `README.md`
- Modify: `ROADMAP.md` only if it enumerates current tracks or course scope

- [ ] **Step 1: Update repository overview**

Add Teacher to the course catalogue and course progression summary. State that it is bilingual, K–12 adaptable, and uses fictional learning data; retain the existing public-repository warning about instructor materials.

- [ ] **Step 2: Run all relevant static checks**

Run:

```bash
node scripts/check-teacher-course.mjs
node scripts/validate-teacher-localization.mjs
node scripts/check-professional-i18n.mjs
node scripts/check-course-journal-links.mjs
node scripts/check-learning-journal-sources.mjs
git diff --check
```

Expected: every Node script prints its pass message and `git diff --check` has no output.

- [ ] **Step 3: Browser-level manual check**

Serve the repository and verify: the selector shows all three courses in English and Hebrew; Teacher portal renders all eight cards; Student mode hides instructor resources; Instructor mode reveals them; progress reaches 8; English and Hebrew overview, Mission 6, Mission 7, capstone, journal, and document-return navigation all resolve.

- [ ] **Step 4: Commit the integration**

```bash
git add README.md ROADMAP.md
git commit -m "docs: add teacher course to catalogue"
```
