# Instructor Guide — Mission 6: Bounded Agent Workflows

**Recommended duration:** 120 minutes  
**Student role:** Automation Engineer  
**Primary outcome:** The student can specify a bounded monitoring agent with explicit state, duplicate suppression, recovery, failure handling, observability, and human approval boundaries.

## Before the lesson

Open the mission brief, agent-specification template, supplier snapshots, test log, answer key, and rubric. Review the correct rolling last-valid price rule and the distinction among observation history, current state, active incidents, and permanent event history.

Prepare a whiteboard or shared document for drawing the state machine. The lesson is about specification and reasoning, not merely writing a prompt that says “monitor this.”

## Teaching objectives

The student should be able to:

1. define the agent’s scope, cadence, inputs, outputs, and prohibited actions;
2. separate raw observations from derived current state and incidents;
3. suppress duplicate alerts while preserving history;
4. close incidents on recovery and re-arm for later episodes;
5. handle invalid, missing, or stale data safely;
6. keep purchasing and consequential actions under human control.

## Lesson plan

### 0–15 min — From automation idea to specification

Ask: “What can go wrong with ‘check supplier prices and alert me’?” Capture ambiguity about frequency, baseline, failures, duplicates, and authority.

### 15–35 min — Define stores and state

Draw four boxes: observations, current state, active incidents, event history. Have the student explain what belongs in each and why one table or boolean flag is insufficient.

### 35–55 min — Define detection rules

Use the snapshot dataset to establish valid records, rolling last-valid reference values, thresholds, and stale-data behavior. Require a deterministic rule for price changes and stock status.

Checkpoint: invalid rows must not silently become the new reference value.

### 55–75 min — Incident lifecycle

Walk through open, continue, recover, close, and re-open. Require incident identifiers or equivalent state. Demonstrate why repeated abnormal observations should not create repeated notifications and why a later new episode must be allowed.

### 75–92 min — Failure handling and observability

Have the student specify parse failures, missing suppliers, stale snapshots, partial runs, logging, and escalation. Ask what an operator needs to know when the agent itself is unhealthy.

### 92–108 min — Test with the supplied timeline

The student completes expected events for each snapshot. Challenge any result that mixes fixed-baseline and rolling-reference logic. Require the test log to include expected state, notification, and reason.

### 108–120 min — Human-control review

Ask the student to mark every action that could create cost, commitment, or external communication. These actions require review or explicit approval. End with the question: “What is the safest useful action this agent can take automatically?”

## Likely difficulties and interventions

**Difficulty:** Treating the latest row as valid regardless of parse status.  
**Intervention:** Require validation before state transition.

**Difficulty:** Using one `alert_sent` flag forever.  
**Intervention:** Simulate recovery followed by a second incident.

**Difficulty:** Mixing rolling and fixed baselines.  
**Intervention:** Make the student state the reference-selection algorithm step by step.

**Difficulty:** Allowing the agent to order automatically.  
**Intervention:** Separate recommendation, draft action, and authorized execution.

## Discussion prompts

- What should happen when the agent cannot tell whether a supplier changed or the parser failed?
- Why is silence not proof that the system is healthy?
- When should an automation notify about recovery?
- Which data should be immutable for audit purposes?

## Minimum acceptable evidence of learning

The specification defines all stores, deterministic detection rules, an incident lifecycle, duplicate suppression, recovery and re-arming, failure behavior, logging, and human approval boundaries. The test log follows the rolling last-valid rule consistently.

## Extension

Ask the student to add a notification-priority policy that distinguishes informational changes, actionable incidents, and agent-health failures without creating alert fatigue.

## Fallback plan

If automation tools are unavailable, run the complete workflow manually as a tabletop simulation. The student updates state after each snapshot and records every expected event.
