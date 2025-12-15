import Phaser from "phaser";

/**
 * PreLoadScene
 * Responsável por carregar todos os assets (imagens, sons) antes do jogo iniciar.
 */
export default class PreLoadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreLoadScene' });
    }
    
    preload() {
        // Exibe a barra de progresso visualmente
        this.displayProgressBar();

        // Carregamento dos Assets
        // 'cenario' -> Imagem de fundo
        this.load.image('cenario', '/assets/images/background.png');
        // 'player'  -> Sprite do personagem/avião
        this.load.image('player', '/assets/images/avelino.png');
    }

    create() {
        // Após o carregamento completo, inicia a cena do jogo
        this.scene.start('GameScene');
    }

    /**
     * Cria e gerencia a lógica da barra de progresso de carregamento.
     */
    displayProgressBar() {
        const { width, height } = this.cameras.main;

        // Desenha o fundo da barra (cinza escuro)
        const progressBarBg = this.add.graphics();
        progressBarBg.fillStyle(0x222222, 0.8);
        progressBarBg.fillRect(width / 4 - 2, height / 2 - 12, width / 2 + 4, 24);
    
        // Prepara o gráfico da barra de preenchimento (branco)
        const progressBar = this.add.graphics();

        // Adiciona texto informativo
        const loadingText = this.add.text(
            width / 2, 
            height / 2 - 30,
            'Carregando Assets...',
            {
                font: '20px Arial',
                fill: "#ffffff"
            }
        ).setOrigin(0.5);

        // Evento: Atualiza a barra conforme os arquivos são carregados
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 4, height / 2 - 10, (width / 2) * value, 20);
        });

        // Evento: Limpa os elementos visuais quando o carregamento termina
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBarBg.destroy();
            loadingText.destroy();
        });
    }
}