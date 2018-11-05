//The physics object in the scene
class Ball extends PhysicsObject {
  constructor(x, y, size) {
    super(x, y);
    this.size = size;
    //A line from the balls position to (0, 0)
    this.sensorLine = new Line(this.pos.x, this.pos.y, 0, 0);
  }

  update() {
    super.kinematics();
    this.sensorLine.start.x = this.pos.x;
    this.sensorLine.start.y = this.pos.y;
  }

  draw(colliding) {
    strokeWeight(this.size);
    DEBUG ?
      colliding ? stroke(0, 255, 0) : stroke(255, 130, 255) :
      stroke(255, 0, 255);
    point(this.pos.x, this.pos.y);
  }

  //Determine if the ball is colliding with the polygon
  collidingWith(polygon) {
    let collData = [];
    for (let i = 0; i < polygon.getVertexCount(); i++) {
      //Look at the edges of the polygon
      let v1 = polygon.getVertex(i);
      let v2 = i < polygon.getVertexCount() - 1 ?
        polygon.getVertex(i + 1) : polygon.getVertex(0);
      let line = pointsToLine(v1, v2);
      //Determine if the edge, and the sensor line intersect
      let intersection = line.intersects(this.sensorLine);
      //If so, record the data of this intersection
      if (intersection) collData.push(intersection);
    }
    //If there is an odd number of intersections with the
    //polygon's edges, then the point is within the polygon
    if (collData.length % 2 == 1) return collData;
    return false;
  }

  collision(intersections) {
    intersections.sort((a, b) => {
      a.mag() > b.mag();
    });
    let shortest = intersections[0];
    let extra = shortest.mag() / this.size;
    this.pos.add(shortest.copy().mult(extra));
    shortest.mult(0.95);
    this.acc.add(shortest);
  }
}