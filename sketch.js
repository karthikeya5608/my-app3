var player,playeridle,playerrun,playerjump,playerhealth=10,playerdeath;
var playerattack1,playerattack2,playerattack3,pleyerattackArea;
var imagestate2="left",deathstate="true",gamestate="start";
var attackstate="attack1";
var enemy,enemyimage,enemyhealth=10;
var retry,ground,bg;

function preload(){
    bg=loadImage("forestDay.png")
    playeridle=loadAnimation("movement/adventurer-idle-00.png","movement/adventurer-idle-01.png",
    "movement/adventurer-idle-02.png","movement/adventurer-idle-03.png");
    playerrun=loadAnimation("movement/adventurer-run-00.png","movement/adventurer-run-01.png","movement/adventurer-run-02.png","movement/adventurer-run-03.png","movement/adventurer-run-04.png","movement/adventurer-run-05.png")
    playerjump=loadAnimation("movement/adventurer-jump-00.png","movement/adventurer-jump-01.png","movement/adventurer-jump-02.png","movement/adventurer-jump-03.png","movement/adventurer-fall-00.png","movement/adventurer-fall-01.png")
    playerdeath=loadAnimation("movement/adventurer-die-00.png","movement/adventurer-die-01.png","movement/adventurer-die-02.png","movement/adventurer-die-03.png","movement/adventurer-die-04.png","movement/adventurer-die-05.png","movement/adventurer-die-06.png");
    playerhurt=loadAnimation("movement/adventurer-hurt-00.png")
    playerattack1=loadAnimation("movement/adventurer-attack1-00.png","movement/adventurer-attack1-01.png","movement/adventurer-attack1-02.png","movement/adventurer-attack1-03.png","movement/adventurer-attack1-04.png");
    playerattack2=loadAnimation("movement/adventurer-attack2-00.png","movement/adventurer-attack2-01.png","movement/adventurer-attack2-02.png","movement/adventurer-attack2-03.png","movement/adventurer-attack2-04.png","movement/adventurer-attack2-05.png");
    playerattack3=loadAnimation("movement/adventurer-attack3-00.png","movement/adventurer-attack3-01.png","movement/adventurer-attack3-02.png","movement/adventurer-attack3-03.png","movement/adventurer-attack3-04.png","movement/adventurer-attack3-05.png");
    // enemyimage =loadImage("druid/ezgif.com-gif-maker.gif");
  // enemy = createImg("druid/ezgif.com-gif-maker.gif");
}

function setup(){
    createCanvas(windowWidth,windowHeight-5);
    ground=createSprite(337.5,615,1080,20);
    ground.visible=true;
   //ground.setCollider("rectangle",0,0,895,20);
    player=createSprite(700,200,10,10);
    player.setCollider("rectangle",0,0,15,35);
    player.addAnimation("idle",playeridle);
    player.scale=2.35;
   // player.velocityY=4;
   enemy=createSprite(700,337,50,50);

   playerattackArea=createSprite(10,10,50,60)
   playerattackArea.visible=false;
}

function draw(){
    background(bg);

    
    if(gamestate==="start"){


   /*camera.position.x=player.x+200;
   camera.position.y=player.y-200;
   camera.position.z=-200;*/
   camera.position.x = player.x+200;
   camera.position.y = player.y;

   playerattackArea.y=player.y;

   if(imagestate2==="right"){
    playerattackArea.x=player.x-40;
   }
   else if(imagestate2==="left"){
    playerattackArea.x=player.x+40;
   }

   if(player.x>enemy.x){
     enemy.velocityX=2;
   }
   else if(player.x<enemy.x){
     enemy.velocityX=-2;
   }
   /*if(enemy.isTouching(player)){
     enemy.x=enemy.x+50;
     if(playerhealth!==0){
     playerhealth=playerhealth-1; 
   }
   }
   if(playerhealth===0&&deathstate==="true"){
     deathstate="false";
     player.addAnimation("idle",playerdeath);
   }*/
   
   if(player.y>enemy.y){
    enemy.velocityY=1.1;
  }
  else if(player.y<enemy.y){
    enemy.velocityY=-1.1;
  }

   playerright();
   playerleft();
   playerattack();
   
   player.debug=true;
   playerattackArea.debug=true;

   drawSprites();
   fill("white")
   text("HEALTH="+playerhealth,player.x-20,player.y-50)
   text("health="+enemyhealth,enemy.x-25,enemy.y-30)

  }
}


function playerright() {
  /*  if (keyDown(RIGHT_ARROW)) 
    {
     player.x=player.x+4;
    } */
 
    if (keyWentDown(RIGHT_ARROW)&&imagestate2==="right") 
    {
     player.mirrorX(player.mirrorX() * -1);
        imagestate2="left";
    }
     if(keyWentDown(RIGHT_ARROW))
    {
        player.velocityX=4;
     player.addAnimation("idle",playerrun);
    }
     if(keyWentUp(RIGHT_ARROW))
    {
        player.velocityX=0;
     player.addAnimation("idle",playeridle)
  /*   if(keyDown(LEFT_ARROW)){
         player.addAnimation("idle",playerrun);
        }*/
    }
    
    if(keyWentUp(RIGHT_ARROW)&&keyDown(LEFT_ARROW))
    {
        player.velocityX=-4;
      player.addAnimation("idle",playerrun);
      if(imagestate2==="left"){
      player.mirrorX(player.mirrorX() * -1);
      imagestate2="right";
      }
    }

}

function playerleft() {
 /*   if (keyDown(LEFT_ARROW)) 
    {
       player.x=player.x-4;
    }*/
 
    if (keyWentDown(LEFT_ARROW)&&imagestate2==="left") 
    {
            player.mirrorX(player.mirrorX() * -1);
            imagestate2="right";
     }
      if(keyWentDown(LEFT_ARROW)){
        player.velocityX=-4;
      player.addAnimation("idle",playerrun);
     }
      if (keyWentUp(LEFT_ARROW)) {
         player.velocityX=0;
           player.addAnimation("idle",playeridle);
 /*     if(keyDown(RIGHT_ARROW))
    {
     player.addAnimation("idle",playerrun);
    }*/
     }
     
    if(keyWentUp(LEFT_ARROW)&&keyDown(RIGHT_ARROW))
    {
        player.velocityX=4;
      player.addAnimation("idle",playerrun);
      if(imagestate2==="right"){
      player.mirrorX(player.mirrorX() * -1);
      imagestate2="left";
      }
    }
}

function playerattack(){

  if(keyDown(UP_ARROW)&&player.isTouching(ground))
  {
      player.velocityY=-10;
  }
  else
  {
   player.collide(ground);
   player.velocityY=player.velocityY+0.8;
  }

  if(keyWentDown("c")){
    player.addAnimation("idle",playerattack1);
  }
  if(keyWentUp("c")){
    player.addAnimation("idle",playeridle)
  }
  if(keyDown("c")){
    if(keyDown(LEFT_ARROW)||keyDown(RIGHT_ARROW)){
      
    }
  }

   /* if(&&attackstate==="attack2"){
      player.addAnimation("idle",playeridle)
      attackstate="attack1"
    }*/

  if(keyDown("c")&&enemy.isTouching(playerattackArea)&&attackstate==="attack1"){
    if(frameCount%30===0){
    enemyhealth=enemyhealth-1;
  }
 }
}
