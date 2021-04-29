//Create variables here
var dog, happyDog, dogIMG, happyDogIMG, sadDog;
var database, foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;
var bedroom, garden, washroom
var readState


function preload()
{
  //load images here
  dogIMG=loadImage("images/dogImg.png")
  happyDogIMG=loadImage("images/dogImg1.png")
bedroom=loadImage("images/Bed Room.png")
garden=loadImage("images/Garden.png")
washroom=loadImage("images/Wash Room.png")
sadDog=loadImage("images/Vaccination")
}

function setup() {
  createCanvas(1000, 400);

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);



  

  dog=createSprite(800, 200, 150, 150);
  dog.scale = .5;
  dog.addImage(dogIMG);

  foodObj = new Food();

  feed=createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(46, 139, 87);

  readState=database.ref('gameState');

  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  })

  fill(255, 255, 254);
  textSize(15);
  if (lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350, 30);
  } else if(lastFed==0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : "+ lastFed + " AM", 350, 30);
  } 

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }
        
  drawSprites();
}


function feedDog(){
  dog.addImage(happyDogIMG);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    fedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
readState=database.ref('gameState')
readState.on("value",function(data){
   gameState=data.val();
})

function writeStock(x){

  if(x<=0){
    x=0;
  } else {
    x=x-1;
  }

  database.ref(' / ').update({
    Food:x
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}