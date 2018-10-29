class Polygon {
    constructor(defaultVertices) {
        this.vertices = [];
        if (defaultVertices) this.vertices = defaultVertices;
    }

    draw() {
        strokeWeight(5);
        if (DEBUG) {
            noFill();
            stroke(255);
        } else {
            noStroke();
        }
        //Paint polygon edges
        beginShape();
        this.vertices.forEach((v) => vertex(v.x, v.y));
        if (this.vertices.length > 1)
            vertex(this.vertices[0].x, this.vertices[0].y);
        endShape();
        //Paint polygon vertices
        if (DEBUG) {
            stroke(255, 100, 100);
            this.vertices.forEach((v) => point(v.x, v.y));
        }
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
}