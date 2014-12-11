ScytheAction = function(controller) {
    this.controller = controller;
//    this.x = 0;
//    this.y = 0;
};

ScytheAction.prototype.performAction = function(x, y) {
    //console.log("action! x: " + x + ", y: " + y);
    var koordx = Math.floor(x / sivunPituus);
    var koordy = Math.floor(y / sivunPituus);
//    console.log("action! x: " + koordx + ", y: " + koordy);

    var i = this.controller.checkForBuilding(koordx, koordy);
    if (!i) {
        return;
    }
    var building = this.controller.world.buildings[i];

    if (!(building.type === BuildingType.patch)) {
        //console.log("not a patch");
        return;
    }

    if (!building.field) {
        return;
    }

    if (!building.field.ready()) {
        return;
    }

    this.controller.inventory[building.field.type.name] += 2;
    var cropname = building.field.type.name;
    building.field = undefined;
    return "+2 " + cropname;
};