# Full session plan — Session 6: Solve a Recurring Problem

**Time:** 90 minutes
**Learning outcome:** Learners build a solution to the same problem twice — a tiny version in chat and a real one in Lovable or Manus — test each against a normal case and an edge case, and can explain when the tiny version is enough.
**Session artifact:** Two versions (or one plus a description of the other) and a test log: the problem, the permitted actions, the normal case, the edge case, and a sentence on which will still be in use in a month.

**This session runs 90 minutes.** The extra time is questions, and they are heaviest here — this is the session where people discover they can build software.

## Send before the session — sign up for one platform

**Send this to learners at least a day ahead.** If sign-up happens in the lesson, you have lost twenty minutes.

There are two options, and the choice is about **what you are building**, not which is better:

| Platform | Suits | Note |
|---|---|---|
| [Lovable](https://lovable.dev) | A **web** app — opens in a browser, has an address you can send | Generous free tier, no credit card |
| [Manus](https://manus.im) | An **installable app with accounts** — a PWA added to the home screen, with a backend and sign-in | Check its current free allowance before the session |

The message to send:

> Before the next session, open a free account on one of two: lovable.dev if you want to build a web app, or manus.im if you want an app you can install on your phone with sign-in. Sign up with Google or an email address, no credit card. If payment details are required just to start, stop and pick the other one. Open one empty project to check it works. If you cannot, that is fine — you will be able to watch and do everything else.

**Learners already met Manus in Session 2**, as a managed agent platform. It is worth naming that: same platform, different job. That is a lesson in itself — the line between "a tool that does something for me" and "a tool that builds something for me" is blurrier than it looks.

**Try both platforms yourself in the week before.** Free tiers change without notice, and that is the one thing that can break this session.

## Session materials

| Material | What it is for |
|---|---|
| [Projection slides](../../instructor/samples/session-06-slides.html) | Ten slides, in session order. |
| [Test cards](../../instructor/samples/session-06-test-cards.html) | Ready-made edge cases. Remotely, paste the link into the chat. |
| [Learning journal](../../../site/assets/downloads/applied-ai-mastery-personal-journal-en.docx) | The definition table, the revision log, and the test table. |
| [Session 6 brief](../../sessions/session-06-build-personal-tool.md) | What learners see. |

## The recommended way: your own real problem, on your screen

As in earlier sessions — **take a real recurring problem of your own and build the solution live in front of the class.** Here there is an extra reason: these platforms burn through a free quota fairly quickly, and if everyone builds separately some will stall halfway. When the heavy building runs on your account, nobody gets blocked.

Learners build the tiny version themselves — it is cheap — and fill in the journal for their own problem. You run the platform; they propose what to ask for.

### What to ask before every request

- "What do you think it will build?" before it builds.
- "What is missing from my request?" They will find it.
- "What am I not willing to let this tool store?"

### What to highlight when it comes back

- **Open it immediately and click something.** Do not settle for what the tool shows you on screen.
- **Hunt for what it added that you did not ask for** — both platforms almost always add screens and features. That is convenient and dangerous.
- **Fix one thing in front of them** and re-run.

## Start slow things in the background

A build on one of these platforms takes minutes, not seconds. **Send the request, then talk** — do not stand in front of a progress bar. In this session: at minute 45, send the platform request and move on to discussing the tiny version's test results while it builds.

The same rule applies to anything slow: a detailed spreadsheet, a presentation, or an application. Send, keep going, come back.

## Session map

| Time | What happens | What learners produce |
|---:|---|---|
| 0–10 | **Homework discussion** | What broke for other people |
| 10–20 | Shrink it: one user, at most three actions | A definition you can build from |
| 20–35 | Tiny version in chat, and downloading it to run locally | A tool that runs on their own machine |
| 35–45 | Normal case, then an edge-case card | A test log with expected against actual |
| 45–70 | A real application in Lovable or Manus (sent at minute 45) | The difference between a prototype and an application |
| 70–80 | Test the application, and decide what is enough | What is stored where, and who can open it |
| 80–90 | Control, exit check, and homework | A reasoned choice between the two |

## 0–10 minutes — Homework discussion

Three questions, in this order: **Who managed it? Who did it not work for, and where did it get stuck? What surprised you?**

The second is the important one. If nobody answers, tell them about something that got stuck for you.

In this session it is also worth asking: **"Who managed to open an account, on which platform, and who got stuck?"** That tells you immediately who to pair up.

## 10–20 minutes — Shrink it

Show [slide 2](../../instructor/samples/session-06-slides.html). Each learner fills in the journal: who the user is, what the problem is, at most three actions, what is forbidden.

### What to say

> "Every fourth action you add costs you a test you will not have time to run. And that is doubly true today, because we are building the solution twice."

## 20–35 minutes — The tiny version

Show the request on [slide 3](../../instructor/samples/session-06-slides.html) and run it in Claude Artifacts. **Here learners do build for themselves** — it is fast and cheap on quota.

### Getting it out of the tool

The artifact runs inside the preview pane, but to actually use it you need it as a file. Show this:

1. Download the artifact, or copy the code into a file called `tool.html`.
2. Open it in a browser by double-clicking. It should run with no internet.
3. **If something is missing or broken** — usually it is an external file that did not come down with it.

The prompt to fix it:

> The file runs locally but not everything works. Change it so everything is in one file — no link to an external library, no font from the internet, no remote image. If something external is needed, replace it with something simple and local.

### The moment that matters

Show [slide 4](../../instructor/samples/session-06-slides.html) and the three questions about the code: where the data is stored, what happens with unexpected input, and whether anything leaves for the internet. Search the code for `fetch`, `http`, and `localStorage`.

## 35–45 minutes — Testing

Show [slide 5](../../instructor/samples/session-06-slides.html). The **normal case** first, and only when it passes, a [test card](../../instructor/samples/session-06-test-cards.html) each.

**At exactly minute 45, send the platform request** and let it build while you carry on discussing the results.

### What to say

> "A card that broke the tool is a test that succeeded. We are looking for the limit, because without it you will not know when to stop trusting it."

## 45–70 minutes — The real application

The request you sent at minute 45 is under way. While it runs, ask: "What will be different between this and what we already built?"

Demonstrate whichever platform most of the class signed up for. If the group is split, demonstrate one and ask someone who chose the other to report at the end on what came out differently. That comparison is worth more than a double demonstration.

### The request — the same one on either platform

> Build an application for splitting costs between three flatmates. One screen to add an expense — who paid, how much, what for — and one screen showing how much each person owes. The data should persist between visits. No user login, no real payments, and do not store bank details. Keep it as simple as possible.

**In Manus**, add at the end: "Build this as an installable PWA with user accounts, so each flatmate signs in and they all see the same shared data. It should work well on a phone screen." That changes the result substantially — phone-sized layout, a sign-in screen, and data on a server rather than in the browser.

**Why a PWA and not a real phone app.** Putting a native app on an iPhone needs an Apple developer account, signing, and review — none of which belongs in a 90-minute session. A PWA sidesteps all of it: it opens in the browser, and on a phone you add it to the home screen where it behaves like an app. On iPhone that is Safari, then Share, then **Add to Home Screen**. On Android, Chrome offers **Install app**. Show this on your own phone if you can — it is the moment the thing stops feeling like a web page.

### What is different here, and why it matters

| | The tiny version in chat | Lovable | Manus |
|---|---|---|---|
| What you get | One file on your machine | A web app with an address | An installable PWA with sign-in |
| The data | Disappears on refresh | Persists | Persists on a server, per account |
| Who can see it | Only you | Anyone with the link | Only people you invite, once signed in |
| Getting it on a phone | Not really | Bookmark the link | Add to Home Screen, behaves like an app |
| What you understand | Every line | Some | Less — there is now a backend |
| Added unasked | Nothing | A lot | A lot, including a whole sign-in flow |

**That last row is the heart of it.** Both platforms almost always add screens and features. Show it: "I asked for two screens. How many are here?"

### One change

Ask for one change — say, "add a button to reset the month". This is where the real difference shows: in chat you get a new file; on a platform it modifies an existing application and sometimes breaks something else.

### If the platform fails or the quota runs out

It happens. Say so out loud, carry on with the tiny version, and ask learners to record in the journal what **would** have been different. The comparison is the learning, not the application.

## 70–80 minutes — Test the application and decide

Run the same test cards against the application. Empty field, zero, text where a number goes.

Then the question that closes the session: **"Which of the two will you actually use?"**

For most people the answer is the tiny version, and that is a correct answer. A real application is only worth more if you use it.

Show [slide 8](../../instructor/samples/session-06-slides.html): where it is stored, who opens it, how it is cleared, when to stop.

**Manus raises a question the others do not.** Once there is sign-in and a backend, there are real accounts holding real data on somebody else's server. Ask the group: whose accounts are those? What happens to the data if you stop using the platform, or stop paying? Can you get it out? Nobody has to answer perfectly — the point is that a tool which persists other people's data has obligations a single HTML file never had.

## 80–90 minutes — Exit check and homework

[Slide 10](../../instructor/samples/session-06-slides.html):

> My tool does **[one action]**. It breaks when **[the edge case]**. I will actually use **[which version]** because **[why]**.

### The homework

"Before next session, genuinely use one of the versions, at least twice. **I will ask at the start what did not work** — especially if you stopped using it, and why."

### Quick assessment rubric

| Evidence | Not yet | Ready |
|---|---|---|
| The definition | "A tool to help me get organised" | One user, one problem, at most three actions |
| Testing | "I tried it, it works" | Expected against actual, both cases, both versions |
| Understanding the difference | "The platform is better" | Can say what is stored where, and what was added unasked |
| The decision | "I'll use both" | Picked one, and can explain why |

## Equivalent tool routes

**Claude Artifacts (default for the tiny version):** Fast, runs immediately, cheap on quota.
**ChatGPT / Gemini:** Ask for one self-contained HTML file and download it.
**Lovable:** For a web application. Free tier, no credit card.
**Manus:** For an installable PWA with sign-in and a backend. Check the current free allowance first.
**Without either:** Watch the demonstration and fill in the comparison table. The learning is fully preserved.
**Paper:** Sketch the screens and run the test cards against them.

## Troubleshoot without losing the lesson

| Situation | Facilitator response |
|---|---|
| A learner could not open an account | Pair them with someone who did, or they watch. No learning gap. |
| Half the class on Lovable, half on Manus | Demonstrate one, and ask the other half to report what came out differently. |
| The platform's quota runs out midway | Which is why the demonstration runs on your account. Carry on with the comparison. |
| The platform built something enormous | Excellent — that is exactly what we wanted to show. Count how many screens nobody asked for. |
| The local file will not run | The prompt in the download section. |
| Someone wants to enter real people's data | Invented names, invented amounts. Always. |
| Questions overrun | That is why there are 90 minutes. If you must cut, shorten the platform stage, not the testing. |
| Time runs out | Drop the change on the platform. Not the comparison, and not the decision. |

## Differentiation

- **Remote:** One shared screen for the platform, independent building for the tiny version.
- **No device:** A paper prototype and the test cards.
- **For learners who need structure:** The cost-splitting example from the journal, changing only the names.
- **For learners ready to extend:** Install the PWA on an actual phone and try it where you would really use it — in the kitchen, at the shop. A tool that is awkward one-handed is a tool nobody uses.

## After the session

Note who chose the tiny version, who chose Lovable, and who chose Manus, and why. Next session, ask who is still using theirs — that is the real answer, and it is almost always a surprise. If either platform has changed its interface or free tier, update the sign-up message above before you send it again.
