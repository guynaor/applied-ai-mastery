# AF-AUTO-602 — Agent Specification Template

## 1. Trigger

- Cadence:
- Time zone:
- Manual test trigger:
- Pause and stop method:

## 2. Input contract

| Field | Type | Allowed values / rule | Missing-value behaviour |
|---|---|---|---|
| observed_at | datetime | ISO 8601 | Reject row |
| supplier_id | text | Known ID | Reject row |
| availability | text | IN_STOCK / LIMITED / OUT_OF_STOCK | Log validation failure |
| lead_time_days | integer | 0 or greater | Mark unknown; do not infer |
| unit_price_eur | decimal | Greater than 0 | Mark unknown; do not infer |
| parse_status | text | OK / ERROR | Create technical incident only |

## 3. Decision rules

Define exact logic for:

- stock incident;
- lead-time incident;
- price incident, including the reference observation;
- parse failure;
- stale-data incident;
- recovery and re-arming;
- duplicate suppression.

## 4. State model

Describe separate storage for:

- append-only observations;
- append-only events and notifications;
- current supplier state;
- active incidents by supplier and incident type.

## 5. Notification contract

Include supplier, incident type, observed value, previous valid value when relevant, timestamp, evidence reference, and required human decision. State what must never be claimed.

## 6. Failure handling

Define retry limit, logging, stale-data threshold, malformed-row handling, and behaviour when notification delivery fails.

## 7. Safety boundaries

List forbidden actions, permissions required, data-retention rule, and the human approval point.

## 8. Test plan

Include normal state, first incident, duplicate observation, recovery, repeated incident after recovery, malformed data, stale data, and failed notification delivery.
