class Rectangle extends Polygon {
  constructor(fixed, x, y, w, h) {
    let vertices = [
      createVector(0, 0),
      createVector(w, 0),
      createVector(w, h),
      createVector(0, h)
    ];
    let origin = createVector(x, y);
    super(fixed, origin, vertices);
    this.width = w;
    this.height = h;
  }
}