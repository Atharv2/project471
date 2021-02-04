var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ironman, ironman_running;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstacle,obstacleImage,obstacleGroup;

var score=0;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  ironman_running = loadAnimation("iron man 2.png","iron man 3.png","iron man 4.png","iron man 5.png","iron man 6.png");
  //obstacleImage = loadAnimation("1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg")
  obstacleImage = loadImage("1.jpg");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  
canvas=createCanvas(1200,400);
 
  
 ironman = createSprite(50,160,20,50);
 ironman.addAnimation("running", ironman_running);
 
  

 ironman.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX=-(6+3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
 
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  
  
  //create Obstacle and Cloud Groups
  
  cloudsGroup = createGroup();

  
  ironman.setCollider("rectangle",0,0,ironman.width,ironman.height);
 ironman.debug = true
  
  //score = 0;
  
}

function draw() {
  
   
  background(180);
  //displaying score
  textSize(30);
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

     //scoring
     score = score + Math.round(getFrameRate()/60);
   
    ground.velocityX = -(6 + 3* score/100)
    

    //jump when the space key is pressed
    if(keyDown("space")&& ironman.y >= 100) {
      ironman.velocityY = -12;
        jumpSound.play();
    }
    
 //add gravity
 ironman.velocityY = ironman.velocityY + 0.8
  
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //console.log(ironman.x);
    ironman.collide(invisibleGround);
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacle();
    if(obstacleGroup.isTouching(ironman)){
      gameState=END;
    }
    
  }
  
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     //change the trex animation
      
     
     
      ground.velocityX = 0;
      ironman.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
     
     obstacleGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);   

     obstacle.setLifetime(-1);
    cloudsGroup.setLifetimeEach(-1);
    
     
     if(mousePressedOver(restart)) {
      reset();
    }

   }
  
 
  
  
 

  drawSprites();
}

function reset(){
  

}


function spawnObstacle(){
  if(frameCount % 120 ===0){
   var obstacle = createSprite(600,150,50,50);
    obstacle.addImage(obstacleImage);
    obstacle.x=Math.round(random(400,800))

    obstacle.scale= 0.05;
    obstacle.velocityX= -5;
    
    obstacle.collide(invisibleGround);
    obstacle.lifetime = 300;
   obstacleGroup.add(obstacle);
  
  
  }
   
    
 }


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = ironman.depth;
    ironman.depth = ironman.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

