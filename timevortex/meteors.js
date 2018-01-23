function Meteor() {
 this.h = random(60,80);
 this.x = width;
 this.y = random(100, 550);
 this.w = random(80,100);
 this.speed = 5;


 this.show = function() {
  fill(255);
  image(images[2], this.x, this.y, this.w, this.h);
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