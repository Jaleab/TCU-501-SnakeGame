const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

window.screen.orientation.lock("portrait-primary");

// load image
const start = new Image();
start.src = "img/levels.png";

// show image on screen
function draw(){
    ctx.drawImage(start,0,0);
}

let game = setInterval(draw,100);