//Store data and draw functionality for a simple line
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
}