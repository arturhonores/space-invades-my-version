class Sounds {
    constructor() {
        this.shipSound = new Audio('../');
        this.sound2 = new Audio('sounds/disparonave.wav');
        // this.sound1 = new Audio('ruta/al/archivo/sonido1.mp3');
        // this.sound2 = new Audio('ruta/al/archivo/sonido2.mp3'); 
        // this.sound2 = new Audio('ruta/al/archivo/sonido2.mp3');
    }

    playShipSound() {
        this.shipSound.currentTime = 0;
        this.sound1.play();
    }

    //     playSound2() {
    //         this.sound2.currentTime = 0;
    //         this.sound2.play();
    //     }
}

const sounds = new Sounds();
sounds.playSound1();
