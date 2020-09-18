
class Wall {

    constructor(st) {
        augment(this, st)
    }

    touch(puck) {
        const d = lib.math.distanceToSegment(puck.x, puck.y,
                    this.x1, this.y1, this.x2, this.y2)
        if (d < puck.r) {
            // collision
            const nvec = lib.math.normalVector(this.x1, this.y1, this.x2, this.y2) 
            const nx = nvec[0]
            const ny = nvec[1]

            const dot = lib.math.dotProduct(puck.dx, puck.dy, nx, ny) 

            const vx = nx * dot
            const vy = ny * dot

            puck.dx = puck.dx - 2*vx
            puck.dy = puck.dy - 2*vy

            if (this.onHit) this.onHit(puck)

            return true
        }
        return false
    }

    draw() {
        lineWidth(1)
        stroke(.19, .5, .5)
        line(this.x1, this.y1, this.x2, this.y2)
    }
}
