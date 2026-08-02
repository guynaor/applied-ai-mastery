# Instructor Script — Lesson 5: Create Personal Deal Alerts

**Duration:** 25–30 minutes

## Definitions

- **Trigger:** the condition that opens a new alert episode.
- **Duplicate suppression:** preventing repeated notifications while the same condition continues.
- **Recovery:** evidence that the condition is no longer true.
- **Re-arming:** allowing a new alert after recovery and a later recurrence.
- **Cadence:** how often the check runs.
- **Expiry:** the date or condition that ends monitoring.
- **Stale data:** information too old to support a current notification.

## 0–4 minutes — Pick one precise target

Say: “Monitoring a vague category creates noise. Monitoring one decision condition creates value.”

Require an exact item, source scope, threshold, cadence, and expiry date.

## 4–10 minutes — Draw the lifecycle

Draw:

`NOT MET → ACTIVE → RECOVERED → ACTIVE AGAIN`

Ask what should happen at each transition. The first active transition alerts. Repeated active checks do not. Recovery closes the episode. A later recurrence may alert again.

## 10–16 minutes — Complete the specification

Have the student define source, total-cost condition, timestamp, notification content, and failed-check behavior.

Ask:

- What if the page cannot be read?
- What if the price excludes delivery?
- What if the seller changes?
- How old can the data be before it is unsafe to notify?

Unknown or failed must not be treated as a valid deal.

## 16–21 minutes — Add controls

Require check-now, pause, resume, stop/delete, expiry, and maximum alert frequency. Confirm payment details are not stored and buying remains manual.

Intervene if the design has no way to stop, alerts on every check, or automatically purchases.

## 21–26 minutes — Test the cases

Walk through false, first true, repeated true, recovery, recurrence, and failed-source cases. The student writes expected output before describing actual or intended behavior.

## 26–30 minutes — Choose the simplest tool

Ask whether recurring automation is necessary. A sale-end reminder or weekly manual task may be safer and simpler.

## Exit check

The student explains duplicate suppression, recovery, re-arming, and how to stop the monitor.