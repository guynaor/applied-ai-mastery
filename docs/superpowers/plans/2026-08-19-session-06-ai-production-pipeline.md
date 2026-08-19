# Session 6 — From Prompt to Presentation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild personal-course session 6 as a six-stage AI production
pipeline that learners carry one artifact through, with the old trust-and-
labelling material compressed into the introduction.

**Architecture:** Content change across two parallel language trees plus
three shared files. English and Hebrew are authored separately, never
translated. The session's six stages map to slides, a student brief, an
instructor guide, one new toolkit reference page, and three journal tables.
The DOCX workbooks are build artifacts regenerated from the journal markdown.

**Tech Stack:** Markdown, static HTML with inline CSS, Node validation
scripts under `scripts/`, `build-personal-workbooks.mjs` for DOCX output.

**Spec:** `docs/superpowers/specs/2026-08-19-session-06-ai-production-pipeline-design.md`

## Global Constraints

Every task's requirements implicitly include this section.

- **Session title, English:** `Session 6: From Prompt to Presentation`
- **Session title, Hebrew:** `מפגש 6: מהנחיה למצגת`
- **Brief title, English:** `From Prompt to Presentation`
- **Brief title, Hebrew:** `מהנחיה למצגת`
- **Filenames and the portal slug `trustworthy-visual-story` do not change.**
  No file is renamed, moved, or deleted in this plan.
- **Hebrew is authored, not translated.** Write the Hebrew file as its own
  piece of writing carrying the same meaning. Never translate sentence for
  sentence.
- **Never use `נכס` for "asset".** Collective: `חומרים`. One item: `פריט`.
  Best: the concrete noun — `תמונה`, `סרטון`, `קטע`.
- **Hebrew RTL:** wrap Latin-script and multi-part numeric runs in
  `<span dir="ltr">…</span>` inside RTL text so bidi does not reorder them.
- **No unverified quota numbers as fact.** Only Gemini video generation is
  confirmed (Guy's own test, 2026-08-19). Every other free-tier figure is
  secondary-sourced: word it as "at the time of writing" and keep it on the
  toolkit page only, never in slides or the brief.
- **Tool-swap test.** If a stage's teaching point stops making sense when
  its tool is swapped out, the stage is written wrong. Teach the chain, not
  a vendor's UI.
- **Never hand-edit `site/assets/downloads/*.docx`.** Change the journal
  markdown and rebuild.
- **Stage tool map:** stages 1–2 Gemini *or* ChatGPT; stages 3–4 Gemini
  only; stage 5 Google TTS; stage 6 Claude *versus* Canva. Sora is a
  facilitator demo, never a learner task.

## File Structure

**Modified — English**

- `personal-course/sessions/session-06-trustworthy-visual-story.md` — student brief
- `personal-course/instructor/sessions/session-06-guide.md` — instructor guide
- `personal-course/instructor/samples/session-06-slides.html` — projection slides
- `personal-course/student/en/ai-learning-journal.md` — session-06 tab, lines 557–648

**Modified — Hebrew**

- `personal-course/he/sessions/session-06-trustworthy-visual-story.md`
- `personal-course/he/instructor/sessions/session-06-guide.md`
- `personal-course/instructor/samples/session-06-slides-he.html`
- `personal-course/student/he/ai-learning-journal.md` — session-06 tab, lines 557–648

**Created**

- `personal-course/instructor/samples/session-06-toolkit.html`
- `personal-course/instructor/samples/session-06-toolkit-he.html`

**Modified — shared**

- `scripts/check-personal-seven-sessions.mjs` — title strings, both locales
- `site/assets/js/personal-course.js` — the `{n:6,…}` entry, titles and blurbs

**Terminology sweep only**

- `personal-course/instructor/samples/session-06-asset-set-he.html`
- `personal-course/instructor/samples/session-06-answers-he.html`

**Regenerated, never hand-edited**

- `site/assets/downloads/applied-ai-mastery-personal-journal-en.docx`
- `site/assets/downloads/applied-ai-mastery-personal-journal-he.docx`

## Verification model

This is a content project. "Tests" are the repo's Node check scripts plus
exact-string assertions. The full suite passed before this work began and
must pass after every task:

```bash
for s in check-personal-seven-sessions check-personal-course-punctuation \
         check-course-journal-links check-personal-content-review \
         check-learning-journal-sources check-personal-workbooks \
         check-personal-document-review; do
  printf '%s: ' $s; node scripts/$s.mjs >/dev/null 2>&1 && echo PASS || echo FAIL
done
```

Save that as the phrase **"run the suite"** — later tasks refer to it.

HTML well-formedness check. Write this once, before Task 2, then call it by
path wherever a task says **parse-check**:

```bash
mkdir -p /tmp/s6 && cat > /tmp/s6/parsecheck.py <<'EOF'

from html.parser import HTMLParser
import sys
class C(HTMLParser):
    def __init__(s): super().__init__(); s.st=[]; s.bad=[]
    def handle_starttag(s,t,a):
        if t not in ('meta','br','img','hr','input'): s.st.append(t)
    def handle_endtag(s,t):
        if not s.st or s.st[-1]!=t: s.bad.append((t,s.getpos()))
        else: s.st.pop()
for f in sys.argv[1:]:
    p=C(); p.feed(open(f,encoding='utf-8').read())
    print(f,'unclosed:',p.st,'mismatched:',p.bad)
EOF
```

Call it as `python3 /tmp/s6/parsecheck.py FILE...`.

---

### Task 1: Change the session title in all six places

Do this first and alone. It is the only cross-cutting change, it touches a
file a later task also edits, and it must leave the suite green on its own.
Journal **bodies** are not touched here — only the tab marker and the `#`
heading.

**Files:**
- Modify: `scripts/check-personal-seven-sessions.mjs:112` (English list) and the Hebrew list below it
- Modify: `site/assets/js/personal-course.js:22` (the `{n:6,…}` entry)
- Modify: `personal-course/student/en/ai-learning-journal.md:557-558`
- Modify: `personal-course/student/he/ai-learning-journal.md:557-558`

**Interfaces:**
- Produces: the canonical strings `Session 6: From Prompt to Presentation`
  and `מפגש 6: מהנחיה למצגת`, which Task 6 must not alter when it replaces
  the journal tables.

- [ ] **Step 1: Confirm the suite is green before touching anything**

Run the suite. Expected: all seven PASS. If any already fails, stop and
report — do not build on a red baseline.

- [ ] **Step 2: Update the check script's expected titles**

In `scripts/check-personal-seven-sessions.mjs`, inside
`expectedJournalSessionTitles`:

```javascript
// English array — replace this line:
  'Session 6: Tell a True Visual Story',
// with:
  'Session 6: From Prompt to Presentation',

// Hebrew array — replace this line:
  'מפגש 6: לספר סיפור חזותי אמין',
// with:
  'מפגש 6: מהנחיה למצגת',
```

- [ ] **Step 3: Run the check script to verify it now fails**

```bash
node scripts/check-personal-seven-sessions.mjs
```

Expected: FAIL, with a message naming the current integrated session title.
The script now expects the new title; the journals still carry the old one.
This is the failing test.

- [ ] **Step 4: Update both journal tab markers and headings**

`personal-course/student/en/ai-learning-journal.md`, lines 557–558:

```markdown
<!-- journal-tab: {"id":"session-06","title":"Session 6: From Prompt to Presentation"} -->
# Session 6: From Prompt to Presentation
```

`personal-course/student/he/ai-learning-journal.md`, lines 557–558:

```markdown
<!-- journal-tab: {"id":"session-06","title":"מפגש 6: מהנחיה למצגת"} -->
# מפגש 6: מהנחיה למצגת
```

The `id` stays `session-06`. Changing it breaks
`scripts/check-learning-journal-sources.mjs:58`.

- [ ] **Step 5: Update the portal entry**

In `site/assets/js/personal-course.js`, the `{n:6,…}` entry. Keep `slug`,
`legacy`, and all four path fields exactly as they are. Replace only the
`en:` and `he:` pairs:

```javascript
en:['From Prompt to Presentation','Carry one idea through the AI production chain: generate an image, fix it, animate it, narrate it, and build the deck.'],
he:['מהנחיה למצגת','להעביר רעיון אחד לאורך שרשרת ההפקה: ליצור תמונה, לתקן אותה, להנפיש, להקריא ולבנות מצגת.'],
```

- [ ] **Step 6: Run the check script to verify it passes**

```bash
node scripts/check-personal-seven-sessions.mjs && echo PASS
```

Expected: PASS.

- [ ] **Step 7: Run the whole suite**

Run the suite. Expected: all seven PASS.

- [ ] **Step 8: Amend the standing memory about session titles**

The memory at
`/home/guynaor/.claude/projects/-home-guynaor-dev-applied-ai-mastery/memory/hebrew-course-content-is-authored-not-translated.md`
currently says session titles "must not be reworded". Change that sentence
to record that session 6's title was deliberately changed on 2026-08-19,
and that the constraint is *do not reword casually — they are asserted in
six places*, not *never change*. Update the one-line hook in `MEMORY.md` to
match.

- [ ] **Step 9: Commit**

```bash
git add scripts/check-personal-seven-sessions.mjs site/assets/js/personal-course.js \
        personal-course/student/en/ai-learning-journal.md \
        personal-course/student/he/ai-learning-journal.md
git commit -m "feat: retitle session 6 to From Prompt to Presentation"
```

---

### Task 2: Create the toolkit reference page

The page every other session-6 file links to for tool detail. Build it
before the slides and guide so they have something to point at. It is
deliberately one page: tool facts rot fastest and this concentrates them.

**Files:**
- Create: `personal-course/instructor/samples/session-06-toolkit.html`
- Create: `personal-course/instructor/samples/session-06-toolkit-he.html`

**Interfaces:**
- Produces: two pages that Tasks 3, 4 and 5 link to by relative path.
  English link target from the guide: `../../instructor/samples/session-06-toolkit.html`.
  Hebrew link target from the Hebrew guide: `../../../instructor/samples/session-06-toolkit-he.html`.
  Note the differing depth — the Hebrew guide sits one level deeper.

- [ ] **Step 1: Copy the established page shell**

Use `personal-course/instructor/samples/session-06-asset-set.html` as the
CSS and structure reference so the new page matches the existing sample
pages. The Hebrew page takes `<html lang="he" dir="rtl">` and the
`-he.html` suffix, matching `session-06-asset-set-he.html`.

- [ ] **Step 2: Write the four sections**

**Section 1 — the tool table.** Columns: Tool | Stage | Free tier | Watch
out for. Rows:

| Tool | Stage | Free tier | Watch out for |
|---|---|---|---|
| Gemini | 1–2 image, 3–4 video, 5 narration | Free with a Google account; video confirmed working 2026-08-19 | Three stages on one account — if it is down, most of the session is down |
| ChatGPT | 1–2 image | Free tier is rate-limited; cap unverified | If the cap bites mid-session, the two-tool comparison collapses to Gemini |
| Claude | 6 deck | Free tier available | Produces PPTX or self-contained HTML — a file you keep |
| Canva | 6 deck | Free tier available | Design polish, but the deck lives on their platform |
| Sora | demo only | Needs a paid plan | Facilitator demo. Never set as a learner task |

Every free-tier claim except Gemini's carries the words "at the time of
writing" and a line telling the facilitator to check before teaching.

**Section 2 — image prompt anatomy.** Five parts: subject, composition,
light, framing, exclusions. Show one weak prompt and one strong prompt for
the same intent, so the difference is visible rather than described.

**Section 3 — narration script pattern.** Written for the ear: short
sentences, one idea per breath, numbers spoken not written, and a note that
pronunciation of names usually needs a second pass.

**Section 4 — the two traps.** Both fail *during* a session:

- Runway gives 125 **lifetime** credits, not monthly. It looks free, works
  for the first learner, then dies mid-session with no recovery.
- Kling AI watermarks every free export with no workaround, which puts a
  visible mark on the artifact the session exists to produce.

- [ ] **Step 3: Parse-check both pages**

```bash
python3 /tmp/s6/parsecheck.py \
  personal-course/instructor/samples/session-06-toolkit.html \
  personal-course/instructor/samples/session-06-toolkit-he.html
```

Expected: `unclosed: [] mismatched: []` for both.

- [ ] **Step 4: Verify the Hebrew page carries no calque and correct bidi**

```bash
grep -c "נכס" personal-course/instructor/samples/session-06-toolkit-he.html
```

Expected: `0`.

```bash
grep -o 'dir="ltr"' personal-course/instructor/samples/session-06-toolkit-he.html | wc -l
```

Expected: at least one per Latin-script tool name run in prose. Tool names
inside table cells that contain nothing else do not need wrapping.

- [ ] **Step 5: Run the suite**

Expected: all seven PASS.

- [ ] **Step 6: Commit**

```bash
git add personal-course/instructor/samples/session-06-toolkit.html \
        personal-course/instructor/samples/session-06-toolkit-he.html
git commit -m "feat: add session 6 toolkit reference page"
```

---

### Task 3: Rewrite the projection slides

**Files:**
- Modify: `personal-course/instructor/samples/session-06-slides.html`
- Modify: `personal-course/instructor/samples/session-06-slides-he.html`

**Interfaces:**
- Consumes: the toolkit page from Task 2, linked from the tool-comparison slides.
- Produces: eleven slides in session order. Task 5's instructor guide cites
  them by number, so the numbering below is fixed and must not shift.

- [ ] **Step 1: Keep the existing CSS block unchanged**

Both decks already carry the shared slide CSS. Reuse it as-is. If a new
class is needed, add it beside the existing ones rather than restructuring.

- [ ] **Step 2: Write the eleven slides**

Fixed inventory. Slide numbers are referenced by the guide:

1. **The three rules** — label what is generated; no real people without
   consent; never pass generated work off as a record. Stated once, applied
   all session.
2. **The chain** — the six stages as one map, with the note that one
   subject travels the whole way.
3. **Prompt anatomy** — subject, composition, light, framing, exclusions,
   with a weak and a strong prompt side by side.
4. **Same prompt, two tools** — Gemini and ChatGPT. What to compare:
   who followed the exclusions, who invented detail, which is closer to
   what you asked.
5. **Fix the region, do not re-roll** — re-rolling the whole prompt
   destroys whatever already worked.
6. **Animate your own image** — Gemini, image upload plus a guiding
   prompt. The prompt steers the motion; it does not invent the subject.
7. **Generate from text alone** — Gemini, no image. What video generation
   is bad at: text, hands, continuity, physics. Shoot short.
8. **Which of those two would you publish about a real place?** — the
   safety callback, using material the class just made. This is the slide
   that replaces the old session's twenty-five-minute labelling block.
9. **Write for the ear** — narration. Short sentences, one idea per
   breath, numbers spoken.
10. **Claude versus Canva** — a comparison table: what you get, where it
    lives, can you edit it in a year, what it is good at.
11. **Exit check** — the completion sentence and the reflection question.

Slide 8 must use the learners' own stage-3 and stage-4 output, not a
prepared example. That is what makes the safety point land in ninety
seconds instead of twenty-five minutes.

- [ ] **Step 3: Parse-check both decks**

Expected: `unclosed: [] mismatched: []` for both.

- [ ] **Step 4: Verify EN and HE carry identical figures**

```bash
for f in personal-course/instructor/samples/session-06-slides.html \
         personal-course/instructor/samples/session-06-slides-he.html; do
  echo "--- $f"
  sed -n '/<body>/,$p' $f | grep -o '[0-9]\+\(\.[0-9]\+\)\?' | sort -n | uniq -c | tr '\n' ' '; echo
done
```

Expected: the two lists match on every figure. Counts may differ where
Hebrew spells a small number as a word; any *value* present in one deck and
absent from the other is a defect.

- [ ] **Step 5: Verify no calque and no stale tool names**

```bash
grep -c "נכס" personal-course/instructor/samples/session-06-slides-he.html
grep -ci "pixlr\|runway\|kling" personal-course/instructor/samples/session-06-slides.html
```

Expected: `0` for both. Rejected tools belong on the toolkit page's traps
section, not on a projection slide.

- [ ] **Step 6: Run the suite, then commit**

```bash
git add personal-course/instructor/samples/session-06-slides.html \
        personal-course/instructor/samples/session-06-slides-he.html
git commit -m "feat: rewrite session 6 slides as the production pipeline"
```

---

### Task 4: Rewrite the student brief

**Files:**
- Modify: `personal-course/sessions/session-06-trustworthy-visual-story.md`
- Modify: `personal-course/he/sessions/session-06-trustworthy-visual-story.md`

**Interfaces:**
- Consumes: the toolkit page from Task 2.
- Produces: the brief the portal links via `briefEn` / `briefHe`. The
  filename must not change — the portal entry points at it by path.

- [ ] **Step 1: Match the established brief structure**

Read `personal-course/sessions/session-05-design-physical-project.md` for
the house pattern: `# Session N — Title`, then `**Time:**`, `**Outcome:**`,
`## Scenario`, `## Sequence` as a numbered list with per-step minutes,
`## Integrated artifact`, `## Optional resources`.

- [ ] **Step 2: Write the six-step sequence**

One numbered step per stage, each with its minutes, matching the spec's
session design table. The artifact section describes the finished piece:
the image, the fixed version, the animated clip, the generated clip, the
narration, and the deck — plus the label on everything generated.

- [ ] **Step 3: Write the free-route paragraph**

Every other session in this course promises a no-cost path, and this one
must too. State that the whole chain runs free on a Google account, that
ChatGPT is an optional second opinion at stages 1–2, and that Sora is
something they will watch rather than run. Link the toolkit page.

- [ ] **Step 4: Verify structure and terminology**

```bash
grep -c "^## " personal-course/sessions/session-06-trustworthy-visual-story.md
grep -c "נכס" personal-course/he/sessions/session-06-trustworthy-visual-story.md
grep -c "From Prompt to Presentation" personal-course/sessions/session-06-trustworthy-visual-story.md
```

Expected: at least 4 section headings; `0` for `נכס`; at least 1 title match.

- [ ] **Step 5: Run the suite, then commit**

`check-course-journal-links` and `check-personal-content-review` both read
these files. Expected: all seven PASS.

```bash
git add personal-course/sessions/session-06-trustworthy-visual-story.md \
        personal-course/he/sessions/session-06-trustworthy-visual-story.md
git commit -m "feat: rewrite session 6 student brief as the production chain"
```

---

### Task 5: Rewrite the instructor guide

The largest single file. It is taught from directly, so it carries the
timings, the what-to-say blocks, the troubleshooting table, and the rubric.

**Files:**
- Modify: `personal-course/instructor/sessions/session-06-guide.md`
- Modify: `personal-course/he/instructor/sessions/session-06-guide.md`

**Interfaces:**
- Consumes: slide numbers 1–11 from Task 3, the toolkit page from Task 2,
  and the brief from Task 4. Every slide citation must resolve to a slide
  that exists.

- [ ] **Step 1: Keep the guide's existing section skeleton**

The current guide's shape works and is shared with sessions 5 and 7: header
block, session materials table, recommended way, start-slow-things, before
learners arrive, session map, per-block sections, rubric, troubleshooting,
differentiation, after the session. Keep all of it. Replace the content.

- [ ] **Step 2: Update the session materials table**

Add the toolkit page. Keep the asset set and answers pages listed, with
their purpose changed to "two examples for the opening, and a fallback".

- [ ] **Step 3: Write the per-block sections against the spec timings**

0–10 homework, 10–16 intro and three rules, 16–27 generate, 27–38 fix,
38–46 move, 46–56 video, 56–65 narrate, 65–85 assemble, 85–90 exit.

The 10–16 intro block must draw its two examples from the retained
`session-06-asset-set.html`: the generated image passed off as a record,
and the real photograph carrying a wrong caption. Two items, not six. The
old session spent twenty-five minutes walking all six; this spends six
minutes on the two sharpest and then lets slide 8 do the rest with the
learners' own output.

Two facilitator notes carried over from the existing guides because they
matter more here than anywhere else:

- **Start slow things in the background.** Stage 4 depends on a generation
  finishing during the session. Send it and keep talking.
- **The demonstration runs on the facilitator's machine.** Note that the
  desktop, not a laptop, is the machine to plan a render-heavy session on.

- [ ] **Step 4: Write the troubleshooting table**

Must include, at minimum:

| Situation | Facilitator response |
|---|---|
| Someone used Runway and ran out mid-session | 125 lifetime credits, not monthly. Move them to Gemini and continue |
| Their export has a Kling watermark | Expected on that free tier. Note it, and use it as a labelling example |
| ChatGPT hit its image cap | Drop to Gemini. The comparison is lost for them, not the stage |
| A video generation has not returned | Move to the next stage and come back. Never wait on screen |
| Someone wants to publish a generated clip as a record of a real place | That is slide 8. Do not resolve it — run the discussion |

- [ ] **Step 5: Verify slide citations resolve**

```bash
grep -o 'slide [0-9]*' personal-course/instructor/sessions/session-06-guide.md | sort -u
grep -c '<section class="slide">' personal-course/instructor/samples/session-06-slides.html
```

Expected: every cited slide number is ≤ the section count, which must be 11.

- [ ] **Step 6: Verify terminology**

```bash
grep -c "נכס" personal-course/he/instructor/sessions/session-06-guide.md
```

Expected: `0`.

- [ ] **Step 7: Run the suite, then commit**

```bash
git add personal-course/instructor/sessions/session-06-guide.md \
        personal-course/he/instructor/sessions/session-06-guide.md
git commit -m "feat: rewrite session 6 instructor guide for the six stages"
```

---

### Task 6: Replace the journal tables and rebuild the workbooks

**Files:**
- Modify: `personal-course/student/en/ai-learning-journal.md` — body of the session-06 tab only
- Modify: `personal-course/student/he/ai-learning-journal.md` — same
- Regenerate: `site/assets/downloads/applied-ai-mastery-personal-journal-en.docx`
- Regenerate: `site/assets/downloads/applied-ai-mastery-personal-journal-he.docx`

**Interfaces:**
- Consumes: the titles set in Task 1. **Do not touch lines 557–558 in
  either journal** — the tab marker and `#` heading are already correct.
  Replace only the body between the heading and the `session-07` tab marker.

- [ ] **Step 1: Check for a LibreOffice lock file before doing anything**

```bash
ls -a site/assets/downloads/ | grep '^\.~lock' || echo "no lock, safe to build"
```

If a lock file exists, Guy has a workbook open. Stop and ask him to close
it. Building over an open file is how the RTL corruption happened before.

- [ ] **Step 2: Replace the three tables in the English journal**

Between the `# Session 6: From Prompt to Presentation` heading and the
`<!-- journal-tab: {"id":"session-07"…` marker, replace the existing
story-contract / storyboard / truth-review tables with:

```markdown
## 1. The production plan

| Subject | Audience | What the piece must say | Tool per stage |
| --- | --- | --- | --- |
| Example: the walk I do every morning | My family | That the route is worth an early start | Gemini throughout; Claude for the deck |
|  |  |  |  |

## 2. Stage log

| Stage | Tool | Prompt or setting | What came back | What I fixed | Labelled? |
| --- | --- | --- | --- | --- | --- |
| 1 Generate |  |  |  |  |  |
| 2 Fix |  |  |  |  |  |
| 3 Move |  |  |  |  |  |
| 4 Video |  |  |  |  |  |
| 5 Narrate |  |  |  |  |  |
| 6 Assemble |  |  |  |  |  |

## 3. Tool verdict

| Tool | Did I hit a free limit? | What it did well | What it did badly | Use again? |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
```

The **Labelled?** column is not optional. It is what carries the safety
material through the session.

- [ ] **Step 3: Replace the three tables in the Hebrew journal**

Same three tables, authored in Hebrew. Column headers:

```markdown
## 1. תוכנית ההפקה

| הנושא | הקהל | מה היצירה צריכה לומר | הכלי בכל שלב |

## 2. יומן השלבים

| השלב | הכלי | ההנחיה או ההגדרה | מה חזר | מה תיקנתי | מסומן? |

## 3. חוות דעת על הכלים

| הכלי | נתקלתי במגבלה חינמית? | מה עשה טוב | מה עשה רע | להשתמש שוב? |
```

Stage row labels in Hebrew: `1 יצירה`, `2 תיקון`, `3 הנפשה`, `4 וידאו`,
`5 הקראה`, `6 הרכבה`.

- [ ] **Step 4: Update the Goal / Steps / Bronze / Silver / Gold blocks**

The tab also carries these after the tables. Rewrite them for the pipeline:
Bronze is the chain completed with labels; Silver adds the tool comparison
at stages 1–2 and a working narration; Gold shows it to someone in the
intended audience and revises.

- [ ] **Step 5: Verify the titles survived**

```bash
node scripts/check-personal-seven-sessions.mjs && echo "titles intact"
```

Expected: PASS. If it fails, Step 2 or 3 overwrote line 557 or 558.

- [ ] **Step 6: Rebuild the workbooks**

```bash
node scripts/build-personal-workbooks.mjs
```

- [ ] **Step 7: Verify the RTL invariants**

```bash
node scripts/check-personal-workbooks.mjs && echo PASS
```

Expected: PASS. This asserts `w:bidiVisual` survives on Hebrew tables. A
failure here means the Hebrew tables will show English column order in Word
even though they look correct in LibreOffice.

- [ ] **Step 8: Run the suite, then commit**

```bash
git add personal-course/student/en/ai-learning-journal.md \
        personal-course/student/he/ai-learning-journal.md \
        site/assets/downloads/applied-ai-mastery-personal-journal-en.docx \
        site/assets/downloads/applied-ai-mastery-personal-journal-he.docx
git commit -m "feat: replace session 6 journal tables with the stage log"
```

---

### Task 7: Hebrew terminology sweep on the retained pages

The asset set and answers pages stay in use — they supply the two opening
examples. They still say `נכס` about thirty times.

**Files:**
- Modify: `personal-course/instructor/samples/session-06-asset-set-he.html`
- Modify: `personal-course/instructor/samples/session-06-answers-he.html`

**Interfaces:**
- Consumes: nothing. Independent of Tasks 1–6 and safe to run in any order
  after them.

- [ ] **Step 1: Count the starting occurrences**

```bash
grep -c "נכס" personal-course/instructor/samples/session-06-asset-set-he.html \
              personal-course/instructor/samples/session-06-answers-he.html
```

Record the numbers. This is the failing test: any count above zero fails.

- [ ] **Step 2: Replace by context, not by find-and-replace**

A blind substitution produces bad Hebrew. Work through each occurrence:

- `נכסים לדוגמה` (title, heading) → `חומרים לדוגמה`
- `נכס 1`, `נכס 2` … (item headings) → `פריט 1`, `פריט 2` …
- `כל נכס שנערך או נוצר` → name the things: `כל תמונה או סרטון שנערכו או נוצרו`
- table header `נכס` → `פריט`
- `שישה נכסים` → `שישה פריטים`

- [ ] **Step 3: Verify the sweep is complete**

```bash
grep -c "נכס" personal-course/instructor/samples/session-06-asset-set-he.html \
              personal-course/instructor/samples/session-06-answers-he.html
```

Expected: `0` for both.

- [ ] **Step 4: Parse-check both pages**

Expected: `unclosed: [] mismatched: []`. Hebrew edits inside HTML are where
a stray tag is easiest to introduce.

- [ ] **Step 5: Confirm the answers page still hides its answers**

```bash
grep -c "פריט 4\|פריט 6" personal-course/instructor/samples/session-06-answers-he.html
```

Expected: at least 2. The answers page must still name the two problematic
items after renaming, or the opening exercise loses its payoff.

- [ ] **Step 6: Run the suite, then commit**

```bash
git add personal-course/instructor/samples/session-06-asset-set-he.html \
        personal-course/instructor/samples/session-06-answers-he.html
git commit -m "fix: replace the נכס calque in the session 6 Hebrew pages"
```

---

### Task 8: Whole-session verification

Nothing new is written here. This is the gate that catches cross-file drift
the per-task checks cannot see.

**Files:** none modified unless a defect is found.

- [ ] **Step 1: Run the full suite one more time**

Expected: all seven PASS.

- [ ] **Step 2: Confirm the calque is gone from every session 6 file**

```bash
grep -rc "נכס" personal-course/ --include='*session-06*' | grep -v ':0' || echo "clean"
```

Expected: `clean`.

- [ ] **Step 3: Confirm no rejected tool leaked into learner-facing text**

```bash
grep -ril "pixlr" personal-course/ | grep -v toolkit || echo "clean"
```

Expected: `clean`. Pixlr may appear only on the toolkit page's traps
section, if at all.

- [ ] **Step 4: Confirm every session-6 HTML page parses**

```bash
python3 /tmp/s6/parsecheck.py personal-course/instructor/samples/session-06-*.html
```

Expected: `unclosed: [] mismatched: []` for all six pages.

- [ ] **Step 5: Confirm the portal still resolves every session 6 path**

```bash
node -e "
const s=require('fs').readFileSync('site/assets/js/personal-course.js','utf8');
const m=s.match(/\{n:6,[^}]*\}/)[0];
for(const p of m.match(/'[a-z][^']*\.md'/g)||[]) {
  const f=p.slice(1,-1);
  console.log(require('fs').existsSync(f)?'OK  '+f:'MISSING '+f);
}"
```

Expected: four `OK` lines. A `MISSING` means a task renamed a file, which
the global constraints forbid.

- [ ] **Step 6: Read the session end to end as a facilitator**

Open the brief, the guide, the slides and the toolkit page together. Check
the three things no script can: that the six stages tell one story, that
every slide the guide cites says what the guide claims it says, and that
each stage's teaching point still holds if you swap its tool out. If a
stage fails the last test, it is written wrong — fix it before the final
commit.

- [ ] **Step 7: Report what needs Guy's verification before teaching**

The plan cannot settle these. Report them explicitly:

- ChatGPT's current free image-generation cap, which decides whether the
  stage 1–2 comparison survives on a free account.
- Every free-tier figure on the toolkit page except Gemini's.
- The stage timings, which are estimates. Session 5's map ran short in real
  delivery, so treat session 6's as provisional until it has been taught.
