# Site Favicon Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one reusable SVG favicon based on the Applied AI Mastery header mark and reference it from every static entry page.

**Architecture:** Keep the icon as a standalone static asset in `site/assets/`, with each entry page using the same relative favicon link. A focused Node contract check protects the asset path and page integration without adding a browser dependency.

**Tech Stack:** Static HTML, SVG, Node.js assertions.

---

### Task 1: Define the favicon contract

**Files:**
- Create: `scripts/check-favicon.mjs`

- [ ] **Step 1: Write the failing contract check**

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');
const favicon = read('site/assets/favicon.svg');
for (const page of ['index.html', 'personal.html', 'professional.html', 'document.html']) {
  assert.match(read(page), /<link rel="icon" type="image\/svg\+xml" href="site\/assets\/favicon\.svg">/);
}
assert.match(favicon, /<svg\b/);
console.log('Favicon contract passed');
```

- [ ] **Step 2: Run the check and confirm it fails before the asset exists**

Run: `node scripts/check-favicon.mjs`

Expected: failure because `site/assets/favicon.svg` does not yet exist.

### Task 2: Add and wire the SVG asset

**Files:**
- Create: `site/assets/favicon.svg`
- Modify: `index.html`
- Modify: `personal.html`
- Modify: `professional.html`
- Modify: `document.html`

- [ ] **Step 1: Add the reusable SVG favicon**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="18" fill="#123b4a"/>
  <rect x="5" y="5" width="54" height="54" rx="14" fill="#13756f"/>
  <text x="32" y="40" fill="#fff" font-family="Arial, sans-serif" font-size="25" font-weight="700" text-anchor="middle">AI</text>
</svg>
```

- [ ] **Step 2: Reference the shared asset from every page head**

```html
<link rel="icon" type="image/svg+xml" href="site/assets/favicon.svg">
```

Place the link after the existing theme-color metadata in `index.html`, `personal.html`, `professional.html`, and `document.html`.

- [ ] **Step 3: Run the contract and syntax checks**

Run:

```bash
node scripts/check-favicon.mjs
git diff --check
```

Expected: `Favicon contract passed` and no diff errors.

- [ ] **Step 4: Commit the feature**

```bash
git add site/assets/favicon.svg scripts/check-favicon.mjs index.html personal.html professional.html document.html
git commit -m "site: add applied AI favicon"
```
