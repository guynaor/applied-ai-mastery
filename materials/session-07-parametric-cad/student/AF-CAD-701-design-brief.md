# AF-CAD-701 — AquaNode Mini Wall-Bracket Design Brief

**Requested by:** Yael Cohen, Mechanical Design Engineer  
**Reviewed by:** Sarah Chen, Engineering Manager

## Objective

Create a parametric OpenSCAD model for a non-safety-critical prototype bracket that holds one AquaNode Mini enclosure against a vertical workshop test board.

## Enclosure interface

- Enclosure external size: 120 mm wide × 80 mm high × 45 mm deep.
- The enclosure rests on a lower shelf and is retained by two side lips.
- Nominal clearance around the enclosure: 0.8 mm per side.
- A rear cable exits through the enclosure bottom near the centre; provide a cable opening at least 24 mm wide and 18 mm deep.
- The bracket must not cover the enclosure front face.

## Board interface

- Mount to a flat vertical board using four M5 screws.
- Hole diameter for classroom prototype: 5.5 mm.
- Hole centres: 90 mm horizontally and 55 mm vertically.
- Minimum edge distance from hole centre to bracket edge: 10 mm.
- Countersinks are optional and must be separately parameterized if included.

## Manufacturing assumptions

- FDM prototype in PETG.
- Nominal nozzle: 0.4 mm.
- Minimum wall thickness: 3.0 mm.
- Preferred print orientation: back plate flat on the print bed.
- Avoid unsupported horizontal spans longer than 12 mm unless the student documents support use.

## Required parameters

At minimum expose:

- enclosure width, height, and depth;
- side clearance;
- back-plate thickness;
- shelf thickness and depth;
- side-lip thickness and height;
- cable-opening width and depth;
- horizontal and vertical hole spacing;
- mounting-hole diameter.

## Required outputs

1. Completed design contract.
2. Readable `.scad` model with named parameters and modules.
3. Render evidence for default dimensions.
4. Tests at two changed parameter sets and one extreme-but-plausible set.
5. Validation log covering overall dimensions, hole spacing, cable opening, print orientation, and known limitations.
6. A small fit-test coupon or a documented plan for one before a full print.

## Boundaries

This exercise does not establish load capacity, product compliance, or suitability for field deployment. Do not describe the generated bracket as structurally certified.
