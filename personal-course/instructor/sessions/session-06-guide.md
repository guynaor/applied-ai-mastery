# Full session plan — Session 6: From Prompt to Presentation

**Time:** 90 minutes
**Learning outcome:** Learners generate an image and repair it, animate their own image and generate a second clip from words alone, write a narration script for the ear and record it, and assemble the same deck through two different tools — labelling every generated piece and never presenting a convincing clip as a record of something real.
**Session artifact:** One production set: the generated image, its fixed version, the animated clip, the text-generated clip, the narration, and a deck built two ways — with a visible label on every generated piece.

**This session runs 90 minutes, not 60.** The extra time is not overrun — it is questions, and that is where the learning happens.

This guide can be taught from directly. The whole chain runs on free accounts — Google, Claude, and Canva — and learners do not have to publish anything at the end.

## Session materials

| Material | What it is for |
|---|---|
| [Projection slides](../../instructor/samples/session-06-slides.html) | Eleven slides, in session order. |
| [Toolkit reference](../../instructor/samples/session-06-toolkit.html) | Free-tier notes by tool, the image-prompt anatomy, and the narration script pattern. Open it while prepping and keep it open during the session. |
| [Sample asset set](../../instructor/samples/session-06-asset-set.html) | Two examples for the opening, and a fallback: item 4, a generated image passed off as a record, and item 6, a real photograph with a wrong caption. |
| [The answers](../../instructor/samples/session-06-answers.html) | A separate page, so an AI tool reading the asset set does not also receive the answers. **Do not open before you've walked both examples with the class.** |
| [Learning journal](../../../site/assets/downloads/applied-ai-mastery-personal-journal-en.docx) | Downloadable Word file with the production plan, the stage log, and the tool verdict table. |
| [Session 6 brief](../../sessions/session-06-trustworthy-visual-story.md) | What learners see. |

## The recommended way: your own subject, on your screen

What works best is to **pick one real subject of your own and run the whole six-stage chain live in front of the class, on your own screen.** Three reasons: learners' free accounts run out mid-chain; a real subject produces real questions; and they watch you fix a bad generation in front of them, which teaches more than any explanation would.

Learners fill in the journal tables for **their own subject**. You run the chain; they think.

**Before every generation**, ask: "What do you expect back?" and "What's missing from this prompt?"
**When the output returns**, name the first thing that's wrong with it out loud, and fix that one thing in front of them.
**After each stage**, give two minutes for the journal. A session where only you generated something is a demonstration, not a lesson.

The two sample items — item 4 and item 6 from the asset set — stay as backup: for a class with no network, when you have no subject of your own, or for a facilitator who wants a guaranteed script.

## Start slow things in the background

Video generation is slow, and stage 4's clip has to be ready by the time the class reaches the video block. **Send the stage-4 request the moment stage 3 begins** — while learners are animating their own image, start the text-only clip generating in the background on your machine — and keep teaching. Come back to it at minute 46.

## Before learners arrive

### Prepare the room and tools

1. Open the [toolkit reference](../../instructor/samples/session-06-toolkit.html) and correct anything that's moved since it was written — free-tier terms change faster than this guide does.
2. Open the [sample asset set](../../instructor/samples/session-06-asset-set.html). The answers are on a [separate page](../../instructor/samples/session-06-answers.html) — do not open it early, and it is separate so that an AI tool reading the asset set does not also receive the answers.
3. Open the [slides](../../instructor/samples/session-06-slides.html), and sign into Google, Claude, and Canva in the facilitator account. Sign into ChatGPT too if you plan to run the stage-1 comparison.
4. **Run the demo on a desktop, not a laptop.** Video generation is render-heavy, and a session built around it drags badly on underpowered hardware.

### What learners need

- Three free accounts, set up before the day: Google, Claude, and Canva. ChatGPT is optional, a fourth.
- One real subject they want to carry through the chain — a place, a creature, an object, a small scene.
- A device with a browser. That is enough for the whole session.

### Two facilitator decisions before starting

**Your own subject, or the sample items.** The chain runs either way, but a subject you're actually building live produces better questions than a prepared one. If you fall back to the sample items, open them only for the two-item opening — don't run the whole chain on them.

**When to open the answers page.** Only after you've walked both opening examples with the class. Open it early and you've lost the discussion.

## Session map

| Time | What the facilitator does | What learners produce or identify |
|---:|---|---|
| 0–10 | **Homework discussion** | What worked and what broke for other people |
| 10–16 | Three rules, and two examples that earn them | The gap between a generated image passed off as a record, and a real photo with a wrong caption |
| 16–27 | Generate | A first image, from a prompt that names all five things a prompt has to say |
| 27–38 | Fix | The same image, one region repaired, labelled |
| 38–46 | Move | Their own image, animated |
| 46–56 | Video, then the safety callback | A second clip from text alone, and the honest answer about publishing either one |
| 56–65 | Narrate | A script written for the ear, recorded |
| 65–85 | Assemble, two routes | The same deck, built in Claude and in Canva |
| 85–90 | Exit check and reflection | A production set ready to review, or a list of what's missing |

## 0–10 minutes — Homework discussion

**Start here in every session from the second onwards.** It works well, and not because it is a check — because a learner who hears what broke for someone else learns faster than from a lesson.

Three questions, in this order:

1. **"Who managed to do something with what we talked about?"** Two or three tell it.
2. **"Who did it not work for, and where did it get stuck?"** This is the important one. If nobody answers, tell them about something that got stuck for you.
3. **"What surprised you?"** The best insights arrive here.

Note two things that came up, and return to them later in the session by the name of whoever raised them.

## 10–16 minutes — Three rules, and two examples that earn them

Show [slide 1](../../instructor/samples/session-06-slides.html): the three rules.

### What to say

> "Six stages from here. At every one of them, ask these three questions again — that repetition is the safety lesson, not a slide you see once and forget."

Show [slide 2](../../instructor/samples/session-06-slides.html): one subject, six stages, one artifact — the map of the chain they're about to run.

Open the [sample asset set](../../instructor/samples/session-06-asset-set.html) to **item 4**: a beautiful, generated garden image, captioned "this is how the garden looks now." That's a factual claim about a real place, supported by an image that isn't a record of it.

Then **item 6**: a completely real photograph — taken, not generated — but from a different garden, last July, captioned "this is what we grew."

### What to say

> "Notice the gap. In one, every pixel was invented. In the other, nothing was invented — and the deception is bigger, because it looks entirely credible. The most common deception here isn't the generated image. It's the real one with the wrong caption."

Don't resolve which is worse; hold both against rule three and move on. Slide 8 brings the class back to this exact question in about half an hour, on output they made themselves.

## 16–27 minutes — Generate

Show [slide 3](../../instructor/samples/session-06-slides.html) and [slide 4](../../instructor/samples/session-06-slides.html).

Learners write a prompt that names five things: subject, composition, light, framing, and what to exclude. Full detail, including the weak/strong prompt pair, is on the [toolkit page](../../instructor/samples/session-06-toolkit.html).

Run it in Gemini — that alone completes this stage in full. If a learner also has ChatGPT, they run the identical prompt there too and compare the two results. The comparison is the stage's real teaching point, not either tool — a Gemini-only learner isn't missing anything assessed.

### If the output is weak

- **It's generic.** Read the five-part list back against their prompt — usually one part was never said.
- **It added something they didn't ask for.** Point at it. The model filled a gap they left open; that's the lesson, not a bug.
- **They're stuck comparing Gemini and ChatGPT and can't decide which is "better."** They're not supposed to decide — they're supposed to notice what each one did with the same words.

## 27–38 minutes — Fix

Show [slide 5](../../instructor/samples/session-06-slides.html).

### What to say

> "Same tool as stage 1. Aim the edit at the patch that failed, not at the picture again from nothing."

Same tool as stage 1. Learners edit the specific region that's wrong — they don't throw the prompt away and regenerate from nothing. Re-rolling destroys whatever already worked. Once it's fixed, they label it before moving on — that label rides with this image for the rest of the chain.

## 38–46 minutes — Move

Show [slide 6](../../instructor/samples/session-06-slides.html).

Learners upload the image they built and fixed into Gemini, and add a short prompt describing only the motion. The subject stays theirs; the prompt only tells it how to move.

**This is where you send the stage-4 background generation** (see "Start slow things in the background," above): kick it off now, keep teaching stage 3, and come back to it at minute 46.

## 46–56 minutes — Video, then the safety callback

Show [slide 7](../../instructor/samples/session-06-slides.html).

Same tool, this time a text prompt with nothing else behind it — nothing of the learner's survives into this clip. Watch for where it breaks: text, hands, continuity, physics. Send the job, then keep talking — it isn't instant.

Then show [slide 8](../../instructor/samples/session-06-slides.html), which closes this block on the class's own output. Put a learner's stage-3 clip and stage-4 clip side by side. Both are generated — nothing in this chain was shot with a camera. The real difference is how much they directed: stage 3 animates an image they built and fixed; stage 4 came from words alone.

Ask: "If you captioned either one 'this is this place,' right now — would that be true?"

### What to say

> "Neither one — not without a label. That's rule three. Say so out loud before anyone asks; that's rule one, applied to something you made ten minutes ago."

If someone pushes on which clip is "worse," don't resolve it — that's exactly the discussion this slide exists to run.

## 56–65 minutes — Narrate

Show [slide 9](../../instructor/samples/session-06-slides.html).

Learners write a short script for the ear, not the eye: short sentences, one idea per breath, numbers spoken rather than written. Full pattern on the [toolkit page](../../instructor/samples/session-06-toolkit.html).

They record it in Google AI Studio, Google's text-to-speech surface. *Only Gemini's video generation has been tested by the course author (2026-08-19) — this narration routing hasn't been separately confirmed, so check it works before you teach.*

### If the output is weak

- **A name comes out wrong.** A second take usually fixes it faster than fighting with the first one.
- **The script sounds fine on the page and wrong out loud.** Read it aloud yourself before recording — a sentence that needs a comma to survive needs to be split instead.

## 65–85 minutes — Assemble, two routes

Show [slide 10](../../instructor/samples/session-06-slides.html).

### What to say

> "The comparison is the lesson, not either tool. Notice what each route cost you, and what it gave back."

Learners build the same short deck twice: once with Claude, as a file they own and can keep editing, and once in Canva, for faster visual polish.

## 85–90 minutes — Exit check and reflection

Show [slide 11](../../instructor/samples/session-06-slides.html):

> My subject was **[what]**. It went through **[how many]** of the six stages. The stage I would cut if I only had an hour is **[which]**. The clip I would not publish about a real place is **[which]**, because **[why]**.

Reflection question: "Which stage surprised you — because the tool did better, or worse, than you expected?"

### Quick assessment rubric

| Evidence | Not yet | Ready |
|---|---|---|
| Labelling | "It's just the output" | Every generated piece is visibly labelled, in the caption itself |
| The safety callback | "I'd probably post the better one" | Neither clip is presented as a record without a label |
| Consent | "Nobody's in it" taken as enough | A real person's likeness only with consent, a child's only with a parent's |
| The two routes | Only one deck exists | Both the Claude file and the Canva deck exist, and the learner can say what each cost and gave back |

## Equivalent tool routes

**Gemini alone** completes stages 1 through 5 in full. Nothing assessed depends on a second tool.
**ChatGPT, at stages 1–2 only:** an optional second opinion for the comparison — never required, and never used past stage 2.
**Claude and Canva, at stage 6:** not a choice between them — both, so the comparison itself is the exercise.
**Sora:** a facilitator demo only, if you want to show what a paid tool produces. Never a learner task.
**Any other free video or image tool a learner already has:** check the [toolkit page](../../instructor/samples/session-06-toolkit.html)'s two traps before you let anyone route their final piece through it.

## Troubleshoot without losing the lesson

| Situation | Facilitator response |
|---|---|
| Someone used Runway and ran out mid-session | 125 lifetime credits, not monthly. Move them to Gemini and continue |
| Their export has a Kling watermark | Expected on that free tier. Note it, and use it as a labelling example |
| ChatGPT hit its image cap | Drop to Gemini. The comparison is lost for them, not the stage |
| A video generation has not returned | Move to the next stage and come back. Never wait on screen |
| Someone wants to publish a generated clip as a record of a real place | That is slide 8. Do not resolve it — run the discussion |
| A learner has no subject of their own | Hand them item 4 or item 6 from the sample asset set as a starting point |
| Time runs out | Drop the Canva half of stage 6, not the exit check. The Claude file is enough on its own |

## Differentiation

- **No accounts set up yet:** Pair with someone who has them. Watching a live fix is most of the lesson anyway.
- **For learners who need structure:** Give them item 4 from the asset set as their starting subject, and the toolkit page's prompt-anatomy list to work from.
- **For learners ready to extend:** After stage 4 breaks, have them predict where a second attempt will break before they run it.
- **Accessibility:** If someone in the room uses a screen reader or dictation regularly, ask them to lead stage 5 — "write for the ear, not the eye" is closest to skills they already use daily.

## After the session

Note which stage broke down for the most learners — an account not set up in advance, a tool cap hit mid-chain, or a video generation that never returned. If a learner's own subject produced an especially sharp example for the safety callback, ask their permission to keep it as next session's opening example.
