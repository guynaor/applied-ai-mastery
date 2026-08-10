# AI Geography — A 10-Minute Map

AI product names change quickly. This map focuses on the layers underneath the names.

## The layers

1. **Large language model (LLM):** the underlying engine. It learns patterns from large amounts of data and generates a response one piece at a time. A model can sound confident without knowing whether a claim is true.
2. **AI application:** the interface you use, such as ChatGPT, Claude, Gemini, or Perplexity. An application may offer several models and add files, search, memory, voice, images, or other features.
3. **Tools and connectors:** controlled ways for an AI application to search, read files, run code, or interact with another service. Access to a tool does not guarantee that the tool will be used correctly.
4. **Artifact:** a substantial output you can keep, edit, share, or reuse, such as a document, spreadsheet, presentation, diagram, website, or small app.
5. **Skill:** reusable instructions, context, resources, and sometimes scripts that teach an agent a repeatable workflow. A prompt asks for one task; a skill packages how to perform a kind of task.
6. **Agent:** a model working toward a goal in a loop: plan, act with tools, observe the result, adjust, and continue or ask a human. The ability to act makes permissions and review more important.

## Where current products fit

| Product or category | Useful current fit | Remember |
|---|---|---|
| ChatGPT | Broad writing, study, files, data, images, research, and coding work | The app and the selected model are not the same thing. |
| Claude | Writing, document analysis, reasoning, and coding workflows | Available capabilities depend on the surface and plan. |
| Gemini | Multimodal help and workflows connected to Google products and Android | Connected data and actions depend on account settings. |
| Perplexity | Web research with visible links to sources | A citation makes verification possible; it does not make a claim automatically correct. |
| Codex and Claude Code | Coding agents that inspect repositories, edit files, run commands, and verify work through terminal, app, IDE, or cloud surfaces | Review the plan, permissions, changed files, and test evidence. |
| Google Antigravity | An agentic development environment spanning editor, terminal, and browser work | It can act across more surfaces than an ordinary chat. |
| OpenClaw and similar gateways | Agent runtimes that can use a local model (for example through Ollama) or a separately authenticated cloud/API model | Installing the runtime does not include a model or permissions. Broad, always-available access creates broader security responsibility. |
| Manus and similar managed web-agent platforms | Hosted agents that can work in a cloud browser, managed workspace, or—when specifically authorised—your browser or computer | The service may host the runtime for you, but each browser session, account connection, action, log, and stop point still needs deliberate review. |

These are current examples, not permanent rankings. Capabilities and plans change. For important work, test the real task in the tools available to you.

## One safety rule

**More ability to act requires more human control.** Check permissions and keep a human approval point before publishing, paying, deleting, sending external messages, or changing a real system. Never provide secrets or sensitive personal information merely because an agent requests them.

For a safe first agent, begin with a one-time run against public or mock data, inspect its log and result, then add a schedule only if the source list, duplicate rule, notification route, and stop condition are clear. A local model can avoid per-request API costs, but its device requirements and tool reliability still need testing. A cloud/API model usually needs a separate account or credits; a consumer chat subscription does not automatically mean API usage is included.

## Quick check

1. Is ChatGPT a model, an application, or both depending on how the name is used?
2. What can an agent do that a plain text-only chat cannot?
3. Is a saved presentation an artifact or a skill?
4. Why should a source-linked research answer still be verified?

## Check your answers

1. ChatGPT is primarily an application, but the name is also used informally for the models available through it. Check which model and features are active when the distinction matters.
2. An agent can work toward a goal over several steps and use permitted tools to inspect or change external systems. A plain text-only chat only returns text.
3. A saved presentation is an artifact. A skill is a reusable workflow for producing or handling a class of outputs.
4. Links make verification possible, but a source can be weak, outdated, misread, or unable to support the exact claim. Open the source and check the claim in context.

## Current primary references

- [OpenAI: What is ChatGPT?](https://help.openai.com/en/articles/12677804-what-is-chatgpt-faq)
- [OpenAI: Codex documentation](https://developers.openai.com/codex/)
- [Anthropic: Claude Code](https://www.anthropic.com/product/claude-code)
- [Anthropic: Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Anthropic: Artifacts](https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them)
- [Anthropic: Trustworthy agents in practice](https://www.anthropic.com/research/trustworthy-agents)
- [Google: What Gemini can do](https://support.google.com/gemini/answer/14579631)
- [Google: Antigravity](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-3-developers/)
- [Perplexity: What is Perplexity?](https://www.perplexity.ai/help-center/en/articles/10352155-what-is-perplexity)
- [OpenClaw documentation](https://docs.openclaw.ai/)
- [Manus: Cloud Browser](https://manus.im/docs/features/cloud-browser)
