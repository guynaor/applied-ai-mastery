# Instructor Guide — Mission 3: Spreadsheet Engineering

**Recommended duration:** 120 minutes  
**Student role:** Data Operations Specialist  
**Primary outcome:** The student can clean messy operational data without destroying source evidence and can specify a safe, stateful low-stock alert workflow.

## Before the lesson

Import the messy inventory CSV into Google Sheets or Excel without editing the source file. Keep a second untouched copy. Open the data-contract template, automation specification, reference clean inventory, answer key, and rubric.

Verify that dates, units, duplicate rows, supplier variants, malformed quantities, missing values, the negative stock value, and the disputed SKU are visible. The instructor should be able to demonstrate why a clean-looking table can still be wrong.

## Teaching objectives

The student should be able to:

1. define a data contract before cleaning;
2. preserve raw observations and document transformations;
3. distinguish formatting normalization from factual reconciliation;
4. identify records that require human review;
5. build a dynamic low-stock and category summary from the cleaned data;
6. test expected versus actual results for required edge cases;
7. design alert state, history, recovery, duplicate suppression, and re-arming.

## Lesson plan

### 0–12 min — Frame the operational risk

Ask: “Which is more dangerous: obviously messy data or confidently cleaned data with hidden assumptions?” Explain that the goal is auditability, not cosmetic perfection.

### 12–28 min — Inspect before editing

Have the student profile columns, unique values, blanks, suspicious ranges, and duplicate keys. Require a written issue list before making changes.

Checkpoint: the student identifies the duplicate `001043` observations as separate evidence, not an invitation to delete one.

### 28–45 min — Define the data contract

Complete expected type, unit, allowed values, null policy, normalization rule, and escalation rule for important fields. Ask the student to distinguish transformations that are safe to automate from those requiring human confirmation.

### 45–68 min — Build a clean working table

Have the student create a new clean sheet rather than overwrite the raw import. Require source-row identifiers and issue flags. Normalize dates, units, and supplier labels only when the rule is explicit. Keep disputed observations separate.

Instructor checkpoint questions:

- What evidence supports this corrected value?
- Is this a format conversion or a factual assumption?
- Could we reproduce the transformation later?
- What should remain unresolved?

### 68–82 min — Build and verify the dynamic summary

Require a formula-, query-, or pivot-based summary that updates from the cleaned table and shows at minimum:

- low-stock item count;
- low-stock items by category;
- unresolved or flagged records;
- any category totals required by the assignment brief.

Change one source value and confirm the summary updates without manual rewriting.

### 82–94 min — Validate the cleaned result

Compare row counts, key counts, totals where meaningful, and unresolved flags. Use the reference file only after the student has explained their process. The reference is not permission to copy unsupported corrections.

### 94–112 min — Design and test the low-stock workflow

Walk through observation store, current state, active incident, and permanent event history. Use a simple timeline:

1. stock falls below threshold;
2. one alert is sent;
3. repeated low readings do not spam;
4. stock recovers and the active incident closes;
5. a later low-stock episode opens a new incident and sends a new alert.

Require parse-failure handling and human approval for purchasing. The student must complete an expected-versus-actual test table for the required edge cases, including repeated low readings, recovery, a second low-stock episode, invalid input, and unresolved data.

### 112–120 min — Debrief

Ask the student to explain why “Alert Sent” alone is insufficient state, why recovery must be represented explicitly, and how the test evidence shows that the workflow matches the specification.

## Likely difficulties and interventions

**Difficulty:** Deleting duplicates automatically.  
**Intervention:** Ask whether the records are duplicate rows or conflicting observations.

**Difficulty:** Filling blanks with guessed values.  
**Intervention:** Require a provenance note for every populated field.

**Difficulty:** Mixing raw and clean data.  
**Intervention:** Enforce separate immutable raw and derived clean sheets.

**Difficulty:** Creating a manually typed summary.  
**Intervention:** Change an input and require the summary to update dynamically.

**Difficulty:** Describing tests without recording results.  
**Intervention:** Require expected and actual outcomes for every mandated edge case.

**Difficulty:** Alerting repeatedly or never re-alerting.  
**Intervention:** Draw the incident state machine and test two separate low-stock episodes.

## Discussion prompts

- When is a negative inventory value an error, and when could it reflect reality?
- What makes a spreadsheet transformation auditable?
- Which tasks are safe for Apps Script, and which must remain human decisions?
- Why is preserving uncertainty a feature rather than a failure?

## Minimum acceptable evidence of learning

The student produces:

- a documented clean table that preserves both disputed observations;
- a usable data contract and issue log;
- a dynamic low-stock/category summary that updates from the clean data;
- an expected-versus-actual test table covering all required edge cases;
- an alert design that handles duplicate suppression, recovery, re-arming, invalid input, and failures.

## Extension

Ask the student to create a small dashboard showing clean rows, unresolved rows, active low-stock incidents, and data-quality warnings without hiding the underlying records.

## Fallback plan

If spreadsheet software is unavailable, conduct the cleanup as a paper or text-based transformation plan using ten representative rows. Preserve the same reasoning, dynamic-summary specification, test table, and state-machine requirements.
