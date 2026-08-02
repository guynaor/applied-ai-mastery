# Step-by-Step Instructor Script — Mission 7: Parametric CAD

**Duration:** 130–160 minutes  
**Student role:** AI Systems Engineer  
**Instructor goal:** Teach the student to convert measurable interfaces and constraints into a parametric OpenSCAD model, then validate geometry without confusing a successful render with a proven physical design.

## Essential definitions

- **Interface:** A surface, hole, clearance, fastener, or neighboring component that constrains the design.
- **Design contract:** A structured list of dimensions, units, allowable ranges, relationships, assumptions, and validation rules.
- **Parameter:** A named input that controls geometry.
- **Constraint:** A required relationship or limit, such as minimum wall thickness or hole spacing.
- **Derived dimension:** A value calculated from other parameters rather than entered independently.
- **Clearance:** Intentional space allowing assembly, movement, or manufacturing variation.
- **Interference:** Unwanted overlap between parts.
- **Render validation:** Confirmation that the model compiles and appears geometrically coherent.
- **Physical validation:** Confirmation through measurement, fitting, loading, or testing of a manufactured part.

## Preparation

1. Install or open OpenSCAD.
2. Open the design brief, design-contract template, starter model, validation log, answer key, and rubric.
3. Render the starter once so tool problems are separated from student design problems.
4. Prepare a simple ruler or caliper demonstration if available.
5. Do not redesign the bracket for the student.

## Opening — 0 to 10 minutes

Say:

> “CAD begins before code. First we identify what the part must connect to, what must remain clear, and which dimensions are known versus assumed.”

Ask: “What is more dangerous: a syntax error or a beautifully rendered part based on the wrong interface?” Expected answer: the wrong interface, because it can look complete while being unusable.

## Read the design brief as an interface problem — 10 to 28 minutes

Have the student extract:

- mounting surface;
- device envelope;
- hole and fastener requirements;
- cable or service clearance;
- load direction;
- manufacturing assumptions;
- unknown dimensions.

For each item ask:

- “Is this measured, specified, assumed, or derived?”
- “What other parameter depends on it?”
- “How would an error appear during assembly?”

Do not allow missing values to disappear into code as unexplained constants.

## Build the design contract — 28 to 48 minutes

For every parameter record:

1. name;
2. meaning;
3. unit;
4. default value;
5. valid range;
6. source or assumption;
7. dependent geometry;
8. validation method.

Explain that related geometry should derive from shared parameters. For example, hole positions should derive from spacing and edge offset rather than being typed independently in multiple places.

Checkpoint: all dimensions use one unit system and assumptions are labelled.

## Inspect the starter model — 48 to 65 minutes

Walk through the starter code in this order:

1. parameter block;
2. derived values;
3. modules;
4. additive solids;
5. subtractive cuts;
6. final assembly call.

Define `union`, `difference`, and `translate` in plain language. Ask the student to predict what changing one parameter should affect before running the model.

Do not teach syntax as isolated vocabulary. Tie every construct to the physical bracket.

## Implement the first valid model — 65 to 92 minutes

Have the student:

1. set interface dimensions;
2. create the base and support geometry;
3. add holes and clearances;
4. keep repeated features in loops or modules where appropriate;
5. render after each major change;
6. record assumptions in comments.

When an error occurs, follow this debugging sequence:

- read the first compiler error;
- locate the referenced line;
- check brackets and semicolons;
- temporarily isolate the failing module;
- reduce the model to the smallest failing case;
- restore features one at a time.

Do not replace the student’s entire model with a finished solution.

## Parameter-sweep validation — 92 to 116 minutes

Require four distinct configurations:

1. **Nominal/default** configuration.
2. **Changed set A** with one or more meaningful parameter changes inside the valid range.
3. **Changed set B** with a different combination of meaningful parameter changes inside the valid range.
4. **Extreme-but-plausible** configuration near a valid boundary or representing the largest/smallest realistic supported device.

The two changed sets must not be duplicates of the extreme case. Record the exact parameter values used for every configuration.

For each case inspect:

- wall thickness;
- hole-edge distance;
- clearances;
- accidental disconnection;
- self-intersection;
- inaccessible fasteners;
- print orientation concerns.

Record expected and observed results in the validation log. A configuration that fails may still be valuable evidence, but the failure must be explained and either corrected or bounded by a parameter rule.

## Manufacturing and physical reality review — 116 to 136 minutes

Ask:

- “Can this be printed without impossible unsupported features?”
- “Are holes intentionally sized for the selected process?”
- “Where could tolerances accumulate?”
- “What load path does the bracket create?”
- “What must be tested on a real part?”

State explicitly:

> “A successful render proves that OpenSCAD produced geometry. It does not prove strength, fit, durability, or safety.”

Require a physical validation plan covering fit, fastener access, load, and inspection.

## Final cleanup — 136 to 152 minutes

The student:

- groups parameters at the top;
- removes unexplained magic numbers;
- adds comments describing assumptions;
- gives modules meaningful names;
- confirms the file renders from a clean open;
- saves the required source file.

## Debrief — final 8 minutes

Ask:

1. “Which parameter is most safety-critical?”
2. “Which dimension is still only an assumption?”
3. “What did the four-configuration sweep reveal?”
4. “What cannot be known until a part is manufactured?”

## Minimum acceptable submission

- completed design contract;
- parameterized OpenSCAD source;
- no unexplained duplicated interface dimensions;
- validation evidence for four distinct configurations: default, two changed sets, and one extreme-but-plausible set;
- validation log with exact parameter values and observed results;
- explicit physical-test plan and unresolved assumptions.

## Intervention guide

- **Student hard-codes values throughout:** Move them into named parameters or derived expressions.
- **Student confuses render with validation:** Ask what physical property was actually measured.
- **Student changes many features before rendering:** Return to incremental builds.
- **Student cannot debug:** Isolate the smallest failing module.
- **Student optimizes appearance before interfaces:** Return to the design contract.
- **Student supplies only three configurations:** Add a second independent changed parameter set before assessment.

## Exit check

The student must explain parameter, constraint, derived dimension, clearance, the difference between render and physical validation, and why four distinct configurations are required.