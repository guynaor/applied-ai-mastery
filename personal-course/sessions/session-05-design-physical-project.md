# Session 5 — Make a Space Work Better

**Time:** 90 minutes  
**Outcome:** A parametric 3D model of something you actually want, driven by AI, checked against a real measurement and a physical test before anything is printed.

## Before this session

Work through the [setup guide](session-05-setup.md) **in the week before**, not on the day. You only need one route, and the free one — OpenSCAD alone — completes the whole session.

Bring a tape measure, paper or cardboard, and one small thing that annoys you.

## Scenario

Pick something small you want to exist: a drawer organiser, a cable tray, a shelf divider, a stand for a specific object, a bracket, a holder for the thing that never has a home. You will describe it to an AI, watch it become a real 3D model, change it, and test it against the physical world. This is not engineering approval: nothing that carries a person's weight, involves electrics, or is dangerous if it fails.

## Sequence

1. **Measure, and mark where every number came from (15 minutes).** Measure the space and the objects. Beside each number write its origin: **measured** with a ruler, **from the maker's spec**, **assumed** by you, or **calculated**. The AI cannot do this part — it has not seen the room, and it will happily invent a dimension that looks reasonable.
2. **Describe it and let the AI build it (25 minutes).** Give the tool your measurements and what the object has to do. On the free route it writes OpenSCAD code you paste and render. On the other routes it drives FreeCAD directly and you watch the shape appear. Either way, **read what it produced before you trust it** — ask it which numbers it invented.
3. **Change one parameter, having predicted the result (15 minutes).** Pick one number — the number of compartments, a wall thickness, a height — and write down what *should* change before you change it. Then change it. If your prediction was wrong, you did not understand the model, and it is much cheaper to find that out now.
4. **Check it against the real world (25 minutes).** Print the outline at real size, or cut cardboard to the model's dimensions, and put it where it will live. Record the tolerance you found, which assumption turned out wrong, and what you changed. A model that looks correct on screen is not a model that fits.
5. **Decide what happens next (10 minutes).** Is it worth printing or building? What would you check first if you did? What did the AI get wrong that you only caught because you measured?

## Integrated artifact

One design sheet: the dimension table with a source for every number, the model file or the code, the parameter you changed and what you predicted, the physical-check result, and one sentence on what this design is not suitable for. A convincing render is not proof that something fits.

## Optional resources

The [starter model](../instructor/samples/session-05-organiser.scad) is a parametric drawer organiser you can open and change immediately — change `compartments` from 5 to 7 and watch every compartment recalculate. Every table for this session is in the [learning journal](../../site/assets/downloads/applied-ai-mastery-personal-journal-en.docx). A ruler, paper, and cardboard remain a completely valid free-access route at no cost: the design thinking is the same whether the model is on screen or on paper.
