class Sensor{
    constructor(car){
        this.car=car;
        //sensor ray count set to 5
        this.rayCount=5;
        this.rayLength=150;
        // angle between the sensors is 45
        this.raySpread=Math.PI/2;

        this.rays=[];
        // telling if border is there or not
        this.readings=[];
    }

    update(roadBorders){
        this.#castRays();
        this.readings=[];
        for(let i=0;i<this.rays.length;i++){
            this.readings.push(
                // get readings from method getreading
                this.#getReading(this.rays[i],roadBorders)
            );
        }
    }

    #getReading(ray,roadBorders){
        let touches=[];

        for(let i=0;i<roadBorders.length;i++){
            const touch=getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            // if ray touches border it is added to touch array
            if(touch){
                touches.push(touch);
            }
        }
// no touches no readings
        if(touches.length==0){
            return null;
        }else{
            //modern js methods
            const offsets=touches.map(e=>e.offset);
            const minOffset=Math.min(...offsets);
            return touches.find(e=>e.offset==minOffset);
        }
    }

    #castRays(){
        this.rays=[];
        for(let i=0;i<this.rayCount;i++){
            const rayAngle=lerp(
                this.raySpread/2,
                -this.raySpread/2,
                // to get one ray atleast we use 0.5
                this.rayCount==1?0.5:i/(this.rayCount-1)
                //+this.car.angle; to move rays in car direction
            )+this.car.angle;
         // satrt and end point for rays
            const start={x:this.car.x, y:this.car.y};
            const end={
                x:this.car.x-
                    Math.sin(rayAngle)*this.rayLength,
                y:this.car.y-
                    Math.cos(rayAngle)*this.rayLength
            };
            this.rays.push([start,end]);
        }
    }
// draw rays
    draw(ctx){
        for(let i=0;i<this.rayCount;i++){
            // get readings of rays
            let end=this.rays[i][1];
            if(this.readings[i]){
                end=this.readings[i];
            }

            ctx.beginPath();
            // rays of width 
            ctx.lineWidth=2;
            // and colour for rays
            ctx.strokeStyle="yellow";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth=2;
            // whenever the rsys reaches border it turns to black bcoz of intersection method in util.js
            ctx.strokeStyle="black";
            ctx.moveTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();
        }
    }        
}