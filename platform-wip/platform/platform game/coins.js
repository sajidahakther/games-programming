function Coins(_x, _y, _width, _height, _img) {
 
 this.x = _x;
 this.y = _y;
 this.width = _width;
 this.height = _height;
 this.img = _img;

 this.update = function() {
  this.x+=1;
 }

 this.display = function() {
 // push();
  //translate(this.width, this.height);
  image(this.img, this.x, this.y, this.width, this.height);
  //pop();
 }
 
}