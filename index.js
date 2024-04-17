
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
