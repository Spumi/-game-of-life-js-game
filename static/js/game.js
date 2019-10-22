
let gameState = [];

class Cell {
    constructor(player, status) {
    this.player = player;
    this.status = status;
  }
}

function initGameState(){
    board = document.getElementById("game-board");
    width = board.dataset.rowNum;
    height = board.dataset.colNum;
    console.log(height);
    let state = [height];
    for (let x = 0; x < height; x++){
        state[x] =new Array(height);
        for (let y =0; y < width; y++){
            state[x][y] = new Cell(x, y);
        }

    }
    return state;
}

gameState = initGameState();
