# Session reorder — the visual session moves before the build sessions

**Date:** 2026-08-19
**Status:** approved in brainstorming, not implemented
**Scope:** personal course, sessions 4-6, both languages, plus portal and progress state

## Why

Guy taught the course and found the order does not flow. The visual session
— generating images, video, narration and a deck — should come **before**
the two build sessions, not after them. Learner feedback drove this.

## The new order

| New | Session | Was | Slug (unchanged) |
|---:|---|---:|---|
| 1 | Decide What to Do Next | 1 | ask-summarize-decide |
| 2 | Buy With Confidence | 2 | research-buy-monitor |
| 3 | Make a Shared Plan Work | 3 | plan-real-life-together |
| **4** | **From Prompt to Presentation** | **6** | trustworthy-visual-story |
| **5** | **Solve a Recurring Problem** | **4** | build-personal-tool |
| **6** | **Make a Space Work Better** | **5** | design-physical-project |
| 7 | (capstone — separate spec) | 7 | workflow-portfolio-project |

Sessions 1-3 and 7 do not move. Three sessions rotate: 6→4, 4→5, 5→6.

**Consequence worth keeping:** after this reorder, the capstone's five
deliverables become sessions 2 through 6 *in order* — research, plan,
presentation, app, object. The capstone spec at
`docs/superpowers/specs/2026-08-19-capstone-replaces-session-07-design.md`
must be updated to say so; it currently maps deliverables to the old numbers.

## Decisions taken

1. **Full renumber**, not a display-only reorder. Filenames, ids, titles,
   portal entries and journal tabs all move together. Half-renumbered
   content — a file called `session-06-*` that calls itself Session 4 — is
   the exact drift class that has caused repeated defects in this repo.
2. **Existing learner progress is migrated**, not abandoned.
3. **Reorder ships before the capstone**, on its own branch, so a
   renumbering bug and a capstone bug never look alike in one diff.
4. Slugs do not change. They are topic names, not ordinals, and they anchor
   the portal's `legacy` mapping.

## Non-goals

- Changing any session's *content*. This is ordering only. If reading the
  sessions in the new order exposes a content problem, record it and raise
  it separately.
- Renaming slugs or the `aam-personal-sessions` storage key.
- Touching session 7. The capstone is a separate spec and a later branch.

## Progress migration — the part that can silently corrupt data

Progress is stored as **session numbers**, not slugs:
`aam-personal-sessions = {completed:[4,5], journals:[…], missions:{4:'gold'}}`.
Renumbering without migrating means someone who completed the old session 4
(the app) is shown as having completed the new session 4 (the visual).

`migrateLegacy()` at `site/assets/js/personal-course.js:34` cannot be reused:
it runs only when `aam-personal-sessions` is absent, so it never fires for
an existing learner.

**Required:** a second, one-shot migration that

- rotates `completed`, `journals` and the keys of `missions` by
  `{4:5, 5:6, 6:4}`, leaving 1, 2, 3 and 7 untouched;
- runs against existing `aam-personal-sessions` data;
- records that it has run, so it never fires twice. A repeat application
  would rotate the numbers again and quietly scramble progress further on
  every page load. Use an explicit marker — a version field inside the
  stored object, or a separate key — not an inference.

Also update the legacy lesson map at line 32:
`legacyToSession` currently ends `…9:4, 10:5, 11:6, 12:7`. The original
lesson 9 (mini app) now maps to session 5, lesson 10 (room design) to
session 6, and lesson 11 (visual) to session 4. It becomes
`…9:5, 10:6, 11:4, 12:7`.

The portal entries' own `legacy:[N]` fields stay attached to their session —
the visual entry keeps `legacy:[11]` when it becomes `n:4`.

## The 31 file renames

A three-way rotation, so renames must go via a temporary name or git will
collide. Topic slugs inside filenames do not change.

**Visual, 6 → 4** (12 files)

- `personal-course/sessions/session-06-trustworthy-visual-story.md` → `session-04-…`
- `personal-course/he/sessions/session-06-trustworthy-visual-story.md` → `session-04-…`
- `personal-course/instructor/sessions/session-06-guide.md` → `session-04-guide.md`
- `personal-course/he/instructor/sessions/session-06-guide.md` → `session-04-guide.md`
- `personal-course/instructor/samples/session-06-{slides,slides-he,toolkit,toolkit-he,asset-set,asset-set-he,answers,answers-he}.html` → `session-04-…`

**App, 4 → 5** (8 files)

- `personal-course/sessions/session-04-build-personal-tool.md` → `session-05-…`
- `personal-course/he/sessions/session-04-build-personal-tool.md` → `session-05-…`
- `personal-course/instructor/sessions/session-04-guide.md` → `session-05-guide.md`
- `personal-course/he/instructor/sessions/session-04-guide.md` → `session-05-guide.md`
- `personal-course/instructor/samples/session-04-{slides,slides-he,test-cards,test-cards-he}.html` → `session-05-…`

**Object, 5 → 6** (11 files)

- `personal-course/sessions/session-05-design-physical-project.md` → `session-06-…`
- `personal-course/sessions/session-05-setup.md` → `session-06-setup.md`
- `personal-course/he/sessions/session-05-design-physical-project.md` → `session-06-…`
- `personal-course/he/sessions/session-05-setup.md` → `session-06-setup.md`
- `personal-course/instructor/sessions/session-05-guide.md` → `session-06-guide.md`
- `personal-course/he/instructor/sessions/session-05-guide.md` → `session-06-guide.md`
- `personal-course/instructor/samples/session-05-{measurements,measurements-he,slides,slides-he}.html` → `session-06-…`
- `personal-course/instructor/samples/session-05-organiser.scad` → `session-06-organiser.scad`

## Everything that references those names

Renaming the files is the easy half. Each renamed file also contains
relative links to its own siblings, and those must move with it:

- Guides link their own slides, samples and briefs.
- Briefs link their own setup guide and samples — note
  `session-05-setup.md` is referenced from both the object brief and its
  guide, and becomes `session-06-setup.md`.
- The portal's four path fields per entry (`briefEn`, `briefHe`, `guideEn`,
  `guideHe`) all carry filenames.

After the renames, no file may contain a path to a `session-0N-*` file that
no longer exists. This is the single most likely failure of this change.

## Headings, titles and ids

- Every renamed file's `# Session N — Title` heading, and the Hebrew
  `# מפגש N — Title`, takes its new number.
- Journal tab markers and `#` headings: `session-04` ↔ `session-06` ids and
  titles swap per the rotation, in both journals.
- **The journal tabs must be physically reordered** so the tabs appear in
  session order in the built workbook. The visual tab's content block moves
  above the app tab's. Tab `id` values follow the new numbers.
- `scripts/check-personal-seven-sessions.mjs` asserts the title list in
  order; the list must be reordered to match.

## Files

**Renamed:** the 31 above.

**Modified without renaming**

- `site/assets/js/personal-course.js` — entry order and `n` values, the four
  path fields per moved entry, `legacyToSession`, plus the new migration.
- `scripts/check-personal-seven-sessions.mjs` — ordered title lists.
- `personal-course/student/en/ai-learning-journal.md` — tab order, ids, titles
- `personal-course/student/he/ai-learning-journal.md` — same
- `docs/superpowers/specs/2026-08-19-capstone-replaces-session-07-design.md`
  — the deliverable-to-session mapping, which becomes sessions 2-6 in order.

**Regenerated**

- both `site/assets/downloads/applied-ai-mastery-personal-journal-*.docx`

## Verification

Beyond the repo's seven check scripts, which must all pass:

1. **No dangling paths.** Extract every `session-0N-*` path referenced from
   any file and assert the target exists. This is the change's main risk.
2. **Every renamed file's heading number matches its filename number**, both
   languages.
3. **Journal tab order matches session order** in both journals, and tab
   ids are unique and sequential.
4. **Migration correctness**, tested explicitly rather than assumed: seed
   `aam-personal-sessions` with old-order data, run the migration, assert
   `{4→5, 5→6, 6→4}` and that 1, 2, 3, 7 are untouched. Then run it a
   second time and assert nothing changes.
5. `node scripts/build-personal-workbooks.mjs` then
   `node scripts/check-personal-workbooks.mjs`, after a `.~lock` check.
6. Both slide decks per session still parse and keep their section counts.

## Open risks

- **Dangling relative links** are the most likely defect and the least
  visible: a broken link in a guide does not fail any check script today.
  Verification step 1 exists to catch it and should be written before the
  renames, not after.
- **Double migration.** If the marker is missed, progress rotates on every
  load. The second-run assertion in verification step 4 is not optional.
- **Content written assuming the old order.** The sessions have no prose
  cross-references between 4, 5 and 6 — verified — but session 7's brief
  does reference session 2, and the capstone spec references all of them.
  Re-read for order assumptions rather than trusting the grep.
- **External links** to any renamed file break. Nothing in the repo can fix
  that; Guy should know before this ships if he has shared direct links.
