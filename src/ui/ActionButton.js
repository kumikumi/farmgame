ActionButton = function(x, y, width, height, text, action) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.action = action;
    //this.active = active;
};

ActionButton.prototype.inBounds = function(x, y) {
    return x >= this.x && y >= this.y && x < this.x + this.width && y < this.y + this.height;
};
