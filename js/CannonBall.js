class CannonBall {
  constructor(x, y) {
    var options = {
      isStatic: true
    };
    this.r = 30;
    this.speed = 0.05;
    this.isSink = false;
    this.body = Bodies.circle(x, y, this.r, options);
    this.image = loadImage("./assets/cannonball.png");
    World.add(world, this.body);
    this.animation = [this.image];

    this.path = [];
  }


  display() 
  {
    var pos = this.body.position;
    var index = floor(this.speed % this.animation.length);
    push();
    imageMode(CENTER);
    image(this.animation[index], pos.x, pos.y, this.r, this.r);
    pop();

    if(this.body.velocity.x > 0){

      var ballPosition = [pos.x,pos.y];
      this.path.push(ballPosition);

      
    }

    for(var i = 0; i< this.path.length; i++){

      image(this.image,this.path[i][0],this.path[i][1],5,5);
    }
  }



  shoot(){

    Matter.Body.setStatic(this.body, false);
    var newCannonAngle = cannon.angle-25;
    var cannonAngle = newCannonAngle*(3.14/180);
    var velocity = p5.Vector.fromAngle(cannonAngle);
    velocity.mult(20);
    Matter.Body.setVelocity(this.body, {x:velocity.x, y: velocity.y});
  }
  remove(index){

    this.animation = water_splashAnimation;
    this.speed = 0.05;
    this.r = 60;
    Matter.Body.setVelocity(this.body,{x:0,y:0});
    this.isSink = true;

    
    setTimeout(() =>{
      Matter.World.remove(world,this.body);
      balls.splice(index,1);
      },1000); 
  }
  animate(){
    this.speed = this.speed+(0.05);
  }
}
