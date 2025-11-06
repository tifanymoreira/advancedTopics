// -----------------------------------------------------------------------------
// GameScene.js: define a cena principal do jogo
// -----------------------------------------------------------------------------

import Phaser from 'phaser';

// -----------------------------------------------------------------------------

// Classe que representa a cena principal do jogo
export default class GameScene extends Phaser.Scene {

  constructor(config) {
    // Define a chave da cena e armazena as configurações compartilhadas
    super({key: 'GameScene'}, config);
    this.config = config;
  }

  // ---------------------------------------------------------------------------

  // Inicializa as propriedades da cena
  init() {

    // Gravidade aplicada ao jogo
    this.gravity = 500;

    // Distância mínima para o ataque do inimigo
    this.distanceToAttack = 250;

    // Player
    this.player = null;
    this.playerSpeed = 200;
    this.playerJumpForce = 520;

    // Enemy
    this.enemy = null;
    this.enemySpeed = 80;
    this.enemyDirection = -1;

  }

  // ---------------------------------------------------------------------------

  // Cria os elementos visuais e lógicos da cena
  create() {

    // Cria o cenário de fundo e o chão
    this.createBackground();
    this.createGround();

    // Registra as animações do player e do inimigo
    // TODO

    // Cria o player e o inimigo
    this.createPlayer();
    this.createEnemy();

    // ---

    // Configura as propriedades físicas do player
    this.player.body.setGravityY(this.gravity);
    this.player.setCollideWorldBounds(true);

    // Configura propriedades físicas do inimigo
    this.enemy.body.setGravityY(this.gravity);
    this.enemy.setCollideWorldBounds(true);

    // ---

    // Configura entrada de teclado e mouse
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.input.mouse.disableContextMenu();

    // ---

    // Eventos de animação do inimigo
    // Considera a animação para ajustar o tamanho do corpo físico
    // Também ajusta o offset conforme a direção do inimigo
    // TODO

    // Inimigo atacando: aumenta o tamanho do corpo físico
    // TODO

    // Inimigo caminhando: reseta o tamanho do corpo físico
    // TODO

  }

  // ---------------------------------------------------------------------------

  // Atualiza a lógica do jogo a cada frame
  update() {

    // Obtém a referências para as teclas
    const { left, right, up, down, space } = this.cursorKeys;

    // Faz com que a tecla de pulo seja contabilizada uma
    // única vez, mesmo se ela estiver sendo pressionada
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);

    // Faz com que a tecla de espaço seja contabilizada uma
    // única vez, mesmo se ela estiver sendo pressionada
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);

    // Indica se o player está em contato com o chão
    // TODO
    
    // Indica se o player está executando alguma animação
    // TODO
    

    // Verifica se o player está executando uma animação específica (animKey)
    // TODO

    // ---

    // Movimentação do player 

    // Seta para a esquerda: movimenta o player para a esquerda
    if (left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
      this.player.setFlipX(true);
    }
    // Seta para a direita: movimenta o player para a direita
    else if (right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
      this.player.setFlipX(false);
    }
    // Deixa o player parado
    else {
      this.player.setVelocityX(0);
    }

    // Seta para cima: faz o player pular
    if (isUpJustDown && playerOnFloor) {
      this.player.setVelocityY(-this.playerJumpForce);
    }

    // Seta para baixo: faz o player se abaixar
    // O player somente se abaixa se estiver no chão
    // TODO
    
    // Espaço: faz o player atacar
    // TODO
    
    // Se o player estiver atacando, interrompe as outras animações
    // TODO

    // Se o player estiver no chão
    if (playerOnFloor) {
      // Se o player estiver se movendo para os lados
      // TODO
      
      // Se o player estiver parado
      // TODO
      
    }
    // Se o player estiver pulando
    else {
      // TODO
    }

    // ---

    // Movimento e ataque do inimigo
    // TODO

  }

  // ---------------------------------------------------------------------------
  // Funções auxiliares
  // ---------------------------------------------------------------------------

  // Método para criar o cenário de fundo
  createBackground() {

    // Cenário
    // TODO

    // Colunas
    // TODO

  }

  // ---------------------------------------------------------------------------

  // Método para criar o chão da cena
  createGround() {

    // Cria um retângulo para representar o chão
    // TODO

    // Adiciona um corpo físico do tipo estático
    // TODO
    
    // Atribui o retângulo do chão à cena, permitindo a aplicação de colisões
    // TODO

  }

  // ---------------------------------------------------------------------------

  // Método para criar o player
  createPlayer() {

    // Adiciona o primeiro sprite do player
    // TODO

    // Executa a animação do player parado
    // TODO

    // Ativa a colisão entre o player e o chão
    // TODO

  }

  // ---------------------------------------------------------------------------

  // Registra as animações do player
  registerPlayerAnimations() {

    // Linha 1:  0 - 7   -> idle: 0 - 1
    // Linha 2:  8 - 15  -> idle blink: 8 - 9
    // Linha 3: 16 - 23  -> walk: 16 - 19
    // Linha 4: 24 - 31  -> run: 24 - 31
    // Linha 5: 32 - 39  -> duck: 32 - 37 (ou 32 - 35 para manter ele abaixado)
    // Linha 6: 40 - 47  -> jump: 40 - 47
    // Linha 7: 48 - 55  -> disappear: 48 - 50
    // Linha 8: 56 - 63  -> die: 56 - 63
    // Linha 9: 64 - 71  -> attack: 64 - 71

    // Cria a animação do player parado
    // TODO
    
    // Cria a animação do player caminhando
    // TODO

    // Cria a animação do player se abaixando
    // TODO
    
    // Cria a animação do player pulando
    // TODO

    // Cria a animação do player atacando
    // TODO

  }

  // ---------------------------------------------------------------------------

  // Método para criar o inimigo
  createEnemy() {

    // Adiciona o primeiro sprite do inimigo
    // TODO

    // Executa a animação do inimigo parado
    // Ajusta o tamanho do corpo do inimigo
    // TODO

    // Ativa a colisão entre o inimigo e o chão
    // TODO
    
  }

  // ---------------------------------------------------------------------------

  // Método que controla o movimento do inimigo
  handleEnemyMovement() {

    // Realiza a movimentação do inimigo
    // TODO

    // Quando o inimigo atingir a borda esquerda da tela
    // TODO
    
    // Quando o inimigo atingir a borda direita da tela
    // TODO

  }

  // ---------------------------------------------------------------------------

  // Método que controla o ataque do inimigo
  handleEnemyAttack() {

    // Indica se o inimigo está atacando o player
    // TODO

    // Obtém a distância entre o inimigo e o player
    // TODO

    // Se o inimigo estiver perto do player
    if (distanceToPlayer < this.distanceToAttack) {

      // Executa a animação de ataque
      // TODO

      // Enquanto ataca, não deixa o inimigo se movimentar
      // TODO

    } 
    else {
      // Movimenta o inimigo
      // TODO
    }

  }

  // ---------------------------------------------------------------------------

  // Registra as animações do inimigo
  registerEnemyAnimations() {

    // Linha 1:  0 - 21  -> idle: 0 - 5
    // Linha 2: 22 - 43  -> walk: 22 - 33
    // Linha 3: 44 - 65  -> cleave: 44 - 58
    // Linha 4: 66 - 87  -> take hit: 66 - 70
    // Linha 5: 88 - 109 -> death: 88 - 109

    // Cria a animação do inimigo parado
    // TODO
    
    // Cria a animação do inimigo caminhando
    // TODO

    // Cria a animação do inimigo atacando
    // TODO

  }

}
