# Personal Seven-Session Course Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a bilingual, audience-neutral Personal course with seven integrated 45–60 minute sessions, retaining all current activities and embedding optional Claude, ChatGPT, Gemini, Gemini Deep Research, and safety-first agent workflows.

**Architecture:** Keep the existing activity files as source resources, but introduce seven integrated session briefs in English and Hebrew. Replace the twelve-card portal metadata/progress model with seven session records that link every original activity as a phase resource. Update journal tabs and static contracts together so portal navigation, progress, and material counts are internally consistent.

**Tech Stack:** Static HTML, vanilla JavaScript, Markdown, Node.js assertion scripts.

---

### Task 1: Define the seven-session portal contract

**Files:**
- Create: `scripts/check-personal-seven-sessions.mjs`
- Modify: `scripts/check-learning-journal-sources.mjs`

- [ ] **Step 1: Write a failing contract**

Use `node:assert/strict` and file reads to require exactly seven Personal session records; seven-item progress; 45–60 minute labels; audience-neutral copy (reject `young adults`, `before university`, and Hebrew equivalents); session links under `personal-course/sessions/` and `personal-course/he/sessions/`; Session 1 references prompting, summary, decision, privacy, and Claude/ChatGPT/Gemini; Session 2 includes `Gemini Deep Research`, an evidence matrix, verification, and a free-access alternative.

Update journal expectations from twelve lesson tabs to seven session tabs plus course-level tabs in both languages.

- [ ] **Step 2: Run red**

Run: `node scripts/check-personal-seven-sessions.mjs`

Expected: failure because seven-session metadata and files do not exist.

- [ ] **Step 3: Commit**

```bash
git add scripts/check-personal-seven-sessions.mjs scripts/check-learning-journal-sources.mjs
git commit -m "test: define seven-session personal course"
```

### Task 2: Create seven integrated English session briefs

**Files:**
- Create: `personal-course/sessions/session-01-ask-summarize-decide.md`
- Create: `personal-course/sessions/session-02-research-buy-monitor.md`
- Create: `personal-course/sessions/session-03-plan-real-life-together.md`
- Create: `personal-course/sessions/session-04-build-personal-tool.md`
- Create: `personal-course/sessions/session-05-design-physical-project.md`
- Create: `personal-course/sessions/session-06-trustworthy-visual-story.md`
- Create: `personal-course/sessions/session-07-workflow-portfolio-project.md`
- Modify: `personal-course/README.md`

- [ ] **Step 1: Write each 45–60 minute learner brief**

Each brief includes a one-sentence outcome, time-boxed flow, original activities/resources to complete, one integrated artifact, verification checklist, private-data warning, optional Claude/ChatGPT/Gemini path, and a free-access/facilitator-observation alternative. Preserve all original activities by linking their activity, workbook, mission, and instructor resource paths as phases.

- [ ] **Step 2: Implement required integrated content**

Session 1 combines prompting, structured summary, and decision workbook. Session 2 combines shopping comparison, safe alert specification, responsible investment research, and Gemini Deep Research: plan → sources → evidence matrix → uncertainty → independent verification. Session 3 combines travel and event planning. Sessions 4–6 retain mini app, room CAD, and visual storytelling. Session 7 combines personal-brand activity, portfolio evidence, capstone, optional Claude Desktop permissions map, and optional OpenClaw boundary exercise; neither tool is required or installed.

- [ ] **Step 3: Update English overview**

Replace young-adult framing and twelve 20–30 minute lessons with an all-life-stages, seven 45–60 minute session map. Preserve existing safety boundaries and explain that paid tools are optional.

- [ ] **Step 4: Commit**

```bash
git add personal-course/README.md personal-course/sessions
git commit -m "content: add seven personal course sessions"
```

### Task 3: Create Hebrew integrated session briefs and instructor-ready guidance

**Files:**
- Create: `personal-course/he/sessions/session-01-ask-summarize-decide.md` through `session-07-workflow-portfolio-project.md`
- Modify: `personal-course/he/README.md`
- Modify: `personal-course/he/learning-journal.md`

- [ ] **Step 1: Translate all seven session briefs**

Keep the same heading structure, timing, activity links, safety checks, and tool alternatives as English. Use clear Hebrew that does not depend on a paid subscription. Translate Gemini Deep Research as a concrete workflow, not a substitute for source verification.

- [ ] **Step 2: Make Session 1 tomorrow-ready**

Give Session 1 a facilitator-ready 45–60 minute flow: AI geography/privacy (10), structured request (10), source-grounded summary (10), decision comparison (15), verification/journal reflection (10). Link the existing step-by-step instructor guides for lessons 1–3, state where a facilitator can demonstrate Claude, ChatGPT, or Gemini, and state that learners may use any one accessible tool or observe.

- [ ] **Step 3: Rebuild the Hebrew journal tabs**

Replace twelve lesson tabs with seven session tabs while retaining prompt library, reflection, evidence, verification, privacy, and next-time prompts.

- [ ] **Step 4: Commit**

```bash
git add personal-course/he
git commit -m "content: localize seven personal course sessions"
```

### Task 4: Replace the Personal portal with seven session cards

**Files:**
- Modify: `personal.html`
- Modify: `site/assets/js/personal-course.js`
- Modify: `site/assets/js/index-i18n.js`
- Modify: `index.html`

- [ ] **Step 1: Replace twelve metadata records with seven**

Each record has bilingual title, summary, 45–60 minute label, direct bilingual session brief, and original resources grouped as integrated phases. Progress, completion, mission selection, and journal tracking use IDs 1–7 and the new `aam-personal-sessions` storage key; migrate valid old completion values into the relevant session rather than discarding browser history.

- [ ] **Step 2: Update bilingual portal copy**

Replace young-adult and 20–30 minute language with audience-neutral seven-session copy in portal HTML, JavaScript, and the course selector. Update headings, progress maximums, XP wording, capstone copy, and accessibility labels.

- [ ] **Step 3: Preserve instructor visibility**

Student mode shows each integrated session brief and the phase resources needed to complete it. Instructor mode additionally exposes every original instructor guide/script and review guidance. Do not hide any existing activity or instructor file.

- [ ] **Step 4: Run the new contract green**

Run: `node scripts/check-personal-seven-sessions.mjs && node scripts/check-learning-journal-sources.mjs`

Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add personal.html site/assets/js/personal-course.js index.html site/assets/js/index-i18n.js scripts
git commit -m "feat: present personal course in seven sessions"
```

### Task 5: Final test-readiness verification

**Files:**
- Modify: `README.md` if its Personal-track description needs audience/session-count updates

- [ ] **Step 1: Run all static checks**

```bash
node scripts/check-personal-seven-sessions.mjs
node scripts/check-learning-journal-sources.mjs
node scripts/check-personal-content-review.mjs
node scripts/check-personal-course-punctuation.mjs
node scripts/check-course-journal-links.mjs
node scripts/check-professional-i18n.mjs
node scripts/check-teacher-course.mjs
node scripts/validate-teacher-localization.mjs
git diff --check
```

- [ ] **Step 2: Manually verify the Session 1 facilitation path**

Open Personal in English and Hebrew. Confirm the first card says 45–60 minutes, opens the new Session 1 brief, links prompting/summary/decision activities and instructor support, presents Claude/ChatGPT/Gemini as optional alternatives, and retains a no-paid-feature route.

- [ ] **Step 3: Commit final documentation**

```bash
git add README.md
git commit -m "docs: describe seven-session personal course"
```
