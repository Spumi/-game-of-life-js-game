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
    if (click <= firstRoundMarkedCellByOnePlayer) {
        currentPlayer = 1;
    } else if (firstRoundMarkedCellByOnePlayer < click && click <= firstRoundMarkedCellByBothPlayer) {
        currentPlayer = 2;
    } else if (click % 2 !== 0) {
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

            if (gameState[markedCellCoordinateX][markedCellCoordinateY].player === 0) {
                click += 1;
                console.log(`Click ${click}`);

                switchPlayer(click);
                console.log(`Player: ${currentPlayer}`);

                currentRound = (click <= firstRoundMarkedCells ? 1 : (click % 2 === 0 ? currentRound : currentRound + 1));
                previousRound = (click < firstRoundMarkedCells ? 1 : (click % 2 === 0 ? currentRound - 1 : currentRound));
                console.log(`Previous round: ${previousRound}`);
                console.log(`Current round ${currentRound}`);


                gameState[markedCellCoordinateX][markedCellCoordinateY].player = currentPlayer;
                console.log(gameState);
                drawDisplay(gameState);

                // a markCell fv-ben túl sok minden van bent, REFACTOR kell
                if (previousRound < currentRound) {
                    // ROUND EVALUATION FUNCTION NEEDED BELOW
                    console.log('ROUND EVALUATION FUNCTION');
                    drawDisplay(gameState);
                    checkWinner(false);
                } // LAST ROUND CONDITION NEEDED with checkWinner(true) (ALSO IN THE IF CONDITION (not last round))
            }
        })
    }
}

let previousRound = 1;
let currentRound = 1;
let click = 0;
gameState = initGameState();
markCell();

function countCells(player='Player1') {
    let countCellsPlayer1 = 0;
    let countCellsPlayer2 = 0;
    for (column of gameState) {
        countCellsPlayer1 += column.filter(cell => cell.player === 1).length;
        countCellsPlayer2 += column.filter((cell) => cell.player === 2).length;
    }
    return (player === 'Player1' ? countCellsPlayer1 : countCellsPlayer2);
}


function checkWinner(endOfLastRound=true) {
    let countCellsPlayer1 = countCells('Player1');
    let countCellsPlayer2 = countCells('Player2');
    if (endOfLastRound) {
        if (countCellsPlayer1 > countCellsPlayer2) {
            alert('Player 1 won the game!');
        } else if (countCellsPlayer1 < countCellsPlayer2) {
            alert('Player 2 won the game!');
        } else {
            alert('It is a draw!');
        }
    }
    else {
        if (countCellsPlayer1 === 0) {
            alert('Player 1 has no more cells. Player 2 won the game!');
        } else if (countCellsPlayer2 === 0) {
            alert('Player 2 has no more cells. Player 1 won the game!');
        }
    }
    console.log(`Count cells Player1: ${countCellsPlayer1}`);
    console.log(`Count cells Player2: ${countCellsPlayer2}`);
}

