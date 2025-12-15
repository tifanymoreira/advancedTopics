import Phaser from "phaser";

/**
 * Player
 * Classe que representa o jogador (avião/personagem).
 * Herda de Arcade.Sprite para ter propriedades físicas e visuais.
 */
export default class Player extends Phaser.Physics.Arcade.Sprite {
    /**
     * @param {Phaser.Scene} scene - A cena onde o player existe.
     * @param {number} x - Posição X inicial.
     * @param {number} y - Posição Y inicial.
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        this.scene = scene;
        this.speed = 350; // Velocidade de movimento (pixels/segundo)

        // Inicializa física e inputs
        this.init();
        this.initInput();
    }

    init() {
        // Adiciona o sprite à cena e ao sistema de física
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Configurações de colisão
        this.setCollideWorldBounds(true); // Impede que saia da tela
        this.body.setImmovable(true);     // Não é empurrado por colisões
        this.body.allowGravity = false;   // Voo livre (sem gravidade puxando para baixo)
        
        // Ajuste opcional da caixa de colisão (hitbox) para ficar mais justo ao sprite
        // this.body.setSize(this.width * 0.8, this.height * 0.8);
    }

    initInput() {
        // Cria o objeto de escuta das setas do teclado
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    /**
     * Atualiza a lógica do jogador a cada frame.
     */
    update() {
        // Zera a velocidade a cada frame para evitar inércia indesejada
        this.body.setVelocity(0);

        // Variáveis para calcular a direção do movimento
        let velocityX = 0;
        let velocityY = 0;

        // --- Verificação Horizontal ---
        if (this.cursors.left.isDown) {
            velocityX = -1;
        } else if (this.cursors.right.isDown) {
            velocityX = 1;
        }

        // --- Verificação Vertical ---
        if (this.cursors.up.isDown) {
            velocityY = -1;
        } else if (this.cursors.down.isDown) {
            velocityY = 1;
        }

        // --- Normalização do Vetor de Movimento ---
        // Se houver movimento em qualquer eixo
        if (velocityX !== 0 || velocityY !== 0) {
            
            // Calcula o comprimento do vetor (Teorema de Pitágoras)
            // Se mover na diagonal (1, 1), o comprimento seria ~1.41
            const length = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
            
            // Normaliza (divide pelo comprimento) e multiplica pela velocidade desejada.
            // Isso garante que a velocidade na diagonal seja igual à velocidade em linha reta (350).
            velocityX = (velocityX / length) * this.speed;
            velocityY = (velocityY / length) * this.speed;

            this.body.setVelocity(velocityX, velocityY);
        }

        // --- Efeitos Visuais (Game Feel) ---
        // Inclina levemente o avião ao subir ou descer para dar sensação de voo
        if (velocityY < 0) {
            this.setAngle(-5); // Inclina para cima
        } else if (velocityY > 0) {
            this.setAngle(5);  // Inclina para baixo
        } else {
            this.setAngle(0);  // Retorna à posição original
        }
    }
}