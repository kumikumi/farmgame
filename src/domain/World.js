World = function() {
//	this.esine = {x: 100, y:100};
    this.buildingGrid = [];
    this.buildings = [];
//    this.fields = [];
//    this.fieldGrid = [];

    var patch1 = new Patch(5, 4);
    patch1.plant(CropType.corn);
    var patch2 = new Patch(5, 5);
    patch2.plant(CropType.corn);
    
    this.addBuilding(patch1);
    this.addBuilding(patch2);
    
//    this.patches.push(patch1);
//    this.patches.push(patch2);

//    this.patches.push({x: 5, y: 4});
//    this.patches.push({x: 5, y: 5});
//    this.addField(new Field(5, 4, CropType.corn));
//    this.addField(new Field(5, 5, CropType.corn));
    //this.fields.push(new Field(5, 4, CropType.corn));
    //this.fields.push(new Field(5, 5, CropType.corn));

};

World.prototype.addBuilding = function(building) {
    this.buildings.push(building);
    this.buildingGrid[building.y] = this.buildingGrid[building.y] || [];
    this.buildingGrid[building.y][building.x] = building;
};

World.prototype.removeBuilding = function(i) {
    var building = this.buildings[i];
    this.buildings.splice(i, 1);
    this.buildingGrid[building.y][building.x] = undefined;
};

//World.prototype.addField = function(field) {
//    this.fields.push(field);
//    this.fieldGrid[field.y] = this.fieldGrid[field.y] || [];
//    this.fieldGrid[field.y][field.x] = field;
//};
//
//World.prototype.removeField = function(i) {
//    var field = this.fields[i];
//    this.fields.splice(i, 1);
//    this.fieldGrid[field.y][field.x] = undefined;
//};
