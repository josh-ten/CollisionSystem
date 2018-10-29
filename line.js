class Line {
  constructor(x1, y1, x2, y2) {
    this.start = createVector(x1, y1);
    this.end = createVector(x2, y2);
  }

  draw(colliding) {
    if (colliding) stroke(0, 255, 0);
    else stroke(0, 0, 255);
    strokeWeight(1);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  //Determine if two lines are intersecting
  intersects(other) {
    //First, convert lines to linear relations, y=grad*x+c
    let rel1 = this.convertToRelation();
    let rel2 = other.convertToRelation();
    //Find intersection point
    let intersectionPoint = createVector(0, 0);
    intersectionPoint.x = (rel2.c - rel1.c) / (rel1.grad - rel2.grad);
    intersectionPoint.y = rel1.grad * intersectionPoint.x + rel1.c;
    //Ensure point is within domain
    if (pointWithinDomain(intersectionPoint.x, this.start.x, this.end.x) &&
      pointWithinDomain(intersectionPoint.x, other.start.x, other.end.x)) {
      //Find distance between point and line using the dot product
      //AB = this.start -> this.end
      //AP = this.start -> other.start
      let AB = this.start.copy().sub(this.end);
      let AP = this.start.copy().sub(other.start);
      let parallel = 
        AB.mult((AP.dot(AB)) / 
        (AB.mag() * AB.mag()));
      let perpendicular = AP.sub(parallel);
      // console.log('parallel', parallel, 'perpendicular', perpendicular);

      //Paint the intesection points
      if (DEBUG) {
        stroke(255, 0, 0);
        point(intersectionPoint.x, intersectionPoint.y);
      }
      return perpendicular;
    }
    return false;
  }

  convertToRelation() {
    //Gradient = dy/dx
    let grad =
      (this.end.y - this.start.y) /
      (this.end.x - this.start.x);
    //Offset
    let c = this.start.y - grad * this.start.x;
    return {'grad': grad, 'c': c};
  }
}

//Determine if a point is within a domain
function pointWithinDomain(point, minX, maxX) {
  if (maxX < minX) {
    let temp = minX;
    minX = maxX;
    maxX = temp;
  }
  return (point > minX && point < maxX);
}

//Convert 2 points to a line object
function pointsToLine(p1, p2) {
  return new Line(p1.x, p1.y, p2.x, p2.y);
}