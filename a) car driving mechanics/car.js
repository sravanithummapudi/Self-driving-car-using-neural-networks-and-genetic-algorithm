class Car{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=3;
        this.friction=0.05;
        this.angle=0;
// controls of car control.js
        this.controls=new Controls();
    }

    update(){
        this.#move();
    }

    #move(){
        // speed increase with accerlation
        if(this.controls.forward){
            this.speed+=this.acceleration;
        }
        // speed decrease
        if(this.controls.reverse){
            this.speed-=this.acceleration;
        }

        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        // in reverse it is half of maxspeed
        // - doesn't exist in speed it is just a reverse direction
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }

        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }
        // even if we don't press any key the car moves by small value so to stop that we use this
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }

        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            // to prevent car from moving diagonally faster
            if(this.controls.left){
                this.angle+=0.03*flip;
            }

            if(this.controls.right){
                this.angle-=0.03*flip;
            }
        }

        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }
   // setting the width height and make as the centre of rectangle 
    draw(ctx){
        //easy rotation using canvas
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);
        
        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();
    }
} 