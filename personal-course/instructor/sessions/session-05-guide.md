# Full session plan — Session 5: Make a Space Work Better

**Time:** 90 minutes
**Learning outcome:** Learners label where every dimension came from, describe an object to an AI and get a parametric 3D model, change one parameter having predicted the result, and check the outcome against the physical world.
**Session artifact:** A design sheet with a dimension table and sources, the model file or code, a parameter changed with a prediction, and a physical-check result.

**This session runs 90 minutes.** The extra time is questions, and they are heaviest here — this is the session where people discover you can talk to CAD software.

## Send a week ahead — the setup guide

**This is the only session in the course with real installation.** Send the [setup guide](../../sessions/session-05-setup.md) a week before, not two days.

> Session 5 needs some installation. Work through the setup guide and pick **one route only**. The free route — OpenSCAD alone — is enough for the whole session, with no account and no payment. If you want to watch a model change as you talk to it, take route 2. Do not try to install everything. Every step in the guide ends with a check — if it fails, drop one route, and that is completely fine.

**Test all three routes yourself in the week before.** This is the most fragile session in the course, and almost every failure is installation rather than design.

## Session materials

| Material | What it is for |
|---|---|
| [Projection slides](../../instructor/samples/session-05-slides.html) | Ten slides, in session order. |
| [Setup guide](../../sessions/session-05-setup.md) | Send a week ahead. Three routes, with a check at every step. |
| [OpenSCAD starter](../../instructor/samples/session-05-organiser.scad) | A parametric drawer organiser that runs immediately. The basis for the demonstration. |
| [Sample measurements](../../instructor/samples/session-05-measurements.html) | A measured drawer with one planted assumption, for anyone with nothing to measure. |
| [Learning journal](../../../site/assets/downloads/applied-ai-mastery-personal-journal-en.docx) | The dimension table, the proposal table, and the fit-check table. |

## The three routes — and what they share

| Route | Tools | What the learner does |
|---|---|---|
| **1 — Free** | OpenSCAD + any AI chat | Asks for code, pastes it, presses F5, sees a model |
| **2 — Visual** | FreeCAD + the MCP + Claude Desktop | Talks, and watches the model being built |
| **3 — Advanced** | Claude Code or Antigravity | Drives both from an editor or a terminal |

**What they share — and this is what gets assessed:** measurement with a source for every number, a prediction before changing a parameter, and a physical check in cardboard. Anyone on route 1 is missing none of the learning. Say that out loud at the start, or whoever failed to install will feel excluded.

## The recommended way: your own real object, on your screen

**Take something you genuinely want to exist and design it live in front of the class.** The demonstration runs on your machine, and here there is an extra reason: the advanced routes need installation that will not have worked for everyone, and when the demonstration is yours, nobody is blocked.

**Before every request** ask: "Which dimension will it need that I have not given it?"
**When the model comes back**, hunt for the number it invented — there is always one — and ask "where is that from?"
**After each stage**, two minutes for them to fill in the journal for their own object.

## Start slow things in the background

Rendering a complex model takes time, and so does asking an AI to write a long piece of code. **Send it and keep talking.** At minute 40, when you ask for a variation or a second model, do not stand watching the screen — move on to discussing the physical check while it runs.

## Session map

| Time | What happens | What learners produce |
|---:|---|---|
| 0–10 | **Homework discussion** | What broke for other people |
| 10–15 | Readiness check: who is on which route | Everyone knows where they are, nobody is stuck |
| 15–30 | Measure, and label every number's source | The difference between measured, spec, assumed, calculated |
| 30–55 | Describe it to the AI, and it builds | A parametric model, and a list of what it invented |
| 55–70 | Change one parameter, after predicting | Whether the model behaves as expected |
| 70–85 | Physical check in cardboard | One assumption proved wrong |
| 85–90 | Exit check, decision, and homework | What next, and what to check first |

## 0–10 minutes — Homework discussion

Three questions: **Who managed it? Who did it not work for, and where did it stick? What surprised you?**

## 10–15 minutes — Readiness check

**Do not skip this, and do not let it expand.** Five minutes, no more.

Ask in the chat or by show of hands: "Who is on route 1? Route 2? Route 3? Who has nothing working?"

- Nothing working → route 1, now. One download, and they will keep up.
- Stuck on route 2 → drop to route 1 for today, and you help them afterwards.

### What to say

> "The tools differ, the thinking is identical. Anyone on OpenSCAD alone does exactly the same exercise and checks exactly the same cardboard at the end. We are not learning software today — we are learning how to give an AI real numbers and how to check what it gave back."

### The failure everyone hits

If someone on route 2 says "it will not connect" or shows `Connection refused` — almost always **FreeCAD is not open, or its internal server was never started.** The MCP server alone is not enough. That resolves most cases in ten seconds.

## 15–30 minutes — Measuring

Show [slide 2](../../instructor/samples/session-05-slides.html) with the four labels: **measured**, **spec**, **assumed**, **calculated**.

Measure a real object in front of the class and record it with its label. Anyone with nothing to measure works from the [sample measurements](../../instructor/samples/session-05-measurements.html).

### The moment that matters

Show [slide 3](../../instructor/samples/session-05-slides.html) — the planted assumption: "the drawer opens fully", which nobody measured. If the runners stop at 80 per cent, usable depth is 33.6 cm rather than 42.

### What to say

> "This is the part the AI cannot do. It has not seen the room. It will invent a dimension that looks reasonable, with total confidence, and it will look exactly like a measurement."

**Two minutes in the journal.**

## 30–55 minutes — Describe it, and the AI builds

The long block. Show the request on [slide 5](../../instructor/samples/session-05-slides.html) and run it on your route.

### Expected intermediate output

**Route 1:** OpenSCAD code that runs and produces a shape. **Routes 2–3:** a solid appearing in FreeCAD.

### The moment that matters: what it invented

Once the model exists, ask the tool explicitly:

> Which dimensions did you use that I did not give you? List each one, and what you assumed about it.

It will produce a list: wall thickness, clearances, heights, fillet radii. **None of them is necessarily wrong — they simply were not measured.** This is exactly the "assumption that looks like a measurement" lesson, now inside geometry.

### If the output is weak

- **The code does not run.** Good, and it happens. Paste the error straight back into the tool — that is the thing being learned.
- **It built something handsome that ignores your measurements.** Point at it. A model not derived from the measurements is decoration.
- **It declared the design strong or safe.** Remind them it cannot know that, and remove the claim.

**Two minutes in the journal.**

## 55–70 minutes — One parameter, with a prediction

Show [slide 6](../../instructor/samples/session-05-slides.html). Before changing anything, everyone writes what **should** happen.

In the starter file: `compartments` from 5 to 7. Each compartment should drop from 68.7 mm to 48.4 mm. Change it, press F5, and check whether that is what happened.

### What to say

> "If your prediction did not match, you did not understand the model. Better to find that out now, on screen, than after a three-hour print."

## 70–85 minutes — The physical check

**The part not to skip.** Show [slide 7](../../instructor/samples/session-05-slides.html).

Cut cardboard to the model's dimensions, put it in place, and try to use it normally. The three checks: it fits the width, something comes out one-handed, and the drawer still closes.

### What to say

> "The model looks perfect on screen because it is perfect — in a world with no dust, no warped panel, and no runner that stops at 80 per cent. The cardboard is the only thing here that touches reality."

## 85–90 minutes — Exit

[Slide 10](../../instructor/samples/session-05-slides.html):

> My design rests on **[number]** measured dimensions and **[number]** assumptions — including **[number]** the AI invented. The physical check revealed that **[what]**, so I changed **[what]**.

### The homework

"Change one more parameter in your model and predict the result first. **I will ask at the start what did not work** — especially if the installation broke."

### Quick assessment rubric

| Evidence | Not yet | Ready |
|---|---|---|
| Dimensions | A list of numbers | Every number carries a source label |
| What the AI invented | Never asked | Asked explicitly, and has the list |
| Parameter | "I changed something" | A prediction written first, then checked |
| Physical check | "It'll fit" | Cardboard cut, placed, and the result recorded |

## Troubleshoot without losing the lesson

| Situation | Facilitator response |
|---|---|
| `Connection refused` on route 2 | FreeCAD is not open, or its internal server was not started. Almost always this. |
| Someone's installation did not work | Route 1, now. One download, and it is enough. |
| The AI's code will not run | Paste the error back into it. That is part of the lesson. |
| A handsome model that ignores the measurements | "Where did that number come from?" Return to the measurements. |
| Someone wants to design something load-bearing | Stop and explain the limit. Offer an organiser. |
| Time runs out | Drop the parameter change. Not the physical check. |

## Differentiation

- **Remote:** An advantage here — learners are at home, beside the object they are measuring.
- **No installation at all:** Paper and a ruler. The same table, the same physical check, the same rubric.
- **For learners ready to extend:** Ask the tool to add a parameter that did not exist, and see what breaks.

## After the session

Note how many learners finished on each route, and which installation broke most often — that is what you fix in the setup guide before next time. If anyone printed what they designed, ask them to bring it next session: an object built after a cardboard test is the best evidence the method works.
