# Real Life Mission 5 — Design a Useful Alert

**Ability unlocked:** Personal Monitor Designer

Choose one real price, availability, release, booking, or restock condition worth checking. Do not grant purchasing authority or account credentials.

## Bronze — Write the alert contract

Specify the exact item, acceptable variants, trigger, source, check frequency, notification channel, expiry date, and stop rule.

## Silver — Simulate the lifecycle

Create sample observations that demonstrate:

- no alert above the threshold;
- one alert when the condition becomes true;
- duplicate suppression;
- recovery;
- re-arming for a later event;
- failed or stale checks;
- pause, resume, and stop behavior.

## Gold — Run it manually for a week

Perform the checks yourself or use an existing alert service. Record false positives, missed conditions, and improvements.

## Evidence to submit

- completed alert specification;
- sample event log or week-long observation log;
- evidence that no purchase happens automatically;
- one revision after testing;
- completed journal entry.

## Reflection

1. Was your original trigger precise enough?
2. How did you prevent notification spam?
3. When should the monitor stop?
4. What failure would require human attention?

## Instructor check

The student should describe a complete alert lifecycle, not merely “tell me when it is cheaper.”