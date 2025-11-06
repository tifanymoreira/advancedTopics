// -----------------------------------------------------------------------------
// main.js: arquivo principal do jogo
// -----------------------------------------------------------------------------

import Phaser from 'phaser';

// Importa as cenas do jogo
import PreloadScene from './scenes/PreloadScene.js';
import GameScene from './scenes/GameScene.js';

// -----------------------------------------------------------------------------
// Configurações globais
// -----------------------------------------------------------------------------

// Dimensões da tela do jogo
const WIDTH = 1000;
const HEIGHT = 700;

// Configurações compartilhadas entre as cenas
const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  debug: true
};

// Lista das cenas que compõem o jogo
const SCENES = [
  PreloadScene,
  GameScene
]

// Cria uma instância de cena com a configuração compartilhada
const createScene = Scene => new Scene(SHARED_CONFIG);

// Inicializa todas as cenas do jogo
const initScenes = () => SCENES.map(createScene);

// -----------------------------------------------------------------------------
// Configuração geral do Phaser.Game
// -----------------------------------------------------------------------------

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  backgroundColor: '#0080ff',
  parent: 'game-container',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: SHARED_CONFIG['debug'],
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: initScenes()
};

// -----------------------------------------------------------------------------
// Inicializa a instância principal do jogo com a configuração definida
// -----------------------------------------------------------------------------

new Phaser.Game(config);



