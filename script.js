const cell = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const resetButton = document.querySelector(".resetButton");
const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 2, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 'X';
let running = true;

function handleCellClick() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] !== "" || !running) {
        return;
    }

    options[cellIndex] = currentPlayer;
    this.textContent = currentPlayer;

    let roundWon = false;

    for (let i = 0; i < winningCondition.length; i++) {
        const condition = winningCondition[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }

        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} Wins!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = "DRAW";
        running = false;
    } else {
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        statusText.textContent = `${currentPlayer}'s Turn`;
    }
}

function resetGame() {
    currentPlayer = 'X';
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s Turn`;
    cell.forEach(cell => cell.textContent = "");
    running = true;
}

cell.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
