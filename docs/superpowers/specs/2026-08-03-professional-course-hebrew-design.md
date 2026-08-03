# Professional Course Hebrew Localization Design

**Date:** 2026-08-03
**Status:** Approved

## Goal

Make the complete professional engineering-AI course teachable in Hebrew while
preserving English as the canonical language of the simulated workplace
artifacts. Hebrew mode must provide the same instructional depth, timing,
assessment guidance, safety boundaries, and navigation quality as English mode.

This is a human-authored repository localization. The site must not use runtime
machine translation.

## Scope Boundary

Hebrew mode translates:

- the complete professional-course interface;
- seven session package overviews;
- seven primary student mission briefs;
- all instructor teaching guides;
- all step-by-step instructor scripts;
- all instructor answer keys;
- the capstone overview, student brief, and three instructor guides;
- the professional copy of the AI Geography orientation;
- a Hebrew professional-track overview and language policy.

The following remain canonical English workplace artifacts:

- technical source memos and source notes;
- worksheets and reusable templates;
- CSV files, including rubrics and registers;
- AquaForge company records and governance documents;
- prompts, formulas, field names, document identifiers, and file names;
- OpenSCAD and other code.

Hebrew guides link directly to those canonical files and label them as English
workplace materials. No localized copies of data or templates are created.

## Content Architecture

Localized documents live in a predictable mirror under
`professional-course/he/`:

```text
professional-course/he/
├── README.md
├── ai-geography.md
├── localization-manifest.json
├── materials/
│   ├── session-01-prompting/
│   ├── session-02-deep-research/
│   ├── session-03-spreadsheet-engineering/
│   ├── session-04-technical-communication/
│   ├── session-05-operations-planning/
│   ├── session-06-agent-workflows/
│   └── session-07-parametric-cad/
└── capstone/
```

The directory structure below `materials/` and `capstone/` mirrors the English
instructional paths. Existing AquaForge document IDs remain in localized file
names so instructors can match both versions without ambiguity.

The professional AI Geography copy is intentionally stored in this locale tree
to give it professional-track navigation context. It remains semantically
aligned with the existing personal-track Hebrew orientation.

## Exact Translation Inventory

The manifest maps these English documents to Hebrew counterparts with the same
relative path below `professional-course/he/`.

### Session 1

- `materials/session-01-prompting/README.md`
- `materials/session-01-prompting/student/AF-TRN-100-student-mission-guide.md`
- `materials/session-01-prompting/instructor/AF-TRN-100-instructor-guide.md`
- `materials/session-01-prompting/instructor/AF-TRN-100-step-by-step-lesson-script.md`
- `materials/session-01-prompting/instructor/AF-TRN-101-answer-key.md`

### Session 2

- `materials/session-02-deep-research/README.md`
- `materials/session-02-deep-research/student/AF-RD-201-decision-brief.md`
- `materials/session-02-deep-research/instructor/AF-TRN-200-instructor-guide.md`
- `materials/session-02-deep-research/instructor/AF-TRN-200-step-by-step-lesson-script.md`
- `materials/session-02-deep-research/instructor/AF-TRN-201-answer-key.md`

### Session 3

- `materials/session-03-spreadsheet-engineering/README.md`
- `materials/session-03-spreadsheet-engineering/student/AF-OPS-301-assignment-brief.md`
- `materials/session-03-spreadsheet-engineering/instructor/AF-TRN-300-instructor-guide.md`
- `materials/session-03-spreadsheet-engineering/instructor/AF-TRN-300-step-by-step-lesson-script.md`
- `materials/session-03-spreadsheet-engineering/instructor/AF-TRN-301-answer-key.md`

### Session 4

- `materials/session-04-technical-communication/README.md`
- `materials/session-04-technical-communication/student/AF-COM-401-presentation-brief.md`
- `materials/session-04-technical-communication/instructor/AF-TRN-400-instructor-guide.md`
- `materials/session-04-technical-communication/instructor/AF-TRN-400-step-by-step-lesson-script.md`
- `materials/session-04-technical-communication/instructor/AF-TRN-401-answer-key.md`

### Session 5

- `materials/session-05-operations-planning/README.md`
- `materials/session-05-operations-planning/student/AF-OPS-501-mission-brief.md`
- `materials/session-05-operations-planning/instructor/AF-TRN-500-instructor-guide.md`
- `materials/session-05-operations-planning/instructor/AF-TRN-500-step-by-step-lesson-script.md`
- `materials/session-05-operations-planning/instructor/AF-TRN-501-answer-key.md`

### Session 6

- `materials/session-06-agent-workflows/README.md`
- `materials/session-06-agent-workflows/student/AF-AUTO-601-mission-brief.md`
- `materials/session-06-agent-workflows/instructor/AF-TRN-600-instructor-guide.md`
- `materials/session-06-agent-workflows/instructor/AF-TRN-600-step-by-step-lesson-script.md`
- `materials/session-06-agent-workflows/instructor/AF-TRN-601-answer-key.md`

### Session 7

- `materials/session-07-parametric-cad/README.md`
- `materials/session-07-parametric-cad/student/AF-CAD-701-design-brief.md`
- `materials/session-07-parametric-cad/instructor/AF-TRN-700-instructor-guide.md`
- `materials/session-07-parametric-cad/instructor/AF-TRN-700-step-by-step-lesson-script.md`
- `materials/session-07-parametric-cad/instructor/AF-TRN-701-answer-key.md`

### Capstone

- `capstone/README.md`
- `capstone/student/AF-CAP-001-mission-brief.md`
- `capstone/instructor/AF-CAP-099-step-by-step-facilitation-script.md`
- `capstone/instructor/AF-CAP-100-capstone-teaching-guide.md`
- `capstone/instructor/AF-CAP-101-instructor-guide.md`

In addition to these 40 mapped documents, Hebrew mode adds the locale-only
professional overview and the professional AI Geography copy.

## Translation Policy

Translations preserve meaning and instructional function rather than English
word order.

- Use natural Hebrew for explanations, instructions, questions, and feedback.
- Retain a widely used English professional term in parentheses on first use
  when the Hebrew term alone could make workplace transfer harder.
- Keep AquaForge, product names, people, document IDs, file names, code,
  formulas, prompts, column names, and literal output contracts unchanged.
- Preserve all durations, quantities, dimensions, thresholds, scoring rules,
  submission requirements, and human-approval boundaries.
- Preserve the distinction between fact, assumption, hypothesis, and verified
  conclusion.
- Do not add technical diagnoses, expected results, or evidence that the
  English source does not contain.
- Mark canonical links with `חומר עבודה באנגלית` or a more specific equivalent.
- Instructor translations may explain an English field name in Hebrew, but the
  field name the student must use remains unchanged.

## Professional Page Architecture

`professional.html` receives an English/Hebrew segmented control matching the
personal course. Every visible interface string becomes locale-driven:

- skip link and primary navigation;
- hero and action labels;
- Student/Instructor view panel;
- section headings and progress text;
- mission badges, titles, roles, summaries, and resource-group headings;
- completion controls;
- capstone and company sections;
- footer and document-navigation labels.

`site/assets/js/course.js` keeps one mission model with:

- English and Hebrew display strings;
- English and Hebrew instructional resource paths;
- one shared set of canonical artifact paths;
- localized labels that explicitly identify English artifacts.

Language state is independent of completion state. Switching language must not
reset completed missions or the Student/Instructor mode.

## Language State And Navigation

- Save the professional preference as `aam-professional-language`.
- Accept `?lang=he` and `?lang=en`; a valid query value overrides saved state.
- Ignore invalid language values and fall back to the saved preference, then
  English.
- The course selector passes its active language into the professional link.
- Hebrew mode sets document language to `he`, direction to `rtl`, and the page's
  existing RTL body class.
- English mode restores `en`, `ltr`, and removes the RTL class.
- The document viewer treats `professional-course/he/` as Hebrew content.
- A Hebrew professional document uses `חזרה למסלול המקצועי` and returns to
  `professional.html?lang=he#missions`.
- Opening an English artifact from Hebrew mode leaves the artifact LTR but uses
  a Hebrew back label and returns to the saved Hebrew professional view.

## Error Handling

The static site does not silently substitute English instruction for a missing
Hebrew guide. A missing Hebrew document uses the existing document error state
with Hebrew text. Release validation must catch missing files before deployment.

Malformed stored progress or language data falls back to the existing safe
defaults. English artifact links remain usable even when no translated version
is expected.

## Localization Manifest And Validator

`professional-course/he/localization-manifest.json` is the completeness source
of truth. Each entry contains:

- canonical English path;
- Hebrew path;
- content kind (`overview`, `student`, `instructor`, or `answer-key`);
- status (`reviewed`).

A dependency-free Node script validates that:

- all 40 required mapping entries exist exactly once;
- both mapped files exist;
- every Hebrew target contains Hebrew characters;
- every local Markdown link resolves;
- canonical artifacts are linked from their English path rather than copied
  into the locale tree;
- the professional course catalog references existing localized files;
- no translated CSV, source-data, or code files appear under the Hebrew tree.

The validator cannot prove semantic translation quality. Every document also
receives a manual parity review against its English source.

## Verification

Static checks:

- run the localization validator;
- run JavaScript syntax checks for modified scripts;
- run `git diff --check`;
- confirm the expected Hebrew document count and manifest coverage;
- compare all numeric literals in each mapped pair and review intentional
  differences;
- inspect all changed links.

Browser checks at 1440x900 and 390x844:

- Hebrew course-selector choice opens the professional course in Hebrew;
- the professional language control switches every visible interface region;
- page direction changes between RTL and LTR;
- all eight student and instructor entry links open the expected locale;
- English artifacts are visibly marked and remain LTR;
- Hebrew documents return to the Hebrew professional course;
- progress and view mode persist across language changes;
- tables, mixed-direction terminology, buttons, and long labels do not overlap
  or create horizontal page overflow;
- browser console and page-error collections remain empty.

After merge, deploy the static site to the existing `applied-ai-mastery`
Firebase Hosting project and verify the live Hebrew route and representative
documents.

## Delivery Sequence

1. Add the manifest and validator.
2. Add the professional interface localization and document routing.
3. Translate Sessions 1-2 and verify the pattern.
4. Translate Sessions 3-5.
5. Translate Sessions 6-7.
6. Translate the capstone, overview, and professional AI Geography reference.
7. Run full parity, link, browser, and live-deployment verification.

Work is committed in reviewable batches. The branch is pushed through the
normal pull-request workflow and is not merged until requested.
