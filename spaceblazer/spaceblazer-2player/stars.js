function Star() {
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.star = random(width);
  this.pstar = this.star;

  this.update = function() {
    this.star = this.star - speed2;
    if (this.star < 1) {
      this.star = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pstar = this.z;
    }
  }

  this.show = function() {
    fill(255, 254, 250);
    noStroke();

    var sx = map(this.x / this.star, 0, 1, 0, width);
    var sy = map(this.y / this.star, 0, 1, 0, height);

    var r = map(this.star, 0, width, 16, 0);
    ellipse(sx, sy, r, r);
  }
}

// inspired by daniel shiffman: https://www.youtube.com/watch?v=17WoOqgXsRM