class Boat {

    constructor(x,y,w,h,boatPosition,boatAnimation){

        this.body = Bodies.rectangle(x,y,w,h);
        World.add(world,this.body);
        this.w = w;
        this.h = h;
        this.boatPosition = boatPosition;
        this.image = loadImage("assets/boat.png");
        this.boatAnimation = boatAnimation;
        this.speed = 0.05;

    }

    display(){

        var pos = this.body.position;
        var index = floor(this.speed % this.boatAnimation.length);

        push();
        translate(pos.x,pos.y);
        imageMode(CENTER);
        image(this.boatAnimation[index],0,this.boatPosition,this.w,this.h);
        pop();
    }    
     remove(i){

        this.boatAnimation = broken_boatAnimation;
        this.speed = 0.05;
        this.w = 250;
        this.h = 250;
        setTimeout(() =>{
        Matter.World.remove(world,this.body);
        boats.splice(i,1);
        },1000);
        

     }

     animateBoat(){

        this.speed = this.speed+(0.05);
     }

}