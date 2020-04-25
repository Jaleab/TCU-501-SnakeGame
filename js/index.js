const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

window.screen.orientation.lock("portrait-primary");

// load image
const start = new Image();
start.src = "data/img/start.png";

// click function
window.onload=function(){
    var startButton = document.getElementById('startButton');
    startButton.addEventListener("click", function() {
        window.location = "data/topics.html";    
    });
}

// show image on screen
function draw(){
    ctx.drawImage(start,0,0);
}

let game = setInterval(draw,100);