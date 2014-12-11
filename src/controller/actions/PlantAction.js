PlantAction = function(controller, spawnType) {
    this.spawnType = spawnType;
    this.controller = controller;
//    this.x = 0;
//    this.y = 0;
};

PlantAction.prototype.performAction = function(x, y) {
    //console.log("plantcrops " + x + ", " + y);
    var koordx = Math.floor(x / sivunPituus);
    var koordy = Math.floor(y / sivunPituus);
    //console.log("on grid: " + koordx + ", " + koordy);

    var i = this.controller.checkForBuilding(koordx, koordy);
    //console.log(patch);

    if (!i) {
        //console.log("You can only plant on a farm patch!");
        return;
        //return "You can only plant on a farm patch!";
    }

    var building = this.controller.world.buildings[i];

    if (!(building.type === BuildingType.patch)) {
        //console.log("Building is not a farm patch!");
        return;
    }

    if (building.field) {
        //console.log("Plant already exists!");
        return;
        //return "Plant already exists!";
    }

    if (this.controller.inventory[this.spawnType.name] <= 0) {
        //console.log("Not enough " + this.spawnType.name);
        return;
        //return "Not enough " + this.spawnType.name;
    }

    this.controller.inventory[this.spawnType.name]--;
    building.plant(this.spawnType);
    return "-1 " + this.spawnType.name;
};