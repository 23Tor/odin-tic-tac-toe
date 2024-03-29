const Game = () => {
  let board = Array(9).fill(null); // game state
  let currentPlayer = "X"; // start with player X
  let gameOver = false;
  let aiPlayer = false; // flag to indicate if AI player is enabled

  const playTurn = (index) => {
    if (board[index] || gameOver) {
      return;
    }

    board[index] = currentPlayer;
    document.getElementById(`cell-${index}`).textContent = currentPlayer;

    checkGameStatus();
    switchPlayer();

    // If AI player is enabled and it's AI's turn
    if (aiPlayer && currentPlayer === "O" && !gameOver) {
      makeAiMove();
    }
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
      cell.textContent = "";
    });

    // Clear message
    document.querySelector(".message").textContent = "";
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  };

  const enableAiPlayer = () => {
    aiPlayer = true;
  };

      const makeAiMove = () => {
        // Simple AI logic: Randomly select an empty cell
        const emptyCells = board.reduce((acc, cell, index) => {
          if (!cell) {
            acc.push(index);
          }
          return acc;
        }, []);

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const aiMove = emptyCells[randomIndex];

        playTurn(aiMove);
      };

      return { checkGameStatus, restartGame, switchPlayer, playTurn, enableAiPlayer };
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

// Add event listeners for game mode buttons
document.getElementById("multi-player").addEventListener("click", startGame);
document.getElementById("single-player").addEventListener("click", () => {
  game.enableAiPlayer();
  startGame();
});

function startGame() {
  // Get the elements
  var container = document.querySelector(".container");
  var restartButton = document.getElementById("restart-button");
  var gameMode = document.querySelector(".game-mode");
  var cells = document.querySelectorAll('.container .cell');

  // Initially set the opacity of the game board and cells to 0
  container.style.opacity = '0';
  for(var i = 0; i < cells.length; i++) {
    cells[i].style.opacity = '0';
  }

  // Add the fade out class to the game mode buttons
  gameMode.classList.add('css-fade-out');

  // After the fade out animation is done, hide the game mode buttons and show the game board and cells
  setTimeout(function() {
    gameMode.style.display = "none";

    // Show game board and restart button
    container.style.display = "block";
    restartButton.style.display = "block";

    // Show cells
    for(var i = 0; i < cells.length; i++) {
      cells[i].style.display = 'flex'; // or 'block', etc. depending on your layout
    }

    // Add the fade in class to the game board and cells
    container.classList.add('css-fade-in');
    for(var i = 0; i < cells.length; i++) {
      cells[i].classList.add('css-fade-in');
    }

    // Set the opacity of the container and cells to 1 after a short delay
    setTimeout(function() {
      container.style.opacity = '1';
      for(var i = 0; i < cells.length; i++) {
        cells[i].style.opacity = '1';
      }
    }, 50); // This delay can be very short, it just needs to give the browser time to register the display change
  }, 500); // This should match the duration of your transition // This should match the duration of your transition
}

window.onload = orbAnimation.animateOrbs;