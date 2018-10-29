let ball;
let gravity = 0.5;
let DEBUG = false;
let drop = true;
let polygon;

function setup() {
  // frameRate(20);
  createCanvas(window.innerWidth, window.innerHeight);
  ball = new Ball(width*0.8, 0, 15);
  polygon = new Polygon([
    createVector(0, height * 0.5),
    createVector(width * 0.5, height * 0.8),
    createVector(width, height * 0.5),
    createVector(width, height * 0.9),
    createVector(0, height * 0.9),
  ]);
}

function draw() {
  background(40);
  polygon.draw();
  let collData = ball.collidingWith(polygon);
  // if (collData) console.log(collData);
  if (collData) ball.collision(collData);
  if (drop) ball.update();
  ball.draw(collData.length % 2 == 1);
  // if (DEBUG) sensorLine.draw(collData);
}

//Create the polygon by clicking to add vertices
function mousePressed() {
  polygon.addVertex(createVector(mouseX, mouseY));
}

//Play/pause the simulation using spacebar
function keyPressed() {
  if (keyCode === 32) drop = !drop;
}
