const canvas=document.getElementById("myCanvas");

// to get a road of long height in the middle
canvas.width=200;
// draw a car in 2d
const ctx = canvas.getContext("2d");
const car=new Car(100,100,30,50);
//30 width,50 height
//animate the car
animate();

function animate(){
    car.update();
    // if this not added the car will stretch upwards and downwards
    canvas.height=window.innerHeight;
    car.draw(ctx);
    requestAnimationFrame(animate);
}