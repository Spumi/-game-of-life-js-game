
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


function getNeighbourCount(x,y, gameState){
    let neighbourCount = 0;
    for (let xOffset = -1; xOffset <= 1;xOffset++){
        for (let yOffset = -1; yOffset <= 1;yOffset++) {
            if (xOffset != 0 &&
                yOffset != 0 &&
                gameState[x+xOffset][y+yOffset] &&
                gameState[x+xOffset][y+yOffset] != 0){
                    neighbourCount++;
            }
        }
    }
    return neighbourCount;
}




gameState = initGameState();
