# Mission 6 — Bounded Teacher Workflows

Design and test a specification for an unattended planning-digest assistant. You will **not deploy it**. The fictional assistant monitors public curriculum-update snapshots and prepares a weekly draft for a teacher to review.

The assistant may read only the supplied public snapshots. It must never receive real student data, names, IDs, grades, attendance, behavior records, accommodation information, family contact information, or any protected/student-identifying information.

## Scenario

The fictional River Systems unit may need revision when a public curriculum office updates its guidance. Your assistant compares the supplied snapshots, identifies genuinely new notices, and drafts a private planning digest. A teacher verifies every source and must explicitly approve any sending or publishing.

## Deliverables

- `EDU-AUTO-601-workflow-brief.md`
- completed `EDU-AUTO-602-agent-specification-template.md`
- completed `EDU-AUTO-603-test-log-template.csv`

## Non-negotiable boundary

This is a design exercise, not permission to automate school decisions. The workflow must not make or recommend grades, behavior decisions, placement decisions, or intervention decisions. It must not send external messages, publish content, change school systems, or contact families/students. Teacher approval is required before anything is sent or published.
