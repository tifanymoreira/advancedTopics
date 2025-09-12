export default class Jogador {
    constructor(name, weapon) {
        this.name = name
        this.weapon = weapon
        this.health = 100
    }

    attack() {
        console.log(`-${this.name} deferiu um poderoso ataque de ${this.weapon}`)
    }

    takeDamage(amount) {
        this.health -= amount;

        console.log(`-${this.name} recebeu ${amount} de dano. Vida atual: ${this.health}`)
    }
}
