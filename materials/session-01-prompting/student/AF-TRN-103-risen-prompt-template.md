# AF-TRN-103 — RISEN Prompt Template

Copy this template and replace the bracketed fields.

```text
ROLE
Act as [specific expert role appropriate to the task].

INPUT CONTEXT
Use only the attached or pasted source material as factual evidence.
The source is [describe document, data, measurements, and scope].

TASK AND STEPS
1. Restate the decision or problem in one sentence.
2. Extract the relevant facts from the source.
3. Separate facts from plausible inferences.
4. Identify missing evidence and uncertainty.
5. Produce the requested analysis or recommendation.
6. Check the result against every requirement before finalizing.

EXPECTED OUTPUT
Return:
- [required section or table 1]
- [required section or table 2]
- [required section or table 3]

NEGATIVE CONSTRAINTS
- Do not invent measurements, events, sources, or test results.
- Do not present an inference as a confirmed fact.
- Do not claim safety, compliance, or root cause without adequate evidence.
- Do not add generic introductory or concluding text.
- Clearly label assumptions and missing information.
```

## Final inspection questions

Before accepting the output, ask:

1. Did the model obey the requested format?
2. Which statements are directly supported by the source?
3. Which statements are reasonable inferences?
4. Did it invent any measurements or certainty?
5. What information should be gathered next?
6. Would another qualified reviewer understand how the conclusion was reached?