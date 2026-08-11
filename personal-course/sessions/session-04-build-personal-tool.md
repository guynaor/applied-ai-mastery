# Session 4 — Solve a Recurring Problem

**Time:** 45–60 minutes  
**Outcome:** One small web tool that you built, tested, and know exactly where it breaks.

## Scenario

Pick a small thing you keep losing track of: splitting costs with flatmates, a packing list, a rota of household chores, tracking a habit. Not a software project — one tiny tool, with one user and a deliberately limited job. Do not put passwords, account details, other people's data, or decisions with financial or medical weight into it.

## Sequence

1. **Choose the friction and shrink it (10 minutes).** Write down who the user is, what problem recurs, and no more than three actions the tool can perform. Write down what it may store and what it must never do. The most useful resistance here is to yourself: every fourth action you add costs you a test you will not have time to run.
2. **Build the smallest version that is already useful (15 minutes).** In **Claude Artifacts**, ask for one self-contained web page: plain labels, a reset control, no login, no connection to an external service, and no sending data anywhere. A paper prototype is equally valid — the learning here is in the definition and the testing, not the code.
3. **Test what will actually happen (12 minutes).** Run a **normal case** — the action you built the tool for. Then run an **edge case**: an empty field, zero, a negative number, text where a number belongs, or an absurdly long value. Record what you expected and what actually happened, revise one behaviour, and retest.
4. **Keep control (8 minutes).** Decide where the tool is stored, who can open it, how data gets cleared, and when you stop using it. Share it only after you have checked it yourself.

## Integrated artifact

Submit the tool — or the paper prototype — with a short test log: the problem, the permitted actions, the normal-case result, the edge-case result, the revision you made, and one sentence on privacy and maintenance. Code that was generated quickly is not safe merely because it runs.

## Optional resources

Every table for this session is in the [learning journal](../../site/assets/downloads/applied-ai-mastery-personal-journal-en.docx): defining the useful minimum, the revision log, and the test table. Download it as a Word file and fill it in by hand or on screen. A paper prototype is a full and valid free-access route, at no cost. **Lovable** and **Replit** are optional next steps for larger or collaborative projects — no sign-up is needed for this course.
