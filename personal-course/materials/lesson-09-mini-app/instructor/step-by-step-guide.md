# Step-by-Step Instructor Guide — Lesson 9

**Duration:** 25–30 minutes  
**Goal:** Teach requirements-first, controlled AI-assisted coding and honest testing.

## Definitions

- **Requirement:** A statement of behavior the app must provide.
- **Acceptance check:** A test that shows whether a requirement is satisfied.
- **Controlled change:** One bounded modification made without changing unrelated behavior.
- **Regression:** Existing behavior that stops working after a change.
- **Local storage:** Browser storage on one device; it is not a shared database.
- **Minimum useful version:** The smallest version that solves the stated problem.

## Preparation

Open the activity, workbook, and starter app. Confirm the starter runs in a browser. Keep an untouched copy available.

## 0–4 minutes — Choose a tiny problem

Say:

> “The fastest way to fail with AI coding is to ask for an entire dream app before defining the first useful behavior.”

Help the student choose one user, one problem, and no more than three actions.

## 4–8 minutes — Requirements first

Complete the problem statement and requirements table. Require one explicit non-goal.

Ask:

- “What does success look like?”
- “What data is entered?”
- “Where is it stored?”
- “What must never be claimed?”

Checkpoint: the student understands that the starter is single-browser, not multi-user.

## 8–12 minutes — Inspect before editing

Run the starter. Test voting, refresh, saving labels, and reset. Ask the student to point to visible behavior before reading code.

Explain the roles of HTML, CSS, and JavaScript in plain language.

## 12–18 minutes — One AI-assisted change

The student selects one feature and uses the supplied prompt pattern. Reject requests that add accounts, payments, public databases, or several features at once.

Before replacing code, save the original. Ask AI to explain the changed sections and manual tests.

## 18–24 minutes — Test and diagnose

Run the five required tests. Record expected and actual behavior.

If a test fails, use this sequence:

1. reproduce the failure;
2. identify the smallest failing behavior;
3. copy the exact error or observation;
4. ask AI for a targeted diagnosis;
5. change one thing;
6. rerun all tests.

## 24–27 minutes — Sharing boundary

Ask the student what another person sees when opening the file on another device. Expected answer: their own independent local state.

Discuss what a real shared poll would require: hosted storage, identity or abuse controls, privacy decisions, and more testing.

## 27–30 minutes — Save evidence

Require organized source files, prompt, test log, limitation note, and screenshot.

## Minimum acceptable output

- bounded requirements and non-goal;
- functioning starter app;
- one controlled feature change;
- expected-versus-actual test log;
- honest storage/sharing explanation;
- organized project evidence.

## Interventions

- **Student requests many features:** choose the single most useful one.
- **Student overwrites the only copy:** restore the original and establish versioned files.
- **Student says “it works” without tests:** complete the test log.
- **AI adds external libraries:** remove them unless the lesson explicitly requires them.
- **Student calls it a shared poll:** demonstrate the local-only limitation.