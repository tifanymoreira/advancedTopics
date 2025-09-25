import Phaser from 'phaser';

//importa as depedências
import Player from '../entities/Player.js';

export default class GameScene extends Phaser.Scene{
    constructor(config){
        super({key: 'GameScene'});

        //Armazena a configuração compartilhada (dimensões, debug, etc)
        this.config = config;
    }

    //Inicializa dados da cena antes da criação dos elementos
    init(){
        //todo...
    }

    //cria os elementos visuais e lógicos da cena
    create(){
        //Adiciona o cenário de fundo
        this.createBackground();

        //instancia o plauer
        //this.createPlayer();
    }

    //Atualiza a cena a cada frame (60x por segundo)
    update(time,delta){
        //todo
    }

    //cria o cenário de fundo com base na imagem pré-carregada
    createBackground(){
        //adiciona a imagem do cenário de fundo
        this.add.image(
            //this.config.width * 0.5,
            //this.config.height * 0.5,
            500,
            350,
            'cenario'
        );
    }

    createPlayer(){
        //define a posição inciial do player
        const startX = this.config.width * 0.5;
        const startY = this.config.height - 235;

        //Instancia o player
        this.player = new this.player(this, startX, startY);
    }
}