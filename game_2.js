const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");
const spantime = document.querySelector("#time");
const spanRecord = document.querySelector("#record");
const pResult = document.querySelector("#result");

let level = 0;
let lives = 3;
let timeStart;
let timePlayer;
let timerInterval;
let canvasSize;
let elementsSize;
const playerPosition = { x: undefined, y: undefined };
const giftPosition = { x: undefined, y: undefined };

let enemyPosition = [];
window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);
function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }
  canvasSize = Number(canvasSize.toFixed(0));

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);
  elementsSize = canvasSize / 10;
  elementsSize = Number(elementsSize.toFixed(0));
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}
function startGame() {
 
  game.font = elementsSize + "px Verdana";
  game.textAlign = "end";
  const map = maps[level];
  if (!timeStart) {
    timeStart = Date.now();
    timerInterval = setInterval(showTime, 100);
    showRecord();
  }

  if (!map) {
    gameWin();
    return;
  }

  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));

  showLives();

  game.clearRect(0, 0, canvasSize, canvasSize);
  enemyPosition = [];
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
       
        }
      } else if (col == "I") {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col == "X") {
        enemyPosition.push({
          x: posX,
          y: posY,
        });
      }

      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

function movePlayer() {
  const giftColisionX =
    playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);

  const giftColisionY =
    playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);

  const giftCollision = giftColisionX && giftColisionY;

  if (giftCollision) {
    levelWin();
  }

  const enemyCollision = enemyPosition.find((enemy) => {
    const enemyCollisionX = enemy.x.toFixed(0) == playerPosition.x.toFixed(0);
    const enemyCollisionY = enemy.y.toFixed(0) == playerPosition.y.toFixed(0);

    return enemyCollisionX && enemyCollisionY;
  });

  if (enemyCollision) {
    levelFail();
  }

  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}
window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);
function moveByKeys(event) {
  if (event.key == "ArrowUp") moveUp();
  else if (event.key == "ArrowLeft") moveLeft();
  else if (event.key == "ArrowRight") moveRight();
  else if (event.key == "ArrowDown") moveDown();
}
function levelWin() {
  console.log("subiste de nivel");
  level++;
  startGame();
}
function gameWin() {
  console.log("Termino el juego!");


  clearInterval(timerInterval);
  const recorTime = localStorage.getItem("record_time");
  const playerTime = Date.now() - timeStart;
  if (recorTime) {
    if (recorTime >= playerTime) {
      localStorage.setItem("record_time", playerTime);
      pResult.innerHTML = "SUPERASTE EL RECORD";
    } else {
      pResult.innerHTML = "Lo siento, no superaste el Record :(";
    }
  } else {
    localStorage.setItem("record_time", playerTime);
    pResult.innerHTML = "Primera vez, Intentalo de nuevo(";
  }
  console.log({ recorTime, playerTime });
}

function showLives() {
  const heartArray = Array(lives).fill(emojis["HEART"]);
  spanLives.innerHTML = " ";
  heartArray.forEach((heart) => spanLives.append(heart));
}
function showTime() {

  spantime.innerHTML = Date.now() - timeStart;
}
function showRecord() {
  spanRecord.innerHTML = localStorage.getItem("record_time");
}

function levelFail() {
  lives--;
  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined;
  }

  playerPosition.x = undefined;
  playerPosition.y = undefined;

  startGame();
}
function moveUp() {


  if (playerPosition.y > elementsSize) {
    playerPosition.y -= elementsSize;

    startGame();
  }
}
function moveLeft() {


  if (playerPosition.x > elementsSize) {
    playerPosition.x -= elementsSize;
    startGame();
  }
}
function moveRight() {


  if (playerPosition.x < canvasSize) {
    playerPosition.x += elementsSize;

    startGame();
  }
}
function moveDown() {


  if (playerPosition.y < canvasSize) {
    playerPosition.y += elementsSize;

    startGame();
  }
}
