var canvas = document.getElementById("piirtoalue");
var g = canvas.getContext("2d");
var camera = new Camera(this.g);

var assetloader = new AssetLoader();
var world = new World();
var controller = new Controller(world);
var sivunPituus = 32;
var gui = new Gui(controller, camera);
var piirtoalusta = new Drawarea(canvas, camera, g, gui, world, controller, assetloader);



//gui.cameragui.camera = piirtoalusta.camera;
//gui.menugui.camera = piirtoalusta.camera;
//gui.actiongui.camera = piirtoalusta.camera;

var inputlistener = new Inputlistener(piirtoalusta, gui);
//var endtime = 1;
var frametime = 1;
var begintime = 1;
var timestamp = 1;
var lasttimestamp = 1;
var datefunction = null;
if (typeof(performance) === "object" && typeof(performance.now) === "function") {
    datefunction = performance;
} else {
    datefunction = Date;
}

function draw() {
    lasttimestamp = timestamp;
    timestamp = datefunction.now();
    frametime = timestamp-lasttimestamp;
    requestAnimationFrame(draw);
    piirtoalusta.piirra();
    //endtime = performance.now();
    //frametime = endtime-begintime;
    
}
draw();


