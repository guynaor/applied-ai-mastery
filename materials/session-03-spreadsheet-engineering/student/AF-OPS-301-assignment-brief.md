# AF-OPS-301 — Inventory Cleanup and Automation Assignment

**Department:** Operations  
**Requested by:** Sarah Chen, Engineering Manager  
**Subject:** Prepare a reliable inventory sheet and low-stock alert workflow

## Situation

The attached inventory export combines records from purchasing, workshop stock counts, and an older ERP extract. It is not ready for operational use.

## Required work

1. Create a data contract defining every column, type, unit, allowed values, and missing-data rule.
2. Identify every data-quality problem in the source file.
3. Produce a cleaned inventory table.
4. Do not invent unsupported values. Flag them for confirmation.
5. Create a dynamic summary showing stock by category and all items at or below reorder level.
6. Write a Google Apps Script specification that:
   - highlights low-stock rows;
   - sends no email in dry-run mode;
   - avoids duplicate alerts;
   - records when an alert was successfully sent;
   - ignores invalid or incomplete rows;
   - includes installation and trigger instructions.
7. Test at least five edge cases and record expected versus actual results.

## Deliverables

- Completed data contract
- Clean inventory sheet
- Data-quality issue log
- Dynamic low-stock summary
- Apps Script or detailed script specification
- Test-case table
- Short explanation of the workflow in plain language

## Constraints

- Canonical dates use `YYYY-MM-DD`.
- Canonical quantities are numeric and use the unit shown in the data contract.
- SKU values must remain text and preserve leading zeros.
- Blank values are not zero.
- A duplicate record must be reconciled, not simply deleted.
