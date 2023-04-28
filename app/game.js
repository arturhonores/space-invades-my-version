const game = {
    appName: 'Space Invaders',
    author: 'Rober y Arturo',
    version: '1.0.0',
    license: undefined,
    description: 'Proyecto Módulo 1',
    ctx: undefined,
    frameIndex: 0,
    canvasSize: {
        w: 980,
        h: 600
    },
    shipInstance: undefined,
    shipSpecs: {
        pos: { x: undefined, y: undefined },
        size: { w: 70, h: 70 }
    },
    invaders1: [],
    bullets: [],
    invadersBullets: [],
    hardArr: [],
    gameOverAlert: undefined,
    youWin: undefined,
    canShoot: true,
    invadersCanShoot: true,

    //INIT
    init() {
        this.setContext()
        setTimeout(() => this.createHard(), 14000)
        this.setImageInstances()
        this.setEventListeners()
        this.createInvaders1()
        this.startSound()
        this.startTime = new Date().getTime();
        this.start()
    },
    // CORAZÓN
    start() {
        this.intervalId = setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.collisionInvadersShip() ? this.gameOver() : null
            this.collisionInvadersWeapon() ? this.gameOver() : null
            this.collisionBottom() ? this.gameOver() : null
            this.collisionbulletInvaders()
            this.invadersShoot()
            this.invaders1.length === 0 ? this.levelComplete() : null
        }, 50)
    },

    //MÚSICAS
    startSound() {
        this.backgroundSound = new Audio()
        this.backgroundSound.src = './audio/backgroundSound.mp3'
        this.backgroundSound.volume = 1
        this.backgroundSound.play()
    },

    shootSound() {
        this.disparonave = new Audio()
        this.disparonave.src = './audio/disparonave.mp3'
        this.disparonave.volume = 0.9
        this.backgroundSound.loop = true;
        this.disparonave.play()
    },

    gameOverSound() {
        this.gameoversound = new Audio()
        this.gameoversound.src = './audio/gameoversound.mp3'
        this.gameoversound.volume = 1
        this.gameoversound.play()
    },

    victorySound() {
        this.victorysound = new Audio()
        this.victorysound.src = './audio/victoria.mp3'
        this.victorysound.volume = 1
        this.victorysound.play()
    },

    //CTX
    setContext() {
        this.ctx = document.getElementById("myCanvas").getContext("2d")
        this.shipSpecs.pos = {
            x: this.canvasSize.w / 2 - this.shipSpecs.size.w / 2,
            y: this.canvasSize.h - this.shipSpecs.size.h
        }
    },
    //METER IMÁGENES NAVE Y FONDO
    setImageInstances() {
        this.shipInstance = new Image()
        this.shipInstance.src = "../images/ship.png"
        this.gameOverAlert1()
        this.youWinAlert()

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


    // CREAR INVASORES
    createInvaders1() {
        // console.log("INSTANCIA INVASORES Y DETECTA POSICIÓN")
        const invaders1Xposition = [60, 130, 200, 270, 340, 410, 480, 550, 620, 690, 760, 830, 900]
        invaders1Xposition.forEach((duplicated) => {
            return this.invaders1.push(
                new Invaders1(this.ctx, this.canvasSize, this.invaders1Instance, duplicated, 50),
                new Invaders1(this.ctx, this.canvasSize, this.invaders1Instance, duplicated, 100),
                new Invaders1(this.ctx, this.canvasSize, this.invaders1Instance, duplicated, 150),
            )
        })

    },

    // pintar Hard y que aparezca
    createHard() {
        console.log("HARRDDDDDDDD")
        this.hardArr.push(
            new Hard(this.ctx, this.canvasSize, this.hardInstance, 10, 200, 40, 3)
        )
    },

    //DIBUJAR TODO
    drawAll() {
        // console.log("DIBUJANDO INVASORES")
        this.frameIndex++
        this.drawShip()
        this.invaders1.forEach((eachInvader) => {
            return eachInvader.drawInvaders1()
        })
        this.bullets.forEach((eachBullet) => {
            eachBullet.drawBullets()
        })
        this.invadersBullets.forEach((eachInvaderbullet) => {
            eachInvaderbullet.drawInvadersBullet()
        })
        this.hardArr.forEach((eachHard) => {
            eachHard.drawHard()
        })
    },




    // BORRAR TODO
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    // CONTROLES NAVE
    setEventListeners() {
        document.onkeydown = event => {
            const { key } = event
            if (key == 'ArrowLeft') {
                this.shipSpecs.pos.x -= 35
                if (this.shipSpecs.pos.x < 0) {
                    this.shipSpecs.pos.x = 0
                }
            }

            if (key == 'ArrowRight') {
                this.shipSpecs.pos.x += 35
                if (this.shipSpecs.pos.x > 980 - this.shipSpecs.size.w) {
                    this.shipSpecs.pos.x = 980 - this.shipSpecs.size.w
                }
            }
            if (key == 'ArrowUp' && this.canShoot) {
                this.shipShoot()
                this.canShoot = false
                setTimeout(() => {
                    this.canShoot = true
                }, 500) // Tiempo de espera en milisegundos entre disparos
            }
        }
    },

    // COLISIONES
    collisionInvadersShip() {
        // console.log("MÉTODO COLISIÓN INVADER vs NAVE")
        return this.invaders1.some((inv) => {
            return this.shipSpecs.pos.x + this.shipSpecs.size.w >= inv.invaders1Specs.pos.x &&
                this.shipSpecs.pos.x <= inv.invaders1Specs.pos.x + inv.invaders1Specs.size.w &&
                this.shipSpecs.pos.y + this.shipSpecs.size.h >= inv.invaders1Specs.pos.y &&
                this.shipSpecs.pos.y <= inv.invaders1Specs.pos.y + 40 //40 = altura invaders
        })
    },

    collisionbulletInvaders() {
        // console.log("BUSCANDO COLISION BALA CONTRA INVADER")
        for (let i = 0; i < this.bullets.length; i++) {
            for (let j = 0; j < this.invaders1.length; j++) {
                //HITBOX
                if (
                    this.bullets[i].shipBulletsSpecs.pos.x + this.bullets[i].shipBulletsSpecs.size.w >= this.invaders1[j].invaders1Specs.pos.x &&
                    this.bullets[i].shipBulletsSpecs.pos.x <= this.invaders1[j].invaders1Specs.pos.x + this.invaders1[j].invaders1Specs.size.w &&
                    this.bullets[i].shipBulletsSpecs.pos.y + this.bullets[i].shipBulletsSpecs.size.h >= this.invaders1[j].invaders1Specs.pos.y &&
                    this.bullets[i].shipBulletsSpecs.pos.y <= this.invaders1[j].invaders1Specs.pos.y + this.invaders1[j].invaders1Specs.size.h
                ) {
                    // Elimina la bala y el invasor de sus respectivos arrays
                    this.bullets.splice(i, 1);
                    this.invaders1.splice(j, 1);
                    // Detiene el bucle interno para evitar múltiples colisiones con la misma bala
                    break;
                }
            }
        }
    },

    collisionInvadersWeapon() {
        // console.log("MÉTODO COLISIÓN INVADERWEAPON vs NAVE")
        return this.invadersBullets.some((invBullet) => {
            return this.shipSpecs.pos.x + this.shipSpecs.size.w >= invBullet.invadersBulletSpecs.pos.x &&
                this.shipSpecs.pos.x <= invBullet.invadersBulletSpecs.pos.x + invBullet.invadersBulletSpecs.size.w &&
                this.shipSpecs.pos.y + this.shipSpecs.size.h >= invBullet.invadersBulletSpecs.pos.y &&
                this.shipSpecs.pos.y - 15 <= invBullet.invadersBulletSpecs.pos.y
        })
    },

    collisionBottom() {
        // console.log("MÉTODO COLISIÓN INVADER vs BOTTOM")
        return this.invaders1.some((inv) => {
            return inv.invaders1Specs.pos.y + inv.invaders1Specs.size.h >= this.canvasSize.h
        })
    },

    // CREAR DISPAROS
    invadersShoot() {
        if (this.invadersCanShoot) {
            this.invadersCanShoot = false
            const currentInvader = this.invaders1[Math.floor(Math.random() * this.invaders1.length)]
            const invaderBulletPosX = currentInvader.invaders1Specs.pos.x + currentInvader.invaders1Specs.size.w / 2 - 3 //3 es la mitad del ancho de la bala.
            const invaderBulletPosY = currentInvader.invaders1Specs.pos.y + currentInvader.invaders1Specs.size.h / 2
            this.invadersBullets.push(new InvadersBullet(this.ctx, this.canvasSize, this.invadersBulletsInstance, invaderBulletPosX, invaderBulletPosY))

            const currentTime = new Date().getTime()
            const timeElapsed = currentTime - this.startTime

            let shootingInterval
            if (timeElapsed >= 13000) {
                shootingInterval = 450
            } else {
                shootingInterval = 700
            }

            setTimeout(() => {
                this.invadersCanShoot = true
            }, shootingInterval)
        }
    },

    shipShoot() {
        // console.log("nave dispara")
        this.bullets.push(new ShipBullets(this.ctx, this.canvasSize, this.shipBulletsInstance, this.shipSpecs.pos.x + 30, 585 - this.shipSpecs.size.h))
        this.shootSound()
    },

    gameOverAlert1() {
        this.gameOverAlert = new gameOverImages(this.ctx, this.canvasSize, this.gameOverInstance)
    },

    youWinAlert() {
        this.youWin = new YouWin(this.ctx, this.canvasSize, this.youWinInstance)
    },


    gameOver() {
        clearInterval(this.intervalId)
        this.gameOverSound()
        this.gameOverAlert.drawKilledImage()
        this.backgroundSound.pause()
    },

    levelComplete() {
        clearInterval(this.intervalId)
        this.youWin.drawYouwinImage()
        this.backgroundSound.pause()
        this.victorySound()

    }
}
