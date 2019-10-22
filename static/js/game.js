
let gameState = [];

class Cell {
    constructor(player, status) {
    this.player = player;
    this.status = status;
  }
}

function initGameState(){
    board = document.getElementById("game-board");
    width = board.dataset.colNum;
    height = board.dataset.rowNum;
    let state = [width];
    for (let x = 0; x < width; x++){
        state[x] =new Array(height);
        for (let y =0; y < height; y++){
            state[x][y] = new Cell(0, "none");
        }

    }
    return state;
}

gameState = initGameState();
