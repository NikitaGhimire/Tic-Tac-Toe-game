// Player constructor function
function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
}

//gameboard object
const Gameboard = {
  board: ['', '', '', '', '', '', '', '', ''], // Initial game board state

  //to reset the game board
  resetBoard: function() {
    this.board = ['', '', '', '', '', '', '', '', ''];
  
  },

  // Method to check if a cell is empty
  isCellEmpty: function(index) {
    return this.board[index] === '';
  },

  updateCell: function(index, symbol) {
    if (this.isCellEmpty(index)) {
        this.board[index] = symbol;
        return true; // Cell updated successfully
    } else {
        return false; // Cell is already occupied
    }
  },
  // Method to check for a winning condition
  checkWin: function(symbol) {
    // Define winning combinations
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    // Check each winning combination
    return winCombos.some(combo => {
        return combo.every(index => this.board[index] === symbol);
    });
  },
  // Method to check if the board is full (draw)
  isBoardFull: function() {
    return this.board.every(cell => cell !== '');
  }
};

//Game control object
const Game = {
  currentPlayer: null,
  players: [], // Array to store player objects
  // Method to initialize the game
  init: function(player1Name, player2Name) {
      // Create player objects
      this.players.push(new Player(player1Name, 'X'));
      this.players.push(new Player(player2Name, 'O'));
      // Reset the game board
      Gameboard.resetBoard();
      // Set the first player as the current player
      this.currentPlayer = this.players[0];
  },
  // Method to switch players
  switchPlayer: function() {
      this.currentPlayer = (this.currentPlayer === this.players[0]) ? this.players[1] : this.players[0];
  },
  // Method to handle player's move
  makeMove: function(cellIndex) {
      if (Gameboard.updateCell(cellIndex, this.currentPlayer.symbol)) {
          if (Gameboard.checkWin(this.currentPlayer.symbol)) {
              console.log(`${this.currentPlayer.name} wins!`);
              return;
          } else if (Gameboard.isBoardFull()) {
              console.log("It's a draw!");
              return;
          }
          // Switch to the next player
          this.switchPlayer();
      } else {
          console.log("This cell is already occupied. Please choose another cell.");
      }
  }
};