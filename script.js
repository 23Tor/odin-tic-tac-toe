const Game = () => {
  let board = Array(9).fill(null); // game state
  let currentPlayer = "X"; // start with player X
  let gameOver = false;

  const playTurn = (index) => {
    if (board[index] || gameOver) {
      return;
    }

    board[index] = currentPlayer;
    document.getElementById(`cell-${index}`).textContent = currentPlayer;

    checkGameStatus();
    switchPlayer();
  };

  const checkGameStatus = () => {
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
  };

  const restartGame = () => {
    // Reset game state
    board = Array(9).fill(null);
    gameOver = false;
    currentPlayer = "X";

    // Reset cells
    document.querySelectorAll(".cell").forEach((cell, index) => {
      cell.textContent = '';
    });
    
    // Clear message
    document.querySelector(".message").textContent = "";
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  };

  return { checkGameStatus, restartGame, switchPlayer, playTurn };
};

const OrbAnimation = () => {
  // Glowing orb animation
  const animateOrbs = () => {
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

  return { animateOrbs };
};

const DarkMode = () => {
  // Dark mode button
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
  };

  return { toggleDarkMode };
};

// Usage
const game = Game();
const orbAnimation = OrbAnimation();
const darkMode = DarkMode();

// Add event listeners
document.querySelectorAll(".cell").forEach((cell, index) => {
  cell.addEventListener("click", () => game.playTurn(index));
});
document.getElementById("restart-button").addEventListener("click", game.restartGame);
document.getElementById("darkModeToggle").addEventListener("click", darkMode.toggleDarkMode);
window.onload = orbAnimation.animateOrbs;