# Session 2 — Buy With Confidence

**Time:** 45–60 minutes  
**Outcome:** Research one meaningful purchase and define a monitor that cannot buy anything for you.

## Scenario

You need a product that matters enough to compare carefully—perhaps headphones, a household appliance, or a course-related purchase. You want to decide with evidence, not an attractive AI answer. Do not enter payment details, account information, or request personalised financial advice.

## Sequence

1. **Set a boundary (8 minutes).** State the need, budget, criteria, date by which you need it, and what this research will not decide.
2. **Plan the evidence (12 minutes).** Use **Gemini Deep Research** to request a research plan: useful source types, competing explanations, and unknowns. Claude or ChatGPT can organise the same plan. The report is a starting point, not evidence.
3. **Compare the real offer (15 minutes).** Build an evidence matrix: claim, source, date, support or contradiction, total cost, returns/warranty, and uncertainty. Inspect original seller and manufacturer terms, plus an independent source where useful.
4. **Pause before action (10 minutes).** Independently verify the consequential claims. Write a safe alert specification: target, allowed sources, threshold, frequency, duplicate suppression, expiry, and a pause/stop rule. It must never purchase, trade, or send payment details.

## Integrated artifact

Create a purchase research brief with your question and limits, evidence matrix, uncertainty log, verification notes, and a pauseable alert specification. You—not AI or an alert—choose whether and when to buy.

## Unattended Agent Lab (optional)

The learning goal is to build and review a dependable monitor, not to give software permission to buy or decide for you. Every route creates the same **agent run record**: target, allowed public sources, trigger, saved state/duplicate rule, expected alert, human approval point, stop rule, and one test result.

### No-install route — everyone can do this

Write the agent run record on paper or in your journal. Use Claude, ChatGPT, or Gemini to challenge the specification with: **“Act as a test reviewer. Here is my shopping-monitor specification. Find unclear triggers, duplicate-alert risks, missing stop conditions, and any action I must keep under human approval. Do not recommend a product or make a purchase.”** Run it once using two saved public product pages or a teacher-provided snapshot. Decide whether it should alert, remain silent, or stop, then record why.

### Minimal local lab — optional student installation

If your device is suitable and you want a hands-on lab, install OpenClaw and Ollama with a local model. Start with public or mock product data, keep the model and logs on your own device, and run the monitor manually once before adding any schedule. Use a local log or visible dashboard; do not add payment details, shopping accounts, private files, financial accounts, or automatic messages. If the local model gives unreliable tool results, return to the no-install route—the learning evidence is the specification and run review, not the installation.

### Advanced Adventure — optional student-owned cloud setup

Students who already own a provider account may connect OpenClaw to their own cloud/API model. Create a separate project/key, set a small spending limit, save no key in the journal or shared work, and test a single public-data monitor before scheduling it. Use an alert/draft only. Your agent may never purchase, contact a seller, access a financial account, trade, or make an investment recommendation. A paid chat subscription and API credits are not always the same thing; check the provider's current account rules before connecting.

## Optional resources

For deeper practice only: [comparison workbook](../materials/lesson-04-online-buying/student/comparison-workbook.md), [alert specification](../materials/lesson-05-deal-alerts/student/alert-specification.md), and [research workbook](../materials/lesson-08-investment-research/student/research-workbook.md). Public search, paper notes, a free-access tool, or observation are valid routes; no payment is needed.
