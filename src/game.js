const Board = require('./board');

class Game {
  constructor() {
    this.board = new Board();
    // this.numGuesses = numGuesses;
    this.numGuesses = 4;
  }

  runGame() {
    this.board.setupBoard(6);
  }

  playerGuess(guess) {
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
      gameWon();
    } else {
      this.numGuesses -= 1;
      return this.numGuesses === 0 ? gameLost() : guess;
    }
  }

  gameWon() {

  }

  gameLost() {

  }
}

module.exports = Game;




