import Phaser from 'phaser';
import Player from '../entities/Player.js';

export default class GameScene extends Phaser.Scene {
    constructor(config) {
        super({ key: 'GameScene' });
        this.config = config;
    }

    init() {
        this.score = 0;
        this.winningScore = 100; // Pontuação para vencer
        this.isGameOver = false;
    }

    create() {
        // 1. Cenário
        this.createBackground();

        // 2. Player
        // Posiciona no chão do cenário
        const startX = this.config.width * 0.5;
        const startY = this.config.height - 230; 
        this.player = new Player(this, startX, startY);

        // 3. Itens
        this.items = this.physics.add.group();
        
        this.itemTimer = this.time.addEvent({
            delay: 800, // Itens caem mais rápido
            callback: this.dropItem,
            callbackScope: this,
            loop: true
        });

        // 4. Interface (UI) - Placar
        this.createUI();

        // 5. Controles
        this.cursors = this.input.keyboard.createCursorKeys();

        // 6. Colisões
        this.physics.add.overlap(this.player, this.items, this.collectItem, null, this);
    }

    update() {
        if (this.isGameOver) return;

        // Delega a movimentação para a entidade Player
        if (this.player) {
            this.player.update(this.cursors);
        }

        // Remove itens que saíram da tela para não pesar a memória
        this.items.children.iterate((item) => {
            if (item && item.y > this.config.height) {
                item.destroy();
            }
        });
    }

    createBackground() {
        // Centraliza o background
        this.add.image(this.config.width / 2, this.config.height / 2, 'cenario');
    }

    createUI() {
        // Texto de Pontuação com sombra para leitura melhor
        this.scoreText = this.add.text(20, 20, 'Score: 0', { 
            fontSize: '32px', 
            fontFamily: 'Arial Black',
            fill: '#FFF',
            stroke: '#000',
            strokeThickness: 4
        });

        // Texto de Objetivo
        this.add.text(20, 60, `Meta: ${this.winningScore}`, {
            fontSize: '16px',
            fontFamily: 'Arial',
            fill: '#FFD700' // Dourado
        });

        // Grupo para mensagem de vitória (invisível inicialmente)
        this.victoryContainer = this.add.container(0, 0);
        this.victoryContainer.setAlpha(0);
        this.victoryContainer.setDepth(10); // Fica na frente de tudo
    }

    dropItem() {
        if (this.isGameOver) return;

        const x = Phaser.Math.Between(50, this.config.width - 50);
        const itemNumber = Phaser.Math.Between(1, 18);
        
        const item = this.items.create(x, -50, 'item' + itemNumber);
        
        // Física e rotação para ficar legal
        item.setVelocityY(Phaser.Math.Between(150, 300));
        item.setAngularVelocity(Phaser.Math.Between(-100, 100)); // Gira enquanto cai
        item.setScale(0.8); // Ajuste leve de escala se necessário
    }

    collectItem(player, item) {
        if (this.isGameOver) return;

        // Efeito visual ao coletar (Tween de escala e sumiço)
        this.tweens.add({
            targets: item,
            scaleX: 1.5,
            scaleY: 1.5,
            alpha: 0,
            duration: 100,
            onComplete: () => {
                item.destroy();
            }
        });

        // Desabilita o corpo físico imediatamente para não contar 2x
        item.disableBody(true, false);

        // Atualiza pontuação
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        // Efeito de "Scale" no texto de score para dar feedback
        this.tweens.add({
            targets: this.scoreText,
            scale: 1.2,
            duration: 100,
            yoyo: true
        });

        // Verifica vitória
        if (this.score >= this.winningScore) {
            this.winGame();
        }
    }

    winGame() {
        this.isGameOver = true;
        this.physics.pause(); // Para tudo
        this.itemTimer.remove(); // Para de criar itens

        const { width, height } = this.config;

        // Fundo semitransparente escuro
        const bgRect = this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.7);
        
        // Texto de Vitória
        const winText = this.add.text(width/2, height/2 - 50, 'VITÓRIA!', {
            fontSize: '64px',
            fontFamily: 'Arial Black',
            fill: '#00ff00',
            stroke: '#ffffff',
            strokeThickness: 6
        }).setOrigin(0.5);

        const subText = this.add.text(width/2, height/2 + 20, 'Clique para jogar novamente', {
            fontSize: '24px',
            fontFamily: 'Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Adiciona ao container e anima a entrada
        this.victoryContainer.add([bgRect, winText, subText]);
        
        this.tweens.add({
            targets: this.victoryContainer,
            alpha: 1,
            duration: 500
        });

        // Clique para reiniciar
        this.input.on('pointerdown', () => {
            this.scene.restart();
        });
    }
}