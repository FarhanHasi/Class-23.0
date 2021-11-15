const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var boatImage,boatjson,brokenImage,brokenjson;

var canvas, angle, tower, ground, cannon, ball,boat;
var waterSplash, waterSplashjson;

var balls = [];

var boats = [];

var boatAnimation = [];

var broken_boatAnimation = [];

var water_splashAnimation = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatImage = loadImage("/assets/boat/boat.png");
  boatjson = loadJSON("/assets/boat/boat.json");
  brokenImage = loadImage("/assets/boat/broken_boat.png");
  brokenjson = loadJSON("/assets/boat/broken_boat.json");
  waterSplash = loadImage("/assets/water_splash/water_splash.png");
  waterSplashjson = loadJSON("/assets/water_splash/water_splash.json");
}

function setup() {

  angleMode(DEGREES);
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 2, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  angle = 20;
  cannon = new Cannon(180,120,130,100,angle);
  
  var boatFrames = boatjson.frames;
  
  for(var i = 0; i < boatFrames.length; i++){

    var pos = boatFrames[i].position;
    var img = boatImage.get(pos.x,pos.y,pos.w,pos.h);
    boatAnimation.push(img);

  }

  var brokenFrames = brokenjson.frames;
  
  for(var i = 0; i < brokenFrames.length; i++){

    var pos = brokenFrames[i].position;
    var img = brokenImage.get(pos.x,pos.y,pos.w,pos.h);
    broken_boatAnimation.push(img);

  }

  var waterSplashFrames = waterSplashjson.frames;
  
  for(var i = 0; i < waterSplashFrames.length; i++){

    var pos = waterSplashFrames[i].position;
    var img = waterSplash.get(pos.x,pos.y,pos.w,pos.h);
    water_splashAnimation.push(img);

  }
}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);

  text(mouseX+','+mouseY,mouseX, mouseY);

  
 rect(ground.position.x, ground.position.y, width * 2, 1);
  

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();

  for(var i = 0; i < balls.length; i++){

    showCannonBall(balls[i],i);
    collisionWidthBoat(i);
  }
  cannon.display();

  showBoats();
  

}

function showCannonBall(ball,i){
  if(ball){
    
    ball.display();
    ball.animate();
  }
  


}

function keyPressed(){

  if(keyCode === DOWN_ARROW){

    ball = new CannonBall(cannon.x,cannon.y);
    
    balls.push(ball)
    //ball.shoot();
  }
  
}

function keyReleased(){

  if(keyCode === DOWN_ARROW){
    balls[balls.length-1].shoot();
  }
}

function showBoats(){

   if(boats.length > 0){

    if(frameCount % 300 === 0 && boats.length < 4){

      var pos = [-80,-60,-50,-70];
      var boatPosition = random(pos);
      boat = new Boat(width-100,height-50,150,150,boatPosition,boatAnimation);
      boats.push(boat);
      
    }
    console.log(boats.length);

    for(var i = 0; i < boats.length; i++){ 

      var item = boats[i];
      console.log(item);
      if(item){

        Matter.Body.setVelocity(item.body, {x:-1, y:0 });
        item.animateBoat();
      item.display();
      }
      

    }
   } else{
    boat = new Boat(width-100,height-50,150,150,-80,boatAnimation);
    boats.push(boat);
   }

}

function collisionWidthBoat(index){

    for(var i = 0; i < boats.length; i++){

      if(balls[index]!== undefined && boats[i]!== undefined ){
         var collision = Matter.SAT.collides(balls[index].body, boats[i].body);
         if(collision.collided){
        boats[i].remove(i);

        balls[index].remove(index);
        
        }
      }
    }

}