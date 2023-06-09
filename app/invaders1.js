class Invaders1 {
    constructor(ctx, canvasSize, invaders1Instance, posX, posY) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.invaders1Instance = invaders1Instance
        this.invaders1Specs = {
            size: { w: 40, h: 40 },
            pos: { x: posX, y: posY }
        }
        this.initInvaders1()
    }

    initInvaders1() {
        this.invaders1Instance = new Image()
        this.invaders1Instance.src = "../images/greeninvader.png"
    }

    drawInvaders1() {
        this.move()
        this.ctx.drawImage(
            this.invaders1Instance,
            this.invaders1Specs.pos.x,
            this.invaders1Specs.pos.y,
            this.invaders1Specs.size.w,
            this.invaders1Specs.size.h
        )
    }

    move() {
        this.invaders1Specs.pos.y += .1
    }
}

