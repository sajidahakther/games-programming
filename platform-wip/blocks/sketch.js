var platform;
var player;

function setup() {
 createCanvas(900, 400);
 platform = new Group();
 player = new Group();

 for (var i = 0; i < 3; i++) {
  var pf = createSprite(
   random(width), random(100, 300),
   random(150,250), 20);
  pf.addImage(loadImage("assets/platform.png"))
  pf.shapeColor = color(random(200, 255));
  if (frameCount % 30 == 0) {
   platform.add(pf);
  }
 }

 for (var i = 0; i < 1; i++) {
  var py = createSprite(
   width, height,
   40, 40);
  py.shapeColor = color(255);
  py.maxSpeed = 4;
  player.add(py);
 }
}

function draw() {
 background(0);

 for (var i = 0; i < platform.length; i++) {
  platform[i].position.x += platform[i].width * 0.01;
  if (platform[i].position.x > width) {
   platform[i].position.x = 0;
  }
 }
 
//loop backwards through array here, and splice the platform.

 player.x = 64;
 if (keyIsDown(RIGHT_ARROW))
  player.x += 5;
 console.log("right");
 if (keyIsDown(LEFT_ARROW))
  player.x -= 5;
 for (i = 0; i < player.length; i++) {
  player[i].attractionPoint(player.x, player.x, player.x);

 }

 player.collide(platform);

 drawSprites();


}