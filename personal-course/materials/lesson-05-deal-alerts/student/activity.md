# Lesson 5 — Create Personal Deal Alerts

**Time:** 20–30 minutes  
**Goal:** Specify a useful price or availability monitor that avoids spam, can be paused or stopped, and never purchases automatically.

## Choose one monitoring goal

Examples:

- notify me when a specific product falls below a target price;
- notify me when my size is back in stock;
- notify me when a ticket or booking becomes available;
- remind me to recheck a purchase before a sale ends.

Use one exact item or clearly defined search. Do not monitor vague categories such as “cheap laptops.”

## Step 1 — Define the target

Record:

- exact product, event, or booking;
- acceptable sellers or sources;
- target price or availability condition;
- maximum delivery or fee amount;
- how often checking is useful;
- when the monitor should expire.

## Step 2 — Define the notification rule

A good alert says:

> Notify me only when **[condition]** is newly true. Include **[price/source/time checked]**. Do not notify repeatedly while the same condition continues.

Define:

- first-trigger behavior;
- duplicate suppression;
- recovery, such as price rising above the threshold or stock disappearing;
- re-arming after recovery;
- stale or failed-check behavior.

## Step 3 — Add safety controls

The monitor must include:

- a manual test or check-now option;
- pause and resume;
- permanent stop or expiry date;
- no automatic purchase;
- no storage of payment credentials;
- a maximum notification frequency;
- visible failed checks rather than silent success.

## Step 4 — Test four cases

Write expected behavior for:

1. condition is false;
2. condition becomes true for the first time;
3. condition remains true on the next check;
4. condition recovers and later becomes true again.

Add one failed-source or stale-data case.

## Step 5 — Decide whether to automate

Some needs are better handled by a calendar reminder than a recurring monitor. Choose:

- recurring monitor;
- one-time reminder;
- manual check saved in a task list.

Explain why.

## Completion check

You are done when the specification has a precise target, threshold, cadence, duplicate suppression, recovery, re-arming, expiry, pause/stop controls, failure behavior, and human approval before purchase.

Reusable rule: **An alert is useful only when it knows when not to alert.**