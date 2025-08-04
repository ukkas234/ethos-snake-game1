
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
let score = 0;
let direction = "RIGHT";

let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box,
};

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gambar ular
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00ff00" : "#006600";
    ctx.shadowColor = "#00ff00";
    ctx.shadowBlur = i === 0 ? 15 : 8;
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Gambar makanan dengan efek glow
  ctx.shadowColor = "red";
  ctx.shadowBlur = 20;
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  ctx.shadowBlur = 0; // Reset glow

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision({ x: snakeX, y: snakeY }, snake)
  ) {
    clearInterval(game);
    canvas.classList.add("shake");
    setTimeout(() => {
      canvas.classList.remove("shake");
      document.getElementById("finalScore").innerText = "Skor kamu: " + score;
      document.getElementById("gameOverScreen").style.display = "block";
    }, 500);
    return;
  }

  let newHead = { x: snakeX, y: snakeY };

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  return array.some((segment) => head.x === segment.x && head.y === segment.y);
}

let game = setInterval(draw, 150);
