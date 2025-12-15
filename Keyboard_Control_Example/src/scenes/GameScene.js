import Phaser from 'phaser';
import Player from '../entities/Player.js';

/**
 * GameScene
 * Cena principal onde a jogabilidade acontece.
 */
export default class GameScene extends Phaser.Scene {
    constructor(config) {
        super({ key: 'GameScene' });
        this.config = config;
        this.player = null;
    }

    /**
     * Cria os objetos do jogo (Cenário, Jogador, Inimigos).
     * A ordem de criação define a ordem de renderização (Z-index).
     */
    create() {
        this.createBackground();
        this.createPlayer();
    }

    /**
     * Loop principal do jogo (Game Loop).
     * Executado aproximadamente 60 vezes por segundo.
     * @param {number} time - Tempo total decorrido.
     * @param {number} delta - Tempo decorrido desde o último frame (ms).
     */
    update(time, delta) {
        if (this.player) {
            this.player.update(time, delta);
        }
    }

    createBackground() {
        // Posiciona o background no centro da tela
        this.add.image(
            this.config.width * 0.5,
            this.config.height * 0.5,
            'cenario'
        );
    }

    createPlayer() {
        // Define a posição inicial (Centralizado horizontalmente, parte inferior)
        const startX = this.config.width * 0.5;
        const startY = this.config.height - 235;

        // Instancia o objeto Player e o adiciona à cena
        this.player = new Player(this, startX, startY);
    }
}