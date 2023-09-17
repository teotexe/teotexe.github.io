window.onload = function () {
    createSudokuBoard();
};

var board = new Array();

function createSudokuBoard() {
    for (let i = 0; i < 9; i++) {
        board[i] = new Array();
        for (let j = 0; j < 9; j++) {
            board[i][j] = new Array();
            for (let k = 0; k < 9; k++) {
                board[i][j][k] = k + 1;
            }
        }
    }
    printBoard(board);
}

function printBoard(brd) {
    var screen_board = document.getElementById('board');
    screen_board.innerHTML = ''; // Clear the board
    screen_board.style.border = '2px solid black';

    for (let i = 0; i < 9; i++) {
        var row = document.createElement('tr');
        row.className = 'row';
        if (i % 3 === 0) {
            row.style.borderTop = '2px solid black';
        }
        for (let j = 0; j < 9; j++) {
            var cell = document.createElement('td');
            cell.className = 'cell';
            if (j % 3 === 0) {
                cell.style.borderLeft = '2px solid black';
            }

            var table = document.createElement('table');
            table.className = 'table';

            if (board[i][j].length === 1) {
                var tableRow = document.createElement('tr');
                var tableCell = document.createElement('td');
                tableCell.style.width = '2em';
                tableCell.style.height = '1.7em';
                tableCell.style.fontSize = '3em';
                tableCell.style.textAlign = 'center';
                tableCell.className = 'table-cell';
                tableCell.innerHTML = `${board[i][j][0]}`;
                tableRow.appendChild(tableCell);
                table.appendChild(tableRow);
            }
            else{    
                for (let k = 0; k < 9; k++) {
                    if (k % 3 === 0) {
                        var tableRow = document.createElement('tr');
                        tableRow.style.width = '3em';
                    }
                    
                    if (k < brd[i][j].length) {
                        var tableCell = document.createElement('td');
                        tableCell.className = 'table-cell';
                        var button = document.createElement('button');
                        button.className = 'button';
                        button.innerHTML = `${board[i][j][k]}`;
                        button.onclick = function () {
                            if (checkValid(i, j, board[i][j][k], board)) {
                                collapseTile(i, j, board[i][j][k], board);
                            }
                            printBoard(board);
                        };
                        tableCell.appendChild(button);
                        tableRow.appendChild(tableCell);
                    }
                    else {
                        var tableCell = document.createElement('td');
                        tableCell.style.width = '1.7em';
                        tableCell.style.height = '1.7em';
                        tableCell.className = 'table-cell';
                        tableCell.innerHTML = '&nbsp;';
                        tableRow.appendChild(tableCell);
                    }   

                    if (k % 3 == 0) {table.appendChild(tableRow);}
                }
            }
            cell.appendChild(table);
            row.appendChild(cell);
        }
        screen_board.appendChild(row);
    }
}


function checkValid(row, col, value, brd) {
    if (brd[row][col].length === 1) {
        return false;
    }

    for (let i = 0; i < 9; i++) {
        if (i !== col && brd[row][i].length === 1 && brd[row][i][0] === value) {
            return false;
        }
    }

    for (let i = 0; i < 9; i++) {
        if (i !== row && brd[i][col].length === 1 && brd[i][col][0] === value) {
            return false;
        }
    }

    const rowStart = row - (row % 3);
    const colStart = col - (col % 3);
    for (let i = rowStart; i < rowStart + 3; i++) {
        for (let j = colStart; j < colStart + 3; j++) {
            if (i !== row && j !== col && brd[i][j].length === 1 && brd[i][j][0] === value) {
                return false;
            }
        }
    }

    return true;
}

function collapseTile(row, col, value, brd) {
    brd[row][col] = [value];

    for (let i = 0; i < 9; i++) {
        if (i !== col) {
            brd[row][i] = brd[row][i].filter(v => v !== value);
        }
    }

    for (let i = 0; i < 9; i++) {
        if (i !== row) {
            brd[i][col] = brd[i][col].filter(v => v !== value);
        }
    }

    const rowStart = row - (row % 3);
    const colStart = col - (col % 3);
    for (let i = rowStart; i < rowStart + 3; i++) {
        for (let j = colStart; j < colStart + 3; j++) {
            if (i !== row && j !== col) {
                brd[i][j] = brd[i][j].filter(v => v !== value);
            }
        }
    }
}

function completeBoard(row, col, brd) {
    if (!row) row = 0;
    if (!col) col = 0;
    if (!brd) {
        brd = [];
        for (let i = 0; i < 9; i++) {
            brd[i] = [];
            for (let j = 0; j < 9; j++) {
                brd[i][j] = Array.from({ length: 9 }, (_, idx) => idx + 1);
            }
        }
    }

    if (row === 8 && col === 9) {
        board = brd;
        return true;
    }
    if (col === 9) {
        row++;
        col = 0;
    }

    if (brd[row][col].length === 0) {
        return false;
    }

    for (let i = 0; i < brd[row][col].length; i++) {
        let value = brd[row][col][i];
        let brdCopy = JSON.parse(JSON.stringify(brd));
        collapseTile(row, col, value, brdCopy);
        if (completeBoard(row, col + 1, brdCopy)) {
            return true;
        }
    }

    return false;
}

function solveBoard() {
    if (completeBoard(0, 0, board)) {
       console.log("Board complete");
       alert("Board complete");
       printBoard(board);
    }
    else {
        console.log("Board not completable");
        alert("Board not completeable");
    }
}