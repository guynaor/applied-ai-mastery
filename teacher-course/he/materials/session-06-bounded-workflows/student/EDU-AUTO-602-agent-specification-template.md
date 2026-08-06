# EDU-AUTO-602 — Bounded סוכן Specification

## 1. Scope ו־ owner

| Field | Specification |
| --- | --- |
| תהליך עבודה name | Weekly ציבורי curriculum תכנון digest |
| מורה owner | |
| Purpose | Compare approved ציבורי snapshots ו־ draft private weekly תכנון digest. |
| Deployment status | Specification ו־ test only; not deployed. |
| Schedule | Friday 16:30 local time; maximum run time 10 minutes. |

## 2. Allowed ו־ forbidden boundaries

| Allowed | Forbidden |
| --- | --- |
| Read approved ציבורי snapshots ו־ last-run state. | Any תלמיד נתונים, roster, גיליון ציונים, attendance, behavior, placement, accommodation, משפחה-contact, LMS, or SIS נתונים. |
| Detect duplicates by stable ID ו־ content hash. | Grades, behavioral decisions, placement, intervention, grouping, or recommendations about individual learners. |
| Draft private digest עם citations ו־ uncertainty labels. | Sending external messages, publishing, posting, changing systems, or contacting students/families. |
| Queue digest עבור מורה approval. | Treating changed מקור as verified or acting without מורה approval. |

## 3. Input validation ו־ state rules

- Accept only rows marked `public` עם a stable `snapshot_id`, date, מקור URL, ו־ content hash.
- Reject ו־ stop run if row includes תלמיד נתונים or unapproved/private מקור.
- State store keeps only `snapshot_id`, `content_hash`, `first_seen`, `last_seen`, `status`, ו־ מורה החלטה; no מקור body or personal נתונים.
- Same ID ו־ same hash: mark `duplicate`, אין לבצע include in digest.
- Same ID ו־ different hash: mark `changed—verify`; include מקור link ו־ before/after dates, never asserted conclusion.
- New ID: mark `new—verify`; include only after input validation.
- Never delete history automatically. A מורה may archive state after בדיקה.

## 4. Digest ו־ approval gate

Draft fields: run ID, time, מקור URL, snapshot ID, status, concise change description, related יחידת לימוד keyword, uncertainty, ו־ מורה בדיקה question.

נדרש gate: `pending_teacher_approval`. The מורה יש inspect original ציבורי sources, decide whether change applies locally, ו־ choose `approve`, `revise`, `archive`, or `reject`. Sending or publishing remains disabled until a מורה separately approves it; this תהליך עבודה has no delivery integration.

## 5. Audit log

עבור every run log: run ID; schedule trigger; input count; accepted/rejected/duplicate/changed counts; validation errors; state reads/writes; draft ID; approval state; stop reason; ו־ מורה החלטה. log יש never contain תלמיד נתונים or copied private content.

## 6. Failures ו־ stop conditions

| Condition | Safe action |
| --- | --- |
| Missing/invalid URL, ID, date, or hash | Stop; log validation failure; create no digest. |
| תלמיד or private נתונים detected | Stop immediately; quarantine nothing in state; log minimal reason; alert internal בדיקה queue. |
| Conflicting identity or unapproved מקור | Stop; request מורה בדיקה. |
| מקור unavailable or timeout | Mark run incomplete; אין לבצע infer change; log ו־ await מורה בדיקה. |
| Duplicate snapshot | Log duplicate; no digest item. |
| Runtime exceeds 10 minutes | Stop; preserve minimal audit event; no retries that widen scope. |

## 7. מורה sign-off

I verified allowed sources, state/duplicate logic, tests, audit fields, ו־ approval gate. I understand that this design cannot grade, decide behavior/placement/intervention, or send/publish externally.

מורה: ____________________  Date: __________  החלטה: approve design / revise / reject
