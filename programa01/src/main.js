// import Jogador from './jogador.js'
// import Cangaceiro from './cangaceiro.js'
import Phaser from 'Phaser'

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
}

const game = new Phaser.Game(config);

function preload() {
    this.load.image('logo', './assets/images/phaser-logo.png');
}

function create() {
    this.add.image(400, 300, 'logo');
}

// ==============================================================
// console.log("\n=> Playing... The Calango's Hunter\n")

// const player = new Jogador("Walter Paraíba", "Peixeira")
// player.attack()

// const cangaceiro = new Cangaceiro("Walter Paraíba", "Peixeira", "Lampião", "calango")
// setTimeout(() => {
//     cangaceiro.callPet()
// }, 4000)

// setTimeout(() => {
//     cangaceiro.attack()
// }, 6000)

// setTimeout(() => {
//     cangaceiro.takeDamage(20)
// }, 10000)


// console.log("ok")