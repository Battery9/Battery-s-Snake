const canvas = document.querySelector("#canvas");
let foodX, foodY;
let snakeX = 10, snakeY = 10;
let moveX = 0, moveY = 0;
let snakeBody = [];
let gameOverSound = new Audio('./assets/gameOver.mp3');
let eatSound = new Audio('./assets/eat.mp3');
let bgm = new Audio('./assets/bgm.mp3');
let gameOver = false;
let gameSpeed = 120;
let score = 0;
let high_score = localStorage.getItem('high_score') || 0;

function randomFood() {
  foodX = Math.floor(Math.random() * 25) + 1;
  foodY = Math.floor(Math.random() * 25) + 1;
}
const gameOverAlert = () => {
  gameOverSound.play();
  bgm.pause();
  alert('Game Over!');
  clearInterval(gameRunner);
  location.reload();
}

function updateScore() {
 document.querySelector("#sc").innerText = score;
  if(score > high_score) {
    high_score = score;
    localStorage.setItem("high_score", high_score);
  }
  document.querySelector("#hsc").innerText = high_score;
}

function renderGame() {
  if(gameOver) {
    return gameOverAlert();
  }
  if(bgm.paused && (moveY != 0 || moveX != 0)) {
    bgm.play();
  }
  
  snakeX += moveX;
  snakeY += moveY;
  
  if(snakeX === foodX && snakeY === foodY) {
    eatSound.play();
    randomFood();
    snakeBody.push([snakeX, snakeY]);
    score++;
  }
  
  for(let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i-1];
  }
  
  snakeBody[0] = [snakeX, snakeY];

  html = `<div class='food' style="grid-area: ${foodX} / ${foodY}"></div><div class='snakeHead' style="grid-area: ${snakeX} / ${snakeY}"></div>`;
  
  for(let i = 1; i < snakeBody.length; i++) {
    html += `<div class='snakeBody' style="grid-area: ${snakeBody[i][0]} / ${snakeBody[i][1]}"></div>`;
    
    if(snakeBody[0][0] == snakeBody[i][0] && snakeBody[0][1] == snakeBody[i][1]) {
      return gameOver = true;
    }
  }
  if(snakeX <= 0 || snakeX > 25 || snakeY <= 0 || snakeY > 25) {
    return gameOver = true;
  }
  canvas.innerHTML = html;
  updateScore();
}

randomFood();
let gameRunner = setInterval(renderGame, gameSpeed);


document.addEventListener("keydown", (k) => {
  switch (k.key) {
    case "ArrowDown":
      if(moveX != -1) {
        moveX = 1;
        moveY = 0;
      }
      break;
    case "ArrowUp":
      if(moveX != 1) {
        moveX = -1;
      moveY = 0;
      }
      break;
    case "ArrowLeft":
      if(moveY != 1) {
        moveX = 0;
      moveY = -1;
      }
      break;
    case "ArrowRight":
      if(moveY != -1) {
        moveX = 0;
      moveY = 1;
      }
      break;
  }
})

