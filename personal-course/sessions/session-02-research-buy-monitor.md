# Session 2 — Buy With Confidence

**Time:** 90 minutes  
**Outcome:** A purchase brief you would trust with your own money, and a working agent that watches on your behalf, never buys anything, and that you will run for a week and bring back.

## Scenario

Pick one purchase you are genuinely weighing right now — a dishwasher, headphones, a phone, a flight, or a course. There is plenty of information about it, and most of it was written to sell. Today you reach a decision that rests on sources you opened yourself, not on a persuasive AI answer. Do not enter payment details or account information, and do not ask for personalised financial advice.

## Sequence

1. **Set the boundary (8 minutes).** Write what you need, what you are willing to spend, by when, what it must have, and what rules it out immediately. Add one sentence on what this research will *not* decide — for instance, it will not decide whether to buy at all this year.
2. **Plan the evidence (10 minutes).** Ask **Gemini Deep Research** for a research plan, not an answer: which kinds of sources to consult, which competing explanations exist, and what is still unknown. Claude or ChatGPT can produce the same plan. The report that comes back is a starting point — it points you at sources, it does not replace them.
3. **Compare the real offer (15 minutes).** Fill in an evidence matrix: the claim, the source and its date, whether it supports or contradicts, total cost, return and warranty terms, and what remains uncertain. Open the seller's page and the manufacturer's page yourself, and add one independent source. Work out the total cost rather than the headline price: delivery, installation, import duty, consumables, and extended warranty.
4. **Verify, then specify the agent (10 minutes).** Choose the two claims that would change your decision if they turned out to be wrong, and open the original source for each. That verification is what separates a brief resting on evidence from a brief resting on the tool's confidence. Then write the agent's specification: what it watches, which sources it may read, what triggers it, how often it runs, what it remembers so it does not alert twice about the same thing, when it stops on its own, and which action always stays with you. It tells you — it does not buy and it does not order.
5. **Build it and start it (10 minutes).** Pick a route below and get the agent actually running before you leave, on your specification. Then run it once, by hand or on a schedule, and write down what it did. **You will run it for a week and bring the run record to the next session** — what it caught, what it missed, what fired twice, and whether you would give it more access than you did today.

## Integrated artifact

Produce a one-page purchase brief: your question and limits, the evidence matrix, what remains uncertain, your verification notes, and the agent's specification plus its first run record. Whether and when to buy is your decision — not the tool's and not the agent's.

## Building the agent — three routes

The learning goal is to build a monitoring agent you can inspect and trust, not to give software permission to buy or decide for you. All three routes produce the same **agent run record**: what the agent watches, which public sources it may read, what triggers it, what it remembers so it does not repeat itself, what the expected alert looks like, where your approval is required, when it stops, and what happened in one test run.

### No-install route — a complete route, and the one most people take

Write the agent run record on paper or in your learning journal. Then ask Claude, ChatGPT, or Gemini to attack it: **“Act as a QA reviewer. Here is a specification for an agent that tracks a product price. Find triggers that are not unambiguous, cases where the same alert would be sent twice, situations where it is not stated when the agent stops, and any action that must stay under human approval. Do not recommend a product and do not make a purchase.”** Run the rule by hand once against two public product pages you saved, or against the snapshot your facilitator provides. Decide whether the agent should have alerted, stayed quiet, or stopped — and write down why.

### Minimal local lab — optional student installation

If you have a suitable machine and want hands-on work, install OpenClaw alongside Ollama with a local model. Start from public or mock product data, keep the model and the logs on your own machine, and run the agent manually once before you give it any schedule. A local log or a visible status screen is enough. Do not connect payment details, shopping accounts, personal files, or bank accounts, and do not enable automatic messaging. If the local model cannot use tools reliably, go back to the no-install route: the learning evidence here is the specification and the run review, not the installation.

### Advanced Adventure — optional student-owned cloud setup

If you already have an account with a model provider, you may connect OpenClaw to your own cloud model or API. Open a separate project and key for the course, set a low spending cap, keep the key out of your learning journal and any shared file, and test one agent against public data before you schedule it. The only permitted output is an alert or a draft. The agent does not buy, does not contact a seller, does not enter a financial account, does not trade, and does not make an investment recommendation. Note that a paid chat subscription and API credits are not necessarily the same thing — check the provider's current account terms before you connect.

## Optional resources

Every table for this session is in the [learning journal](../../site/assets/downloads/applied-ai-mastery-personal-journal-en.docx): the need table, the evidence matrix, the total-cost breakdown, and the alert behaviour table. Download it as a Word file and fill it in by hand or on screen — nothing else is needed. You can also work with ordinary search, on paper, with a free-access tool, or by watching the demonstration. No payment is needed.
