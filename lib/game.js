const Board = require('./board');
// const Timer = require('./timer');

class Game {
  constructor() {
    this.board = new Board();
    // this.timer = new Timer();
    this.numGuesses = 4;
    this.match = true;
    this.win = false;
    this.tempPool = this.board.hiddenLetters;
  }

  runGame() {
    this.board.setupStrands(6);
    this.board.hideStrands();
    this.board.createPossibles();
    let gameDiv = document.getElementById("big");
    gameDiv.className = ""
    // this.timer.startTimer();
  }

  receiveGuess(guess) {
    for (let i = 0; i < 2; i++) {
      debugger
      for (let j = 0; j < this.board.strandLength; j++) {

        // don't touch prepopulated values
        if (guess[i][j].charAt(1) !== "X") {

          // if incorrect (ie "A" !== "CX".charAt(0) or "-X")
          if (this.board.strands[i][j] !== guess[i][j].charAt(0)) {
            // let y = this.board.hiddenLetters.indexOf(guess[i][j]+"X");
            // this.tempPool[y] = guess[i][j] + "X";
            guess[i][j] = "-";
            this.match = false;
          } else {
            // if correct, remove the 1st instance of the correctly guessed nucleotide from possibles
              if (guess[i][j] === this.board.strands[i][j]) {
                let y = this.board.hiddenLetters.indexOf(guess[i][j] + "X");
                  this.tempPool[y] = "-";
                guess[i][j] += "X";
              }
          }
        } else {
          this.match = true;
        }
      }
    }
    this.updateFrontendAfterGuess(guess)
    
  }
  
  updateFrontendAfterGuess(guess) {
    if (this.match === true) {
      this.win = true;
      this.gameEnd();
    } else {
      this.numGuesses -= 1;
      if (this.numGuesses === 0) {
        this.win = false;
        this.gameEnd();
      } else {
        // re-show top
        guess[0].map((letter, i) => {
          let topDiv = document.getElementById("topletter" + i);
          topDiv.innerHTML = letter.charAt(0);
        })
        // re-show bottom
        guess[1].map((letter, i) => {
          let bottomDiv = document.getElementById("bottomletter" + i);
          bottomDiv.innerHTML = letter.charAt(0);
        })
        // re-show possibles
        this.tempPool.map((letter, i) => {
          let possible = document.getElementById("possible" + i);
          possible.innerHTML = letter.charAt(0);
        })
      };
    }
    let guessesRemaining = document.getElementById("guesses");
    guessesRemaining.innerHTML = this.numGuesses + " guesses left";
  }

  gameEnd() {
    let gameDiv = document.getElementById("big");
    // gameDiv.id = "gameend";
    gameDiv.className = "gameend"
    if (this.win) {
      gameDiv.innerHTML = "good job";
    } else {
      // debugger
      gameDiv.innerHTML = "bad job";
    }
    let tryagain = document.createElement("button");
    tryagain.innerHTML = "try again";
    gameDiv.appendChild(tryagain);
    // gameDiv.innerHTML += "unless you don't think you're good enough...";
    tryagain.addEventListener('click', () => {
      console.log("game reloading")
      // location.reload(true);
      // history.go(0);
      this.runGame();
  })
  }
  // clock() {
  //   this.timer.tick();
  //   if (this.timer.time() === "00:00") {
  //     this.gameLost();
  //   }
  // }
}

module.exports = Game;




