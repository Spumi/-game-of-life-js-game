object = [[{player: 0, status: 'stay'}, {player: 1, status: 'stay'}, {player: 2, status: 'stay'}],
          [{player: 1, status: 'stay'}, {player: 1, status: 'stay'}, {player: 0, status: 'stay'}],
          [{player: 0, status: 'stay'}, {player: 2, status: 'stay'}, {player: 2, status: 'stay'}]];


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
