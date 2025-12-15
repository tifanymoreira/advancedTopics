import Phaser from 'phaser';
import PreLoadScene from './scenes/PreLoadScene.js';
import GameScene from './scenes/GameScene.js';

const WIDTH  = 1000;
const HEIGHT = 700;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  debug: false
};

const SCENES = [
  PreLoadScene,
  GameScene
];

const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => SCENES.map(createScene);

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  backgroundColor: '#141414',
  parent: 'game-container',
  pixelArt: false,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: SHARED_CONFIG.debug,
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: initScenes()
};

new Phaser.Game(config);