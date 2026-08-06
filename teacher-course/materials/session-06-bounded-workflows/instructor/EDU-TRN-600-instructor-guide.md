# EDU-TRN-600 — Instructor Guide

## Facilitation priorities

Keep the exercise on system boundaries, not clever automation. A valid design has a small public input set, minimal state, deterministic duplicate rules, visible audit events, and a meaningful stop path. “A human can review later” is insufficient: teacher approval must block every send/publish action.

## Ask

- “Which exact field proves this item came from an approved public source?”
- “What is retained after a duplicate, a timeout, and a prohibited-data detection?”
- “What decision remains entirely with the teacher?”
- “Where could an external message occur? Why is it disabled here?”

## Guardrails

Reject designs that connect to gradebooks, rosters, LMS data, family contacts, or school messaging. Reject summaries that call a curriculum change ‘approved’ before teacher verification. Do not allow any grade, behavior, placement, intervention, or external-message feature—even as an optional future enhancement—inside this mission.
