ButtonContainer = function() {
    this.buttons = [];
    this.x = 0;
    this.y = 0;
};

ButtonContainer.prototype.setCoords = function(x, y) {
    this.x = x;
    this.y = y;
};

ButtonContainer.prototype.add = function(button) {
    button.x = this.x - 160;
    button.y = this.y - 60 + this.buttons.length * 60;
    this.buttons.push(button);
};

ButtonContainer.prototype.clear = function() {
    this.buttons = [];
};