class ShipBullets {
    constructor(ctx, canvasSize, shipBulletsInstance, shipX, shipH) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.shipBulletsInstance = shipBulletsInstance
        this.shipBulletsSpecs = {
            size: { w: 5, h: 20 },
            pos: { x: shipX, y: shipH },
        }
        this.velY = 10
        this.initBullets()
    }

    initBullets() {
        this.shipBulletsInstance = new Image()
        this.shipBulletsInstance.src = "../images/bullet.png"
        console.log("MÉTODO DISPARO NAVE")
    }

    drawBullets() {
        this.move()
        this.ctx.drawImage(
            this.shipBulletsInstance,
            this.shipBulletsSpecs.pos.x,
            this.shipBulletsSpecs.pos.y,
            this.shipBulletsSpecs.size.w,
            this.shipBulletsSpecs.size.h
        )
    }

    move() {
        this.shipBulletsSpecs.pos.y -= this.velY
    }
}
