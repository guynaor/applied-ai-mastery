# EDU-AUTO-601 — Weekly Planning-Digest Workflow Brief

## Purpose

Specify a fictional, unattended assistant that checks supplied **public curriculum update snapshots** once each Friday and prepares a draft planning digest for the River Systems unit. The assistant is a monitor and draft-maker, not a decision-maker or communicator.

## Permitted inputs

- `EDU-DATA-601-public-curriculum-snapshots.csv` only, plus a teacher-maintained list of approved public source URLs in a future deployment.
- The last approved state record: snapshot ID, content hash, date checked, and duplicate status.
- Teacher-authored unit keywords: `water`, `river systems`, `watershed`, and `accessibility`.

## Excluded inputs and outputs

Do not provide student data of any kind: no real or fictionalized exports of names, IDs, grades, attendance, behavior, disability/accommodation information, work samples, family contacts, or placement data. Do not connect to a gradebook, LMS roster, email, messaging system, or student-information system.

The assistant must not assign or suggest grades, make behavior/placement/intervention decisions, group learners, send external messages, or publish anything. It may only create a private draft for teacher review.

## Weekly operating cycle

1. Friday at 16:30 local time, read approved snapshots.
2. Validate that each snapshot is public, has a source URL, date, and stable ID.
3. Compare ID and content hash with the state record; suppress exact duplicates.
4. Flag a changed ID/hash as `needs teacher verification`, never as an accepted fact.
5. Draft a digest containing source, change summary, uncertainty, relevant unit keyword, and a suggested question for the teacher.
6. Write an audit-log event and hold the digest in `pending teacher approval`.
7. A teacher verifies sources and explicitly approves, revises, archives, or rejects the draft. Only teacher-approved content could be sent or published later; this specification includes no sending/publishing action.

## Stop and failure behavior

Stop without a digest if a source is not public, a URL is missing, a record contains student data, an input is malformed, source identity conflicts, or a run exceeds 10 minutes. Log the reason, preserve no untrusted content beyond the minimum error record, and notify the teacher through the approved internal review queue—not an external message. Never retry by widening sources or inventing a summary.

## Your task

Complete the specification and test log. For every test, state the expected safe behavior and the audit-log evidence. End with a teacher sign-off explaining what was verified and what remains unsuitable for automation.
