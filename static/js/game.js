let gameState = [];
let currentPlayer = 1;
const alive = "alive";

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
    for (let x = 0; x < width; x++) {
        state[x] = new Array(height);
        for (let y = 0; y < height; y++) {
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
         // console.log("|" + str + y.toString())
     }
}

//
// function getNeighbourCount(x, y, gameState) {
//     let neighbourCount = 0;
//     for (let xOffset = -1; xOffset <= 1; xOffset++) {
//         for (let yOffset = -1; yOffset <= 1; yOffset++) {
//             if (xOffset != 0 &&
//                 yOffset != 0 &&
//                 gameState[x + xOffset][y + yOffset] &&
//                 gameState[x + xOffset][y + yOffset] != 0) {
//                 neighbourCount++;
//             }
//         }
//     }
//     return neighbourCount;
// }


function markCell() {
    let gameCell = document.querySelectorAll('.game-cell');
    for (cell of gameCell) {
        cell.addEventListener('click', function (event) {
            let markedCell = event.target;
            let markedCellCoordinateX = markedCell.dataset.coordinateX;
            let markedCellCoordinateY = markedCell.dataset.coordinateY;
            gameState[markedCellCoordinateX][markedCellCoordinateY].player = currentPlayer;
            gameState[markedCellCoordinateX][markedCellCoordinateY].status = alive;
            drawDisplay(gameState);
        })
    }
}

function getNeighbours(x, y, gameState) {
    let neighbours = [];
    let offset = -1;
    for (let xOffset = 0; xOffset < 3; xOffset++) {
        for (let yOffset = 0; yOffset < 3; yOffset++) {
            console.log("x: " + x + " y:" + y + " xo: " + (xOffset + offset + x) + " yo: " + (yOffset + offset + y) );
            if (xOffset + offset + x >= 0 &&
                yOffset + offset + y >= 0 &&
                !(xOffset + offset == 0 && yOffset + offset == 0) &&
                gameState[x + xOffset -1] != undefined &&
                gameState[x + xOffset -1][y + yOffset - 1] != undefined)
            {
                if (gameState[x + xOffset -1][y + yOffset - 1].player > 0 &&
                    gameState[x + xOffset -1][y + yOffset - 1].status != "born")
                    neighbours.push(gameState[x + xOffset - 1] [y + yOffset -1 ]);
                console.log(gameState[x + xOffset - 1] [y + yOffset -1 ]);
            }
        }
    }
     console.log("----------------");
    return neighbours;
}

function chooseOwner(neighbours){
    // console.log(neighbours.length);
    if (neighbours.length <= 1){
        return -1;
    }else if (neighbours.length == 3){
        return getHighestOwnerCount(neighbours);
    } else if (neighbours.length >= 4){
        return -1;
    }else
        return 0;
}

function getHighestOwnerCount(neighbours){
    let p1 = 0, p2 =0;
    for (let i = 0; i < neighbours.length; i++){
        if(neighbours[i].player == 1){
            p1++;
        }else if(neighbours[i].player == 2){
            p2++;
        }
    }
    return (p1 > p2) ? 1 : 2;
}

async function gameLogic(gameState){

    for (let x = 0; x < gameState.length; x++){
        for (let y = 0; y < gameState[x].length; y++) {
            let current = gameState[x][y];
            // if (current === 'undefinied')
            //     alert(x + ", ", y);
            let neighbours = getNeighbours(x,y,gameState);
            let state = chooseOwner(neighbours);
            if (state == -1){
                current.status = "die";
            }else if (state > 0 && current.status != 'alive'){
                current.player = state;
                current.status = "born"
                // console.log(state)
            }
        }
    }
    // console.log(gameState);
    for (let x = 0; x < gameState.length; x++){
        for (let y = 0; y < gameState[x].length; y++) {
            let current = gameState[x][y];
            if (current.status == "die"){
                current.player = 0;
                current.status = "none"
            }
        }
    }

       for (let x = 0; x < gameState.length; x++) {
        for (let y = 0; y < gameState[x].length; y++) {
            let current = gameState[x][y];
            if (current.status == "born")
                current.status = "alive";
        }
    }

    // drawDisplay(gameState);
}




gameState = initGameState();
markCell();
// gameState[0][1].player = 1;
// gameState[0][1].status = "alive";
// gameState[1][0].player = 1;
// gameState[1][0].status = "alive";
drawDisplay(gameState);
// console.log(getNeighbours(0, 0, gameState));
// gameLogic(gameState);
// drawDisplay(gameState);

// getNeighbours(0,0, gameState);
// function test(){
//     let btn = document.getElementById("test");
//     btn.addEventListener("click", gameLogicWrapper);
// }
//
// test();
//
function gameLogicWrapper() {
    gameLogic(gameState).then(drawDisplay(gameState));


}