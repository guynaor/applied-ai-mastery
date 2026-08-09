# Coherent Personal Sessions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the seven Personal-course sessions as coherent single-scenario learning journeys with integrated artifacts and tool-specific facilitator demonstrations.

**Architecture:** Session briefs become learner-facing narratives with one scenario, sequenced moves, and one artifact. Legacy material moves to instructor-only facilitation kits or clearly optional resources. The portal exposes only the integrated brief to students; instructor mode exposes supporting links and worked tool demonstrations.

**Tech Stack:** Static HTML, vanilla JavaScript, Markdown, Node.js assertions.

---

### Task 1: Add coherent-session regression contract

**Files:**
- Modify: `scripts/check-personal-seven-sessions.mjs`

- [ ] **Step 1: Write failing assertions**

For every English/Hebrew session brief, require `Scenario`, `Sequence`/`מהלך`, and `Integrated artifact`/`תוצר משולב`; reject `Phase A`, `Phase B`, `Phase C`, `Required integrated phases`, and their Hebrew equivalents. Require an optional-resources section in each brief. Require English/Hebrew Session 4 to mention Claude Artifacts and test a normal plus edge case; require Session 7 to mention Claude Desktop least privilege, Claude for Chrome further exploration, and paper-only OpenClaw. Require guide paths under `personal-course/instructor/sessions/` and `personal-course/he/instructor/sessions/`.

- [ ] **Step 2: Run red**

Run: `node scripts/check-personal-seven-sessions.mjs`

Expected: failure because current briefs use legacy phase headings and no session guide paths exist.

- [ ] **Step 3: Commit**

```bash
git add scripts/check-personal-seven-sessions.mjs
git commit -m "test: require coherent personal sessions"
```

### Task 2: Rebuild English learner briefs and facilitator kits

**Files:**
- Modify: every `personal-course/sessions/session-*.md`
- Create: `personal-course/instructor/sessions/session-01-guide.md` through `session-07-guide.md`

- [ ] **Step 1: Rewrite each learner brief**

Use the seven scenarios and artifacts in the approved design. Each has an opening scenario, 3–5 connected moves, one integrated artifact, verification, safety boundary, and optional deeper resources. Remove all legacy phase labeling and required lists of former activities. Do not change or delete the original activity files.

- [ ] **Step 2: Add seven English facilitator guides**

Each guide states preparation, precise timing, exact default tool demonstration request, Claude/ChatGPT/Gemini alternatives, what the facilitator visibly verifies, misconceptions, no-paid/no-tool alternative, and review prompts. Session 4 guides a Claude Artifact for a small self-contained web page/tool, tests one normal and edge case, and names Lovable/Replit as larger-project options. Session 7 demonstrates a bounded Claude Desktop folder/app interaction with non-sensitive sample files, a least-privilege permission review, and result verification; mention Claude for Chrome only as read-only-first further exploration and OpenClaw only as a paper-only boundary case.

- [ ] **Step 3: Run partial contract and commit**

Run: `node scripts/check-personal-seven-sessions.mjs`

Expected: English requirements pass; test may remain red until Hebrew paths exist.

```bash
git add personal-course/sessions personal-course/instructor/sessions
git commit -m "content: create coherent personal session guides"
```

### Task 3: Rebuild Hebrew learner briefs and facilitator kits

**Files:**
- Modify: every `personal-course/he/sessions/session-*.md`
- Create: `personal-course/he/instructor/sessions/session-01-guide.md` through `session-07-guide.md`

- [ ] **Step 1: Rewrite Hebrew learner briefs**

Translate the coherent scenarios, connected moves, artifacts, checks, boundaries, and optional resources. Keep the English tool names where appropriate, but explain their role in clear Hebrew. No legacy phase headings or former-activity completion requirement.

- [ ] **Step 2: Add Hebrew facilitator guides**

Translate every English guide’s demonstration, timing, alternatives, verification, and safety language. Session 1 remains a 55-minute facilitator-ready sequence. Session 4 uses Claude Artifacts for the small tool; Session 7 applies Claude Desktop only to a least-privilege sample folder/app demonstration, with Claude for Chrome and OpenClaw explicitly optional/further exploration.

- [ ] **Step 3: Run green and commit**

Run:

```bash
node scripts/check-personal-seven-sessions.mjs
node scripts/check-learning-journal-sources.mjs
git diff --check
```

Expected: all pass.

```bash
git add personal-course/he/sessions personal-course/he/instructor/sessions
git commit -m "content: localize coherent personal session guides"
```

### Task 4: Simplify student portal resources and verify release readiness

**Files:**
- Modify: `site/assets/js/personal-course.js`
- Modify: `personal.html` only if student-facing wording needs alignment

- [ ] **Step 1: Separate student and instructor resource lists**

Student mode links only the integrated brief. Instructor mode adds the session guide plus optional legacy preparation resources. Retain all original files in instructor metadata but do not render them as required student resources.

- [ ] **Step 2: Run complete validation**

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

- [ ] **Step 3: Commit**

```bash
git add site/assets/js/personal-course.js personal.html
git commit -m "feat: focus personal portal on integrated sessions"
```
