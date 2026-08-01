# Contributing

Applied AI Mastery uses a feature-branch and pull-request workflow.

## Branching model

Create every substantive change from the latest `main` branch.

Recommended prefixes:

- `feature/` — new course content, platform features, datasets, or materials
- `fix/` — corrections and bug fixes
- `docs/` — documentation-only work
- `refactor/` — structural changes without intended content changes
- `chore/` — maintenance and repository configuration

Examples:

```text
feature/aquaforge-company-foundation
feature/session-03-inventory-workbook
fix/instructor-timer-reset
docs/course-maintenance-policy
```

Keep each branch focused on one coherent outcome.

## Pull requests

Every pull request should include:

1. A concise statement of the learning or technical objective.
2. A summary of the files changed.
3. How the change was checked.
4. Screenshots or sample outputs when presentation matters.
5. Any current tool names or interfaces that may require future maintenance.

Prefer squash merging unless preserving a multi-commit history adds real value.

## Content requirements

Course content should:

- teach durable problem-solving patterns rather than temporary interface tricks;
- distinguish source evidence, inference, and assumptions;
- use synthetic or safely shareable data;
- include realistic failure modes and verification steps;
- provide measurable learning objectives and observable deliverables;
- preserve internal consistency across AquaForge people, products, dates, and document identifiers;
- avoid claiming that generated engineering output is structurally or operationally certified.

## File conventions

Use stable names and document identifiers where appropriate.

Examples:

```text
AF-ENG-014_sensor-housing-requirements.md
AF-QA-002_inspection-checklist.xlsx
AF-PROC-011_supplier-comparison.xlsx
```

Prefer editable source formats alongside exported PDFs.

## Review checklist

Before requesting review:

- [ ] The change has one clear purpose.
- [ ] Links and relative paths work.
- [ ] Student and instructor materials remain consistent.
- [ ] Dates, names, SKUs, revisions, and figures match related files—or conflicts are intentionally part of an exercise.
- [ ] Current AI product details are clearly marked when they may become outdated.
- [ ] Solutions and answer keys are not accidentally exposed in student-facing material.
- [ ] The repository documentation is updated when structure or behavior changes.
