# Full session plan — Session 2: Buy With Confidence

**Time:** 90 minutes
**Learning outcome:** Learners can separate a research report from evidence, work out total cost rather than headline price, and write an alert rule that can be reviewed and that never takes an action.
**Session artifact:** A one-page purchase brief: the question and limits, an evidence matrix with two source checks, what remains uncertain, and one alert rule that can be paused.

**This session runs 90 minutes, not 60.** The extra time is not overrun — it is questions, and that is where the learning happens.

This guide can be taught from directly. It is written so that a facilitator who did not build the course can run it. Do not require learners to open a paid account, and do not ask them to enter payment or account details at any point.

## Session materials

These four links are everything you need open to run the session.

| Material | What it is for |
|---|---|
| [Projection slides](../../instructor/samples/session-02-slides.html) | Thirteen slides, in session order. Every “show on the board” moment in this guide is prepared there. |
| [Sample product sources](../../instructor/samples/session-02-product-sources.html) | Two seller pages, a manufacturer page, and an independent review, with contradictions planted. The address can be handed straight to an AI tool, or the text copied from it. |
| [OpenClaw setup on a paid API](../../sessions/session-02-openclaw-setup.md) | For learners taking the advanced route in the week's build. Mac and Windows, what it costs, and the three-step stop. Nobody needs it for the session. |
| [Monitoring snapshots](../../instructor/samples/session-02-snapshots.html) | A separate page, for the agent demonstration only. Your key: **A** reads 3,470, **B** reads 2,950, **C** fails with a 503. The page does not label them, because working out which one should fire against a trigger of 3,000 is the learners' job. |

### Hosted addresses to hand to the tool (live after deploy)

Each source is its own page, so Deep Research and the agent can be given addresses rather than pasted text. The agent contract's "two public pages" are sources 1 and 2.

| # | Page | Hand-out address |
|---|---|---|
| 1 | KitchenPlus seller offer (AS-640) | `https://applied-ai-mastery.web.app/s2/source-1` |
| 2 | DirectElectric seller offer (NW-2) | `https://applied-ai-mastery.web.app/s2/source-2` |
| 3 | AquaSilent warranty terms | `https://applied-ai-mastery.web.app/s2/source-3` |
| 4 | Home Lab independent review | `https://applied-ai-mastery.web.app/s2/source-4` |
| A | Snapshot A (reads 3,470) | `https://applied-ai-mastery.web.app/s2/snapshot-a` |
| B | Snapshot B (reads 2,950) | `https://applied-ai-mastery.web.app/s2/snapshot-b` |
| C | Snapshot C (503 failure) | `https://applied-ai-mastery.web.app/s2/snapshot-c` |

Each snapshot is also a separate page, so the agent scans one reading at a time. To change a reading live mid-demo without redeploying, add a query override to a snapshot address — e.g. `…/s2/snapshot-b?total=3050` flips B above the 3,000 trigger, and `…/s2/snapshot-c?total=2950` brings failed source C back to life. `avail=` and `returns=` overrides work the same way.
| [Learning journal](../../../site/assets/downloads/applied-ai-mastery-personal-journal-en.docx) | A downloadable Word file. Every table they fill in for this week's homework is in it. |
| [Session 2 brief](../../sessions/session-02-research-buy-monitor.md) | What learners see. |

## The recommended way: a real case, on your screen

What works best is to **take a real case of your own and work it live in front of the class on your own screen.** Three reasons: learners' free accounts run out midway; a real case produces real questions; and they watch you correct the tool, which is worth more than any explanation.

**This session is demonstrated, not worked through.** With twenty or more people on a video call, individual hands-on work does not run — people fall behind silently, and you cannot see it. So you do every step on your own screen, and the doing happens in the homework, which is built for exactly that. What you are protecting is not their typing time. It is their attention.

That does not mean they sit quietly. Every block below has a question the room answers, and those questions are the lesson.

**Before every prompt** ask: "What do you think it will come back with?" and "What is missing from my request?"
**When the answer returns**, read the first number aloud and ask "where is that from?", hunt for the assumption, and correct one thing in front of them.
**When you reach a judgement call**, stop and ask the room before you decide. Let two or three people answer, including a wrong one, before you move.

The prepared sample materials stay as backup — for a class with no network, when you have no example of your own, or for a facilitator who wants a guaranteed script.

## Start slow things in the background

Some requests take time — a detailed spreadsheet, a presentation, or anything that generates code. **Do not wait for them in front of the class.** Send it, keep talking about the next thing, and come back when it is ready.

## Before learners arrive

### Prepare the room and tools

1. Open **Gemini** in the facilitator account. If Deep Research is available to you, good. If not, Claude or ChatGPT do the same job and the session does not break.
2. Prepare a **saved Deep Research report** on the same purchase question in advance. This is the most important safety net in this session, for the reason given below.
3. Open the [four sample product sources](../../instructor/samples/session-02-product-sources.html) — two seller offers, a manufacturer warranty page, and an independent review. This is a stable substitute for live pages: the numbers will not shift mid-explanation, and the contradictions the lesson depends on are already planted. If you prefer real pages, the vetted one is [PriceSpy](https://pricespy.co.uk) — see **Two facilitator decisions before starting** below for how to run it.
4. Open the [projection slides](../../instructor/samples/session-02-slides.html) in a separate tab. Every moment where this guide says “show on the board” is already prepared there, in the same order.
5. Have the [Session 2 brief](../../sessions/session-02-research-buy-monitor.md) and the [learning journal](../../../site/assets/downloads/applied-ai-mastery-personal-journal-en.docx) on screen or in print. Every table learners fill in today is in the journal.

### What learners need

- One real purchase they are genuinely weighing. Ask them to think of it beforehand, or offer the journal example — a quiet dishwasher up to 3,000.
- A device with one AI tool, **or** paper and a partner to watch the demonstration.
- One place to keep the evidence matrix: a document, a notes app, or paper.

### Three facilitator decisions before starting

**Whether to run Deep Research live.** A Deep Research report takes between five and fifteen minutes to build. Do not stand in front of the class waiting for it. Send the request at minute 13 and keep teaching while it runs — the boundary block at minutes 15–25 is built for exactly that. If it has not returned in time, open the saved report and carry on.

**Whether to use a real comparison page.** The local sample set is the default: the numbers hold still and the contradictions are already there. If you want a live page instead, use a **price comparison site**, not a single shop. A comparison page puts one product in front of many sellers, which is the whole lesson on one screen, and it can be handed to an AI tool as an address — most retailers cannot. Checked in August 2026: an AI tool given a PriceSpy address reads it fine, while Amazon, AliExpress and KSP all refuse an automated read and have to be copied as text instead.

The vetted page is a dishwasher on [PriceSpy](https://pricespy.co.uk) — search a common model and open its product page. What you get:

- **Many shops, one product.** Sixteen on the page checked, so “which is cheapest” stops being a lookup and starts being a comparison.
- **A price history, which is the moment worth teaching.** The page shows the lowest and highest price it has seen. On the page checked, current offers started at £374 while the history recorded a low of £329 and a trend marked *Rising*. Ask the tool “what is the best price?”, get one number, then open the history beside it. The answer was not wrong. It was answering a smaller question than the one you asked.
- **No warranty terms at all.** The comparison site does not carry them, so the total-cost block at minute 45 has to reach a second source. That pressure is real rather than staged.
- **Specifications that read as facts and are not all comparable** — energy class, kWh per 100 cycles, noise class.

**Before class.** Open the page and write down today's numbers, the history low, and how many shops are listed. They drift daily, and you want the right answer before the tool gives you a confident one.

**Traffic.** Run it on your screen. Do not send a room full of learners to a live retail page.

**How far to take the agent.** Building it is no longer optional — every learner leaves with one running, and brings its run record back next session. What *is* optional is which route they take. The no-install route is complete: a specification, run by hand against saved pages, with the run written down. The local and cloud routes are for learners who want them and can set them up without you debugging their machine.

## Session map

| Time | What the facilitator does | What learners produce or identify |
|---:|---|---|
| 0–10 | **Homework discussion** | What worked and what broke for other people |
| 10–15 | Opening: the purchase you keep putting off | One real purchase to work on |
| 15–25 | Define need, budget, must-haves, deal-breakers | A boundary you can research against |
| 25–40 | Send the research request. While it runs, take the room's source list | The difference between a research plan and an answer |
| 40–60 | Work the evidence matrix and total cost on screen | Where a claim and a source stop agreeing |
| 60–80 | Verify two claims, then write the alert rule with the room | A rule that can be reviewed and takes no action |
| 80–90 | Exit check, and set the homework | A decision they will make, and an agent they will build |

## 0–10 minutes — Homework discussion

**Start here in every session from the second onwards.** It works well, and not because it is a check — because a learner who hears what broke for someone else learns faster than from a lesson.

Three questions, in this order:

1. **"Who managed to do something with what we talked about?"** Two or three tell it.
2. **"Who did it not work for, and where did it get stuck?"** This is the important one. If nobody answers, tell them about something that got stuck for you.
3. **"What surprised you?"** The best insights arrive here.

Note two things that came up, and return to them later in the session by the name of whoever raised them.

## 10–15 minutes — Opening, and the three labels

Ask: “Which purchase have you been putting off for weeks because there is too much information about it?” Collect three examples out loud. Take one — ideally yours, so you can move fast — and say that everyone will run their own in the homework.

Then show [slide 2](../../instructor/samples/session-02-slides.html) and give them the three words the rest of the session is colour-coded by: a **claim** is something someone is telling you, usually someone selling. **Evidence** is something you opened and read yourself. **Unknown** is what nobody has answered yet. Say that every number they are about to see is one of the three, and that the interesting moment is when something they assumed was evidence turns out to be a claim.

### What to say

> “Today we are not looking for the best product. We are building a brief you would agree to trust with your own money — and that is a different thing entirely. When someone is selling to you, how convincing the text is proves nothing.”

## 15–25 minutes — Define what you need and what you don't

Fill four boxes on screen for your own purchase: the need, the budget and deadline, the must-haves, and what rules a product out immediately. Ask the room for the deal-breaker before you write it — it is the box people have an opinion about. [Slide 3](../../instructor/samples/session-02-slides.html) has the example filled in:

> A quiet dishwasher that fits the 60 cm gap. Up to 3,000, installed before the holidays. Must have: 60 cm wide, 44 dB or less, three-year warranty. Rules it out: a brand with no local service, a model that needs the pipes moved.

Then add the box that is easiest to skip: **what this research will not decide.** In this case it will not decide whether a new dishwasher is needed at all, or whether repairing the old one is better.

### If a learner picks something too broad

“A flat”, “a car”, and “studying” will not close in forty minutes. Ask them to narrow to one decision inside the topic: not “which car”, but “this model, this year, from this seller — yes or no”.

## 25–40 minutes — A research plan, not an answer

You sent this request at minute 13, part-way through the boundary block, so that it had time to run. Show it in full on [slide 4](../../instructor/samples/session-02-slides.html) before sending, or type it out on screen:

> “Plan research for buying a quiet 60 cm dishwasher under 3,000. Do not recommend a model. Set out which kinds of sources establish total cost, warranty, return policy, and durability over time, and which question each kind of source is suited to. Add one opposing viewpoint and a list of what is still unknown.”

Point out that two phrases in the request do the work: **“plan”** rather than “recommend”, and **“what is still unknown”**.

Now, while the report runs, do not look at the screen. Ask the room to put in the chat the sources they would open themselves, and give it a genuine minute. Read four or five out and build the list on screen as you go. The chat is the only channel where twenty-five people can all answer at once, and it gets you the ones who would never unmute.

When the report returns — or when you open the saved report — compare the two lists and ask:

- What did the report find that we did not think of?
- What did we list that the report missed?
- How many of the report's sources were actually opened, and how many were only cited?

### What to say

> “That report is a list of addresses, not evidence. It saves us the question of where to start. It does not save us the reading.”

### Expected intermediate output

A list of source types — manufacturer, seller, independent tester, user forum — each with a reason it suits a particular question, plus a list of uncertainties. If the tool returned a recommended model, that is not the result you want.

### If the output is weak

- **It recommends a product.** Point at the word “plan” in the request and re-run with “do not recommend a model”.
- **It returns a generic list.** Ask it to attach to each source type the question that source answers, and what it cannot answer.
- **It cites a source that does not exist.** Excellent. Open it in front of the class, show that it does not resolve, and move the claim to the “uncertain” column.

## 40–60 minutes — The evidence matrix and total cost

This is the long block, and the heart of the session. Build the five columns on screen — the claim, the source and date, supports or contradicts, what is uncertain, and checked yes or no — filling them in front of the room rather than asking anyone to fill their own. The same table is waiting in their journal for the homework.

Demonstrate one complete row from the [sample sources](../../instructor/samples/session-02-product-sources.html), including the source date. Then open the seller page and the manufacturer page side by side and find one difference between them. Two contradictions are planted in the samples: the seller promises three years of warranty while the manufacturer gives two and makes the third conditional on registering within 30 days and on installation by an approved technician, and the independent review measured 46 dB against the 42 dB the manufacturer publishes — above the 44 dB requirement learners set for themselves at minute 8. [Slide 7](../../instructor/samples/session-02-slides.html) puts the two warranty numbers side by side and [slide 8](../../instructor/samples/session-02-slides.html) puts the decibel readings on one scale — both after the room has found them, not before.

### The moment that matters: total cost

Build the total on [slide 6](../../instructor/samples/session-02-slides.html), which stacks it as a bar against the budget line rather than as a list. Ask the room for the next cost before you reveal each segment. Look for delivery, installation, import duty and handling fees, consumables, extended warranty, and what it costs to send the thing back if it does not suit. In the sample sources the headline price is 2,690 and the total cost reaches 3,470 — over a budget of 3,000, even though the headline price was under it. The same table waits for learners in the journal, to fill in for their own purchase.

### What to say

> “The headline price is a marketing number. The total cost is what will have left your account by the end of the first year. They are almost never the same number.”

Put these to the room, one at a time, and wait for an answer before you type anything. On a call, silence after a question is not failure — it is people reading.

- “Who wrote this, and when?”
- “Is this a claim by the manufacturer, or by someone who tested it?”
- “Would the decision change if this detail were wrong?”
- “What else gets paid beyond this price?”

## 60–80 minutes — Verification, and the rule you write together

Ask the room which two claims would change the decision if they turned out to be wrong. Take the two they name — not the two you had planned — and open the original source for both on screen. Only two, so they are worth arguing about. If the room picks badly, open their choice anyway and let the dead end be the lesson.

Then write one alert rule with the room. Do not hand out a list of terms — build it as questions, taking each answer from someone before you write it. [Slide 9](../../instructor/samples/session-02-slides.html) has the questions ready to project, and [slide 10](../../instructor/samples/session-02-slides.html) draws the loop those answers describe.

| The question | Example |
|---|---|
| What does it watch? | The total cost of this model |
| Where may it read from? | These two product pages only |
| What triggers it? | The total cost dropping to 3,000 or below, or a change in the return terms |
| How often? | Once every six hours |
| What does it remember? | The last price it saw, so it does not alert twice about the same thing |
| When does it stop by itself? | If a source fails to load twice in a row |
| What stays with you? | The purchase. Always. |

### What to say

> “Notice that the last row is not a technical limitation — it is our decision. It is possible to build a system that buys. We are choosing not to, because the alert does not know what is going on in your life this week.”

### The build is homework, and it is the real work

A specification nobody runs is a worksheet — so everyone builds one this week, on the route they can manage. Show the three routes, say plainly which one most people should take, and do not start anyone's installation on the call:

- **No-install, and most people take it.** The spec goes in the journal. They run it by hand once against two saved product pages — or the [snapshots page](../../instructor/samples/session-02-snapshots.html) — and write down whether it should have alerted, stayed quiet, or stopped, and why. Over the week they repeat that check three or four times. This is a complete route and produces the same run record as the others.
- **Local.** OpenClaw with Ollama, public or mock data, a manual first run, a local log.
- **Cloud.** Their own provider account, separate key, low cap, public data only.

**Demonstrate a running agent before you let them go.** They need to have seen one work before they build one alone. Show the connection without exposing the credential, run it against the three snapshots — A at 3,470, B at 2,950, and C which fails to load — and show the stop condition firing. That is the whole point of the third snapshot, and it is the one people forget to design for.

**Do not debug a learner's machine on the call.** With twenty people watching, ten minutes disappears into one laptop and everyone else leaves. Point them at the no-install route, and offer a separate time.

### The homework

> "Build your agent this week, then run it. Check it, or let it check, at least three times. **Bring the run record next session** — what it caught, what it missed, what fired twice about the same thing, and whether you would give it more access than you gave it today. If it never fired at all, that is a finding, not a failure: it means your trigger was wrong or nothing happened, and those are different problems."

This is the first homework in the course, and it is the one that matters most for what comes later — the boundary thinking here is what the capstone's app deliverable is built on.

## 80–90 minutes — Exit check and the homework

Show [slide 13](../../instructor/samples/session-02-slides.html). Take three or four out loud, and ask everyone else to put theirs in the chat — going round twenty-five people costs more than the exercise is worth, and the chat gives you a record you can skim afterwards:

> “I am **[buying / waiting on / rejecting]** **[the product]**, because I checked for myself that **[two claims]**. I am still unsure about **[one uncertainty]**, so I will look again on **[date]**.”

Then leave one question hanging as they go: “What had almost convinced you before you opened the source?” It does not need an answer in the room.

### Quick assessment rubric

| Evidence | Not yet | Ready |
|---|---|---|
| Use of the research report | The report is cited as proof | At least two of its sources were opened and read |
| Cost | Headline prices compared | Total cost worked out, including returns and warranty |
| Alert rule | “Tell me when it's cheap” | Threshold, source, frequency, memory, stop rule, and human approval |

## OpenClaw extension (15 additional minutes)

### Setup the night before

Use only a provider or API account you own. Do not display an API key on screen, do not add learners to the account, and do not ask them for access details. Install OpenClaw on the demonstration machine, complete onboarding against your chosen cloud model, and run its health check. Prepare a separate project and key with a low budget, a workspace with no sensitive material, and one notification channel you control. The three demonstration snapshots are on the [snapshots page](../../instructor/samples/session-02-snapshots.html), kept separate from the product sources so an AI tool can be given the sources alone. A reads 3,470 — the exact total the room worked out at minute 40 — B reads 2,950, and C fails with a 503. They are labelled A, B and C and nothing more: the page states readings, not verdicts, so that the agent — and the room — has to compare them against the 3,000 trigger rather than read the answer off the page.

Before you open the tool, show the three-step **kill switch** on [slide 12](../../instructor/samples/session-02-slides.html): disable the schedule, stop the gateway, revoke the separate key. Leave it visible for the whole demonstration.

### Demo agent contract

Show the contract on [slide 11](../../instructor/samples/session-02-slides.html) before you open the tool:

> Every six hours, read only these two public product pages or snapshots. Alert only if the total cost has dropped to 3,000 or below, if availability has changed, or if a warranty or return term has changed. Save the last value you saw and the source date. Do not send an identical alert again for 48 hours. If a source fails to load twice, send one “needs review” notice and pause yourself. Do not buy, do not log in, do not send messages, do not touch private data, and do not infer a recommendation.

### Live teaching script

1. Show the model connection without exposing the credential. Explain that OpenClaw is the runtime, and that the cloud model is billed and authorised separately from it.
2. Show the workspace, the allowed-source list, the schedule, the run history, and the notification channel. Ask learners to identify the trigger, the duplicate rule, the approval point, and the stop rule themselves.
3. Run it once with **Snapshot B**, which reads 2,950 against a trigger of 3,000. Inspect the source, the date, and the draft alert before it reaches the channel.
4. Run it again with exactly the same snapshot. No second alert. This is the moment the rule you wrote at minute 45 proves itself.
5. Switch to **Snapshot C**, where the source returns a 503. Show the logged failure and the “needs review” notice. Do not fix it by widening permissions. What you are looking for, and what to say if it does not happen: it must not alert on price, must not guess a value, and must not treat the last reading as current. First failure, retry. Second failure, stop itself and send one “needs review” notice. If the agent instead reports the old 780 as though it were today's price, stop and show the room — that is the failure this snapshot exists to produce.
6. Use the kill switch in front of the group, and say it plainly: an agent that stopped is the correct result when its evidence or its permissions are insufficient.

### What people are building

Open the official [OpenClaw Showcase](https://openclaw.ai/showcase). It collects public community examples — personal operations, family workflows, productivity summaries, integrations between services, and larger multi-agent systems. Pick one example with the group and ask: **What data, permissions, schedule, notification route, log, and stop condition would this need? Which parts suit a classroom prototype and which do not?** The examples are inspiration and a permission-design exercise, not a list of connections to grant.

### Managed web agents: Manus and similar platforms

Contrast OpenClaw with managed web-agent platforms such as [Manus](https://manus.im/docs/features/cloud-browser). They provide a hosted workspace or browser, so a local install may not be needed. That convenience does **not** reduce the importance of the permission boundary. Show one simple public-web research example and ask learners to distinguish three things: a cloud browser, a local browser using a session already signed in to your accounts, and a scheduled agent running when nobody is watching. Do not connect learner accounts and do not run account-changing actions.

### Student routes and troubleshooting

Everyone completes the no-install specification and run-review route. The local lab uses OpenClaw plus Ollama, public or mock data, a manual first run, and a local log only. The Advanced Adventure is for a learner who already has their own provider account, with a small budget and a separate key. If setup fails, the hardware is insufficient, the account is unavailable, or the local model cannot use tools reliably, move straight to the no-install route. Do not debug against a learner's personal files, accounts, payment methods, or signed-in browser.

## Equivalent tool routes

These are the routes for the homework, and for whichever tool you demonstrate on. Nobody needs a tool open during the session itself.

**Gemini (default):** Deep Research if it is available, otherwise ordinary Gemini with the same request. The report is longer, the method is identical.
**Claude:** Ask for the same source plan and the same matrix template. There is no automatic web research — learners open the sources themselves, which is entirely fine for this session.
**ChatGPT:** The same request and the same matrix.
**No tool:** Open or print the [sample sources](../../instructor/samples/session-02-product-sources.html) and fill the matrix by hand. The learning goal remains fully intact, and this route produces the same homework evidence as the others.

## Troubleshoot without losing the lesson

| Situation | Facilitator response |
|---|---|
| Deep Research does not return in time | Open the saved report. Do not wait in front of the class. |
| Deep Research is not available on the account | Run the same request in ordinary Gemini, Claude, or ChatGPT. The gap is in length, not in method. |
| The report sounds authoritative and nobody checks | Pick one claim and open its source in front of everyone. If it does not resolve, that is the lesson. |
| Learners are comparing prices only | Go back to the three columns on screen and add up the total cost in front of them. |
| Someone asks what they should buy | “I am not going to decide for you. Let's see which row in your matrix is still empty.” |
| Someone wants the agent to buy for them | Take it seriously: what happens if the price dropped because the model was discontinued? That is why there is an approval point. |

## Differentiation

Everyone watches the same demonstration, so this is about the homework.

- **No device or account:** A printout of the [sample sources](../../instructor/samples/session-02-product-sources.html) and an evidence matrix filled in by hand. The whole homework can be completed this way.
- **For learners who need structure:** Point them at the dishwasher example in the journal and ask them to change only the product and the budget.
- **For learners ready to extend:** Ask them to find a real contradiction between seller and manufacturer and record both, with dates.
- **Language support:** The request may be written in the learner's strongest language. Require the matrix labels — source, date, supports or contradicts, uncertain — in the course language.

## After the session

Note which claim in the room turned out to be wrong once the source was opened, and keep it as an example for next time. Keep the saved report and the four pages with the course materials, so another facilitator can rebuild the session without hunting for new sources. If time runs short, shorten the research block — the report arrives while you keep talking anyway. Do not drop the source checks, and do not drop building the agent: a specification nobody ran is the thing this session used to produce and no longer does.
