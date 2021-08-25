var balloon;
var BackgroundImg;
var balloon,balloonImg1,balloonImg2,balloonImg3;
var database;
var position;

function preload(){
  BackgroundImg = loadImage("images/Hot Air Ballon-01.png");
  balloonImg= loadAnimation("images/Hot Air Ballon-02.png", "images/Hot Air Ballon-03.png", "images/Hot Air Ballon-04.png");
 
}

function setup() {
  createCanvas(800,700);

  database= firebase.database();
  console.log(database);

 balloon= createSprite(250, 300, 50, 50);
 balloon.addAnimation("Hot Air Ballon-02.png",balloonImg); 
 balloon.scale=0.5;

 var balloonPosition = database.ref('balloon/position');
 balloonPosition.on("value",readPosition,showError)
}


function draw() {
  background(BackgroundImg);


 if(keyDown(LEFT_ARROW)){
  updatePosition(-10,0)
    balloon.x=balloon.x-10
   
  }
 
  if(keyDown(RIGHT_ARROW)){
    updatePosition(+10,0)
    balloon.x=balloon.x+10
   
  }
 
  if(keyDown(UP_ARROW)){
    updatePosition(0,-10)
    balloon.y=balloon.y-10
    balloon.scale=balloon.scale-0.01
  }
 
  if(keyDown(DOWN_ARROW)){
    updatePosition(0,+10)
    balloon.y=balloon.y+10
  
    balloon.scale=balloon.scale+0.01
  }

  drawSprites();
}

function updatePosition(x,y){
database.ref('balloon/position').set({
  'x': balloon.x + x,
  'y': balloon.y + y
})

}

function readPosition(data){
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
}

function showError(){
console.log("Error in writing to the database");
}