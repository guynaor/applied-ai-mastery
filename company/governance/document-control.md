# Document Control Standard

**Document:** AF-QMS-001  
**Revision:** 1.0  
**Owner:** Quality Assurance  
**Status:** Course source of truth

## Identifier format

`AF-[DEPARTMENT]-[SEQUENCE]`

Department codes:

- `EXEC` — executive and strategy
- `ENG` — engineering and product development
- `MFG` — manufacturing
- `QA` — quality assurance
- `PROC` — procurement and suppliers
- `OPS` — operations and logistics
- `SALES` — sales and marketing
- `CS` — customer success and field service
- `FIN` — finance
- `HR` — people and workplace
- `QMS` — quality-management system
- `TRN` — training material

## Filenames

Use lowercase descriptive filenames after the identifier:

`AF-ENG-014_sensor-housing-requirements.md`

Exported files retain the same stem:

- `.docx` or `.md` editable source
- `.pdf` controlled distribution copy
- `.xlsx` or `.csv` structured data

## Revision rules

- Drafts use `0.x` revisions.
- First approved issue is `1.0`.
- Minor content changes increment the decimal revision.
- Major scope or requirement changes increment the whole number.
- Superseded documents remain available in version history but are not presented as current.

## Required metadata

Controlled documents state:

1. identifier;
2. title;
3. revision;
4. owner or author;
5. approval role where required;
6. issue date;
7. status: Draft, In Review, Approved, Superseded, or Training Copy.

## Intentional inconsistencies

Training exercises may contain conflicting dates, revisions, SKUs, or claims. These must be intentional, traceable in the instructor answer key, and must not alter the canonical company registry.

## Dates and units

- Use ISO dates (`YYYY-MM-DD`) in structured files.
- Human-facing documents may use `1 August 2026` when ambiguity is impossible.
- Use SI units by default.
- Currency fields must include an ISO code such as `EUR`, `USD`, or `ILS`.
