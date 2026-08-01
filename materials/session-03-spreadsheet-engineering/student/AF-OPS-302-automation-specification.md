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

## Alert-state meaning

`Alert Sent` represents the **active low-stock episode**, not permanent audit history:

- blank: no active low-stock alert has been sent;
- `YES`: an alert has been sent for the current uninterrupted low-stock episode.

Permanent history belongs in the execution log or a separate append-only alert-history sheet. It must not prevent a recovered item from generating a new alert during a later low-stock episode.

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
7. Never resend an alert while the item remains continuously low stock and `Alert Sent` equals `YES`.
8. When a valid row recovers above its reorder level:
   - clear the low-stock highlighting;
   - reset `Alert Sent` to blank so the row is re-armed for a future low-stock episode;
   - record the recovery transition in the execution log or append-only alert-history sheet.
9. Do not erase append-only alert history when re-arming the active state.

## Implementation requirements

- Put `DRY_RUN`, recipient address, sheet name, and highlight colour in constants at the top.
- Use header names rather than hard-coded column numbers where practical.
- Include comments and plain-language installation instructions.
- Explain permissions and how to create a daily time-driven trigger.
- Provide a manual test procedure before enabling the trigger.
- Do not send real messages during classroom testing.
- Keep active state separate from permanent history.

## Required test cases

Include at least:

1. Valid low-stock row with blank `Alert Sent`.
2. Valid low-stock row already marked `YES`.
3. Valid row above reorder level.
4. Previously alerted row that recovers above reorder level and is re-armed.
5. Re-armed row that later becomes low stock again and generates a new alert.
6. Blank quantity.
7. Nonnumeric quantity.
8. Blank reorder level.
9. Dry-run and live-mode behaviour.
