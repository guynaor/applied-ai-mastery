# Session 6 redesign — From Prompt to Presentation

**Date:** 2026-08-19
**Status:** approved in brainstorming, not yet implemented
**Scope:** personal course, session 6, English and Hebrew

## Why

Session 6 currently teaches trust and labelling: learners sort six sample
items into original / edited / generated, find two planted problems, and
build a storyboard with captions and alt text. The safety material is good,
but it occupies the whole session, and the tooling learners actually want —
image generation, editing, video, motion, narration, decks — is absent.

Guy asked to invert the emphasis: teach the tooling, and carry the safety
material in the introduction instead of as the spine.

## Decisions taken

Settled in brainstorming. Items 1–3 were agreed before this spec was first
written; 4–7 were added on 2026-08-19 after Guy tested the tools directly.

1. **Structure — one artifact, six stages.** Not six independent tool demos.
   Learners carry a single subject through the whole chain, so each stage
   hands its output to the next and the session still produces one
   integrated artifact, matching every other session in the course.
2. **Title — changed deliberately.** The English becomes
   *From Prompt to Presentation*, the Hebrew *מהנחיה למצגת*. Filenames and
   the `trustworthy-visual-story` slug stay as they are so no links break.
3. **Free route — a free spine, paid tools shown as demos.** Learners can
   complete all six stages at no cost. Paid or hard-quota'd tools appear as
   facilitator demonstrations they watch, never as required tasks. Sora is
   a demo, not a task.
4. **Gemini carries stages 3 and 4.** Image-plus-prompt for one, text-only
   for the other. Chosen over Pixlr, which needs a trial subscription, and
   over Kling and Runway, whose free tiers fail inside a session. Confirmed
   by direct test on 2026-08-19.
5. **Stages 1 and 2 offer two tools: Gemini and ChatGPT.** Both generate and
   edit images. Learners run the same prompt through both and compare.
6. **Video is single-tool on purpose.** Only Gemini works free, or on a
   monthly plan. The session says this plainly rather than pretending a
   choice exists.
7. **Stage 6 is Claude versus Canva.** Gemini deck generation was
   considered and dropped: the Claude/Canva contrast is sharper, and the
   session already runs Gemini for three stages. Do not re-add a third
   route — 20 minutes carries two hands-on, not three.

   **Superseded 2026-08-19, after the first live delivery.** Tried as
   decided above. The delivery found Canva cannot receive the learner's
   generated assets — there is no way to get the image and clips built in
   stages 1–4 into it — so the two decks were never comparable, and the
   premise for the 20-minute block did not hold. Canva is dropped from
   stage 6. The two routes become Claude → PPTX and Claude →
   self-contained HTML: one tool, two output formats, everything else held
   constant — a sharper comparison than tool versus tool, for the same
   reason decision 6 gave for keeping video single-tool.

## Goals

- Teach the six-stage AI production chain end to end in 90 minutes.
- Produce one artifact: a short narrated visual piece plus a deck framing it.
- Keep a genuinely free path through every stage.
- Retain the safety material as a habit applied six times, not a module.

## Non-goals

- Splitting session 6 into two sessions. The course is fixed at seven and
  `scripts/check-personal-seven-sessions.mjs` asserts it.
- Renaming files or the portal slug.
- Deleting the existing sample materials.
- Teaching any specific tool's UI. Tools change; the chain does not.

## Session design

| Time | Stage | Teaching point |
|---:|---|---|
| 0–10 | Homework discussion | Unchanged. It works and it is the course's pattern. |
| 10–16 | Intro and the three rules | Safety, compressed. See below. |
| 16–27 | **Generate** an image — Gemini *or* ChatGPT | Prompt anatomy: subject, composition, light, framing, exclusions. The difference between "a cat" and a controlled request. Same prompt, two tools, compared. |
| 27–38 | **Fix** the output — same tool as stage 1 | Edit the region, do not re-roll the prompt. Re-rolling destroys whatever already worked. |
| 38–46 | **Move** the still — Gemini, image upload + guiding prompt | Animating your own image keeps the content yours. The prompt steers the motion, it does not invent the subject. |
| 46–56 | **Video** — Gemini, text prompt only | Generating from nothing surrenders content control. What video generation is bad at: text, hands, continuity, physics. Why you shoot short. Send the job and keep talking. |
| 56–65 | **Narrate** | Write for the ear. The script matters more than the voice. |
| 65–85 | **Assemble**, two routes | Claude deck (PPTX or self-contained HTML) versus Canva. The comparison is the lesson, not either tool. |
| 85–90 | Exit check | |

**The stage-6 row above is superseded — see decision 7's 2026-08-19 note.**
The routes are now Claude → PPTX versus Claude → self-contained HTML: one
tool, two output formats, not Claude versus Canva.

Stage 2 is the highest-value stage and must not be cut for time. Editing a
masked region rather than regenerating is what separates people who get a
usable image from people who generate forty and settle for one.

Stage 6 gets twenty minutes because two routes run inside it. The contrast
to draw: a PPTX or HTML deck is a file the learner owns, can diff, and can
edit forever; Canva gives faster polish and keeps them on the platform.
*(Superseded — see decision 7. Canva is dropped; the contrast is now PPTX
versus self-contained HTML, both from Claude.)*

### The comparison motif

Where a real choice exists, the session runs the same task through two tools
and compares. Where it does not, it says so and explains why.

- Stages 1–2: Gemini **and** ChatGPT. Same prompt, two outputs, compared.
- Stages 3–4: Gemini only. State plainly that the alternatives either need a
  trial subscription, watermark every free export, or run out of credits
  mid-session. "There is currently one workable free option" is a finding,
  not a gap.
- Stage 6: Claude **and** Canva. A portable file you own against platform
  design polish. *(Superseded — see decision 7. Now Claude's PPTX against
  Claude's self-contained HTML: one tool held constant, two output formats
  compared — a sharper comparison than tool versus tool, because everything
  else is controlled.)*

This gives the session a second learning outcome beyond the chain itself —
learners practise judging tools against a task rather than adopting whatever
they saw first. Name it in the introduction so the pattern is visible.

### Stages 3 and 4 are one tool, two intents

Both run in **Gemini's video generation**, confirmed working by direct test
on 2026-08-19. They stay separate stages because the contrast is the lesson:

- **Stage 3** uploads the image the learner built in stages 1 and 2 and adds
  a text prompt that guides the motion. The subject stays theirs.
- **Stage 4** generates from a text prompt alone. Nothing of theirs survives
  into the output.

Ask the class which of the two they would be willing to publish about a real
place, and why. That question does the safety work of the old session in
about ninety seconds, using material they just made themselves.

Using one tool for both stages also removes an account signup. Session 5's
troubleshooting is dominated by setup failure, so every account removed from
a 90-minute session buys more than any single tool's quality advantage.
Pixlr was considered and dropped: it requires a trial subscription.

### Safety becomes a column, not a block

The introduction states three rules once:

1. Label anything generated.
2. No real people without consent.
3. Never present generated work as a record of something that happened.

Every row of the stage log in the journal then carries a **labelled?** field.
The rules get applied six times across the session instead of being taught
once and forgotten. This costs six minutes where the current design spends
twenty-five, and it is stronger pedagogy because it becomes a habit.

The introduction draws on two items from the existing sample set — the
generated image passed off as a record, and the real photograph carrying a
wrong caption. Those are the two sharpest of the six.

## Materials

### New: `session-06-toolkit.html` (plus `-he`)

One page holding the tool table (tool → free tier → what it is for → what it
is bad at), the image-prompt anatomy, and a narration script pattern.

Deliberately a single page rather than material spread across slides,
because tool pricing and capability change fastest and this is the page that
will need updating most often.

**Known risk:** free-tier limits change monthly and cannot be verified from
inside this repo. Gemini video generation is confirmed by Guy's own test on
2026-08-19; everything else in the table is secondary-sourced and must be
checked before teaching. Do not present unverified quota numbers as fact in
learner-facing text.

ChatGPT's free image generation is rate-limited and the current cap is
unverified. Since stages 1 and 2 offer it as one of two routes, confirm the
free limit still allows a generate-then-edit cycle, or the comparison
collapses to Gemini for anyone on a free account.

Two traps to document explicitly, because both fail *during* a session
rather than before it:

- **Runway gives 125 lifetime credits, not monthly.** It looks free, works
  for the first learner who tries it, then dies mid-session with no
  recovery. It belongs in the troubleshooting table, not the tool table.
- **Kling AI watermarks every free export**, with no paid-free workaround.
  Acceptable as a fallback, but it puts a visible watermark on the artifact
  the session exists to produce. Disclose it before anyone picks that route.

### Retained unchanged in substance

`personal-course/instructor/samples/session-06-asset-set.html` and
`session-06-answers.html`, in both languages, stay on disk. They supply the two introduction examples and remain a
fallback for a facilitator with no example of their own. They receive the
terminology fix below but no structural change.

## Hebrew terminology

**Do not use נכס for "asset".** It is a calque; the English media-industry
sense does not carry into Hebrew, where the word means a property or holding.

Replace by context:

- collective → **חומרים** (`חומרים לדוגמה`, not `נכסים לדוגמה`)
- one item → **פריט**
- best → the concrete noun: **תמונה**, **סרטון**, **קטע**

The word currently appears about thirty times across six Hebrew files, all
in session 6 apart from the legacy `personal-course/he/lesson-11.md`. The
sweep covers the session 6 files; that legacy file is optional.

Hebrew files are authored, not translated. The English and Hebrew versions
carry the same meaning as two separate pieces of writing.

## Files

**English**

- `personal-course/sessions/session-06-trustworthy-visual-story.md` — rewritten
- `personal-course/instructor/sessions/session-06-guide.md` — rewritten
- `personal-course/instructor/samples/session-06-slides.html` — rewritten
- `personal-course/instructor/samples/session-06-toolkit.html` — new
- `personal-course/student/en/ai-learning-journal.md` — session-06 tab replaced

**Hebrew**

- `personal-course/he/sessions/session-06-trustworthy-visual-story.md`
- `personal-course/he/instructor/sessions/session-06-guide.md`
- `personal-course/instructor/samples/session-06-slides-he.html`
- `personal-course/instructor/samples/session-06-toolkit-he.html` — new
- `personal-course/student/he/ai-learning-journal.md`

**Terminology sweep only**

- `personal-course/instructor/samples/session-06-asset-set-he.html`
- `personal-course/instructor/samples/session-06-answers-he.html`

**Shared**

- `scripts/check-personal-seven-sessions.mjs` — title strings, both locales
- `site/assets/js/personal-course.js` — entry `{n:6,...}`, titles and blurbs

### New journal tables

Replacing the story-contract / storyboard / truth-review trio:

1. **Production plan** — subject, audience, what the piece must say, chosen
   route per stage.
2. **Stage log** — stage, tool used, prompt or settings, what came back,
   what was fixed, **labelled?**
3. **Tool verdict** — tool, free-tier limit hit, what it did well, what it
   did badly, use again?

The `labelled?` column is what carries the safety material through the
session. It is not optional.

## Title change — the six places

English `Session 6: From Prompt to Presentation`,
Hebrew `מפגש 6: מהנחיה למצגת`.

1. `scripts/check-personal-seven-sessions.mjs` English title list
2. same file, Hebrew title list
3. `personal-course/student/en/ai-learning-journal.md` — tab metadata and `#` heading
4. `personal-course/student/he/ai-learning-journal.md` — same
5. `site/assets/js/personal-course.js` — `en:[...]` title and blurb
6. same entry — `he:[...]` title and blurb

The blurbs currently describe traceable claims and consent. They must be
rewritten to describe the production chain.

After this lands, the memory note stating that session titles must never be
reworded needs amending to record that session 6's title was changed
deliberately on 2026-08-19, and that the constraint is "do not reword
casually — they are asserted in six places", not "never change".

## Build and verification

Order matters. The DOCX is a build artifact.

1. Edit the journal markdown, never the DOCX.
2. Check for a `.~lock.*#` file beside the workbooks — Guy may have one open
   in LibreOffice. Ask him to close it rather than overwriting.
3. `node scripts/build-personal-workbooks.mjs`
4. `node scripts/check-personal-workbooks.mjs` — asserts the RTL invariants
   that LibreOffice round-trips silently destroy.
5. Run the rest of the personal-course suite, all of which passed before
   this work began and must pass after:
   - `check-personal-seven-sessions`
   - `check-personal-course-punctuation`
   - `check-course-journal-links`
   - `check-personal-content-review`
   - `check-learning-journal-sources`
   - `check-personal-document-review`
6. Confirm no `נכס` remains in session 6 Hebrew files.
7. Confirm both slide decks parse with no unclosed or mismatched tags, and
   that Hebrew numeric or Latin runs inside RTL text are wrapped `dir="ltr"`
   so bidi does not reorder them.

## Open risks

- **Tool volatility.** This session names more third-party tools than any
  other in the course. The toolkit page concentrates that risk in one file
  by design, so a tool change is a one-file edit rather than a session
  rewrite.
- **Unverifiable quotas.** Free-tier figures other than Gemini's are
  secondary-sourced and need Guy's check before teaching.
- **Single-vendor concentration.** Stages 1 through 5 can all run inside
  Google tooling. That is the reason the session is teachable in 90
  minutes, but the session must teach the *chain*, not the Gemini UI — if a
  stage's teaching point cannot survive the tool being swapped, the stage is
  written wrong. This is the non-goal most at risk during implementation.
- **Timing is untested.** The stage timings are estimates. Session 5's map
  ran short in real delivery, so treat these as provisional until taught.
- **Video generation wall-clock.** Stage 4 depends on a generation finishing
  during the session. The guide must tell the facilitator to start it early
  and continue talking, which is the pattern the existing session 5 and 6
  guides already use.
