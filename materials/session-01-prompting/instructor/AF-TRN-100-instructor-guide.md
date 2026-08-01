# Instructor Guide — Mission 1: Advanced Prompting and Model Selection

**Recommended duration:** 105 minutes  
**Student role:** Junior AI Assistant  
**Primary outcome:** The student can use a structured prompt, compare model outputs with evidence, and make one controlled revision without confusing confidence with verification.

## Before the lesson

Prepare two currently available AI systems. Confirm both accept the complete source memo. Open the student mission guide, source memo, comparison worksheet, RISEN template, answer key, and rubric. Do not pre-solve the engineering problem for the student; the central lesson is recognizing that the evidence is insufficient for a confirmed root cause.

Have a blank document ready for saving both model outputs. Decide in advance how the student will identify the systems: Model A and Model B is preferable to turning the exercise into a brand debate.

## Teaching objectives

By the end, the student should be able to:

1. distinguish source facts, reasonable hypotheses, assumptions, and unsupported claims;
2. explain why the same prompt can produce materially different responses;
3. use RISEN to constrain a technical task;
4. identify instrumentation as validation rather than a structural modification;
5. revise exactly one prompt element and judge the effect.

## Lesson plan

### 0–10 min — Frame the mission

Say: “Today the goal is not to diagnose the pump. The goal is to determine what AI can and cannot responsibly conclude from incomplete evidence.”

Ask the student to predict two ways an AI system might sound convincing while being wrong. Record the answers and return to them during the debrief.

### 10–22 min — Evidence-first reading

Have the student read the memo without using AI. Ask them to mark:

- direct observations;
- missing measurements;
- ambiguous wording;
- claims that would require additional evidence.

Checkpoint: the student should identify at least three missing observations before prompting. Do not provide the list immediately. Use questions such as “What would you need to measure before accepting that explanation?”

### 22–35 min — Build the initial RISEN prompt

Walk through the five RISEN elements. Require a fact table, labelled hypotheses, two genuine mechanical or structural changes, a separate validation plan, explicit uncertainty, and no confirmed root-cause claim.

Instructor emphasis: the prompt should control the output structure and evidentiary boundaries, not tell the model which cause to prefer.

### 35–50 min — Run the same prompt in two systems

The student must use identical source text and prompt. Save the full responses. Do not allow prompt repair between systems, since that would invalidate the comparison.

While the systems run, ask the student what would count as a meaningful difference rather than a stylistic difference.

### 50–72 min — Evidence-based comparison

Use the worksheet. For every judgment, require a concrete excerpt or close reference. Challenge vague statements such as “Model A was smarter.” Replace them with questions:

- Which instruction did it follow better?
- Where did it introduce an assumption?
- Did it provide two actual design changes?
- Which proposed test could falsify a hypothesis?

### 72–88 min — One controlled revision

The student chooses one weakness and changes one meaningful prompt element only. Examples: tighten the definition of a design modification, require a confidence label, or demand a hypothesis-to-test mapping.

Run the revised prompt once in one system. Compare only the effect of that one change. Penalize wholesale rewriting because it prevents causal learning.

### 88–100 min — Debrief

Discuss:

- Which model was more useful, and for what specific reason?
- Which polished statement was least justified?
- What evidence would change the recommendation?
- What still requires an engineer rather than an AI system?

### 100–105 min — Exit check

Ask the student to explain, without notes, the difference between a hypothesis, a design modification, and a measurement plan.

## Likely student difficulties and interventions

**Difficulty:** Treating plausible language as evidence.  
**Intervention:** Ask the student to point to the exact memo sentence supporting the claim.

**Difficulty:** Counting sensors or monitoring as a mechanical modification.  
**Intervention:** Ask, “Does this change the pump’s structure or mechanics, or only help us observe it?”

**Difficulty:** Comparing brands rather than outputs.  
**Intervention:** Require every claim to reference an instruction, excerpt, omission, or unsupported inference.

**Difficulty:** Rewriting the whole prompt during revision.  
**Intervention:** Make the student state the single variable being changed before editing.

## Questions that deepen the lesson

- Can a response be useful even when its preferred hypothesis is wrong?
- When is asking for a confidence score misleading?
- How might two models repeat the same unsupported assumption?
- What would a safe engineering recommendation look like when evidence is incomplete?

## Minimum acceptable evidence of learning

The student has two comparable outputs, a completed evidence-based worksheet, one initial RISEN prompt, one controlled revision, and a clear statement of what cannot yet be concluded.

## Extension activity

Give the student a short incomplete report from another domain. Ask them to reuse the final prompt with only domain-specific substitutions, then identify which parts of the prompt generalized successfully.

## Fallback plan

If one AI service is unavailable, run the same prompt twice in one system using separate clean conversations and compare variability. Clearly explain that this tests consistency rather than cross-model differences.
