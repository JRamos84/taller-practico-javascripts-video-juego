const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
let canvasSize;
let elementsSize;
const btnup = document.querySelector("#up");
const btnleft = document.querySelector("#left");
const btnright = document.querySelector("#right");
const btndown = document.querySelector("#down");
const playerPosition = {
  x: undefined,
  y: undefined,
  inicio: true,
  cuenta: 0,
};

window.addEventListener("keydown", moveByKeys);
btnup.addEventListener("click", moveUp);
btnleft.addEventListener("click", moveLeft);
btndown.addEventListener("click", moveRight);
btnright.addEventListener("click", moveDown);
window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;
  startGame();
}
function render() {
    console.log({ canvasSize, elementsSize });
  game.font = elementsSize + "px Verdana";
  game.textAlign = "end";
  const map = maps[0];
  const mapRows = map.trim().split("\n");
  const mapRowsCols = mapRows.map((row) => row.trim().split(""));
  mapRowsCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);
      if (col == "O" && playerPosition.inicio) {
        playerPosition.x = posX;
        playerPosition.y = posY;
      }

      game.fillText(emoji, posX, posY);
    });
  });
  playerPosition.cuenta += 1;
  console.log({ playerPosition });
}
function startGame() {
  
  render();

  movePlayer("PLAYER");
  playerPosition.inicio = false;
}

function movePlayer(emo) {
   
  game.fillText(emojis[emo], playerPosition.x, playerPosition.y);
 
}

function moveByKeys(event) {
  if (event.key == "ArrowUp") moveUp();
  else if (event.key == "ArrowLeft") moveLeft();
  else if (event.key == "ArrowRight") moveRight();
  else if (event.key == "ArrowDown") moveDown();
}
function moveUp() {
  render();
  
  playerPosition.y -= elementsSize;

  movePlayer("PLAYER");
  
}
function moveLeft() {
  console.log("Izquierda");
}
function moveRight() {
  console.log("Derecha");
}
function moveDown() {
  console.log("Abajo");
}
