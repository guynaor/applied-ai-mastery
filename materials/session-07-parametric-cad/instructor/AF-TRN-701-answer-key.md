# AF-TRN-701 — Instructor Answer Key

## Core teaching objective

The student should treat AI-generated CAD as executable engineering work that must be specified, inspected, measured, and tested. A plausible render is not sufficient evidence.

## Required design logic

A strong submission:

- identifies the back plate, lower shelf, side lips, mounting-hole axes, and enclosure-contact surfaces as interfaces;
- keeps source dimensions and adjustable design choices as named parameters;
- derives plate size from enclosure and hole-spacing requirements rather than hard-coding an unrelated size;
- preserves at least 0.8 mm clearance per side in the default configuration;
- keeps all printed walls at or above 3.0 mm;
- provides a cable opening at least 24 mm wide and 18 mm deep;
- uses four 5.5 mm mounting holes on 90 mm × 55 mm centres;
- checks the 10 mm minimum hole-centre edge distance;
- documents the back-plate-flat print orientation and any support requirement.

## Starter-model interpretation

The starter intentionally provides a simple union of a back plate, shelf, and side lips. Students may improve it, but advanced fillets, ribs, countersinks, or decorative details do not compensate for missing interface checks.

The default derived internal width is:

`120 + 2 × 0.8 = 121.6 mm`

The plate width must be large enough for both the enclosure interface and the mounting-hole edge-distance rule. The student should calculate and record which requirement governs.

## Expected parameter tests

At minimum review:

1. the default configuration;
2. a wider enclosure;
3. a deeper enclosure with an explicit shelf-depth decision;
4. one extreme-but-plausible clearance or lip-height configuration.

A parameter test fails if geometry disappears, overlaps unexpectedly, violates minimum walls, blocks the cable opening, or silently changes a critical interface.

## Fit-test expectation

A strong fit coupon reproduces the two side-contact surfaces and selected clearance using only enough height and depth to test fit. The student should record printer, material, layer settings, measured enclosure width, coupon width, and observed fit.

## Acceptable limitations

The model may remain intentionally simple. It is acceptable to state that:

- no load rating has been established;
- screw-head geometry and countersinks require separate validation;
- PETG shrinkage and printer calibration can change fit;
- cable bend radius has not been physically tested;
- field environmental requirements are outside the exercise.

## Red flags

Reduce credit when a submission:

- starts from a visual prompt without a design contract;
- hard-codes repeated dimensions throughout the model;
- changes enclosure size but leaves the shelf or lips disconnected from that parameter;
- treats successful rendering as proof of fit or strength;
- adds unsupported certification or load-capacity claims;
- omits changed-parameter tests;
- proposes a full print before a small fit test where fit is uncertain.
