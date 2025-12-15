import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        this.scene = scene;
        this.speed = 350; // Velocidade ajustada para ficar mais dinâmico

        this.init();
        this.createAnimations();
    }

    init() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setImmovable(true);
        this.setCollideWorldBounds(true);
        this.body.allowGravity = false;
        
        // Ajusta o tamanho da hitbox para ficar mais realista (pés da garota)
        this.body.setSize(150, 400);
        this.body.setOffset(75, 52);

        // Define a animação inicial
        this.play('idle');
    }

    createAnimations() {
        // Cria animação de 'andar' usando os frames 5 a 8 (Direita)
        if (!this.scene.anims.exists('walk')) {
            this.scene.anims.create({
                key: 'walk',
                frames: this.scene.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
                frameRate: 12,
                repeat: -1
            });
        }

        // Cria animação 'parada' (frame 4)
        if (!this.scene.anims.exists('idle')) {
            this.scene.anims.create({
                key: 'idle',
                frames: [{ key: 'player', frame: 4 }],
                frameRate: 20
            });
        }
    }

    update(cursors) {
        // Reseta velocidade horizontal
        this.setVelocityX(0);

        if (cursors.left.isDown) {
            this.setVelocityX(-this.speed);
            this.play('walk', true);
            this.setFlipX(true); // Vira o sprite para a esquerda
        } 
        else if (cursors.right.isDown) {
            this.setVelocityX(this.speed);
            this.play('walk', true);
            this.setFlipX(false); // Mantém o sprite para a direita (original)
        } 
        else {
            this.play('idle', true);
        }
    }
}