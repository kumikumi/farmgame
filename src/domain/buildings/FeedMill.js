FeedMill = function(x, y) {
    this.x = x;
    this.y = y;
    this.type = BuildingType.feedMill;
    this.actions = ["scytheAction"];
};

FeedMill.prototype.getActions = function() {
    return this.actions;
};