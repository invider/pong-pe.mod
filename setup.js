function setup() {

    const b = 0
    lab.spawn('Wall', {
        x1: rx(b), y1: ry(b), x2: rx(1-b), y2: ry(b),
    })
    lab.spawn('Wall', {
        x1: rx(b), y1: ry(1-b), x2: rx(1-b), y2: ry(1-b),
    })

    lab.spawn('Wall', {
        x1: rx(b), y1: ry(b), x2: rx(b), y2: ry(1-b),
        onHit: function(puck) {
            kill(puck)
            trap('score', 'right')
        }
    })

    lab.spawn('Wall', {
        x1: rx(1-b), y1: ry(b), x2: rx(1-b), y2: ry(1-b),
        onHit: function(puck) {
            kill(puck)
            trap('score', 'left')
        }
    })

    lab.spawn('Paddle', {
        name: 'left',
        left: true,
        x: rx(.1),
        y: ry(.5),
    })

    lab.spawn('Paddle', {
        name: 'right',
        left: false,
        x: rx(.9),
        y: ry(.5), 
    })

    env.score = {
        left: 0,
        right: 0,
    }

    trap('puck')
}
