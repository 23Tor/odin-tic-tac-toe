let board = Array(9).fill(null); // game state
let currentPlayer = "X"; // start with player X
let gameOver = false;

// get all cells
let cells = document.querySelectorAll(".cell");

// add event listener to each cell
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    // if cell is empty and game is not over
    if (!board[index] && !gameOver) {
      // update game state and cell text
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;

      // check for win or draw
      checkGameStatus();

      // switch player
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });
});

// Restart game button
document
  .getElementById("restart-button")
  .addEventListener("click", function () {
    // Reset game state
    board = Array(9).fill(null);
    currentPlayer = "X";
    gameOver = false;

    // Clear cell text
    cells.forEach((cell) => {
      cell.textContent = "";
    });

    // Clear message
    document.querySelector(".message").textContent = "";
  });

function checkGameStatus() {
  // winning combinations
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let winner = null;

  // check for win
  for (let win of wins) {
    const [a, b, c] = win;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
    }
  }

  // check for draw
  if (!winner && board.every((cell) => cell)) {
    winner = "Draw";
  }

  // if game is over
  if (winner) {
    gameOver = true;
    document.querySelector(".message").textContent =
      winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`;
  }
}

// Glowing orb animation
window.onload = function () {
  var orbs = document.querySelectorAll(
    "#glowing-orb, #glowing-orb2, #glowing-orb3, #glowing-orb4, #glowing-orb5, #glowing-orb6, #glowing-orb7, #glowing-orb8, #glowing-orb9"
  );
  var distance = 500; // Set the distance the orbs should travel each interval

  orbs.forEach(function (orb, index) {
    orb.style.top =
      Math.random() * (window.innerHeight - orb.offsetHeight) + "px";
    orb.style.left =
      Math.random() * (window.innerWidth - orb.offsetWidth) + "px";

    // Wait for the initial transition to finish before starting the animation
    setTimeout(function () {
      setInterval(function () {
        var currentTop = parseInt(orb.style.top);
        var currentLeft = parseInt(orb.style.left);

        var newTop =
          currentTop + (Math.random() > 0.5 ? distance : -distance);
        var newLeft =
          currentLeft + (Math.random() > 0.5 ? distance : -distance);

        // Ensure the orb stays within the viewport
        newTop = Math.max(
          0,
          Math.min(newTop, window.innerHeight - orb.offsetHeight)
        );
        newLeft = Math.max(
          0,
          Math.min(newLeft, window.innerWidth - orb.offsetWidth)
        );

        orb.style.top = newTop + "px";
        orb.style.left = newLeft + "px";
      }, 5000);
    }, index * 5000); // Delay each orb animation based on its index
  });
};

// Dark mode button
var darkModeButton = document.getElementById("darkModeToggle");
darkModeButton.addEventListener("click", function (event) {
  event.preventDefault(); // prevent the default action
  document.body.classList.toggle("dark-mode");
});