const df = {
    w: 15,
    h: 100,
}

class Paddle {

    constructor(st) {
        augment(this, df)
        augment(this, st)
        this.actions = {}
        this.speed = ry(1)
    }

    rect() {
        return {
            x1: this.x-this.w/2,
            y1: this.y-this.h/2,
            x2: this.x+this.w/2,
            y2: this.y+this.h/2,
        }
    }

    touch(puck) {
        const { x1, y1, x2, y2 } = this.rect()

        const x = this.left? x2 : x1
        const d = lib.math.distanceToSegment(puck.x, puck.y, x, y1, x, y2)

        if (d < puck.r) {
            const nvec = lib.math.normalVector(x, y1, x, y2) 
            const nx = this.left? -nvec[0] : nvec[0]
            const ny = this.left? -nvec[1] : nvec[1]

            const dy = puck.y - this.y

            const dir = this.left? -1 : 1
            let fi = atan2(ny, nx)
            if (dy < -40) {
                fi += dir * .25*PI
            } else if (dy < -30) {
                fi += dir * .20*PI
            } else if (dy < -20) {
                fi += dir * .15*PI
            } else if (dy < -10) {
                fi += dir * .10*PI

            } else if (dy > 10) {
                fi -= dir * .10*PI
            } else if (dy > 20) {
                fi -= dir * .15*PI
            } else if (dy > 30) {
                fi -= dir * .20*PI
            } else if (dy > 40) {
                fi -= dir * .25*PI
            }

            puck.dx = cos(fi)
            puck.dy = sin(fi)
            //puck.dx = -puck.dx
            //puck.dy = -puck.dy
            return true
        }
        return false
    }

    evo(dt) {
        if (this.actions.up) {
            this.y -= this.speed * dt
            if (this.y < this.h/2) this.y = this.h/2
        }
        if (this.actions.down) {
            this.y += this.speed * dt
            if (this.y > ry(1)-this.h/2) this.y = ry(1)-this.h/2
        }
    }

    draw() {
        save()
        translate(this.x, this.y)

        lineWidth(2)
        stroke(.65, .5, .5)
        rect(-this.w/2, -this.h/2, this.w, this.h)

        /*
        const { x1, y1, x2, y2 } = this.rect()
        const nvec = lib.math.normalVector(x1, y1, x2, y2) 
        const nx = nvec[0]
        const ny = nvec[1]
        line(0, 0
        */

        restore()
    }

    up(active) {
        this.actions.up = active
    }

    down(active) {
        this.actions.down = active
    }
}
