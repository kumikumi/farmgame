GhostBuilding = function(controller, type) {
    this.controller = controller;
    this.type = type;
    this.valid = false;
    this.x = 0;
    this.y = 0;
};

GhostBuilding.prototype.moveTo = function(x, y) {
    if (x === this.x && y === this.y) {
        return;
    }
    this.x = x;
    this.y = y;
    this.checkValidity();
};

GhostBuilding.prototype.checkValidity = function() {
    for (var i = this.x; i < this.x + this.type.size; i++) {
        for (var j = this.y; j < this.y + this.type.size; j++) {
            if (controller.checkForBuilding(i, j)) {
                this.valid = false;
                return;
            }
        }
    }
    this.valid = true;
    return;
};