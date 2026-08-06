# משימה 6 — Bounded מורה Workflows

Design ו־ test specification עבור an unattended תכנון-digest assistant. You תבצעו **not deploy it**. The בדיוני assistant monitors ציבורי curriculum-update snapshots ו־ prepares weekly draft עבור a מורה to בדיקה.

assistant may read only supplied ציבורי snapshots. It יש never receive real תלמיד נתונים, names, IDs, grades, attendance, behavior records, accommodation information, משפחה contact information, or any protected/תלמיד-identifying information.

## Scenario

The בדיוני River Systems יחידת לימוד may need revision when a ציבורי curriculum office updates its guidance. Your assistant compares supplied snapshots, identifies genuinely new notices, ו־ drafts private תכנון digest. A מורה verifies every מקור ו־ יש explicitly approve any sending or publishing.

## Deliverables

- `EDU-AUTO-601-workflow-brief.md`
- completed `EDU-AUTO-602-agent-specification-template.md`
- completed `EDU-AUTO-603-test-log-template.csv`

## Non-negotiable boundary

This is design exercise, not permission to automate school decisions. The תהליך עבודה אסור make or recommend grades, behavior decisions, placement decisions, or intervention decisions. It אסור send external messages, publish content, change school systems, or contact families/students. מורה approval is נדרש before anything is sent or published.
