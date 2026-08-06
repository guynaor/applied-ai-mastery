# EDU-AUTO-602 — Bounded Agent Specification

## 1. Scope and owner

| Field | Specification |
| --- | --- |
| Workflow name | Weekly public curriculum planning digest |
| Teacher owner | |
| Purpose | Compare approved public snapshots and draft a private weekly planning digest. |
| Deployment status | Specification and test only; not deployed. |
| Schedule | Friday 16:30 local time; maximum run time 10 minutes. |

## 2. Allowed and forbidden boundaries

| Allowed | Forbidden |
| --- | --- |
| Read approved public snapshots and last-run state. | Any student data, roster, gradebook, attendance, behavior, placement, accommodation, family-contact, LMS, or SIS data. |
| Detect duplicates by stable ID and content hash. | Grades, behavioral decisions, placement, intervention, grouping, or recommendations about individual learners. |
| Draft a private digest with citations and uncertainty labels. | Sending external messages, publishing, posting, changing systems, or contacting students/families. |
| Queue a digest for teacher approval. | Treating a changed source as verified or acting without teacher approval. |

## 3. Input validation and state rules

- Accept only rows marked `public` with a stable `snapshot_id`, date, source URL, and content hash.
- Reject and stop the run if a row includes student data or an unapproved/private source.
- State store keeps only `snapshot_id`, `content_hash`, `first_seen`, `last_seen`, `status`, and teacher decision; no source body or personal data.
- Same ID and same hash: mark `duplicate`, do not include in digest.
- Same ID and different hash: mark `changed—verify`; include source link and before/after dates, never an asserted conclusion.
- New ID: mark `new—verify`; include only after input validation.
- Never delete history automatically. A teacher may archive state after review.

## 4. Digest and approval gate

Draft fields: run ID, time, source URL, snapshot ID, status, concise change description, related unit keyword, uncertainty, and teacher review question.

Required gate: `pending_teacher_approval`. The teacher must inspect original public sources, decide whether the change applies locally, and choose `approve`, `revise`, `archive`, or `reject`. Sending or publishing remains disabled until a teacher separately approves it; this workflow has no delivery integration.

## 5. Audit log

For every run log: run ID; schedule trigger; input count; accepted/rejected/duplicate/changed counts; validation errors; state reads/writes; draft ID; approval state; stop reason; and teacher decision. The log must never contain student data or copied private content.

## 6. Failures and stop conditions

| Condition | Safe action |
| --- | --- |
| Missing/invalid URL, ID, date, or hash | Stop; log validation failure; create no digest. |
| Student or private data detected | Stop immediately; quarantine nothing in state; log minimal reason; alert internal review queue. |
| Conflicting identity or unapproved source | Stop; request teacher review. |
| Source unavailable or timeout | Mark run incomplete; do not infer a change; log and await teacher review. |
| Duplicate snapshot | Log duplicate; no digest item. |
| Runtime exceeds 10 minutes | Stop; preserve minimal audit event; no retries that widen scope. |

## 7. Teacher sign-off

I verified the allowed sources, state/duplicate logic, tests, audit fields, and approval gate. I understand that this design cannot grade, decide behavior/placement/intervention, or send/publish externally.

Teacher: ____________________  Date: __________  Decision: approve design / revise / reject
