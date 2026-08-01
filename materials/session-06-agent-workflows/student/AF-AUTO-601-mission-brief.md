# AF-AUTO-601 — Supplier Monitoring Mission

**Requested by:** Priya Nair, Automation Engineer  
**Decision owner:** Elena Rossi, Procurement Manager  
**Scope:** Training simulation only

## Situation

AquaForge is evaluating two fictional suppliers for components used in the AquaNode Mini pilot. Procurement wants a daily summary only when a supplier's status changes in a way that could affect planning.

## Agent objective

Design a monitoring workflow that processes the supplied timestamped snapshots and notifies Elena only when one of these conditions first becomes true:

- availability changes to `OUT_OF_STOCK`;
- stated lead time rises above 21 days;
- unit price rises by at least 10% relative to the most recent valid observed price;
- the source cannot be parsed or has not produced a successful observation for more than 48 hours.

A later return to a normal state must close the active incident and allow a future incident to generate a new alert.

## Boundaries

The workflow may:

- read the supplied snapshot dataset;
- compare observations;
- write an append-only event log;
- maintain a separate current-state table;
- prepare a notification message.

The workflow must not:

- place orders;
- log into supplier accounts;
- bypass access controls;
- invent missing values;
- treat a parsing failure as a confirmed commercial change;
- overwrite historical observations.

## Required deliverables

1. Completed agent specification.
2. Expected event log produced by replaying all snapshots in timestamp order.
3. Explanation of duplicate suppression and incident re-arming.
4. Manual test procedure and stop procedure.
5. Short risk review covering false alerts, silent failure, stale data, and irreversible actions.

## Success criterion

Another technically capable person should be able to implement and test the workflow without deciding unspecified behaviour on their own.
