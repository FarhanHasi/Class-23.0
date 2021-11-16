class Cannon {
  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.cannonB = loadImage("assets/cannonBase.png");
    this.cannon = loadImage("assets/canon.png");
  }
  
  display(){

    this.rotateCannon();

    push();
    translate(this.x,this.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.cannon,0,0,this.width,this.height);
    pop();

    image(this.cannonB,70,30,200,200);
    noFill();
  }

  rotateCannon(){

    //console.log(this.angle);

    if(keyIsDown(LEFT_ARROW) && this.angle > -50){

      this.angle = this.angle-1;

    }

    if(keyIsDown(RIGHT_ARROW) && this.angle < 70){

      this.angle = this.angle + 1;
    }
  }
}

