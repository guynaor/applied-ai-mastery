# Lesson 10 — Design Something for Your Room

**Time:** 20–30 minutes  
**Goal:** Turn a real room need into a small parametric design concept, while separating measured facts from assumptions.

## Choose one small project

Examples:

- shelf or monitor riser;
- bedside organizer;
- plant stand;
- cable tray;
- drawer divider;
- small stool or side table concept.

Choose something simple enough to describe with boxes, holes, and repeated dimensions. Do not use this short lesson to design safety-critical furniture, climbing equipment, or anything that could injure someone if it fails.

## Step 1 — Define the need

Write one sentence:

> I need a **[thing]** for **[place/use]** that must fit within **[space]** and support **[objects/use]**.

## Step 2 — Measure the interfaces

Record only dimensions that affect fit:

- available width, depth, and height;
- object dimensions;
- wall, desk, drawer, or floor contact points;
- cable or hand clearances;
- fastener or material limits, if known.

Label every value as:

- **measured**;
- **manufacturer specification**;
- **assumed**;
- **derived**.

Do not paste a photo of your room into an AI system unless you are comfortable with the privacy implications.

## Step 3 — Build a design contract

Use the design workbook. Give each important dimension:

- a parameter name;
- unit;
- default value;
- safe or useful range;
- source;
- what geometry depends on it.

## Step 4 — Ask AI for a simple parametric plan

Use a prompt such as:

> Help me create a simple parametric OpenSCAD concept for **[project]**. Use millimetres. My measured interfaces are **[list]**. My assumptions are **[list]**. Keep all editable dimensions at the top. Use simple modules and explain what each parameter controls. Do not claim the design is structurally safe or ready to manufacture.

Compare the response with the starter model. Keep the model simple.

## Step 5 — Make one controlled change

Open the starter model in OpenSCAD and change one meaningful parameter, such as width, depth, height, wall thickness, or divider count.

Before rendering, predict what should change and what should remain unchanged.

## Step 6 — Validate four configurations

Render and record:

1. default configuration;
2. changed configuration A;
3. changed configuration B;
4. extreme-but-plausible configuration.

Check:

- geometry remains connected;
- dimensions stay positive;
- wall thickness is not obviously too small;
- objects and clearances still fit;
- no feature moves unexpectedly;
- the design can plausibly be made with the intended method.

## Step 7 — Record the boundary

Write what the digital model does **not** prove. Typical answers include strength, stability, material suitability, real-world fit, print quality, and safe load.

## Completion check

You are done when you have:

- a real need and measured interfaces;
- a completed design contract;
- assumptions clearly labelled;
- one controlled parameter change;
- four recorded configurations;
- a physical validation plan.

Reusable rule: **A clean render proves geometry was generated—not that the object is safe, strong, or suitable.**