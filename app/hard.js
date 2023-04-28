class Hard {
    constructor(ctx, canvasSize, hardInstance, posY, sizeW, sizeH, speed) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.hardInstance = hardInstance
        this.hardSpecs = {
            size: { w: sizeW, h: sizeH },
            pos: { x: 0, y: posY },
            speed: speed
        }
        this.hard()
    }

    hard() {
        this.hardInstance = new Image()
        this.hardInstance.src = "../images/hard.png"
    }

    drawHard() {
        this.move()
        this.ctx.drawImage(
            this.hardInstance,
            this.hardSpecs.pos.x,
            this.hardSpecs.pos.y,
            this.hardSpecs.size.w,
            this.hardSpecs.size.h
        )
    }

    move() {
        this.hardSpecs.pos.x += this.hardSpecs.speed
    }
}