// -----------------------------------------------------------------------------
// PreloadScene.js: configuração da cena responsável pelo carregamento dos
// objetos do jogo
// -----------------------------------------------------------------------------

import Phaser from 'phaser';

// -----------------------------------------------------------------------------

// Classe que define a cena de carregamento
export default class PreloadScene extends Phaser.Scene {

  // Construtor
  constructor() {
    super({key: 'PreloadScene'});
  }

  // ---------------------------------------------------------------------------

  // Carrega os assets utilizados pelo jogo
  preload() {

    // Exibe a barra de progresso
    this.displayProgressBar();

    // Carrega a imagem do cenário de fundo
    // TODO

    // Carrega o spritesheet do player
    // TODO

    // Carrega o spritesheet do inimigo
    // TODO

  }

  // ---------------------------------------------------------------------------

  // Inicializa os elementos da cena
  create() {
    // Muda para a cena principal do jogo
    this.scene.start('GameScene');
  }

  // ---------------------------------------------------------------------------
  // Funções auxiliares
  // ---------------------------------------------------------------------------

  // Cria e exibe uma barra de progresso enquanto os assets são carregados
  displayProgressBar() {

    // Dimensões da barra
    const {width, height} = this.cameras.main;

    // Fundo da barra
    const progressBarBg = this.add.graphics();
    progressBarBg.fillStyle(0x222222, 0.8);
    progressBarBg.fillRect(width / 4 - 2, height / 2 - 12, width / 2 + 4, 24);

    // Barra principal
    const progressBar = this.add.graphics();

    // Texto "Loading..."
    const loadingText = this.add.text(
      width / 2, 
      height / 2 - 30, 
      'Loading...', 
      {
        fontSize: '20px',
        fill: '#fff'
      }
    ).setOrigin(0.5);

    // Atualiza a barra conforme o progresso do carregamento
    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 4, height / 2 - 10, (width / 2) * value, 20);
    });

    // Remove os elementos da barra ao fim do carregamento
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBarBg.destroy();
      loadingText.destroy();
    });

  }

}