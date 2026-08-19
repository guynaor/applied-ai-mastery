# Session Reorder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put the visual session fourth and the app session last — a straight swap of sessions 4 and 6 — across filenames, content, portal, journal and stored learner progress, without breaking a link or corrupting anyone's history.

**Architecture:** A two-way swap of 20 files plus every reference to them. Every `session-05-*` file is untouched — the object session does not move. The renumber is atomic: renaming files without updating their internal links, the portal's paths, the journal tab order and the check script's title list leaves the repo red, so those move as one unit. Two things land safely on their own before it — a link-integrity guard and the progress migration.

**Tech Stack:** Markdown, static HTML, `git mv`, Node validation scripts under `scripts/`, `build-personal-workbooks.mjs` for DOCX, browser `localStorage` for progress.

**Spec:** `docs/superpowers/specs/2026-08-19-session-reorder-visual-before-build-design.md`

## Global Constraints

- **The swap is `{4 ↔ 6}`.** Sessions 1, 2, 3, 5 and 7 do not move, and no
  `session-05-*` file is renamed or edited.
- **Slugs never change.** `trustworthy-visual-story`, `build-personal-tool`,
  `design-physical-project` stay attached to their sessions.
- **`aam-personal-sessions` is never renamed.** Renaming it discards every
  learner's progress.
- **The progress migration must run exactly once**, with an explicit marker.
  A second application rotates the numbers again and corrupts history.
- **No content changes.** Ordering only. If reading in the new order exposes
  a content problem, record it; do not fix it here.
- **Hebrew is authored, not translated** — but this plan should produce no
  new prose. If a heading needs rewording rather than renumbering, stop and
  ask.
- **`נכס` and `תיוג` stay banned; `סימון` is the only safety-label word and
  `כיתוב` the only caption word.**
- Journal lines carrying `journal-tab` markers are structural — ids must
  stay unique and must match their session number.
- Never hand-edit `site/assets/downloads/*.docx`; rebuild from markdown.

## File Structure

**New**

- `scripts/check-session-links.mjs` — asserts every `session-0N-*` path
  referenced anywhere resolves to a file that exists.

**Renamed (20, two-way swap)** — 12 visual files `06→04`, 8 app files
`04→06`. Full list in the spec's "The 20 file renames" section. No
`session-05-*` file moves.

**Modified**

- `site/assets/js/personal-course.js` — entry order, `n`, four path fields
  per moved entry, `legacyToSession`, plus the new migration
- `scripts/check-personal-seven-sessions.mjs` — ordered title lists
- `personal-course/student/en/ai-learning-journal.md` — tab order, ids, titles
- `personal-course/student/he/ai-learning-journal.md` — same
- `docs/superpowers/specs/2026-08-19-capstone-replaces-session-07-design.md`

**Regenerated**

- both `site/assets/downloads/applied-ai-mastery-personal-journal-*.docx`

## Verification model

The repo's seven check scripts, referred to as **"the suite"**:

```bash
for s in check-personal-seven-sessions check-personal-course-punctuation \
         check-course-journal-links check-personal-content-review \
         check-learning-journal-sources check-personal-workbooks \
         check-personal-document-review; do
  printf '%-36s ' $s; node scripts/$s.mjs >/dev/null 2>&1 && echo PASS || echo FAIL
done
```

All seven pass before this work begins. Confirm that before Task 1.

---

### Task 1: A link-integrity guard, written before anything moves

The spec names dangling relative links as this change's most likely defect
and its least visible: no existing check script catches a broken link. Build
the guard first so it is a net under the renames, not a post-mortem.

**Files:**
- Create: `scripts/check-session-links.mjs`

**Interfaces:**
- Produces: a script exiting non-zero with the offending file and path when
  any `session-0N-*` reference does not resolve. Tasks 3 and 5 run it.

- [ ] **Step 1: Confirm the suite is green**

Run the suite. Expected: seven PASS. Do not build on a red baseline.

- [ ] **Step 2: Write the guard**

It must scan every `.md`, `.html`, `.scad` and `.js` file under
`personal-course/` and `site/assets/js/`, extract every reference matching
`session-\d\d[a-z0-9-]*\.(md|html|scad)`, resolve it relative to the
referring file's directory, and assert the target exists.

Markdown links, HTML `href`/`src`, and bare paths in prose all count.
Resolve relative to the referring file — the Hebrew guides sit one directory
deeper than the English ones and their `../../../` paths differ.

Report every failure before exiting, not just the first: during a rename a
single run should show the whole blast radius.

- [ ] **Step 3: Prove it detects a real break**

```bash
git mv personal-course/instructor/samples/session-06-slides.html /tmp/s6-slides-holdout.html
node scripts/check-session-links.mjs; echo "exit=$?"
```

Expected: non-zero, naming `session-06-guide.md` among the referrers. This
is the failing test — a guard that cannot fail is not a guard.

- [ ] **Step 4: Restore and confirm green**

```bash
git mv /tmp/s6-slides-holdout.html personal-course/instructor/samples/session-06-slides.html
node scripts/check-session-links.mjs && echo "PASS"
```

Expected: PASS, exit 0.

- [ ] **Step 5: Commit**

```bash
git add scripts/check-session-links.mjs
git commit -m "test: add a guard asserting every session file reference resolves"
```

---

### Task 2: Progress migration

Independent of the renames and safe to land alone — the migration is written
against the new numbering but is inert until the numbering changes, because
it only rewrites stored integers.

**Files:**
- Modify: `site/assets/js/personal-course.js` — `legacyToSession` at line 32, and a new migration beside `migrateLegacy` at line 34

**Interfaces:**
- Consumes: nothing.
- Produces: stored progress in new-order numbering, and a marker preventing
  re-application. Task 3 relies on the numbering it produces.

- [ ] **Step 1: Write the migration**

Beside `migrateLegacy`, add a one-shot that:

- reads `aam-personal-sessions`;
- if its marker says the reorder migration already ran, returns untouched;
- otherwise swaps `completed` and `journals` through `{4:6, 6:4}`, leaving
  every other number as-is — 5 included — and rewrites the keys of
  `missions` the same way;
- writes the marker and persists.

The marker must be explicit — a version field in the stored object, or a
separate key. Do not infer "already migrated" from the data's shape: any
inference is wrong for a learner whose completed set happens to look
migrated.

- [ ] **Step 2: Update the legacy lesson map**

`site/assets/js/personal-course.js:32` currently reads:

```javascript
const legacyToSession={1:1,2:1,3:1,4:2,5:2,8:2,6:3,7:3,9:4,10:5,11:6,12:7};
```

Original lesson 9 (mini app) now belongs to session 6 and lesson 11 (visual)
to session 4. Lesson 10 (room design) stays at 5:

```javascript
const legacyToSession={1:1,2:1,3:1,4:2,5:2,8:2,6:3,7:3,9:6,10:5,11:4,12:7};
```

- [ ] **Step 3: Test the migration, including that it is idempotent**

Run in Node, simulating the stored object:

```javascript
// seed old-order progress
let store = {completed:[2,4,5,6], journals:[4,6], missions:{4:'gold',5:'silver',6:'bronze'}};
// apply the migration once
// assert: completed contains 2,6,5,4  (4→6, 6→4; 2 and 5 unchanged)
//         journals contains 6,4
//         missions is {6:'gold',5:'silver',4:'bronze'}   // note 5 keeps 'silver'
// apply the migration a SECOND time
// assert: the object is unchanged from after the first application
```

Session 5 appearing in the seed data is deliberate: it is the number most
likely to be swept up by a careless implementation, and the assertion that
it keeps `'silver'` is what catches that.

The second-run assertion is not optional. Without the marker, a repeat
rotates the numbers again on every page load and degrades a learner's
history a little more each visit.

- [ ] **Step 4: Run the suite**

Expected: seven PASS. Also `node scripts/check-session-links.mjs` PASS.

- [ ] **Step 5: Commit**

```bash
git add site/assets/js/personal-course.js
git commit -m "feat: migrate stored session progress for the reorder"
```

---

### Task 3: The renumber — atomic

Everything here moves together. Renaming files without updating their
internal links, the portal's paths, the journal tab order and the check
script's title list leaves the repo red, so a reviewer could not accept any
part of it alone.

**Files:**
- Rename: all 31 in the spec's rename list
- Modify: `site/assets/js/personal-course.js`, `scripts/check-personal-seven-sessions.mjs`, both `ai-learning-journal.md`
- Regenerate: both DOCX

**Interfaces:**
- Consumes: the migration and numbering from Task 2; the guard from Task 1.
- Produces: the course in its new order. Task 4 documents it; Task 5 verifies it.

- [ ] **Step 1: Rotate the files, via a temporary name**

A two-way swap still collides if done naively. Use one temp step, and
`git mv` so history follows:

1. `session-04-*` → `session-tmp-*` (frees `04`)
2. `session-06-*` → `session-04-*` (frees `06`)
3. `session-tmp-*` → `session-06-*`

**Do not touch `session-05-*`.** Those 11 files stay exactly as they are.

Topic slugs inside filenames do not change: the visual brief becomes
`session-04-trustworthy-visual-story.md`, not `session-04-visual.md`.

The three globs above fully determine which files move — there is no
hand-picked list to consult, and the spec's enumeration is there only if you
want to read it. Verify the counts before and after:

```bash
find personal-course -name '*session-04*' | wc -l   # 8 before, 12 after
find personal-course -name '*session-05*' | wc -l   # 11 before AND after
find personal-course -name '*session-06*' | wc -l   # 12 before, 8 after
```

The middle line is the important one: if the `session-05-*` count changes at
all, the swap has touched the session that must not move — stop and undo.

- [ ] **Step 2: Run the guard to see the full blast radius**

```bash
node scripts/check-session-links.mjs
```

Expected: FAIL, listing every now-dangling reference. Keep this output — it
is your worklist for Step 3.

- [ ] **Step 3: Fix every internal reference**

Work the guard's list. Each renamed file links its own siblings; those paths
move with it. Known traps:

- `session-05-setup.md` keeps its name, because the object session does not
  move. Its references from the object brief and guide are correct as they
  stand — leave them alone. An earlier version of this plan renamed it; that
  was for the three-way rotation and no longer applies.
- Hebrew guides sit one directory deeper than English ones, so their
  relative depth differs (`../../../` versus `../../`). Do not assume the
  English fix transfers.
- The portal's four path fields per moved entry (`briefEn`, `briefHe`,
  `guideEn`, `guideHe`) carry filenames.

Re-run the guard until it passes.

- [ ] **Step 4: Renumber headings**

Every renamed file's `# Session N — Title` and `# מפגש N — Title` takes its
new number. The title text does not change; only the numeral.

Assert afterwards that every file's heading number matches its filename
number, in both languages.

- [ ] **Step 5: Reorder the portal entries**

In `site/assets/js/personal-course.js`, the `sessions` array: the visual
entry becomes `n:4` and the app entry `n:6`; the object entry stays `n:5`.
The array is ordered 1..7. Each entry keeps its own `slug` and `legacy` — the
visual entry keeps `legacy:[11]` when it becomes `n:4`.

- [ ] **Step 6: Reorder the journal tabs**

In both journals, the tab content blocks must physically move so they appear
in session order — the visual tab's block above the app tab's. Tab `id`
values and `#` headings take their new numbers.

Assert: tab ids are unique, sequential, and in the same order as the portal.

- [ ] **Step 7: Reorder the check script's title lists**

`scripts/check-personal-seven-sessions.mjs` asserts English and Hebrew title
lists in order. Reorder both to match the new sequence.

- [ ] **Step 8: Rebuild the workbooks**

```bash
ls -a site/assets/downloads/ | grep '^\.~lock' && echo "STOP: workbook open in LibreOffice" || node scripts/build-personal-workbooks.mjs
node scripts/check-personal-workbooks.mjs && echo PASS
```

- [ ] **Step 9: Run everything**

```bash
node scripts/check-session-links.mjs && echo "links PASS"
```

Then the suite. Expected: all seven PASS.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: move the visual session before the two build sessions"
```

---

### Task 4: Update the capstone spec's mapping

**Files:**
- Modify: `docs/superpowers/specs/2026-08-19-capstone-replaces-session-07-design.md`

**Interfaces:**
- Consumes: the final numbering from Task 3.

- [ ] **Step 1: Update the deliverable table**

Its five deliverables currently map to the old numbers. They become sessions
2 through 6 **in order**: research (2), plan with a spreadsheet (3),
presentation (4), designed object (5), small app (6).

Worth stating in the capstone brief: the last deliverable is the app, which
is also the one carrying the permission boundary and the stop rule. The
capstone ends on human control, which is the right note to end on.

Say that explicitly — "one deliverable per session, in the order you learned
them" is simpler for a learner to hold and for the mentor to review against
than an arbitrary-looking mapping, and it is now true.

- [ ] **Step 2: Check the rest of the spec for order assumptions**

Search it for any other reference to a session by number and correct it.

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/specs/2026-08-19-capstone-replaces-session-07-design.md
git commit -m "docs: point the capstone deliverables at the reordered sessions"
```

---

### Task 5: Whole-change verification

Writes nothing unless a defect is found.

- [ ] **Step 1: Guard and suite**

`node scripts/check-session-links.mjs`, then the suite. All must pass.

- [ ] **Step 2: Heading numbers match filename numbers**

For every `session-0N-*` file in both languages, assert the number in its
`# Session N` / `# מפגש N` heading equals the number in its filename.

- [ ] **Step 3: Portal, journal and check script agree**

Assert the session order is identical across the portal array, both journal
tab sequences, and the check script's two title lists.

- [ ] **Step 4: Migration is still idempotent**

Re-run Task 2's Step 3 test against the committed code. Run twice; assert
the second run changes nothing.

- [ ] **Step 5: Read the course in its new order**

Open the six briefs in sequence, both languages. Check what no script can:
that nothing reads as though it assumes an earlier session came later. The
sessions have no prose cross-references between 4, 5 and 6 — verified during
design — but session 7's brief references session 2, and phrasing like
"as you did last time" carries an order assumption without naming a number.
The object session did not move, so its text is the least likely to have
drifted; the visual and app sessions are where to look hardest.

- [ ] **Step 6: Report anything for Guy**

Specifically: any place where the new order exposes a content problem. The
plan forbids fixing those here; they are a separate change.
