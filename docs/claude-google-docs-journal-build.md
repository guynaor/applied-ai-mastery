# Build the Applied AI Mastery personal learning journals in Google Docs

## Goal

Create two **new** Google Docs from the supplied source files. Do not copy, edit, rename, delete, or change sharing on any existing Google Docs.

The deliverables are:

1. **Applied AI Mastery - Personal Learning Journal (English)**
2. **Applied AI Mastery - Personal Learning Journal (Hebrew)**

## Source of truth

Use these files exactly as the content source:

- English: `personal-course/student/en/ai-learning-journal.md`
- Hebrew: `personal-course/student/he/ai-learning-journal.md`

Each file contains `<!-- journal-tab: ... -->` markers. Each marker defines one top-level Google Docs tab. The marker is metadata only: do not show it in the final document.

## Required tabs, in order

Create these top-level tabs in each document, using the localized title in its source file:

1. Journal home
2. Entry template
3. Prompt library
4. End-of-course reflection
5. Session 1
6. Session 2
7. Session 3
8. Session 4
9. Session 5
10. Session 6
11. Session 7

There must be exactly these eleven tabs—no inherited 12-lesson tabs, empty tabs, duplicate tabs, or nested subtabs.

## Formatting requirements

Convert the Markdown source into native Google Docs formatting. Do not paste raw Markdown.

- `#` becomes the tab title / document title style as appropriate.
- `##` becomes a Google Docs heading.
- Markdown tables become native Google Docs tables with a clear header row.
- Lists become native bulleted or numbered lists.
- `**bold**` becomes native bold text.
- Preserve all prompts, questions, evidence fields, reflection questions, and instructional content.
- Do not show Markdown syntax, tab-marker comments, pipe-table characters, or placeholder code.
- Keep Hebrew right-to-left and English left-to-right.

## Content checks before handoff

For both documents, confirm:

- All seven sessions are present and titled from the current source.
- English Session 1 is **“Session 1: Decide What to Do Next.”**
- Hebrew Session 1 is **“מפגש 1: להחליט מה הצעד הבא.”**
- English Session 7 is **“Session 7: Build a Personal System.”**
- Hebrew Session 7 is **“מפגש 7: לבנות מערכת אישית.”**
- No wording refers to a 12-lesson course.
- No raw Markdown is visible.
- Session 2 includes Gemini Deep Research and an evidence matrix.
- Session 4 includes Claude Artifacts and normal/edge-case testing.
- Session 7 includes Claude Desktop, Claude for Chrome as further exploration, OpenClaw as paper-only, a permission map, and an evidence register.

## Sharing and handoff

Set each new document to **Anyone with the link → Viewer**. Do not change the sharing of any older document.

At the end, return:

1. The English document URL
2. The Hebrew document URL
3. A brief confirmation that both documents have exactly eleven named top-level tabs, are formatted natively, and are publicly viewable by link
