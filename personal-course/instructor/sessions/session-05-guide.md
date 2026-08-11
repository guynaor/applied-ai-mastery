# Full session plan — Session 5: Make a Space Work Better

**Time:** 55–60 minutes
**Learning outcome:** Learners label where every dimension came from, tell a measurement from an assumption, and test physical fit in cardboard before buying or building anything.
**Session artifact:** One design sheet: a dimension table with a source for every number, clearances, an adjustable parameter, the cardboard-test result, and a sentence on what the design is not suitable for.

This guide can be taught from directly. No design or 3D-printing knowledge is needed. This session is about measuring, assumptions, and physical testing — exactly the parts no tool will do for you, because it has not seen the room.

## Session materials

| Material | What it is for |
|---|---|
| [Projection slides](../../instructor/samples/session-05-slides.html) | Ten slides, in session order. |
| [Sample measurements](../../instructor/samples/session-05-measurements.html) | A measured drawer with objects, clearances, and one planted assumption — for anyone with nothing to measure. |
| [Learning journal](../../../site/assets/downloads/applied-ai-mastery-personal-journal-en.docx) | Downloadable Word file with the dimension table, the proposal table, and the fit-check table. |
| [Session 5 brief](../../sessions/session-05-design-physical-project.md) | What learners see. |

## Before learners arrive

### Prepare the room and tools

1. **Bring real objects.** A small box, a ruler or tape measure, scissors, and a sheet of cardboard for each pair. This is the one session in the course where hands do the important work.
2. Open the [sample measurements](../../instructor/samples/session-05-measurements.html). Not every learner will have something to measure in the room, and this gives them a complete drawer to work with.
3. Open the [slides](../../instructor/samples/session-05-slides.html) and a chat tool in the facilitator account.
4. If there is a real object in the room that can be measured — a cupboard, a drawer, a shelf — it beats any sample.

### What learners need

- One small corner they know and find annoying. If they are not at home, they can work from memory and label everything as an assumption — which is a lesson in itself.
- A ruler or tape measure, paper, and cardboard.
- A device with one AI tool is optional. The whole session works without it.

### Two facilitator decisions before starting

**How much time to give to hands.** The cardboard test is the heart, and learners always discover something in it. Do not let the measuring stage or the tool stage eat into it. If something has to be cut short, it is the tool stage.

**Whether to use an AI tool at all.** It is useful for organising the specification and spotting missing dimensions. It is entirely useless on the question of whether something fits. Say so up front, or somebody will trust a drawing.

## Session map

| Time | What the facilitator does | What learners produce or identify |
|---:|---|---|
| 0–5 | Opening: which corner annoys you daily | One real corner |
| 5–17 | Measure, and label every number's source | The difference between measured, spec, assumed, calculated |
| 17–29 | Clearances, material, one adjustable parameter | Constraints written down rather than assumed |
| 29–44 | One proposal, and a parameter change with a prediction | Whether the model behaves as expected |
| 44–54 | Full-size cardboard test | One assumption proved wrong |
| 54–60 | Exit check and reflection | A design sheet you could build from |

## 0–5 minutes — Opening

Show [slide 1](../../instructor/samples/session-05-slides.html): “Which one corner of your home annoys you daily, but never quite enough to fix?”

### What to say

> “Today we design one small fix — and test it in cardboard before spending anything. Most failures in projects like this are not design failures. They are one dimension nobody checked.”

## 5–17 minutes — Measure, and label the source

Show [slide 2](../../instructor/samples/session-05-slides.html) with the four labels: **measured**, **spec**, **assumed**, **calculated**.

Measure a real object in front of the class and record it with its label. Then let learners measure their own, or work from the [sample measurements](../../instructor/samples/session-05-measurements.html).

### The moment that matters: the planted assumption

The sample says “the drawer opens fully — assumed”. Show [slide 3](../../instructor/samples/session-05-slides.html) and ask what happens if that assumption is wrong.

The answer: cheap runners stop at 80 per cent, so the usable depth is 33.6 cm rather than 42. Any organiser designed for the full depth will be out of reach at the back.

### What to say

> “Assumptions are not the problem. You cannot measure everything. The problem is an assumption written in the same table, in the same pencil, looking exactly like a measurement.”

### If a learner cannot measure right now

Good — have them write the dimensions from memory and label every one “assumed”. At the end they will be looking at a sheet that is entirely assumptions, which demonstrates the point better than any explanation.

## 17–29 minutes — Constraints and clearances

Show [slide 4](../../instructor/samples/session-05-slides.html) and the three forgotten clearances: room for a finger, the gap above, and the wall thickness eating into the internal dimension.

Each learner picks **one parameter** that can change — number of compartments, divider height, compartment width.

## 29–44 minutes — Proposal, and a parameter change

Show the request on [slide 5](../../instructor/samples/session-05-slides.html) and run it with the measurements on screen.

### Expected intermediate output

A specification that separates measurements, assumptions, and clearances, and flags missing dimensions. If the tool returned numbers you never gave it, that is the important finding of this stage.

### The moment that matters: predict before changing

Show [slide 6](../../instructor/samples/session-05-slides.html). Before changing the parameter, each learner writes what **should** happen. Then change it and check.

### What to say

> “If your prediction did not match what happened, you did not understand the model. Better to find that out now, on screen, than after a three-hour print.”

### If the output is weak

- **The tool invented dimensions.** Point at them and ask “where did that come from?” This is the moment to show it has not seen the room.
- **It declared the design safe.** Remind them the request forbade that, and re-run.
- **It gave a nice drawing with no numbers.** Ask for a dimension table. A drawing is not a specification.

## 44–54 minutes — The cardboard test

This is the part not to skip. Show [slide 7](../../instructor/samples/session-05-slides.html).

Cut at the real size, pencil the compartments in, put it in place — and use it as you would on an ordinary day. The three checks: that it fits the width, that something comes out one-handed, and that the drawer still closes.

### What to say

> “The cardboard is the only thing here that touches reality. A convincing sketch is not proof that something fits — a neat render looks right even when one dimension is wrong.”

Circulate and ask: “Which dimension surprised you?” and “What would you have bought just now, if you had not checked?”

## 54–60 minutes — Exit check and reflection

Show [slide 10](../../instructor/samples/session-05-slides.html):

> My design rests on **[number]** measured dimensions and **[number]** assumptions. The most dangerous assumption is **[which]**. The cardboard test revealed that **[what]**, so I changed **[what]**.

Reflection question: “Which dimension were you certain of — until you measured it?”

### Quick assessment rubric

| Evidence | Not yet | Ready |
|---|---|---|
| Dimensions | A list of numbers | Every number carries a source label |
| Assumptions | Unmarked | Marked, with one identified as the most dangerous |
| Parameter | “Things could change” | One parameter, with a prediction that was checked |
| Physical test | “It'll fit” | Cardboard cut, placed, and the result recorded |

## Equivalent tool routes

**No tool (a full route):** A ruler, paper, and cardboard. This is the main route, not a fallback.
**Gemini / Claude / ChatGPT:** Exactly the same request, for organising the specification and spotting missing dimensions.
**Anyone already comfortable with 3D:** Open a parametric file and change a parameter in it, but the cardboard test remains compulsory.

## Troubleshoot without losing the lesson

| Situation | Facilitator response |
|---|---|
| Nothing to measure in the room | Switch to the sample measurements, or measure something that is in the room. |
| A learner picks too large a project | “A new wardrobe” is not a project for today. Narrow to one shelf inside it. |
| Someone wants to design something load-bearing | Stop and explain the limit. Offer an organiser instead. |
| The tool declares the design safe | Show the sentence, remind them it has not seen the object, and remove the claim. |
| The cardboard shows the design does not fit | That is the best outcome in the session. Record it and change one dimension. |
| Time runs out | Drop the tool stage, not the cardboard test. |

## Differentiation

- **No device:** The whole session works with a ruler and paper. There is no gap here.
- **For learners who need structure:** Give them the sample measurements and ask them to design only the compartment layout.
- **For learners ready to extend:** Ask them to work out what happens to the design if wall thickness grows from 2 mm to 4 mm.
- **Motor or vision difficulty:** Measure in pairs, and note that full-size cardboard helps more than any drawing.

## After the session

Note which assumption turned out wrong for the most learners — it will probably recur, and is worth promoting into slide 3. If someone actually built what they designed, ask them to bring it next session: an object built after a cardboard test is the best evidence the method works.
