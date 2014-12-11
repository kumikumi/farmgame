Controller = function(world) {
    this.world = world;
    this.money = 9000;
    this.ruudunleveys = 32;
    this.spawnType = CropType.corn;
    this.inventory = [];
    this.inventory[CropType.corn.name] = 200;
    this.inventory[CropType.tomato.name] = 2;
    this.ghost = undefined;
    this.selectedIndex = undefined;
    this.selectedBuilding = undefined;
};

Controller.prototype.click = function(x, y) {

    var koordx = Math.floor(x / this.ruudunleveys);
    var koordy = Math.floor(y / this.ruudunleveys);

    var i = this.checkForBuilding(koordx, koordy);
    if (!i) {
        this.selectedBuilding = undefined;
        this.selectedIndex = undefined;
        return;
    }
    this.selectedIndex = i;
    this.selectedBuilding = this.world.buildings[i];

};

//Controller.prototype.plantCrops = function(x, y, croptype) {
//    this.spawnType = croptype;
//    //console.log("plantcrops " + x + ", " + y);
//    var koordx = Math.floor(x / this.ruudunleveys);
//    var koordy = Math.floor(y / this.ruudunleveys);
//    //console.log("on grid: " + koordx + ", " + koordy);
//
//    var patch = this.checkForPatch(koordx, koordy);
//    //console.log(patch);
//
//    if (!patch) {
//        return;
//        //return "You can only plant on a farm patch!";
//    }
//
//    if (this.world.patches[patch].field) {
//        return;
//        //return "Plant already exists!";
//    }
//
//    if (this.inventory[this.spawnType.name] <= 0) {
//        return;
//        //return "Not enough " + this.spawnType.name;
//    }
//
//    this.inventory[this.spawnType.name]--;
//    this.world.patches[patch].plant(this.spawnType);
//    return "-1 " + this.spawnType.name;
//};

Controller.prototype.newGhost = function(buildingtype) {
    this.ghost = new GhostBuilding(this, buildingtype);
};

Controller.prototype.moveGhost = function(x, y) {
    if (!this.ghost) {
        console.error("tried to move ghost when there is no ghost");
    }
    var koordx = Math.floor(x / this.ruudunleveys);
    var koordy = Math.floor(y / this.ruudunleveys);

    this.ghost.moveTo(koordx, koordy);
    //this.ghost = {x: koordx, y: koordy};
};

Controller.prototype.insertBuilding = function() {
    if (!this.ghost) {
        return "Something went wrong! Please try again.";
    }

    if (this.checkForBuilding(this.ghost.x, this.ghost.y)) {
        return "Farm patch already exists!";
    }

    if (this.money - 5 < 0) {
        return "Not enough money!";
    }

    if (this.ghost.type === BuildingType.patch) {
        this.money -= 5;
        this.world.addBuilding(new Patch(this.ghost.x, this.ghost.y));
    }

    return "-5 €";
};
//
//Controller.prototype.removeField = function(x, y) {
//    var koordx = Math.floor(x / this.ruudunleveys);
//    var koordy = Math.floor(y / this.ruudunleveys);
//
//    var i = this.checkForPatch(koordx, koordy);
//    if (!i) {
//        return;
//    }
//    var patch = this.world.patches[i];
//
//    if (!patch.field) {
//        return;
//    }
//
//    if (!patch.field.ready()) {
//        return;
//    }
//
//    this.inventory[patch.field.type.name] += 2;
//    var cropname = patch.field.type.name;
//    patch.field = undefined;
//    return "+2 " + cropname;
//};

Controller.prototype.checkForBuilding = function(x, y) {
    for (var i in this.world.buildings) {
        var building = this.world.buildings[i];
        if (x >= building.x && x < building.x + building.type.size && y >= building.y && y < building.y + building.type.size) {
            return i;
        }
    }
    return null;
};
