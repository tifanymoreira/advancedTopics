//Player.js: define a 
import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite{
    //construtor
    constructor(scene,x,y){
        //incializa o sprite com a textura "Player"
        super(scene, x, y, 'player');

        //Define a cena onde o player será adicionado
        this.scene = scene;

        //Configura física, entrada e propriedades iniciais
        this.init();
    }

    /*----------------------------------------------------------------*/
    //configura o sprite do jofador e suas propriedades físicas

    init(){
        //adiciona o sprite do player à cena para que seja renderizado
        this.scene.add.existing(this);

        //adiciona o sprite ao sistema de física para que tenha corpo físico
        this.scene.physics.add.existing(this);

        //impede que o player seja empurrado por outros objetos
        this.setImmovable(true);

        //Permite que o player colida com os limites da cena (parede da tela)
        this.setCollideWorldBounds(true);

        //Desativa a gravidade para o player (movimento apenas horizontal)
        this.body.allowGravity = false;
    }

    //Atualiza o comportamento do jogador a cada frame
    update(){
        //to do...
    }

    //Funções auxiliares

    //to do...
}


