# Hebrew Teacher Course Audience Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Use א׳–י״ב for broad Hebrew Teacher-course audience copy and ליסודי, לחטיבה או לתיכון wherever school stages are explicitly listed.

**Architecture:** Update only Hebrew-facing portal metadata and Teacher Markdown. Extend the existing static Teacher contract to require the exact capstone title and reject the detailed grade-band phrase in Hebrew-facing lines; English content stays unchanged.

**Tech Stack:** Vanilla JavaScript, Markdown, Node.js assertions.

---

### Task 1: Add the failing audience-copy contract

**Files:**
- Modify: `scripts/check-teacher-course.mjs`

- [ ] **Step 1: Add exact Hebrew copy assertions**

Assert that `site/assets/js/teacher-course.js` contains `יחידת לימוד ליסודי, לחטיבה או לתיכון בבדיקת מורה` and `א׳–י״ב`; assert Hebrew-containing lines do not include `יסודי א׳–ו׳`, `חטיבה ז׳–ט׳`, or `תיכון י׳–י״ב`.

- [ ] **Step 2: Run the test red**

Run: `node scripts/check-teacher-course.mjs`

Expected: failure because the current Hebrew portal/capstone copy still lists grade ranges.

### Task 2: Convert Hebrew audience and stage-listing copy

**Files:**
- Modify: `site/assets/js/teacher-course.js`
- Modify: `teacher-course/he/README.md`
- Modify: matching Hebrew Markdown files under `teacher-course/he/` that explicitly list the three grade ranges

- [ ] **Step 1: Update broad audience copy**

Use `א׳–י״ב` for the Hebrew course overview, meta description, and hero copy.

- [ ] **Step 2: Update explicit school-stage lists**

Replace every explicit three-range list with `ליסודי, לחטיבה או לתיכון`. Preserve detailed pedagogical distinctions only when they do not restate the three grade ranges.

- [ ] **Step 3: Run green validation**

Run:

```bash
node scripts/check-teacher-course.mjs
node scripts/validate-teacher-localization.mjs
git diff --check
```

Expected: all pass.

- [ ] **Step 4: Commit**

```bash
git add scripts/check-teacher-course.mjs site/assets/js/teacher-course.js teacher-course/he
git commit -m "fix: simplify Hebrew teacher audience copy"
```
