# Session 5 setup — CAD tools and AI

**None of this is needed for the session itself** — session 5 is demonstrated on the facilitator's screen. Work through it before you start the week's own build, alone at your desk. Installing takes longer than you expect, and there is no longer any reason to do it under time pressure.

**You do not need all of this.** Pick one route and stop there. Route 1 needs a single free download and nothing else, and you can complete the whole session on it.

| Route | What you install | Who it suits |
|---|---|---|
| **1 — Free** | OpenSCAD only | Everyone. No account, no payment, works on any machine. |
| **2 — Visual** | FreeCAD + the MCP + Claude Desktop | You want to see the model change as you talk to it. |
| **3 — Advanced** | Route 2 plus Claude Code or Antigravity | You are comfortable with a terminal or a code editor. |

Each step below ends with a **check** — a specific thing you should see. If you do not see it, that step did not work, and there is no point continuing to the next one.

---

## Route 1 — OpenSCAD (everyone)

OpenSCAD builds a 3D model from written instructions instead of mouse-dragging. That sounds harder and is actually easier, because an AI can write those instructions for you and you can read them.

### Install

- **Mac:** download from [openscad.org/downloads](https://openscad.org/downloads.html), open the `.dmg`, drag OpenSCAD to Applications. The first time you open it, macOS may refuse because it is from an unidentified developer — right-click the app and choose **Open**, then confirm.
- **Windows:** download the installer from [openscad.org/downloads](https://openscad.org/downloads.html) and run it. Accept the defaults.

### Check

Open OpenSCAD. You should get a window split into three: a text editor on the left, a 3D view on the right, a console at the bottom. Paste this into the editor and press **F5**:

```
cube([30, 20, 10]);
```

**You should see** a rectangular box appear in the 3D view. If you see it, Route 1 is done — you need nothing else for the session.

### Try the starter

Download [`session-05-organiser.scad`](../instructor/samples/session-05-organiser.scad) and open it in OpenSCAD. Press F5. You should see a drawer organiser with five compartments, and the console should print the size of each compartment. Change `compartments = 5;` to `7`, press F5 again, and watch the compartments get narrower.

That is the whole idea of the session: **change one number, see what moves.**

---

## Route 2 — FreeCAD, the MCP, and Claude Desktop

This route lets you talk to FreeCAD in plain language and watch the model change. It has three parts, and they must be done in order.

### 2a. Install FreeCAD

- **Mac:** download from [freecad.org/downloads](https://www.freecad.org/downloads.php). Open the `.dmg` and drag FreeCAD to Applications. On first launch, right-click and choose **Open** if macOS objects.
- **Windows:** download the installer from the same page and run it.

**Check:** FreeCAD opens and shows a start page with a list of workbenches in a dropdown at the top. Create a new empty document (`File > New`). You should get an empty 3D view with a navigation cube in the corner.

### 2b. Install the FreeCAD MCP

The MCP is what lets an AI assistant see and change your FreeCAD document. It has **two halves**, and this is where people get stuck:

1. **An addon inside FreeCAD**, which opens a small server so something outside can talk to it.
2. **An MCP server on your machine**, which your AI assistant connects to.

Both must be running. Follow the install instructions on the project's own page — [github.com/neka-nat/freecad-mcp](https://github.com/neka-nat/freecad-mcp) — because they change with versions, and a stale copy of the steps is worse than no copy.

In outline: install the addon into FreeCAD's `Mod` folder (the project explains where that is on each system), restart FreeCAD, then register the MCP server with your AI client.

**Check:** open FreeCAD and look for the addon's workbench in the workbench dropdown. Start its server — usually a button or menu item saying something like "Start RPC Server". The FreeCAD report view should confirm the server has started and name a port.

> **The failure everyone hits:** your AI says it cannot connect, or you see `Connection refused`. Almost always this means **FreeCAD is not open**, or the addon's server was never started inside it. The MCP server alone is not enough — FreeCAD has to be running with its server switched on. Check that before debugging anything else.

### 2c. Connect Claude Desktop

Install Claude Desktop from [claude.ai/download](https://claude.ai/download), sign in, then add the FreeCAD MCP server to its configuration. Claude Desktop has a settings screen for MCP servers; the FreeCAD MCP project shows the exact entry to paste.

**Check:** with FreeCAD open and its server running, ask Claude Desktop: *"List the open FreeCAD documents."* It should answer with the name of the document you created, not an error.

---

## Route 3 — Claude Code or Antigravity

Only worth doing if you are comfortable in a terminal or a code editor. Everything in the session can be done on Routes 1 and 2.

### Claude Code

Needs [Node.js](https://nodejs.org) installed first, and a Claude account with a paid plan or API credits. Install and sign-in instructions are at [claude.com/claude-code](https://claude.com/claude-code).

**Check:** open a terminal, run `claude`, and confirm it starts and accepts a prompt. Then add the FreeCAD MCP to it and ask it to list your open FreeCAD documents.

### Antigravity

Google's agentic editor. Download and sign-in instructions are on its official page — **check the current page rather than following remembered steps**, because this tool is new and changes quickly.

**Check:** it opens, you are signed in, and it can open a folder containing your `.scad` file.

---

## Before the session — the two-minute pre-flight

Run this the evening before. It is faster than discovering a problem in the first ten minutes of the session.

| Route | The check | What you should see |
|---|---|---|
| 1 | Open the starter `.scad` and press F5 | An organiser with five compartments |
| 2 | FreeCAD open, server started, ask Claude Desktop to list documents | Your document's name |
| 3 | Ask Claude Code or Antigravity the same question | Your document's name |

**If a check fails, drop one route.** Route 1 completes the whole session, and nobody who takes it is missing out on the learning — the design thinking is identical, and the physical check at the end is the same for everyone.

## What you also need, and it is not software

- **A tape measure or ruler.** The session starts with measuring something real, and no tool substitutes for that.
- **Paper or cardboard, and scissors.** The session ends by testing the design physically before anything is printed or bought.
- **One small thing that annoys you** — a drawer, a shelf, a corner, a box of cables.