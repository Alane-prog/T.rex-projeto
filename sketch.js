var trex ,trex_running;
var ground, invisibleGround, groundImage;
var cloud, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var cloudsGroup;
var gameOverImg, restartImg;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  createCanvas(600,200);
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.x = 50;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocity.X = -4;
 
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(300,140);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  trex.setCollider("circle",0,0,40);
  trex.debug = true;

  score = 0;
}

function draw(){
  background(170)
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){
    ground.velocityX = -4; //velocidade do chão
    score = score + Math.round(frameCount/140); //pontuação
    gameOver.visible = false;
    restart.visible = false;

    if(ground.x<0){
      ground.x = ground.width/2;
    }

    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -13;
    }

    trex.velocityY = trex.velocityY + 0.8;

    spawnClouds();
    spawnObstacles();

    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
    }
  }
  
  else if (gameState === END) {
    ground.velocityX = 0;

    gameOver.visible = true;
    restart.visible = true;

    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

    trex.velocity = 0;

    trex.changeAnimation("collided", trex_collided);
  }

  trex.collide(invisibleGround);
  
  drawSprites();

}

function spawnClouds() {
//as nuvens irão se gerar a cada 60 quadros com o frameCount
  if(frameCount % 60 === 0) {
  
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage);
    cloud.y = Math.round(random(10,60));//arredonda os números inteiros
    cloud.scale = 0.4;
    cloud.velocityX = -3;
     //ajusta a profunddida das nuvens em relação ao trex
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    cloudsGroup.add(cloud);
  }
}

function spawnObstacles(){
if (frameCount % 60 === 0){
  var obstacle = createSprite(600,165,10,40);
  obstacle.velocityX = -6;

  var rand = Math.round(random(1,6));
  switch(rand){
    case 1: obstacle.addImage(obstacle1);
            break;
    case 2: obstacle.addImage(obstacle2);
            break;
    case 3: obstacle.addImage(obstacle3);
            break;
    case 4: obstacle.addImage(obstacle4);
            break;
    case 5: obstacle.addImage(obstacle5);
            break;
    case 6: obstacle.addImage(obstacle6);
            break;
    default: break;
  }

  obstacle.scale = 0.5;
  obstacle.lifetime = 300;

  obstaclesGroup.add(obstacle);
 }
}