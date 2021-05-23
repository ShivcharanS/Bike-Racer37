var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;
var x = 0;
var y
var index = 0
var cycle = [mainCyclist];

var distance=0;
var  cycleBell,pinkCG,redCG,yellowCG,obstaclesG;
var player1,player2,player3;
var pinkOppoImg,redOppoImg,yellowOppoImage;
var pinkFallImg,redFallImg,yellowFallImg;
var obstacle,obsImg1,obsImg2,obsImg3;
var gameOver,overImg;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1=
 loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  mainRacerImg3 = loadAnimation("images/mainPlayer3.png");
    pinkOppoImg =  loadAnimation("Pinkopponent1.png","Pinkopponent2.png");
  redOppoImg = loadAnimation("Redopponent1.png","Redopponent2.png");
  yellowOppoImg =          loadAnimation("Yellowopponent1.png","Yellowopponent2.png");
  pinkFallImg = loadAnimation("Pinkopponent3.png");
  redFallImg = loadAnimation("Redopponent3.png");
  yellowFallImg = loadAnimation("Yellowopponent3.png");
  obsImg1 = loadImage("obstacle1.png");
  obsImg2 = loadImage("obstacle2.png");
  obsImg3 = loadImage("obstacle3.png");
  overImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;

mainCyclist.setCollider("circle",0,0,100);
  
pinkCG = new Group();
redCG = new Group();
yellowCG = new Group();
obstaclesG = new Group();

 gameOver = createSprite(250,150,10,10);
 gameOver.addImage(overImg);
 gameOver.scale = 0.5;
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  cycle[index-1].x = x;
  cycle[index-1].y = y;
  
  if(index === cycle.index){
    camera.position.x = displayWidth/2;
    camera.position.y = cars[index-1].x
  }
  
  
  if(gameState === PLAY){
   
   mainCyclist.y = World.mouseY;
   distance = distance+Math.round(getFrameRate()/50);
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  gameOver.visible = false;
  path.velocityX = -5;
  if(path.x < 0 ){
    path.x = width/2;
  }
    
    var rand = Math.round(random(1,3))
    if(frameCount % 150 === 0){
      obstacles();
      switch(rand){
        case 1: pinkCyclist();
        break;
        case 2: redCyclist();
        break;
        case 3: yellowCyclist();
        break;
        default:break;
      }
    }
if(redCG.isTouching(mainCyclist)|| pinkCG.isTouching(mainCyclist)    ||yellowCG.isTouching(mainCyclist)||obstaclesG.isTouching(mainCyclist)){
      gameState = END;
      mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
    }
    
    
 } else 
   if(gameState === END){
     
      
     if(redCG.isTouching(mainCyclist)){
      player2.addAnimation("player2cycle",redFallImg);
      player2.setLifetime = -1;
   }
      if(pinkCG.isTouching(mainCyclist)){
     player1.addAnimation("player1cycle",pinkFallImg);
     player1.setLifetime = -1;
    }  
     if(yellowCG.isTouching(mainCyclist)){
      player3.addAnimation("player3cycle",yellowFallImg);
      player3.setLifetime = -1;
    }
     
     
     mainCyclist.velocityX = 0;
     pinkCG.setVelocityEach(0,0);
     redCG.setVelocityEach(0,0);
     yellowCG.setVelocityEach(0,0);
     obstacle.velocityX = 0;
     path.velocityX = 0;
     gameOver.visible = true;
     text("Press Up Arrow To Restart",150,230);
     
     if(keyDown("UP_ARROW")){
       reset();
     }
     
   }
   if(gameState === WON){
     mainCyclist.destroy();
     path.setVelocityEach(0,0);
     path.destroy();
     pinkCG.destroyEach();
     redCG.destroyEach();
     yellowCG.destroyEach();
     pinkCG.setVelocityEach(0,0);
     redCG.setVelocityEach(0,0);
     yellowCG.setVelocityEach(0,0);
    textSize(10);
    text("You Won The Game",250,150);
   }
}
function pinkCyclist(){
  if(frameCount%150 === 0){
  player1 = createSprite(1100,Math.round(random(50,250)),10,10);
  player1.addAnimation("player1cycle",pinkOppoImg);
  player1.scale = 0.06;
  player1.velocityX = -(6+distance/100);
  player1.setLifetime = 170;
  pinkCG.add(player1);
  }
}
function redCyclist(){
  if(frameCount%150 === 0){
  player2 = createSprite(1100,Math.round(random(50,250)),10,10);
  player2.addAnimation("player2cycle",redOppoImg);
  player2.scale = 0.06;
  player2.velocityX = -(6+distance/100);
  player2.setLifetime = 170;
  redCG.add(player2);
  }
}
function yellowCyclist(){
  if(frameCount%150 === 0){
  player3 = createSprite(1100,Math.round(random(50,250)),10,10);
  player3.addAnimation("player3cycle",yellowOppoImg);
  player3.scale = 0.06;
  player3.velocityX = -(6+distance/100);
  player3.setLifetime = 170;
  yellowCG.add(player3);
  }
}
function obstacles(){
  if(frameCount % 150 === 0){
  obstacle = createSprite(600,Math.round(random(50,250)),10,10);
  obstacle.velocityX = -(6+distance/100);
  var rand1 = Math.round(random(1,3));
  switch(rand1){
    case 1: obstacle.addImage(obsImg1);
    break;
    case 2: obstacle.addImage(obsImg2);
    break;
    case 3: obstacle.addImage(obsImg3);
    break;
    default:break;
  }
    obstacle.scale = 0.06;
    obstaclesG.add(obstacle);
   }
}
function reset(){
  gameState = PLAY;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  gameOver.visible = false;
  obstaclesG.destroyEach();
  yellowCG.destroyEach();
  pinkCG.destroyEach();
  redCG.destroyEach();
  distance = 0;
}