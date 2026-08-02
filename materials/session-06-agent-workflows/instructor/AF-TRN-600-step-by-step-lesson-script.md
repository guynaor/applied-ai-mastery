# Step-by-Step Instructor Script — Mission 6: Bounded Agent Workflows

**Duration:** 120–140 minutes  
**Student role:** Automation Engineer  
**Instructor goal:** Teach the student to design a monitoring agent with explicit state, duplicate suppression, recovery, observability, stale-data handling, delivery-failure controls, and human approval boundaries.

## Essential definitions

- **Agent:** A system that repeatedly observes inputs, applies rules or reasoning, updates state, and may propose or perform actions.
- **Observation:** One timestamped reading or source snapshot.
- **Current state:** The latest valid interpretation of an entity.
- **Event history:** An append-only record of meaningful transitions or actions.
- **Active incident:** A currently unresolved condition requiring attention.
- **Duplicate suppression:** Preventing repeated notifications for the same continuing incident.
- **Recovery:** A valid transition showing that an incident condition has ended.
- **Stale data:** Data too old to support a current decision.
- **Parse failure:** An input that cannot be interpreted safely.
- **Human-in-the-loop:** A design where consequential action requires human review or approval.
- **Trigger cadence:** The planned interval at which the workflow runs.
- **Manual trigger:** A deliberate operator-initiated run used for testing or recovery.
- **Pause/stop control:** A documented way to prevent future scheduled runs without deleting evidence or state.
- **Bounded retry:** A limited, observable number of delivery attempts followed by escalation rather than endless retries.

## Preparation

1. Open the mission brief, agent specification, supplier snapshots, test log, answer key, and rubric.
2. Read the snapshot sequence and identify expected price, availability, recovery, stale-data, parse-failure, and notification-failure events.
3. Prepare a whiteboard with four headings: Observations, Current State, Active Incidents, Event History.
4. Do not begin with code. The student must define behavior first.

## Opening — 0 to 10 minutes

Say:

> “An agent is not just a prompt that runs repeatedly. It is a stateful system. If we do not define what it remembers, when it alerts, when it recovers, and how it can be stopped, it will either spam, miss events, or act on bad data.”

Ask: “What can go wrong if the system remembers only the latest value?”

Expected ideas: loss of history, inability to detect transitions, duplicate alerts, no audit trail, and no evidence of recovery.

## Define the mission boundary and operations — 10 to 28 minutes

Have the student state:

- what the agent observes;
- scheduled trigger cadence;
- manual trigger method;
- who receives notifications;
- pause/stop method and who may use it;
- what it may never do automatically.

Require an explicit rule that the agent does not place orders or commit spending. Purchasing remains human-approved.

Ask: “What is the highest-consequence action in this workflow?” and “What evidence would a person need before approving it?”

Checkpoint: the workflow cannot proceed until another operator could identify how to run it manually and how to stop future scheduled runs safely.

## Separate the data stores — 28 to 46 minutes

Draw the four-store model:

1. **Observation store:** every raw snapshot and parse result.
2. **Current-state store:** latest valid state per supplier/item.
3. **Active-incident store:** currently open conditions.
4. **Event-history store:** permanent record of opened, updated, recovered, delivery-failed, and closed events.

For each store ask:

- “What is its key?”
- “Is it overwritten or appended?”
- “What happens after recovery?”
- “Can an auditor reconstruct the sequence?”

Reject designs that use a single `alert_sent` flag as the complete state model.

## Define detection rules — 46 to 66 minutes

The student writes each rule in this format:

- input required;
- comparison reference;
- trigger condition;
- uncertainty handling;
- resulting state transition;
- notification behavior.

For price monitoring, enforce the specified rolling last-valid-price policy. A malformed observation does not replace the last valid comparison value.

Ask the student to explain the difference between a fixed baseline and rolling reference. Ensure only the specified policy is used.

## Walk through snapshots manually — 66 to 86 minutes

Process the supplied snapshots in time order. For each row require the student to state:

1. parse result;
2. last valid state before the row;
3. rule evaluation;
4. active incident before and after;
5. event-history entry;
6. notification sent, suppressed, retried, or failed.

Pause at recovery rows and ask what closes the incident. Pause at repeated conditions and ask why a second notification is or is not sent.

Checkpoint: a later recurrence after recovery must open a new incident.

## Handle failures, retries, and stale inputs — 86 to 104 minutes

Define safe behavior for:

- missing price;
- malformed availability;
- timestamp older than the freshness threshold;
- supplier page unavailable;
- partial parse where one field is valid and another is not;
- notification provider timeout or rejection.

Require that failures are observable. They must create logs or events without silently turning unknown data into a normal state.

For notification delivery, require:

1. a finite retry limit and delay policy;
2. no duplicate incident creation during retries;
3. a permanent failed-delivery event after retries are exhausted;
4. visible operator escalation with incident ID, recipient, error, and last attempt time;
5. incident state that distinguishes “condition detected” from “notification delivered.”

Say:

> “Unknown is a state. Delivery failed is also a state. Neither may be converted into normal or delivered without evidence.”

## Write the agent specification — 104 to 124 minutes

The student completes:

- purpose and boundaries;
- trigger cadence and manual trigger;
- pause/stop procedure;
- inputs and freshness rules;
- storage model;
- detection rules;
- incident lifecycle;
- notification content;
- bounded retry and failed-notification behavior;
- approval boundary;
- logs and metrics;
- failure behavior;
- test cases.

Review each section for ambiguity. Replace phrases like “notify when needed” or “retry if necessary” with precise triggers and limits.

## Test the specification — 124 to 140 minutes

Use the test-log template. Require expected-versus-actual cases for:

- scheduled trigger at the defined cadence;
- manual trigger;
- pause/stop preventing a later scheduled run;
- first price incident;
- repeated same incident;
- recovery;
- later recurrence;
- out-of-stock transition;
- parse failure;
- stale data;
- unchanged valid observation;
- delivery failure followed by a successful bounded retry;
- delivery failure with retries exhausted and operator escalation.

A specification is not complete until another person can predict the output for each case.

## Debrief — final 8 minutes

Ask:

1. “Why are observation history and current state different?”
2. “What makes an incident re-arm?”
3. “Why must parse and delivery failures be visible?”
4. “How does an operator stop the workflow safely?”
5. “Which decision remains human, and why?”

## Minimum acceptable submission

- explicit four-store architecture;
- precise detection and freshness rules;
- defined trigger cadence and manual trigger;
- documented pause/stop method;
- duplicate suppression, recovery, and re-arming;
- bounded delivery retries and failed-notification escalation;
- observable failure handling;
- human approval boundary;
- expected-versus-actual test log covering operational controls and delivery failures.

## Intervention guide

- **Student starts coding immediately:** Return to state and transition definitions.
- **Student overwrites history:** Separate append-only observations/events from current state.
- **Student suppresses alerts forever:** Add recovery and a new incident ID.
- **Student treats parse failure as no change without logging:** Add failure event and preserve last valid state.
- **Student retries forever:** Set a finite limit, log attempts, and escalate after exhaustion.
- **Student equates detected with delivered:** Track condition and notification delivery separately.
- **Student cannot describe how to stop the agent:** Add an operator-owned pause/stop procedure before approval.
- **Student automates purchasing:** Replace with recommendation and approval workflow.

## Exit check

The student must draw the incident lifecycle, explain the purpose of each store, state the cadence and stop method, and describe what happens after notification delivery fails.