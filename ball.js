//The physics object in the scene
class Ball {
    constructor(x, y, size) {
      this.pos = createVector(x, y);
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.size = size;
    }
    
    update() {
      this.acc.y += gravity;
      this.pos.add(this.vel);
      this.vel.add(this.acc);
      this.acc.mult(0);
    }
    
    draw(colliding) {
      strokeWeight(this.size);
      DEBUG ? 
        colliding ? stroke(0, 255, 0) : stroke(0, 0, 255) : 
        stroke(255);
      point(this.pos.x, this.pos.y);
    }
    
    collision(data) {
      // this.vel.y = 0;
      // this.pos.y -= data.dist;
      // let force = createVector(0, data[0].grad);
      // force.mult(data[0].dist);
      // force.mult(10);
      this.pos.y -= 10;
      this.vel.y =0 ;
    }
  }