const rows = 6;
const columns = 7;
let board = Array.from({ length: rows }, () => Array(columns).fill(null));
let currentPlayer = 'red';
let movesCount = 0;

const gameBoard = document.getElementById('game-board');
const newGameButton = document.getElementById('new-game');
const gameResult = document.getElementById('game-result');
let player1Name = 'Player 1';
let player2Name = 'Player 2';

function initializeBoard() {
    gameBoard.innerHTML = '';
    gameResult.textContent = '';
    movesCount = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => handleCellClick(row, col));
            gameBoard.appendChild(cell);
        }
    }
}

function handleCellClick(row, col) {
    const emptyRow = getEmptyRow(col);
    if (emptyRow === -1) return;

    board[emptyRow][col] = currentPlayer;
    const cell = document.querySelector(`.cell[data-row='${emptyRow}'][data-col='${col}']`);
    cell.classList.add(currentPlayer);
    movesCount++;

    if (checkForWin(emptyRow, col)) {
        gameResult.textContent = `${currentPlayer === 'red' ? player1Name : player2Name} wins!`;
        disableBoard();
        return;
    }

    if (movesCount === rows * columns) {
        gameResult.textContent = 'It\'s a Draw!';
        return;
    }

    currentPlayer = (currentPlayer === 'red') ? 'yellow' : 'red';
}

function getEmptyRow(col) {
    for (let row = rows - 1; row >= 0; row--) {
        if (board[row][col] === null) return row;
    }
    return -1;
}

function checkForWin(row, col) {
    const directions = [
        { row: 0, col: 1 },   // Horizontal
        { row: 1, col: 0 },   // Vertical
        { row: 1, col: 1 },   // Diagonal down-right
        { row: 1, col: -1 }   // Diagonal down-left
    ];

    const checkDirection = (r, c, dr, dc) => {
        let count = 0;
        while (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === currentPlayer) {
            count++;
            r += dr;
            c += dc;
        }
        return count;
    };

    for (const { row: dr, col: dc } of directions) {
        const count = 1 + checkDirection(row + dr, col + dc, dr, dc) + checkDirection(row - dr, col - dc, -dr, -dc);
        if (count >= 4) return true;
    }
    return false;
}

function disableBoard() {
    for (let cell of document.querySelectorAll('.cell')) {
        cell.removeEventListener('click', handleCellClick);
    }
}

function resetGame() {
    board = Array.from({ length: rows }, () => Array(columns).fill(null));
    currentPlayer = 'red';
    initializeBoard();
}

newGameButton.addEventListener('click', resetGame);

initializeBoard();
