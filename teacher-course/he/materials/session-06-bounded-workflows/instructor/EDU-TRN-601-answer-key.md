# EDU-TRN-601 — מפתח תשובות

## Expected design decisions

- `CURR-101` on January 16 is duplicate because its stable ID ו־ hash match prior state; audit it ו־ omit it מ־ digest.
- `CURR-101` on January 23 is changed item, not confirmed instructional requirement. It is labeled `changed—verify`, cited, ו־ held עבור מורה בדיקה.
- `CURR-205` is new ציבורי, complete item; it becomes `new—verify` ו־ is held pending approval.
- `CURR-309` stops run because it is private. state אסור store its content.
- Any תלמיד-נתונים injection stops immediately, leaves no copied record, ו־ generates only minimal internal audit/בדיקה event.

## נדרש בטיחות reasoning

The תהליך עבודה can detect possible ציבורי update, but it cannot determine local תקנים alignment, learner appropriateness, or whether a משפחה/staff message כדאי be sent. The מורה checks original מקור ו־ owns every approval. No design receives credit if it proposes grading, behavior, placement, intervention, grouping, sending, publishing, or external messaging.
