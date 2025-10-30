//------------------------------------------------------------------------
// Main.js : Arquivo principal do Jogo

import Phaser from 'phaser';

//importa as cenas

import PreLoadScene from './scenes/PreLoadScene.js';
import GameScene from './scenes/GameScene.js';

//Configurações Globais

//Dimensões da Tela do jogo
const WIDTH  = 1000; //em px
const HEIGHT = 700;

//Configurações compartilhadas entre as cenas
const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  debug: false
};

//Lista das cenas que compõem o jogo
const SCENES = [
  PreLoadScene,
  GameScene
]

//cria uma instância de cena com a configuração compartilhada
const createScene = Scene => new Scene(SHARED_CONFIG);

//Inicializa todas as cenas do jogo
const initScenes = () => SCENES.map(createScene);

/*ele cria um mapeamento e atinge todas as páginas*/

//------------------------------------------------------------------------
//Configuração geral do Phaser.Game

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  backgroundColor: '#0080FF',
  parent: 'game-container',
  pixelArt: false,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y:300},
      debug: SHARED_CONFIG['debug'],
    }
  },
  scale:{
    mode:Phaser.Scale.FIT,
    autoCenter:Phaser.Scale.Center_Both
  },
  scene: initScenes()
};


//------------------------------------------------------------------------
//Inicializa a instância principal do jogo com a configuração definida
new Phaser.Game(config)
