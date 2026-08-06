# Hebrew Teacher Grade-Band Terminology Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Hebrew Teacher-track K–12/four-band language with Israeli school bands: יסודי א׳–ו׳, חטיבה ז׳–ט׳, ותיכון י׳–י״ב.

**Architecture:** English Teacher content stays unchanged. A single contract test protects Hebrew-facing sources against legacy grade-band references, then Hebrew portal copy and Markdown are edited to use the three approved Israeli bands while preserving instructional intent and document structure.

**Tech Stack:** Vanilla JavaScript, Markdown, Node.js assertion scripts.

---

### Task 1: Add a failing Israeli-grade-band contract

**Files:**
- Modify: `scripts/check-teacher-course.mjs`
- Test: `scripts/check-teacher-course.mjs`

- [ ] **Step 1: Add Hebrew source inventory and assertions**

Add an inventory containing `teacher.html`, `site/assets/js/teacher-course.js`, and every Markdown file under `teacher-course/he/`. Read each source and assert it contains the three required terms `יסודי`, `חטיבה`, and `תיכון` across the combined Hebrew corpus. Assert no source contains `K–12`, `K-12`, `K–2`, `K-2`, `3–5`, `3-5`, `6–8`, `6-8`, `9–12`, or `9-12`.

- [ ] **Step 2: Run the contract to prove it fails**

Run: `node scripts/check-teacher-course.mjs`

Expected: failure identifying existing Hebrew K–12/four-band terminology.

- [ ] **Step 3: Commit the red contract**

```bash
git add scripts/check-teacher-course.mjs
git commit -m "test: require Israeli Hebrew grade bands"
```

### Task 2: Convert Hebrew Teacher content to Israeli grade bands

**Files:**
- Modify: `teacher.html`
- Modify: `site/assets/js/teacher-course.js`
- Modify: every matching Markdown file under `teacher-course/he/`

- [ ] **Step 1: Update Hebrew portal metadata and copy**

Keep all English strings unchanged. In Hebrew UI strings, replace generic K–12 framing with `יסודי א׳–ו׳, חטיבה ז׳–ט׳ ותיכון י׳–י״ב`. Update Hebrew mission summaries and capstone copy only where a grade-band reference appears.

- [ ] **Step 2: Adapt Hebrew instructional examples**

Replace each four-band progression with a three-band progression that preserves its teaching purpose:

```text
יסודי א׳–ו׳ — התבוננות מודרכת, המחשה, שיח ותמיכות שפה.
חטיבה ז׳–ט׳ — השוואת ראיות, דיון מובנה וטענה–ראיה–הנמקה.
תיכון י׳–י״ב — ביקורת מקור, שיטה, אתיקה או טיעון אזרחי.
```

Do not modify English Markdown, CSV/HTML artifacts, identifiers, relative links, fenced code, or numerical requirements unrelated to grade bands.

- [ ] **Step 3: Run grade-band and localization contracts**

Run:

```bash
node scripts/check-teacher-course.mjs
node scripts/validate-teacher-localization.mjs
```

Expected: both pass; the localization validator confirms the translated Markdown heading, fence, identifier, number, and link structure remains valid.

- [ ] **Step 4: Commit the terminology conversion**

```bash
git add teacher.html site/assets/js/teacher-course.js teacher-course/he scripts/check-teacher-course.mjs
git commit -m "fix: use Israeli grade bands in Hebrew teacher track"
```

### Task 3: Verify integration and publish

**Files:**
- Modify: `README.md` only if it contains Hebrew Teacher grade-band wording

- [ ] **Step 1: Run the full static suite**

Run:

```bash
node scripts/check-teacher-course.mjs
node scripts/validate-teacher-localization.mjs
node scripts/check-professional-i18n.mjs
node scripts/check-course-journal-links.mjs
node scripts/check-learning-journal-sources.mjs
git diff --check
```

Expected: all Node scripts print pass messages and `git diff --check` prints no output.

- [ ] **Step 2: Commit any required README wording**

```bash
git add README.md
git commit -m "docs: align Hebrew teacher grade bands"
```

- [ ] **Step 3: Publish after verification**

Push `fix/hebrew-grade-bands`, create a PR against `main`, merge it, update this checkout with `git pull --ff-only origin main`, then deploy only Firebase Hosting to project `applied-ai-mastery`.
