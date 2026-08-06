# EDU-TRN-601 — Answer Key

## Expected design decisions

- `CURR-101` on January 16 is a duplicate because its stable ID and hash match the prior state; audit it and omit it from the digest.
- `CURR-101` on January 23 is a changed item, not a confirmed instructional requirement. It is labeled `changed—verify`, cited, and held for teacher review.
- `CURR-205` is a new public, complete item; it becomes `new—verify` and is held pending approval.
- `CURR-309` stops the run because it is private. The state must not store its content.
- Any student-data injection stops immediately, leaves no copied record, and generates only a minimal internal audit/review event.

## Required safety reasoning

The workflow can detect a possible public update, but it cannot determine local standards alignment, learner appropriateness, or whether a family/staff message should be sent. The teacher checks the original source and owns every approval. No design receives credit if it proposes grading, behavior, placement, intervention, grouping, sending, publishing, or external messaging.
