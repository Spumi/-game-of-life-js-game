let gameState = [];
let currentPlayer = 1;

class Cell {
    constructor(player, status) {
    this.player = player;
    this.status = status;
  }
}


function drawDisplay(object) {
    let colNumber = object.length;
    let rowNumber = object[0].length;
    let gameCells = document.querySelectorAll('.game-cell');
    let gameCellIndex = 0;

    for (let y = 0; y < rowNumber; y++) {
        for (let x = 0; x < colNumber; x++) {

            let cellOwnerId = object[x][y].player;
            let cellOwner = 'empty-cell';

            if (cellOwnerId === 1) {
                cellOwner = 'player1-cell';
            } else if (cellOwnerId === 2) {
                cellOwner = 'player2-cell';
            }

            let gameCell = gameCells[gameCellIndex];
            gameCell.classList.remove('empty-cell', 'player1-cell', 'player2-cell');
            gameCell.classList.add(cellOwner);
            gameCellIndex += 1;
        }
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
    initStartLocations(state);
    drawDisplay(state);
    return state;
}

function initStartLocations(gameState){
    let p1X = Math.round(width / 4);
    let p2X = p1X * 3;
    let y = Math.round(height /2);
    gameState[p1X][y].player = 1;
    gameState[p1X][y].status = "alive";
    gameState[p2X][y].player = 2;
    gameState[p2X][y].status = "alive";

     for (let y = 0; y < height; y++) {
         let str = "";
         for (let x = 0; x < width; x++) {
            str += gameState[x][y].player + ", ";
         }
         console.log("|" + str + y.toString())
     }
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


function switchPlayer(click) {
    const firstRoundMarkedCellByOnePlayer = 4;
    let firstRoundMarkedCellByBothPlayer = firstRoundMarkedCellByOnePlayer * 2;
    if (click < firstRoundMarkedCellByOnePlayer) {
        currentPlayer = 1;
    } else if (firstRoundMarkedCellByOnePlayer <= click && click < firstRoundMarkedCellByBothPlayer) {
        currentPlayer = 2;
    } else if (click % 2 === 0) {
        currentPlayer = 1;
    } else {currentPlayer = 2;}
}


function markCell() {
    let gameCell = document.querySelectorAll('.game-cell');
    for (cell of gameCell) {
        cell.addEventListener('click', function (event) {
            const firstRoundMarkedCells = 8;
            let markedCell = event.target;

            let markedCellCoordinateX = markedCell.dataset.coordinateX;
            let markedCellCoordinateY = markedCell.dataset.coordinateY;
            console.log(`Coord-X: ${markedCellCoordinateX}`);
            console.log(`Coord-Y: ${markedCellCoordinateY}`);

            if (gameState[markedCellCoordinateX][markedCellCoordinateY].player === 0 &&
                validateClick(currentPlayer, gameState, markedCellCoordinateX, markedCellCoordinateY)
            ) {
                click += 1;
                console.log(`Click ${click}`);

                currentRound = (click <= firstRoundMarkedCells ? 1 : (click % 2 === 0 ? currentRound : currentRound + 1));
                previousRound = (click < firstRoundMarkedCells ? 1 : (click % 2 === 0 ? currentRound - 1 : currentRound));
                console.log(`Previous round: ${previousRound}`);
                console.log(`Current round ${currentRound}`);


                gameState[markedCellCoordinateX][markedCellCoordinateY].player = currentPlayer;
                console.log(gameState);
                drawDisplay(gameState);

                switchPlayer(click);
                console.log(`Player: ${currentPlayer}`);


                if (previousRound < currentRound) {
                    // ROUND EVALUATION FUNCTION NEEDED BELOW
                    console.log('ROUND EVALUATION FUNCTION');
                    drawDisplay(gameState);
                }
            }
        })
    }
}


function validateClick(player, gameState, coordinateX, coordinateY) {
    const xMaxIndex = gameState.length - 1;
    const yMaxIndex = gameState[0].length - 1;
    const iteratorStartingVal = -2;
    const iteratorOpenedEndPoint = 3;

    for (let y = iteratorStartingVal; y < iteratorOpenedEndPoint; y++) {
        for (let x = iteratorStartingVal; x < iteratorOpenedEndPoint; x++) {
            let xIndex = parseInt(coordinateX) + x;
            let yIndex = parseInt(coordinateY) + y;
            if (((x === 0 && y === 0) || xIndex < 0 || yIndex < 0 || xIndex > xMaxIndex || yIndex > yMaxIndex) === false) {
                if (player === gameState[xIndex][yIndex].player) {
                    return true
                }
            }
        }
    }
    return false
}


let previousRound = 1;
let currentRound = 1;
let click = 0;
gameState = initGameState();
markCell();
