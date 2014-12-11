Camera = function(context) {
    this.context = context;
    this.t = new Transform();
    this.skew = 0.2;
    this.x = 0;
    this.y = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.zoom = 1;
    this.moving = false;
}

Camera.prototype.setTransform = function() {
    if (this.moving) {
        this.x = (this.x + this.targetX) / 2;
        this.y = (this.y + this.targetY) / 2;

        if (Math.abs(this.x - this.targetX) < 10 && Math.abs(this.y - this.targetY) < 10) {
            this.x = this.targetX;
            this.y = this.targetY;
            this.moving = false;
        }
    }

    this.t.reset();
    var m = this.t.m;
    m[0] = this.zoom;
    m[1] = 0;
    m[2] = 0;
    m[3] = this.zoom;
    m[4] = -this.x;
    m[5] = -this.y;
//this.t.rotate(-Math.PI/4);
//this.t.scale(1, 1);
    this.context.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
//this.context.setTransform(this.zoom, 0, 0, this.zoom, -this.x, -this.y);
}

Camera.prototype.moveTo = function(x, y) {
    this.targetX = x - canvas.width / 2;
    this.targetY = y - canvas.height / 2;
    this.moving = true;
}
