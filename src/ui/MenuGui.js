MenuGui = function(controller, camera) {
    this.controller = controller;
    this.camera = camera;
    this.buttons = [];
    this.draggedButton = undefined;
    this.touchdown = false;

    this.patchButton = new BuildingButton(10, 100, 100, 40, "Patch", BuildingType.patch);
    this.feedMillButton = new BuildingButton(10, 160, 100, 40, "Feed mill", BuildingType.feedMill);

    this.buttons = [this.patchButton, this.feedMillButton];

};

MenuGui.prototype.touchDown = function(x, y, identifier) {
    if (this.touchdown) {
        return true;
    }

    var button = this.checkForButton(x, y, this.buttons);
    if (button) {
        this.draggedButton = button;
        this.touchdown = true;

        this.controller.newGhost(button.buildingtype);
        var translated = this.camera.t.inverseTransformPoint(x, y);
        this.controller.moveGhost(translated[0], translated[1]);

        return true;
    }

    return false;
};

MenuGui.prototype.checkForButton = function(x, y, buttonlist) {
    var button = null;
    for (var i in buttonlist) {
        button = buttonlist[i];
        if (button.inBounds(x, y)) {
            return button;
        }
    }
    return null;
};

MenuGui.prototype.touchDragged = function(x, y, identifier) {
    if (!this.touchdown) {
        return false;
    }

    var translated = this.camera.t.inverseTransformPoint(x, y);
    this.controller.moveGhost(translated[0], translated[1]);
    //this.draggedButton.x = translated[0];
    //this.draggedButton.y = translated[1];

//    if (this.draggedButton && this.draggedButton.buttontype.executeOnDrag) {
//        this.draggedButton.action(this.controller);
//    }

    return true;
};

MenuGui.prototype.touchUp = function() {
    if (this.draggedButton) {
        this.controller.insertBuilding();
        //this.draggedButton.action(this.controller);
        this.controller.ghost = undefined;
    }
    this.draggedButton = undefined;
    this.touchdown = false;
};

MenuGui.prototype.mouseMove = function(x, y) {
};

MenuGui.prototype.scrolled = function(deltaY) {
};
