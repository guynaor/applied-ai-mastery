# AF-TRN-101 — Instructor Answer Key

## Purpose

This answer key does not define one correct engineering diagnosis. It defines what a responsible AI-assisted analysis should and should not do with the incomplete source memo.

## Source-supported facts

A strong response should accurately preserve these facts:

- Pump speed is approximately 3,450 RPM.
- Reported flow is 420 GPM.
- Vibration amplitude was reported to rise approximately 28% during high-thermal-stress cycles.
- Seal replacement has occurred after roughly 450 operating hours across three recent maintenance intervals.
- Leakage worsens during long high-temperature runs.
- No visible housing cracks were found in the latest inspection.
- Several decisive measurements are missing.

## Plausible inferences

The following may be discussed as hypotheses, not conclusions:

- Increased vibration may increase dynamic seal-face loading or shaft motion.
- Thermal growth may worsen alignment or distort the seal interface.
- Bearing degradation, shaft runout, imbalance, resonance, or misalignment may contribute.
- Cavitation or hydraulic instability could increase vibration.
- Seal material or installation consistency may be relevant.

The model should not rank these confidently without additional evidence.

## Useful structural or mechanical modifications to investigate

The student must propose **two actual structural or mechanical design modifications**. Instrumentation, inspection, and measurement plans do not satisfy this requirement.

Acceptable proposals may include:

- Improving shaft support or revising the bearing arrangement after validating the vibration source.
- Adding or redesigning alignment and locating features to reduce assembly variability.
- Increasing or redistributing seal-housing or mounting stiffness after modal or deflection analysis.
- Introducing a thermally compliant mount or controlled-expansion feature if hot-alignment data supports it.
- Revising the seal cooling path or thermal isolation arrangement if temperature measurements support it.
- Changing the coupling, support geometry, or damping arrangement if testing identifies a relevant resonance or transmitted vibration path.

A proposal earns stronger credit when it:

1. Changes the physical design or mechanical arrangement.
2. Is linked to a specific hypothesis.
3. States the evidence required before implementation.
4. Includes a validation test for the proposed change.

## Red flags

Reduce credit when an output:

- Declares a definitive root cause.
- Invents a dominant vibration frequency.
- Claims cavitation, bearing failure, or misalignment as confirmed.
- Recommends a material without evidence about coolant chemistry or temperature.
- Claims a modification is safe or will solve the problem.
- Counts added sensors, inspections, or measurements as one of the two required design modifications.
- Ignores the missing-data list.
- Uses external facts while claiming to rely strictly on the memo.

## Recommended next measurements

Instrumentation and evidence-gathering belong in this section rather than in the two required modification answers. A strong response should prioritize several of these:

1. Vibration spectrum and phase measurements during normal and high-temperature operation.
2. Permanently or temporarily installed vibration and temperature instrumentation at appropriate pump, bearing, and seal locations.
3. Shaft runout and alignment measurements cold and hot.
4. Bearing condition and clearance inspection.
5. Coolant temperature, suction pressure, and cavitation-margin history.
6. Seal-face failure examination and photographs.
7. Seal material certification and installation records.
8. Structural or modal analysis of the pump, shaft support, and seal housing.

## Debrief questions

- Which model sounded most certain, and was that certainty justified?
- Which model made missing evidence easiest to see?
- Did any model change the meaning of “reported” into a confirmed measurement?
- Did the response provide two genuine design modifications, or substitute monitoring for one of them?
- Which prompt constraint had the largest effect?
- What one revision made the response more defensible?