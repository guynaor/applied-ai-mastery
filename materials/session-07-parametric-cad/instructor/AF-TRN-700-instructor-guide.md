# Instructor Guide — Mission 7: Parametric CAD

**Recommended duration:** 120–150 minutes  
**Student role:** AI Systems Engineer  
**Primary outcome:** The student can convert measurable interfaces into a parametric OpenSCAD model, test parameter changes, and document what remains physically unverified.

## Before the lesson

Install or open OpenSCAD and verify the starter file renders. Open the design brief, design contract, validation log, answer key, and rubric. Prepare a ruler or caliper if physical measurement is part of the lesson. A printer is optional; the model can be validated digitally first.

The instructor does not need to be an expert CAD designer, but should understand parameters, constraints, clearances, wall thickness, print orientation, and the difference between rendering and physical validation.

## Teaching objectives

The student should be able to:

1. translate prose requirements into named dimensions and constraints;
2. distinguish measured, specified, assumed, and derived values;
3. change geometry through parameters rather than scattered constants;
4. test extreme and nominal parameter combinations;
5. identify collision, thin-wall, unsupported-feature, and fit risks;
6. document validation evidence and unresolved physical assumptions.

## Lesson plan

### 0–15 min — Start from interfaces

Ask: “What must this bracket fit, touch, avoid, and support?” Build a list of interfaces before discussing shape. Explain that good parametric design begins with relationships and constraints, not decoration.

### 15–35 min — Complete the design contract

For each parameter, require name, unit, source, allowed range, default, and effect on geometry. Mark values as measured, specified, assumed, or derived.

Checkpoint: every critical dimension should have one source of truth and a clear unit.

### 35–55 min — Read the starter model

Walk through parameters, modules, constructive operations, and preview/render behavior. Ask the student to predict which geometry changes when each parameter is modified before running the model.

### 55–82 min — Implement or refine the bracket

Have the student change only parameters first, then edit geometry where the brief requires. Encourage small iterations and frequent rendering. Require meaningful parameter names and comments for non-obvious calculations.

Instructor questions:

- Is this value a requirement or an assumption?
- What happens when the device width changes?
- Does the hole remain inside printable material?
- Which dimension controls clearance?

### 82–105 min — Validation matrix

Test at least nominal, minimum, maximum, and one deliberately problematic configuration. Record render result, wall thickness, clearances, hole placement, overhang concerns, and expected print orientation.

Explain that a successful render proves syntactic and geometric validity, not fit, strength, or printability.

### 105–120 min — Review and handoff

The student explains the model to another person using the design contract and validation log. Ask what must be measured or printed before approval.

For a longer session, use the remaining time for a low-resolution draft print or slicer inspection.

## Likely difficulties and interventions

**Difficulty:** Hard-coding dimensions in multiple places.  
**Intervention:** Require one named parameter and derived expressions.

**Difficulty:** Treating visual appearance as validation.  
**Intervention:** Ask for a measurable pass/fail criterion.

**Difficulty:** Changing several dimensions without recording why.  
**Intervention:** Use the validation log for each controlled test.

**Difficulty:** Assuming nominal fit equals printable fit.  
**Intervention:** Discuss tolerances, printer variation, orientation, and material behavior.

## Discussion prompts

- What makes a CAD model genuinely parametric?
- Which requirements cannot be validated in OpenSCAD alone?
- When is an assumed clearance acceptable?
- How should AI-generated geometry be reviewed before printing?

## Minimum acceptable evidence of learning

The model renders, critical dimensions are parameterized, the design contract identifies sources and assumptions, at least four configurations are tested, and the validation log distinguishes digital checks from physical verification.

## Extension

Ask the student to add one optional feature—such as cable relief or alternate mounting holes—without breaking existing defaults. The feature must be controlled by a clearly named parameter.

## Fallback plan

If OpenSCAD is unavailable, teach the design contract and validation matrix using sketches and dimensional reasoning. The student can still identify parameters, relationships, risks, and test cases.
