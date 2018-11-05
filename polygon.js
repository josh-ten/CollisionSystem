class Polygon extends PhysicsObject {
    constructor(fixed, origin, defaultVertices) {
        super(origin.x, origin.y);
        this.vertices = [];
        this.fixed = fixed;
        this.vertices = defaultVertices;
    }

    draw() {
        strokeWeight(5);
        if (DEBUG) {
            noFill();
            stroke(255);
        } else {
            noStroke();
        }
        let tVertices = super.translateVertices(this.pos, this.vertices);
        //Paint polygon edges
        beginShape();
        tVertices.forEach(v => vertex(v.x, v.y));
        if (tVertices.length > 1)
            vertex(tVertices[0].x, tVertices[0].y);
        endShape();
        //Paint polygon vertices
        if (DEBUG) {
            stroke(255, 100, 100);
            tVertices.forEach((v) => point(v.x, v.y));
        }
    }
    
    update() {
        this.acc.y -= gravity / 2;
        super.kinematics();
    }

    addVertex(v) {
        this.vertices.push(v);
    }
    
    getVertex(i) {
        return this.vertices[i];
    }
    getVertexCount() {
        return this.vertices.length;
    }

    isFixed() {
        return this.fixed;
    }
}