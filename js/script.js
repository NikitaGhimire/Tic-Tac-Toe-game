// Gameboard factory function
const Gameboard = () => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;
  
  const updateBoard = (index, marker) => {
    if (board[index] === '') {
      board[index] = marker;
      return true; // Move successful
    } else {
      return false; // Cell already occupied
    }
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = '';
    }
  };

  return { getBoard, updateBoard, resetBoard };
};

// Player factory function
const Player = (name, marker) => {
  return { name, marker };
};

// Game controller object
const GameController = (() => {
  let winner = null;
  let currentPlayer;
  let player1;
  let player2;
  let gameboard;
  let gameResultDisplay;

  const startGame = () => {
    player1 = Player(document.getElementById('player1-input').value || 'Player 1', './assets/images/fish.png');
    player2 = Player(document.getElementById('player2-input').value || 'Player 2', './assets/images/jelly.png');
    currentPlayer = player1;
    gameboard = Gameboard();
    gameResultDisplay = document.getElementById('game-result');
    renderBoard();
  };

  const renderBoard = () => {
    const board = gameboard.getBoard();
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
      cell.textContent = ''; // Clear previous content
      const marker = board[index];
      if (marker !== '') {
        // If the cell is not empty, create an img element for the player icon
        const icon = document.createElement('img');
        icon.src = marker; // Set the src attribute to the player's marker (image path)
        icon.alt = ''; // Optional: Set alt attribute for accessibility
        icon.classList.add('player-icon'); // Add a class for styling
        cell.appendChild(icon); // Append the img element to the cell
      }
    });
  };



  const handleCellClick = (cellIndex) => {
    if (!gameboard) return; // Game not started yet

    if (gameboard.updateBoard(cellIndex, currentPlayer.marker)) {
      renderBoard();
      if (checkGameOver()) {
        showGameResult();
        return;
      }
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
  };

  const checkGameOver = () => {
    const board = gameboard.getBoard();
    // Logic to check for winning conditions or a tie

    const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  // Check for a win
  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      return true; // Winner found
    }
  }

  // Check for a tie
  if (board.every(cell => cell !== '')) {
    return true; // All cells filled, no winner
  }

  return false; // Game still ongoing
};
const showGameResult = () => {
  // Display game result on the webpage
  console.log('showGameResult function called');
  
  if (winner !== null) {
    const winningPlayer = winner === player1.marker ? player1 : player2;
    gameResultDisplay.textContent = `${winningPlayer.name} wins!`;
  } else {
    gameResultDisplay.textContent = "It's a tie!";
  }
};


  const resetGame = () => {
    gameboard.resetBoard();
    renderBoard();
    gameResultDisplay.textContent = '';
    currentPlayer = player1;
  };

  return { startGame, handleCellClick, resetGame };
})();

// Event listener for start/restart button
document.getElementById('start-button').addEventListener('click', GameController.startGame);

// Event listener for cell clicks
document.querySelectorAll('.cell').forEach((cell, index) => {
  cell.addEventListener('click', () => GameController.handleCellClick(index));
});

function createBubbles() {
  const bubbleCount = 20;
  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.width = `${Math.random() * 30 + 10}px`;
    bubble.style.height = bubble.style.width;
    bubble.style.animationDelay = `${Math.random() * 15}s`;
    document.body.appendChild(bubble);
  }
}

createBubbles();
