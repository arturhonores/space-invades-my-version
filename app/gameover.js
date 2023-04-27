class gameOverImages {
    constructor(ctx, canvasSize, gameOverInstance) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.gameOverInstance = gameOverInstance
        this.gameOverImageSpecs = {
            size: { w: 980, h: 600 },
            pos: { x: 0, y: 0 }
        }
        this.initKilledImage()
    }

    initKilledImage() {
        this.gameOverInstance = new Image()
        this.gameOverInstance.src = "../images/haspalmado.jpg"
    }
    drawKilledImage() {

        this.ctx.drawImage(
            this.gameOverInstance,
            this.gameOverImageSpecs.pos.x,
            this.gameOverImageSpecs.pos.y,
            this.gameOverImageSpecs.size.w,
            this.gameOverImageSpecs.size.h
        )
    }
}

