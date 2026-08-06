# EDU-TRN-600 — מנחה מדריך

## Facilitation priorities

Keep exercise on system boundaries, not clever automation. A valid design has small ציבורי input set, minimal state, deterministic duplicate rules, visible audit events, ו־ a meaningful stop path. “A human can בדיקה later” is insufficient: מורה approval יש block every send/publish action.

## Ask

- “Which exact field proves this item came מ־ an approved ציבורי מקור?”
- “What is retained after duplicate, a timeout, ו־ a prohibited-נתונים detection?”
- “What החלטה remains entirely עם the מורה?”
- “Where could external message occur? Why is it disabled here?”

## Guardrails

Reject designs that connect to gradebooks, rosters, LMS נתונים, משפחה contacts, or school messaging. Reject summaries that call curriculum change ‘approved’ before מורה אימות. אין לבצע allow any grade, behavior, placement, intervention, or external-message feature—even as an אופציונלי future enhancement—inside this משימה.
