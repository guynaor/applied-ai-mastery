# Full session plan — Session 4: From Prompt to Presentation

**Time:** 90 minutes
**Learning outcome:** Learners generate an image and repair it, animate their own image and generate a second clip from words alone, write a narration script for the ear and record it, and assemble the same deck with one tool in two output formats — labelling every generated piece and never presenting a convincing clip as a record of something real.
**Session artifact:** One production set: the generated image, its fixed version, the animated clip, the text-generated clip, the narration, and a deck built two ways — with a visible label on every generated piece.

**This session runs 90 minutes, not 60.** The extra time is not overrun — it is questions, and that is where the learning happens.

This guide can be taught from directly. The whole chain runs on free accounts — Google and Claude — and learners do not have to publish anything at the end.

## Session materials

| Material | What it is for |
|---|---|
| [Projection slides](../../instructor/samples/session-04-slides.html) | Eleven slides, in session order. |
| [Toolkit reference](../../instructor/samples/session-04-toolkit.html) | Free-tier notes by tool, the image-prompt anatomy, and the narration script pattern. Open it while prepping and keep it open during the session. |
| [Sample asset set](../../instructor/samples/session-04-asset-set.html) | Two examples for the opening, and a fallback: item 4, a generated image passed off as a record, and item 6, a real photograph, edited and captioned with the wrong place and time. |
| [The answers](../../instructor/samples/session-04-answers.html) | A separate page, so an AI tool reading the asset set does not also receive the answers. **Do not open before you've walked both examples with the class.** |
| [Learning journal](../../../site/assets/downloads/applied-ai-mastery-personal-journal-en.docx) | Downloadable Word file with the production plan, the stage log, and the tool verdict table. |
| [Session 4 brief](../../sessions/session-04-trustworthy-visual-story.md) | What learners see. |

## The recommended way: your own subject, on your screen

What works best is to **pick one real subject of your own and run the whole six-stage chain live in front of the class, on your own screen.** Three reasons: learners' free accounts run out mid-chain; a real subject produces real questions; and they watch you fix a bad generation in front of them, which teaches more than any explanation would.

Learners fill in the journal tables for **their own subject**. You run the chain; they think.

**Before every generation**, ask: "What do you expect back?" and "What's missing from this prompt?"
**When the output returns**, name the first thing that's wrong with it out loud, and fix that one thing in front of them.
**After each stage**, give two minutes for the journal. A session where only you generated something is a demonstration, not a lesson.

Item 4 and item 6 stay as backup for the opening discussion only — for a class with no network, or a facilitator who wants a guaranteed script for those six minutes. They are never a substitute subject for the six-stage demo: if you have no subject of your own, pick anything simple on the spot and generate it from words.

## Start slow things in the background

Video generation is slow, and stage 4's clip has to be ready by the time the class reaches the video block. **Send the stage-4 request the moment stage 3 begins** — while learners are animating their own image, start the text-only clip generating in the background on your machine — and keep teaching. Come back to it at minute 46.

## Before learners arrive

### Prepare the room and tools

1. Open the [toolkit reference](../../instructor/samples/session-04-toolkit.html) and correct anything that's moved since it was written — free-tier terms change faster than this guide does.
2. Open the [sample asset set](../../instructor/samples/session-04-asset-set.html). The answers are on a [separate page](../../instructor/samples/session-04-answers.html) — do not open it early, and it is separate so that an AI tool reading the asset set does not also receive the answers.
3. Open the [slides](../../instructor/samples/session-04-slides.html), and sign into Google and Claude in the facilitator account. Sign into ChatGPT too if you plan to run the stage-1 comparison.
4. **Run the demo on a desktop, not a laptop.** Video generation is render-heavy, and a session built around it drags badly on underpowered hardware.

### What learners need

- Two free accounts, set up before the day: Google and Claude — one fewer than this session used to need. ChatGPT is optional, a third.
- One real subject they want to carry through the chain — a place, a creature, an object, a small scene.
- A device with a browser. That is enough for the whole session.

### Two facilitator decisions before starting

**Your own subject, or the sample items.** The chain runs either way, but a subject you're actually building live produces better questions than a prepared one. If you fall back to the sample items, open them only for the two-item opening — don't run the whole chain on them.

**When to open the answers page.** Only after you've walked both opening examples with the class. Open it early and you've lost the discussion.

## Session map

| Time | What the facilitator does | What learners produce or identify |
|---:|---|---|
| 0–10 | **Homework discussion** | What worked and what broke for other people |
| 10–16 | Three rules, and two examples that earn them | The gap between a generated image passed off as a record, and a real, edited photo mis-captioned to the wrong place and time |
| 16–27 | Generate | A first image, from a prompt that names all five things a prompt has to say |
| 27–38 | Fix | The same image, one region repaired, labelled |
| 38–46 | Move | Their own image, animated |
| 46–56 | Video, then the safety callback | A second clip from text alone, and the honest answer about publishing either one |
| 56–65 | Narrate | A script written for the ear, recorded |
| 65–85 | Assemble, two routes | The same deck, built by Claude as PPTX and as self-contained HTML |
| 85–90 | Exit check, reflection, and the homework | A production set ready to review, or a list of what's missing |

## 0–10 minutes — Homework discussion

**Start here in every session from the second onwards.** It works well, and not because it is a check — because a learner who hears what broke for someone else learns faster than from a lesson.

Three questions, in this order:

1. **"Who managed to do something with what we talked about?"** Two or three tell it.
2. **"Who did it not work for, and where did it get stuck?"** This is the important one. If nobody answers, tell them about something that got stuck for you.
3. **"What surprised you?"** The best insights arrive here.

Note two things that came up, and return to them later in the session by the name of whoever raised them.

## 10–16 minutes — Three rules, and two examples that earn them

Show [slide 1](../../instructor/samples/session-04-slides.html): the three rules.

### What to say

> "Six stages from here. At every one of them, ask these three questions again — that repetition is the safety lesson, not a slide you see once and forget."

Show [slide 2](../../instructor/samples/session-04-slides.html): one subject, six stages, one artifact — the map of the chain they're about to run.

Open the [sample asset set](../../instructor/samples/session-04-asset-set.html) to **item 4**: a beautiful, generated garden image, captioned "this is how the garden looks now." That's a factual claim about a real place, supported by an image that isn't a record of it.

Then **item 6**: a real photograph — genuinely taken, not generated — but edited (the saturation raised, the background cropped), from a different garden, last July, captioned "this is what we grew."

### What to say

> "Notice the gap. Item 4 invented every pixel. Item 6 invented none of them — it's a real photo, edited, from the wrong garden and the wrong month. Nothing in it is fake, and that's exactly what makes it harder to catch: a real photo can be edited, mis-placed, and mis-captioned, all at once, with no invented pixel to give it away."

Don't resolve which is worse; hold both against rule three and move on. Slide 8 brings the class back to this exact question in about half an hour, on output they made themselves.

## 16–27 minutes — Generate

Show [slide 3](../../instructor/samples/session-04-slides.html) and [slide 4](../../instructor/samples/session-04-slides.html).

Learners write a prompt that names five things: subject, composition, light, framing, and what to exclude. Full detail, including the weak/strong prompt pair, is on the [toolkit page](../../instructor/samples/session-04-toolkit.html).

Run it in Gemini — that alone completes this stage in full. If a learner also has ChatGPT, they run the identical prompt there too and compare the two results. The comparison is the stage's real teaching point, not either tool — a Gemini-only learner isn't missing anything assessed.

### If the output is weak

- **It's generic.** Read the five-part list back against their prompt — usually one part was never said.
- **It added something they didn't ask for.** Point at it. The model filled a gap they left open; that's the lesson, not a bug.
- **They're stuck comparing Gemini and ChatGPT and can't decide which is "better."** They're not supposed to decide — they're supposed to notice what each one did with the same words.

## 27–38 minutes — Fix

Show [slide 5](../../instructor/samples/session-04-slides.html).

### What to say

> "Same tool as stage 1. Aim the edit at the patch that failed, not at the picture again from nothing."

Same tool as stage 1. Learners edit the specific region that's wrong — they don't throw the prompt away and regenerate from nothing. Re-rolling destroys whatever already worked. Once it's fixed, they label it before moving on — that label rides with this image for the rest of the chain.

## 38–46 minutes — Move

Show [slide 6](../../instructor/samples/session-04-slides.html).

Learners upload the image they built and fixed into Gemini, and add a short prompt describing only the motion. The subject stays theirs; the prompt only tells it how to move.

**This is where you send the stage-4 background generation** (see "Start slow things in the background," above): kick it off now, keep teaching stage 3, and come back to it at minute 46.

## 46–56 minutes — Video, then the safety callback

Show [slide 7](../../instructor/samples/session-04-slides.html).

Same tool, this time a text prompt with nothing else behind it — nothing of the learner's survives into this clip. Watch for where it breaks: text, hands, continuity, physics. Send the job, then keep talking — it isn't instant.

Then show [slide 8](../../instructor/samples/session-04-slides.html), which closes this block on the class's own output. Put a learner's stage-3 clip and stage-4 clip side by side. Both are generated — nothing in this chain was shot with a camera. The real difference is how much they directed: stage 3 animates an image they built and fixed; stage 4 came from words alone.

Ask: "If you captioned either one 'this is this place,' right now — would that be true?"

### What to say

> "Neither is a record of that place — so no. A label doesn't make it true; it stops it from deceiving. That's rule three from slide 1. Say so out loud before anyone asks; that's rule one, applied to something you made ten minutes ago."

If someone pushes on which clip is "worse," don't resolve it — that's exactly the discussion this slide exists to run.

## 56–65 minutes — Narrate

Show [slide 9](../../instructor/samples/session-04-slides.html).

Learners write a short script that narrates the piece they've built — their subject, the image, and the two clips — for the ear, not the eye: short sentences, one idea per breath, numbers spoken rather than written. Full pattern on the [toolkit page](../../instructor/samples/session-04-toolkit.html).

They record it in Google Cloud's speech studio: [https://console.cloud.google.com/agent-platform/studio/media/speech](https://console.cloud.google.com/agent-platform/studio/media/speech). **Put that link in the chat — do not just say "Google's speech tool".** It lives in the Cloud console, not at aistudio.google.com, and the two are easy to confuse and not reachable from each other. Confirmed working in the first delivery.

### If the output is weak

- **A name comes out wrong.** A second take usually fixes it faster than fighting with the first one.
- **The script sounds fine on the page and wrong out loud.** Read it aloud yourself before recording — a sentence that needs a comma to survive needs to be split instead.

## 65–85 minutes — Assemble, two routes

Show [slide 10](../../instructor/samples/session-04-slides.html).

### What to say

> "The comparison is the lesson, not the tool — it's the same tool both times. Notice what each format cost you, and what it gave back."

Learners build the same short deck twice with Claude: once as a PPTX file, once as a single self-contained HTML file. Same slides, same script, same images — only the output format changes.

Holding the tool constant and varying only the output format is a sharper comparison than varying the tool would have been — everything else about the task is controlled, so what's left standing is the real difference: what each format costs and gives back.

### Expected intermediate output

Two short decks that say the same thing and open differently: the PPTX opens in PowerPoint, Keynote, or Google Slides, and anyone can edit its slides there; the HTML opens in any browser with nothing installed, is trivial to share as a link or attachment, and is readable as plain text. Neither is "the" deck — the point is that they now have both, and can name what each format cost.

### Checkpoint: before moving to the exit check

Ask each learner, out loud, one sentence each: "Which format would you send someone else, and why?" A real answer names a trade-off (needs software to open versus opens anywhere, easy to restyle versus easy to share and read as text) — not just a preference.

### If the output is weak

- **The PPTX looks plain.** That's expected, not a failure — it's an editable starting point, not a finished polish job. Point at what it buys them: anyone can open and restyle it.
- **The HTML deck drifted from the script.** Point them back to the narration script from stage 5 — the deck should say what the script says, not reinvent it.
- **A learner only has time for one route.** Build the PPTX — it's the format an institution or colleague expects. If time is short, show them the HTML rather than building it.

### If you finish early

This block was sized for two tools; producing a second export is a follow-up prompt, not a rebuild, so it may now run short — that is a guess, untested at this new shape, so watch the clock rather than assume it. If minutes are left over, have a learner open their PPTX in Google Slides and their HTML in a second browser tab side by side, and ask what changed when they switched.

## 85–90 minutes — Exit check, reflection, and the homework

Show [slide 11](../../instructor/samples/session-04-slides.html):

> My subject was **[what]**. It went through **[how many]** of the six stages. The stage I would cut if I only had an hour is **[which]**. The clip I would not publish about a real place is **[which]**, because **[why]**.

Reflection question: "Which stage surprised you — because the tool did better, or worse, than you expected?"

### The homework

"Take something you actually care about — a hobby, a place you know well, a project, anything you would want to show someone — and run it through the whole chain on your own. Generate the images, fix the one that comes back wrong, animate it, generate a second clip from words alone, write and record the narration, and build the deck both ways. Then send it to the class, by email or on WhatsApp. Generate every image — do not start from a photo you already have. And label everything that was generated, exactly the way you did today."

**Set a date when you give it.** With no next class to anchor it, an open-ended task drifts and quietly becomes nothing.

**Say that a partial run counts.** This guide's own reason for demonstrating live is that free accounts run out mid-chain, and that will happen to some of them alone at home too. Tell them to send what they have and name the stage they stopped at — the exit slide already accepts "how many of the six stages", so the homework should too.

This is the first time they run the chain without you in the room, so the questions arrive as messages rather than raised hands. Expect the most common one to be where the speech tool lives — keep the link somewhere you can paste it quickly.

Two things worth saying out loud: the labelling rule still applies when nobody is watching, and a piece nobody sees is not finished. Sending it is part of the task, not an optional extra.

### Quick assessment rubric

| Evidence | Not yet | Ready |
|---|---|---|
| Labelling | "It's just the output" | Every generated piece is visibly labelled, in the caption itself |
| The safety callback | "I'd probably post the better one" | Neither clip is presented as a record without a label |
| Consent | "Nobody's in it" taken as enough | A real person's likeness only with consent, a child's only with a parent's |
| The two routes | Only one format exists | Both the PPTX and the HTML exist, and the learner can say what each format cost and gave back |

## Equivalent tool routes

**Gemini alone** completes stages 1 through 5 in full. Nothing assessed depends on a second tool.
**ChatGPT, at stages 1–2 only:** an optional second opinion for the comparison — never required, and never used past stage 2.
**Claude, at stage 6, two output formats:** not a choice between them — both, so the comparison itself is the exercise.
**Sora:** a facilitator demo only, if you want to show what a paid tool produces. Never a learner task.
**Any other free video or image tool a learner already has:** check the [toolkit page](../../instructor/samples/session-04-toolkit.html)'s two traps before you let anyone route their final piece through it.

## Troubleshoot without losing the lesson

| Situation | Facilitator response |
|---|---|
| Someone used Runway and ran out mid-session | 125 lifetime credits, not monthly. Move them to Gemini and continue |
| Their export has a Kling watermark | Expected on that free tier. Note it, and use it as a labelling example |
| ChatGPT hit its image cap | Drop to Gemini. The comparison is lost for them, not the stage |
| A video generation has not returned | Move to the next stage and come back. Never wait on screen |
| Someone wants to publish a generated clip as a record of a real place | That is slide 8. Do not resolve it — run the discussion |
| A learner has no subject of their own | Have them describe anything simple in the room — a mug, a pet, an object — and generate it from words. Never hand them an existing image to animate; item 6 is a real photo and can't enter the chain |
| Time runs out | Build the PPTX, not both — show the HTML rather than having them build it |
| The PPTX is missing an image or clip on a slide | Claude dropped the asset reference during generation — re-generate that one slide with the asset re-attached, don't restart the whole deck |
| The HTML file opens as raw text or code instead of a slide deck | The OS handed it to a text editor, not a browser. Drag the file into an open browser window, or right-click and choose "open with" the browser |
| Someone cannot find the speech tool | They are almost certainly at aistudio.google.com. Paste the link: https://console.cloud.google.com/agent-platform/studio/media/speech |
| The speech studio won't generate, refuses, or drops the voice | Read the script aloud yourself as a stand-in narration and move on; fix the audio after the session |

## Differentiation

- **No accounts set up yet:** Pair with someone who has them. Watching a live fix is most of the lesson anyway.
- **For learners who need structure:** Give them a narrow, concrete subject to describe — "a park bench in the rain" — and the toolkit page's prompt-anatomy list to build the prompt from.
- **For learners ready to extend:** After stage 4 breaks, have them predict where a second attempt will break before they run it.
- **Accessibility:** If someone in the room uses a screen reader or dictation regularly, ask them to lead stage 5 — "write for the ear, not the eye" is closest to skills they already use daily.

## After the session

Note which stage broke down for the most learners — an account not set up in advance, a tool cap hit mid-chain, or a video generation that never returned. If a learner's own subject produced an especially sharp example for the safety callback, ask their permission to keep it as next session's opening example.
