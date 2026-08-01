# AF-OPS-302 — Low-Stock Automation Specification

## Objective

Create a Google Apps Script for the cleaned inventory sheet.

## Sheet contract

The cleaned sheet must contain these exact headers in row 1:

- `SKU`
- `Item Name`
- `Category`
- `Qty On Hand`
- `Unit`
- `Reorder Level`
- `Supplier`
- `Last Counted`
- `Location`
- `Alert Sent`

## Required behaviour

For each nonblank data row:

1. Validate that SKU, item name, quantity, unit, and reorder level are usable.
2. If required data is missing or invalid, do not send an alert; record a validation message in the execution log.
3. If `Qty On Hand <= Reorder Level`, highlight the used cells in the row light red (`#FCE8E6`).
4. If the row is low stock and `Alert Sent` is blank, prepare an email containing:
   - SKU;
   - item name;
   - quantity and unit;
   - reorder level;
   - supplier;
   - location.
5. When `DRY_RUN` is `true`, log the email but do not send it and do not write `YES` to `Alert Sent`.
6. When `DRY_RUN` is `false`, write `YES` only after the email sends successfully.
7. Never resend an alert while `Alert Sent` equals `YES`.
8. Clear low-stock highlighting when a valid row is no longer low stock, but do not automatically erase alert history.

## Implementation requirements

- Put `DRY_RUN`, recipient address, sheet name, and highlight colour in constants at the top.
- Use header names rather than hard-coded column numbers where practical.
- Include comments and plain-language installation instructions.
- Explain permissions and how to create a daily time-driven trigger.
- Provide a manual test procedure before enabling the trigger.
- Do not send real messages during classroom testing.

## Required test cases

Include at least:

1. Valid low-stock row with blank `Alert Sent`.
2. Valid low-stock row already marked `YES`.
3. Valid row above reorder level.
4. Blank quantity.
5. Nonnumeric quantity.
6. Blank reorder level.
7. Dry-run and live-mode behaviour.
