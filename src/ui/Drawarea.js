Drawarea = function(canvas, camera, g, gui, world, controller, assetloader) {
    this.controller = controller;
    this.world = world;
    this.canvas = canvas;
    this.gui = gui;
    this.assetloader = assetloader;
    this.ratio = this.leveys / this.korkeus;
    this.currentWidth = window.innerWidth;
    this.currentHeight = window.innerHeight;
    this.canvas.width = this.leveys;
    this.canvas.height = this.korkeus;
    this.g = g;
    this.camera = camera;
    this.resize();

    this.ruudunleveys = 32;
    this.reuna = 4;

};

Drawarea.prototype.resize = function() {
    this.currentHeight = window.innerHeight;
    this.currentWidth = window.innerWidth;

    // this will create some extra space on the
    // page, allowing us to scroll past
    // the address bar, thus hiding it.
    if (this.android || this.ios) {
        document.body.style.height = (window.innerHeight + 50) + 'px';
    }

    this.canvas.width = this.currentWidth;
    this.canvas.height = this.currentHeight;

    //short delay for some mobile browsers
    window.setTimeout(function() {
        window.scrollTo(0, 1);
    }, 1);

    this.piirra();
};


Drawarea.prototype.piirra = function() {

    this.g.setTransform(1, 0, 0, 1, 0, 0);
    this.g.fillStyle = "#2f8136";
    this.g.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawGrid();
    this.drawGhost();
    this.drawSelection();
    this.drawSelectedBuilding();


    this.drawMessages();

    this.drawTouches();
    this.drawMenu();
    this.drawText();
    //this.g.drawImage(this.assetloader.plants, 0, 0, 100, 100);
};

Drawarea.prototype.drawText = function() {
    this.g.fillStyle = "#000000";
    this.g.fillText("width: " + this.canvas.width + ", height: " + this.canvas.height, 10, 10);
    this.g.fillText("begin_x0: " + this.gui.cameragui.begin_x0 + ", begin_y0: " + this.gui.cameragui.begin_y0 + ", cur_x0: " + this.gui.cameragui.cur_x0 + ", cur_y0: " + this.gui.cameragui.cur_y0 + ", touchdown: " + this.gui.cameragui.touchdown + ", multitouchdown: " + this.gui.cameragui.multitouchdown + ", scrolling: " + this.gui.cameragui.scrolling, 10, 20);
    this.g.fillText("Money: " + this.controller.money, 10, 30);
    this.g.fillText("corn: " + this.controller.inventory[CropType.corn.name], 10, 40);
    this.g.fillText("tomato: " + this.controller.inventory[CropType.tomato.name], 10, 50);
    this.g.fillText("Frame time: " + frametime, 10, 60);
    this.g.fillText("FPS: " + 1000 / frametime, 10, 70);
};

Drawarea.prototype.drawGrid = function() {

    this.camera.setTransform();

    this.g.fillStyle = "#DDDDDD";
    this.g.beginPath();
    for (var x = 0; x < 20; x++) {
        for (var y = 0; y < 12; y++) {

            this.g.rect(x * this.ruudunleveys, y * this.ruudunleveys, this.ruudunleveys, this.ruudunleveys);

        }
    }

    this.taydenRuudunLeveys = this.ruudunleveys - this.reuna * 2;
    this.g.strokeStyle = "#444444";
    this.g.stroke();

    var building = undefined;
//    var field = undefined;
//    var osuus = undefined;
//    var kulma = 0;

    for (var y in this.world.buildingGrid) {
        if (this.world.buildingGrid[y]) {
            //kulma = 0.01 * Math.sin(2 * y + Date.now() / 1000);
            for (var x in this.world.buildingGrid[y]) {

                building = this.world.buildingGrid[y][x];
                if (!building) {
                    continue;
                }
                if (building.type === BuildingType.patch) {
                    this.drawPatch(building);
                }
            }
        }
    }

    if (this.controller.ghost) {
        this.g.fillStyle = "#dddddd";
        this.g.fillRect(this.ruudunleveys * this.controller.ghost.x + this.reuna, this.ruudunleveys * this.controller.ghost.y + this.reuna, this.ruudunleveys - 2 * this.reuna, this.ruudunleveys - 2 * this.reuna);
    }

};

Drawarea.prototype.drawPatch = function(patch) {
    this.assetloader.patch.draw(this.g, 0, this.ruudunleveys * patch.x, this.ruudunleveys * patch.y);

    var field = patch.field;
    if (!field) {
        return;
    }
    var osuus = Math.min((Date.now() - field.begunAt) / field.type.duration, 1);
    //this.g.fillStyle = pelto.type.color;
    //this.g.fillRect(this.ruudunleveys * pelto.x + this.reuna, this.ruudunleveys * pelto.y + this.reuna, this.taydenRuudunLeveys, this.taydenRuudunLeveys);

    this.assetloader.images[field.type.name][Math.floor(osuus * 4)].draw(this.g, 0, this.ruudunleveys * patch.x, this.ruudunleveys * patch.y);
    //this.assetloader.images[field.type.name][Math.floor(osuus * 4)].draw(this.g, kulma, this.ruudunleveys * patch.x, this.ruudunleveys * patch.y);
    //this.assetloader.images[field.type.name][Math.floor(osuus * 4)].draw(this.g, 0.01*Math.sin(2*y+0.1*x+Date.now()/1000), this.ruudunleveys * patch.x, this.ruudunleveys * patch.y);


    //this.assetloader.corn[Math.floor(osuus * 4)].draw(this.g, this.ruudunleveys * patch.x, this.ruudunleveys * patch.y);
    this.g.fillStyle = "#aaaa00";

    this.g.fillRect(this.ruudunleveys * patch.x + this.reuna, this.ruudunleveys * patch.y + this.ruudunleveys - 3 * this.reuna, (this.ruudunleveys - 2 * this.reuna) * osuus, 2 * this.reuna);

};

Drawarea.prototype.drawSelectedBuilding = function() {
    var building = this.controller.selectedBuilding;
    if (building) {

        if (building.type === BuildingType.patch) {
            this.drawPatch(building);
        }
//        this.assetloader.patch.draw(this.g, 0, this.ruudunleveys * patch.x, this.ruudunleveys * patch.y);
//
//        field = patch.field;
//        if (!field) {
//            return;
//        }
//        osuus = Math.min((Date.now() - field.begunAt) / field.type.duration, 1);
//        var imageRegion = this.assetloader.images[field.type.name][Math.floor(osuus * 4)];
//
//        //this.g.fillStyle = "#dddddd";
//        //this.g.fillRect(this.ruudunleveys * patch.x+imageRegion.shiftx, this.ruudunleveys * patch.y+imageRegion.shifty, imageRegion.imgwidth, imageRegion.imgheight);
//
//        //this.g.fillStyle = pelto.type.color;
//        //this.g.fillRect(this.ruudunleveys * pelto.x + this.reuna, this.ruudunleveys * pelto.y + this.reuna, this.taydenRuudunLeveys, this.taydenRuudunLeveys);
//        imageRegion.draw(this.g, 0.01 * Math.sin(2 * patch.y + 0.1 * patch.x + Date.now() / 1000), this.ruudunleveys * patch.x, this.ruudunleveys * patch.y);
//        //this.assetloader.corn[Math.floor(osuus * 4)].draw(this.g, this.ruudunleveys * patch.x, this.ruudunleveys * patch.y);
//        this.g.fillStyle = "#aaaa00";
//
//        this.g.fillRect(this.ruudunleveys * patch.x + this.reuna, this.ruudunleveys * patch.y + this.ruudunleveys - 3 * this.reuna, (this.ruudunleveys - 2 * this.reuna) * osuus, 2 * this.reuna);

    }
};

Drawarea.prototype.checkCamera = function() {
    if (this.gui.cameragui.touchdown) {
        this.camera.x = this.gui.cameragui.cur_x0 - this.gui.cameragui.begin_x0;
        this.camera.y = this.gui.cameragui.cur_y0 - this.gui.cameragui.begin_y0;
    }
};

Drawarea.prototype.drawTouches = function() {
    this.g.setTransform(1, 0, 0, 1, 0, 0);

    if (this.gui.cameragui.touchdown) {

        /*
         var begin_x0 = this.gui.cameragui.begin_x0;
         var begin_y0 = this.gui.cameragui.begin_y0;
         
         var cur_x0 = this.gui.cameragui.cur_x0;
         var cur_y0 = this.gui.cameragui.cur_y0;
         
         this.g.beginPath();
         this.g.moveTo(begin_x0, begin_y0);
         this.g.lineTo(cur_x0, cur_y0);
         this.g.strokeStyle = "#000000";
         this.g.stroke();
         */
        var begin_mid_x = this.gui.cameragui.begin_mid_x;
        var begin_mid_y = this.gui.cameragui.begin_mid_y;

        var cur_mid_x = this.gui.cameragui.cur_mid_x;
        var cur_mid_y = this.gui.cameragui.cur_mid_y;

        this.g.beginPath();
        this.g.moveTo(begin_mid_x, begin_mid_y);
        this.g.lineTo(cur_mid_x, cur_mid_y);
        this.g.strokeStyle = "#ff0000";
        this.g.stroke();

    }

    if (this.gui.cameragui.multitouchdown) {
        var cur_x0 = this.gui.cameragui.cur_x0;
        var cur_y0 = this.gui.cameragui.cur_y0;
        var cur_x1 = this.gui.cameragui.cur_x1;
        var cur_y1 = this.gui.cameragui.cur_y1;
        this.g.beginPath();
        this.g.moveTo(cur_x0, cur_y0);
        this.g.lineTo(cur_x1, cur_y1);
        this.g.fillStyle = "#ffff00";
        this.g.stroke();
    }
};

Drawarea.prototype.drawMenu = function() {
    this.g.fillStyle = "#809E80";
    for (var button in this.gui.menugui.buttons) {
        button = this.gui.menugui.buttons[button];
        //console.log(button);
        this.g.fillStyle = "#809E80";
        this.g.fillRect(button.x, button.y, button.width, button.height);
        this.g.fillStyle = "#000000";
        this.g.fillText(button.text, button.x + 2, button.y + 10);
    }

    for (var button in this.gui.actiongui.buttonContainer.buttons) {
        button = this.gui.actiongui.buttonContainer.buttons[button];
        //console.log(button);
        this.g.fillStyle = "#509E50";
        this.g.fillRect(button.x, button.y, button.width, button.height);
        this.g.fillStyle = "#000000";
        this.g.fillText(button.text, button.x + 2, button.y + 10);
    }
};

Drawarea.prototype.drawGhost = function() {
    if (!this.controller.ghost) {
        return;
    }

    if (this.controller.ghost.valid) {
        this.g.fillStyle = "#dddddd";
    } else {
        this.g.fillStyle = "#FF0000";
    }

    this.g.fillRect(this.ruudunleveys * this.controller.ghost.x + this.reuna, this.ruudunleveys * this.controller.ghost.y + this.reuna, this.ruudunleveys * this.controller.ghost.type.size - 2 * this.reuna, this.ruudunleveys * this.controller.ghost.type.size - 2 * this.reuna);
};

Drawarea.prototype.drawSelection = function() {
    if (this.controller.selectedBuilding) {
        this.g.strokeStyle = "#E6E6E6";
        this.g.strokeRect(this.ruudunleveys * this.controller.selectedBuilding.x, this.ruudunleveys * this.controller.selectedBuilding.y, this.ruudunleveys, this.ruudunleveys);
    }
};

Drawarea.prototype.drawMessages = function() {
    //console.log(this.gui.actiongui.messages);
    var message = null;
    for (var i in this.gui.actiongui.messages) {
        message = this.gui.actiongui.messages[i];
        this.g.fillStyle = "#FFFF00";
        this.g.fillText(message.text, message.x, message.y);
        message.counter++;
        if (message.counter >= 100) {
            this.gui.actiongui.messages.splice(i, 1);
        }
    }
};