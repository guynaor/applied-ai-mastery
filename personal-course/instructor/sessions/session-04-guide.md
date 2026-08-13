# Full session plan — Session 4: Solve a Recurring Problem

**Time:** 55–60 minutes
**Learning outcome:** Learners reduce a recurring problem to one tool with at most three actions, build it in Claude Artifacts, and test it against a normal case and an edge case until they know where it breaks.
**Session artifact:** A working tool or paper prototype, with a test log: the problem, the permitted actions, the normal-case result, the edge-case result, one revision, and a privacy note.

This guide can be taught from directly. The facilitator does not need to be able to program. This session is about definition and testing, and those are exactly the parts the tool will not do for you.

## Session materials

| Material | What it is for |
|---|---|
| [Projection slides](../../instructor/samples/session-04-slides.html) | Ten slides, in session order. |
| [Test cards](../../instructor/samples/session-04-test-cards.html) | Ready-made edge cases to draw from, plus a projectable test log. The heart of the session. |
| [Learning journal](../../../site/assets/downloads/applied-ai-mastery-personal-journal-en.docx) | Downloadable Word file with the definition table, the revision log, and the test table. |
| [Session 4 brief](../../sessions/session-04-build-personal-tool.md) | What learners see. |

## Before learners arrive

### Prepare the room and tools

1. Open **Claude** in the facilitator account with Artifacts available. Without Artifacts, ChatGPT or Gemini can return a single HTML file — but then the facilitator opens it locally, and only after reading it.
2. Open the [test cards](../../instructor/samples/session-04-test-cards.html). Remotely, paste the link into the chat at the testing stage and let each learner pick one. In a room you can print them: physically drawing a card works slightly better.
3. Open the [slides](../../instructor/samples/session-04-slides.html) in a separate tab.
4. Have paper and pencils ready. At least one learner will work on a paper prototype, and that is a full route, not a consolation prize.

### What learners need

- One small, real, recurring problem. The journal example — splitting costs with flatmates — works well because it involves arithmetic, and therefore has real edge cases.
- A device with one AI tool, **or** paper.
- Somewhere to keep the tool and the test log.

### Two facilitator decisions before starting

**How much code to show.** You do not need to teach programming, and you should not walk through the code line by line. What you do need to show: where the data is stored, and what happens on refresh. Those two questions teach more than any explanation of JavaScript.

**When to hand out the test cards.** Only once the normal case passes. A learner who knows in advance which edge cases are coming will build a tool that survives them — which is precisely what is not being tested here.

## Session map

| Time | What the facilitator does | What learners produce or identify |
|---:|---|---|
| 0–5 | Opening: what do you redo on paper every time | One recurring problem |
| 5–15 | Shrink to one user and three actions | A definition you can build from |
| 15–30 | Build in Claude Artifacts and read the code | A first running version |
| 30–42 | Normal case, then an edge-case card | A test log with expected against actual |
| 42–50 | One fix, retest, and control decisions | A tool whose limit is known |
| 50–60 | Exit check and reflection | Clarity on what the tool should and should not do |

## 0–5 minutes — Opening

Show [slide 1](../../instructor/samples/session-04-slides.html) and ask: “What do you redo on a scrap of paper every month, and always lose?” Collect three examples.

### What to say

> “We are not building an app today. We are building one small tool, and success is not that it looks good — it is that you know exactly where it breaks.”

## 5–15 minutes — Shrink it

Show [slide 2](../../instructor/samples/session-04-slides.html). Each learner fills in the journal: who the user is, what the problem is, at most three actions, and what the tool must never do.

The three-action limit is not a whim. It is what makes the tool testable inside twelve minutes.

### What to say

> “Every fourth action you add costs you a test you will not have time to run. An untested tool is not a tool — it is a guess with buttons.”

### If a learner describes a whole system

“Something to run my whole household” is not a tool. Ask them to pick one action out of it — not “chore management”, but “whose turn is it to take the bins out this week”.

## 15–30 minutes — Build, then look

Show the request on [slide 3](../../instructor/samples/session-04-slides.html) and run it in Claude Artifacts in front of the class.

### Expected intermediate output

One running web page with the three actions and a reset button. If it came back as an app with screens, a login, or cloud storage, the request was too broad — and that is a good thing to show.

### The moment that matters: read the code before using it

Show [slide 4](../../instructor/samples/session-04-slides.html) and ask the three questions against the code you got:

1. Where is the data stored, and what happens on refresh?
2. What does it do with input you did not expect?
3. Does anything here leave the page and go to the internet?

You do not need to answer these by understanding the code. You can search it for `fetch`, `http`, or `localStorage` and ask the tool what they are doing there.

### What to say

> “Code generated in thirty seconds is not safe merely because it runs. That is not a criticism of the tool — it is the reason we test at all.”

## 30–42 minutes — Normal case, then a card

Show [slide 5](../../instructor/samples/session-04-slides.html). Everyone runs the **normal case** first — the action the tool was built for — and records in the journal what they expected and what happened.

Only once that passes, hand each learner a [test card](../../instructor/samples/session-04-test-cards.html). [Slide 6](../../instructor/samples/session-04-slides.html) shows the common ones.

The cards that almost always find something: **empty input**, **zero**, **text where a number goes**, **a division that produces fractions of a penny**, and **refreshing the page**.

### What to say

> “A card that broke the tool is a test that succeeded. We are not looking for a tool that works — we are looking for its limit, because without it you will not know when to stop trusting it.”

### If the tool survives every card

It happens, and usually it means the tool is very narrow — which is fine. Give a boundary card: only one person, or a phone-width screen.

## 42–50 minutes — One fix and control

**One** fix only, then retest. A learner who changes three things at once will not know which of them worked.

Then show [slide 8](../../instructor/samples/session-04-slides.html) and the four control decisions: where it is stored, who opens it, how data is cleared, when to stop.

## 50–60 minutes — Exit check and reflection

Show [slide 10](../../instructor/samples/session-04-slides.html):

> My tool does **[one action]**. It breaks when **[the edge case]**, so **[the fix or the warning]**. The data lives in **[where]** and is cleared by **[how]**.

Reflection question: “What does the tool do better than the scrap of paper — and what did the paper do better than it?”

### Quick assessment rubric

| Evidence | Not yet | Ready |
|---|---|---|
| The definition | “A tool to help me get organised” | One user, one problem, at most three actions |
| The testing | “I tried it, it works” | Expected against actual, written down, for two cases |
| The edge case | Only tested what was planned for | Drew a card, and recorded the result even when embarrassing |
| Control | “It's just a file” | Knows where it is stored, how to clear it, when to stop |

## Equivalent tool routes

**Claude (default):** Artifacts. The tool runs inside the window, so you can fix and see immediately.
**ChatGPT:** Ask for one self-contained HTML file. Open it locally only if the facilitator can read the code first.
**Gemini:** The same request and the same testing.
**Paper:** Sketch the screens and run the same test cards against them by hand. This works well — an edge case is found on paper just as readily as on screen.

## Troubleshoot without losing the lesson

| Situation | Facilitator response |
|---|---|
| Artifacts is unavailable | Ask for one HTML file and open it locally, or move to a paper prototype. |
| The tool came back as a large app | Return to the three actions and ask for a rebuild of only those. |
| A learner gets stuck on styling | “Does that change what happens on empty input?” Return them to testing. |
| The fix broke something else | Excellent — that is exactly why we change one thing at a time. Record it and retest. |
| Someone wants to enter real people's data | Stop. Invented names, invented amounts. |
| Time runs out | Drop the fix, not the edge case. A broken tool that is documented is worth more than a tidy-looking one that was never tested. |

## Differentiation

- **No device or account:** A paper prototype and the test cards. Exactly the same test log.
- **For learners who need structure:** Give them the cost-splitting example from the journal and ask them to change only the names and the amounts.
- **For learners ready to extend:** Ask them to write three tests the tool must pass *before* building it.
- **Language support:** The tool's labels can be requested in the learner's language. The test log stays in the course language.

## After the session

Note which edge case broke the most tools in the room — it will probably work again next time, and is worth promoting to the first card. If a learner built something they will genuinely use, ask them to report back next session on what happened when they tried to use it in real life.
