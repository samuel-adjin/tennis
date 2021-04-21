let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 4;

let paddle1Y = 250;
let paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

let player1Score = 0;
let player2Score = 0;
let NumberOfTries;
NumberOfTries = prompt("Enter number of tries");

// const WINNING_SCORE = 3;
let showingWinScreen = false;
// function handleMouseClick(evt){
//     if(showingWinScreen){
//         player1Score = 0;
//         player2Score = 0;
//         showingWinScreen = false;
//     }
// }
const progressBar = document.querySelector(".progress");
const progressBar2 = document.querySelector(".progress2");
function updateProgressBar(progressBar,value,score){
    progressBar.querySelector(".progress__fill").style.width = `${value}%`;
    progressBar.querySelector(".progress__text").textContent=`${score}`;
}

function updateProgressBar2(progressBar2,value,score){
  progressBar2.querySelector(".progress__fillp").style.width = `${value}%`;
  progressBar2.querySelector(".progress__textp").textContent=`${score}`;
}





window.onload = function () {
 
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  canvasContext.fillStyle = "white";
  canvasContext.fillRect(225, 210, 200, 200);
  let framesPerSecond = 30;
  setInterval(callBoth, 1000 / framesPerSecond);
  // canvas.addEventListener("mousedown",handleMouseClick)


  
  // my code
  const button = document.getElementById("btn");
  const button2 = document.querySelector(".btn1");
 
  // button.addEventListener("click", function(){
  //     NumberOfTries = prompt("Enter number of tries");
  //     button.disabled = true;
  //     button2.disabled = false;
  // })

  button.addEventListener("click", function(){
     location.reload(true);
     
  })

  canvas.addEventListener("mousemove", function (evt) {
    let mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
  });
};

function computerMovement(){
    let paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if(paddle2YCenter < ballY - 35){
        paddle2Y = paddle2Y + 6
    }else if (paddle2YCenter > ballY + 35){
        paddle2Y = paddle2Y - 6
    }
}

function moveEverything() {
 if(showingWinScreen){
     return;
 }
computerMovement();

  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;
  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;

      let deltaY = ballY - (paddle1Y +PADDLE_HEIGHT/2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player2Score += 1;
      ballReset();
      var value= Math.round(((player2Score )/NumberOfTries) * 100);
        
      // let value = ((player2Score/NumberOfTries)*100);
      // // value = Math.round(value);
      updateProgressBar2(progressBar2,value,player2Score );
     
     
    }
  }

  if (ballX > canvas.width) {
    // ballSpeedX = -ballSpeedX;
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      let deltaY = ballY - (paddle2Y +PADDLE_HEIGHT/2);
      ballSpeedY = deltaY * 0.35;
      
    } else {
        player1Score += 1;
        ballReset();
        var value= Math.round(((player1Score )/NumberOfTries) * 100);
        
        // let value = ((player2Score/NumberOfTries)*100);
        // // value = Math.round(value);
        updateProgressBar(progressBar,value,player1Score );
    
    }
  }

  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}
function callBoth() {
  moveEverything();
  drawEverything();
}

function drawNet(){
    for(let i = 0; i< canvas.height; i+=40){
        colorRect(canvas.width/2-1,i,2,20,"white"); 
    }
}

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, "black");
  if(showingWinScreen){
    canvasContext.fillStyle = "white";
      if(player1Score >= NumberOfTries){
          canvasContext.fillText("Left Player won!", 200,150)
      }
      else if (player2Score >= NumberOfTries){
        canvasContext.fillText("Right Player won!", 200,150);
      }
    //   canvasContext.fillStyle = "white";
      // canvasContext.fillText("click to continue",200,250);
    return;
}

        drawNet();
  // left player paddle
  colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
  // colorRect(ballX,100,10,10,"red");
  colorCircle(ballX, ballY, 10, "white");
  // right computer paddle
  colorRect(
    canvas.width - PADDLE_THICKNESS,
    paddle2Y,
    PADDLE_THICKNESS,
    PADDLE_HEIGHT,
    "white"
  );

  canvasContext.fillText(player1Score,100,100);
  canvasContext.fillText(player2Score,canvas.width-100,100);
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function colorCircle(centerX, centerY, raduis, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, raduis, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function calculateMousePos(evt) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = evt.clientX - rect.left - root.scrollLeft;
  let mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY,
  };
}
function ballReset() {
    if(player1Score>=NumberOfTries || player2Score >= NumberOfTries){
        showingWinScreen = true;
    }

  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}
