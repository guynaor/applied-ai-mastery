# Step-by-Step Instructor Script — Mission 3: Spreadsheet Engineering

**Duration:** 130–150 minutes  
**Student role:** Data Operations Specialist  
**Instructor goal:** Teach safe data cleaning, provenance, dynamic summaries, edge-case testing, and stateful alert design.

## Essential definitions

- **Raw data:** The unchanged source observations as received.
- **Clean data:** A derived table produced through documented transformations.
- **Data contract:** Rules for field names, types, units, valid values, nulls, and escalation.
- **Provenance:** Information showing where a value came from and how it changed.
- **Normalization:** Converting equivalent representations into a consistent format without changing meaning.
- **Reconciliation:** Resolving conflicting factual observations; this often requires human evidence.
- **Idempotent process:** Re-running the same process does not create additional unintended changes.
- **Active incident:** A currently unresolved alert condition.
- **Re-arming:** Allowing a new alert after recovery and a later recurrence.

## Preparation

1. Import the messy CSV into a sheet named `Raw_Import`.
2. Protect or duplicate that sheet so it remains unchanged.
3. Create empty sheets named `Clean_Working`, `Issue_Log`, `Summary`, and `Test_Cases`.
4. Open the assignment, contract template, automation specification, answer key, reference file, and rubric.
5. Confirm the disputed `001043` observations remain visible as separate rows.

## Opening — 0 to 10 minutes

Say:

> “The goal is not to make the spreadsheet look clean. The goal is to make every transformation explainable, repeatable, and reversible.”

Ask which is more dangerous: visible mess or invisible assumptions. Expected answer: invisible assumptions can create trusted but false results.

## Profile before editing — 10 to 30 minutes

Direct the student to inspect:

- headers and row count;
- unique units and supplier names;
- date formats;
- blanks and malformed quantities;
- negative values;
- duplicate or conflicting keys.

Require an issue-log entry before any correction. Each entry must include source row, field, observed value, issue type, proposed action, and whether human confirmation is required.

Ask repeatedly: “Is this a format problem or a factual problem?”

## Build the data contract — 30 to 50 minutes

Complete the contract field by field. For each column define:

1. canonical name;
2. type;
3. unit;
4. allowed values or range;
5. null policy;
6. safe normalization rule;
7. escalation rule.

Explain that a rule such as converting `pcs`, `piece`, and `units` to `ea` can be safe when meaning is equivalent. Choosing between two conflicting quantities is reconciliation and needs evidence.

## Create the clean working table — 50 to 78 minutes

1. Copy source identifiers into the clean table.
2. Normalize dates and units with explicit formulas or documented steps.
3. Standardize supplier labels only when equivalence is established.
4. Preserve both disputed `001043` rows with unresolved flags.
5. Do not replace blanks with guesses.
6. Add columns for validation status, issue code, and reviewer note.

Checkpoint questions:

- “Can we trace this value to a source row?”
- “What rule produced it?”
- “Could the process be repeated tomorrow?”
- “What remains unresolved?”

## Validate the transformation — 78 to 92 minutes

Compare raw and clean row counts. Check that no source observation disappeared. Compare totals only where units and meaning are compatible. Review unresolved flags.

Show the reference clean inventory only after the student explains their own process. State that reference output does not justify unsupported corrections.

## Build dynamic summaries — 92 to 108 minutes

The student creates formula- or pivot-based summaries that update when data changes:

- low-stock items by category;
- count of unresolved records;
- current active low-stock items;
- data-quality warning count.

Change one test quantity temporarily and verify the summary updates. Undo the test change afterward.

Define **dynamic summary** as an output derived from the current data rather than manually typed totals.

## Design the alert state machine — 108 to 128 minutes

Draw this sequence:

`NORMAL → LOW_ACTIVE → RECOVERED → LOW_ACTIVE_AGAIN`

For each transition ask what is stored and whether a notification is sent.

Required stores:

- observation history;
- current item state;
- active incident record;
- permanent event history.

Required behavior:

1. first low observation opens an incident and alerts;
2. repeated low observations do not spam;
3. recovery closes the active incident;
4. later low stock opens a new incident and alerts again;
5. parse failures are recorded and do not overwrite last valid state;
6. purchasing remains human-approved.

## Create edge-case tests — 128 to 142 minutes

Require expected-versus-actual rows for at least:

- first low-stock event;
- repeated low reading;
- recovery;
- second low episode;
- malformed quantity;
- missing threshold;
- disputed duplicate record.

Do not accept “works” as a test result. Require observed output and pass/fail.

## Debrief — final 8 minutes

Ask why a single `Alert Sent` column is insufficient. Expected answer: it cannot represent incident lifecycle, recovery, new episodes, or history reliably.

## Minimum acceptable submission

- immutable raw sheet;
- documented clean table with provenance;
- data contract and issue log;
- dynamic summary by category and status;
- stateful alert specification;
- expected-versus-actual edge-case test table.

## Intervention guide

- **Student deletes duplicates:** Restore them and classify them as duplicate versus conflicting evidence.
- **Student guesses blanks:** Require a source or unresolved flag.
- **Student manually types summary totals:** Replace them with formulas or pivots.
- **Student alerts on every run:** Introduce active incident state.
- **Student never re-alerts:** Add recovery closure and re-arming.

## Exit check

The student must explain normalization versus reconciliation, provenance, and why recovery is required for a stateful alert.