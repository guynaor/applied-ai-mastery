# Teacher Track Design

## Purpose

Add a third, standalone Applied AI Mastery course for K–12 teachers. It will teach the same practical AI problem-solving disciplines as the Professional track through credible classroom work. It is a full-length course: seven guided missions and one integrated capstone, with student and instructor material at the same depth as the Professional track.

## Audience and language

The course is adaptable across K–12. Each mission uses a main classroom scenario and includes examples when the teaching decision differs across K–2, grades 3–5, grades 6–8, and grades 9–12.

All public course surfaces and instructional materials are bilingual in English and Hebrew. Source artifacts can remain in English where retaining field names, formulas, prompts, or code is necessary for correct use. Hebrew materials must identify such artifacts as English working material.

## Course structure

The Teacher track is a separate portal page reachable from the course selector. It follows the existing portal conventions: language switcher, student/instructor modes, local-browser progress tracking, Markdown document viewer, and links to student and instructor artifacts.

1. **Prompting for instructional design** — define learning objectives, learner context, constraints, and evidence of learning; compare and improve AI-generated lesson-plan drafts.
2. **Research and source synthesis for teaching** — assess sources, build an evidence matrix, and produce a bounded teaching brief rather than relying on unsupported claims.
3. **Gradebook and learning-data spreadsheets** — clean a fictional gradebook, use formulas and validation, surface patterns for teacher review, and communicate that AI does not assign grades or make high-stakes student decisions.
4. **Classroom presentations and visual learning artifacts** — create an age-appropriate lesson deck or visual learning aid, with source notes, accessibility checks, and a critique checklist.
5. **Lesson and unit planning under classroom constraints** — plan a feasible instructional sequence around time, standards, differentiation, resources, assessments, and contingencies.
6. **Bounded teacher workflows** — specify an unattended workflow for low-risk tasks such as monitoring public curriculum updates, compiling a planning digest, or drafting reminder candidates. It logs actions, suppresses duplicates, excludes student data, and stops for teacher approval before any external communication or consequential action.
7. **Classroom resources and simple apps** — create a small web page or app using fictional/public data, such as a vocabulary-practice chooser, lab-group rotation board, lesson-resource hub, or parent-night information page. It includes accessibility, age-appropriateness, and privacy checks.
8. **Capstone: teacher-reviewed K–12 unit plan** — integrate prior work into a complete unit plan: lesson sequence, differentiated materials, assessment rubric, fictional gradebook analysis, family communication draft, presentation, and an optional resource hub or bounded planning workflow.

## Content packages

Each mission has a package overview, bilingual student brief, supporting templates/source artifacts, a bilingual step-by-step teaching script, teaching guide, answer key, and assessment rubric. The capstone has corresponding student and instructor packages.

Artifacts use realistic but entirely fictional educational data. The content must never request real student records, identifiable student work, protected educational information, credentials, or private classroom communications.

## Safety and human judgment

AI may help draft, compare, summarize, organize, and generate classroom resources. Teachers retain responsibility for pedagogical choices, assessment, grading, safeguarding, family communication, publication, and any action affecting a student.

The course explicitly prohibits autonomous grading, behavioral decisions, individualized placement decisions, or unattended external communication. Automated workflows must have defined inputs and outputs, records of execution, failure behavior, and a named teacher approval point.

## Portal integration

The course selector receives a Teacher course card. The new Teacher portal follows the visual and interaction patterns of `professional.html`, but its copy, mission metadata, capstone, and links point only to teacher-specific materials. It must support English and Hebrew in both modes and retain the existing accessibility conventions.

## Verification

Add or extend static checks to ensure all Teacher portal links resolve, English/Hebrew localized mission paths exist, instructor and student material references are valid, and progress metadata covers eight course items. Run the relevant existing course-link and localization checks, plus a static browser-level sanity check of the course selector and both Teacher language modes.

## Non-goals

This change does not build a real agent service, collect student data, connect to school systems, send messages, perform grading, or offer deployment as a learning-management-system integration. Mission 6 and 7 teach design and prototyping under explicit safety boundaries.
