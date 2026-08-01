# AquaForge Consistency Registry

This file records canonical facts that must remain stable across course materials unless an inconsistency is deliberately introduced as an exercise.

## Canonical timeline

- 2018 — AquaForge Technologies founded in Haifa.
- 2021 — Larnaca field and logistics operation opened.
- 2024 — AquaNode Edge revision 3 product line launched.
- 2026-08 — Course narrative begins.
- AquaNode Mini remains a concept product until the capstone.

## Locations

### Haifa

Head office, engineering laboratory, pilot assembly, quality assurance, finance, and customer-support coordination.

### Larnaca

Field engineering, regional logistics, procurement coordination, sales operations, and customer demonstrations.

## Canonical people

The employee IDs, names, roles, locations, reporting relationships, and communication styles in `people/employee-directory.csv` are authoritative.

Course documents may omit information, contain typos, or use outdated titles for exercises, but solution material must identify the discrepancy.

## Canonical products

The product IDs, names, revisions, and statuses in `products/product-catalog.csv` are authoritative.

Important constraints:

- `AF-P160 AquaNode Mini` is not commercially released.
- No product may be described as medically certified.
- Performance claims require an identified test, specification, or explicitly marked assumption.
- Generated CAD or automation never constitutes formal product certification.

## Data conventions

- Employee IDs begin `AF-E`.
- Product IDs begin `AF-P`.
- Formal document IDs follow `AF-[DEPARTMENT]-[SEQUENCE]`.
- SKUs introduced in inventory datasets must map to a product, replacement part, accessory, raw material, or consumable.
- Structured dates use ISO format.
- Currency must be explicit.

## Intentional conflict register

When an exercise intentionally conflicts with the canonical facts, add an entry to the relevant instructor solution using this format:

| Conflict ID | Student-facing files | Apparent conflict | Canonical resolution | Teaching purpose |
|---|---|---|---|---|

Do not document the answer inside student-facing files.

## Change process

A change to a canonical name, ID, revision, location, or reporting relationship should update:

1. the source-of-truth file;
2. dependent materials in the same feature branch;
3. the changelog;
4. any instructor answer key affected by the change.
