/**
 * Main.js
 * Arquivo principal de configuração e inicialização do jogo Phaser.
 */

import Phaser from 'phaser';
import PreLoadScene from './scenes/PreLoadScene.js';
import GameScene from './scenes/GameScene.js';

// Dimensões constantes do jogo
const WIDTH  = 1000;
const HEIGHT = 700;

// Configurações compartilhadas (injetadas em todas as cenas)
const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  debug: false // Altere para true para ver as caixas de colisão (hitboxes)
};

// Lista ordenada de cenas
const SCENES = [
  PreLoadScene,
  GameScene
];

// Função factory para inicializar cenas com a configuração compartilhada
const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => SCENES.map(createScene);

// Objeto de configuração principal do Phaser
const config = {
  type: Phaser.AUTO, // Escolhe WebGL ou Canvas automaticamente
  ...SHARED_CONFIG,
  backgroundColor: '#87CEEB', // Cor do céu (fallback se a imagem falhar)
  parent: 'game-container',   // ID da DIV no HTML
  pixelArt: false,            // False para gráficos suaves, True para estilo 8-bit
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },      // Gravidade zero para estilo top-down/avião
      debug: SHARED_CONFIG.debug,
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,   // Ajusta o jogo para caber na tela mantendo proporção
    autoCenter: Phaser.Scale.CENTER_BOTH // Centraliza horizontal e verticalmente
  },
  scene: initScenes()
};

// Inicialização da instância do jogo
new Phaser.Game(config);