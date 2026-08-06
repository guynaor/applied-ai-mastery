# EDU-AUTO-601 — Weekly תכנון-Digest תהליך עבודה תקציר

## Purpose

Specify a בדיוני, unattended assistant that checks supplied **ציבורי curriculum update snapshots** once each Friday ו־ prepares draft תכנון digest עבור River Systems יחידת לימוד. assistant is monitor ו־ draft-maker, not a החלטה-maker or communicator.

## Permitted inputs

- `EDU-DATA-601-public-curriculum-snapshots.csv` only, plus a מורה-maintained list of approved ציבורי מקור URLs in future deployment.
- last approved state record: snapshot ID, content hash, date checked, ו־ duplicate status.
- מורה-authored יחידת לימוד keywords: `water`, `river systems`, `watershed`, ו־ `accessibility`.

## Excluded inputs ו־ outputs

אין לבצע provide תלמיד נתונים of any kind: no real or fictionalized exports of names, IDs, grades, attendance, behavior, disability/accommodation information, work samples, משפחה contacts, or placement נתונים. אין לבצע connect to a גיליון ציונים, LMS roster, email, messaging system, or תלמיד-information system.

assistant אסור assign or suggest grades, make behavior/placement/intervention decisions, group learners, send external messages, or publish anything. It may only create private draft עבור מורה בדיקה.

## Weekly operating cycle

1. Friday at 16:30 local time, read approved snapshots.
2. Validate that each snapshot is ציבורי, has a מקור URL, date, ו־ stable ID.
3. Compare ID ו־ content hash עם state record; suppress exact duplicates.
4. Flag changed ID/hash as `needs teacher verification`, never as accepted fact.
5. Draft digest containing מקור, change סיכום, uncertainty, relevant יחידת לימוד keyword, ו־ a suggested question עבור the מורה.
6. Write audit-log event ו־ hold digest in `pending teacher approval`.
7. A מורה verifies sources ו־ explicitly approves, revises, archives, or rejects draft. Only מורה-approved content could be sent or published later; this specification includes no sending/publishing action.

## Stop ו־ failure behavior

Stop without digest if a מקור is not ציבורי, a URL is missing, a record contains תלמיד נתונים, an input is malformed, מקור identity conflicts, or run exceeds 10 minutes. Log reason, preserve no untrusted content beyond minimum error record, ו־ notify the מורה through approved internal בדיקה queue—not external message. Never retry by widening sources or inventing a סיכום.

## Your task

Complete specification ו־ test log. עבור every test, state expected safe behavior ו־ audit-log ראיות. End עם a מורה sign-off explaining what was verified ו־ what remains unsuitable עבור automation.
