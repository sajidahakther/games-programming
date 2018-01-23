function Spaceship() {
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.spaceship = random(width);

  this.update = function() {
    this.spaceship = this.spaceship - speed2;
    if (this.spaceship < 1) {
      this.spaceship = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pspaceship = this.spaceship;
    }
  }

  this.show = function() {

    var sx = map(this.x / this.spaceship, 0, 1, 0, width);
    var sy = map(this.y / this.spaceship, 0, 1, 0, height);

    var r = map(this.spaceship, 0, width / 2, 16, 40);
    image(space[1], sx, sy, r, r);
  }
}