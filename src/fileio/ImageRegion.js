ImageRegion = function(image, offsetx, offsety, imgwidth, imgheight, shiftx, shifty) {
    this.image = image;
    this.offsetx = offsetx;
    this.offsety = offsety;
    this.imgwidth = imgwidth;
    this.imgheight = imgheight;
    this.shiftx = shiftx;
    this.shifty = shifty;
};

ImageRegion.prototype.draw = function(g, rotation, x, y, width, height) {
    if (!width) {
        width = this.imgwidth;
    }
    if (!height) {
        height = this.imgheight;
    }

    if (rotation) {

        g.save();
        g.translate(x + this.shiftx + width / 2, y + this.shifty + height);
        g.rotate(rotation);
        g.translate(-1 * (width / 2), -1 * height);
        g.drawImage(this.image, this.offsetx, this.offsety, this.imgwidth, this.imgheight, 0, 0, width, height);
        g.restore();

    } else {
        g.drawImage(this.image, this.offsetx, this.offsety, this.imgwidth, this.imgheight, x + this.shiftx, y + this.shifty, width, height);
    }


};