const game = {
    appName: 'Space Invaders',
    author: 'Rober y Arturo',
    version: '1.0.0',
    license: undefined,
    description: 'Proyecto Módulo 1',
    ctx: undefined,
    frameIndex: 0,
    canvasSize: {
        w: 1000,
        h: 600
    },
    shipInstance: undefined,
    shipSpecs: {
        pos: undefined,
        size: { w: 70, h: 70 }
    },
    backgroundInstance: undefined,
    backgroundSpecs: {
        pos: undefined,
        size: { w: 1000, h: 600 }
    },
    invaders1: [],
    bullets: [],
    canShoot: true,
    //INIT
    init() {
        this.setContext()
        this.setImageInstances()
        this.start()
        this.setEventListeners()
    },
    // CORAZÓN
    start() {
        this.intervalId = setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.collisionInvadersShip() ? this.gameOver() : null
            this.frameIndex++
        }, 50)
    },
    //CTX
    setContext() {
        this.ctx = document.getElementById("myCanvas").getContext("2d")
        this.shipSpecs.pos = {
            x: this.canvasSize.w / 2 - this.shipSpecs.size.w / 2,
            y: this.canvasSize.h - this.shipSpecs.size.h
        }
        this.backgroundSpecs.pos = {
            x: 0,
            y: 0
        }
    },
    //METER IMÁGENES NAVE Y FONDO
    setImageInstances() {
        this.shipInstance = new Image()
        this.shipInstance.src = "../images/ship.png"
        this.backgroundInstance = new Image()
        this.backgroundInstance.src = "../images/background.jpg"
        // this.invaders1Instance = new Image()
        // this.invaders1Instance.src = "../images/invaders1.png"
    },

    // DIBUJAR NAVE
    drawShip() {
        this.ctx.drawImage(
            this.shipInstance,
            this.shipSpecs.pos.x,
            this.shipSpecs.pos.y,
            this.shipSpecs.size.w,
            this.shipSpecs.size.h
        )
    },
    // DIBUJAR FONDO
    drawBackground() {
        this.ctx.drawImage(
            this.backgroundInstance,
            this.backgroundSpecs.pos.x,
            this.backgroundSpecs.pos.y,
            this.backgroundSpecs.size.w,
            this.backgroundSpecs.size.h
        )
    },

    // CREAR INVASORES
    createInvaders1() {
        const invaders1Xposition = [110, 160, 210, 260, 310, 360, 410, 460, 510, 560, 610, 660, 710, 760, 810, 860]
        invaders1Xposition.forEach((duplicated) => {
            return this.invaders1.push(new Invaders1(this.ctx, this.canvasSize, this.invaders1Instance, duplicated))
        })

        // this.invaders1.push(
        //     new Invaders1(this.ctx, this.canvasSize, this.invaders1Instance, invaders1Xposition[randomIndexPosition]))
    },

    //DIBUJAR TODO
    drawAll() {
        this.drawBackground()
        this.drawShip()
        this.invaders1.slice(0, 48).forEach((eachInvader) => {
            return eachInvader.drawInvaders1()
        })
        if (this.frameIndex % 70 === 0) {
            this.createInvaders1()
        }
        this.bullets.forEach((eachBullet) => {
            eachBullet.drawBullets()
        })
        // if (this.frameIndex % 30 === 0) {
        //     this.shipShoot()
        // }

    },

    // BORRAR TODO
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    // CONTROLES NAVE
    setEventListeners() {
        document.onkeydown = event => {

            const { key } = event

            if (key == 'ArrowLeft' && this.shipSpecs.pos.x > 15) {
                console.log(this.shipSpecs.pos.x)
                this.shipSpecs.pos.x -= 50
            }

            if (key == 'ArrowRight' && this.shipSpecs.pos.x < this.canvasSize.w - this.shipSpecs.size.w - 15) {
                this.shipSpecs.pos.x += 50
            }
            if (key == ' ' && this.canShoot) {
                this.shipShoot()
                this.canShoot = false
                setTimeout(() => {
                    this.canShoot = true
                }, 700) // Tiempo de espera en milisegundos
            }
        }
    },

    // CREAR COLISIÓN INVADER CONTRA NAVE

    collisionInvadersShip() {
        return this.invaders1.some((inv) => {
            return this.shipSpecs.pos.x + this.shipSpecs.size.w >= inv.invaders1Specs.pos.x &&
                this.shipSpecs.pos.x <= inv.invaders1Specs.pos.x + inv.invaders1Specs.size.w &&
                this.shipSpecs.pos.y + this.shipSpecs.size.h >= inv.invaders1Specs.pos.y &&
                this.shipSpecs.pos.y <= inv.invaders1Specs.pos.y + 40
        })
    },

    // CREAR DISPARO

    shipShoot() {
        this.bullets.push(new ShipBullets(this.ctx, this.canvasSize, this.shipBulletsInstance, this.shipSpecs.pos.x + 30, 585 - this.shipSpecs.size.h))
    },


    gameOver() {
        clearInterval(this.intervalId)
    }

}
