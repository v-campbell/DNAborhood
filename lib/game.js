const Board = require('./board');
// const Timer = require('./timer');

class Game {
  constructor() {
    this.board = new Board();
    // this.hoveredCount = 3;
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
    // let hint = document.getElementById("hint-content");
    // hint.onmouseover = this.counter();
  }

//   counter() {
//     let hint = document.getElementById("hint-content");
//     const facts = ['Whole Genome Sequencing is critical in the development of vaccines, and for increasing the power of molecular epidemiology.', 'Fact 2', 'Fact 3', 'Fact 4'];
//     this.hoveredCount = (this.hoveredCount + 1) % facts.length;
//     hint.innerHTML = facts[this.hoveredCount];
// } 
  
}

module.exports = Game;




