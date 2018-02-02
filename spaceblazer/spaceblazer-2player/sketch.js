var stars = [];
var spaceship = [];
var space = [];
var sound = [];
var speed2; //speed for bg stars/spaceships
var base;
var p1meteorbullets;
var p2meteorbullets;
var astronauts;
var rocket1;
var rocket2;
var edge = 40;
//2d array variables
var csize = 10;
var rsize = 10;
var colours = [];

function preload() {

  //images
  space[1] = loadImage('images/spaceship.png');
  space[2] = loadImage('images/space.png');
  space[3] = loadImage('images/startscreen.png');
  space[4] = loadImage('assets/meteor_bullet.png');
  space[5] = loadImage('assets/rocket1.png');
  space[6] = loadImage('images/gameoverscreen.png');
  space[7] = loadImage('assets/rocket2.png');

  //sound
  sound[0] = loadSound('sounds/spacesound.wav');
  sound[1] = loadSound('sounds/lasershot.wav');
  sound[2] = loadSound('sounds/explosion.wav');
  sound[3] = loadSound('sounds/collect.wav');
  sound[4] = loadSound('sounds/gameover.wav');

  //volumne settings
  sound[0].setVolume(1.0);
  sound[1].setVolume(0.5);
  sound[2].setVolume(0.3);
  sound[3].setVolume(0.5);
  sound[4].setVolume(0.2);
}

function setup() {
  createCanvas(900, 540);

  for (var i = 0; i < csize; i++) {
    colours[i] = [];
    for (var j = 0; j < rsize; j++) {
      colours[i][j] = random(255);
    }
  }

  //background space sound
  sound[0].loop();

  //planets
  saturn = createSprite(100, 100);
  saturn.addImage(loadImage("assets/saturn1.png"));

  jupiter = createSprite(360, 400);
  jupiter.addImage(loadImage("assets/jupiter.png"));

  earth = createSprite(840, 90);
  earth.addImage(loadImage("assets/earth.png"));

  //player1
  rocket1 = createSprite(20, height / 2);
  rocket1.maxSpeed = 6;
  rocket1.friction = .98;
  rocket1.addImage("normal", space[5]);

  //player2
  rocket2 = createSprite(width - 20, height / 2);
  rocket2.maxSpeed = 6;
  rocket2.friction = .98;
  rocket2.setCollider("circle", 0, 0, 20);
  rocket2.addImage("normal", space[7]);

  astronauts = new Group();
  p1meteorbullets = new Group();
  p2meteorbullets = new Group();

  for (var i = 0; i < 10; i++) {
    var ang = random(360);
    //making the astronauts spin
    var ax = width / 2 + 1000 * cos(radians(ang));
    var ay = height / 2 + 1000 * sin(radians(ang));
    // ^ inspired by p5play: http://p5play.molleindustria.org/examples/index.html?fileName=asteroids.js
    createAstronaut(3, ax, ay);
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

  if ((state == p1winsScreen) || (state == p2winsScreen)) {
    if (mouseX > width / 2 - 125 &&
      mouseX < width / 2 + 125 &&
      mouseY > height / 2 - 0 &&
      mouseY < height / 2 + 60) {
      state = startScreen;
      sound[3].play();
    }
    if (mouseX > width / 2 - 125 &&
      mouseX < width / 2 + 125 &&
      mouseY > height / 2 + 80 &&
      mouseY < height / 2 + 130) {
      state = startScreen;
      sound[3].play();
    }
  }
}

function mouseMoved() {
  if (state == startScreen) {
    if (mouseX > width / 2 - 125 &&
      mouseX < width / 2 + 125 &&
      mouseY > height / 2 - 0 &&
      mouseY < height / 2 + 60 ||
      mouseX > width / 2 - 125 &&
      mouseX < width / 2 + 125 &&
      mouseY > height / 2 + 80 &&
      mouseY < height / 2 + 130) {
      cursor(HAND);
    } else {
      cursor(ARROW);
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
  cursor(CROSS);

  fill(178, 2, 2) //p1 red base
  base(10, height / 2 + 5, 100);

  fill(46, 26, 127) //p2 blue base
  base(890, height / 2, 100);

  speed2 = map(0, 0, width, 2, 0);

  //bg settings for stars, spaceships
  for (var i = 0; i < stars.length; i++) {
    stars[i].show();
    stars[i].update();
  }
  for (var i = 0; i < spaceship.length; i++) {
    spaceship[i].show();
    spaceship[i].update();
  }

  for (var i = 0; i < allSprites.length; i++) {
    var abr = allSprites[i];
    //when the sprites:(astronauts, bullets, rockets) go past the edge, they return from the opposite side (used if in for loops)
    if (abr.position.x < -edge)
      abr.position.x = width + edge;

    if (abr.position.x > width + edge)
      abr.position.x = -edge;

    if (abr.position.y < -edge)
      abr.position.y = height + edge;

    if (abr.position.y > height + edge)
      abr.position.y = -edge;
  }

  astronauts.overlap(p1meteorbullets, astronautHit); //if the player's bullets hits the astronauts, gameover.
  astronauts.overlap(p2meteorbullets, astronautHit);

  rocket2.overlap(p1meteorbullets, p2Hit); //when player 1 shoots player 2, p2 dies and p1 wins
  rocket1.overlap(p2meteorbullets, p1Hit);

  //cannot pass through objects (planets)
  rocket1.collide(saturn);
  rocket2.collide(saturn);

  rocket1.collide(jupiter);
  rocket2.collide(jupiter);

  rocket1.collide(earth);
  rocket2.collide(earth);

  rocket1.collide(rocket2);
  rocket2.collide(rocket1);

  //player 2 keys:
  if (keyDown(LEFT_ARROW))
    rocket2.rotation -= 4;
  if (keyDown(RIGHT_ARROW))
    rocket2.rotation += 4;
  if (keyDown(UP_ARROW)) {
    rocket2.addSpeed(.2, rocket2.rotation);
  } else
    rocket2.changeAnimation("normal");

  //creating bullets
  if (keyWentDown("1")) {
    var bullet = createSprite(rocket1.position.x, rocket1.position.y, width - 20, height / 2);
    bullet.addImage(space[4]);
    bullet.setSpeed(10 + rocket1.getSpeed(), rocket1.rotation);
    //bullet life = how far out the bullets go
    bullet.life = 20;
    p1meteorbullets.add(bullet);
    sound[1].play();
  }

  //player 1 keys:
  if (keyDown("a"))
    rocket1.rotation -= 4;
  if (keyDown("d"))
    rocket1.rotation += 4;
  if (keyDown("w")) {
    rocket1.addSpeed(.2, rocket1.rotation);
  } else
    rocket1.changeAnimation("normal");

  if (keyWentDown(" ")) {
    var bullet = createSprite(rocket2.position.x, rocket2.position.y, width - 20, height / 2);
    bullet.addImage(space[4]);
    bullet.setSpeed(10 + rocket2.getSpeed(), rocket2.rotation);
    //bullet life = how far out the bullets go
    bullet.life = 20;
    p2meteorbullets.add(bullet);
    sound[1].play();
  }

  drawSprites();
}

function base(x, y, diameter) {
  ellipse(x, y, diameter, diameter);
}

function createAstronaut(type, x, y) {
  var astro = createSprite(x, y);

  //adding 4 types of astronauts, this was inspired by p5play example: http://p5play.molleindustria.org/examples/index.html?fileName=asteroids.js
  var img = loadImage("assets/astro" + floor(random(0, 4)) + ".png");
  astro.addImage(img);

  //set speed of astronauts '2'
  astro.setSpeed(2 - (type / 2), random(360));
  astro.rotationSpeed = 0.1;
  astro.type = type;

  astronauts.add(astro);
  return astro;
}

function astronautHit(astronaut, bullet) {
  //if astronaut is hit by the bullet - gameover screen is displayed
  bullet.remove();
  astronaut.remove();
  sound[4].play();
  if ((state != gameOverScreen)) {
    state = gameOverScreen;
  }
}

//if player 1 is hit by the bullet of player 2 (rocket), display: player 2 win screen
function p1Hit(rocket2, bullet) {
  sound[2].play();
  if ((state != p2winsScreen)) {
    state = p2winsScreen;
  }
}

//if player 2 is hit by the bullet of player 1 (rocket), display: player 1 win screen
function p2Hit(rocket1, bullet) {
  sound[2].play();
  if ((state != p1winsScreen)) {
    state = p1winsScreen;
  }
}

function gameOverScreen() {
  background(space[6]);

  //loop for the 2d array
  for (var i = 0; i < csize; i++) {
    for (var j = 0; j < rsize; j++) {
      var x = i * 90;
      var y = j + 1;

      fill(colours[i][j]);
      stroke(0);
      ellipse(x, y, 10, 10);
    }
  }

  rectMode(CENTER);
  fill(9, 46, 92);
  strokeWeight(3);
  rect(width / 2, height / 2 + 30, 250, 50);
  textAlign(CENTER);
  fill(255);
  textSize(28);
  text("TRY AGAIN", width / 2, height / 2 + 40);
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
  textSize(20);
  text("Player 1 (Left) Player 2 (Right)", width / 2, height / 2 - 40);
  text("Player 1 Keys: (A) left, (W) forward, (D) right, (1) shoot", width / 2, height / 2 - 10);
  text("Player 2 Arrow Keys: (<) left, (^) forward, (>) right. Spacebar to shoot.", width / 2, height / 2 + 20);
  text("Shoot the other player to win. If Astronauts are shot, gameover.", width / 2, height / 2 + 50);
  text("Press 'X' key to begin game.", width / 2, height / 2 + 80);

  if (keyWentDown("x")) {
    if ((state != playScreen)) {
      state = playScreen;
    }
  }
}

function p2winsScreen() {
  strokeWeight(4);
  stroke(255);
  background(space[2]);
  rectMode(CENTER);
  fill(46, 26, 127);
  strokeWeight(2);
  rect(width / 2, height / 2, 800, 440);
  textAlign(CENTER);
  fill(255);
  textSize(68);
  text("PLAYER 2 WINS!", width / 2, height / 2);
  rectMode(CENTER);
  fill(46, 26, 127);
  strokeWeight(2);
  rect(width / 2, height / 2 + 110, 250, 50);
  textAlign(CENTER);
  fill(255);
  textSize(28);
  text("RESTART", width / 2, height / 2 + 120);

  //creating underline with player 2 img using while loop
  var x = 0;
  while (x < width) {
    image(space[7], x + 61, 300, 80, 71);
    x = x + 100;
  }
  fill(0);
  strokeWeight(0);
  ellipse(width, 348, 85, 70);
}

function p1winsScreen() {
  strokeWeight(4);
  stroke(255);
  background(space[2]);
  rectMode(CENTER);
  fill(163, 0, 2);
  strokeWeight(2);
  rect(width / 2, height / 2, 800, 440);
  textAlign(CENTER);
  fill(255);
  textSize(68);
  text("PLAYER 1 WINS!", width / 2, height / 2);
  rectMode(CENTER);
  fill(163, 0, 2);
  strokeWeight(2);
  rect(width / 2, height / 2 + 110, 250, 50);
  textAlign(CENTER);
  fill(255);
  textSize(28);
  text("RESTART", width / 2, height / 2 + 120);

  //creating underline with player 2 img using while loop
  var x = 0;
  while (x < width) {
    image(space[5], x + 61, 300, 80, 71);
    x = x + 100;
  }
  fill(0);
  strokeWeight(0);
  ellipse(width, 348, 85, 70);
}
