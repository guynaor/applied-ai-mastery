# Personal Course Review Fixes Design

**Date:** 2026-08-03
**Branch:** `fix/personal-course-review-feedback`

## Goal

Resolve the reviewer’s personal-course usability and content findings while keeping the site static, bilingual, and Firebase-only for deployment.

## Scope

### Instructor submission guidance

- Change “Agree one external channel” to “Agree on one external channel.”
- Add Google Classroom to the supported submission channels in English and Hebrew.
- Remove trailing semicolons from fragment-style list items throughout the English instructor review guide and normalize the equivalent Hebrew guide.
- Preserve periods for complete sentences and existing privacy guidance.

### Copyable learning journal

- Add a hidden-by-default document-header command that becomes visible only for:
  - `personal-course/student/ai-learning-journal.md`
  - `personal-course/he/learning-journal.md`
- Label the command “Copy journal template” in English and “העתקת תבנית היומן” in Hebrew.
- After the document loads, copy the rendered journal text to the clipboard so it can be pasted into Google Docs or another document editor.
- Provide localized copied and failure states without changing the journal content or requiring an external document owner.
- Keep the command accessible as a real button with a clear label and visible keyboard focus.

### AI Geography answer checks

- Add concise answer sections immediately after the four quick-check questions in:
  - `materials/shared/AF-REF-001-ai-geography.md`
  - `personal-course/he/ai-geography.md`
  - `professional-course/he/ai-geography.md`
- Answers will distinguish app versus model, explain agent actions, identify a presentation as an artifact, and retain the requirement to verify cited research.

### Personal-course document context

The root cause of the incorrect return link is that the Markdown viewer infers a document’s course only from the destination path. A shared English document under `materials/shared/` therefore loses the personal-course origin.

- Add an explicit `context=personal` query parameter to Markdown links generated while viewing a personal-course document.
- Preserve an explicit context while following further Markdown links.
- Use context when selecting the back link and navigation language, while continuing to use the actual source path to select the document’s text direction.
- Keep shared English content LTR even when its return navigation points to the personal course.
- Default unannotated shared or canonical documents to the professional course for backward compatibility.
- Avoid copying the shared AI Geography document or special-casing its filename.

## Firebase-Only Deployment

### Repository cleanup

- Rewrite `DEPLOYMENT.md` so Firebase Hosting is the only supported deployment platform.
- Update current deployment claims in `README.md` to match.
- Replace active Vercel references in `BETA_READINESS.md` and `ROADMAP.md` with Firebase Hosting language.
- Remove obsolete `vercel.json` configuration.
- Leave historical Vercel entries in `CHANGELOG.md` unchanged.

### Detailed deployment guide

The revised guide will document:

1. Prerequisites: Node.js 18 or later, Firebase project access, and a clean `main` checkout.
2. CLI installation through `npm install -g firebase-tools` or equivalent `npx firebase-tools` commands.
3. Authentication with `firebase login`, `firebase login:list`, and `firebase projects:list`.
4. Project verification using the committed `.firebaserc`, whose default project is `applied-ai-mastery`, plus an explicit `--project applied-ai-mastery` safeguard for production commands.
5. Configuration review explaining that `firebase.json` publishes the repository root and excludes dotfiles, Firebase configuration, and `node_modules`.
6. Local validation with `firebase emulators:start --only hosting`.
7. Optional shareable review deployment with `firebase hosting:channel:deploy <channel-id> --project applied-ai-mastery`.
8. Production deployment from an updated, clean `main` branch with `firebase deploy --only hosting --project applied-ai-mastery`.
9. Post-deployment checks for both tracks, both languages, document links, progress persistence, and browser errors.
10. Rollback through Firebase Console > Hosting > Release history > Roll back.

The guide will state that this repository has no build step and that future Functions or other backend resources must be deployed explicitly rather than by widening the Hosting command accidentally.

## Testing

### Contract tests

Add a focused Node script before production edits. It will verify:

- corrected instructor wording, Google Classroom, and punctuation rules;
- quick-check answer sections in all three AI Geography documents;
- journal-copy UI hooks and localized labels;
- explicit personal context support in the Markdown viewer;
- Firebase-only deployment documentation and removal of `vercel.json`.

The test must fail against the current branch before implementation and pass afterward.

### Browser verification

Using a local static server and Chromium:

- open Personal Lesson 1 and follow the shared AI Geography link;
- confirm the shared English document remains LTR and returns to `personal.html#lessons`;
- open both journal languages and verify the localized copy command;
- trigger the copy command and compare clipboard text with the rendered journal content;
- inspect desktop and mobile layouts for overflow or overlap;
- confirm no browser errors.

### Regression verification

- Run existing personal and professional localization contracts.
- Run JavaScript syntax checks and `git diff --check`.
- Confirm the working tree is clean before publication.
