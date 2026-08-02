# Step-by-Step Facilitation Script — Capstone: AquaNode Mini

**Duration:** 4–7 days, normally 6–10 facilitated work blocks  
**Student role:** Lead Applied AI Engineer  
**Instructor goal:** Guide an integrated project without becoming the project solver. The student must maintain traceability and consistency across research, data, communication, operations, automation, and CAD.

## Essential definitions

- **Evidence register:** The controlled record linking claims to source, confidence, limitations, and decision relevance.
- **Decision log:** The record of decisions, assumptions, reasons, owners, and later revisions.
- **Dependency:** A relationship where changing one input or decision affects another artifact.
- **Validation gate:** A measurable condition that must be satisfied before advancing.
- **Bounded pilot:** A limited experiment with defined scope, controls, acceptance criteria, and stopping rules.
- **Impact analysis:** Identification of all claims, calculations, files, and decisions affected by a proposed change.
- **Stale dependency:** An artifact that still contains an old assumption or value after a change.
- **Defense:** A structured explanation of why a recommendation follows from evidence and what remains uncertain.

## Instructor operating rules

1. Ask for evidence before offering solutions.
2. Do not steer toward “proceed.” Revise or stop may be the strongest decision.
3. Do not correct every issue immediately; use scheduled review gates.
4. Record instructor interventions that materially change the student’s work.
5. Require impact analysis before any controlled-change edits.
6. Never accept visual polish as a substitute for cross-deliverable consistency.

## Before Day 1

1. Open all capstone student files, both instructor guides, the controlled-change exercise, and the rubric.
2. Confirm the student can access relevant materials from Missions 1–7.
3. Create a submission folder using the required filenames.
4. Decide the work-block schedule and review gates.
5. Prepare stakeholder roles for the final defense: engineering, procurement, operations, customer success, and leadership.

# Day 1 — Mission framing and evidence control

## Block 1: Briefing — 30 to 45 minutes

Say:

> “Your task is not to launch a product. Your task is to recommend whether AquaForge should proceed to a bounded engineering-validation pilot, revise the concept first, or stop for now.”

Ask the student to define all three options operationally. Correct any definition that treats “proceed” as full production.

Review the required deliverables. Explain that they must agree on names, dates, dimensions, costs, assumptions, and recommendation language.

## Block 2: Evidence register — 60 to 90 minutes

The student reviews each evidence row and records:

- source and evidence type;
- independent or dependent status;
- confidence;
- limitation;
- decision relevance;
- affected deliverables;
- validation needed.

Ask:

- “Which evidence is strongest?”
- “Which evidence contradicts the current direction?”
- “Which claim is repeated rather than independently supported?”
- “Which missing fact could change several deliverables?”

Gate 1: do not allow final recommendation drafting until the highest-impact uncertainties are visible.

# Day 2 — Provisional decision and work planning

## Block 3: Provisional recommendation — 45 to 60 minutes

Require a one-page provisional decision containing:

1. current recommendation;
2. supporting evidence;
3. strongest counter-evidence;
4. conditions and limits;
5. next validation gates.

Challenge it:

- “What would make this recommendation unsafe?”
- “Which assumption is carrying too much weight?”
- “What result would reverse the decision?”
- “Which step is reversible?”

The recommendation is provisional and may change.

## Block 4: Dependency and deliverable plan — 45 to 60 minutes

Use the deliverable register to define:

- owner;
- status;
- evidence dependencies;
- assumptions;
- validation;
- downstream consumers.

Ask the student to order work by dependency, not by preferred tool. Evidence and shared assumptions should precede slides and final formatting.

Gate 2: each mandatory artifact has an owner, required inputs, and a completion criterion.

# Days 3–5 — Production work with design reviews

## Block 5: Research and data review

The student completes the research memo, evidence synthesis, workbook, and calculations.

Instructor review sequence:

1. Select three consequential claims.
2. Trace each to evidence.
3. Reproduce one derived value.
4. Check that unresolved conflicts remain visible.
5. Confirm spreadsheet transformations preserve source evidence.

Do not edit prose for style until claim support is sound.

## Block 6: Operations and agent review

For the operations plan, verify constraints, origins, buffers, costs, and contingencies.

For the agent specification, verify:

- observations, current state, active incidents, and history are separate;
- duplicate suppression and recovery are defined;
- failures and stale data are visible;
- consequential action remains human-approved.

Ask: “What does the system do when it does not know?” Unknown must not silently become normal.

## Block 7: CAD and validation review

Verify the required file is saved as:

`capstone/submission/AF-CAP-CAD-001-wall-bracket.scad`

Review the design contract, parameters, render tests, and physical validation plan.

Ask:

- “Which dimensions are measured versus assumed?”
- “What parameter change could break the design?”
- “What does a successful render prove?”
- “What must be physically tested?”

Do not accept rendering as strength or fit validation.

## Block 8: Presentation and integrated recommendation

The student creates the final decision presentation only after the underlying artifacts are stable.

Require:

- evidence-bound message headlines;
- visible limitations;
- recommendation consistent with the memo;
- costs and dimensions consistent with source artifacts;
- explicit next gate and stopping rule.

Gate 3: no deliverable may use a different recommendation or obsolete shared assumption.

# Day 6 — Cross-deliverable consistency audit

## Block 9: Consistency review — 60 to 90 minutes

Create a consistency table for:

- product and stakeholder names;
- dates;
- dimensions;
- costs and scope;
- statuses;
- assumptions;
- recommendation wording;
- validation gates.

Select at least five claims and trace each through all affected files.

Ask the student to search the full submission for old values and terms. A polished package with contradictions does not pass.

Gate 4: all known contradictions are corrected or explicitly documented.

# Day 6 or 7 — Controlled change

## Block 10: Impact analysis before editing — 30 to 45 minutes

Introduce the supplied controlled change.

The student must first list:

- affected evidence rows;
- affected calculations;
- affected claims;
- affected files;
- affected decisions;
- artifacts that should remain unchanged.

Do not permit editing until this list is reviewed.

## Block 11: Controlled update — 45 to 90 minutes

The student updates affected artifacts, records the change in the decision log, and checks for stale dependencies.

Ask:

- “Why did this file change?”
- “Why did that file not change?”
- “Did the recommendation cross a decision threshold?”
- “What new uncertainty was introduced?”

Gate 5: no known stale value or claim remains.

# Final defense

## Block 12: Ten-minute briefing and stakeholder questions — 45 to 60 minutes

The student presents for ten minutes. Then question them from multiple roles.

Engineering questions:

- “Which technical assumption is least validated?”
- “What failure would stop the pilot?”

Procurement questions:

- “What is included in the cost?”
- “What commitment requires approval?”

Operations questions:

- “What happens when the schedule or supplier data changes?”

Customer success questions:

- “Which claim can be communicated externally, and which cannot?”

Leadership questions:

- “Why this recommendation rather than the alternatives?”
- “What evidence would cause you to reverse it?”

End with:

> “What did AI accelerate, what did it fail to verify, and what decision still belongs to a human?”

## Minimum acceptable evidence of mastery

The submission includes all required artifacts, complete evidence and decision records, consistent shared assumptions, bounded automation, parameterized CAD, explicit validation gaps, a defensible recommendation, and a controlled-change update with no known stale dependencies.

## Intervention guide

- **Student starts with slides:** Require evidence register and provisional recommendation first.
- **Student treats artifacts as unrelated:** Trace shared assumptions and dependencies.
- **Student hides uncertainty:** Make it part of the recommendation and validation gate.
- **Student updates only one file after change:** Return to impact analysis.
- **Student produces excessive content:** Ask which material changes the decision.
- **Student relies on AI-generated technical detail:** Require source, derivation, or verification method.

## Instructor closing assessment

Score with the rubric, then record three qualitative judgments:

1. strongest example of evidence discipline;
2. most important remaining weakness;
3. readiness for a more independent applied-AI project.