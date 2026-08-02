# Step-by-Step Instructor Script — Mission 1: Advanced Prompting and Model Selection

**Duration:** 100–120 minutes  
**Student role:** Junior AI Assistant  
**Instructor goal:** Teach the student to distinguish evidence from assumption, compare two AI systems fairly, and improve one structured prompt through a controlled revision.

## Essential definitions

- **Fact:** A statement directly supported by the supplied source memo.
- **Assumption:** A statement introduced because information is missing; it may be reasonable but is not established.
- **Hypothesis:** A testable possible explanation for an observed problem.
- **Hallucination:** Content presented by an AI system without support in the supplied evidence.
- **Prompt constraint:** A rule that limits what the model may claim or how it must structure the response.
- **Controlled revision:** Changing one meaningful prompt element while keeping the remaining prompt stable, so the effect of the change can be evaluated.
- **RISEN:** Role, Instructions, Steps, End goal, and Narrowing.

## Before the student arrives

1. Open the student mission guide, source memo, comparison worksheet, RISEN template, answer key, and rubric.
2. Confirm access to two AI systems.
3. Prepare a blank shared document for saving both full responses.
4. Read the source memo and note the three most important missing measurements.
5. Do not prepare a “correct root cause.” The exercise is about bounded reasoning, not solving the pump failure.

## Opening script — 0 to 8 minutes

Say:

> “Today you are not trying to prove that one AI is smartest. You are learning how to give two systems the same evidence, inspect how they reason, and prevent a polished answer from sounding more certain than the evidence allows.”

Ask:

1. “What is the danger of a technically plausible answer?”
2. “What is the difference between a hypothesis and a conclusion?”

Expected ideas:

- Plausible does not mean supported.
- A hypothesis is provisional and should be testable.
- A conclusion requires enough evidence to rule alternatives in or out.

Correct gently if the student says the AI can determine the cause from the memo. State that the memo is intentionally incomplete.

## Source inspection — 8 to 22 minutes

1. Have the student read the memo silently.
2. Ask them to mark each sentence as one of:
   - observed fact;
   - interpretation;
   - missing information;
   - ambiguous wording.
3. Require at least three missing measurements before any AI tool is opened.

Ask these prompts one at a time:

- “Which sentence is strongest evidence?”
- “Which statement sounds useful but is vague?”
- “What measurement would most reduce uncertainty?”
- “What conclusion would be unsafe right now?”

Do not supply answers immediately. When the student offers a missing item, ask how that item would distinguish between hypotheses.

Checkpoint: the student must acknowledge that no confirmed root cause is available.

## Build the initial RISEN prompt — 22 to 38 minutes

Open the RISEN template. Explain each element:

1. **Role:** Sets relevant expertise and perspective, but does not grant facts.
2. **Instructions:** Defines the required work products.
3. **Steps:** Controls the reasoning and output sequence.
4. **End goal:** States what decision or deliverable the response should support.
5. **Narrowing:** Prevents overclaiming and identifies prohibited behavior.

Have the student draft the initial prompt. It must request:

- a table of facts;
- labelled hypotheses;
- two genuine structural or mechanical modifications;
- a separate measurement and validation plan;
- explicit uncertainty;
- no confirmed-root-cause claim.

Instructor check: instrumentation may appear in the measurement plan, but it does not count as a structural or mechanical modification.

Ask the student to read the complete prompt aloud. If the prompt contains vague phrases such as “analyze thoroughly,” ask: “What visible output would prove that instruction was followed?”

## Run the same prompt in two systems — 38 to 55 minutes

1. Paste the complete memo and the exact same RISEN prompt into Model A.
2. Save the complete response.
3. Repeat without changing any wording in Model B.
4. Save the complete response.

Say:

> “Fair comparison requires changing the model, not the task.”

If one model asks a clarifying question, preserve that behavior as part of the comparison rather than answering differently for only one model.

## Evidence-based comparison — 55 to 75 minutes

Use the worksheet row by row. For every judgment require a quotation, paraphrase, or precise reference.

Ask:

- “Where did the model separate facts from assumptions?”
- “Which claim lacks a source in the memo?”
- “Did it provide two actual design changes?”
- “What proposed test could disprove its preferred hypothesis?”
- “Which response is easier for an engineer to audit?”

Reject unsupported statements such as “Model B is better because it sounds clearer.” Ask what concrete feature made it clearer and whether that feature improved reliability.

## One controlled revision — 75 to 92 minutes

Tell the student to identify one remaining weakness in the initial prompt. Examples include:

- hypotheses are not ranked by evidence;
- assumptions are not tied to affected recommendations;
- tests lack expected outcomes;
- modifications lack validation criteria.

The student changes exactly one meaningful prompt element. They record:

- original wording;
- revised wording;
- reason for the change;
- expected effect.

Run the revised prompt once in one selected system.

Ask: “Did the targeted behavior improve? What evidence shows that?”

Do not allow a complete rewrite. The purpose is causal learning from one revision.

## Debrief — 92 to 105 minutes

Ask the student to answer verbally:

1. “Which output was most useful, and for what exact reason?”
2. “What important claim still cannot be made?”
3. “Which three measurements should be requested next?”
4. “What did the prompt control, and what did it fail to verify?”

Emphasize:

> “A prompt can improve structure and caution. It cannot manufacture missing evidence.”

## Minimum acceptable submission

The student submits:

- one initial RISEN prompt used unchanged in two systems;
- both saved responses;
- completed comparison worksheet with concrete examples;
- one controlled prompt revision;
- one revised response;
- a bounded conclusion and three next measurements.

## Intervention guide

- **Student guesses the root cause:** Ask which memo statement proves it and what alternative remains possible.
- **Student prefers the most fluent model:** Redirect to traceability, uncertainty, and testability.
- **Student counts monitoring as a design change:** Move it to the measurement plan and require a physical modification.
- **Student rewrites the whole prompt:** Restore the initial version and permit one recorded change only.
- **Student is overwhelmed:** Compare only facts, assumptions, and proposed tests first, then return to other criteria.

## Exit check

The student must explain, without reading notes:

- the difference between fact, assumption, and hypothesis;
- why identical prompts matter in a model comparison;
- why a better prompt does not make an unsupported answer true.