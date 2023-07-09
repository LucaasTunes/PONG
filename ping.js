const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "forestgreen";
const paddle1Color = "lightblue";
const paddle2Color = "red";
const paddleBorder = "black";
const ballColor = "yellow";
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleSpeed = 5;
let intervalID;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = Math.random() < 0.5 ? -1 : 1;
let ballYDirection = Math.random() < 0.5 ? -1 : 1;
let player1Score = 0;
let player2Score = 0;

let paddle1 = {
  width: 25,
  height: 100,
  x: 0,
  y: gameHeight / 2 - 50,
};
let paddle2 = {
  width: 25,
  height: 100,
  x: gameWidth - 25,
  y: gameHeight / 2 - 50,
};

window.addEventListener("keydown", changeDirection);
window.addEventListener("keyup", stopPaddle);
resetBtn.addEventListener("click", resetGame);

gameStart();
nextTick();

function gameStart() {
  scoreText.innerText = `${player1Score} : ${player2Score}`;
}

function nextTick() {
  intervalID = setInterval(() => {
    clearBoard();
    movePaddles();
    moveBall();
    drawBoard();
    drawPaddles();
    drawBall();
    checkCollision();
  }, 10);
}

function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function drawBoard() {
  ctx.strokeStyle = paddleBorder;
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, gameWidth, gameHeight);
}

function drawPaddles() {
  ctx.fillStyle = paddle1Color;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  ctx.fillStyle = paddle2Color;
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}

function drawBall() {
  ctx.fillStyle = ballColor;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = ballBorderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.stroke();
}

function movePaddles() {
  if (paddle1.up) {
    paddle1.y -= paddleSpeed;
  }
  if (paddle1.down) {
    paddle1.y += paddleSpeed;
  }
  if (paddle2.up) {
    paddle2.y -= paddleSpeed;
  }
  if (paddle2.down) {
    paddle2.y += paddleSpeed;
  }
  
  // Limitar o movimento das paletas dentro dos limites do jogo
  paddle1.y = Math.max(0, Math.min(gameHeight - paddle1.height, paddle1.y));
  paddle2.y = Math.max(0, Math.min(gameHeight - paddle2.height, paddle2.y));
}

function moveBall() {
  ballX += ballSpeed * ballXDirection;
  ballY += ballSpeed * ballYDirection;
}

function checkCollision() {
  if (ballY - ballRadius <= 0 || ballY + ballRadius >= gameHeight) {
    ballYDirection *= -1;
  }

  if (
    ballX - ballRadius <= paddle1.x + paddle1.width &&
    ballY >= paddle1.y &&
    ballY <= paddle1.y + paddle1.height
  ) {
    ballXDirection = 1;
  }

  if (
    ballX + ballRadius >= paddle2.x &&
    ballY >= paddle2.y &&
    ballY <= paddle2.y + paddle2.height
  ) {
    ballXDirection = -1;
  }

  if (ballX - ballRadius <= 0) {
    player2Score++;
    resetGame();
  }

  if (ballX + ballRadius >= gameWidth) {
    player1Score++;
    resetGame();
  }

  scoreText.innerText = `${player1Score} : ${player2Score}`;
}

function changeDirection(event) {
  const keyPressed = event.keyCode;

  switch (keyPressed) {
    case 87: // W
      paddle1.up = true;
      break;
    case 83: // S
      paddle1.down = true;
      break;
    case 38: // Seta para cima
      paddle2.up = true;
      break;
    case 40: // Seta para baixo
      paddle2.down = true;
      break;
  }
}

function stopPaddle(event) {
  const keyPressed = event.keyCode;

  switch (keyPressed) {
    case 87: // W
      paddle1.up = false;
      break;
    case 83: // S
      paddle1.down = false;
      break;
    case 38: // Seta para cima
      paddle2.up = false;
      break;
    case 40: // Seta para baixo
      paddle2.down = false;
      break;
  }
}

function resetGame() {
  clearInterval(intervalID);
  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  ballXDirection = Math.random() < 0.5 ? -1 : 1;
  ballYDirection = Math.random() < 0.5 ? -1 : 1;
  paddle1.y = gameHeight / 2 - 50;
  paddle2.y = gameHeight / 2 - 50;
  gameStart();
}
