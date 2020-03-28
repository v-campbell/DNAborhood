const Board = require('./board');
// const Timer = require('./timer');

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
    gameOverDiv.className = "gamestart"
    const game = document.getElementById("game");
    game.className = "showgame"

    this.board.printBoard()
  }
  
}

module.exports = Game;




