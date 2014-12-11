CameraGui = function(controller, camera, menugui, actiongui) {
    this.controller = controller;
    this.camera = camera;
    this.menugui = menugui;
    this.actiongui = actiongui;

    this.touchdown = false;
    this.multitouchdown = false;

    this.scrolling = false;


    this.begin_x0 = 0;
    this.begin_y0 = 0;
    this.identifier0 = 0;
    this.cur_x0 = 0;
    this.cur_y0 = 0;

    this.cur_x1 = 0;
    this.cur_y1 = 0;

    this.begin_mid_x = 0;
    this.begin_mid_y = 0;

    this.cur_mid_x = 0;
    this.cur_mid_y = 0;

    this.begin_cam_x = 0;
    this.begin_cam_y = 0;

    this.begin_zoom = 0;

    this.mouse_x = 0;
    this.mouse_y = 0;

};

CameraGui.prototype.touchDown = function(x, y, identifier) {
    this.actiongui.removeButtons();
    this.scrolling = false;
    if (!this.touchdown) {
        this.identifier0 = identifier;
        this.begin_x0 = x;
        this.begin_y0 = y;
        this.cur_x0 = x;
        this.cur_y0 = y;
        this.begin_mid_x = x;
        this.begin_mid_y = y;
        this.cur_mid_x = x;
        this.cur_mid_y = y;
        this.begin_cam_x = this.camera.x;
        this.begin_cam_y = this.camera.y;
        this.touchdown = true;
    } else if (!this.multitouchdown) {
        this.cur_x1 = x;
        this.cur_y1 = y;
        this.begin_mid_x = (this.cur_x0 + this.cur_x1) / 2;
        this.begin_mid_y = (this.cur_y0 + this.cur_y1) / 2;
        this.cur_mid_x = this.begin_mid_x;
        this.cur_mid_y = this.begin_mid_y;
        this.begin_cam_x = this.camera.x;
        this.begin_cam_y = this.camera.y;
        this.begin_dist = Math.sqrt((this.cur_y0 - this.cur_y1) * (this.cur_y0 - this.cur_y1) + (this.cur_x0 - this.cur_x1) * (this.cur_x0 - this.cur_x1));
        this.begin_zoom = this.camera.zoom;
        this.multitouchdown = true;
    }
};

CameraGui.prototype.touchDragged = function(x, y, identifier) {
    if (!this.touchdown) {
        return;
    }

    if (identifier === this.identifier0) {
        this.cur_x0 = x;
        this.cur_y0 = y;
    } else {
        this.cur_x1 = x;
        this.cur_y1 = y;
    }

    if (!this.scrolling && (this.cur_y0 - this.begin_y0) * (this.cur_y0 - this.begin_y0) + (this.cur_x0 - this.begin_x0) * (this.cur_x0 - this.begin_x0) > 200) {
        this.scrolling = true;
    }

    if (this.multitouchdown) {
        this.cur_mid_x = (this.cur_x0 + this.cur_x1) / 2;
        this.cur_mid_y = (this.cur_y0 + this.cur_y1) / 2;
        this.cur_dist = Math.sqrt((this.cur_y0 - this.cur_y1) * (this.cur_y0 - this.cur_y1) + (this.cur_x0 - this.cur_x1) * (this.cur_x0 - this.cur_x1));
        this.camera.zoom = (this.begin_zoom * this.cur_dist / this.begin_dist);
        this.camera.x = this.begin_cam_x + this.begin_mid_x - this.cur_mid_x + ((this.begin_mid_x + this.begin_cam_x) * (this.cur_dist / this.begin_dist) - (this.begin_mid_x + this.begin_cam_x));
        this.camera.y = this.begin_cam_y + this.begin_mid_y - this.cur_mid_y + ((this.begin_mid_y + this.begin_cam_y) * (this.cur_dist / this.begin_dist) - (this.begin_mid_y + this.begin_cam_y));

    } else {
        this.cur_mid_x = this.cur_x0;
        this.cur_mid_y = this.cur_y0;
        this.camera.x = this.begin_cam_x + this.begin_mid_x - this.cur_mid_x;
        this.camera.y = this.begin_cam_y + this.begin_mid_y - this.cur_mid_y;
    }
};

CameraGui.prototype.touchUp = function() {
    if (!this.touchdown) {
        return;
    }

    this.touchdown = false;
    this.multitouchdown = false;

    if (!this.scrolling && !this.multitouchdown) {
        //klikkaus
        var translated = this.camera.t.inverseTransformPoint(this.cur_x0, this.cur_y0);
        this.controller.click(translated[0], translated[1]);
        this.actiongui.setButtons();
    }
    this.begin_x0 = 0;
    this.begin_y0 = 0;
    this.cur_x0 = 0;
    this.cur_y0 = 0;

    this.scrolling = false;
};

CameraGui.prototype.mouseMove = function(x, y) {
    //console.log("mouse move");
    this.mouse_x = x;
    this.mouse_y = y;
};

CameraGui.prototype.scrolled = function(deltaY) {
    this.actiongui.removeButtons();
    var scroll_amount = deltaY / 1000;
    var old_zoom = this.camera.zoom;
    this.camera.zoom -= scroll_amount;


    //this.camera.x += ((this.mouse_x)*(this.camera.zoom/old_zoom)-(this.mouse_x))
    //this.camera.y += ((this.mouse_y)*(this.camera.zoom/old_zoom)-(this.mouse_y))

    this.camera.x += ((this.mouse_x * this.camera.zoom / old_zoom) - (this.mouse_x));
    this.camera.y += ((this.mouse_y * this.camera.zoom / old_zoom) - (this.mouse_y));

};

