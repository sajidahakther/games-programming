var speed;
var tardis;
var asteroid;
var astronauts;
var smast;
var edge = 40;
var spiral = 0;
var cdiameter = 10;
var rdiameter = 10;
var scorecounter = 0;
var timecounter = 1000;
var state = startscreen;
var astro_collected = false;

var images = [];
var sounds = [];
var colours = [];
var meteors = [];
var spacecraft = [];


function preload() {
 e = loadJSON("extras.json");

 images[0] = loadImage("assets/bg.jpg");
 images[1] = loadImage("assets/r1.png");
 images[2] = loadImage("assets/meteor.png");
 images[3] = loadImage("assets/ss.png");
 images[4] = loadImage("assets/settings.png");
 images[5] = loadImage("assets/restart.png");
 images[6] = loadImage("assets/pause.png");

 sounds[0] = loadSound('sounds/spacesound.wav');
 sounds[1] = loadSound('sounds/collect.wav');
 sounds[2] = loadSound('sounds/gameover.wav');
 // sounds[3] = loadSound('sounds/tardis.wav');

 sounds[0].setVolume(1.0);
 sounds[1].setVolume(0.5);
 sounds[2].setVolume(0.2);
 // sounds[3].setVolume(1.0);
}

function setup() {
 createCanvas(1000, 600);

 sounds[0].loop();
 //sounds[3].loop();

 //ASTEROID
 asteroid = new Group();
 smast = new Group();

 for (i = 0; i < 10; i++) {
  var sa_ang = random(360); //making the astronauts spin
  var sa_x = width / 2 + 1000 * cos(radians(sa_ang));
  var sa_y = height / 2 + 1000 * sin(radians(sa_ang));
  smallAsteroids(3, sa_x, sa_y);
 }

 for (var i = 0; i < 17; i++) {
  var a = createSprite(
   random(width), random(height),
   random(50, 200), random(50, 100));
  a.addImage(loadImage("assets/rocks.png"));
  a.shapeColor = color(random(200, 255));
  asteroid.add(a);
 }

 //TARDIS
 tardis = createSprite(100, 100, 50, 50);
 tardis.addAnimation("moving", "assets/t1.png", "assets/t6.png");

 //METEORS
 meteors.push(new Meteor());


 //COLLECTIBLES
 astronauts = new Group();

 for (i = 0; i < 20; i++) {
  var ang = random(360); //making the astronauts spin
  var ax = width / 2 + 1000 * cos(radians(ang));
  var ay = height / 2 + 1000 * sin(radians(ang));
  Collectibles(3, ax, ay);
 }

 //SPACECRAFTS
 for (i = 0; i < 20; i++) {
  spacecraft[i] = new Spacecraft();
 }

 //2D ARRAY SET
 for (i = 0; i < cdiameter; i++) {
  colours[i] = [];
  for (var j = 0; j < rdiameter; j++) {
   colours[i][j] = random(255);
  }
 }
}

function draw() {
 state();
}



/////////////[ SCREENS ]/////////////

function startscreen() {
 background(images[0]);

 //VORTEX ANIMATION 
 push();
 noFill();
 translate(width / 2, height / 2);
 // Circle noise, set to white, with a random distribution within the circle vector that has been creating using the cos and sine angle.
 for (i = 0; i < 50; i++) {
  stroke(255);
  strokeWeight(1);
  var dist = max(random(0.0, 1.0), random(0.0, 1.0)) * width / 2.5;
  var angle = random(0, PI * 2);
  var p = createVector(cos(angle), sin(angle));
  p.mult(dist);
  point(p.x, p.y);
 }
 pop();

 push();
 noFill();
 translate(width / 2, height / 2 - 130);
 spiral += 0.0009; //spiral variable increases by 0.0009 every frame (+=)
 for (i = 0; i < 100; i++) {
  stroke(0); //black
  strokeWeight(0.8);
  rotate(spiral);
  ellipse(i, i, i * 3, i * 6);
 }
 pop();

 push();
 noFill();
 translate(width / 2, height / 2 - 130);
 for (i = 0; i < 100; i++) {
  stroke(255, 80); //white
  strokeWeight(0.3);
  rotate(spiral);
  ellipse(i, i, i * 6, i * 3);
 }
 pop();


 rectMode(CENTER);
 fill(e.r, e.g, e.b, 100);
 strokeWeight(2);
 rect(width / 2, height / 2 + 30, 250, 50);
 rect(width / 2, height / 2 + 100, 250, 50);
 textAlign(CENTER);
 fill(255);
 textSize(48);
 text("T I M E  V O R T E X", width / 2, height / 2 - 40);
 textSize(28);
 text("START GAME", width / 2, height / 2 + 40);
 text("INSTRUCTIONS", width / 2, height / 2 + 110);

 timecounter = 1000; //resets the timer
}


function playscreen() {
 background(images[0]);

 //SPACECRAFTS
 for (i = 0; i < spacecraft.length; i++) {
  spacecraft[i].show();
  spacecraft[i].update();
 }

 //TARDIS: MOUSE MOVEMENTS
 tardis.velocity.x = (mouseX - tardis.position.x) / 20;
 tardis.velocity.y = (mouseY - tardis.position.y) / 20;
 var rp = tardis.position.x;

 //If mouse is LEFT of tardis position, animation flips to left
 if (mouseX < rp - 10) {
  tardis.changeAnimation("moving");
  tardis.mirrorX(-1);
  tardis.velocity.x = -15; // Negative velocity moves left.

  //If mouse is RIGHT of tardis position, animation flips back to right
 } else if (mouseX > rp + 10) {
  tardis.changeAnimation("moving");
  tardis.mirrorX(1);
  tardis.velocity.x = 15;
 }

 //ASTEROID
 for (var i = 0; i < asteroid.length; i++) {
  asteroid[i].position.x += asteroid[i].width * 0.03;
  if (asteroid[i].position.x > width) {
   asteroid[i].position.x = 0;
  }
 }
 
  for (i = 0; i < smast.length; i++) {
  var sa = smast[i];
  if (sa.position.x < -edge)
   sa.position.x = width + edge;

  if (sa.position.x > width + edge)
   sa.position.x = -edge;

  if (sa.position.y < -edge)
   sa.position.y = height + edge;

  if (sa.position.y > height + edge)
   sa.position.y = -edge;
 }

 //METEORS: loop goes through array backwards to splice meteor when it's offscreen.
 for (i = meteors.length - 1; i >= 0; i--) {
  meteors[i].show();
  meteors[i].update();

  if (meteors[i].offscreen()) {
   meteors.splice(i, 1);
  }
 }

 if (frameCount % 200 === 0) {
  meteors.push(new Meteor());
 }

 //COLLECTIBLES: If it goes past the edge, it returns from the opposite side.
 for (i = 0; i < astronauts.length; i++) {
  var as = astronauts[i];
  if (as.position.x < -edge)
   as.position.x = width + edge;

  if (as.position.x > width + edge)
   as.position.x = -edge;

  if (as.position.y < -edge)
   as.position.y = height + edge;

  if (as.position.y > height + edge)
   as.position.y = -edge;
 }

 //tardis.overlap(meteoroid, tardisExplode);
 astronauts.overlap(tardis, tardisCollects);
 tardis.collide(asteroid);
 drawSprites();

 //BARS
 noStroke();
 fill(e.r, e.g, e.b); //top bar
 bar(0, 0, 1000, 40);
 fill(e.r, e.g, e.b); //bottom bar
 bar(0, 550, 1000, 50);

 //ICONS
 image(images[4], 20, 555, 47, 40); //settings
 image(images[5], 80, 555, 47, 40); //restart 
 image(images[6], 930, 555, 40, 40); //pause


 //COUNTERS
 var n = timecounter--;
 fill(255);
 text("TIME: " + timecounter, 20, 25);
 rect(90, 15, timecounter / 9, 10);

 if (rp < width / 2 - 200) {
  timecounter = n + 1;
 }

 if (timecounter === 0) {
  if (state != timeoverscreen) {
   state = timeoverscreen;
   sounds[2].play();
  }
 }

 /* Create an if statement, if the timer reaches a certain 
 amount, the timer sounds begins playing as warning. */

 scorecounter++;
 text("SCORE: " + scorecounter, 900, 25);
}

function instructionsscreen() {
 background(images[0]);
 rectMode(CENTER);
 fill(e.r, e.g, e.b, 100);
 strokeWeight(2);
 rect(width / 2, height / 2, 800, 440);
 textAlign(CENTER);
 fill(255);
 textSize(48);
 text("I N S T R U C T I O N S", width / 2, height / 2 - 100);
 textSize(20);
 text("Use the mouse to navigate the tardis.", width / 2, height / 2 - 40);
 text("Click on the astronauts to collect bonus points.", width / 2, height / 2 - 10);
 text("Your aim is to dodge the asteroids and to travel back to planet earth within", width / 2, height / 2 + 20);
 text(" the time limit. If the time runs out, if you lose way with the asteroids or ", width / 2, height / 2 + 50);
 text("if you get hit by a meteor, it's gameover. Press 'X' key to begin the game.", width / 2, height / 2 + 80);

 if (keyWentDown("x")) {
  if ((state != playscreen)) {
   sounds[1].play();
   state = playscreen;
  }
 }
}



/////////////[ GAMEOVER SCREENS ]/////////////

function timeoverscreen() {
 background(images[0]);


 for (var i = 0; i < cdiameter; i++) {
  for (var j = 0; j < rdiameter; j++) {
   var x = i * 90;
   var y = j + 1;

   fill(colours[i][j]);
   stroke(0);
   ellipse(x, y, 10, 10);
  }
 }

 rectMode(CENTER);
 fill(e.r, e.g, e.b, 100);
 strokeWeight(2);
 rect(width / 2, height / 2 + 30, 250, 50);
 textAlign(CENTER);
 fill(255);
 textSize(48);
 text("G A M E O V E R", width / 2, height / 2 - 80);
 textSize(28);
 text("TIME RAN OUT | SCORE: " + scorecounter, width / 2, height / 2 - 20);
 //text("SCORE: " + scorecounter, width / 2, height / 2 - 20);
 text("TRY AGAIN", width / 2, height / 2 + 40);
}



/////////////[ + FUNCTIONS ]/////////////

function Collectibles(type, x, y) {
 var astro = createSprite(x, y);
 var img = loadImage("assets/astro" + floor(random(0, 4)) + ".png");
 astro.addImage(img);

 astro.setSpeed(2 - (type / 2), random(360));
 astro.rotationSpeed = 0.8;
 astro.type = type;

 astronauts.add(astro);
 return astro;
}

function smallAsteroids(type, x, y) {
 var sa = createSprite(x, y);
 var img = loadImage("assets/roid" + floor(random(0, 4)) + ".png");
 sa.addImage(img);

 sa.setSpeed(2 - (type / 2), random(360));
 sa.rotationSpeed = 0.1;
 sa.type = type;

 smast.add(sa);
 return sa;
}

function tardisCollects(astronaut, tardis) {
 sounds[1].play();
 var sc = scorecounter++;
 scorecounter = sc + 100;
 astronaut.remove();
 astro_collected = true;

 // if (astro_collected == true) {
 //  astronauts.add(astro);
 //  return astro;
 //}
}

// function tardisExplode(tardis, meteoroid) { //change asteroid to meteor - has to be a sprite.
//  // sound[4].play();
//   if ((state != timeoverscreen)) {
//    state = timeoverscreen;
//   }
// }

function bar(x, y, w, h) {
 rect(x, y, w, h);
}



/////////////[ KEY/MOUSE EVENTS ]/////////////

function mousePressed() {
 for (var i = 0; i < meteors.length; i++) {
  if (mouseX > meteors.w) {
   //meteors.splice(i, 1);
   console.log("touched");
  }
 }

 if (state == startscreen) {
  if (mouseX > width / 2 - 125 &&
   mouseX < width / 2 + 125 &&
   mouseY > height / 2 - 0 &&
   mouseY < height / 2 + 60) {
   state = playscreen;
   sounds[1].play();
  }
  if (mouseX > width / 2 - 125 &&
   mouseX < width / 2 + 125 &&
   mouseY > height / 2 + 80 &&
   mouseY < height / 2 + 130) {
   state = instructionsscreen;
   sounds[1].play();
  }
 }
 if (state == timeoverscreen) {
  if (mouseX > width / 2 - 125 &&
   mouseX < width / 2 + 125 &&
   mouseY > height / 2 - 0 &&
   mouseY < height / 2 + 60) {
   state = startscreen;
   sounds[1].play();
  }
 }
}