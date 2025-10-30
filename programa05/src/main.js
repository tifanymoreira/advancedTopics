import Phaser from 'phaser';

//importa as cenas do jogo

import PreloadScene from './scenes/Preloadscene.js';
import GameScene from './scenes/GameScene.js';

//configurações Globais 

//Dimensões da tela do jogo
const WIDTH = 1000;
const HEIGHT = 700;

//Configurações compartilhadas entre as cenas

const SHARED_CONFIG = {
    width: WIDTH,
    height: HEIGHT,
    debug: true
};

//Lista de cenas que compoem o jogo

const SCENES = [
    PreloadScene, 
    GameScene
];

//Cria um instancia da cena com a configuração compartilhada

const createScene = Scene => new Scene(SHARED_CONFIG);

//inicializa todas as cenas do jogo
const initScenes = () => SCENES.map(createScene);

//Configuraçao geral  do Phaser Game
 const config = {
    type: Phaser.AUTO,
    ...SHARED_CONFIG,
    backgroundColor: '#0080ff',
    parent: 'game-container',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: SHARED_CONFIG['debug'],
        }
    },


scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
},

scene: initScenes()


 };

 //Inicializa a instancia principal do jogo com a configuração definada


 new Phaser.Game(config);
