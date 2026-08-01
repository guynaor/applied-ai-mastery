// AF-CAD-703 — AquaNode Mini wall-bracket starter
// Student task: complete and validate the model without hiding assumptions.

$fn = 48;

enclosure_width = 120;
enclosure_height = 80;
enclosure_depth = 45;
side_clearance = 0.8;

back_plate_thickness = 4;
shelf_thickness = 4;
shelf_depth = 52;
side_lip_thickness = 3;
side_lip_height = 18;

cable_opening_width = 24;
cable_opening_depth = 18;

hole_spacing_x = 90;
hole_spacing_z = 55;
mount_hole_diameter = 5.5;
plate_margin = 12;

plate_width = max(enclosure_width + 2 * (side_clearance + side_lip_thickness), hole_spacing_x + 2 * plate_margin);
plate_height = max(enclosure_height + shelf_thickness + plate_margin, hole_spacing_z + 2 * plate_margin);

module mounting_holes() {
    for (x = [-hole_spacing_x / 2, hole_spacing_x / 2])
        for (z = [plate_margin, plate_margin + hole_spacing_z])
            translate([x, -1, z])
                rotate([-90, 0, 0])
                    cylinder(h = back_plate_thickness + 2, d = mount_hole_diameter);
}

module back_plate() {
    difference() {
        translate([-plate_width / 2, 0, 0])
            cube([plate_width, back_plate_thickness, plate_height]);
        mounting_holes();
    }
}

module lower_shelf() {
    difference() {
        translate([-plate_width / 2, back_plate_thickness, 0])
            cube([plate_width, shelf_depth, shelf_thickness]);
        translate([-cable_opening_width / 2, back_plate_thickness + shelf_depth - cable_opening_depth, -1])
            cube([cable_opening_width, cable_opening_depth + 1, shelf_thickness + 2]);
    }
}

module side_lips() {
    inside_width = enclosure_width + 2 * side_clearance;
    for (side = [-1, 1])
        translate([side * inside_width / 2 - (side < 0 ? side_lip_thickness : 0),
                   back_plate_thickness,
                   shelf_thickness])
            cube([side_lip_thickness, shelf_depth, side_lip_height]);
}

module bracket() {
    union() {
        back_plate();
        lower_shelf();
        side_lips();
    }
}

bracket();

// Suggested checks:
// echo("plate_width", plate_width);
// echo("plate_height", plate_height);
// echo("inside_width", enclosure_width + 2 * side_clearance);
