//-----------------------------------------------------------------------------
// GameScene.js: define a cena principal do jogo
//-----------------------------------------------------------------------------

import Phaser from 'phaser';

// Classe que representa a cena principal do jogo
export default class GameScene extends Phaser.Scene {

  // Construtor
  constructor(config) {
    
    // Define a chave da cena
    super({ key: 'GameScene' });

    // Armazena a configuração compartilhada (dimensões, debug, etc.)
    this.config = config;
  }

  //-----------------------------------------------------------------------------

  // Inicializa dados da cena antes da criação de elementos
  init() {

    //Inicializa as referencias do teclado
    this.cursors = null;

    // Referências principais
    this.player = null;
    // O valor 50 foi sobrescrito para 100, mantendo 100 como o final
    this.playerSpeed = 100; 

    //Queijo
    this.cheese = null;
    this.cheesesCollected = 0;
    this.TOTAL_CHEESES = 5;

    //Placar
    this.score = 0;
    this.scoreText = null;
    
    // Propriedades de arrasto (drag) e distância mínima (minDistance) foram removidas pois
    // o método movePlayerManager() implementa um movimento instantâneo (arcade).
  }

  //-----------------------------------------------------------------------------
  create() {

    // Cria o cenário de fundo
    this.createBackground();

    // Cria o player
    this.createPlayer();


    //Cria o queijo (cria o primeiro queijo do jogo)
    this.createCheese();


    //adiciona a imagem da cerca posicionada na parte inferior da tela
    //A cerca fica na frente de todos os elementos do jogo

    this.add.image(
      0,
      this.config.height -241,
      'fence'
    ).setOrigin(0)
    .setDepth(10);

    //Cria o placar
    this.scoreText = this.add.text(
      10,
      10,
      'QUEIJOS: 0',
      {
        fontSize: '32px',
        fill: '#ffffff'
      }
      ).setShadow(1, 1, '#000000', 3);

    
      this.cursors = this.input.keyboard.createCursorKeys();
    
  }

  update() {

    this.movePlayerManager()
    
  }


  //FUNÇÕES AUXILIARES
  
  // Método para criar o cenário de fundo
  createBackground() {
    // Adiciona a imagem do cenário centralizada
    this.add.image(
      this.config.width * 0.5,
      this.config.height * 0.5,
      'background'
    );

  }

  createPlayer() {

    // Adiciona a imagem do player (habilitando física)
    this.player = this.physics.add.sprite(
      this.config.width * 0.5,
      300,
      'player'
    );


    // Habilita colisão com as bordas do mundo
    this.player.setCollideWorldBounds(true);

    //Define um novo tamnaho pra o corpo fisico do player
    const newWidth = this.player.width * 0.85;
    const newHeight = this.player.height * 0.5;

    //atualiza o tamanho do corpo físico do player
    this.player.body.setSize(newWidth, newHeight);

    //calcula o offset pra centralizr o corpo físico do player
    const offsetX = (this.player.width - newWidth) / 2;
    const offsetY = (this.player.height - newHeight) /2;

    //Ajusta o offset do corpo físico do player
    this.player.body.setOffset(offsetX, offsetY + 30);

  }


  movePlayerManager() {

    //Zera a velocidade do player antes de aplicar uma nova direção
    this.player.setVelocity(0);

    // Movimenta o player para a esquerda
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
      this.player.flipX = true;
    }

    //Movimenta o player para a direita
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
      this.player.flipX = false;
    }

    //Movimenta o player para cima
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-this.playerSpeed);
    }

    //Movimenta o player para baixo
    else if (this.cursors.down.isDown) {
      this.player.setVelocityY(this.playerSpeed);
    }

  }


  createCheese() {

    //Antes de criar um novo queijo, destroi o anterior
    // O queijo anterior já é desativado em collectCheese, mas o destroy()
    // aqui é mantido para garantir a remoção, caso o queijo seja gerado de outra forma.
    if (this.cheese) {
      this.cheese.destroy();
    } 

    //Escolhe um queijo aleatoriamente e define sua chave
    const randomCheeseType = Phaser.Math.Between(1, this.TOTAL_CHEESES);
    const cheeseKey = 'cheese' + randomCheeseType;

    //Posição Horizontal do queijo
    const x = Phaser.Math.Between(
      60,
      this.config.width - 60
    );

    //Posiçãoo vertical do queijo (evita a parte superior da tela)
    const y = Phaser.Math.Between(
      150,
      this.config.height - 40
    
    );

    //Cria o queijo e o torna um corpo físico
    this.cheese = this.physics.add.image(
      x, 
      y,
      cheeseKey
    ).setOrigin(0.5);

    //Defiine um novo tamnaho para o corpo físico do queijo
    const newWidth = this.cheese.width * 0.6;
    const newHeight = this.cheese.height * 0.6;

    //Ajusta o tamanhoo do corpo físico do queijo
    this.cheese.body.setSize(newWidth, newHeight);

    //Calcula o offset para centralizar o corpo físico do queijo
    const offsetX = (this.cheese.width - newWidth) / 2;
    const offsetY = (this.cheese.height - newHeight) / 2;

    //Ajusta o offset do corpo físico do queijo
    this.cheese.body.setOffset(offsetX, offsetY);

    //Configura a sobreposição com o jogador
    this.physics.add.overlap(
      this.player,
      this.cheese,
      this.collectCheese,
      null,
      this
    );
        
    // REMOVIDO: O timer recursivo que estava gerando queijos a cada 3 segundos,
    // o que causaria problemas. O novo queijo é gerado após a coleta em collectCheese().

  }

  //Método que gerencia o contador de queijos coletados
  collectCheese(player, collectCheese) {

    this.cheesesCollected++;

    //Atualiza o placar
    this.scoreText.setText('QUEIJOS: ' + this.cheesesCollected);

    //Destroy o queijo que foi coletado (desabilita o corpo e o torna invisível)
    collectCheese.disableBody(true, true);

    // ADICIONADO: Gera um novo queijo logo após a coleta (correção do bug)
    this.createCheese();
  }

}