# Full session plan — Session 5: Virtual to Physical — AI Outside the Computer

**Time:** 90 minutes
**Learning outcome:** Learners see five ways AI shows something that does not exist yet — from a hat on your face to an object you can hold — and after each one ask the same question: what does it cost if it is wrong here.
**Session artifact:** Five demonstrations on screen, ending with a real physical object in hand. Learners leave with an answer to "how much checking does this kind of promise deserve".

**This session runs 90 minutes.** The first two blocks are easy and enjoyable on purpose — they buy attention cheaply. The last three are where real money goes on the table.

## The central idea — say it in the opening

The whole session is one thing: **AI showing you something that does not exist yet.**

The hat is not on your head. The sofa is not in the room. The cabinet is not built. The table is not cut. The object is not printed. In every one of these the tool produces a picture of a future, and you have to decide how far to trust it.

**And that decision turns on one thing: what it costs if it is wrong.**

| The demo | What being wrong costs | How much checking it deserves |
|---|---|---|
| Hat and glasses | Nothing. Delete and try again | None. Enjoy it |
| The living room | A return, delivery, a week | One dimension, before buying |
| The pantry cabinet | Plywood and a weekend | A source for every dimension |
| The dinner table | A table nobody can sit at | A number, not "sturdier" |
| A 3D print | Filament and four hours, discovered at hour three | Printable geometry, and tolerance |

**That question comes back after every block:** "What does it cost if it is wrong here?" It is the session's entire checking method, and it is deliberately not uniform — not everything deserves the same caution, and that is precisely what people do not know.

## Session materials

| Material | What it is for |
|---|---|
| [Projection slides](../../instructor/samples/session-05-slides.html) | Thirteen slides, in session order. |
| [Setup guide](../../sessions/session-05-setup.md) | **For homework, not the session.** For anyone who wants to run the design parts themselves. |
| [Windows setup file](../../instructor/samples/session-05-freecad-windows.ps1) | Homework material, for Route 2 on Windows. Installs FreeCAD, Claude Desktop and the MCP in one go, with no git and no terminal knowledge. Learners get it as `applied-ai-mastery.web.app/s5/windows`; the check file is `/s5/windows-check`. |
| [Example measurements](../../instructor/samples/session-05-measurements.html) | Homework material, for anyone with nothing to measure. |
| [OpenSCAD starter file](../../instructor/samples/session-05-organiser.scad) | Homework material. A parametric drawer organiser that runs immediately. |
| [Learning journal](../../../site/assets/downloads/applied-ai-mastery-personal-journal-en.docx) | The dimensions table, the proposal table and the fit-check table. |

## What changed in this session

The session used to open on measuring and three installation tracks, and reached parametric design through a drawer organiser. Two problems: it was the heaviest opening in the course, and the tracks spent expensive minutes on installs nobody needs in a demonstrated session.

From now it opens with **two image demonstrations** that take two seconds to understand and produce genuine delight, and climbs from there to where a mistake costs money. **The measuring lesson has not gone** — it moved to the pantry cabinet block, where it finally hurts.

**Installation moved to homework.** Nobody installs anything for the session. Anyone who wants to build for themselves during the week gets the [setup guide](../../sessions/session-05-setup.md) and picks one track.

## The way it runs: everything on your screen

**This session is demonstrated, not worked through.** You do every step on your own screen while learners watch, guess and argue.

Two blocks here are **showing something that already exists** rather than building live — the pantry cabinet and the prints. Say so out loud: "We are not building this now, it took me real time. I am showing you the end of a process — then we will do one together, smaller." It is honest, it saves twenty minutes, and it lowers the expectation that everything happens in one click.

### What to ask before every request

- "What do you think it will come back with?" One or two guesses before it answers.
- "What does it need to know that I have not told it?" Here it is almost always a dimension.

### What to ask after every request

- **"What does it cost if it is wrong here?"** The session's question.
- "What in this picture did it invent?" There is always something.

## Before learners arrive

1. Open the [slides](../../instructor/samples/session-05-slides.html) for screen sharing.
2. **A photo of yourself**, face clear, decent light, ready to upload. Plus **a photo of one hat and a photo of one pair of glasses** from a shop listing. Those are the two halves of block 1.
3. **A photo of a room in your home**, shot from the corner so floor and walls are visible, and **two or three furniture photos** from shop listings — with their dimensions available.
4. **The pantry cabinet files open in a tab**: both the design and the interior arrangement. You are presenting them, not building.
5. **FreeCAD or OpenSCAD open and working**, with Antigravity or Claude Code connected — this is the only place a technical fault stops you.
6. **Your prints on the desk**, within reach. A few that came out well, and at least one that failed.
7. **Run the table block once by yourself beforehand.** Not to prepare a result, but to know how long each request takes on your machine.

### What learners need

- A device, and nothing else. No installs and no accounts.
- One object or space of their own in mind, for the homework.

## Session map

| Time | What happens | What being wrong costs |
|---:|---|---|
| 0–10 | **Homework discussion** | — |
| 10–16 | Opening: seeing things before they exist | — |
| 16–30 | **Your face** — hats and glasses, two ways | Nothing |
| 30–44 | **The room** — your photo and furniture photos | A return and a week |
| 44–56 | **The pantry cabinet** — build and arrangement, presented | Plywood and a weekend |
| 56–76 | **The dinner table** — designed together, sturdier and bigger | A table that does not work |
| 76–86 | **It becomes an object** — your prints | Filament and four hours |
| 86–90 | Closing | — |

## 0–10 minutes — homework discussion

**Start here in every session from the second onward.** A learner who hears where somebody else got stuck learns faster than from a lesson.

Ask the three: what worked, what did not, and what surprised you. Write two things that come up on screen, and come back to them today by the name of whoever raised them.

> "Before we start — what happened for you since? Especially what did not work. I learn more from that than you do."

## 10–16 minutes — opening

Show [slide 1](../../instructor/samples/session-05-slides.html): today the AI leaves the screen.

Then [slide 2](../../instructor/samples/session-05-slides.html) — the cost ladder. Today's five demonstrations, ordered by what a mistake costs in each. **Do not skip this slide** — it is the frame everything else hangs on, and it is what stops the session looking like a gallery of tricks.

> "Everyone knows AI 'can be wrong'. That is not useful. The useful question is what it costs when it is wrong — because on a hat you check nothing, and on a cabinet you check every number. We are going through these five from cheapest to most expensive."

## 16–30 minutes — your face

The easy block, and it is meant to be fun. Let it be fun.

### Two ways, and not the same way

Show [slide 3](../../instructor/samples/session-05-slides.html). The difference between the two requests is the heart of the block.

**Way one — it invents the hat.** Upload your photo and ask:

> Here is a photo of me. Show me in four different hats and four different pairs of glasses, each combination as a separate image. Keep my face exactly as it is.

**Way two — you give it the hat.** Upload your photo, the hat photo and the glasses photo, and ask:

> Three images: me, a hat, and glasses. Put this hat and these glasses on me — **exactly these, not something like them.** Keep the products' colour, shape and proportions, and keep my face.

### What to show when the results come back

Show [slide 4](../../instructor/samples/session-05-slides.html) and put two questions to the room:

1. **"Is that still my face?"** This is the common failure in way one — it smooths the face, straightens it, takes five years off. Ask the room whether they can see it, because not everyone can.
2. **"Is that the hat I gave it?"** This is way two's failure — it takes the *idea* of the hat rather than the hat. Shift the colour slightly, the shape slightly, and it is a different product.

> "Notice those are two completely different failures. In one it changed me, in the other it changed the product. Anyone buying from that picture needs to know which of the two happened."

### What it costs if it is wrong

**Nothing.** Say so explicitly, because that is the other half of the lesson:

> "Here I check nothing. I delete it and try again, and it cost me ten seconds. Not everything requires caution — which is exactly why it matters to know when it does."

### Two words on privacy

Your face, not other people's, and certainly not children's. Say it out loud — it takes six seconds and people will take it with them.

## 30–44 minutes — the room

This is where it gets interesting, because here **the picture persuades and the number is the truth, and they disagree.**

### The request

Show [slide 5](../../instructor/samples/session-05-slides.html). Upload the room photo and the furniture photos:

> This is a photo of my living room. These are a sofa, a rug and a lamp from shop listings. Show me how the room would look with all three, from the same camera angle.

It will come back nicely. Give the room a second to enjoy it, then break it.

### The moment that matters — a picture does not measure

Show [slide 6](../../instructor/samples/session-05-slides.html) and ask: **"Does that sofa fit?"**

The tool composited by **appearance**, not by **dimension**. It will shrink a sofa that does not fit until it looks right in the picture, and the result is completely convincing and wrong.

Now ask it separately, in text:

> This wall is 3.2 metres, with an 80 cm door at one end. The sofa I gave you is 2.4 metres. Tell me in numbers what is left, and do not show me a picture.

**That separation is what you are teaching:** "show me" and "does it fit" are two different requests, and only one of them returns a number.

> "The picture is a visualisation. The number is an answer. Ask only for the first and you get a beautiful piece of furniture that will not come through the door."

### What it costs if it is wrong

A return, delivery fees, and a week with no sofa. **One dimension before buying cancels all of it.**

## 44–56 minutes — the pantry cabinet

**This block is presented, not built.** Say so immediately.

> "I already designed this cabinet, and it took longer than the time we have. I am showing you the end — and then we will do one together, smaller."

### What to show, and in what order

Show [slide 7](../../instructor/samples/session-05-slides.html) and then your own files, in two parts:

1. **The build** — panels, joins, the cut list. This is what goes to the saw.
2. **The arrangement** — what goes where inside. This decides whether the cabinet is useful or merely exists.

The second part is the surprise for most people. A cabinet built right and arranged badly is a bad cabinet.

### This is where the measuring lesson lands

Show [slide 8](../../instructor/samples/session-05-slides.html) — the four sources of a number:

**Measured** (I went with a tape) · **Spec** (written on the product page) · **Assumed** (I assumed it) · **Derived** (calculated from two others)

Walk three real dimensions from your design and say which kind each one is. **At least one should be an assumption** — if you have none, you did not look hard enough.

> "The question is not 'is the number right'. The question is 'where did it come from'. A measured number and an invented number look identical in the file, and differ by a sheet of plywood."

**Tell them what it got wrong the first time.** This is the most valuable part of the block. A panel thickness it assumed, a clearance it did not leave, a door that opens into a wall.

### What it costs if it is wrong

Plywood, a weekend, and a board already cut. **A cut does not undo.**

## 56–76 minutes — the dinner table

**The long block, and the only one built live.** It is also where learners watch design happen in conversation.

### The numbers first, from the room

Do not start with the tool. Ask the room four questions and write them on screen:

1. **How many people?**
2. **How much room is there?** Length and width.
3. **What height?** Have the answer ready: 75 cm is standard, and ask why.
4. **What is it standing on?** Four legs at the corners, or a central pedestal.

> "Notice I have not touched the tool yet. Those four questions are the difference between a table that suits the room and a generic table."

### The first request

Show [slide 9](../../instructor/samples/session-05-slides.html) and ask for a parametric model with the real numbers, in FreeCAD or OpenSCAD through Antigravity or Claude Code.

**It matters that it is parametric** — the dimensions live as variables at the top of the file, not scattered through the code as numbers. That is what makes the next two iterations possible.

### Iteration 1 — "make it sturdier"

Show [slide 10](../../instructor/samples/session-05-slides.html). This is the most important request in the session, because it is **deliberately bad.**

Give it exactly like that and see what comes back. It will thicken legs, or add bracing, or simply say it did. **"Sturdier" is not a number, so the answer is not one either.**

Now ask the room: **"What did I actually ask for?"** Let two or three answer. The answers that come up will be: that it should not wobble, that it should not sag in the middle, that it should hold somebody sitting on it.

Then rewrite it in front of the class:

> The table wobbles sideways. Add a horizontal stretcher between the legs and increase the leg section to 8 by 8 cm. Tell me which parameters you changed and what the previous values were.

> "That is the whole difference. The first request was a feeling, the second was a dimension. Feelings get answers that look good; dimensions get answers you can check."

### Iteration 2 — "make it bigger", and what breaks

Show [slide 11](../../instructor/samples/session-05-slides.html). **Before you send it, ask the room to predict:** "If we extend the table by 40 cm — what breaks?"

The answer you are after: **the span between the legs grows, and the top starts to sag in the middle.** Making something bigger is not one number growing, it is a chain.

> "Notice what happened. I changed one parameter, and two others became wrong without anybody telling me. That is why it is worth having the model be parametric — when everything is connected, you can ask 'and what did that do to the rest'."

**Say the number out loud before you change it.** That is the habit people take home from this session.

### What it costs if it is wrong

A table that wobbles while you eat at it, or does not fit the room. And timber already cut.

## 76–86 minutes — it becomes a real object

**The ending, and it is physical.** Hold your prints up to the camera.

Show [slide 12](../../instructor/samples/session-05-slides.html), then show the objects themselves. This is the moment the session's title becomes something you can hold.

### What to say about each object

- **What it is, and why you printed it** rather than buying it.
- **How long it took.** People have no idea. Four hours for a small object surprises them.
- **What AI did here and what it did not.** It designed the shape. It did not measure the shelf, choose the material, or know that your printer warps corners.

### The failed print — do not skip it

**This is the most instructive part of the block.** Show one that came out badly and explain why:

- **Tolerance** — a hole of "exactly 10 mm" will not take a 10 mm rod. It needs 10.4. This is failure number one, and it is completely invisible in the file.
- **Unprintable geometry** — a 0.4 mm wall, an overhang needing supports, a part floating in mid-air.
- **Print orientation** — the very same object, rotated, either snaps or holds.

> "The model was perfect on screen. Physics did not read the file. That is the moment 'virtual' ends and 'physical' begins, and that is the whole session in one object."

### What it costs if it is wrong

Filament and four hours — **and you find out at hour three.**

## 86–90 minutes — closing

[Slide 13](../../instructor/samples/session-05-slides.html) for the exit check:

> What surprised me most was **[what]**. What I would not have checked and now will is **[what]**, because being wrong there costs me **[how much]**.

### The homework — say it out loud

"Pick **one thing** you want to exist — an object, a corner of your home, a piece of furniture. Run whichever of today's demonstrations suits it. Anyone who wants to get as far as a model, the [setup guide](../../sessions/session-05-setup.md) is waiting, and one track is enough. **I will open by asking what did not work.**"

### Quick rubric

| Evidence | Not yet | Ready |
|---|---|---|
| Picture versus number | "That looks about right" | Asked "does it fit?" separately and got a number |
| A dimension's source | "It is 60 cm" | "60, measured" or "60, assumed" |
| A change request | "Make it sturdier" | "Leg section 8 by 8, and a stretcher" |
| Prediction | Changed it and saw what happened | Said what would happen, then changed it |
| File to object | "The model is ready" | Tolerance, print orientation, wall thickness |

## Handling problems without losing the session

| Situation | Facilitator response |
|---|---|
| The tool refuses to edit a photo of a face | Use only your own photo, and phrase it "edit this photo". If it still refuses, move to way two and say what happened. |
| The image comes back with a completely different face | That is the finding, not a fault. Show it and carry on. |
| The room composite looks distorted | Also a finding. Go straight on to the "does it fit?" question. |
| FreeCAD or OpenSCAD is unresponsive | Fall back to OpenSCAD alone with code from the chat. Almost nothing breaks there. |
| The model takes too long to build | Ask for a simpler version: a top, four legs, a stretcher. The iterations matter more than the model. |
| Time runs out | Drop iteration 2 of the table. **Not the prints** — the physical ending is the entire title. |
| Everything runs faster than expected | Take a second failed print and explain that one too. It is always interesting. |

## Adapting for different learners

- **Remote:** the session is designed for it. For the prints, hold them close to the camera and turn them slowly.
- **No device:** no gap. Everything is projected.
- **For anyone who wants to run it themselves:** the setup guide, one track, during the week rather than now.
- **For anyone ready to go further:** take the table from the session and get a real cut list out of it, including waste.

## After the session

Write down three things: which demonstration drew the strongest reaction, which question came up more than once, **and how long the table block actually took.** It is the only live block here, and its timing is the thing most likely to move next time.
