class InvadersBullet {
    constructor(ctx, canvasSize, invadersBulletsInstance, posX, posY) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.invadersBulletsInstance = invadersBulletsInstance
        this.invadersBulletSpecs = {
            size: { w: 20, h: 20 },
            pos: { x: posX, y: posY }
        }
        this.velY = 3
        this.initInvadersBullet()
    }

    initInvadersBullet() {
        this.invadersBulletInstance = new Image()
        this.invadersBulletInstance.src = "../images/invadersBullet.png"
    }

    drawInvadersBullet() {
        this.move()
        this.ctx.drawImage(
            this.invadersBulletInstance,
            this.invadersBulletSpecs.pos.x,
            this.invadersBulletSpecs.pos.y,
            this.invadersBulletSpecs.size.w,
            this.invadersBulletSpecs.size.h
        )

    }

    move() {
        this.invadersBulletSpecs.pos.y += this.velY
    }
}