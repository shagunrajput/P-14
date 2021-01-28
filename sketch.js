var sword, swordImage;

var PLAY=1;
var END=0;
var gameState=1;
var gameOverSound, swordSound;

var score=0;

var fruitGroup, fruit1Image, fruit2Image, fruit3Image, fruit4Image; 
var fruit;

var alien, alienAnim;

function preload(){
  
  //LOADING IMAGES INTO VARIABLES
  
  swordImage = loadImage("sword.png");
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
    
  alienAnim =loadAnimation("alien1.png","alien2.png");
  gameOverImg = loadImage("gameover.png");
  
  //LOADING SOUND INTO VARIABLES
  gameOverSound = loadSound("gameover.mp3");
  knifeSound= loadSound("knifeSwooshSound.mp3");

 
}

function setup(){
 createCanvas(600, 600);

  //CREATING SWORD SPRITE
  sword=createSprite (40,200,20,20);
  sword.addImage(swordImage);
  
  // CREATING FRUITGROUP AND ENEMYGROPU
  fruitGroup = new Group();
  enemyGroup = new Group();

  //SETTING COLLIDER FOR SWORD
  sword.setCollider("rectangle",0,0,90,sword.height);
  sword.debug=false;
  
    
  
}


function draw(){
    // CHANGING BACKGROUND OF GAME
    background("skyblue");
  
  // CALLING FRUITS FUNCTION
  fruits();
  
  // CALLING ENEMY FUNCTION
  enemy();

  
  if (gameState===1) {
      text("Score: "+ score, 500,50);
      sword.y=World.mouseY;
      sword.x=World.mouseX;
   
    
    // CONDITION FOR CHECKING FRUIT IS TOUCING SWORD AND INCREASE SCORE BY 10 AND 
        if(fruitGroup.isTouching(sword)){
          knifeSound.play();
          fruitGroup.destroyEach();
          score=score+10;
        }

// CONDITION FOR CHECKING ENEMY IS TOUCING SWORD AND GAME IS OVER     
    
        if(enemyGroup.isTouching(sword)){
           gameOverSound.play();
           gameState=END;
          
      
        }
  }   
  else if (gameState === END) {
      gameOver = createSprite(300,100);
      gameOver.addImage(gameOverImg);
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      gameOver.visible = true;
      sword.visible=false;
      fruitGroup.setVelocityXEach(0);
      enemyGroup.setVelocityXEach(0);

  }

  
  drawSprites();   
  }
  
function fruits(){
 if (frameCount % 80 === 0){
//CREATING FRUITE SPRITE AND SETTING ITS X VELOCITY
   var fruit = createSprite(400,200,20,20);
   fruit.velocityX = -7;

   
    // //GENERATING RANDOM FRUITS
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1Image);
              break;
      case 2: fruit.addImage(fruit2Image);
              break;
      case 3: fruit.addImage(fruit3Image);
              break;
      case 4: fruit.addImage(fruit4Image);
              break;
     default: break;
    }
   
    fruit.y=Math.round(random(50,340)); 
   fruit.scale = 0.25;
   fruit.lifetime = 100;
   
   //adding FRUIT to the group
   fruitGroup.add(fruit);
 }
}

function enemy(){
	if (frameCount%200===0) {
	alien=createSprite(400,200,20,20);
	alien.addAnimation("moving",alienAnim);
	alien.y=Math.round(random(100,300));
	alien.velocityX=-8;
	alien.setLifetime=50;
	enemyGroup.add(alien);
	}
}

