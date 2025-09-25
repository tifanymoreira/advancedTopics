import Phaser from "phaser";

//Classe que define a cena de carregamento
export default class PreLoadScene extends Phaser.Scene{
    //construtor
    constructor(){
        super({key:'PreLoadScene'});
    }
    
    //carrega os assets utilizados pelo jogo
    preload(){
        //Exibe a barra de progresso
        this.displayProgressBar();

        //carrega as imagens
        this.load.image('cenario', '/assets/images/background.png')
        this.load.image('player', '/assets/images/avelino.png');
    }

    //------------------------------------------------------------------------
    //Inicializa os elementos da cena
    create(){
        //muda para a cena do jogo
        this.scene.start('GameScene');
    }

    
    //------------------------------------------------------------------------
    //Funções auxiliares

    //Cria e exibe uma barra de progresso
    displayProgressBar(){
        //dimensões da barra
        const {width, height} = this.cameras.main;

        //fundo da barra
        const progressBarBg = this.add.graphics();
        progressBarBg.fillStyle(0x222222,0.8);
        progressBarBg.fillRect(width / 4 - 2, height / 2 - 12, width / 2 + 4 , 24);
    
        //barra principal
    const progressBar = this.add.graphics();

    //texto "loading"
    const loadingText = this.add.text(
        width / 2, 
        height / 2 - 30,
        'Loading...',
        {
            fontSize: '20px',
            fill: "#ffffff"
        }
    ).setOrigin(0.5);

    //Atualiza a barra conforme o progresso do carregamento
    this.load.on('progress', (value) => {
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(width / 4, height / 2 - 10, (width/2) * value, 20);
    });

    //Remove os elementos da barra ao fim do carregamento
    this.load.on('complete', () =>{
        progressBar.destroy();
        progressBarBg.destroy();
        loadingText.destroy();
    });
    }
    
}