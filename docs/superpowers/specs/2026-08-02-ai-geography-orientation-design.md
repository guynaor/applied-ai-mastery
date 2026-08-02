# AI Geography Orientation Design

**Date:** 2026-08-02
**Status:** Approved

## Goal

Give students in both course tracks a compact mental map of the current AI
landscape before the first practical exercise. Students should leave the
opening able to distinguish a model from an app, an ordinary chat from an
agent, and a one-off prompt from a reusable skill.

This is an orientation, not a product survey. It should take about ten minutes
and remain useful as vendors and product names change.

## Audience And Scope

The orientation is used in:

- Professional track, Session 1: Advanced Prompting and Model Selection
- Personal track, Lesson 1: Ask Better, Get Better
- English and Hebrew versions of the personal track

The material introduces:

- large language models (LLMs)
- models versus products and chat applications
- representative general-purpose AI platforms and their current practical fit
- tools, connectors, and external actions
- artifacts and durable outputs
- agents and the plan-act-observe loop
- coding agents and agentic development environments
- skills as reusable workflow knowledge
- personal-agent gateways such as OpenClaw, including a permissions warning

It does not teach model architecture, benchmark rankings, API development,
agent implementation, MCP configuration, or product setup.

## Teaching Structure

The orientation uses a layered map rather than a vendor-by-vendor catalog:

1. **Model:** the underlying engine that predicts and generates content.
2. **Application:** the interface through which a person uses one or more
   models, such as ChatGPT, Claude, Gemini, or Perplexity.
3. **Tools and connectors:** capabilities that let an application search,
   inspect files, execute code, or interact with another service.
4. **Artifact:** a substantial output that can be kept, edited, shared, or
   reused, such as a document, spreadsheet, presentation, diagram, or app.
5. **Skill:** reusable instructions, context, resources, and sometimes scripts
   that encode how to perform a repeatable kind of work.
6. **Agent:** a model operating in a goal-directed loop that plans, acts through
   tools, observes results, and adjusts, with human permissions and oversight.

The instructor then locates several products on the map:

- ChatGPT: broad general-purpose work, including files, data, images, writing,
  research, and coding.
- Claude: writing, document analysis, reasoning, and coding workflows.
- Gemini: multimodal assistance and workflows connected to Google products and
  Android.
- Perplexity: web research with visible source links.
- Codex and Claude Code: coding agents that can inspect repositories, edit
  files, run commands, and verify work through terminal, app, IDE, or cloud
  surfaces.
- Google Antigravity: an agentic development environment spanning editor,
  terminal, and browser work.
- OpenClaw: a self-hosted gateway that connects messaging channels to an
  always-available AI agent.

Platform descriptions are examples of current practical fit, not permanent
rankings or claims that one product is universally best. Students are reminded
that capabilities, plans, and model availability change frequently and that a
real task should be tested in the tools available to them.

## Timing

The professional session keeps its existing overall duration. Its current
opening and early source-inspection discussion are tightened to make room for:

- 0-8 minutes: AI geography orientation
- 8-10 minutes: quick terminology check and transition

The personal lesson grows from approximately 25 minutes to approximately 30
minutes. Its existing opening and comparison workflow are compressed by about
five minutes, preserving the core prompt-improvement exercise and reflection.

## Content Architecture

A shared student-facing reference is the source of truth:

- English AI geography reference
- Hebrew AI geography reference with equivalent meaning and natural RTL text

Each first-session student activity links to or embeds the compact map needed
for the exercise. Each instructor script contains a timed delivery guide,
plain-language definitions, one comprehension check, and a transition into the
existing practical activity.

The professional material may use workplace examples; the personal material
uses everyday examples. Definitions and product positioning remain consistent
between tracks.

## Safety And Accuracy

The orientation explicitly distinguishes answering from acting. Any agent with
file, terminal, browser, account, or messaging access can affect real systems.
Students should review permissions, approve consequential actions, avoid
sharing sensitive information, and keep a human checkpoint before publication,
payment, deletion, or external communication.

Product statements are based on current first-party documentation and should
be phrased so routine product changes do not make the lesson misleading.

Primary references:

- OpenAI, ChatGPT FAQ and Codex documentation
- Anthropic, Claude Code, Agent Skills, Artifacts, and agent documentation
- Google, Gemini Apps and Google Antigravity documentation
- Perplexity Help Center
- OpenClaw documentation

## Verification

- Confirm both tracks begin with the orientation before their first exercise.
- Confirm personal-track English and Hebrew pages have equivalent content and
  links.
- Confirm all renamed time blocks remain internally consistent.
- Run the repository's build and link checks.
- Inspect the generated first-session pages at desktop and mobile widths,
  including Hebrew RTL layout.
