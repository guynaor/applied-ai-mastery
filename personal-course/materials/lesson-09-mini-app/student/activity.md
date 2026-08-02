# Lesson 9 — Build Your First Mini App

**Time:** 25–30 minutes  
**Goal:** Use AI to turn a small everyday need into a working, testable single-page app.

## Choose one tiny problem

Pick one:

- a poll for choosing a date, destination, menu, or activity;
- an expense splitter;
- a packing checklist;
- a simple habit tracker.

For the main lesson, the supplied starter is a **group poll**. Keep the first version deliberately small.

## Step 1 — Write the requirements before coding

Complete this sentence:

> The app helps **[user]** decide or track **[one thing]** by allowing them to **[three actions maximum]**.

Define:

- required inputs;
- output or result;
- what data is stored;
- what happens after refresh;
- privacy boundary;
- one thing the app will not do.

## Step 2 — Inspect the starter app

Open `starter-poll-app.html` in a browser. Test the default behavior before editing.

Identify:

- the question field;
- option fields;
- vote buttons;
- result counts;
- reset control;
- browser storage.

## Step 3 — Ask AI for one controlled change

Choose only one feature:

- allow four options instead of three;
- add a closing date;
- add an “other” option;
- display percentages;
- add a copyable summary.

Prompt pattern:

> Modify this single-file HTML app to **[one feature]**. Preserve the existing behavior. Do not add frameworks or external services. Explain exactly which sections changed and provide a short manual test plan.

Paste the starter code only after removing any personal data.

## Step 4 — Test before adding another feature

Run at least these tests:

1. vote once for each option;
2. refresh the page;
3. reset the poll;
4. try an empty or invalid field;
5. test the new feature.

Record expected and actual results.

## Step 5 — Decide what is safe to share

The starter stores data only in the current browser. It does **not** synchronize votes between people. A truly shared poll needs a backend or external service and additional privacy and security work.

Do not claim the app supports multi-user sharing unless it actually does.

## Step 6 — Save the project evidence

Save:

- the requirements;
- the prompt used;
- the original file;
- the modified file;
- the test log;
- one screenshot.

These can become portfolio evidence in Lesson 12.

## Completion check

- [ ] The app solves one small problem.
- [ ] Requirements were written before editing code.
- [ ] Only one controlled feature was added.
- [ ] Expected-versus-actual tests were recorded.
- [ ] Storage and sharing limits are explained honestly.
- [ ] Project files are organized.

Reusable rule: **Build the smallest useful version, test it, and only then add features.**