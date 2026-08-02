# Firebase Project Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create an independent `applied-ai-mastery` Firebase project and deploy the existing no-build static website to its default Hosting site.

**Architecture:** The repository remains a static site published from its root by the existing `firebase.json`. A repository-local `.firebaserc` binds Firebase CLI commands to the new project, while all deployment commands retain an explicit `--project applied-ai-mastery` guard. No backend service or billing configuration is added.

**Tech Stack:** Static HTML/CSS/JavaScript, Firebase CLI 15.13.0, Firebase Hosting, curl

---

### Task 1: Bind the Repository to the New Firebase Project

**Files:**
- Create: `.firebaserc`
- Create: `.gitignore`
- Verify: `firebase.json`

- [ ] **Step 1: Confirm branch isolation and a clean starting state**

Run:

```bash
git branch --show-current
git status --short
```

Expected: the branch is `chore/firebase-ai-mastery-deployment`, with no
uncommitted files.

- [ ] **Step 2: Create the Firebase project mapping and cache exclusion**

Create `.firebaserc` with exactly:

```json
{
  "projects": {
    "default": "applied-ai-mastery"
  }
}
```

Create `.gitignore` with exactly:

```gitignore
.firebase/
```

- [ ] **Step 3: Validate both Firebase configuration files**

Run:

```bash
node -e "const fs=require('node:fs'); const rc=JSON.parse(fs.readFileSync('.firebaserc','utf8')); const fb=require('./firebase.json'); if(rc.projects.default!=='applied-ai-mastery') throw new Error('wrong project'); if(!fb.hosting || Object.keys(fb).some(k=>k!=='hosting')) throw new Error('configuration is not Hosting-only'); console.log('Firebase configuration valid')"
git check-ignore -q .firebase/hosting..cache
git diff --check
```

Expected: `Firebase configuration valid`; the Firebase deployment cache is
ignored; `git diff --check` produces no output and exits with status 0.

- [ ] **Step 4: Commit the local project mapping**

Run:

```bash
git add .firebaserc .gitignore
git commit -m "chore: target applied-ai-mastery Firebase project"
```

Expected: the project mapping and cache exclusion are committed on
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
npx firebase-tools projects:create applied-ai-mastery --display-name "AI Mastery"
```

Expected: Firebase reports that project `applied-ai-mastery` was created and added to
the authenticated account. If Firebase reports that the ID is unavailable or
already exists, stop and report the conflict; do not choose a fallback ID.

- [ ] **Step 3: Confirm Firebase recognizes the project**

Run:

```bash
npx firebase-tools projects:list
```

Expected: a row with display name `AI Mastery` and project ID `applied-ai-mastery`.

- [ ] **Step 4: Confirm the default Hosting site**

Run:

```bash
npx firebase-tools hosting:sites:list --project applied-ai-mastery
```

Expected: the default Hosting site has site ID `applied-ai-mastery`. If Hosting has not
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
npx firebase-tools deploy --only hosting --project applied-ai-mastery
```

Expected: Firebase reports `Deploy complete!` and a Hosting URL of
`https://applied-ai-mastery.web.app` without deploying Functions, Firestore,
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
curl -fsSI https://applied-ai-mastery.web.app/
curl -fsSI https://applied-ai-mastery.web.app/index.html
curl -fsSI https://applied-ai-mastery.web.app/personal.html
curl -fsSI https://applied-ai-mastery.web.app/professional.html
curl -fsSI https://applied-ai-mastery.web.app/site/assets/css/course.css
curl -fsSI https://applied-ai-mastery.web.app/site/assets/js/course.js
curl -fsSI https://applied-ai-mastery.web.app/materials/session-01-prompting/README.md
curl -fsSI https://applied-ai-mastery.web.app/company/products/product-catalog.csv
```

Expected: every request returns HTTP 200.

- [ ] **Step 2: Verify security headers on the live response**

Run:

```bash
curl -fsSI https://applied-ai-mastery.web.app/
```

Expected headers include:

```text
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
```

- [ ] **Step 3: Verify Firebase project state and repository state**

Run:

```bash
npx firebase-tools hosting:sites:list --project applied-ai-mastery
git status --short --branch
```

Expected: Firebase lists the `applied-ai-mastery` Hosting site, and Git reports branch
`chore/firebase-ai-mastery-deployment` with a clean working tree.

### Task 5: Localize the Course Selector

**Files:**
- Modify: `index.html`
- Create: `site/assets/js/index-i18n.js`

- [ ] **Step 1: Run the static acceptance check before implementation**

Run:

```bash
node -e "const fs=require('node:fs'); const html=fs.readFileSync('index.html','utf8'); const failures=[]; if(!html.includes('data-language=\"en\"')) failures.push('missing English language control'); if(!html.includes('data-language=\"he\"')) failures.push('missing Hebrew language control'); if(!html.includes('data-i18n=\"heroTitle\"')) failures.push('missing localized hero'); if(html.includes('github.com/guynaor/applied-ai-mastery')) failures.push('GitHub link remains'); if(html.includes('document.html?src=README.md')) failures.push('About link remains'); if(failures.length){console.error(failures.join('\n'));process.exit(1)}"
```

Expected: FAIL with `missing English language control`, `missing Hebrew
language control`, `missing localized hero`, `GitHub link remains`, and `About
link remains`.

- [ ] **Step 2: Add localization hooks and remove unwanted links**

Replace `index.html` with:

```html
<!doctype html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Choose an Applied AI Mastery course: professional problem-solving or practical AI for everyday life.">
  <meta name="theme-color" content="#123b4a">
  <link rel="stylesheet" href="site/assets/css/course.css">
  <title>Applied AI Mastery — Choose Your Course</title>
</head>
<body>
  <a class="skip-link" href="#main" data-i18n="skip">Skip to course selection</a>
  <div class="site-shell">
    <header class="site-header">
      <a class="brand" href="index.html" aria-label="Applied AI Mastery home" data-i18n-aria-label="brand"><span class="brand-mark">AI</span><span>Applied AI Mastery</span></a>
      <nav class="header-links" aria-label="Primary navigation" data-i18n-aria-label="nav"><a href="#courses" data-i18n="courses">Courses</a></nav>
      <div class="segmented language-toggle" role="group" aria-label="Language" data-i18n-aria-label="language"><button type="button" data-language="en" aria-pressed="true">English</button><button type="button" data-language="he" aria-pressed="false">עברית</button></div>
    </header>

    <main id="main">
      <section class="hero" id="top">
        <div class="hero-copy">
          <div class="eyebrow" data-i18n="heroEyebrow">Two practical paths to AI fluency</div>
          <h1 data-i18n="heroTitle">Choose where you want AI to make you more capable.</h1>
          <p data-i18n="heroText">Both courses teach the same durable habits: define the real problem, provide useful context, compare evidence, verify outputs, preserve uncertainty, and keep important decisions under human control.</p>
          <div class="actions"><a class="button primary" href="#courses" data-i18n="chooseCourse">Choose a course</a></div>
        </div>
        <aside class="version-pill" data-i18n="version">Beta</aside>
      </section>

      <section class="section" id="courses">
        <div class="eyebrow" data-i18n="catalogEyebrow">Course catalogue</div><h2 data-i18n="catalogTitle">Two tracks, different life stages</h2>
        <div class="grid course-choice-grid">
          <a class="card link-card course-choice" href="professional.html">
            <span class="badge" data-i18n="professionalBadge">Professional track</span>
            <h3 data-i18n="professionalTitle">Applied AI for Work &amp; Engineering</h3>
            <p data-i18n="professionalText">For students, graduates, makers, and professionals who want to solve realistic workplace and technical problems through the AquaForge simulation.</p>
            <strong data-i18n="professionalMeta">7 missions + integrated capstone</strong>
          </a>
          <a class="card link-card course-choice personal-choice" href="personal.html">
            <span class="badge" data-i18n="personalBadge">Personal track</span>
            <h3 data-i18n="personalTitle">Applied AI for Everyday Life</h3>
            <p data-i18n="personalText">For young adults before or after university who want to use AI for decisions, planning, creativity, money research, career preparation, and personal projects.</p>
            <strong data-i18n="personalMeta">12 focused lessons · 20–30 minutes each</strong>
          </a>
        </div>
      </section>

      <section class="section split">
        <div><div class="eyebrow" data-i18n="philosophyEyebrow">Shared philosophy</div><h2 data-i18n="philosophyTitle">AI is the tool. Better judgment is the outcome.</h2><p data-i18n="philosophyText">The goal is not memorizing one product. Students learn to break down unfamiliar problems, ask better questions, compare outputs, verify facts, recognize uncertainty, and turn ideas into useful artifacts.</p></div>
        <div class="check-card"><h3 data-i18n="skillsTitle">Skills shared by both courses</h3><ul><li data-i18n="skillPrompt">Prompt design and iteration</li><li data-i18n="skillResearch">Research and source checking</li><li data-i18n="skillDecision">Decision frameworks</li><li data-i18n="skillData">Data and document creation</li><li data-i18n="skillCreative">Creative generation</li><li data-i18n="skillAutomation">Automation with safe boundaries</li><li data-i18n="skillReflection">Reflection on human judgment</li></ul></div>
      </section>
    </main>

    <footer><span><span data-i18n="footerBrand">Applied AI Mastery ·</span> <span data-year></span></span></footer>
  </div>
  <script src="site/assets/js/index-i18n.js"></script>
</body>
</html>
```

- [ ] **Step 3: Implement the index localization module**

Create `site/assets/js/index-i18n.js` with:

```javascript
(()=>{
  const storageKey='aam-personal-language';
  const copy={
    en:{
      metaTitle:'Applied AI Mastery — Choose Your Course',
      metaDescription:'Choose an Applied AI Mastery course: professional problem-solving or practical AI for everyday life.',
      skip:'Skip to course selection',brand:'Applied AI Mastery home',nav:'Primary navigation',language:'Language',courses:'Courses',
      heroEyebrow:'Two practical paths to AI fluency',heroTitle:'Choose where you want AI to make you more capable.',heroText:'Both courses teach the same durable habits: define the real problem, provide useful context, compare evidence, verify outputs, preserve uncertainty, and keep important decisions under human control.',chooseCourse:'Choose a course',version:'Beta',
      catalogEyebrow:'Course catalogue',catalogTitle:'Two tracks, different life stages',
      professionalBadge:'Professional track',professionalTitle:'Applied AI for Work & Engineering',professionalText:'For students, graduates, makers, and professionals who want to solve realistic workplace and technical problems through the AquaForge simulation.',professionalMeta:'7 missions + integrated capstone',
      personalBadge:'Personal track',personalTitle:'Applied AI for Everyday Life',personalText:'For young adults before or after university who want to use AI for decisions, planning, creativity, money research, career preparation, and personal projects.',personalMeta:'12 focused lessons · 20–30 minutes each',
      philosophyEyebrow:'Shared philosophy',philosophyTitle:'AI is the tool. Better judgment is the outcome.',philosophyText:'The goal is not memorizing one product. Students learn to break down unfamiliar problems, ask better questions, compare outputs, verify facts, recognize uncertainty, and turn ideas into useful artifacts.',
      skillsTitle:'Skills shared by both courses',skillPrompt:'Prompt design and iteration',skillResearch:'Research and source checking',skillDecision:'Decision frameworks',skillData:'Data and document creation',skillCreative:'Creative generation',skillAutomation:'Automation with safe boundaries',skillReflection:'Reflection on human judgment',footerBrand:'Applied AI Mastery ·'
    },
    he:{
      metaTitle:'Applied AI Mastery — בחירת קורס',
      metaDescription:'בחרו קורס של Applied AI Mastery: פתרון בעיות מקצועי או שימוש מעשי ב-AI בחיי היום־יום.',
      skip:'דילוג לבחירת הקורס',brand:'דף הבית של Applied AI Mastery',nav:'ניווט ראשי',language:'שפה',courses:'קורסים',
      heroEyebrow:'שני מסלולים מעשיים לשליטה ב-AI',heroTitle:'בחרו היכן תרצו ש-AI יעזור לכם להיות מסוגלים יותר.',heroText:'שני הקורסים מלמדים הרגלים שימושיים לטווח ארוך: להגדיר את הבעיה האמיתית, לספק הקשר מועיל, להשוות ראיות, לאמת תוצרים, לשמור על אי־ודאות ולהשאיר החלטות חשובות בשליטה אנושית.',chooseCourse:'בחירת קורס',version:'בטא',
      catalogEyebrow:'קטלוג הקורסים',catalogTitle:'שני מסלולים לשלבים שונים בחיים',
      professionalBadge:'המסלול המקצועי',professionalTitle:'AI יישומי לעבודה ולהנדסה',professionalText:'לסטודנטים, לבוגרים, ליוצרים ולאנשי מקצוע שרוצים לפתור בעיות מציאותיות מהעבודה ומהעולם הטכני באמצעות הסימולציה של AquaForge.',professionalMeta:'7 משימות + פרויקט מסכם משולב',
      personalBadge:'המסלול האישי',personalTitle:'AI יישומי לחיי היום־יום',personalText:'לצעירים לפני האוניברסיטה או אחריה שרוצים להשתמש ב-AI לקבלת החלטות, תכנון, יצירתיות, מחקר פיננסי, הכנה לקריירה ופרויקטים אישיים.',personalMeta:'12 שיעורים ממוקדים · 20–30 דקות לכל שיעור',
      philosophyEyebrow:'פילוסופיה משותפת',philosophyTitle:'AI הוא הכלי. שיקול דעת טוב יותר הוא התוצאה.',philosophyText:'המטרה אינה לשנן מוצר אחד. לומדים לפרק בעיות לא מוכרות, לשאול שאלות טובות יותר, להשוות תוצרים, לאמת עובדות, לזהות אי־ודאות ולהפוך רעיונות לתוצרים שימושיים.',
      skillsTitle:'מיומנויות משותפות לשני הקורסים',skillPrompt:'תכנון פרומפטים ושיפורם',skillResearch:'מחקר ובדיקת מקורות',skillDecision:'מסגרות לקבלת החלטות',skillData:'יצירת נתונים ומסמכים',skillCreative:'יצירה בעזרת AI',skillAutomation:'אוטומציה עם גבולות בטוחים',skillReflection:'רפלקציה על שיקול דעת אנושי',footerBrand:'Applied AI Mastery ·'
    }
  };

  function setLanguage(language,persist=true){
    const lang=language==='he'?'he':'en';
    const text=copy[lang];
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='he'?'rtl':'ltr';
    document.body.classList.toggle('rtl',lang==='he');
    document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===lang)));
    document.querySelectorAll('[data-i18n]').forEach(element=>{const value=text[element.dataset.i18n];if(value)element.textContent=value;});
    document.querySelectorAll('[data-i18n-aria-label]').forEach(element=>{const value=text[element.dataset.i18nAriaLabel];if(value)element.setAttribute('aria-label',value);});
    document.title=text.metaTitle;
    const description=document.querySelector('meta[name="description"]');
    if(description)description.content=text.metaDescription;
    const year=document.querySelector('[data-year]');
    if(year)year.textContent=new Date().getFullYear();
    if(persist)localStorage.setItem(storageKey,lang);
  }

  document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.language)));
  window.addEventListener('storage',event=>{if(event.key===storageKey)setLanguage(event.newValue==='he'?'he':'en',false);});
  setLanguage(localStorage.getItem(storageKey)==='he'?'he':'en',false);
})();
```

- [ ] **Step 4: Run syntax and static acceptance checks**

Run:

```bash
node --check site/assets/js/index-i18n.js
node -e "const fs=require('node:fs'); const html=fs.readFileSync('index.html','utf8'); const js=fs.readFileSync('site/assets/js/index-i18n.js','utf8'); const failures=[]; for(const value of ['data-language=\"en\"','data-language=\"he\"','data-i18n=\"heroTitle\"','site/assets/js/index-i18n.js']) if(!html.includes(value)) failures.push('missing '+value); if(html.includes('github.com/guynaor/applied-ai-mastery')) failures.push('GitHub link remains'); if(html.includes('document.html?src=README.md')) failures.push('About link remains'); for(const value of [\"aam-personal-language\",\"document.documentElement.dir\",\"document.title\"]) if(!js.includes(value)) failures.push('missing behavior '+value); if(failures.length){console.error(failures.join('\n'));process.exit(1)} console.log('Index localization static checks passed')"
git diff --check
```

Expected: JavaScript syntax exits 0, `Index localization static checks passed`,
and no whitespace errors.

- [ ] **Step 5: Commit the localized index**

Run:

```bash
git add index.html site/assets/js/index-i18n.js
git commit -m "feat: localize the course selector"
```

Expected: the HTML and localization module are committed on
`chore/firebase-ai-mastery-deployment`.

### Task 6: Verify Index Localization in a Browser

**Files:**
- Verify: `index.html`
- Verify: `site/assets/js/index-i18n.js`
- Modify: `site/assets/css/course.css`

- [ ] **Step 1: Serve the repository locally**

Run:

```bash
python3 -m http.server 4173
```

Expected: the static server listens on `http://127.0.0.1:4173` and remains
running during browser verification.

- [ ] **Step 2: Verify English desktop behavior**

At a 1440 by 900 viewport, open `http://127.0.0.1:4173/index.html`, clear
`aam-personal-language`, and reload.

Expected:

- the root is `lang="en" dir="ltr"`;
- the English button is pressed;
- the English hero and course text render;
- About and GitHub links are absent;
- the professional and personal cards retain their destination URLs;
- there are no console errors or overlapping header controls.

- [ ] **Step 3: Verify Hebrew persistence and RTL behavior**

Click the Hebrew language button, then reload.

Expected:

- the root is `lang="he" dir="rtl"` before and after reload;
- the Hebrew button is pressed;
- the title, description, accessible labels, hero, course cards, philosophy,
  skills, version, and footer use Hebrew;
- `localStorage['aam-personal-language']` is `he`;
- there are no console errors or overlapping content.

- [ ] **Step 4: Prevent RTL overflow from the off-screen skip link**

If the browser checks report horizontal overflow in RTL, replace the legacy
`left:-9999px` skip-link hiding rule with:

```css
.skip-link{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.skip-link:focus{inset-block-start:8px;inset-inline-start:8px;width:auto;height:auto;margin:0;overflow:visible;clip:auto;z-index:20;padding:10px;background:#fff}
```

Expected: the skip link remains keyboard-focusable, and RTL no longer expands
the document scroll width.

- [ ] **Step 5: Verify the mobile layout**

At a 390 by 844 viewport, verify both English and Hebrew.

Expected: the brand, Courses link, language control, hero, course cards, and
footer fit without horizontal scrolling, clipping, or incoherent overlap.

- [ ] **Step 6: Stop the local server**

Stop the `python3 -m http.server 4173` process and confirm no verification
server remains running.

### Task 7: Redeploy and Update Pull Request 24

**Files:**
- Deploy: `index.html`
- Deploy: `site/assets/js/index-i18n.js`

- [ ] **Step 1: Deploy Hosting only**

Run:

```bash
npx firebase-tools deploy --only hosting --project applied-ai-mastery
```

Expected: Firebase reports `Deploy complete!` and the Hosting URL
`https://applied-ai-mastery.web.app`.

- [ ] **Step 2: Verify the live localized index**

Open `https://applied-ai-mastery.web.app/index.html` and repeat the English,
Hebrew, persistence, link-removal, and mobile checks from Task 6.

Expected: the deployed page matches local behavior with no console errors.

- [ ] **Step 3: Push and refresh the existing PR**

Run:

```bash
git push
gh pr view 24 --json number,url,state,isDraft,headRefName,baseRefName
```

Expected: the branch pushes without force, and PR 24 remains open from
`chore/firebase-ai-mastery-deployment` into `main`.
