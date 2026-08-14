// Drawer organiser — a parametric starter for Session 5.
// Change a number, press F5, and watch what moves.
// Every measurement is in millimetres.

/* [The drawer you measured] */
drawer_width  = 360;   // internal width
drawer_depth  = 420;   // internal depth
usable_height = 60;    // how tall the organiser may be

/* [The organiser] */
wall          = 2.4;   // wall thickness: thin walls snap, thick walls waste space
compartments  = 5;     // number of cable compartments along the width
finger_gap    = 15;    // room to get a finger in and lift something out
floor_height  = 1.6;   // base thickness

/* [Fit] */
clearance     = 1.0;   // gap on each side so it actually slides in

// ---- derived: these follow from the numbers above, do not edit ----
outer_w = drawer_width - (clearance * 2);
outer_d = drawer_depth - (clearance * 2);
inner_w = outer_w - (wall * 2);
cell_w  = (inner_w - (wall * (compartments - 1))) / compartments;

echo(str("Outer size: ", outer_w, " x ", outer_d, " mm"));
echo(str("Each compartment: ", cell_w, " mm wide"));

module organiser() {
  difference() {
    // the outer shell
    cube([outer_w, outer_d, usable_height]);

    // hollow it out, leaving a floor
    translate([wall, wall, floor_height])
      cube([inner_w, outer_d - (wall * 2), usable_height]);
  }

  // the dividers
  for (i = [1 : compartments - 1]) {
    translate([wall + (i * cell_w) + ((i - 1) * wall), wall, floor_height])
      cube([wall, outer_d - (wall * 2), usable_height - floor_height - finger_gap]);
  }
}

organiser();
