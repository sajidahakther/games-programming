var character;
var player;
var collectibles;
var platforms = [];
var images = [];

//COUNTERS
var timecounter = 4000;
var pointscounter = 0;
var state = playScreen;


function preload() {
 extra = loadJSON("extras.json");

 images[0] = loadImage('assets/platform.png');
 images[1] = loadImage('assets/background2.png')
 images[2] = loadImage('assets/coin.png')
}

function setup() {
 createCanvas(900, 565);
 character = new Character();
 platforms.push(new Platform());


 //PLAYER
 player = createSprite(64, height / 2);
 player.x = 64;
 player.gravity = 1;
 player.lift = -25;
 player.velocity = 0;
 player.move = 100;
 player.addImage("normal", images[2]);

}

function draw() {
 state();
}

function playScreen() {
 background(images[1]);

 //PLAYER KEYS
 if (keyDown("a"))
  player.position.x += 5;
 if (keyDown("d"))
  player.rotation -= 5;

 //JSON FILE
 fill(extra.r, extra.g, extra.b);
 text(extra.name, 10, 50);


 //PLATFORM
 
 for (var i = 0; i < 10; i++) {
  image(images[2], random, random);
 }

 for (i = platforms.length - 1; i >= 0; i--) {
  platforms[i].show();
  platforms[i].update();

  if (character.lands(platforms[i])) {
   //if (character > (platforms[i])) {
   character.y = platforms[i].y;
   //when the character touches on the platform, the y value of the character
   //becomes the same as the platform y value so that it lands on the platform.
   console.log("platform");
  }

  if (platforms[i].offscreen()) {
   platforms.splice(i, 1);
  }

  //TIME COUNTER
  var n = timecounter--;

  fill(255);
  text(timecounter, 50, 50);
  rect(50, 50, timecounter / 8, 10);

  if (keyIsDown(DOWN_ARROW)) //change to if collects coins
   timecounter = n + 10;

  if (timecounter === 0) {
   if (state != gameOverScreen2) {
    state = gameOverScreen2;
   }
  }

  //POINTS COUNTER
  pointscounter++;
  text("point:" + pointscounter, 800, 50);

  /* after the player has exceeded a certain amount of points, 
  the rate of speed that the platforms are going increase */
  if (pointscounter === 1000) {
   console.log("points have exceeded 1000");
   platforms.speed = 10;
   console.log("speed has increased");
  }

  //KEYS
  if (keyIsDown(RIGHT_ARROW))
   character.x += 5;
  if (keyIsDown(LEFT_ARROW))
   character.x -= 5;

 }

 character.update();
 character.show();

 if (frameCount % 50 === 0) {
  platforms.push(new Platform());
 }

 drawSprites();

}

//GAME OVER SCREENS

function gameOverScreen1() {
 background(0);
 fill(255);
 strokeWeight(40);
 textSize(40);
 textAlign(CENTER);
 text("Game over, you died!", width / 2, height / 2 - 100);
 text("Score: " + pointscounter, width / 2 - 100, height / 2);
}

function gameOverScreen2() {
 background(0);
 fill(255);
 strokeWeight(40);
 textSize(40);
 textAlign(CENTER);
 text("Game over, time ran out!", width / 2, height / 2 - 100);
 text("Score: " + pointscounter, width / 2 - 100, height / 2);
}


function keyPressed() {
 if (keyCode === UP_ARROW) {
  character.up(); //character jumps
 }

}