function Spacecraft() {
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.spacecraft = random(width);

  this.update = function() {
    this.spacecraft = this.spacecraft - speed;
    if (this.spacecraft < 1) {
      this.spacecraft = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pspacecraft = this.spacecraft;
    }
  }

  this.show = function() {

    var sx = map(this.x / this.spacecraft, 0, 1, 0, width);
    var sy = map(this.y / this.spacecraft, 0, 1, 0, height);

    var r = map(this.spacecraft, 0, width / 2, 16, 40);
     ellipse(sx, sy, r, r);
    //image(images[1], sx, sy, r, r);
  }
}