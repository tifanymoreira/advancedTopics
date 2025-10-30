// PreloadScene.js — cena responsável por carregar os assets

import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    // Cria e atualiza a barra de progresso
    this.displayProgressBar();
    
    this.load.image('background', 'assets/images/background.png');
    this.load.image('fence', 'assets/images/cerca.png');
    this.load.image('player' , 'assets/images/mineiro.png');

    //Queijos
    this.load.image('cheese1', 'assets/images/queijo1.png');
    this.load.image('cheese2', 'assets/images/queijo2.png');
    this.load.image('cheese3', 'assets/images/queijo3.png');
    this.load.image('cheese4', 'assets/images/queijo4.png'); // ADICIONADO: Estava faltando
    this.load.image('cheese5', 'assets/images/queijo5.png');

  }

  create() {
    // Ao terminar o preload, esta cena é chamada automaticamente.
    // Troca para a cena principal do jogo:
    this.scene.start("GameScene");
  }

  // ===== Funções auxiliares =====

  // Cria e exibe uma barra de progresso enquanto os assets são carregados
  displayProgressBar() {
    const { width, height } = this.cameras.main;

    const barWidth = Math.floor(width * 0.5);
    const barHeight = 20;
    const x = Math.floor((width - barWidth) / 2);
    const y = Math.floor(height / 2);

    // Fundo da barra
    const progressBarBg = this.add.graphics();
    progressBarBg.fillStyle(0x222222, 0.8);
    progressBarBg.fillRect(x - 2, y - 2, barWidth + 4, barHeight + 4);

    // Barra principal
    const progressBar = this.add.graphics();

    // Texto "Loading..."
    const loadingText = this.add
      .text(width / 2, y - 30, "Loading...", {
        fontSize: "20px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // Atualiza a barra conforme o progresso do carregamento
    this.load.on("progress", (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(x, y, Math.floor(barWidth * value), barHeight);
    });

    // Remove os elementos da barra ao fim do carregamento
    this.load.on("complete", () => {
      progressBar.destroy();
      progressBarBg.destroy();
      loadingText.destroy();
    });
  }
}