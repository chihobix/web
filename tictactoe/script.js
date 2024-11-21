const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const pvpButton = document.getElementById('pvpButton');
const pvcButton = document.getElementById('pvcButton');
const backButton = document.getElementById('backButton');
const gameBoard = document.getElementById('game-board');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let isPlayerVsComputer = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const updateBoard = (index) => {
    board[index] = currentPlayer;
};

const checkWin = () => {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameActive = false;
            statusText.textContent = `${currentPlayer} wins!`;
            
            confetti({
                particleCount: 200,
                spread: 70,
                origin: { x: 0.5, y: 0.5 }
            });
            return true;
        }
    }
    if (!board.includes('')) {
        isGameActive = false;
        statusText.textContent = "It's a draw!";
        return true;
    }
    return false;
};


const changePlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
};

const handleCellClick = (e) => {
    const index = e.target.getAttribute('data-index');
    if (board[index] || !isGameActive || (isPlayerVsComputer && currentPlayer === 'O')) return;

    updateBoard(index);
    e.target.textContent = currentPlayer;

    if (checkWin()) return;

    changePlayer();

    if (isPlayerVsComputer && currentPlayer === 'O') {
        setTimeout(computerMove, 300);
    }
};

const computerMove = () => {
    let availableCells = [];
    board.forEach((cell, index) => {
        if (cell === '') availableCells.push(index);
    });

    if (availableCells.length > 0) {
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';

        if (!checkWin()) changePlayer(); 
    }
};

const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
};

const startGame = (mode) => {
    isPlayerVsComputer = mode === 'PVC';
    pvpButton.style.display = 'none';
    pvcButton.style.display = 'none';
    gameBoard.style.display = 'grid';
    resetButton.style.display = 'inline-block';
    backButton.style.display = 'inline-block';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
};

const goBackToSelection = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusText.textContent = '';
    cells.forEach(cell => cell.textContent = '');

    gameBoard.style.display = 'none';
    resetButton.style.display = 'none';
    backButton.style.display = 'none';
    pvpButton.style.display = 'inline-block';
    pvcButton.style.display = 'inline-block';
};

pvpButton.addEventListener('click', () => startGame('PVP'));
pvcButton.addEventListener('click', () => startGame('PVC'));
resetButton.addEventListener('click', resetGame);
backButton.addEventListener('click', goBackToSelection);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
