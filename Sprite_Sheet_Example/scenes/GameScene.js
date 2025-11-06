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
      'Animation by Spritesheet', 
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
    this.add.image(
      this.config.width * 0.5, 
      this.config.height * 0.5, 
      'background'
    );

  }

  // ---------------------------------------------------------------------------

  // Método para criar o inimigo
  createEnemy() {

    // Adiciona o primeiro sprite do inimigo
    this.enemy = this.add.sprite(
      this.config.width * 0.5, 
      this.config.height * 0.5, 
      'enemy',
    ).setScale(2); 
      

    // Linha 1:  0 - 21  -> idle: 0 - 5
    // Linha 2: 22 - 43  -> walk: 22 - 33
    // Linha 3: 44 - 65  -> cleave: 44 - 58
    // Linha 4: 66 - 87  -> take hit: 66 - 70
    // Linha 5: 88 - 109 -> death: 88 - 109


 // Cria a animação do inimigo atacando
    this.anims.create({
      key: 'cleave',
      frames: this.anims.generateFrameNumbers(
        'enemy', {
           start: 44, 
           end: 58 }),
      frameRate: 8,
      repeat: -1
    });

    // Executa a animação do inimigo atacando
    this.enemy.play('death');




    // Cria a animação do inimigo morrendo
    this.anims.create({
      key: 'death',
      frames: this.anims.generateFrameNumbers(
        'enemy', {
           start: 88, 
           end: 109 }),
      frameRate: 8,
      repeat: -1
    });

    // Executa a animação do inimigo atacando
    this.enemy.play('cleave');
    this.enemy.play('death');



  }

}
