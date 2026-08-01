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

## Useful structural modifications to investigate

Acceptable proposals may include:

- Improving shaft support or bearing arrangement after validating the vibration source.
- Adding or redesigning alignment features to reduce assembly variability.
- Revising the seal housing or mounting stiffness after modal or deflection analysis.
- Introducing a thermally compliant feature or cooling arrangement if temperature data supports it.
- Adding vibration and temperature instrumentation before redesign.

A proposal earns stronger credit when it is linked to a specific hypothesis and paired with a validation test.

## Red flags

Reduce credit when an output:

- Declares a definitive root cause.
- Invents a dominant vibration frequency.
- Claims cavitation, bearing failure, or misalignment as confirmed.
- Recommends a material without evidence about coolant chemistry or temperature.
- Claims a modification is safe or will solve the problem.
- Ignores the missing-data list.
- Uses external facts while claiming to rely strictly on the memo.

## Recommended next measurements

A strong response should prioritize several of these:

1. Vibration spectrum and phase measurements during normal and high-temperature operation.
2. Shaft runout and alignment measurements cold and hot.
3. Bearing condition and clearance inspection.
4. Coolant temperature, suction pressure, and cavitation-margin history.
5. Seal-face failure examination and photographs.
6. Seal material certification and installation records.
7. Structural or modal analysis of the pump, shaft support, and seal housing.

## Debrief questions

- Which model sounded most certain, and was that certainty justified?
- Which model made missing evidence easiest to see?
- Did any model change the meaning of “reported” into a confirmed measurement?
- Which prompt constraint had the largest effect?
- What one revision made the response more defensible?