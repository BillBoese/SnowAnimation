// from p5js snowflake reference page, modified

var fps = 30;

// the canvas capturer instance
var capturer = new CCapture({ format: 'png', framerate: fps });

let snowflakes = []; // array to hold snowflake objects

function preload(){
  img = loadImage('wintertrees.jpeg');
}

function setup() {
  createCanvas(762, 1118);
  fill(240);
  noStroke();
  frameRate(30);
}

function draw() {
  background(0);
  img.resize(762,1118);
  image(img, 0,0,img.width,img.height);
  let t = frameCount / 60; // update time

  // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
  capturer.capture(document.getElementById('defaultCanvas0'));
}

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = random(-100, width); //this starting position seems irrelevant
  this.posY = random(-50, 0);
  this.size = random(5, 10);
  this.xinc = random(1);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = random(width);

  /*
  so there is the buffer, radius that spreads them out, I dont
  want circular motion maybe all increasing in one direction but at 
  different rates to mimic wind. try increasing x first
  */
  
  this.update = function(time) {
    
    this.posX += this.xinc; //moved radius to constructor

    // different size snowflakes fall at slightly different y speeds
    // bigger falls faster looks like real life in foreground
    
    this.posY += 1.2*pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}

function mouseClicked (){
  capturer.start();
}

function keyPressed(){
  capturer.stop();
  capturer.save();
}  

