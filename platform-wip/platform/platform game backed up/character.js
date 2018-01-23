function Character() {
 this.x = 64;
 this.y = height / 2;

 this.gravity = 1;
 this.lift = -25;
 this.velocity = 0;
 this.move = 100;

 this.highlight = false;

 // this.lands = function(platforms) {
 //  if (this.y > platforms.y) {
 //   if (this.x > platforms.x && this.x < platforms.x + platforms.w) { 
 //    this.highlight = true;
 //    return true;
 //   }
 //  }
 
  this.lands = function(platforms) {
  if (this.y > platforms.y) {
   if (this.x > platforms.x && this.x < platforms.x + platforms.w) { 
    this.highlight = true;
    return true;
   }
  }

  this.highlight = false;
  return false;
 }

 this.show = function() {
  fill(255, 255, 255);
  ellipse(this.x, this.y, 32, 32);
  if (this.highlight) {
   fill(255, 0, 0);
   ellipse(this.x, this.y, 32, 32) //ellipse changes colour (overlapped)
  }

 }

 this.up = function() {
  this.velocity += this.lift;
 }

 this.update = function() {
  this.velocity += this.gravity;
  this.velocity *= 0.9;
  this.y += this.velocity;

  if (this.y > height) {
   this.y = height;
   this.velocity = 0;
   //console.log("has fallen");
   if (state != gameOverScreen1) {
    state = gameOverScreen1;
   }
  }


  if (this.y < 0) {
   this.y = 0;
   this.velocity = 0;
  }

 }

}