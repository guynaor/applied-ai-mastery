# Capstone Implementation Plan — One Project, Every Skill

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace session 7's taught class with a mentored home capstone — one subject the learner chooses, carried through five deliverables that each re-use a session, reviewed asynchronously in a shared group chat.

**Architecture:** Content change across two language trees plus the portal and one check script. Tasks are grouped so each ends with the suite green: the check script asserts the old session-7 brief and journal content, so those assertions move in the same task as the content they describe.

**Tech Stack:** Markdown, static HTML with inline CSS, Node validation scripts, `scripts/build-personal-workbooks.mjs` for DOCX.

**Spec:** `docs/superpowers/specs/2026-08-19-capstone-replaces-session-07-design.md`

## Global Constraints

- **Title:** English `One Project, Every Skill`, Hebrew `פרויקט אחד, כל המיומנויות`.
  It is deliberately a noun phrase where every session title is an
  imperative — that signals it is not a session. Do not "fix" it.
- **Filenames and the portal slug do not change.**
  `personal-course/sessions/session-07-workflow-portfolio-project.md`, its
  Hebrew twin, and `slug:'workflow-portfolio-project'` stay exactly as they
  are. The journal tab id stays `session-07`.
- **The portal's `sessions` array keeps seven entries.** Its length drives
  progress tracking against `aam-personal-sessions`; shortening it strands
  or resets every learner's saved state.
- **Hebrew is AUTHORED, not translated.** Highest quality bar on this work.
- **`נכס` and `תיוג` are banned.** `סימון`/`לסמן` is the only word for the
  safety label; `כיתוב` the only word for a caption.
- **Hebrew RTL:** wrap Latin-script and multi-part numeric runs in
  `<span dir="ltr">…</span>` inside RTL prose.
- **The five deliverables are sessions 2 through 6, in order:** research (2),
  plan with a spreadsheet (3), presentation (4), designed object (5), small
  app (6). Say "one deliverable per session, in the order you learned them".
- **The app deliverable carries the safety layer** — what it may touch, what
  needs approval, what stops it. Not optional.
- **Mentoring is a shared group chat**, asynchronous and written. Deliverables
  are posted to the group; the mentor answers in the open.
- **Attendance is expected**; a learner who missed a session skips that
  deliverable rather than attempting it unprepared.
- **Open-ended, with the learner naming their own end date** at the subject
  gate. Not a course deadline.
- Never hand-edit `site/assets/downloads/*.docx`.

## File Structure

**Rewritten**

- `personal-course/sessions/session-07-workflow-portfolio-project.md` — the capstone brief
- `personal-course/he/sessions/session-07-workflow-portfolio-project.md`
- `personal-course/instructor/sessions/session-07-guide.md` — the mentor guide
- `personal-course/he/instructor/sessions/session-07-guide.md`
- `personal-course/instructor/samples/session-07-permission-map.html` and `-he` — adapted
- `personal-course/student/{en,he}/ai-learning-journal.md` — session-07 tab

**Modified**

- `scripts/check-personal-seven-sessions.mjs` — session-7 brief and journal assertions
- `site/assets/js/personal-course.js` — entry 7 title and blurb, plus the "seven sessions" copy

**Left unreferenced, not deleted**

- `personal-course/instructor/samples/session-07-slides.html` and `-he`

**Regenerated**

- both `site/assets/downloads/applied-ai-mastery-personal-journal-*.docx`

## Verification model

Eight checks, referred to as **"the suite"**:

```bash
node scripts/check-session-links.mjs >/dev/null 2>&1 && echo "links PASS" || echo "links FAIL"
for s in check-personal-seven-sessions check-personal-course-punctuation \
         check-course-journal-links check-personal-content-review \
         check-learning-journal-sources check-personal-workbooks \
         check-personal-document-review; do
  printf '%-36s ' $s; node scripts/$s.mjs >/dev/null 2>&1 && echo PASS || echo FAIL
done
```

All eight pass before this work begins. Confirm before Task 1.

---

### Task 1: The capstone brief, its assertions, and the portal entry

Atomic. `scripts/check-personal-seven-sessions.mjs` asserts the old brief's
content — Claude Desktop, Claude for Chrome, OpenClaw, the agent run record —
so rewriting the brief without moving those assertions leaves the suite red.

**Files:**
- Modify: `personal-course/sessions/session-07-workflow-portfolio-project.md`
- Modify: `personal-course/he/sessions/session-07-workflow-portfolio-project.md`
- Modify: `scripts/check-personal-seven-sessions.mjs` — the `sessionSeven` block
- Modify: `site/assets/js/personal-course.js` — entry 7's `en:` and `he:` pairs

**Interfaces:**
- Produces: the learner-facing capstone. Task 2's mentor guide reviews
  against it; Task 3's journal logs it.

- [ ] **Step 1: Confirm the suite is green**

Run the suite. Expected: eight PASS.

- [ ] **Step 2: Write the brief, matching the house pattern**

Read `personal-course/sessions/session-06-build-personal-tool.md` and its
Hebrew twin for the shape. The capstone is not a session, so it does not
carry `**Time:** 90 minutes` — but it should keep the house rhythm:
a title, an outcome, a scenario, a numbered sequence, an artifact section,
and resources.

The sequence is the subject gate plus five deliverables:

0. **Propose your subject and wait for confirmation.** Name what it is, why
   this one, and the date you intend to finish by. Do not start deliverable
   one until the mentor confirms.
1. **Research brief** — sources you opened yourself, what you decided, what
   you still do not know.
2. **Plan with a spreadsheet** — budget, schedule, who does what.
3. **Presentation** — the production chain, everything generated labelled.
4. **Designed object** — parametric, checked against one real measurement.
5. **Small app** — plus what it may touch, what needs your approval, and
   what stops it.

- [ ] **Step 3: Write the subject-gate section, with examples and a counter-example**

This is the highest-leverage part of the capstone. It must contain:

- The test: does each of the five deliverables arise from this subject
  *naturally*? If you would have to invent a reason to design an object,
  it is the wrong subject.
- Four worked examples, from the spec: a weekend trip, a vegetable patch, a
  home coffee setup, a child's birthday party. Each showing all five.
- **One counter-example** — a subject that fails the test, and why. Learners
  calibrate faster against a rejection than against four successes. Pick
  something plausible that a learner would actually propose.

- [ ] **Step 4: State the two group-chat consequences, before subject choice**

Both must appear in the brief, ahead of the sequence, because they change
what subject a learner should pick:

- Your work is visible to the group. Choose a subject you are willing to
  show, and keep private information out of it.
- You are expected to read other people's deliverables and the answers they
  get. That is where half the value is.

Also state: if you missed a session, skip that deliverable rather than
attempting it unprepared.

- [ ] **Step 5: Replace the check script's `sessionSeven` assertions**

The current block asserts Claude Desktop, least privilege, Claude for
Chrome, further exploration, OpenClaw, agent run record, and not-paper-only.

Those tools were session 7's demo vehicles. The capstone has learners build
their own app, so the tools do not carry over — but **least privilege does**,
because the safety layer folds into the app deliverable.

Replace with assertions true of the capstone, both locales. At minimum: the
capstone title, least-privilege access, a stop rule, the subject gate, and
that the work is shared with the group. Do not assert an exact sentence —
assert the concept, so wording can improve without breaking the build.

- [ ] **Step 6: Update the portal entry's title and blurb**

Entry `{n:7,…}`. Keep `slug`, `legacy` and all four path fields untouched.
Replace only:

```javascript
en:['One Project, Every Skill','<one sentence: one subject, five deliverables, mentored in the group>'],
he:['פרויקט אחד, כל המיומנויות','<the same meaning, authored in Hebrew>'],
```

- [ ] **Step 7: Verify and commit**

Run the suite; eight PASS. Then:

```bash
git add -A
git commit -m "feat: replace session 7's class with the capstone brief"
```

---

### Task 2: The mentor guide

The guide is not asserted by content, so it lands safely on its own.

**Files:**
- Modify: `personal-course/instructor/sessions/session-07-guide.md`
- Modify: `personal-course/he/instructor/sessions/session-07-guide.md`

**Interfaces:**
- Consumes: the brief from Task 1.

- [ ] **Step 1: Keep the house skeleton where it still applies**

The existing guide's shape is shared with sessions 1-6. Much of it assumes a
90-minute class and does not apply: no session map, no minute blocks, no
slides to project. Keep the header block, a materials table, the
troubleshooting table and the rubric. Replace the rest.

- [ ] **Step 2: Write the subject-gate section — the guide's main job**

Teach the mentor to run the five-deliverable test fast, and to say no. A
subject where the designed object is bolted on wastes weeks of the learner's
effort, discovered at deliverable four. Give:

- the question to ask of each proposed subject
- two or three worked judgements: a subject to accept, one to send back, and
  what to say in each case
- the instruction to have the learner name their own end date here, since
  nothing else anchors an open-ended task

- [ ] **Step 3: Write what an answer contains**

In a group thread every answer is also teaching whoever is reading, so it
must not decay into "looks good". Specify: what the deliverable got right,
the one thing that would most improve it, and whether it is done or coming
back.

- [ ] **Step 4: Give per-deliverable review criteria, sourced from each session**

The mentor is not inventing standards — sessions 2 through 6 already have
rubrics. For each deliverable, point at the session's own criteria and name
the one thing most likely to be wrong.

- [ ] **Step 5: Write the troubleshooting table**

Must include, at minimum:

| Situation | Mentor response |
|---|---|
| Nobody posts at the subject gate | The model depends on posting. Post your own subject first and answer it publicly |
| A subject fails the five-deliverable test | Send it back at the gate, not at deliverable four. Say which deliverable does not arise naturally |
| A learner missed the session a deliverable draws on | They skip it. A shorter capstone honestly done beats a guessed deliverable |
| A learner has gone quiet past their own end date | Ask once, in the group, without judgement. The date was theirs |
| Someone posts work with private information in it | Say so immediately and publicly — the group is watching, and that is the lesson |

- [ ] **Step 6: Note what the group thread costs and what it buys**

Mentoring in the open is what stops effort scaling linearly with the group.
Say so, and say what the failure mode looks like: if the group stays quiet,
this degrades to private mentoring at full cost with none of the compounding.
Watch the first subject gate.

- [ ] **Step 7: Verify and commit**

Run the suite; eight PASS. Then:

```bash
git add -A
git commit -m "feat: rewrite session 7's guide as the capstone mentor guide"
```

---

### Task 3: The journal tab and its assertions

Atomic for the same reason as Task 1: the check script asserts the current
tab's terms — personal workflow, portfolio, Claude Desktop, OpenClaw,
bounded run record — so those move with the content.

**Files:**
- Modify: `personal-course/student/en/ai-learning-journal.md` — session-07 tab body
- Modify: `personal-course/student/he/ai-learning-journal.md` — same
- Modify: `scripts/check-personal-seven-sessions.mjs` — the `sessionSevenJournal` terms
- Regenerate: both DOCX

- [ ] **Step 1: Check for a LibreOffice lock before building**

```bash
ls -a site/assets/downloads/ | grep '^\.~lock' && echo "STOP: workbook open" || echo "safe to build"
```

If a lock exists, stop and ask Guy to close it.

- [ ] **Step 2: Replace the tab body with three tables**

Keep the tab marker and `#` heading; replace what follows. The title becomes
the capstone's. Match the house table style from the session-06 tab.

**1. The subject**

| What it is | Why this one | My end date | Mentor confirmed on |

**2. Deliverable log**

| Deliverable | Session it draws on | What I posted | Date posted | What came back | What I changed |

**3. The app's boundary**

| What it may touch | What needs my approval | What stops it |

Table 3 carries the folded safety material and is not optional.

- [ ] **Step 3: Update the Goal / Steps / Bronze / Silver / Gold blocks**

Bronze is the subject confirmed and the deliverables completed that the
learner attended sessions for; Silver adds the app's boundary written and
the group engaged with; Gold shows the finished project to someone outside
the group and revises.

- [ ] **Step 4: Replace the check script's journal term list**

Terms true of the capstone. Keep `capstone|final personal project` and
`permission`; drop `personal workflow`, `portfolio`, `Claude Desktop`,
`OpenClaw`, `bounded run record`.

- [ ] **Step 5: Rebuild and verify**

```bash
node scripts/build-personal-workbooks.mjs
node scripts/check-personal-workbooks.mjs && echo "RTL PASS"
```

Then the suite; eight PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: replace the session 7 journal tab with the capstone log"
```

---

### Task 4: Adapt the permission-map sample

The spec assumed this sample could be reused unchanged. It cannot: its
sections are "The sample folder", "The demonstration request", "Agent run
record" — it is built around a facilitator demo on a bounded folder, and it
names Claude Desktop and OpenClaw.

What transfers is its **shape** — what a permission map contains. What does
not is the demo framing. The capstone has learners write one for the app
they built.

**Files:**
- Modify: `personal-course/instructor/samples/session-07-permission-map.html`
- Modify: `personal-course/instructor/samples/session-07-permission-map-he.html`

- [ ] **Step 1: Keep the page shell and the columns**

The three-column shape — what it may touch, what needs approval, what stops
it — is the valuable part and matches the journal's table 3.

- [ ] **Step 2: Reframe around a learner's own app**

Replace the sample-folder demo with a worked example for an app a learner
might actually build in session 6 — something with a real boundary worth
drawing. Remove the Claude Desktop and OpenClaw framing.

- [ ] **Step 3: Verify and commit**

```bash
python3 /tmp/s6/parsecheck.py personal-course/instructor/samples/session-07-permission-map*.html
grep -c "נכס\|תיוג" personal-course/instructor/samples/session-07-permission-map-he.html   # expect 0
```

Then the suite; eight PASS. Then commit.

---

### Task 5: The portal's "seven sessions" copy

The course is now six sessions and a capstone. Three strings still say seven.

**Files:**
- Modify: `site/assets/js/personal-course.js`

- [ ] **Step 1: Update the hero text, both locales**

```
en: 'Seven integrated 90-minute sessions build durable AI skills…'
he: 'שבעה מפגשים משולבים בני 90 דקות מפתחים מיומנויות AI שימושיות…'
```

Both must describe six sessions plus a mentored capstone.

- [ ] **Step 2: Update the progression label, both locales**

```
en: twelveLessons:'Seven integrated practical sessions'
he: twelveLessons:'שבעה מפגשים מעשיים ומשולבים'
```

The key name `twelveLessons` is historical — leave the key, change the value.

- [ ] **Step 3: Update the progress counter**

`updateProgress()` renders `${count} of ${sessions.length} sessions complete`
and the Hebrew equivalent. The array still has seven entries by design, so
the count is right but the noun is wrong. Reword so it does not call the
capstone a session.

- [ ] **Step 4: Verify and commit**

```bash
node --check site/assets/js/personal-course.js
```

Then the suite; eight PASS. Then commit.

---

### Task 6: Whole-change verification

Writes nothing unless a defect is found.

- [ ] **Step 1: The suite**

Eight PASS.

- [ ] **Step 2: No stale session-7 framing anywhere**

```bash
grep -rn "Claude Desktop\|OpenClaw\|Claude for Chrome\|personal workflow" \
  personal-course/sessions/session-07-* personal-course/he/sessions/session-07-* \
  personal-course/instructor/sessions/session-07-guide.md \
  personal-course/he/instructor/sessions/session-07-guide.md \
  personal-course/student/*/ai-learning-journal.md
```

Expect nothing in the capstone's own files. Session 2 legitimately keeps
OpenClaw — do not touch it.

- [ ] **Step 3: Terminology and bidi**

`נכס` and `תיוג` at zero across every session-07 Hebrew file; `dir="ltr"`
present on Latin runs in the Hebrew permission map.

- [ ] **Step 4: Read it as a learner, then as the mentor**

The two things no script can check:

- Reading the brief cold, is it obvious what to do first, and could you pick
  a subject that passes the gate? If the counter-example does not make the
  test concrete, it is not doing its job.
- Reading the guide, could you run a subject gate and write a first answer
  without inventing a standard?

- [ ] **Step 5: Report what needs Guy's decision**

At minimum, from the spec's open risks: whether the mentor load is
sustainable in practice, and whether five deliverables is too many for a
learner working alone. Both are answerable only by running it once.
