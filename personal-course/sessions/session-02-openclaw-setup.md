# Session 2 setup — OpenClaw on a paid API

**None of this is needed for the session itself** — session 2 is demonstrated on the facilitator's screen. This is the **Advanced Adventure** route for the week's own build, and it is optional. The no-install route produces exactly the same run record and misses none of the learning.

**This is the one route in the course that spends real money.** A paid API bills per use, not per month, and an agent on a schedule is a program that calls it while you are asleep. Read the whole of *Before you start* before you install anything.

Each step ends with a **check** — a specific thing you should see. If you do not see it, that step did not work, and there is no point continuing to the next one.

---

## Before you start

### What this actually costs

You are connecting two separate things, and they are billed separately:

- **OpenClaw** is the runtime. It is free and runs on your machine.
- **The model** is a paid API from a provider you have an account with. Every run costs a fraction of a currency unit, and a badly written schedule can turn that into a real number.

A monitoring agent that checks two pages every six hours is cheap. The same agent with a one-minute schedule and a long prompt is not. **Set a spending cap before you set a schedule.**

### Two decisions to make first

1. **A separate project and a separate key, for this course only.** Not your main key. You are going to revoke this one at the end, and you want that to break nothing else.
2. **A low spending cap on that project.** Whatever your provider calls it — budget, usage limit, hard cap. Set it low enough that the worst case is annoying rather than painful.

**Check:** you can see your new project in the provider's console, it has its own key, and it has a cap with a number on it. If the cap is missing, stop here — the cap is the part that makes the rest of this safe.

### Never put the key in these places

The journal. A shared document. A screenshot. A chat message. A file you might commit. The key goes in the tool and nowhere else, and if it ever appears somewhere it should not, revoke it and issue a new one — that costs you a minute and is not a big deal.

---

## Step 1 — Install OpenClaw

OpenClaw needs Node **22.22.3+, 24.15+, or 25.9+** (26 is recommended). The installers below will install Node for you if it is missing, so you usually do not need to check first.

### macOS

Open Terminal and run:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

This detects your system, installs Node if needed, installs OpenClaw, and starts onboarding.

### Windows

Windows has a native option and does **not** require WSL2.

**The desktop app, which is the easier route.** Download the signed installer from the [OpenClaw Windows releases page](https://github.com/openclaw/openclaw-windows-node/releases/latest) and run it:

- `OpenClawCompanion-Setup-x64.exe` on a normal Intel or AMD machine
- `OpenClawCompanion-Setup-arm64.exe` on an ARM machine, such as a Snapdragon laptop

**Or PowerShell**, if you would rather work in a terminal. Open PowerShell and run:

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

### Either platform — if you would rather see what you are installing

Both commands above download a script and run it immediately. That is normal for developer tools and it is also exactly the kind of approval this course tells you to read before granting. If you would rather look first, open [openclaw.ai/install.sh](https://openclaw.ai/install.sh) (or `install.ps1`) in a browser and read it — it is short — or skip the script entirely and install through npm, which requires Node to already be present:

```bash
npm install -g openclaw@latest --allow-scripts=openclaw
openclaw onboard --install-daemon
```

**Check:** open a terminal and run these three:

```bash
openclaw --version
openclaw doctor
openclaw gateway status
```

`--version` prints a version number. `doctor` reports on your setup and tells you what is missing. `gateway status` tells you whether the background service is running. If `--version` says the command is not found, the install did not finish — close the terminal, open a new one, and try again before doing anything else.

---

## Step 2 — Connect your paid API

Onboarding asks which provider you want and takes the key interactively, so the key is never typed into a file.

**Anthropic:**

```bash
openclaw onboard --auth-choice apiKey
```

**OpenAI:**

```bash
openclaw onboard --auth-choice openai-api-key
```

**Google Gemini:**

```bash
openclaw onboard --auth-choice gemini-api-key
```

Paste the key for the **separate, capped** project you made in *Before you start* — not your main key.

If you would rather not paste at a prompt, OpenClaw also reads a key from the environment: `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, or `GEMINI_API_KEY`. Setting it for one terminal session is a reasonable middle ground, because it disappears when you close the window.

**Check:** `openclaw doctor` no longer reports a missing credential for your provider.

---

## Step 3 — Choose the model

Models are named `provider/model`. Set the one you want as the primary:

```bash
openclaw models set anthropic/claude-opus-5
```

Use a small, cheap model while you are still testing the agent's rule. Move to a larger one only if the small one genuinely cannot do the job — for reading two product pages and comparing a number, it almost certainly can.

**Check:** ask OpenClaw to do something trivial and watch it answer. If it errors about authentication, the key did not attach; if it errors about the model name, the name is wrong — `openclaw models list` will show you what is available.

---

## Step 4 — Prove it works before you schedule anything

Run your agent **by hand, once**, against a page you saved or the snapshots your facilitator provided. Do not give it a schedule yet.

Watch for the three things session 2 asks about: did it read only the sources it was allowed to, did it alert when it should have, and did it stay quiet when it should have?

**Check:** you have one run in the run history, and you can say out loud what it read and why it did or did not alert. That run record is the homework — not the installation.

---

## Step 5 — Know how to stop it before you start it

This is the three-step kill switch from the session, and it is worth doing once now, while nothing is at stake, so that you can do it later when something is:

1. **Disable the schedule.** The agent stops waking up.
2. **Stop the gateway.** The runtime stops entirely — `openclaw gateway status` will tell you it is not running.
3. **Revoke the separate key** in your provider's console. Even if something is still running somewhere, it can no longer spend anything.

They are in that order on purpose: each one is a wider stop than the one before it, and the third works even if you have lost track of the first two. **This is also how you finish the course** — when the week is done, revoke the key. A key you are not using is the one most likely to leak.

**Check:** do all three now, confirm `openclaw gateway status` reports it is stopped, then start the gateway again and carry on. You now know the stop works.

---

## What this agent is not allowed to do

The same rules as the rest of the session, and they are not negotiable on a paid key:

- **It tells you. It does not act.** An alert or a draft is the only permitted output.
- **It does not buy, does not log in, and does not contact a seller.**
- **It reads public data only.** No personal files, no accounts, no anybody else's information.
- **No financial or medical decisions**, and no investment recommendations.
- **Every widening of what it may touch is a decision you make deliberately**, not something you approve to make an error message go away.

---

## If something goes wrong

| What you see | What it usually is |
|---|---|
| `openclaw: command not found` after installing | The terminal is still the old one. Close it, open a new one. |
| `gateway status` says it is not running | Run `openclaw onboard --install-daemon`, then check again. |
| An authentication error | The key did not attach, or you pasted the key from a different project. Run the onboard command for your provider again. |
| An unknown model error | The model name is wrong. `openclaw models list` shows what your key can actually reach. |
| A bill larger than you expected | The schedule is too frequent, or the prompt is long. Disable the schedule first, then work out which. |
| Anything at all you do not understand | `openclaw doctor` first. It is written to tell you what is wrong. |

If a step fails twice, stop and use the no-install route instead. It produces the same run record, and the learning evidence for this session is the specification and the run review — not the installation.
