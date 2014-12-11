Gui = function(controller, camera) {
    this.controller = controller;
    this.menugui = new MenuGui(controller, camera);
    this.actiongui = new ActionGui(controller, camera);
    this.cameragui = new CameraGui(controller, camera, this.menugui, this.actiongui);
    
};

Gui.prototype.isTouchDown = function() {
    return this.cameragui.touchdown || this.menugui.touchdown || this.actiongui.touchdown;
};

Gui.prototype.touchDown = function(x, y, identifier) {
    this.menugui.touchDown(x, y, identifier) || this.actiongui.touchDown(x, y, identifier) || this.cameragui.touchDown(x, y, identifier);
};

Gui.prototype.touchDragged = function(x, y, identifier) {
    this.menugui.touchDragged(x, y, identifier) || this.actiongui.touchDragged(x, y, identifier) || this.cameragui.touchDragged(x, y, identifier);
};

Gui.prototype.touchUp = function() {
    this.menugui.touchUp();
    this.actiongui.touchUp();
    this.cameragui.touchUp();
};

Gui.prototype.mouseMove = function(x, y) {
    this.cameragui.mouseMove(x, y);
};

Gui.prototype.scrolled = function(deltaY) {
    this.cameragui.scrolled(deltaY);
};
