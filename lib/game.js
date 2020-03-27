const Board = require('./board');
// const Timer = require('./timer');

class Game {
  constructor() {
    
  }
  
  runGame() {
    this.board = new Board();
    this.match = true;
    this.win = false;
    this.tempPool = this.board.hiddenLetters;
    this.numGuesses = 4;

    // this.board.setupStrands(6);
    // this.board.hideStrands();
    // this.board.createPossibles();
    this.board.runBoard();

    const gameOverDiv = document.getElementById("gameover");
    const game = document.getElementById("game");
    gameOverDiv.className = "gamestart"
    game.className = "showgame"
    this.printBoard()
    // this.timer.startTimer();
  }

  printBoard() {


    // const big = document.getElementById("big");    
    const guessesRemaining = document.getElementById("guesses");
    const top = document.getElementById("top");
    const bottom = document.getElementById("bottom");
    const pool = document.getElementById("pool");
    // debugger
    top.innerHTML = ""
    bottom.innerHTML = ""
    pool.innerHTML = ""

    guessesRemaining.innerHTML = this.numGuesses + " guesses left";

    let clicks = 0;
    let topGuess = this.board.hiddenTopStrand
    let bottomGuess = this.board.hiddenBottomStrand

    this.board.hiddenTopStrand.map((letter, i) => {
      let div = document.createElement("div");
      if (letter.length > 1) div.innerHTML = letter.charAt(0);
      if (letter.length === 1) div.innerHTML = letter;
      div.className = "letters";
      div.id = "topletter" + i;

      div.addEventListener("click", () => {
        if (clicks === 0) {
          div.className += " selected"
          clicks += 1
        } else {
          let selected = document.getElementsByClassName("selected").item(0);
          selected.className = selected.className.replace(" selected", "")

          let temp = div.innerHTML;
          div.innerHTML = selected.innerHTML;
          selected.innerHTML = temp;

          clicks = 0;
          topGuess[i] = div.innerHTML;
        }
      })
      console.log(letter, i)
      top.appendChild(div);
    })

    this.board.hiddenBottomStrand.map((letter, i) => {
      let div = document.createElement("div");
      if (letter.length > 1) div.innerHTML = letter.charAt(0);
      if (letter.length === 1) div.innerHTML = letter;
      div.className = "letters";
      div.id = "bottomletter" + i;
      div.addEventListener("click", () => {
        if (clicks === 0) {
          div.className += " selected";
          clicks += 1;
        } else {
          let selected = document.getElementsByClassName("selected").item(0);
          selected.className = selected.className.replace(" selected", "")
          let temp = div.innerHTML;
          div.innerHTML = selected.innerHTML;
          selected.innerHTML = temp;
          clicks = 0;
          bottomGuess[i] = div.innerHTML;

        }
      })
      // letter = div.innerHTML;
      console.log(letter, i)
      bottom.appendChild(div);
    })


    this.board.hiddenLetters.map((possible, i) => {
      let div = document.createElement("div");
      div.innerHTML = possible.charAt(0);
      div.className = "possibles"
      div.id = "possible" + i;
      div.addEventListener("click", () => {
        if (clicks === 0) {
          div.className += " selected"
          clicks += 1
        } else if (div.className.includes("possibles")) {
          let selected = document.getElementsByClassName("selected").item(0);
          selected.className = selected.className.replace(" selected", "");
          div.className += " selected";
        }
      })
      possible = div.innerHTML;
      console.log(possible, i)
      pool.appendChild(div);
    })

    this.submit()

  }

  submit() {
    let topGuess = this.board.hiddenTopStrand
    let bottomGuess = this.board.hiddenBottomStrand
    let submit = document.getElementById("submit")
    submit.addEventListener("click", () => {
      this.receiveGuess([topGuess, bottomGuess]);
    });
  }

  receiveGuess(guess) {
    for (let i = 0; i < 2; i++) {
      // debugger
      for (let j = 0; j < this.board.strandLength; j++) {

        // don't touch prepopulated values
        if (guess[i][j].charAt(1) !== "X") {

          // if incorrect (ie "A" !== "CX".charAt(0) or "-X")
          if (this.board.strands[i][j] !== guess[i][j].charAt(0)) {
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
          // this.match = true;
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
    const guessesRemaining = document.getElementById("guesses");
    if (this.numGuesses > 0) guessesRemaining.innerHTML = this.numGuesses + " guesses left";
  }

  gameEnd() {
    const gameOverDiv = document.getElementById("gameover");
    const game = document.getElementById("game");
    // gameDiv.id = "gameend";
    gameOverDiv.className += " gameend"
    game.className += " hidegame"
    if (this.win) {
      gameOverDiv.innerHTML = "good job";
    } else {
      gameOverDiv.innerHTML = "bad job";
    }
    let tryagain = document.createElement("button");
    tryagain.innerHTML = "try again";
    gameOverDiv.appendChild(tryagain);
    // gameDiv.innerHTML += "unless you don't think you're good enough...";
    tryagain.addEventListener('click', () => {
      // debugger
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




