//Overlap Point and pixel
//the collisions are not checked against bounding boxes but between
//points or image pixels

//left and right keys to move the sprite
//it's position is adjusted to another sprite's opaque pixels

var player;
var coin;
var platform;
var GRAVITY = 1;

function setup() {
 createCanvas(800, 400);

 player = createSprite(300, 150);
 player.addAnimation("normal", "triangle.png");
 player.debug = true;

 coin = createSprite(500, 150);
 coin.addAnimation("normal", "coin1.png", "coin2.png");
 coin.addAnimation("transformed", "");
 coin.setCollider("circle", 0, 0, 50);
 coin.debug = true;

 platform = createSprite(400, 300);
 platform.addImage(loadImage("platform2.png"));

 player.depth = 10;
}

function draw() {
 background(255, 255, 255);

 //if no arrow input set velocity to 0
 player.velocity.x = 0;

 if (keyIsDown(LEFT_ARROW))
  player.velocity.x = -5;
 if (keyIsDown(RIGHT_ARROW))
  player.velocity.x = 5;

 //instead of checking the colliders or bounding box overlaps
 //I can just check a point against a collider
 if (coin.overlapPoint(player.position.x, player.position.y))
  coin.changeAnimation("transformed");

 //Or check a point against the pixels of a sprite animation or image
 //if the bottom of the player is not overlapping with the non transparent pixels
 //of the platform make it fall
 if (platform.overlapPixel(player.position.x, player.position.y + 30) == false)
  player.velocity.y += GRAVITY;

 //if the bottom of the player is overlapping the non transparent pixels
 //of the platform move it up one pixel until it doesn't overlap anymore
 while (platform.overlapPixel(player.position.x, player.position.y + 30)) {
  player.position.y--;
  player.velocity.y = 0;
 }

 drawSprites();
}

function keyPressed() {
 if (keyCode === UP_ARROW) {
 player.lift = -25;
 player.vel = 0;
  player.vel += player.lift;
 }
}