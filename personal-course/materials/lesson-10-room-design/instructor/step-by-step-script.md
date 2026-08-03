# Step-by-Step Instructor Script — Lesson 10

**Duration:** 25–30 minutes  
**Goal:** Help the student translate a real room need into a small parametric CAD concept and understand the limits of digital validation.

## Definitions

- **Interface:** The surface, space, object, or fastener the design must fit.
- **Parameter:** A named value that controls geometry.
- **Derived value:** A value calculated from other parameters.
- **Clearance:** Deliberate extra space for fit or access.
- **Design contract:** A table connecting dimensions, sources, ranges, and affected geometry.
- **Render validation:** Checking that the software generates coherent geometry.
- **Physical validation:** Checking a made object for fit, stability, strength, and usability.

## Before the lesson

1. Open the activity, design workbook, and starter `.scad` file.
2. Confirm OpenSCAD can render the starter.
3. Have a ruler or tape measure available.
4. Keep the project small and non-safety-critical.

## 0–3 minutes — Hook

Say:

> “AI can generate attractive CAD quickly. The hard part is making sure the model represents the real space and does not hide assumptions.”

Ask the student to name one object in their room that nearly fits somewhere but not quite.

## 3–7 minutes — Define the need and interfaces

Have the student complete the one-sentence need statement. Ask:

- What must the design touch or fit around?
- Which dimensions can be measured now?
- Which values are assumptions?
- What happens if a dimension is wrong?

Checkpoint: at least three interface dimensions are recorded with units and source status.

## 7–11 minutes — Build the design contract

Explain that parameters are not merely convenient sliders; they are promises about how geometry should respond.

Have the student enter width, depth, height, wall thickness, and clearance. For each ask:

- What does this control?
- What is a plausible lower and upper value?
- Is it measured, specified, assumed, or derived?

Do not allow unexplained numbers.

## 11–16 minutes — Inspect and change the starter

Open the starter model. Point out:

1. editable parameters
2. assertions that reject impossible values
3. the shell module
4. the divider loop
5. the final union.

Ask the student to predict the effect of one change before editing it. Make exactly one controlled change and render.

## 16–23 minutes — Validate four cases

Require four distinct configurations:

1. default
2. changed A
3. changed B
4. extreme but plausible.

For each, record expected and actual behavior. Ask:

- Did all parts remain connected?
- Did any internal space become negative?
- Did the changed parameter affect only the intended geometry?
- Would the result still fit the measured interface?

## 23–27 minutes — Reality boundary

Say:

> “A render proves that OpenSCAD generated geometry. It does not prove fit, strength, stability, material suitability, or safety.”

Have the student write one physical test for fit, stability, load, and usability.

## 27–30 minutes — Exit check

Ask the student to define parameter, clearance, and interface without reading. Then ask:

> “What is the most important assumption still present in your model?”

## Minimum acceptable work

- clear need statement
- measured interfaces with units and status
- completed design contract
- one controlled model change
- four configuration tests
- explicit physical validation plan.

## Common interventions

- **Student starts with shape styling:** Return to interfaces.
- **Student copies AI code without reading it:** Ask them to identify every editable parameter and one derived relationship.
- **Student treats the render as proof:** Ask what was physically measured or loaded.
- **Student changes many values at once:** Restore defaults and make one controlled change.
