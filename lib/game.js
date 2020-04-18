const Board = require('./board');

class Game {
  constructor() {
    this.board = new Board();
  }
  runGame() {
    this.board = new Board();
    this.match = true;
    this.win = false;
    this.tempPool = this.board.hiddenLetters;
    this.numGuesses = 4;
    this.board.runBoard();
    
    const gameOverDiv = document.getElementById("gameover");
    gameOverDiv.className = "hide-game-over"
    const game = document.getElementById("game");
    game.className = "show-game"
    
    this.board.printBoard()
  }
  
}

module.exports = Game;




