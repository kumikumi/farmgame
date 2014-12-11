AssetLoader = function() {

    this.images = [];

    this.loaded = 0;
    this.plants = new Image();
    this.plants.onLoad = function() {
        console.log("kuvia ladattu: " + this.loaded);
    };

    this.plowed_soil = new Image();
    this.plowed_soil.onLoad = function() {
        console.log("kuvia ladattu: " + this.loaded);
    };



    //this.plants.onLoad = this.increment;
    this.plants.src = 'http://88.192.93.121/~mikko/farmipeli/assets/tilesets/plants.png';
    this.plowed_soil.src = 'http://88.192.93.121/~mikko/farmipeli/assets/tilesets/plowed_soil.png';

    this.patch = new ImageRegion(this.plowed_soil, 32, 96, 32, 32, 0, 0);

    this.corn = [];
    this.corn[0] = new ImageRegion(this.plants, 192, 0, 32, 64, 0, -42);
    this.corn[1] = new ImageRegion(this.plants, 192, 64, 32, 64, 0, -42);
    this.corn[2] = new ImageRegion(this.plants, 192, 128, 32, 64, 0, -42);
    this.corn[3] = new ImageRegion(this.plants, 192, 256, 32, 64, 0, -42);
    this.corn[4] = new ImageRegion(this.plants, 192, 192, 32, 64, 0, -42);

    this.tomato = [];
    this.tomato[0] = new ImageRegion(this.plants, 0, 0, 32, 64, 0, -42);
    this.tomato[1] = new ImageRegion(this.plants, 0, 64, 32, 64, 0, -42);
    this.tomato[2] = new ImageRegion(this.plants, 0, 256, 32, 64, 0, -42);
    this.tomato[3] = new ImageRegion(this.plants, 0, 128, 32, 64, 0, -42);
    this.tomato[4] = new ImageRegion(this.plants, 0, 192, 32, 64, 0, -42);

    this.images[CropType.corn.name] = this.corn;
    this.images[CropType.tomato.name] = this.tomato;

};

AssetLoader.increment = function() {
    this.loaded++;
    console.log("kuvia ladattu: " + this.loaded);
};
