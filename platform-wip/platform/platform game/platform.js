function Platform() {
 this.h = 35;
 this.x = width;
 this.y = random(100, 350);
 this.w = 200;
 this.speed = 5;


 this.show = function() {
  fill(255);
  image(images[0], this.x, this.y, this.w, this.h);
 }

 this.update = function() {
  this.x -= this.speed;
 }

 this.offscreen = function() {

  if (this.x < -this.w) {
   return true;
  } else {
   return false;
  }

 }

}