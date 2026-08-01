# AF-TRN-601 — Instructor Answer Key

## Core model

A strong design separates four things:

1. immutable raw observations;
2. immutable incident and notification history;
3. current valid supplier state;
4. active incident state by supplier and incident type.

Historical notification records must never be used as the active-state flag. Recovery closes an active incident, and a later recurrence opens a new incident.

## Expected incident transitions

- `S004`: SUP-B lead-time incident opens; notify once.
- `S005`: condition remains active; suppress duplicate notification.
- `S006`: SUP-A stock incident opens; notify once.
- `S007`: SUP-A price incident opens independently; stock incident remains active.
- `S008`: SUP-B lead-time incident closes; no commercial alert is required unless recovery notices are part of the chosen contract.
- `S009`: SUP-A stock incident closes; price incident remains active.
- `S010`: SUP-B parse incident opens. Do not interpret blank commercial fields as changes.
- `S011`: parse incident closes after a valid observation; SUP-B stock and lead-time incidents open independently.
- `S012`: SUP-A price incident closes because the current price is below the 10% threshold relative to the applicable prior valid reference.
- `S013`: SUP-A stock incident opens again and must generate a new alert because the earlier stock incident recovered at `S009`.

## Price-reference requirement

The student must state exactly which valid observation is used as the comparison reference. A defensible implementation stores the last valid observed price and evaluates the percentage change before replacing that reference. It must not compare against an error row or a missing value.

## Stale-data logic

The supplied replay does not itself contain a gap greater than 48 hours. The student should therefore add a synthetic clock-based test proving that stale status is evaluated from the last successful observation, not merely from the last attempted run.

## Notification content

A strong alert contains:

- supplier ID;
- incident type;
- current value and threshold;
- prior valid value when relevant;
- observation timestamp;
- snapshot or evidence ID;
- explicit request for human review.

It must not say that an order should be placed automatically or that a supplier fact has been verified beyond the supplied observation.

## Failure behaviour

- Parsing errors create technical incidents, not commercial conclusions.
- Notification failure is logged and retried according to a bounded policy.
- An incident is not marked notified until delivery succeeds, unless the specification explicitly stores separate `prepared`, `attempted`, and `delivered` states.
- Repeated failures must become visible rather than silently stopping the workflow.

## Red flags

Reduce credit when a design:

- overwrites observations;
- uses one global alert flag for all incident types;
- suppresses future incidents after recovery;
- treats blanks as zero;
- calculates price change from an invalid row;
- performs purchases or other irreversible actions;
- lacks a manual test, pause, or stop procedure;
- logs only successful runs.
