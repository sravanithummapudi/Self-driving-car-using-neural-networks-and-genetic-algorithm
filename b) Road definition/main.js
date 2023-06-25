const canvas=document.getElementById("myCanvas");
canvas.width=200;

const ctx = canvas.getContext("2d");
// road is in the middle of canvas
// width*0.9 margin for canvas
const road=new Road(canvas.width/2,canvas.width*0.9);
// car is set in lane 1
const car=new Car(road.getLaneCenter(1),100,30,50);

animate();

function animate(){
    car.update();

    canvas.height=window.innerHeight;

    ctx.save();
    //  -car.y+canvas.height*0.7 car is not moving on top of road but in center
    ctx.translate(0,-car.y+canvas.height*0.7);
  // road comes first and car on the top
    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}