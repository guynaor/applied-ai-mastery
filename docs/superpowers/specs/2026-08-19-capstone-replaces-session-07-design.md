# Capstone replaces session 7 — One Project, Every Skill

**Date:** 2026-08-19
**Status:** shape approved in brainstorming; title pending confirmation; not implemented
**Scope:** personal course, session 7 → capstone, English and Hebrew

## Why

Session 7 is currently a 90-minute taught class, *Build a Personal System*:
gather evidence, build a starting page, read a permission request, draw a
stop line. Guy is not going to teach it. He wants a mentored home project
instead — one subject the learner chooses, carried through research, a plan
with a spreadsheet, a presentation, a small app, and a designed object.

The five deliverables he named map onto sessions 2 through 6 — exactly, and
in order, once the 2026-08-19 reorder lands.
That makes the capstone a **synthesis** rather than a seventh topic: every
session's skill used once, on one subject the learner cares about. Session
1's skill — deciding, and judging a source — is what they use to choose the
subject, so all six taught sessions are exercised.

## Decisions taken

1. **Six taught sessions, then a capstone.** The course stops presenting a
   seventh class that does not happen.
2. **The safety layer folds into the app.** Permissions, least privilege and
   the stop rule become requirements of a thing the learner built, not a
   topic taught on its own.
3. **Open-ended, with milestone reviews.** No course deadline. One
   mitigation is designed in — see "The learner's own end date" below.
4. **Mentoring runs in one shared group chat**, asynchronous and written, on
   WhatsApp or equivalent — the same channel session 6's homework already
   uses. Deliverables are posted to the group, not sent privately, and the
   mentor answers in the open. This is the point, not a convenience: one
   answer serves everyone, and learners see each other's work.
5. **Title:** English *One Project, Every Skill*, Hebrew
   *פרויקט אחד, כל המיומנויות*. Confirmed by Guy on 2026-08-19.
   Note that every session title is an imperative phrase — *Decide What to
   Do Next*, *Buy With Confidence*, *Make a Space Work Better* — and this
   one deliberately is not. The grammatical break is useful: it signals at a
   glance that the capstone is not another session.
6. **Attendance is expected.** A learner who missed a session skips that
   session's deliverable rather than attempting it unprepared.

## Goals

- One capstone that exercises all six taught sessions on a single subject.
- A mentoring model that costs the mentor bounded, asynchronous effort.
- Keep the safety material, attached to something the learner made.
- Preserve every learner's existing progress state.

## Non-goals

- Renaming files or the portal slug. `personal-course/sessions/session-07-workflow-portfolio-project.md`,
  its Hebrew twin, and `slug:'workflow-portfolio-project'` stay exactly as they are.
- Changing the `aam-personal-sessions` localStorage key. Changing it resets
  every learner's recorded progress.
- Deleting session 7's slides. They go unreferenced, not removed.
- Reworking sessions 1-6.
- Building the professional course's capstone apparatus (registers, CSV
  rubrics). That idiom belongs to the professional track; the personal
  course's idiom is one brief, one guide, samples, and a journal tab.

## The capstone

### The five deliverables

| # | Deliverable | Re-uses | Must contain |
|---|---|---|---|
| 1 | Research brief | Session 2 | Sources the learner opened themselves, what they decided, what they still do not know |
| 2 | Plan with a spreadsheet | Session 3 | Budget, schedule, who does what |
| 3 | Presentation | Session 4 | The production chain, everything generated visibly labelled |
| 4 | Designed object | Session 5 | Parametric, checked against at least one real measurement |
| 5 | Small app | Session 6 | Plus a permission boundary and a stop rule |

After the 2026-08-19 reorder these are simply **sessions 2 through 6, in
order**. Say that in the learner brief: "one deliverable per session, in the
order you learned them" is easier to hold than a mapping, and it is now
literally true.

The last deliverable is the app, which is also the one carrying the
permission boundary and the stop rule. The capstone ends on human control.

Each deliverable's review criteria come from the session that taught it.
The mentor is not inventing standards; the rubrics already exist.

### The subject gate — step zero, and the part that matters most

Before any deliverable, the learner proposes their subject and the mentor
confirms it. **A subject where the designed object feels bolted on is the
wrong subject**, and discovering that at deliverable four wastes weeks of
the learner's effort and the mentor's goodwill.

The test, which the mentor guide must teach as a fast check: does each of
the five deliverables arise from this subject *naturally*? If the learner
has to invent a reason to design an object, or the "app" is a spreadsheet
with a different name, send them back to choose again. This is the single
highest-leverage moment in the whole capstone.

### Example subjects

These belong in the learner-facing brief, and exist to show what "all five
arise naturally" feels like:

- **A weekend trip** — research destinations and real costs; a spreadsheet
  itinerary and budget; a packing-list app; a printed travel-organiser
  insert; a presentation to whoever is coming.
- **A vegetable patch** — research what grows in your season and soil; a
  planting calendar with costs and expected yields; a watering-reminder
  app; seedling-tray dividers or plant labels; a pitch to family or
  neighbours.
- **A home coffee setup** — research grinders and beans against real
  sources; a budget and running-cost sheet; a brew-ratio calculator; a
  tamper stand or drip tray; a walkthrough of why this setup.
- **A child's birthday party** — research venues and catering; guest list,
  budget and schedule; an RSVP tracker; a party-favour box or name-card
  holders; the plan shown to the family.

Also give one worked *counter-example*: a subject that fails the test, and
why. Learners calibrate faster against a rejection than against four
successes.

### The safety layer, folded in

Deliverable 3 is not finished until it carries:

- what the app may touch, and nothing wider (least privilege)
- which actions always need the learner's approval
- the stop condition — what makes it halt

The existing `personal-course/instructor/samples/session-07-permission-map.html`
and its Hebrew twin are reused as the reference for this. They are good
material and were built for exactly this.

### The learner's own end date

Guy chose open-ended over a fixed duration. The designed mitigation: **at
the subject gate, the learner names their own end date and tells the
mentor.** Not a course deadline — their commitment. Session 6's homework
drifted precisely because nothing anchored it once the next class became
uncertain, and a self-set date is the lightest anchor that still exists.

### Mentoring model

One shared group chat, asynchronous and written. Five milestones plus the
subject gate. The learner **posts** a deliverable to the group when it is
ready; the mentor answers in the open, where everyone reads it.

This is a design decision, not a logistics one. Feedback compounds: the
answer to "your sources are all one vendor's marketing" is worth more to the
five people who have not posted yet than to the one who did. It also means
the mentor's effort does not scale linearly with the group — the failure
mode that would otherwise make six touchpoints per learner unsustainable.

The mentor guide must say what an answer contains, so it does not decay into
"looks good": what the deliverable got right, the one thing that would most
improve it, and whether it is done or coming back. In a group thread that
matters more, because every answer is also teaching whoever is reading.

**Two consequences to state plainly in the learner brief**, before anyone
picks a subject:

- Your work will be visible to the group. Choose a subject you are willing
  to show, and keep private information out of it — the same rule session 6
  applies to what you publish.
- You are expected to read other people's deliverables and the answers they
  get. That is where half the value is.

### If a learner missed a session

Attendance is expected. A learner who was not there for the session a
deliverable draws on **skips that deliverable** rather than attempting it
unprepared — a shorter capstone honestly done beats five deliverables where
one was guessed at. The mentor guide says this plainly so it is decided in
advance rather than negotiated per learner.

## What changes about "seven"

The portal's `sessions` array keeps **seven entries**. This is deliberate:
the array length drives progress tracking against the `aam-personal-sessions`
key, and shortening it would strand or reset every learner's saved state.

What changes is presentation, not structure:

- Entry 7's title becomes the capstone's.
- The portal's progress copy — currently `${count} of ${sessions.length}
  sessions complete` in English and the Hebrew equivalent — must stop
  calling all seven "sessions". It should read as six sessions and the
  capstone.
- `scripts/check-personal-seven-sessions.mjs` **keeps its filename.**
  Renaming it would break references in six historical plan and spec
  documents for cosmetic gain; the name is a dated artifact, the way the
  session 6 spec's superseded decision is. Its assertions and its final
  `console.log` message change.
- The script currently asserts session 7 journal terms: `personal workflow`,
  `portfolio`, `capstone|final personal project`, `Claude Desktop`,
  `permission`, `OpenClaw`, `bounded run record|account, payment, messaging`.
  These must be replaced with terms true of the capstone. `permission` and
  `capstone` survive; the rest do not.

## Files

**English**

- `personal-course/sessions/session-07-workflow-portfolio-project.md` — rewritten as the capstone brief
- `personal-course/instructor/sessions/session-07-guide.md` — rewritten as the mentor guide
- `personal-course/student/en/ai-learning-journal.md` — session-07 tab replaced

**Hebrew**

- `personal-course/he/sessions/session-07-workflow-portfolio-project.md`
- `personal-course/he/instructor/sessions/session-07-guide.md`
- `personal-course/student/he/ai-learning-journal.md`

**Shared**

- `scripts/check-personal-seven-sessions.mjs` — titles, session-7 terms, log message
- `site/assets/js/personal-course.js` — entry 7 title and blurb, progress copy

**Reused unchanged**

- `personal-course/instructor/samples/session-07-permission-map.html` and `-he`

**Left unreferenced, not deleted**

- `personal-course/instructor/samples/session-07-slides.html` and `-he`

### The new journal tab

Replacing the starting-page / evidence-map / portfolio trio:

1. **The subject** — what it is, why this one, my end date, mentor confirmed on
2. **Deliverable log** — deliverable, session it draws on, what I sent, date sent, what came back, what I changed
3. **The app's boundary** — what it may touch, what needs my approval, what stops it

Table 3 is what carries the folded safety material. It is not optional.

## Verification

The repo's seven check scripts must pass, as they did before this work. In
particular `check-personal-seven-sessions` will fail until its assertions
are updated — that is the intended failing test, and it should be made to
fail before it is made to pass.

Also: journal markdown edits require `node scripts/build-personal-workbooks.mjs`
followed by `node scripts/check-personal-workbooks.mjs`, and a `.~lock`
check in `site/assets/downloads/` before building.

Both languages are authored separately. `נכס` and `תיוג` remain banned;
`סימון` is the only word for the safety label and `כיתוב` the only word for
a caption.

## Open risks

- **Five deliverables is a large ask** for a learner working alone with no
  class. The counter-example in the brief and the subject gate are the two
  places this gets caught early; if completion turns out poor, the honest
  fix is fewer deliverables, not more mentoring.
- **Open-ended has no forcing function** beyond the learner's own date. This
  is a known, accepted trade — Guy chose it with the drift risk stated.
- **The group thread depends on a group willing to share.** Mentoring in the
  open is what stops the effort scaling linearly, but it only works if
  learners will post work in progress. If the group goes quiet, the model
  degrades to private mentoring at full cost with none of the compounding.
  Watch the first subject gate: if nobody posts, that is the signal.
- **The capstone assumes all six sessions were attended.** A learner who
  missed session 5 cannot produce deliverable 4. The mentor guide should say
  what to do about that rather than leaving it to be discovered.
