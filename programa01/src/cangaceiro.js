import Jogador from "./jogador.js";

export default class Cangaceiro extends Jogador {

    constructor(name, weapon, petName, petType) {
        super(name, weapon)

        this.petName = petName
        this.petType = petType
    }

    callPet() {
        console.log(`-${this.name} chama seu ${this.petType} ${this.petName} para ajudar na luta!`)

    }

    attack() {
        super.attack()

        console.log(`-${this.name} faz um ataque duplo de ${this.weapon} com a ajuda de seu ${this.petType} ${this.petName}!`)

    }
}