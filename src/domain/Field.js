Field = function(croptype) {
this.type = croptype;
this.begunAt = Date.now();
this.readyAt = this.begunAt+this.type.duration;
};

Field.prototype.ready = function() {
	return Date.now() >= this.readyAt;
};
