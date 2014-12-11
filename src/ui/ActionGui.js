ActionGui = function(controller, camera) {
    this.controller = controller;
    this.camera = camera;

    this.actions = [];
    this.actions["cornAction"] = new PlantAction(this.controller, CropType.corn);
    this.actions["tomatoAction"] = new PlantAction(this.controller, CropType.tomato);
    this.actions["scytheAction"] = new ScytheAction(this.controller);
    this.buttons = [];
    this.buttons["cornAction"] = new ActionButton(10, 100, 100, 40, "Corn", this.actions["cornAction"]);
    this.buttons["tomatoAction"] = new ActionButton(10, 100, 100, 40, "Tomato", this.actions["tomatoAction"]);
    this.buttons["scytheAction"] = new ActionButton(10, 100, 100, 40, "Scythe", this.actions["scytheAction"]);

    this.draggedButton = undefined;
    this.touchdown = false;
    this.buttonContainer = new ButtonContainer();

    this.messages = [];

//    var cornAction = new PlantAction(this.controller, CropType.corn);
//    var tomatoAction = new PlantAction(this.controller, CropType.tomato);
//    var scytheAction = new ScytheAction(this.controller);

//    var cornAction = function(controller, x, y) {
//        return controller.plantCrops(x, y, CropType.corn);
//    };
//
//    var tomatoAction = function(controller, x, y) {
//        return controller.plantCrops(x, y, CropType.tomato);
//    };
//
//    var scytheAction = function(controller, x, y) {
//        return controller.removeField(x, y);
//    };

//    this.cornButton = new ActionButton(10, 100, 100, 40, "Corn", this.actions["cornAction"], false);
//    this.tomatoButton = new ActionButton(10, 100, 100, 40, "Tomato", this.actions["tomatoAction"], false);
//    this.scytheButton = new ActionButton(10, 100, 100, 40, "Scythe", this.actions["scytheAction"], true);

};

ActionGui.prototype.touchDown = function(x, y, identifier) {
    if (this.touchdown) {
        return true;
    }

    var button = this.checkForButton(x, y, this.buttonContainer.buttons);
    if (button) {
        this.draggedButton = button;
        this.touchdown = true;
        return true;
    }

    return false;
};

ActionGui.prototype.checkForButton = function(x, y, buttonlist) {
    var button = null;
    for (var i in buttonlist) {
        button = buttonlist[i];
        if (button.inBounds(x, y)) {
            return button;
        }
    }
    return null;
};

ActionGui.prototype.touchDragged = function(x, y, identifier) {
    if (!this.touchdown) {
        return false;
    }

    if (!this.draggedButton) {
        return false;
    }

    this.draggedButton.x = x;
    this.draggedButton.y = y;

    var translated = this.camera.t.inverseTransformPoint(x, y);

    if (!this.draggedButton.active) {
        var koordx = Math.floor(translated[0] / sivunPituus);
        var koordy = Math.floor(translated[1] / sivunPituus);
        //var patch = this.controller.checkForPatch(koordx, koordy);
        //console.log(patch);
        if (this.controller.world.buildings[this.controller.checkForBuilding(koordx, koordy)] === this.controller.selectedBuilding) {
            this.draggedButton.active = true;
        }
    }

    //console.log("active: " + this.draggedButton.active);

    if (this.draggedButton.active) {
        //var translated = this.camera.t.inverseTransformPoint(this.draggedButton.x, this.draggedButton.y);
        var message = this.draggedButton.action.performAction(translated[0], translated[1]);
        if (message) {
            this.messages.push(new Message(translated[0], translated[1], message));
        }
    }

    return true;
};

ActionGui.prototype.touchUp = function() {
    if (this.draggedButton) {
        this.draggedButton.active = false;
    }
    this.draggedButton = undefined;
    this.buttonContainer.clear();
    this.touchdown = false;
};

ActionGui.prototype.doAction = function(x, y) {

};

ActionGui.prototype.removeButtons = function() {
    this.buttonContainer.clear();
};

ActionGui.prototype.setButtons = function() {
    var building = this.controller.selectedBuilding;
    if (!building) {
        return;
    }
    
    var koordx = building.x * sivunPituus;
    var koordy = building.y * sivunPituus;
    var translated = this.camera.t.transformPoint(koordx, koordy);
    this.buttonContainer.setCoords(translated[0], translated[1]);

    var actions = building.getActions();
    for (var i in actions) {
        var action = actions[i];
        this.buttonContainer.add(this.buttons[action]);
    }

};

ActionGui.prototype.mouseMove = function(x, y) {
};

ActionGui.prototype.scrolled = function(deltaY) {
};
