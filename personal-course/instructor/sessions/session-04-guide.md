# Session 4 facilitator guide — Solve a Recurring Problem

## Preparation and timing

Prepare a harmless packing-checklist scenario and a browser. Teach: define friction 10 minutes; build 15; normal/edge testing 12; revise 8; privacy/debrief 10 (55 total).

## Default demonstration

Use Claude Artifacts with: **“Create a self-contained single-page packing checklist for one traveller. Include add item, check/uncheck, reset, clear labels, and no login, external data, or data sharing. Handle blank item input with a helpful message.”** Expected intermediate artifact: a runnable small web page.

## Equivalent tool routes

**Claude:** use Artifacts and the default request. **ChatGPT:** request a single self-contained HTML page, then run it locally only if the facilitator can inspect it. **Gemini:** request the same small HTML page and inspect it. Learners may paper-prototype instead.

## Visible verification and teaching notes

Run a **normal test**: add and check “passport.” Run an **edge test**: submit a blank item. Record expected/actual, revise one behaviour, and retest. Misconceptions: generated code is automatically safe; a small tool needs an account. No-paid/no-tool alternative: draw screens and complete the same test log. Mention Lovable and Replit only as optional next steps for larger, collaborative, sustained, or deployed projects.

## Review prompts

What is the smallest useful behaviour? What did the edge case reveal? Where would data live, and how could it be cleared?
