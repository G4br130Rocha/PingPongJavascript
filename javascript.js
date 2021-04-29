var canvas;
var canvasContext;
// frame
var framePerSecond = 1000/30;
// bol
var bolX = 400;
var bolY = 300;
var deltaBol = 0;
// speedBol
var speedBolX = 5;
var speedBolY = 5;
var x = 0;
var xy = 0;
var y = 0;
//Players
playerHeight = 55;
playerWidth = 5;
//Player 01
var player01Y = 272.5;
var player01X = 20;
//Player 02
var player02Y = 272.5;
var player02X = 780;
// Speed Player 02
var speedPlayer02y = 3;
var soundAfect = {
                ping:"Sound/sound01.mp3",
                gamerOver:"Sound/soundFinal.mp3"
            };
// Score players
var score1 = 0;
var score2 = 0;


//Funções
window.onload = function(){
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');
    drawSetInterval = setInterval(draw, framePerSecond);
}
// Sound
function Sound(sound){
    new Audio(sound).play();
}
//
document.addEventListener("keydown",(e)=>{
    player01YMoved(e.keyCode);
});
//
function resetBol(){
    bolX = canvas.width/2;
    bolY = canvas.height/2;
}
// Controller Player01
function player01YMoved(y){
    if(y === 38 && player01Y > 0){
        player01Y -=10;
    }
    if(y === 40 && player01Y < canvas.height - 55 ){
        player01Y +=10;
    }
}
//GamerOver
function gamerOver(){
    Sound(soundAfect.gamerOver);
    canvasContext.font = "70px serif";
    canvasContext.textAlign = "center"
    canvasContext.fillText("GAMER OVER", 400,300);
    clearInterval(drawSetInterval);
    canvas.addEventListener("mousedown",function(){ window.location.reload() });
}
//Draw
function draw(){
    //background black
    Rect(0,0,canvas.width,canvas.height,"black");
    // style white
    Rect(canvas.width/2,0,1,canvas.height,"white");
    // Score win
        if(score1 > 2){
            // gamerWin();
        }
        if(score2 > 2){
            gamerOver();
        }
        //Speed bol
        bolX += speedBolX;
        bolY += speedBolY;
        
        //Speed Player
        player02Y += speedPlayer02y;
        //Moved Speed Player02
        if(player02Y > canvas.height -55){
            speedPlayer02y = -3;
        }
        if(player02Y < 0){
            speedPlayer02y = 3;
        }
        //Moved Speed Bol    
        if(bolX > canvas.width-20){
            speedBolX = -5;
            score1 +=1;
            resetBol();
        }
        if(bolX< 0){
            speedBolX = 5;
            score2 +=1;
            resetBol();
        }
        if(bolY > canvas.height-20){
            speedBolY = -5;
        }
        if(bolY< 0){
            speedBolY = 5;
        }
        Colision();
    //Score1
    canvasContext.font = "10px serif";
    canvasContext.textAlign = "center";
    canvasContext.fillText("Score Player 01",100,30);
    canvasContext.fillText(score1,100,50);
    //Score2
    canvasContext.fillText("Score Player 02",canvas.width - 160,30);
    canvasContext.fillText(score2,canvas.width - 160,50);
    //player 01
    Rect(player01X,player01Y,playerWidth,playerHeight,"white");
    //player 02
    Rect(player02X,player02Y,playerWidth,playerHeight,"white");
    // bol
    canvasContext.fillStyle = "white";
    canvasContext.beginPath();
    canvasContext.arc(bolX,bolY,10,0,Math.PI*2,true);
    canvasContext.fill();
    
}
// Rect (Players and line center)
function Rect(x,y,width,height,color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x,y,width,height);
}
// Colision 
function Colision(){
    // Collision Player
    if(bolX >= player01X && bolX <= player01X+10){
        // console.log("BolY : "+bolY+"|  Player01Y: "+player01Y);
        if(bolY >= player01Y - 10 && bolY <= player01Y + 65){
            speedBolX = -1*(speedBolX);
            deltaBol = bolY - (player01Y+playerHeight/2);

            if(speedBolY < 0 && bolY > player01Y+(playerHeight/2)){
                console.log("SpeedBolY menor que 0");
                deltaBol = -1*(deltaBol);
                console.log("DELTA: "+deltaBol);
            }
            if(speedBolY > 0 && bolY < player01Y+(playerHeight/2)){
                console.log("SpeedBolY maior que 0");
                deltaBol = -1*(deltaBol);
                console.log("DELTA: "+deltaBol * 0.35);
            }

            speedBolY = deltaBol * 0.35;
            // console.log("Delta: "+ deltaBol * 0.35);
            Sound(soundAfect.ping);
        }
    }
    if(bolX >= player02X && bolX <= player02X){
        if(bolY >= player02Y - 10 && bolY <= player02Y + 65){
            // console.log("BolY : "+bolY+"|  Player02Y: "+player02Y);
            speedBolX = -1*(speedBolX);
            deltaBol = bolY - (player02Y+55/2);

            if(speedBolY < 0 && bolY > player02Y+(playerHeight/2)){
                console.log("SpeedBolY menor que 0");
                deltaBol = -1*(deltaBol);
                console.log("DELTA: "+deltaBol);
            }
            if(speedBolY > 0 && bolY < player02Y+(playerHeight/2)){
                console.log("SpeedBolY maior que 0");
                deltaBol = -1*(deltaBol);
                console.log("DELTA: "+deltaBol * 0.35);
            }

            speedBolY = deltaBol * 0.35;
            console.log("Delta: "+ deltaBol);
            Sound(soundAfect.ping);
        }
    }
}