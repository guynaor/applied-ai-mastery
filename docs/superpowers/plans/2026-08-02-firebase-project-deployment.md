# Firebase Project Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create an independent `ai-mastery` Firebase project and deploy the existing no-build static website to its default Hosting site.

**Architecture:** The repository remains a static site published from its root by the existing `firebase.json`. A repository-local `.firebaserc` binds Firebase CLI commands to the new project, while all deployment commands retain an explicit `--project ai-mastery` guard. No backend service or billing configuration is added.

**Tech Stack:** Static HTML/CSS/JavaScript, Firebase CLI 15.13.0, Firebase Hosting, curl

---

### Task 1: Bind the Repository to the New Firebase Project

**Files:**
- Create: `.firebaserc`
- Verify: `firebase.json`

- [ ] **Step 1: Confirm branch isolation and a clean starting state**

Run:

```bash
git branch --show-current
git status --short
```

Expected: the branch is `chore/firebase-ai-mastery-deployment`, with no
uncommitted files.

- [ ] **Step 2: Create the Firebase project mapping**

Create `.firebaserc` with exactly:

```json
{
  "projects": {
    "default": "ai-mastery"
  }
}
```

- [ ] **Step 3: Validate both Firebase configuration files**

Run:

```bash
node -e "const fs=require('node:fs'); const rc=JSON.parse(fs.readFileSync('.firebaserc','utf8')); const fb=require('./firebase.json'); if(rc.projects.default!=='ai-mastery') throw new Error('wrong project'); if(!fb.hosting || Object.keys(fb).some(k=>k!=='hosting')) throw new Error('configuration is not Hosting-only'); console.log('Firebase configuration valid')"
git diff --check
```

Expected: `Firebase configuration valid`, followed by no `git diff --check`
output and exit status 0.

- [ ] **Step 4: Commit the local project mapping**

Run:

```bash
git add .firebaserc
git commit -m "chore: target ai-mastery Firebase project"
```

Expected: one new file committed on
`chore/firebase-ai-mastery-deployment`.

### Task 2: Create the Independent Firebase Project

**Files:**
- Verify: `.firebaserc`

- [ ] **Step 1: Confirm the authenticated account**

Run:

```bash
npx firebase-tools login:list
```

Expected: `Logged in as guy.naor@gmail.com`.

- [ ] **Step 2: Create the exact project ID**

Run:

```bash
npx firebase-tools projects:create ai-mastery --display-name "AI Mastery"
```

Expected: Firebase reports that project `ai-mastery` was created and added to
the authenticated account. If Firebase reports that the ID is unavailable or
already exists, stop and report the conflict; do not choose a fallback ID.

- [ ] **Step 3: Confirm Firebase recognizes the project**

Run:

```bash
npx firebase-tools projects:list
```

Expected: a row with display name `AI Mastery` and project ID `ai-mastery`.

- [ ] **Step 4: Confirm the default Hosting site**

Run:

```bash
npx firebase-tools hosting:sites:list --project ai-mastery
```

Expected: the default Hosting site has site ID `ai-mastery`. If Hosting has not
provisioned the default site yet, continue to the first Hosting deployment,
which provisions it for the project.

### Task 3: Deploy Only the Static Hosting Resource

**Files:**
- Use: `.firebaserc`
- Use: `firebase.json`

- [ ] **Step 1: Revalidate the deploy scope**

Run:

```bash
node -e "const fb=require('./firebase.json'); if(JSON.stringify(Object.keys(fb))!==JSON.stringify(['hosting'])) throw new Error('unexpected Firebase resource'); console.log('Hosting-only deploy scope confirmed')"
```

Expected: `Hosting-only deploy scope confirmed`.

- [ ] **Step 2: Deploy with both resource and project guards**

Run:

```bash
npx firebase-tools deploy --only hosting --project ai-mastery
```

Expected: Firebase reports `Deploy complete!` and a Hosting URL of
`https://ai-mastery.web.app` without deploying Functions, Firestore,
Authentication, or other backend resources.

### Task 4: Verify the Live Static Website

**Files:**
- Verify: `index.html`
- Verify: `personal.html`
- Verify: `professional.html`
- Verify: `site/assets/css/course.css`
- Verify: `site/assets/js/course.js`
- Verify: `materials/session-01-prompting/README.md`
- Verify: `company/products/product-catalog.csv`

- [ ] **Step 1: Verify representative deployed resources**

Run:

```bash
curl -fsSI https://ai-mastery.web.app/
curl -fsSI https://ai-mastery.web.app/index.html
curl -fsSI https://ai-mastery.web.app/personal.html
curl -fsSI https://ai-mastery.web.app/professional.html
curl -fsSI https://ai-mastery.web.app/site/assets/css/course.css
curl -fsSI https://ai-mastery.web.app/site/assets/js/course.js
curl -fsSI https://ai-mastery.web.app/materials/session-01-prompting/README.md
curl -fsSI https://ai-mastery.web.app/company/products/product-catalog.csv
```

Expected: every request returns HTTP 200.

- [ ] **Step 2: Verify security headers on the live response**

Run:

```bash
curl -fsSI https://ai-mastery.web.app/
```

Expected headers include:

```text
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
```

- [ ] **Step 3: Verify Firebase project state and repository state**

Run:

```bash
npx firebase-tools hosting:sites:list --project ai-mastery
git status --short --branch
```

Expected: Firebase lists the `ai-mastery` Hosting site, and Git reports branch
`chore/firebase-ai-mastery-deployment` with a clean working tree.
