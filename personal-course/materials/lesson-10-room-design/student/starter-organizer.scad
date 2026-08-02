// Lesson 10 starter: simple parametric desktop organizer
// Units: millimetres

width = 160;
depth = 90;
height = 70;
wall = 3;
base = 3;
divider_count = 2;

assert(width > 2 * wall, "Width must exceed two wall thicknesses");
assert(depth > 2 * wall, "Depth must exceed two wall thicknesses");
assert(height > base, "Height must exceed base thickness");
assert(divider_count >= 0, "Divider count cannot be negative");

module shell() {
    difference() {
        cube([width, depth, height]);
        translate([wall, wall, base])
            cube([width - 2 * wall, depth - 2 * wall, height]);
    }
}

module dividers() {
    usable_width = width - 2 * wall;
    for (i = [1 : divider_count]) {
        x = wall + usable_width * i / (divider_count + 1) - wall / 2;
        translate([x, wall, base])
            cube([wall, depth - 2 * wall, height - base]);
    }
}

union() {
    shell();
    dividers();
}
