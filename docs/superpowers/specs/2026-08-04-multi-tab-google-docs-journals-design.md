# Multi-Tab Google Docs Journals Design

## Goal

Replace the four single-tab Google Docs journal templates with polished, multi-tab workbooks based on the reviewer-provided personal journal. Each workbook must provide course-specific writing prompts, preserve a consistent visual system, and remain accessible as a view-only template that students copy before writing.

## Decisions

- Create four new Google Docs by copying the reviewer document so its typography, spacing, dividers, writing areas, and document-tab behavior are preserved.
- Create distinct English and Hebrew workbooks for the personal and professional courses.
- Use course-specific workbook prompts rather than repeating one generic journal entry on every tab.
- Keep the repository Markdown as the canonical content source. Google Docs are the published template representation.
- Update the site to point to the new document URLs, then move the existing four Google Docs to Drive Trash after the replacements pass verification.
- Share every new document as `Anyone with the link` with `Viewer` permission.
- Continue instructing students to choose `File -> Make a copy` before writing.

## Personal Workbook

Each personal workbook contains 16 top-level document tabs:

1. My AI Learning Journal
2. Entry template
3. Prompt library
4. End-of-course reflection
5. Lesson 1: Better Requests
6. Lesson 2: Summary Verification
7. Lesson 3: Decision Workbook
8. Lesson 4: Smart Online Buying
9. Lesson 5: Personal Alert Specification
10. Lesson 6: Trip Planning
11. Lesson 7: Event Planning
12. Lesson 8: Responsible Investment Research
13. Lesson 9: Mini App Build Log
14. Lesson 10: Room and CAD Design
15. Lesson 11: Visual Story Plan
16. Lesson 12: Personal Brand Portfolio

The Hebrew workbook mirrors this inventory with localized tab names, RTL content, and English product or technical terms retained where translation would reduce clarity.

## Professional Workbook

Each professional workbook contains 12 top-level document tabs:

1. My Applied AI Professional Journal
2. Mission entry template
3. Workflow and prompt library
4. End-of-course reflection
5. Mission 1: Prompting and Model Selection
6. Mission 2: Research and Evidence Synthesis
7. Mission 3: Spreadsheet Engineering
8. Mission 4: Presentations and Visual Artifacts
9. Mission 5: Operations Planning
10. Mission 6: Bounded Agent Workflows
11. Mission 7: Parametric CAD
12. Capstone: AquaNode Mini

The Hebrew workbook mirrors this inventory with localized tab names and RTL content while preserving canonical AquaForge identifiers and technical terms.

## Tab Content

The four shared tabs establish reusable course-wide practices:

- The opening tab explains how to make a personal copy, avoid sensitive information, and use the workbook throughout the course.
- The entry template captures the lesson or mission, useful output, reusable prompt or workflow, failure or uncertainty, verification, human judgment, saved evidence, and transfer to real work.
- The library stores reusable prompts, workflows, constraints, successful context, verification steps, and appropriate future uses.
- The final reflection captures growth, strongest evidence, recurring mistakes, verification habits, responsible-use decisions, and next steps.

Every lesson or mission tab adapts the corresponding course workbook and activity. It must contain enough context to be usable without copying the entire lesson, but it must not duplicate instructor-only answers. Each tab ends with verification, evidence, and reflection prompts.

## Formatting System

- Preserve the reviewer document's restrained visual language: dark navy text, pale divider lines, clear heading hierarchy, bold field labels, and generous writing space.
- Use document tabs as the primary navigation. Do not emulate tabs with headings inside one long page.
- Use compact tables, checklists, and labeled writing areas only where they improve completion speed.
- Keep headings short enough to scan in the Google Docs tab sidebar.
- Apply RTL paragraph direction and alignment throughout Hebrew content, while isolating LTR identifiers and English menu commands where necessary.
- Avoid decorative graphics, complex color palettes, and formatting that becomes fragile when students make a copy.

## Creation Workflow

1. Expand the four repository journal sources so every planned tab has an explicit title and content block.
2. Add contract checks for tab inventories, bilingual parity, required verification and privacy prompts, and site URL mappings.
3. Open the reviewer document in the user's authenticated standard Chrome session and create four copies.
4. Rename the copies for course and language.
5. Replace or create document tabs according to the inventories above, preserving the template's formatting.
6. Paste the matching canonical content into each tab and set Hebrew direction where required.
7. Configure each document as `Anyone with the link -> Viewer`.
8. Update the personal and professional course URL maps with the four new document URLs.
9. Verify the replacement documents, sharing settings, and site mappings end to end.
10. Move the four superseded Google Docs to Drive Trash only after the replacement verification succeeds.

Browser automation must verify each tab immediately after creation. If a paste, rename, or tab operation fails, retry only the affected tab rather than recreating the document.

## Verification

- Repository checks confirm 16 personal tabs and 12 professional tabs in both languages.
- English and Hebrew inventories have matching tab positions and purposes.
- Every course-specific tab includes a verification prompt, evidence-saving prompt, and reflection prompt.
- Google Docs inspection confirms tab count, tab names, representative formatting, document title, and saved state.
- Anonymous browser sessions can open all four documents without requesting access.
- Sharing inspection confirms `Anyone with the link` and `Viewer` for all four documents.
- Personal and professional course pages select the correct document after English and Hebrew language switches.
- All journal links open safely in a new tab and display the copy instruction.
- The four superseded document URLs no longer provide the old templates after those documents are moved to Drive Trash.

## Non-Goals

- Do not implement authentication or a backend.
- Do not add student data storage to the static site.
- Do not expose instructor answer keys in the journals.
- Do not automate Google Docs creation through a new API integration; the authenticated browser workflow is sufficient for this one-time migration.
