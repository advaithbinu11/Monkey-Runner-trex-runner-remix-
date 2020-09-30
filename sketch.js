var bananaimg,heartimg,heart1,heart2,heart3,player,player_running,playerLost,obstacleimg,obstacleGroup,bananaGroup,backgroundimg,jungle,InvisibleGround,count,score,powerUp,health,gameState,PLAY,END;
function preload(){
  bananaimg=loadImage("banana.png");
  backgroundimg=loadImage("jungle.jpg");
  obstacleimg=loadImage("stone.png");
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png", "Monkey_09.png","Monkey_10.png");
  heartimg=loadImage("Heart.png");
  playerLost=loadAnimation("Monkey_lose.png");
}
function setup() {
  createCanvas(400, 400);
  jungle=createSprite(200,200,800,400);
  jungle.addImage(backgroundimg);
  jungle.velocityX=-9;
  InvisibleGround=createSprite(200,390,400,10);
  InvisibleGround.visible=false;
  player=createSprite(80,330,100,100);
  player.addAnimation("run",player_running);
  player.addAnimation("lose",playerLost)
  player.scale=0.2;
  count=0;
  score=0;
  powerUp=0;
  obstacleGroup=createGroup();
  bananaGroup=createGroup();
  heart1=createSprite(250,50,25,25);
  heart2=createSprite(300,50,25,25);
  heart3=createSprite(350,50,25,25);
  heart1.addImage(heartimg);
  heart2.addImage(heartimg);
  heart3.addImage(heartimg);
  heart1.scale=0.1;
  heart2.scale=0.1;
  heart3.scale=0.1;
  health=3;
  PLAY=1
  END=0;
  gameState=PLAY;


}

function draw() {
  background(220);
  player.collide(InvisibleGround);
  if(gameState===PLAY){
    if(jungle.x<200){
      jungle.x=jungle.width/2
    }
    player.collide(InvisibleGround);
    if(keyDown('space')&&player.y>=325){
      player.velocityY=-18;
    }
    player.velocityY=player.velocityY+0.7;
    if(count%100===0){
      spawnObstacles();
  }
    if(count%80===0){
      spawnBananas();
    }
    if(player.isTouching(bananaGroup)){
      score=score+2
      powerUp=powerUp+2;
      bananaGroup.destroyEach();
    }
    if(player.isTouching(obstacleGroup)){
      score=score-4;
      powerUp=0;
      if(health===3){
        heart3.visible=false;
      }
      if(health===2){
        heart2.visible=false;
      }
      if(health===1){
        heart1.visible=false;
        gameState=END;
      }
      health=health-1;
      obstacleGroup.destroyEach();
      player.scale=0.2;
    }
      if(powerUp%10===0&&powerUp>0){
      if(health===3){
        heart3.visible=true;
      }
      if(health===2){
        heart2.visible=true;
      }
        health=health+1
    }
    if(score%10===0&&score>0){
      sizeIncreaser();
    }
    count=count+1
  }
  drawSprites();
  textSize(30);
  fill("red");
  text("Score:"+score,100,100);
if(gameState===END){
  jungle.velocityX=0;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  player.changeAnimation("lose",playerLost);
  textSize(20);
  fill("red");
  text("You lost! Press the space bar to reset.",5,200);
  if(keyDown('space')){
    gameState=PLAY;
    player.changeAnimation("run",player_running);
    jungle.velocityX=-9;
    heart1.visible=true;
    heart2.visible=true;
    heart3.visible=true;
    health=3;
    score=0;
  }
  }
}
function spawnObstacles(){
  var obstacle=createSprite(400,370,20,20);
  obstacle.addImage(obstacleimg);
  obstacle.scale=0.2;
  obstacle.velocityX=-5;
  obstacle.lifetime=81;
  obstacleGroup.add(obstacle);
}
function spawnBananas(){
  var banana=createSprite(400,random(250,360),20,20);
  banana.addImage(bananaimg);
  banana.scale=0.1;
  banana.velocityX=-5;
  banana.lifetime=81;
  bananaGroup.add(banana);
}
  function sizeIncreaser(){
    switch(score){
      case 10:player.scale=0.22;
        break
      case 20:player.scale=0.24;
        break
      case 30:player.scale=0.26;
        break
      case 40:player.scale=0.28;
        break
      case 50:player.scale=0.30;
        break
        default:break
  }
    }

