BuildingButton = function(x, y, width, height, text, buildingtype) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.buildingtype = buildingtype;
};

BuildingButton.prototype.inBounds = function(x, y) {
    return x >= this.x && y >= this.y && x < this.x + this.width && y < this.y + this.height;
};
