import Phaser from "phaser";

export default class PreLoadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreLoadScene' });
    }

    preload() {
        this.displayProgressBar();

        this.load.image('cenario', '/assets/images/background.png');

        this.load.spritesheet('player', '/assets/images/spritesheets/garota_spritesheet.png', {
            frameWidth: 300, 
            frameHeight: 452 
        });

        // Carrega os 18 itens de medicamento
        for (let i = 1; i <= 18; i++) {
            this.load.image('item' + i, `/assets/images/itens/item${i}.png`);
        }
    }

    create() {
        this.scene.start('GameScene');
    }

    displayProgressBar() {
        const { width, height } = this.cameras.main;
        
        const progressBarBg = this.add.graphics();
        progressBarBg.fillStyle(0x222222, 0.8);
        progressBarBg.fillRect(width / 4 - 2, height / 2 - 12, width / 2 + 4, 24);

        const progressBar = this.add.graphics();

        const loadingText = this.add.text(width / 2, height / 2 - 30, 'Carregando...', {
            fontSize: '20px',
            fontFamily: 'Arial',
            fill: "#ffffff"
        }).setOrigin(0.5);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x00ff00, 1);
            progressBar.fillRect(width / 4, height / 2 - 10, (width / 2) * value, 20);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBarBg.destroy();
            loadingText.destroy();
        });
    }
}