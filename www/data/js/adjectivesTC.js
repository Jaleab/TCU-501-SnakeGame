var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        //You can register other plugin specific events here and handle them.
    },

    onDeviceReady: function() {
        navigator.splashscreen.hide();
    } 
};

// Change snake's speed using minus and plus buttons
var input = document.getElementById('input');

var minusButton = document.getElementById('minus');
minusButton.addEventListener("mouseup", function() {
    if(snakeSpeed[0] < 150){
        var count = parseInt(input.value) - 1;
        count = count < -5 ? -5:count;
        input.value = count;
        snakeSpeed[0] = snakeSpeed[0] > 150 ? 150: snakeSpeed[0]+10;
        clearInterval(game);
        game = setInterval(draw, snakeSpeed[0]);
    }
});

let plusButton = document.getElementById('plus');
plusButton.addEventListener("mouseup", function() {
    if(snakeSpeed[0] > 50){
        var count = parseInt(input.value) + 1;
        count = count > 5 ? 5:count;
        input.value = count;
        snakeSpeed[0] = snakeSpeed[0] < 50 ? 50: snakeSpeed[0]-10;
        clearInterval(game);
        game = setInterval(draw, snakeSpeed[0]);
    }
});


app.initialize();

// load images
const spriteSheet = new Image();
spriteSheet.src = "img/sprite5.png";
var sprites = [];
loadSprite();

winner = new Image();
winner.src = "img/"+"winner"+".png";
let path = "img/Connecting Electronically/Tablet or computer/Adjectives/"; 
let path2 = "audio/Connecting Electronically/Tablet or computer/Adjectives/"; 
var vocabulary = [3];
let wordsArray = ["Expensive", "Cheap", "Good", "Bad", "New", "Old fashioned"];
let imgArray = [];
let speechArray = [];

for(let i=1; i <= wordsArray.length; ++i) {
    imgArray[i-1] = new Image();
    speechArray[i-1] = new Audio();
    imgArray[i-1].src = path+wordsArray[i-1]+".png";
    speechArray[i-1].src = path2+wordsArray[i-1]+".mp3";
} 
vocabulary[0] = wordsArray;
vocabulary[1] = imgArray;
vocabulary[2] = speechArray; 

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

window.screen.orientation.lock("portrait-primary");

// create the unit
const box = 32;

const ground = new Image();
ground.src = "img/ground.png";


// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// Shuffle vocabulary

function shuffle() {
    let currentIndex = this.vocabulary[0].length, temporaryValue, randomIndex;
    // Shuffle every element
    while (0 !== currentIndex) {
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.

        // Words
        temporaryValue = this.vocabulary[0][currentIndex];
        this.vocabulary[0][currentIndex] = this.vocabulary[0][randomIndex];
        this.vocabulary[0][randomIndex] = temporaryValue;
        // Pictures
        temporaryValue = this.vocabulary[1][currentIndex];
        this.vocabulary[1][currentIndex] = this.vocabulary[1][randomIndex];
        this.vocabulary[1][randomIndex] = temporaryValue;
        // Audio
        temporaryValue = this.vocabulary[2][currentIndex];
        this.vocabulary[2][currentIndex] = this.vocabulary[2][randomIndex];
        this.vocabulary[2][randomIndex] = temporaryValue; 
    } 
}
shuffle();


// create the snake
var snake = [];
this.snake[0] = {
    x : 9 * box,
    y : 10 * box
};
this.snake[1] = {
    x : 10 * box,
    y : 10 * box
};
this.snake[2] = {
    x : 11 * box,
    y : 10 * box
}; 


let snakeSpeed = [];
snakeSpeed[0] = 100;

// create the food
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create the score var
let score = 0;

//control the snake through buttons
let d = "LEFT";
let trigger = "";

let upButton = document.getElementById('upKey');
upButton.addEventListener("mouseup", function() {
    if(d != "DOWN"){
        up.play();
        d = "UP";
    }    
});
let leftButton = document.getElementById('leftKey');
leftButton.addEventListener("mouseup", function() {
    if(d != "RIGHT"){
        left.play();
        d = "LEFT";
    }
});
let rightButton = document.getElementById('rightKey');
rightButton.addEventListener("mouseup", function() {
    if(d != "LEFT"){
        right.play();
        d = "RIGHT";
    }
});
let downButton = document.getElementById('downKey');
downButton.addEventListener("mouseup", function() {
    if(d != "UP"){
        down.play();
        d = "DOWN";
    }
});

// Arrows keys
document.addEventListener("keydown",direction);
function direction(event){
    let key = event.keyCode;
    if( (key == 37 || key == 65) && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if((key == 38 || key == 87) && d != "DOWN"){
        d = "UP";
        up.play();
    }else if((key == 39 || key == 68) && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if((key == 40 || key == 83) && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// Plus and minus keys
document.addEventListener("keydown",speedKey);
function speedKey(event){
    let key = event.keyCode;
    if( snakeSpeed[0] > 50 && key == 107){ // +
        var count = parseInt(input.value) + 1;
        count = count > 5 ? 5:count;
        input.value = count;
        snakeSpeed[0] = snakeSpeed[0] < 50 ? 50: snakeSpeed[0]-10;
        clearInterval(game);
        game = setInterval(draw, snakeSpeed[0]);
    }else if(snakeSpeed[0] < 150 && key == 109){ // -
        var count = parseInt(input.value) - 1;
        count = count < -5 ? -5:count;
        input.value = count;
        snakeSpeed[0] = snakeSpeed[0] > 150 ? 150: snakeSpeed[0]+10;
        clearInterval(game);
        game = setInterval(draw, snakeSpeed[0]);
    }
}

// check collision function
function collision(head,array){
    for(let i = 0; i < array.length; ++i){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// Mix food
function endMessage(){
    setTimeout(function(){window.location = "../Snake Game.html"},2500);  
    clearInterval(game);      
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText("Congratulations!",156,51.2); // box * 8 , 1.6*box
    ctx.fillStyle = "white";
    ctx.fillRect(75,225,450,195);
    ctx.strokeStyle = "black";
    ctx.strokeRect(75,225,450,195);
    ctx.drawImage(winner,75,250,200,150);
    ctx.fillStyle = "black";
    ctx.font = "75px Changa one";
    ctx.fillText("Winner!",275,350);     
}

function validPosition(x,y){
    isValid = true;
    for(let i = 0; i < this.snake.length ; ++i){
        if(this.snake[i].x == x && this.snake[i].y == y) isValid = false;
    }
    return isValid;
}

// draw everything to the canvas
function draw(){
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.drawImage(ground,0,0);
    
    if(score < vocabulary[1].length){
        ctx.drawImage(vocabulary[1][score], food.x, food.y,box,box);
        ctx.drawImage(vocabulary[1][score],170,5,62,62);
        ctx.strokeRect(food.x, food.y,box,box); 
    }
    
    // old head position
    let snakeX = this.snake[0].x;
    let snakeY = this.snake[0].y;
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // Start
    if(d == "NOTHING"){
        ctx.drawImage(sprites[3][0], sprites[3][1], sprites[3][2], sprites[3][3], sprites[3][4], this.snake[0].x,this.snake[0].y,box,box);
    }
    // Head 
    if(d == "DOWN"){
        ctx.drawImage(sprites[0][0], sprites[0][1], sprites[0][2], sprites[0][3], sprites[0][4], this.snake[0].x,this.snake[0].y,box,box);
    }
    else if(d == "LEFT"){
        ctx.drawImage(sprites[3][0], sprites[3][1], sprites[3][2], sprites[3][3], sprites[3][4], this.snake[0].x,this.snake[0].y,box,box);
    }
    else if(d == "UP"){
        ctx.drawImage(sprites[6][0], sprites[6][1], sprites[6][2], sprites[6][3], sprites[6][4], this.snake[0].x,this.snake[0].y,box,box);
    }
    else if(d == "RIGHT"){  
        ctx.drawImage(sprites[9][0], sprites[9][1], sprites[9][2], sprites[9][3], sprites[9][4], this.snake[0].x,this.snake[0].y,box,box);
    }
    // Body 
    for( let i = 1; i < this.snake.length ; ++i){
        previousPart = snake[i-1];
        currentPart = snake[i];
        if(i != this.snake.length-1){
            nextPart = snake[i+1];
            if(nextPart.y == 96 && currentPart.y == 96 && previousPart.y == 544){
                if(nextPart.x == currentPart.x-box){
                    // Angle Top-Left
                    ctx.drawImage(sprites[5][0], sprites[5][1], sprites[5][2], sprites[5][3], sprites[5][4], this.snake[i].x,this.snake[i].y,box,box);
                }
                else if(nextPart.x == currentPart.x+box){
                    // Angle Top-Right
                    ctx.drawImage(sprites[4][0], sprites[4][1], sprites[4][2], sprites[4][3], sprites[4][4], this.snake[i].x,this.snake[i].y,box,box);
                }
            }
            else if(previousPart.y == 96 && currentPart.y == 96 && nextPart.y == 544){
                if(previousPart.x == currentPart.x-box){
                    // Angle Top-Left
                    ctx.drawImage(sprites[5][0], sprites[5][1], sprites[5][2], sprites[5][3], sprites[5][4], this.snake[i].x,this.snake[i].y,box,box);
                }
                else if(previousPart.x == currentPart.x+box){
                    // Angle Top-Right
                    ctx.drawImage(sprites[4][0], sprites[4][1], sprites[4][2], sprites[4][3], sprites[4][4], this.snake[i].x,this.snake[i].y,box,box);
                }
            }
            else if(nextPart.y == 544 && currentPart.y == 544 && previousPart.y == 96){
                if(nextPart.x == currentPart.x-box){
                    // Angle Down-Left
                    ctx.drawImage(sprites[2][0], sprites[2][1], sprites[2][2], sprites[2][3], sprites[2][4], this.snake[i].x,this.snake[i].y,box,box);
                }
                else if(nextPart.x == currentPart.x+box){
                    // Angle Down-Right
                    ctx.drawImage(sprites[1][0], sprites[1][1], sprites[1][2], sprites[1][3], sprites[1][4], this.snake[i].x,this.snake[i].y,box,box);
                }
            }
            else if(previousPart.y == 544 && currentPart.y == 544 && nextPart.y == 96){
                if(previousPart.x == currentPart.x-box){
                    // Angle Down-Left
                    ctx.drawImage(sprites[2][0], sprites[2][1], sprites[2][2], sprites[2][3], sprites[2][4], this.snake[i].x,this.snake[i].y,box,box);
                }
                else if(previousPart.x == currentPart.x+box){
                    // Angle Down-Right
                    ctx.drawImage(sprites[1][0], sprites[1][1], sprites[1][2], sprites[1][3], sprites[1][4], this.snake[i].x,this.snake[i].y,box,box);
                }
            }
            else if(nextPart.x == 544 && currentPart.x == 544 && previousPart.x == 32){
                if(nextPart.y == currentPart.y-box){
                    // Angle Top-Right
                    ctx.drawImage(sprites[4][0], sprites[4][1], sprites[4][2], sprites[4][3], sprites[4][4], this.snake[i].x,this.snake[i].y,box,box);
                }
                else if(nextPart.y == currentPart.y+box){
                    // Angle Down-Right
                    ctx.drawImage(sprites[1][0], sprites[1][1], sprites[1][2], sprites[1][3], sprites[1][4], this.snake[i].x,this.snake[i].y,box,box);
                }
            }
            else if(previousPart.x == 544 && currentPart.x == 544 && nextPart.x == 32){
                if(previousPart.y == currentPart.y-box){
                    // Angle Top-Right
                    ctx.drawImage(sprites[4][0], sprites[4][1], sprites[4][2], sprites[4][3], sprites[4][4], this.snake[i].x,this.snake[i].y,box,box);
                }
                else if(previousPart.y == currentPart.y+box){
                    // Angle Down-Right
                    ctx.drawImage(sprites[1][0], sprites[1][1], sprites[1][2], sprites[1][3], sprites[1][4], this.snake[i].x,this.snake[i].y,box,box);
                }
            }
            else if(nextPart.x == 32 && currentPart.x == 32 && previousPart.x == 544){
                if(nextPart.y == currentPart.y+box){
                    // Angle Down-Left
                    ctx.drawImage(sprites[2][0], sprites[2][1], sprites[2][2], sprites[2][3], sprites[2][4], this.snake[i].x,this.snake[i].y,box,box);
                }
                else if(nextPart.y == currentPart.y-box){
                    // Angle Top-Left
                    ctx.drawImage(sprites[5][0], sprites[5][1], sprites[5][2], sprites[5][3], sprites[5][4], this.snake[i].x,this.snake[i].y,box,box);
                }
            }
            else if(previousPart.x == 32 && currentPart.x == 32 && nextPart.x == 544){
                if(previousPart.y == currentPart.y+box){
                    // Angle Down-Left
                    ctx.drawImage(sprites[2][0], sprites[2][1], sprites[2][2], sprites[2][3], sprites[2][4], this.snake[i].x,this.snake[i].y,box,box);
                }
                else if(previousPart.y == currentPart.y-box){
                    // Angle Top-Left
                    ctx.drawImage(sprites[5][0], sprites[5][1], sprites[5][2], sprites[5][3], sprites[5][4], this.snake[i].x,this.snake[i].y,box,box);
                }
            } else if(previousPart.y > currentPart.y && nextPart.x < currentPart.x || nextPart.y > currentPart.y && previousPart.x < currentPart.x){
                // Angle Down-Left
                ctx.drawImage(sprites[2][0], sprites[2][1], sprites[2][2], sprites[2][3], sprites[2][4], this.snake[i].x,this.snake[i].y,box,box);
            }
            else if(previousPart.y > currentPart.y && nextPart.x > currentPart.x || nextPart.y > currentPart.y && previousPart.x > currentPart.x){
                // Angle Down-Right
                ctx.drawImage(sprites[1][0], sprites[1][1], sprites[1][2], sprites[1][3], sprites[1][4], this.snake[i].x,this.snake[i].y,box,box);
            }  
            else if(previousPart.y < currentPart.y && nextPart.x < currentPart.x || nextPart.y < currentPart.y && previousPart.x < currentPart.x){
                // Angle Top-Left
                ctx.drawImage(sprites[5][0], sprites[5][1], sprites[5][2], sprites[5][3], sprites[5][4], this.snake[i].x,this.snake[i].y,box,box);
            }
            else if(previousPart.x > currentPart.x && nextPart.y < currentPart.y || nextPart.x > currentPart.x && previousPart.y < currentPart.y){
                // Angle Top-Right
                ctx.drawImage(sprites[4][0], sprites[4][1], sprites[4][2], sprites[4][3], sprites[4][4], this.snake[i].x,this.snake[i].y,box,box);
            }
            else if(previousPart.y == currentPart.y){
                // Horizontal 
                ctx.drawImage(sprites[7][0], sprites[7][1], sprites[7][2], sprites[7][3], sprites[7][4], this.snake[i].x,this.snake[i].y,box,box);
            }
            else if(previousPart.x == currentPart.x){
                // Vertical
                ctx.drawImage(sprites[8][0], sprites[8][1], sprites[8][2], sprites[8][3], sprites[8][4], this.snake[i].x,this.snake[i].y,box,box);
            }
        } 
        // Tail
        else if(i == this.snake.length-1){
            prevX = previousPart.x;
            curX = currentPart.x;
            prevY =  previousPart.y;
            curY = currentPart.y;
            if(previousPart.x == 32 && currentPart.x == 544){
                curX = 0;
            }
            else if(previousPart.x == 544 && currentPart.x == 32){
                prevX = 0;
            }
            if(previousPart.y == 96 && currentPart.y == 544){
                curY = 0;
            }
            else if(previousPart.x == 544 && currentPart.x == 96){
                prevY = 0;
            }
            if(prevX > curX){
                ctx.drawImage(sprites[10][0], sprites[10][1], sprites[10][2], sprites[7][3], sprites[10][4], this.snake[i].x,this.snake[i].y,box,box);
            }
            else if(prevX < curX){
                ctx.drawImage(sprites[11][0], sprites[11][1], sprites[11][2], sprites[11][3], sprites[11][4], this.snake[i].x,this.snake[i].y,box,box);
            }
            else if(prevY < curY){
                ctx.drawImage(sprites[12][0], sprites[12][1], sprites[12][2], sprites[12][3], sprites[12][4], this.snake[i].x,this.snake[i].y,box,box);
            }
            else if(prevY > curY){
                ctx.drawImage(sprites[13][0], sprites[13][1], sprites[13][2], sprites[13][3], sprites[13][4], this.snake[i].x,this.snake[i].y,box,box);
            }
        } 
    }

    // Snake movement
    if(snakeX < box) snakeX += 17 * box;
    if(snakeX > 17 * box) snakeX -= 17 * box;
    if(snakeY < 3 * box) snakeY += 15 * box;
    if(snakeY > 17 * box) snakeY -= 15 * box;
    
    if(score >= vocabulary[0].length){
       endMessage();
    }
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        ++score;
        eat.play();
        do{
            food = {
                x : Math.floor(Math.random()*17+1) * box,
                y : Math.floor(Math.random()*15+3) * box
            }
        }
        while(food.x == snakeX )
        vocabulary[2][score-1].play();
        // don't remove the tail
    }else{
        // remove the tail
        this.snake.pop();
    }
    
    // add new Head    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over  
    if(collision(newHead,this.snake)){
        clearInterval(game);
        dead.play();
        window.location = "adjectivesTC.html";
    }
    
    this.snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,64,51.2); // 2*box, 1.6 * box

    if(this.vocabulary[0][score] != null){
        ctx.fillStyle = "white";
        ctx.font = "45px Changa one";
        ctx.fillText(this.vocabulary[0][score],256,51.2); // box * 8 , 1.6*box
    }
}

// call draw function every 100 ms
var game = setInterval(draw, snakeSpeed[0]);

function loadSprite(){
    let index = 0; 
    for(let i = 0; i < 5; ++i){
        for(let j = 0; j < 3; ++j){             
            // Inputs -- change this based on your art
            var tw  = 40; // Texture Atlas Tile Width (pixels)
            var th  = 40; // Texture Atlas Tile Height (pixels)
            var tx  =  j; // tile index x (relative) (column)
            var ty  =  i; // tile index y (relative) (row)

            // Calculations -- common code to sub-image of texture atlas
            var div = document.getElementById('clip');
            var x   = (tx*tw); // tile offset x position (absolute)
            var y   = (ty*th); // tile offset y position (absolute)
            
            tempArray = [spriteSheet, x, y, 40, 40]; //, posX, posY, box, box];
            sprites.push(tempArray);
        }
    } 
}