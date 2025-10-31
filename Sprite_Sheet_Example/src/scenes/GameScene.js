// -----------------------------------------------------------------------------
// GameScene.js: define a cena principal do jogo
// -----------------------------------------------------------------------------

import Phaser from 'phaser';

// -----------------------------------------------------------------------------

// Classe que representa a cena principal do jogo
export default class GameScene extends Phaser.Scene {

  constructor(config) {

    // Define a chave da cena
    super({key: 'GameScene'}, config);

    // Armazena a configuração compartilhada (dimensões, debug, etc.)
    this.config = config;

  }

  // ---------------------------------------------------------------------------

  // Cria os elementos visuais e lógicos da cena
  create() {

    // Cria o cenário de fundo
    this.createBackground();

    // Cria o inimigo
    this.createEnemy();

    // ---

    // Obtém o centro da tela
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Adiciona um texto explicativo
    this.add.text(
      centerX, 
      centerY - 200, 
      'Animation by Frames', 
      {
        fontSize: '40px',
        fontFamily: 'Arial',
        color: '#ffffff'
      }
    ).setOrigin(0.5);

  }

  // ---------------------------------------------------------------------------
  // Funções auxiliares
  // ---------------------------------------------------------------------------

  // Método para criar o cenário de fundo
  createBackground() {

    // Adiciona a imagem do cenário
    // TODO

  }

  // ---------------------------------------------------------------------------

  // Método para criar o inimigo
  createEnemy() {

    // Adiciona o primeiro sprite do inimigo
    // TODO

    // Cria a animação a partir dos quadros individuais
    // TODO

    // Executa a animação
    // TODO

  }

}