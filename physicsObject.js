class PhysicsObject {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
  }

  kinematics() {
    this.acc.y += gravity;
    this.vel.mult(0.995);
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  translateVertices(origin, vertices) {
    let tVertices = [];
    vertices.forEach(v => tVertices.push(origin.copy().add(v)));
    return tVertices;
  }
}