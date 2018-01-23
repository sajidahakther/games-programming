var stars = [];
var spaceship = [];
var space = [];
var sound = [];
//speed for stars and spaceships (bg)
var speed2;

var meteorbullets;
var astronauts;
var rocket;
var margin = 40;

var state = startScreen;

function preload() {

 space[1] = loadImage('images/spaceship.png');
 space[2] = loadImage('images/space.png');
 space[3] = loadImage('images/startscreen.png');
 space[4] = loadImage('assets/meteor_bullet.png');
 space[5] = loadImage('assets/newship2.png');
 space[6] = loadImage('images/gameoverscreen.png');

 sound[0] = loadSound('sounds/spacesound.wav');
 sound[1] = loadSound('sounds/lasershot.wav');
 sound[2] = loadSound('sounds/explosion.wav');
 sound[3] = loadSound('sounds/collect.wav');

 sound[0].setVolume(1.0);
 sound[1].setVolume(0.5);
 sound[2].setVolume(0.5);
}

function setup() {
 createCanvas(900, 540);
 //background space sound
 sound[0].loop();

 rocket = createSprite(width / 2, height / 2);
 rocket.maxSpeed = 6;
 rocket.friction = .98;
 rocket.setCollider("circle", 0, 0, 20);

 rocket.addImage("normal", space[5]);

 astronauts = new Group();
 meteorbullets = new Group();
 //increase number of astronauts per level '30'
 for (var i = 0; i < 30; i++) {
  var ang = random(360);
  //making the astronauts spin
  var px = width / 2 + 1000 * cos(radians(ang));
  var py = height / 2 + 1000 * sin(radians(ang));
  createAstronaut(3, px, py);
 }

 //settings for stars
 for (var i = 0; i < 500; i++) {
  stars[i] = new Star();
 }


 //settings for spaceships
 for (var i = 0; i < 20; i++) {
  spaceship[i] = new Spaceship();
 }
}

function draw() {
 state();
}

function mousePressed() {
 if ((state == startScreen) || (state == gameOverScreen)) {
  if (mouseX > width / 2 - 125 &&
   mouseX < width / 2 + 125 &&
   mouseY > height / 2 - 0 &&
   mouseY < height / 2 + 60) {
   state = playScreen;
   sound[3].play();
  }
  if (mouseX > width / 2 - 125 &&
   mouseX < width / 2 + 125 &&
   mouseY > height / 2 + 80 &&
   mouseY < height / 2 + 130) {
   state = instructionsScreen;
   sound[3].play();
  }
 }
}

function startScreen() {
 background(space[3]);
 rectMode(CENTER);
 fill(9, 46, 92);
 strokeWeight(3);
 rect(width / 2, height / 2 + 30, 250, 50);
 rect(width / 2, height / 2 + 100, 250, 50);
 textAlign(CENTER);
 fill(255);
 textSize(28);
 text("START GAME", width / 2, height / 2 + 40);
 text("INSTRUCTIONS", width / 2, height / 2 + 110);
}

function playScreen() {
 background(space[2]);

 speed2 = map(0, 0, width, 2, 0);
 //stars
 for (var i = 0; i < stars.length; i++) {
  stars[i].show();
  stars[i].update();
 }

 //spaceship
 for (var i = 0; i < spaceship.length; i++) {
  spaceship[i].show();
  spaceship[i].update();
 }

 //if astronauts position coming inwards and if past the margin, returns from the opposite side

 for (var i = 0; i < astronauts.length; i++) {
  var ast = astronauts[i];
  if (ast.position.x < -margin) ast.position.x = width + margin;
  if (ast.position.x > width + margin) ast.position.x = -margin;
  if (ast.position.y < -margin) ast.position.y = height + margin;
  if (ast.position.y > height + margin) ast.position.y = -margin;
 }

 astronauts.overlap(meteorbullets, astronautHit);
 rocket.overlap(astronauts, rocketHit);

 if (keyDown(LEFT_ARROW)) {
  rocket.rotation -= 4;
 }
 if (keyDown(RIGHT_ARROW)) {
  rocket.rotation += 4;
 } else
  rocket.changeAnimation("normal");

 if (keyWentDown(" ")) {
  var bullet = createSprite(rocket.position.x, rocket.position.y);
  bullet.addImage(space[4]);
  bullet.setSpeed(10 + rocket.getSpeed(), rocket.rotation);
  //bullet life = how far out the bullets go 
  bullet.life = 50;
  meteorbullets.add(bullet);
  sound[1].play();
 }

 drawSprites();
}

function createAstronaut(type, x, y) {
 var astro = createSprite(x, y);

 //adding 4 types of astronauts
 var img = loadImage("assets/astro" + floor(random(0, 4)) + ".png");
 astro.addImage(img);

 //increase speed of astronauts per level '3'
 astro.setSpeed(3 - (type / 2), random(360));
 astro.rotationSpeed = 0.2;
 astro.type = type;

 astro.mass = 2 + astro.scale;
 astro.setCollider("circle", 0, 0, 50);
 astronauts.add(astro);
 return astro;
}

function astronautHit(astronaut, bullet) {
 bullet.remove();
 astronaut.remove();
 //sound[2].play();
}

function rocketHit(rocket, astronaut) {
 // rocket.remove();
 sound[2].play();
 if ((state != gameOverScreen)) {
  state = gameOverScreen;
 }
}

function gameOverScreen() {
 background(space[6]);
 rectMode(CENTER);
 fill(9, 46, 92);
 strokeWeight(3);
 rect(width / 2, height / 2 + 30, 250, 50);
 textAlign(CENTER);
 fill(255);
 textSize(28);
 text("RESTART GAME", width / 2, height / 2 + 40);
}

function instructionsScreen() {
 background(space[2]);
 rectMode(CENTER);
 fill(9, 46, 92);
 strokeWeight(3);
 rect(width / 2, height / 2, 800, 440);
 textAlign(CENTER);
 fill(255);
 textSize(68);
 text("INSTRUCTIONS", width / 2, height / 2 - 100);
 textSize(28);
 text("Right Arrow to move clockwise.", width / 2, height / 2 - 20);
 text("Left Arrow to move anti-clockwise.", width / 2, height / 2 + 10);
 text("Spacebar to shoot Astronauts.", width / 2, height / 2 + 40);
 text("If Astronauts hit the rocket, gameover.", width / 2, height / 2 + 70);
 text("Press 'X' to start game", width / 2, height / 2 + 100);
 //
 rectMode(CENTER);
 fill(9, 46, 92);
 strokeWeight(3);
 rect(width / 2, height / 2 + 140, 250, 50);
 textAlign(CENTER);
 fill(255);
 textSize(28);
 text("START GAME", width / 2, height / 2 + 150);

 if (keyWentDown("x")) {
  if ((state != playScreen)) {
   state = playScreen;
  }
 }
}