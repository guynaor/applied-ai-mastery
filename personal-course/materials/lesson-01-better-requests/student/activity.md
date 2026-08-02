# Lesson 1 — Ask Better, Get Better

**Time:** 30 minutes
**Goal:** Recognize the main AI layers, then turn a vague everyday request into a clear, reusable prompt and improve it through one controlled revision.

## Start here — AI geography (10 minutes)

Read [AI Geography — A 10-Minute Map](../../../../materials/shared/AF-REF-001-ai-geography.md).

Check that you can answer:

1. What is the difference between an LLM and an AI application?
2. Is a reusable set of workflow instructions a prompt, an artifact, or a skill?
3. Why does an agent need more permission review than a text-only answer?

The rest of this lesson uses an ordinary chat request. Later lessons will create artifacts and introduce workflows with more ability to act.

## The core idea

AI cannot reliably guess what matters to you. A useful request usually includes:

- **Goal:** what you need;
- **Context:** what the AI should know;
- **Constraints:** limits such as time, budget, tone, diet, location, or format;
- **Output:** what the answer should look like;
- **Check:** how the answer should expose uncertainty or missing information.

A good prompt does not need to be long. It needs to remove the ambiguity that would change the answer.

## Your task

Choose one real request from your life. Examples:

- plan three quick dinners from ingredients you already have;
- create a study plan for an exam;
- draft a polite message to a landlord;
- suggest a weekend activity for a group with different budgets;
- organize a messy to-do list.

Do not include passwords, account numbers, identity documents, medical records, or private information about another person.

## Step 1 — Write the vague version

Write the request exactly as you might normally ask it.

> Example: Help me plan my week.

Save this as **Prompt A**.

## Step 2 — Diagnose what is missing

Complete this quick checklist:

| Question | Your answer |
|---|---|
| What outcome do I actually need? | |
| What context changes the answer? | |
| What constraints are non-negotiable? | |
| What format would be easiest to use? | |
| What should the AI ask before guessing? | |

## Step 3 — Build Prompt B

Use this pattern:

> I need help with **[goal]**.  
> Relevant context: **[context]**.  
> Constraints: **[constraints]**.  
> Give me the result as **[output format]**.  
> Before answering, identify any missing information that could materially change the result. Do not invent details.

Run Prompt A and Prompt B in the same AI system.

## Step 4 — Compare the outputs

Score each output from 1–5:

| Criterion | Prompt A | Prompt B |
|---|---:|---:|
| Useful immediately | | |
| Matches my constraints | | |
| Easy to act on | | |
| Avoids unsupported assumptions | | |
| Shows missing information | | |

Write one sentence explaining the biggest difference.

## Step 5 — Make one controlled revision

Change exactly one element of Prompt B: context, constraint, output format, or verification instruction. Run it again as **Prompt C**.

Record:

- what you changed;
- why you changed it;
- whether the result improved;
- what still required your judgment.

## Digital-life habit

Save your final prompt in a note titled `Reusable AI Prompts`. Add a short label such as `weekly planning`, `polite message`, or `study plan`. Do not save sensitive personal data inside the template.

## Completion check

You are done when you have:

- Prompt A, Prompt B, and Prompt C;
- a comparison table;
- one controlled change;
- one reusable prompt saved without sensitive data;
- a one-sentence rule you want to remember.

Suggested rule: **Give AI the information that changes the answer, not every detail you know.**
