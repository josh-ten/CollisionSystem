let shapeVertices = [];
let ball;
let gravity = 0.1;
let DEBUG = true;
let drop = true;

function setup() {
  // frameRate(20);
  createCanvas(window.innerWidth, window.innerHeight);
  ball = new Ball(width*0.8, 0, 15);
  //Default polygon
  shapeVertices = [
    createVector(width*0.3, height*0.7),
    createVector(width, height*0.5),
    createVector(width, height*0.7)
  ];
}

function draw() {
  background(40);
  //A line from the balls position to (0, 0)
  let sensorLine = new Line(ball.pos.x, ball.pos.y, 0, 0);
  drawPolygon();
  let collData = calculateCollision(sensorLine);
  if (collData) console.log(collData);
  if (collData) ball.collision(collData);
  if (drop) ball.update();
  ball.draw(collData.length % 2 == 1);
  // if (DEBUG) sensorLine.draw(collData);
}

//Create the polygon by clicking to add vertices
function mousePressed() {
  shapeVertices.push(createVector(mouseX, mouseY));
}

//Play/pause the simulation using spacebar
function keyPressed() {
  if (keyCode == 32) drop = !drop;
}

function drawPolygon() {
  strokeWeight(5);
  if (DEBUG) {
    noFill();
    stroke(255);
  } else {
    noStroke();
  }
  //Paint polygon edges
  beginShape();
  for (let v of shapeVertices) {
    vertex(v.x, v.y);
  }
  if (shapeVertices.length > 2)
    vertex(shapeVertices[0].x, shapeVertices[0].y);
  endShape();
  //Paint polygon vertices
  if (DEBUG) {
    stroke(255, 100, 100);
    for (let v of shapeVertices) {
      point(v.x, v.y);
    }
  }
}

//Determine if the ball is colliding with the polygon
function calculateCollision(sensor) {
  let collData = [];
  for (let i = 0; i < shapeVertices.length; i++) {
    //Look at the edges of the polygon
    let v1 = shapeVertices[i];
    let v2 = i < shapeVertices.length-1 ? 
        shapeVertices[i+1] : shapeVertices[0];
    let line = pointsToLine(v1, v2);
    //Determine if the edge, and the sensor line cross over
    let collision = lineCollision(line, sensor);
    //If so, record the data of this intersection
    if (collision) collData.push(collision);
  }
  //If there is an odd number of intersections with the
  //polygon's edges, then the point is within the polygon
  if (collData.length % 2 == 1) return collData;
  return false;
}

//Determine if two lines are intersecting
function lineCollision(line1, line2) {
  //First, convert lines to linear relations, y=grad*x+c
  //Line1 equation
  //Gradient = dy/dx
  let grad1 = 
    (line1.end.y-line1.start.y) / 
    (line1.end.x-line1.start.x);
  //Offset
  let c1 = line1.start.y - grad1 * line1.start.x;
  //Line2 equation
  let grad2 = 
    (line2.end.y-line2.start.y) / 
    (line2.end.x-line2.start.x);
  let c2 = line2.start.y - grad2 * line2.start.x;
  //Find intersection point
  let intersectionPoint = createVector(0, 0);
  intersectionPoint.x = (c2 - c1) / (grad1 - grad2);
  intersectionPoint.y = grad1 * intersectionPoint.x + c1;
  //Find distance between point and line
  let dist = Math.abs((grad1 * line2.start.x) + line2.start.y + c1)/
         Math.sqrt((grad1 * grad1) + 1);
  // console.log(grad1, line2.start.x, line2.start.y, c1, dist);
  //Ensure point is within domain
  //Line 1 x-domain
  if ((line1.start.x < line1.end.x &&
      intersectionPoint.x > line1.start.x && 
      intersectionPoint.x < line1.end.x) ||
      (line1.start.x > line1.end.x &&
      intersectionPoint.x < line1.start.x && 
      intersectionPoint.x > line1.end.x)) {
    //Line 2 x-domain
    if ((line2.start.x < line2.end.x &&
      intersectionPoint.x > line2.start.x && 
      intersectionPoint.x < line2.end.x) ||
      (line2.start.x > line2.end.x &&
      intersectionPoint.x < line2.start.x && 
      intersectionPoint.x > line2.end.x)) {
      //Paint the intesection points
      if (DEBUG) {
        stroke(255, 0, 0);
        point(intersectionPoint.x, intersectionPoint.y);
      }
      return {'grad': grad1, 'dist': dist};
    }
  }
  return false;
}

//Convert 2 points to a line object
function pointsToLine(p1, p2) {
  return new Line(p1.x, p1.y, p2.x, p2.y);
}
