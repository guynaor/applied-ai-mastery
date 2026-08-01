# Mission 1 — Diagnose Better AI Work

**Your role:** Junior AI Assistant  
**Manager:** Sarah Chen, Engineering Manager  
**Estimated working time:** 90–120 minutes

## Your assignment

AquaForge has received an incomplete failure memo about the HydroSense HX-200 coolant-pump assembly. Management does not yet have enough evidence to identify the root cause.

Your job is not to guess the answer. Your job is to use AI carefully, compare how different systems reason from the same evidence, and produce a stronger reusable prompt.

By the end of the mission, you should be able to show which parts of an AI response came from the memo, which parts were assumptions, and what additional evidence would be needed before making an engineering decision.

## Files you will use

1. [Source memo](AF-TRN-101-source-memo.md)
2. [Model-comparison worksheet](AF-TRN-102-model-comparison-worksheet.md)
3. [RISEN prompt template](AF-TRN-103-risen-prompt-template.md)

You will also need access to at least two AI systems. Use the same source memo and the same first prompt in both systems.

## Part 1 — Read before prompting

Open the source memo and identify:

- facts directly stated in the memo;
- missing measurements or observations;
- words that are ambiguous;
- conclusions that would be unsafe to make from the available evidence.

Write at least three missing pieces of information in your worksheet before asking an AI system anything.

## Part 2 — Run the same basic prompt twice

Give the complete source memo to two AI systems and ask each one to:

- summarize the known facts;
- list plausible failure hypotheses;
- recommend two structural or mechanical modifications;
- recommend measurements or tests;
- clearly label assumptions and uncertainty.

Use exactly the same prompt in both systems. Save the complete responses or paste the important sections into your working document.

## Part 3 — Compare the responses with evidence

Complete the model-comparison worksheet. Do not write only “Model A was better.” For each judgment, quote or closely reference a specific part of the response.

Check whether each model:

- followed the requested structure;
- kept facts separate from assumptions;
- invented measurements, causes, or certainty;
- proposed two actual design modifications rather than substituting monitoring for a modification;
- recommended useful tests;
- explained what evidence could disprove its preferred hypothesis.

## Part 4 — Build a RISEN prompt

Use the RISEN template:

- **Role:** Who should the AI act as?
- **Instructions:** What exact work must it perform?
- **Steps:** In what order should it reason and respond?
- **End goal:** What decision or deliverable should the response support?
- **Narrowing:** What must it avoid, label, or treat as uncertain?

Your improved prompt must require:

1. a fact table;
2. clearly labelled hypotheses;
3. two genuine structural or mechanical modifications;
4. a separate measurement and validation plan;
5. explicit uncertainty;
6. no claim of a confirmed root cause.

## Part 5 — Test and revise once

Run the improved RISEN prompt in one of the AI systems.

Then identify one remaining weakness. Change one meaningful part of the prompt and run it again. Record:

- what you changed;
- why you changed it;
- what improved;
- what still requires human engineering judgment.

## What to submit

Submit:

- the completed model-comparison worksheet;
- your final RISEN prompt;
- one short paragraph explaining which AI response was more useful and why;
- one short paragraph describing an important claim that still cannot be made from the evidence;
- the three most valuable additional measurements or observations you would request next.

## Completion check

Before marking the mission complete, confirm that:

- you used the same initial prompt in both systems;
- every comparison judgment has a concrete example;
- you separated design modifications from instrumentation;
- you did not present a hypothesis as a confirmed cause;
- your final prompt can be reused on another incomplete technical report.

## Important boundary

A polished answer is not the same as a verified answer. The source memo is intentionally incomplete. Strong work makes those limits visible instead of hiding them.