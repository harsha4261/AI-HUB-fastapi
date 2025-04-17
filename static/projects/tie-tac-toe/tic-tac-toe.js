document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetBtn = document.getElementById("reset");
    const difficultySelect = document.getElementById("difficulty");
    let currentPlayer = "X";
    let gameBoard = Array(9).fill(null);
    let gameActive = true;

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]  // Diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }
        return gameBoard.includes(null) ? null : "Draw";
    }

    function handleClick(e) {
        const index = e.target.dataset.index;
        if (!gameActive || gameBoard[index]) return;

        gameBoard[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            status.textContent = winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`;
        } else {
            currentPlayer = "O";
            status.textContent = `Player O's Turn`;
            setTimeout(aiMove, 500); // AI makes a move after a short delay
        }
    }

    function aiMove() {
        let difficulty = difficultySelect.value;
        let bestMove;
        if (difficulty === "Easy") {
            bestMove = getRandomMove();
        } else if (difficulty === "Medium") {
            bestMove = Math.random() < 0.5 ? getRandomMove() : minimax(gameBoard, "O").index;
        } else {
            bestMove = minimax(gameBoard, "O").index;
        }

        gameBoard[bestMove] = "O";
        board.children[bestMove].textContent = "O";

        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            status.textContent = winner === "Draw" ? "It's a Draw!" : "AI Wins!";
        } else {
            currentPlayer = "X";
            status.textContent = "Player X's Turn";
        }
    }

    function getRandomMove() {
        let availableMoves = gameBoard.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    function minimax(boardState, player) {
        const availableMoves = boardState.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);
        const winner = checkWinner();
        if (winner === "X") return { score: -1 };
        if (winner === "O") return { score: 1 };
        if (availableMoves.length === 0) return { score: 0 };

        let moves = [];
        for (let i of availableMoves) {
            let move = {};
            move.index = i;
            boardState[i] = player;

            if (player === "O") {
                move.score = minimax(boardState, "X").score;
            } else {
                move.score = minimax(boardState, "O").score;
            }

            boardState[i] = null;
            moves.push(move);
        }

        return player === "O" ? moves.reduce((best, move) => (move.score > best.score ? move : best), { score: -Infinity })
                              : moves.reduce((best, move) => (move.score < best.score ? move : best), { score: Infinity });
    }

    function resetGame() {
        gameBoard.fill(null);
        gameActive = true;
        currentPlayer = "X";
        status.textContent = "Player X's Turn";
        board.childNodes.forEach(cell => cell.textContent = "");
    }

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    }

    resetBtn.addEventListener("click", resetGame);
});