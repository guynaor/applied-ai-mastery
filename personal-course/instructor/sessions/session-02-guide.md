# Session 2 facilitator guide — Buy With Confidence

## Preparation and timing

Prepare two public product listings, a manufacturer warranty page, and a review source. Teach: boundary 5 minutes; research question 8; evidence plan 12; comparison 15; verification/alert 15 (55 total).

## Default demonstration

Use Gemini Deep Research with: **“Plan research for buying noise-cancelling headphones under 150 units. Identify source types for total cost, warranty, return policy, durability, and an opposing view. List uncertainties. Do not recommend a purchase or use private data.”** Expected intermediate artifact: a source plan, then an evidence matrix.

## Equivalent tool routes

**Gemini:** use Deep Research when available; otherwise use normal Gemini. **Claude:** request the same source plan and matrix template. **ChatGPT:** request the same source plan and matrix template. All outputs require original-source inspection.

## Visible verification and teaching notes

Open seller/manufacturer pages and verify return terms and total cost. Show an alert with a threshold, expiry, duplicate suppression, and stop rule—never purchasing. Misconceptions: a research report is evidence; lowest sticker price is total cost. No-paid/no-tool alternative: use public browser search and paper matrix.

## OpenClaw instructor demonstration — full setup

Use your instructor-owned paid provider/API account only; do not show an API key, invite learners into the account, or ask them to share credentials. The night before, install OpenClaw on the demonstration machine, complete onboarding with the chosen cloud model, and run its health check. Prepare a separate, low-budget API project/key, a non-sensitive workspace, two saved public product snapshots, and one instructor-controlled notification destination. Keep a visible written **kill switch**: disable the schedule, stop the gateway, and revoke the separate key if behaviour becomes unexpected.

### Demo agent contract

Show this contract before opening the tool: *Every 6 hours, inspect only these two public product pages or snapshots. Alert only if the total price is at or below 150 units, availability changes, or a warranty/return term changes. Save the last seen value and source date. Suppress an identical alert for 48 hours. If a source is unavailable twice, send one “needs review” notice and pause. Do not buy, log in, send messages, use private data, or infer a recommendation.*

### Live teaching script (12–15 minutes)

1. Show the chosen model connection without exposing the credential. Explain that OpenClaw is the runtime; the cloud model is separately billed and authorised.
2. Show the workspace, allowed-source list, schedule, state/run history, and notification destination. Ask learners to identify the trigger, duplicate rule, approval point, and stop rule.
3. Run the agent once with the “below threshold” snapshot. Inspect the source/date and alert draft before it reaches the notification channel.
4. Run it again with the same snapshot. Show duplicate suppression: no second alert.
5. Substitute the unavailable-source snapshot. Show the logged failure and “needs review” behaviour; do not repair it by granting broader permissions.
6. Use the kill switch in front of the group. State that a stopped agent is a correct result when its evidence or permissions are insufficient.

### What people are building (3–5 minutes)

After the bounded demo, open the official [OpenClaw Showcase](https://openclaw.ai/showcase). It collects public community examples such as personal operations, family workflows, productivity summaries, integrations, and larger multi-agent systems. Select one example with the group and ask: **What data, permissions, schedule, notification route, log, and stop condition would this need? Which parts are suitable for a classroom prototype, and which are not?** Treat the examples as inspiration and a permission-design exercise—not as a checklist of connections to grant or claims to copy without verification.

### Managed web agents: Manus and similar platforms

Contrast OpenClaw with managed web-agent platforms such as [Manus](https://manus.im/docs/features/cloud-browser). They can provide a hosted workspace or browser, so learners may not install a local runtime; that convenience does **not** reduce the importance of the permission boundary. Use one simple public-web research example on screen and ask learners to identify the difference between a cloud browser, a local browser that uses an existing signed-in session, and an unattended scheduled agent. Do not connect learner accounts, run account-changing actions, or use this comparison as an invitation to give an agent broad browser access.

### Student routes and troubleshooting

Everyone completes the no-install specification and test-review route. The optional local lab uses OpenClaw plus Ollama, public/mock data, a manual first run, and a local log only. The Advanced Adventure is for a learner's own provider/API account with a small budget and separate key. If setup fails, hardware is insufficient, an account is unavailable, or a local model cannot use tools reliably, move immediately to the no-install route. Do not debug on a learner's personal files, accounts, payment methods, or browser sessions.

## Review prompts

What claim has the greatest impact? Which source is primary? What would make you pause the alert?
