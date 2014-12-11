Patch = function(x, y) {
    this.x = x;
    this.y = y;
    this.type = BuildingType.patch;
    this.scytheActionList = ["scytheAction"];
    this.plantActionList = ["cornAction", "tomatoAction"];
    this.emptyList = [];
};

Patch.prototype.plant = function(croptype) {
    this.field = new Field(croptype);
};

Patch.prototype.getActions = function() {
    if (this.field) {
        if (this.field.ready()) {
            return this.scytheActionList;
        }
    } else {
        return this.plantActionList;
    }
    return this.emptyList;
};