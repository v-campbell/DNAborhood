const Board = require('./board');
// const Timer = require('./timer');

class Game {
  constructor() {
    this.board = new Board();
    // this.timer = new Timer();
    // this.numGuesses = numGuesses;
    this.numGuesses = 4;
  }

  runGame() {
    this.board.setupStrands(6);
    this.board.hideStrands();
    this.board.createPossibles();
    // this.timer.startTimer();
  }

  receiveGuess(guess) {
    let match = true;
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < this.board.length; j++) {
        // if incorrect
        if (this.board.strands[i][j] !== guess[i][j]) {
          guess[i][j] = "-";
          match = false;
        } else {
            // if correct, remove the 1st instance of the correctly guessed nucleotide from possibles
            this.board.possibles.splice(this.board.possibles.indexOf(guess[i][j]), 1);
        }
      }
    }

    if (match === true) {
      this.gameWon();
    } else {
      this.numGuesses -= 1;
      return this.numGuesses === 0 ? this.gameLost() : guess;
    }
  }

  gameWon() {

  }

  gameLost() {

  }

  // clock() {
  //   this.timer.tick();
  //   if (this.timer.time() === "00:00") {
  //     this.gameLost();
  //   }
  // }

  
}

module.exports = Game;




