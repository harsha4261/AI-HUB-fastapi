let board = [];
let score = 0;
const size = 4;

function initGame() {
    const gameBoard = document.getElementById('game-board');
    const cells = gameBoard.querySelectorAll('.cell');
    cells.forEach(cell => cell.remove());
    
    board = [];
    score = 0;
    document.getElementById('score').textContent = '0';
    document.querySelector('.game-over').classList.remove('show');

    // Create board
    for (let i = 0; i < size; i++) {
        board[i] = [];
        for (let j = 0; j < size; j++) {
            board[i][j] = 0;
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${i}-${j}`;
            gameBoard.appendChild(cell);
        }
    }

    addNewTile();
    addNewTile();
    updateBoard();
}

function addNewTile() {
    const emptyCells = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === 0) {
                emptyCells.push({i, j});
            }
        }
    }
    if (emptyCells.length > 0) {
        const {i, j} = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[i][j] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateBoard() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            const value = board[i][j];
            cell.textContent = value || '';
            cell.dataset.value = value || '';
        }
    }
    document.getElementById('score').textContent = score;
}

function isGameOver() {
    // Check for empty cells
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === 0) return false;
        }
    }

    // Check for possible merges
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const current = board[i][j];
            // Check right and down
            if ((j < size - 1 && current === board[i][j + 1]) ||
                (i < size - 1 && current === board[i + 1][j])) {
                return false;
            }
        }
    }
    return true;
}

function showGameOver() {
    document.querySelector('.game-over').classList.add('show');
}

function move(direction) {
    let moved = false;
    const newBoard = JSON.parse(JSON.stringify(board));

    function mergeLine(line) {
        line = line.filter(num => num !== 0);
        for (let i = 0; i < line.length - 1; i++) {
            if (line[i] === line[i + 1]) {
                line[i] *= 2;
                score += line[i];
                line.splice(i + 1, 1);
            }
        }
        while (line.length < size) {
            line.push(0);
        }
        return line;
    }

    if (direction === 'ArrowLeft' || direction === 'ArrowRight') {
        for (let i = 0; i < size; i++) {
            let line = board[i].slice();
            if (direction === 'ArrowRight') line.reverse();
            line = mergeLine(line);
            if (direction === 'ArrowRight') line.reverse();
            
            if (line.some((num, idx) => num !== board[i][idx])) {
                moved = true;
            }
            newBoard[i] = line;
        }
    } else {
        for (let j = 0; j < size; j++) {
            let line = board.map(row => row[j]);
            if (direction === 'ArrowDown') line.reverse();
            line = mergeLine(line);
            if (direction === 'ArrowDown') line.reverse();
            
            if (line.some((num, idx) => num !== board[idx][j])) {
                moved = true;
            }
            for (let i = 0; i < size; i++) {
                newBoard[i][j] = line[i];
            }
        }
    }

    if (moved) {
        board = newBoard;
        addNewTile();
        updateBoard();
        if (isGameOver()) {
            showGameOver();
        }
    }
}

// Touch event variables and handlers
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

const gameBoard = document.getElementById('game-board');

gameBoard.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    event.preventDefault();
}, { passive: false });

gameBoard.addEventListener('touchmove', (event) => {
    event.preventDefault();
}, { passive: false });

gameBoard.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX;
    touchEndY = event.changedTouches[0].clientY;
    handleSwipe();
    event.preventDefault();
}, { passive: false });

function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Determine if the swipe was primarily horizontal or vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 50) {
            move('ArrowRight');
        } else if (deltaX < -50) {
            move('ArrowLeft');
        }
    } else {
        // Vertical swipe
        if (deltaY > 50) {
            move('ArrowDown');
        } else if (deltaY < -50) {
            move('ArrowUp');
        }
    }
}

// Keyboard controls
document.addEventListener('keydown', (event) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        move(event.key);
    }
});

function restartGame() {
    initGame();
}

// Start game
initGame();
