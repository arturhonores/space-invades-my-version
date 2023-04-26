class YouWin {
    constructor(ctx, canvasSize, youWinInstance) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.youWinInstance = youWinInstance
        this.youWinSpecs = {
            size: { w: 980, h: 600 },
            pos: { x: 0, y: 0 }
        }
        this.initYouwinImage()
    }

    initYouwinImage() {
        this.youWinInstance = new Image()
        this.youWinInstance.src = "../images/youWin.jpg"
    }
    drawYouwinImage() {
        this.ctx.drawImage(
            this.youWinInstance,
            this.youWinSpecs.pos.x,
            this.youWinSpecs.pos.y,
            this.youWinSpecs.size.w,
            this.youWinSpecs.size.h
        )
    }
}

