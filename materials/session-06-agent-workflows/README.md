# Session 6 — Agent Workflows and Safe Monitoring

## AquaForge mission

Priya Nair asks the student to design a bounded monitoring agent for supplier-status updates affecting the AquaNode Mini pilot. The agent must detect meaningful changes, avoid duplicate alerts, preserve evidence, expose failures, and leave purchasing decisions to a human.

## Learning objectives

The student will:

1. Model an agent as Trigger → Action → Decision → Record → Notification.
2. Convert a vague monitoring request into a testable specification.
3. Separate current state, immutable history, and active alert state.
4. Design duplicate suppression, recovery, retry, and stale-data handling.
5. Demonstrate the workflow safely with supplied snapshots rather than a live commercial site.

## Files

### Student

- `AF-AUTO-601-mission-brief.md`
- `AF-AUTO-602-agent-specification-template.md`
- `AF-DATA-601-supplier-snapshots.csv`
- `AF-AUTO-603-test-log-template.csv`

### Instructor

- `AF-TRN-601-answer-key.md`
- `AF-TRN-602-rubric.csv`

## Suggested teaching sequence

1. Draw the five-stage agent loop.
2. Ask the student to identify irreversible actions and remove them from scope.
3. Define meaningful change before implementation.
4. Replay the supplied snapshots in timestamp order.
5. Inspect expected alerts, suppressed duplicates, recovery, and failures.
6. Review logs before discussing scheduling.
