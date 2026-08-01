# AF-TRN-301 — Instructor Answer Key

## Teaching objective

The exercise assesses whether the student can turn an ambiguous spreadsheet request into a controlled data workflow: define the schema, preserve evidence, expose uncertainty, test formulas, and automate only after the table is reliable.

## Expected data-quality findings

A strong issue log identifies at least these classes of problems:

- inconsistent category capitalization;
- inconsistent unit spelling and case;
- inconsistent supplier spelling and spacing;
- multiple date formats and one missing date;
- text in a numeric quantity field (`thirty`);
- a negative physical stock quantity;
- missing quantity and reorder-level values;
- duplicate SKU `001043` with unclear reconciliation logic;
- SKU `01051` with a different digit count;
- blank values that must not be converted to zero;
- existing `Alert Sent` data that must be preserved;
- fractional quantities that are valid only for suitable units.

## Canonical data-contract expectations

- `SKU`: text; six characters for this dataset; preserve leading zeros; no blanks.
- `Item Name`: nonblank text.
- `Category`: controlled text list; title case.
- `Qty On Hand`: numeric, zero or greater unless a documented adjustment workflow permits otherwise.
- `Unit`: controlled list such as `pcs`, `bottles`, `m`, `kit`, `ml`, `kg`, and `rolls`.
- `Reorder Level`: numeric, zero or greater; blank means unknown, not zero.
- `Supplier`: canonical supplier name or `Internal`.
- `Last Counted`: ISO date `YYYY-MM-DD`; blank remains unknown.
- `Location`: text; blank remains unknown.
- `Alert Sent`: blank or `YES`.

## Rows requiring human confirmation

The following should not be silently repaired:

- `001030`: quantity `thirty` can plausibly mean 30, but converting words to a number must be logged as an explicit normalization or confirmed.
- `001031`: reorder level is absent.
- `001041`: negative quantity may represent an unposted adjustment or an error.
- `001043`: duplicate records may represent two locations, repeated data, or separate counts. Do not sum or delete without confirmation.
- `001045`: quantity is absent.
- `01051`: likely missing a leading zero, but must be confirmed against the SKU master.
- `001052`: last-counted date is absent.

## Formula expectations

A good low-stock formula must:

- operate only on rows with valid numeric quantity and reorder level;
- treat equality as low stock;
- avoid interpreting blanks as zero;
- update automatically when rows are added;
- preserve SKU as text.

An acceptable Google Sheets row formula is conceptually equivalent to:

```text
=IF(OR(D2="",F2="",NOT(ISNUMBER(D2)),NOT(ISNUMBER(F2))),"CHECK DATA",IF(D2<=F2,"LOW STOCK","OK"))
```

A table-level solution may use `ARRAYFORMULA`, `QUERY`, `FILTER`, or a pivot table if the same safeguards are preserved.

## Automation acceptance criteria

The script earns full credit only when it:

- has a real dry-run mode;
- does not set `Alert Sent` during dry run;
- writes `YES` only after successful delivery;
- suppresses duplicates;
- logs invalid rows rather than guessing;
- clears obsolete highlighting without deleting alert history;
- explains permissions, installation, testing, and trigger creation;
- has been tested on synthetic data before live use.

## Common red flags

Reduce credit when the student:

- replaces blanks with zero;
- drops duplicate records without documenting the decision;
- converts SKU values to numbers;
- sends email while testing;
- uses hard-coded row or column positions without checking headers;
- marks an alert as sent before delivery succeeds;
- presents AI-generated formulas or code without test evidence.

## Debrief questions

- Which repairs were deterministic, and which required a person?
- Why is a clean-looking table not necessarily a trustworthy table?
- What is the difference between `0`, blank, and invalid text?
- Which test case exposed the greatest automation risk?
- What monitoring would reveal that the scheduled script had stopped running?
