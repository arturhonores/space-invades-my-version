class SpriteInvaderDead {
    constructor(ctx, canvasSize, spriteInvaderDeadInstance, posX, posY) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.spriteInvaderDeadInstance = spriteInvaderDeadInstance
        this.spriteInvaderDeadSpecs = {
            size: { w: 30, h: 30 },
            pos: { x: posX, y: posY }
        }
        this.initspriteInvaderDead()
    }

    initspriteInvaderDead() {
        this.spriteInvaderDeadInstance = new Image()
        this.spriteInvaderDeadInstance.src = "../images/sprite-invaders-dead.png"
    }

    drawSpriteInvaderDead() {
        this.ctx.drawImage(
            this.spriteInvaderDeadInstance,
            this.spriteInvaderDeadSpecs.pos.x,
            this.spriteInvaderDeadSpecs.pos.y,
            this.spriteInvaderDeadSpecs.size.w,
            this.spriteInvaderDeadSpecs.size.h
        )

    }
}