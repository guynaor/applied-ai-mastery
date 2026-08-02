# AI Geography Orientation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a compact, current, bilingual AI-geography orientation to the first session of both course tracks without materially extending their practical exercises.

**Architecture:** Maintain one English reference shared by both tracks and one equivalent Hebrew reference in the existing RTL content tree. Link each first-session student activity to the relevant reference, add a timed ten-minute delivery block to each instructor flow, and keep product descriptions framed as current examples rather than rankings.

**Tech Stack:** Markdown curriculum files, vanilla JavaScript course catalogs, static HTML document viewer, Firebase-hosted static site

---

## File Map

- Create `materials/shared/AF-REF-001-ai-geography.md`: English source of truth for the layered AI map, current product examples, and agent-permission boundary.
- Create `personal-course/he/ai-geography.md`: natural Hebrew equivalent rendered by the existing RTL document route.
- Modify `materials/session-01-prompting/README.md`: register the orientation in Session 1 outcomes and files.
- Modify `materials/session-01-prompting/student/AF-TRN-100-student-mission-guide.md`: make the orientation the first student step.
- Modify `materials/session-01-prompting/instructor/AF-TRN-100-step-by-step-lesson-script.md`: replace the old opening with a timed AI-map delivery and compress source inspection.
- Modify `materials/session-01-prompting/instructor/AF-TRN-100-instructor-guide.md`: align objectives, preparation, and the 105-minute schedule.
- Modify `personal-course/materials/lesson-01-better-requests/student/activity.md`: add the orientation before prompting and keep the activity within 30 minutes.
- Modify `personal-course/materials/lesson-01-better-requests/instructor/step-by-step-guide.md`: add the timed orientation and compress the prompt exercise.
- Modify `personal-course/he/lesson-01.md`: add the equivalent Hebrew orientation, updated activity, and aligned teaching schedule.
- Modify `site/assets/js/course.js`: expose AI geography in the professional Session 1 summary.
- Modify `site/assets/js/personal-course.js`: expose AI geography in English and Hebrew Lesson 1 summaries.

### Task 1: Create The Shared English And Hebrew References

**Files:**
- Create: `materials/shared/AF-REF-001-ai-geography.md`
- Create: `personal-course/he/ai-geography.md`

- [ ] **Step 1: Verify the new reference paths do not already exist**

Run:

```bash
test ! -e materials/shared/AF-REF-001-ai-geography.md
test ! -e personal-course/he/ai-geography.md
```

Expected: both commands exit 0 with no output.

- [ ] **Step 2: Create the English reference**

Create `materials/shared/AF-REF-001-ai-geography.md` with this content:

```markdown
# AI Geography — A 10-Minute Map

AI product names change quickly. This map focuses on the layers underneath the names.

## The layers

1. **Large language model (LLM):** the underlying engine. It learns patterns from large amounts of data and generates a response one piece at a time. A model can sound confident without knowing whether a claim is true.
2. **AI application:** the interface you use, such as ChatGPT, Claude, Gemini, or Perplexity. An application may offer several models and add files, search, memory, voice, images, or other features.
3. **Tools and connectors:** controlled ways for an AI application to search, read files, run code, or interact with another service. Access to a tool does not guarantee that the tool will be used correctly.
4. **Artifact:** a substantial output you can keep, edit, share, or reuse, such as a document, spreadsheet, presentation, diagram, website, or small app.
5. **Skill:** reusable instructions, context, resources, and sometimes scripts that teach an agent a repeatable workflow. A prompt asks for one task; a skill packages how to perform a kind of task.
6. **Agent:** a model working toward a goal in a loop: plan, act with tools, observe the result, adjust, and continue or ask a human. The ability to act makes permissions and review more important.

## Where current products fit

| Product or category | Useful current fit | Remember |
|---|---|---|
| ChatGPT | Broad writing, study, files, data, images, research, and coding work | The app and the selected model are not the same thing. |
| Claude | Writing, document analysis, reasoning, and coding workflows | Available capabilities depend on the surface and plan. |
| Gemini | Multimodal help and workflows connected to Google products and Android | Connected data and actions depend on account settings. |
| Perplexity | Web research with visible links to sources | A citation makes verification possible; it does not make a claim automatically correct. |
| Codex and Claude Code | Coding agents that inspect repositories, edit files, run commands, and verify work through terminal, app, IDE, or cloud surfaces | Review the plan, permissions, changed files, and test evidence. |
| Google Antigravity | An agentic development environment spanning editor, terminal, and browser work | It can act across more surfaces than an ordinary chat. |
| OpenClaw and similar gateways | Self-hosted assistants reachable through messaging channels and connected agents | Broad, always-available access creates broader security responsibility. |

These are current examples, not permanent rankings. Capabilities and plans change. For important work, test the real task in the tools available to you.

## One safety rule

**More ability to act requires more human control.** Check permissions and keep a human approval point before publishing, paying, deleting, sending external messages, or changing a real system. Never provide secrets or sensitive personal information merely because an agent requests them.

## Quick check

1. Is ChatGPT a model, an application, or both depending on how the name is used?
2. What can an agent do that a plain text-only chat cannot?
3. Is a saved presentation an artifact or a skill?
4. Why should a source-linked research answer still be verified?

## Current primary references

- [OpenAI: What is ChatGPT?](https://help.openai.com/en/articles/12677804-what-is-chatgpt-faq)
- [OpenAI: Codex documentation](https://developers.openai.com/codex/)
- [Anthropic: Claude Code](https://www.anthropic.com/product/claude-code)
- [Anthropic: Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Anthropic: Artifacts](https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them)
- [Anthropic: Trustworthy agents in practice](https://www.anthropic.com/research/trustworthy-agents)
- [Google: What Gemini can do](https://support.google.com/gemini/answer/14579631)
- [Google: Antigravity](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-3-developers/)
- [Perplexity: What is Perplexity?](https://www.perplexity.ai/help-center/en/articles/10352155-what-is-perplexity)
- [OpenClaw documentation](https://docs.openclaw.ai/)
```

- [ ] **Step 3: Create the equivalent Hebrew reference**

Create `personal-course/he/ai-geography.md` with these sections and the same seven product rows:

```markdown
# מפת עולם ה-AI בעשר דקות

שמות המוצרים משתנים במהירות. המפה הזו מתמקדת בשכבות שמתחת לשמות.

## השכבות

1. **מודל שפה גדול (Large Language Model, LLM):** המנוע הבסיסי. הוא לומד דפוסים מכמויות גדולות של מידע ומייצר תשובה חלק אחר חלק. מודל יכול להישמע בטוח גם כשאין לו דרך לדעת אם טענה נכונה.
2. **אפליקציית AI:** הממשק שבו משתמשים, למשל ChatGPT, Claude, Gemini או Perplexity. אפליקציה יכולה להציע כמה מודלים ולהוסיף קבצים, חיפוש, זיכרון, קול, תמונות ויכולות נוספות.
3. **כלים וחיבורים (tools and connectors):** דרכים מבוקרות שבהן מערכת AI יכולה לחפש, לקרוא קבצים, להריץ קוד או לפעול בשירות אחר. גישה לכלי אינה מבטיחה שימוש נכון בו.
4. **תוצר (artifact):** פלט משמעותי שאפשר לשמור, לערוך, לשתף או להשתמש בו שוב, כמו מסמך, גיליון, מצגת, תרשים, אתר או אפליקציה קטנה.
5. **מיומנות (skill):** הוראות, הקשר, מקורות ולעיתים סקריפטים שניתנים לשימוש חוזר ומלמדים סוכן לבצע תהליך עבודה מסוים. פרומפט מבקש משימה אחת; skill אורז את הדרך לבצע סוג של משימות.
6. **סוכן (agent):** מודל שפועל להשגת מטרה בלולאה: מתכנן, פועל באמצעות כלים, בודק את התוצאה, מתאים את הפעולה וממשיך או פונה לאדם. היכולת לפעול הופכת הרשאות ובקרה לחשובות יותר.

## היכן מוצרים עכשוויים נמצאים במפה

| מוצר או קטגוריה | התאמה מעשית כיום | חשוב לזכור |
|---|---|---|
| ChatGPT | כתיבה, לימוד, קבצים, נתונים, תמונות, מחקר וקוד | האפליקציה והמודל שנבחר בה אינם אותו דבר. |
| Claude | כתיבה, ניתוח מסמכים, חשיבה ותהליכי קוד | היכולות הזמינות תלויות בממשק ובתוכנית. |
| Gemini | עבודה רב־אופנית וחיבור למוצרי Google ול-Android | נתונים ופעולות מחוברים תלויים בהגדרות החשבון. |
| Perplexity | מחקר ברשת עם קישורים גלויים למקורות | ציטוט מאפשר לבדוק טענה; הוא לא הופך אותה אוטומטית לנכונה. |
| Codex ו-Claude Code | סוכני קוד שקוראים מאגרים, עורכים קבצים, מריצים פקודות ובודקים עבודה בטרמינל, באפליקציה, ב-IDE או בענן | בודקים את התוכנית, ההרשאות, הקבצים שהשתנו וראיות הבדיקה. |
| Google Antigravity | סביבת פיתוח מבוססת סוכנים שפועלת בעורך, בטרמינל ובדפדפן | היא יכולה לפעול ביותר ממשקים מצ'אט רגיל. |
| OpenClaw ומוצרים דומים | עוזרים באירוח עצמי שנגישים מערוצי הודעות ומחוברים לסוכנים | גישה רחבה וזמינה תמיד יוצרת אחריות אבטחה רחבה יותר. |

אלה דוגמאות עכשוויות ולא דירוג קבוע. היכולות והתוכניות משתנות. בעבודה חשובה בודקים את המשימה האמיתית בכלים שזמינים לכם.

## כלל בטיחות אחד

**ככל שלמערכת יש יותר יכולת לפעול, נדרשת יותר שליטה אנושית.** בדקו הרשאות ושמרו נקודת אישור אנושית לפני פרסום, תשלום, מחיקה, שליחת הודעה חיצונית או שינוי מערכת אמיתית. אל תמסרו סודות או מידע אישי רגיש רק משום שסוכן ביקש אותם.

## בדיקת הבנה קצרה

1. האם ChatGPT הוא מודל, אפליקציה, או שהשם יכול לשמש לשניהם לפי ההקשר?
2. מה סוכן יכול לעשות שצ'אט טקסט רגיל אינו יכול?
3. האם מצגת שנשמרה היא artifact או skill?
4. למה עדיין צריך לבדוק תשובת מחקר שמכילה קישורים למקורות?

## מקורות ראשוניים עדכניים

- [OpenAI: מהו ChatGPT?](https://help.openai.com/en/articles/12677804-what-is-chatgpt-faq)
- [OpenAI: תיעוד Codex](https://developers.openai.com/codex/)
- [Anthropic: Claude Code](https://www.anthropic.com/product/claude-code)
- [Anthropic: Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Anthropic: Artifacts](https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them)
- [Anthropic: סוכנים אמינים בפועל](https://www.anthropic.com/research/trustworthy-agents)
- [Google: היכולות של Gemini](https://support.google.com/gemini/answer/14579631)
- [Google: Antigravity](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-3-developers/)
- [Perplexity: מהו Perplexity?](https://www.perplexity.ai/help-center/en/articles/10352155-what-is-perplexity)
- [תיעוד OpenClaw](https://docs.openclaw.ai/)
```

- [ ] **Step 4: Verify terminology and bilingual structure**

Run:

```bash
rg -n "LLM|Artifact|Skill|Agent|Codex|Claude Code|Antigravity|OpenClaw" materials/shared/AF-REF-001-ai-geography.md
rg -n "LLM|artifact|skill|agent|Codex|Claude Code|Antigravity|OpenClaw" personal-course/he/ai-geography.md
git diff --check
```

Expected: every named concept appears in both files and `git diff --check` is silent.

- [ ] **Step 5: Commit the references**

```bash
git add materials/shared/AF-REF-001-ai-geography.md personal-course/he/ai-geography.md
git commit -m "content: add bilingual AI geography reference"
```

### Task 2: Integrate The Professional Session

**Files:**
- Modify: `materials/session-01-prompting/README.md:7-30`
- Modify: `materials/session-01-prompting/student/AF-TRN-100-student-mission-guide.md:5-34`
- Modify: `materials/session-01-prompting/instructor/AF-TRN-100-step-by-step-lesson-script.md:7-65`
- Modify: `materials/session-01-prompting/instructor/AF-TRN-100-instructor-guide.md:7-42`
- Modify: `site/assets/js/course.js:2`

- [ ] **Step 1: Record the missing professional integration before editing**

Run:

```bash
rg -n "AI geography|AI Geography" materials/session-01-prompting site/assets/js/course.js
```

Expected: no matches and exit status 1.

- [ ] **Step 2: Register the shared reference in the package and student mission**

In `materials/session-01-prompting/README.md`, add this first learning outcome and file entry:

```markdown
1. Distinguish an LLM, AI application, artifact, skill, and agent.

- `../shared/AF-REF-001-ai-geography.md` — compact map of AI products, coding agents, skills, artifacts, and permissions.
```

Renumber the existing learning outcomes. In `AF-TRN-100-student-mission-guide.md`, add the shared reference as file 1, renumber the three existing files, and insert before “Part 1”:

```markdown
## Start here — Map the AI landscape

Read [AI Geography — A 10-Minute Map](../../shared/AF-REF-001-ai-geography.md).

Before opening an AI system, be ready to explain:

- why a model and an AI application are not the same thing;
- how an artifact differs from a reusable skill;
- what changes when an AI system can act through tools as an agent;
- why current product strengths should be tested on the real task rather than treated as a permanent ranking.

For this mission, choose two currently available systems that can accept the same source and prompt. The controlled comparison begins only after the task and evidence are held constant.
```

- [ ] **Step 3: Replace the professional opening with the ten-minute map**

In the step-by-step script, add definitions for `LLM`, `AI application`, `artifact`, `skill`, and `agent`, add the shared reference to preparation, and replace the old 0-8 opening with:

```markdown
## AI geography orientation — 0 to 8 minutes

Open the shared AI Geography reference. Draw or point through the six layers: model, application, tools, artifact, skill, and agent.

Use one sentence per layer. Then locate ChatGPT, Claude, Gemini, and Perplexity as applications; Codex, Claude Code, and Google Antigravity as agentic coding surfaces; and OpenClaw as a gateway connecting messaging channels to agents.

Say:

> “These names are examples, not a permanent ranking. First identify the kind of system and the access it has; then test the real task.”

End with the permission boundary: an answer can be wrong, while an agent with tools can also take a wrong action. Human review increases with the consequence of the action.

## Terminology check and mission transition — 8 to 10 minutes

Ask:

1. “Is a saved failure-analysis report an artifact or a skill?”
2. “What makes a coding agent different from a plain chat response?”
3. “Why are we comparing outputs rather than declaring one brand best?”

Then say:

> “Now we will hold the evidence and prompt constant so we can inspect what changes between systems.”
```

Rename source inspection to `10 to 22 minutes`; leave all later time blocks unchanged. This recovers the added two minutes by tightening silent reading and discussion without reducing the required three missing measurements.

- [ ] **Step 4: Align the concise professional teaching guide**

Add the reference to preparation and make the first objective “distinguish models, applications, artifacts, skills, and agents.” Replace the existing `0–10 min` block with:

```markdown
### 0–10 min — Map the AI landscape and frame the mission

Use the shared AI Geography reference to distinguish model, application, tool, artifact, skill, and agent. Locate the major chat applications, coding agents, Google Antigravity, and OpenClaw on that map. Emphasize that product fit changes and that greater ability to act requires tighter permissions and review.

Check understanding with: “What is the difference between asking a chat for advice and allowing an agent to change files or send a message?”

Transition: “Today the goal is not to diagnose the pump or prove one brand is best. The goal is to determine what two systems can and cannot responsibly conclude from the same incomplete evidence.”
```

Keep the existing `10–22 min` evidence-first block and every later time block, preserving the 105-minute duration.

- [ ] **Step 5: Update the professional course-card summary**

Change the Session 1 summary in `site/assets/js/course.js` to:

```javascript
summary:'Map the AI landscape, compare outputs, diagnose weak assumptions, and build a reusable RISEN prompt.'
```

- [ ] **Step 6: Verify professional sequence and timing**

Run:

```bash
rg -n "AI geography|AI Geography|0 to 8|8 to 10|10 to 22|22 to 38|92 to 105" materials/session-01-prompting
git diff --check
```

Expected: the geography section precedes source inspection, later blocks retain their existing endpoints, and whitespace checks pass.

- [ ] **Step 7: Commit the professional integration**

```bash
git add materials/session-01-prompting site/assets/js/course.js
git commit -m "content: open professional track with AI geography"
```

### Task 3: Integrate The English Personal Lesson

**Files:**
- Modify: `personal-course/materials/lesson-01-better-requests/student/activity.md:3-30`
- Modify: `personal-course/materials/lesson-01-better-requests/instructor/step-by-step-guide.md:3-90`
- Modify: `site/assets/js/personal-course.js:2`

- [ ] **Step 1: Record the missing personal integration before editing**

Run:

```bash
rg -n "AI geography|AI Geography" personal-course/materials/lesson-01-better-requests site/assets/js/personal-course.js
```

Expected: no matches and exit status 1.

- [ ] **Step 2: Make the student activity begin with the map**

Set the activity time to `30 minutes`, extend the goal to include recognizing the main AI layers, and insert before “The core idea”:

```markdown
## Start here — AI geography (10 minutes)

Read [AI Geography — A 10-Minute Map](../../../../materials/shared/AF-REF-001-ai-geography.md).

Check that you can answer:

1. What is the difference between an LLM and an AI application?
2. Is a reusable set of workflow instructions a prompt, an artifact, or a skill?
3. Why does an agent need more permission review than a text-only answer?

The rest of this lesson uses an ordinary chat request. Later lessons will create artifacts and introduce workflows with more ability to act.
```

Leave the existing Prompt A/B/C exercise intact. Its concise written steps allow the instructor to deliver it in the remaining 20 minutes.

- [ ] **Step 3: Add the compressed 30-minute instructor flow**

Set duration to `30 minutes`, add the shared reference to preparation, and add one-line definitions for `LLM`, `AI application`, `artifact`, `skill`, and `agent`. Replace the timing blocks with:

```markdown
## 0–8 minutes — Map the AI landscape

Use the shared reference to move through model, application, tools, artifact, skill, and agent. Locate the named products as current examples, not permanent winners. Emphasize that an agent can take actions, so permissions and human checkpoints matter.

## 8–10 minutes — Check and transition

Ask: “Is a saved meal plan an artifact or a skill?” and “What changes when a system can send the message instead of merely drafting it?”

Say: “We will begin with the smallest unit: one clear request in an ordinary chat.”

## 10–13 minutes — Hook and five-part pattern

Run `Help me plan my week`. Ask what the AI had to guess, then teach Goal, Context, Constraints, Output, and Check in one sentence each.

## 13–19 minutes — Student builds Prompt A and Prompt B

The student selects one real, low-risk request, writes the vague version, and completes the diagnosis table. Prompt B must include one meaningful constraint and one verification instruction.

## 19–24 minutes — Run and compare

Run Prompt A and Prompt B in the same system. Require one concrete difference rather than “B is better.”

## 24–27 minutes — Controlled revision

Change exactly one element to create Prompt C. Predict its effect before running it.

## 27–30 minutes — Save and exit check

Save the reusable structure without private details. Ask what belongs in context, why only one element changed, and what information should never be stored.
```

Retain the existing coaching questions, common mistakes, and minimum-evidence requirements under the closest new time block.

- [ ] **Step 4: Update the English personal course-card text**

Change Lesson 1’s English skill and outcome strings in `site/assets/js/personal-course.js` to:

```javascript
'AI geography, context, constraints, iteration, and privacy awareness'
'Recognize the main AI layers, then turn a vague request into a useful, testable result.'
```

- [ ] **Step 5: Verify English personal duration and content preservation**

Run:

```bash
rg -n "30 minutes|0–8|8–10|10–13|13–19|19–24|24–27|27–30|Prompt A|Prompt B|Prompt C" personal-course/materials/lesson-01-better-requests
git diff --check
```

Expected: the map occupies the first ten minutes, Prompt A/B/C remain present, and the lesson ends at minute 30.

- [ ] **Step 6: Commit the English personal integration**

```bash
git add personal-course/materials/lesson-01-better-requests site/assets/js/personal-course.js
git commit -m "content: open personal track with AI geography"
```

### Task 4: Integrate The Hebrew Personal Lesson

**Files:**
- Modify: `personal-course/he/lesson-01.md:3-64`
- Modify: `site/assets/js/personal-course.js:2`

- [ ] **Step 1: Record the missing Hebrew lesson link before editing**

Run:

```bash
rg -n "ai-geography.md|מפת עולם ה-AI" personal-course/he/lesson-01.md
```

Expected: no matches and exit status 1.

- [ ] **Step 2: Add the Hebrew student orientation**

After the unlocked-skill line, insert:

```markdown
## מתחילים כאן — מפת עולם ה-AI, עשר דקות

קראו את [מפת עולם ה-AI בעשר דקות](ai-geography.md).

ודאו שאתם יכולים להסביר:

1. מה ההבדל בין LLM לבין אפליקציית AI;
2. האם הוראות חוזרות לתהליך עבודה הן prompt, artifact או skill;
3. למה agent זקוק לבדיקת הרשאות קפדנית יותר מתשובת טקסט בלבד.

בהמשך השיעור נעבוד עם היחידה הקטנה ביותר: בקשה ברורה אחת בצ'אט רגיל.
```

Extend the concepts list with LLM, AI application, artifact, skill, and agent. Set the student activity to 20 minutes after the orientation so total lesson time is 30 minutes.

- [ ] **Step 3: Align the Hebrew teacher schedule with the English flow**

Replace the short teacher schedule with:

```markdown
- **0–8 דקות:** עברו על model, application, tools, artifact, skill ו-agent בעזרת המפה. מקמו את המוצרים כדוגמאות עכשוויות ולא כדירוג קבוע.
- **8–10 דקות:** שאלו מה ההבדל בין מערכת שמנסחת הודעה לבין agent ששולח אותה. עברו לבקשה אחת בצ'אט רגיל.
- **10–13 דקות:** הדגימו בקשה עמומה ולמדו בקצרה מטרה, הקשר, אילוצים, פורמט ובדיקה.
- **13–19 דקות:** התלמידים כותבים Prompt A ו-Prompt B.
- **19–24 דקות:** מריצים ומשווים בעזרת הבדל ממשי אחד.
- **24–27 דקות:** משנים רכיב אחד בלבד ויוצרים Prompt C.
- **27–30 דקות:** שומרים תבנית ללא מידע פרטי ומבצעים בדיקת יציאה.
```

Keep the verification requirement, real-life mission levels, expected answers, and understanding check.

- [ ] **Step 4: Update the Hebrew personal course-card text**

Change Lesson 1’s Hebrew skill and outcome strings in `site/assets/js/personal-course.js` to:

```javascript
'מפת עולם ה-AI, הקשר (context), אילוצים (constraints), שיפור ופרטיות'
'להכיר את שכבות ה-AI ואז להפוך בקשה עמומה לתוצאה שימושית שניתן לבדוק.'
```

- [ ] **Step 5: Verify Hebrew parity and timing**

Run:

```bash
rg -n "LLM|אפליקציית AI|artifact|skill|agent|0–8|8–10|10–13|13–19|19–24|24–27|27–30|Prompt A|Prompt B|Prompt C" personal-course/he/lesson-01.md
git diff --check
```

Expected: all six layers are represented, timing matches the English lesson, and Prompt A/B/C remain explicit.

- [ ] **Step 6: Commit the Hebrew integration**

```bash
git add personal-course/he/lesson-01.md site/assets/js/personal-course.js
git commit -m "content: add Hebrew AI geography opening"
```

### Task 5: Verify Links, Rendering, And Content Contracts

**Files:**
- Verify: all files changed in Tasks 1–4

- [ ] **Step 1: Check local Markdown link targets**

Run this repository-local Node check:

```bash
node -e "const fs=require('fs'),path=require('path');const files=process.argv.slice(1);let bad=[];for(const f of files){const s=fs.readFileSync(f,'utf8');for(const m of s.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)){const h=m[1];if(/^(https?:|mailto:|tel:|#)/.test(h))continue;const p=path.resolve(path.dirname(f),h);if(!fs.existsSync(p))bad.push(f+' -> '+h)}}if(bad.length){console.error(bad.join('\n'));process.exit(1)}" materials/shared/AF-REF-001-ai-geography.md materials/session-01-prompting/student/AF-TRN-100-student-mission-guide.md personal-course/materials/lesson-01-better-requests/student/activity.md personal-course/he/ai-geography.md personal-course/he/lesson-01.md
```

Expected: exit 0 with no output.

- [ ] **Step 2: Check the cross-track content contract**

Run:

```bash
rg -l "Codex" materials/shared/AF-REF-001-ai-geography.md personal-course/he/ai-geography.md
rg -l "Claude Code" materials/shared/AF-REF-001-ai-geography.md personal-course/he/ai-geography.md
rg -l "Antigravity" materials/shared/AF-REF-001-ai-geography.md personal-course/he/ai-geography.md
rg -l "OpenClaw" materials/shared/AF-REF-001-ai-geography.md personal-course/he/ai-geography.md
rg -n "AI geography|AI Geography|מפת עולם ה-AI" materials/session-01-prompting personal-course/materials/lesson-01-better-requests personal-course/he/lesson-01.md site/assets/js/course.js site/assets/js/personal-course.js
git diff --check
```

Expected: each product appears in both references, both first lessons mention the orientation, both course cards mention it, and whitespace checks pass.

- [ ] **Step 3: Serve the static site for browser verification**

Run:

```bash
python3 -m http.server 4173
```

Expected: server reports `Serving HTTP on 0.0.0.0 port 4173` and remains running during the next steps.

- [ ] **Step 4: Verify the professional student path in a browser**

Using Playwright, open `http://127.0.0.1:4173/professional.html`, select the Session 1 student mission, follow the AI Geography link, and verify:

- the reference heading is visible;
- all product rows fit without incoherent overlap at 1440×900 and 390×844;
- the back link returns to professional missions;
- the browser console contains no errors.

- [ ] **Step 5: Verify English and Hebrew personal paths in a browser**

Using Playwright, open `http://127.0.0.1:4173/personal.html` and verify:

- English Lesson 1 mentions AI geography and opens the English activity;
- the activity link opens the English reference;
- switching to Hebrew opens Lesson 1 and its Hebrew reference;
- `document.documentElement.dir` and the article direction are `rtl` for the Hebrew reference;
- headings, tables, and mixed English product names do not overlap at 1440×900 and 390×844;
- the browser console contains no errors.

- [ ] **Step 6: Review the complete branch diff**

Run:

```bash
git status --short
git diff --stat main...HEAD
git diff --check main...HEAD
git log --oneline main..HEAD
```

Expected: only the design, plan, references, first-session content, and two course-catalog files are changed; diff checks are silent; commits are scoped by task.

- [ ] **Step 7: Commit any verification corrections**

If browser verification required corrections, stage only those corrected files and commit them:

```bash
git add materials/shared materials/session-01-prompting personal-course site/assets/js/course.js site/assets/js/personal-course.js
git commit -m "fix: polish AI geography lesson integration"
```

If no corrections were required, confirm `git status --short` is clean and do not create an empty commit.
