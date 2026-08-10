# Personal Agent Lab and Workbook Clarity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a safe three-route OpenClaw learning path to the Personal Course and make homework explicit in both downloadable journals.

**Architecture:** Keep the common learning objective installation-free in Session 2, then layer optional local and advanced cloud routes around it. Use the Markdown journals as the source of truth for DOCX generation, with small Node content-contract checks to prevent English/Hebrew drift and accidental reintroduction of the paper-only rule.

**Tech Stack:** Markdown course materials, Node.js `assert`, `docx`, JSZip.

---

### Task 1: Add a failing agent-lab content contract

**Files:**
- Create: `scripts/check-personal-agent-lab.mjs`
- Test: `scripts/check-personal-agent-lab.mjs`

- [ ] **Step 1: Write the failing contract**

```js
assert.match(englishSession, /No-install route/);
assert.match(englishSession, /Minimal local lab/);
assert.match(englishSession, /Advanced Adventure/);
assert.match(englishGuide, /OpenClaw/);
assert.match(englishGuide, /kill switch/);
assert.doesNotMatch(englishPortfolio, /paper-only/i);
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node scripts/check-personal-agent-lab.mjs`

Expected: failure because the checker and routes do not exist.

- [ ] **Step 3: Add matching Hebrew assertions**

```js
assert.match(hebrewSession, /ללא התקנה/);
assert.match(hebrewSession, /מעבדה מקומית/);
assert.match(hebrewSession, /הרפתקה מתקדמת/);
assert.match(hebrewGuide, /מתג עצירה/);
assert.doesNotMatch(hebrewPortfolio, /על הנייר בלבד/);
```

- [ ] **Step 4: Run the contract again**

Run: `node scripts/check-personal-agent-lab.mjs`

Expected: still fails only because lesson text is not yet updated.

### Task 2: Add the bilingual Session 2 learning routes and instructor runbooks

**Files:**
- Modify: `personal-course/sessions/session-02-research-buy-monitor.md`
- Modify: `personal-course/he/sessions/session-02-research-buy-monitor.md`
- Modify: `personal-course/instructor/sessions/session-02-guide.md`
- Modify: `personal-course/he/instructor/sessions/session-02-guide.md`
- Test: `scripts/check-personal-agent-lab.mjs`

- [ ] **Step 1: Add the common no-install agent specification activity**

Include target, public allowed sources, trigger, state/duplicate rule, human approval, stop rule, and a test input/output.

- [ ] **Step 2: Add the optional local route**

Use OpenClaw plus Ollama, public/mock data only, one manual run before scheduling, local logs, and no credentials/payment/financial access.

- [ ] **Step 3: Add the Advanced Adventure route**

Require learner-owned account/API credentials, a spend limit, provider authentication, controlled notifications, and the same no-action boundary.

- [ ] **Step 4: Add the facilitator cloud demo runbook**

Specify preflight, paid provider connection, a public shopping monitor, schedule/run/log demonstration, duplicate scenario, failed-source scenario, an alert review, and the kill switch. State that the instructor never exposes API keys.

- [ ] **Step 5: Run the contract to verify it passes**

Run: `node scripts/check-personal-agent-lab.mjs`

Expected: `Personal agent lab content contract passed`.

### Task 3: Make homework goals, steps, and levels clear in both journals

**Files:**
- Modify: `personal-course/student/en/ai-learning-journal.md`
- Modify: `personal-course/student/he/ai-learning-journal.md`
- Modify: `scripts/check-learning-journal-sources.mjs`
- Modify: `scripts/build-personal-workbooks.mjs`
- Modify: `scripts/check-personal-workbooks.mjs`

- [ ] **Step 1: Extend the source-contract test first**

For each Personal Course session tab assert the presence of the localized Goal, Steps, Bronze, Silver, and Gold markers.

```js
assert.match(tab.markdown, /## Goal/);
assert.match(tab.markdown, /## Steps/);
assert.match(tab.markdown, /## Bronze/);
```

- [ ] **Step 2: Run the source contract to verify it fails**

Run: `node scripts/check-learning-journal-sources.mjs`

Expected: failure because the current session tabs do not all contain clear homework blocks.

- [ ] **Step 3: Add one consistent homework block to each English and Hebrew session**

Each block says what to make, gives numbered steps, and defines Bronze as sufficient completion, Silver as standard practice, and Gold as optional extension. Session 2 names the no-install, local, and advanced agent alternatives.

- [ ] **Step 4: Derive DOCX task tables from the journal blocks**

Replace the duplicated hard-coded level copy in `scripts/build-personal-workbooks.mjs` with parsing of each session's task headings/content, preserving colored task rows and RTL tables.

- [ ] **Step 5: Extend DOCX inspection to require Goal/Steps**

Add English and Hebrew localized terms alongside current title/color/RTL assertions.

- [ ] **Step 6: Build and test the workbooks**

Run:

```bash
npm ci
node scripts/check-learning-journal-sources.mjs
node scripts/build-personal-workbooks.mjs
node scripts/check-personal-workbooks.mjs
```

Expected: all commands succeed and both DOCX files include the new homework structure.

### Task 4: Align course geography, portfolio, and final checks

**Files:**
- Modify: `personal-course/ai-geography.md`
- Modify: `personal-course/he/ai-geography.md`
- Modify: `personal-course/sessions/session-07-workflow-portfolio-project.md`
- Modify: `personal-course/he/sessions/session-07-workflow-portfolio-project.md`
- Test: `scripts/check-personal-agent-lab.mjs`

- [ ] **Step 1: Add local/cloud runtime language to both geography pages**

Explain that OpenClaw is a runtime that needs a model provider: a local Ollama model or a cloud/API provider; installed software does not itself provide a model.

- [ ] **Step 2: Change Session 7 to operational review**

Replace the absolute paper-only instruction with evidence review of an optional bounded agent run. Preserve minimum permissions and prohibit payments, account changes, external messages, and sensitive/private data.

- [ ] **Step 3: Run full Personal Course checks**

Run:

```bash
node scripts/check-personal-agent-lab.mjs
node scripts/check-course-journal-links.mjs
node scripts/check-personal-seven-sessions.mjs
node scripts/check-personal-content-review.mjs
node scripts/check-personal-course-punctuation.mjs
node scripts/check-personal-document-review.mjs
git diff --check
```

Expected: every command succeeds.

- [ ] **Step 4: Commit implementation**

```bash
git add personal-course scripts site/assets/downloads docs/superpowers/plans/2026-08-10-personal-agent-lab-and-workbook-clarity.md
git commit -m "feat: add personal course agent lab"
```
