Inputlistener = function(piirtoalusta, gui) {
    this.mouseX = 0;
    this.mouseY = 0;
    this.piirtoalusta = piirtoalusta;
    this.gui = gui;

    var temp_touch = undefined;

    window.addEventListener('keydown', function(e) {

    }, false);

    window.addEventListener('mousedown', function(e) {
        gui.touchDown(e.pageX, e.pageY, "mouse");
    }, false);

    window.addEventListener('mousemove', function(e) {
        if (gui.isTouchDown()) {
            gui.touchDragged(e.pageX, e.pageY, "mouse");
        }
        gui.mouseMove(e.pageX, e.pageY);
    }, false);

    window.addEventListener('mousewheel', function(e) {
        //console.log("mouse wheel");
        gui.scrolled(e.deltaY);
        //console.log(e);
    }, false);

    window.addEventListener('mouseup', function(e) {
        gui.touchUp("mouse");
    }, false);

    window.addEventListener('touchstart', function(e) {
        e.preventDefault();
        for (var i = 0; i < e.changedTouches.length; i++) {
            temp_touch = e.changedTouches.item(i);
            gui.touchDown(temp_touch.pageX, temp_touch.pageY, temp_touch.identifier);
        }
    }, false);

    window.addEventListener('touchmove', function(e) {
        e.preventDefault();
        for (var i = 0; i < e.changedTouches.length; i++) {
            temp_touch = e.changedTouches.item(i);
            gui.touchDragged(temp_touch.pageX, temp_touch.pageY, temp_touch.identifier);
        }
    }, false);
    window.addEventListener('touchend', function(e) {
        e.preventDefault();
        /*	for (var i = 0; i<e.changedTouches.length; i++) {
         temp_touch = e.changedTouches.item(i);
         gui.touchUp(temp_touch.identifier);
         }*/
        gui.touchUp();
    }, false);

    window.addEventListener('touchcancel', function(e) {
        console.log("touch cancel");
        gui.touchUp();
        //for (var touch in e.changedTouches) {
        //	gui.touchUp(touch.identifier);
        //}
        e.preventDefault();
    }, false);

    window.addEventListener('mouseout', function(e) {
        e.preventDefault();
        //gui.mouseOut();
    }, false);

    window.addEventListener('resize', function(e) {
        piirtoalusta.resize(e);

    }, false);

};
