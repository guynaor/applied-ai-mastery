# Session 3 as AI jobs, and a remote-first course — design

**Date:** 2026-08-13
**Status:** approved, ready to implement

## Why

Session 2 ran live and worked, but the facilitator did not use the prepared sample pages — learners researched real sites instead, and that was better. Two things follow from that run and from how the class has changed.

**The class is now half local and half remote, trending mostly remote.** Several activities assume a physical room: drawing a paper card, taping cardboard to a floor, sticky notes on a wall, passing printed sources around.

**Session 3 teaches planning discipline rather than AI.** Constraint versus preference, dated facts, owners and buffers, a disruption test. These are good habits, but a learner spends the hour organising an event rather than learning what AI does well and badly.

## Decisions

### 1. AI jobs become the spine of session 3

The planning discipline is not dropped. It stops being the subject and becomes the check applied to each AI output.

| Time | The AI job | The check |
|---|---|---|
| 0–5 | — | The event the learner is actually organising |
| 5–15 | Food and drinks: quantities, dietary needs, budget | What did it assume about your guests? Ask it to separate what it was told from what it assumed |
| 15–28 | Image display: Claude Artifacts builds a page cycling images with captions, a pause control, nothing sent anywhere | Whose photos, and who agreed? Plus one normal and one edge check |
| 28–38 | Timing: a run sheet | Which of these facts change? The planted venue, bus, and caterer conflicts surface here |
| 38–50 | Dividing the work: a rota | AI writes "someone should". Every task needs a name. It does not know who is reliable or free |
| 50–60 | One disruption card | What breaks, who triggers the fallback, by when |

The image display is the block that produces something the learner keeps, and it raises consent without a lecture.

### 2. Sample pages split so an AI can read the sources without the answers

The pages are already publicly fetchable — `200 text/html`, no `robots.txt`, no blocking headers. The problem is that one URL carries both learner material and facilitator material, so pointing an AI at it hands over the cards or the answers.

| Current page | Becomes |
|---|---|
| `session-03-plan-sources` | `session-03-sources` (learner) and `session-03-cards` (facilitator) |
| `session-02-product-sources` | sources only, and `session-02-snapshots` |
| `session-06-asset-set` | assets only, and `session-06-answers` |

A `<details>` element hides the answers from a person but not from a fetch, which is why session 6 needs the same split.

Each learner-facing sources page carries a **copy-all-as-text control** over a plain-text mirror of the same facts. Gemini and paid ChatGPT can fetch a URL; Claude often cannot browse; free tiers vary. Offering both means no learner is blocked by which tool they happen to have, and the session never stalls on "my Claude cannot open links".

The control uses the clipboard API with selecting the text as the fallback. This is a sample page, not the markdown viewer, so it is not covered by the `navigator.clipboard` prohibition in `check-personal-document-review.mjs`.

### 3. Remote-first, with the room as a subset

Everything must work for one person alone on a laptop. Anyone sitting in the room does exactly the same thing.

- Cards are handed out as URLs, not paper
- "Circulate the room" becomes a shared document everyone types into
- Session 4's test cards are already a page; the guide points at the link
- **Session 5 gets easier.** A remote learner is at home, beside the drawer they are measuring. It is reframed from "bring a box to class" to "measure your real corner", and the facilitator brings nothing

One set of materials, no branching inside the guides, and it stays correct as the class drifts further remote.

### 4. Journal

Session 3's tab is restructured to the five-job spine in both locales and the workbook is rebuilt. Sessions 2 and 4 to 7 tabs are unchanged.

## Out of scope

Session 2's content, which has been taught and worked — only its page split. No content rewrite of sessions 4 to 7 beyond remote-aware phrasing and card links.

## Constraints to preserve

- The session 3 title `לבנות תוכנית משותפת שעובדת` is asserted by `check-personal-seven-sessions.mjs` and shared with the portal. It still fits and does not change.
- Brief headings `## תרחיש`, `## מהלך`, `## תוצר משולב`, `## משאבים אופציונליים` are asserted.
- No markdown line in `personal-course` may end in a semicolon.
- Hebrew tables in the workbook keep `w:bidiVisual`, no `w:jc="right"`, `w:rtl` runs, and the twip column grid.

## Verification

All 14 check and validate scripts pass. Every relative link across the session files resolves and fetches 200 through `document.html`. Hebrew RTL confirmed by computed style. No Hebrew left in English artefacts and no Hebrew-Latin character corruption.
