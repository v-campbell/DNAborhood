class Board{
  constructor(){
    this.topStrand = [];
    this.bottomStrand = [];
    this.strands = [];
    this.hiddenTopStrand = [];
    this.hiddenBottomStrand = [];
    this.hiddenStrands = [];
    this.strandLength = 6;
    this.hidden = 4;
    this.hiddenLetters = [];
    this.possibles = [];
    this.prepopulated = [];
    this.numGuesses = 4;
    this.match = true;
    this.win = false;
    this.tempPool = this.hiddenLetters;
    this.gameOver = false;
    // this.m = 3;
    // this.nucleotides = ["A", "T", "C", "G"]
  }
  
  runBoard() {
    this.numGuesses = 4;
    this.setupStrands(6);
    this.hideStrands();
    this.createPossibles();
  }

  setupStrands() {
      const nucleotides = "ATCG";
      //generate random topStrand
      for (let i = 0; i < this.strandLength; i++) {
        this.topStrand[i] = nucleotides[Math.floor(Math.random() * nucleotides.length)]
      }

      //generate bottomStrand based on topStrand
      for (let j = 0; j < this.strandLength; j++) {
          if (this.topStrand[j] === "A") this.bottomStrand[j] = "T";
          if (this.topStrand[j] === "T") this.bottomStrand[j] = "A";
          if (this.topStrand[j] === "C") this.bottomStrand[j] = "G";
          if (this.topStrand[j] === "G") this.bottomStrand[j] = "C";
      }

      this.strands = [this.topStrand, this.bottomStrand];
  }

  hideRandomStrands(strand) {
    let randomNums = [];
    let newStrand = strand.slice();
    newStrand = newStrand.map(letter => letter = letter + "X")
    while (randomNums.length < this.hidden) {
      let randomNum = Math.floor(Math.random() * this.strandLength)
      if (randomNums.indexOf(randomNum) === -1) {
        randomNums.push(randomNum)
        this.hiddenLetters.push(newStrand[randomNum]);
        newStrand[randomNum] = "-"
      }
    }
    
    return newStrand;
  }

  // findPrepopulated() {
  //   this.prepopulated = this.hiddenLetters.filter(letter => letter !== "-");
  //   this.prepopulated.map(letter => {
  //     letter = "X" + letter;
  //   })
  //   return this.prepopulated;
  // }

  hideStrands() {
    this.hiddenTopStrand = this.hideRandomStrands(this.topStrand);
    this.hiddenBottomStrand = this.hideRandomStrands(this.bottomStrand);

    this.hiddenStrands = [this.hiddenTopStrand, this.hiddenBottomStrand];
  }

  createPossibles() {
    // shuffle the strands's characters to put into possibles array

    for (let i = this.hiddenLetters.length - 1; i > 0; i -= 1) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.hiddenLetters[i], this.hiddenLetters[j]] = [this.hiddenLetters[j], this.hiddenLetters[i]];
    }
    return this.hiddenLetters;
  }

  printBoard() {
    const guessesRemaining = document.getElementById("guesses");
    const top = document.getElementById("top");
    const bottom = document.getElementById("bottom");
    const pool = document.getElementById("pool");
    top.innerHTML = ""
    bottom.innerHTML = ""
    pool.innerHTML = ""

    if (this.numGuesses === 4) {
      guessesRemaining.innerHTML = this.numGuesses + " guesses left"
    } else if (this.numGuesses === 3) {
      // debugger
      guessesRemaining.innerHTML = "only " + this.numGuesses + " guesses left"
    } else if (this.numGuesses === 2) {
      guessesRemaining.innerHTML = "now only " + this.numGuesses + " guesses left"
    } else if (this.numGuesses === 1) {
      guessesRemaining.innerHTML = "last guess! make it count!"
    }

    let clicks = 0;
    let topGuess = this.hiddenTopStrand;
    let bottomGuess = this.hiddenBottomStrand;

    this.hiddenTopStrand.map((letter, i) => {
      let div = document.createElement("div");
      if (letter.length > 1) div.innerHTML = letter.charAt(0);
      if (letter.length === 1) div.innerHTML = letter;
      div.className = "letters";
      div.id = "topletter" + i;

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
          topGuess[i] = div.innerHTML;
        }
      })
      // console.log(letter, i)
      top.appendChild(div);
    })

    this.hiddenBottomStrand.map((letter, i) => {
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
          // let selected = document.getElementsByClassName("selected").item(0);
          // selected.className = selected.className.replace(" selected", "")
          // let temp = div.innerHTML;
          // if (temp.length > 2) {
          //   div.innerHTML = selected.innerHTML;
          //   selected.innerHTML = temp;
          //   clicks = 0;
          //   bottomGuess[i] = div.innerHTML;
          // } else if (temp.length === 1 && selected.innerHTML.length > 1) {
          //   temp = div.innerHTML + "X";
          //   div.innerHTML = selected.innerHTML.charAt(0);
          //   selected.innerHTML = temp;
          //   clicks = 0;
          //   bottomGuess[i] = div.innerHTML;
          // }
          let selected = document.getElementsByClassName("selected").item(0);
          selected.className = selected.className.replace(" selected", "")

          let temp = div.innerHTML;
          div.innerHTML = selected.innerHTML;
          selected.innerHTML = temp;

          clicks = 0;
          topGuess[i] = div.innerHTML;
          }
      })
      // letter = div.innerHTML;
      // console.log(letter, i)
      bottom.appendChild(div);
    })


    this.hiddenLetters.map((possible, i) => {
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
      // console.log(possible, i)
      pool.appendChild(div);
    })

    this.submit()

  }

  submit() {
    let topGuess = this.hiddenTopStrand
    let bottomGuess = this.hiddenBottomStrand
    let submit = document.getElementById("submit")
    submit.addEventListener("click", () => {
      this.receiveGuess([topGuess, bottomGuess]);
    });
  }

  receiveGuess(guess) {
    this.match = true;
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < this.strandLength; j++) {

        // don't touch prepopulated values
        if (guess[i][j].charAt(1) !== "X") {

          // if incorrect (ie "A" !== "CX".charAt(0) or "-X")
          if (this.strands[i][j] !== guess[i][j]) {
            guess[i][j] = "-";
            this.match = false;
          } else {
            // if correct, remove the 1st instance of the correctly guessed nucleotide from possibles
            if (guess[i][j] === this.strands[i][j]) {
              let y = this.hiddenLetters.indexOf(guess[i][j] + "X");
              this.tempPool[y] = "-";
              guess[i][j] += "X";
            }
          }
        } else {
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
        // this.win = false;
        this.gameEnd();
      } else {
        // re-show top
        guess[0].map((letter, i) => {
          let topDiv = document.getElementById("topletter" + i);
          topDiv.innerHTML = letter.charAt(0);
          if (letter !== "-") {
            topDiv.className = " green";
          } 
        })
        // re-show bottom
        guess[1].map((letter, i) => {
          let bottomDiv = document.getElementById("bottomletter" + i);
          bottomDiv.innerHTML = letter.charAt(0);
          if (letter !== "-") {
            bottomDiv.className = " green";
          } 
        })
        // re-show possibles
        this.tempPool.map((letter, i) => {
          let possible = document.getElementById("possible" + i);
          if (letter.length === 1) possible.innerHTML = letter;
          if (letter.length > 1) possible.innerHTML = letter.charAt(0);
          // possible.innerHTML = letter.charAt(0);
        })
      };
    }
    const guessesRemaining = document.getElementById("guesses");
    if (this.numGuesses > 0) guessesRemaining.innerHTML = this.numGuesses + " guesses left";
  }

  gameEnd() {
    const gameOverDiv = document.getElementById("gameover");
    gameOverDiv.className = "show-game-over"

    const game = document.getElementById("game");
    game.className = "hide-game"

    if (this.win) {
      gameOverDiv.innerHTML = "You did it! Click new game to play again, since you're sooo good at this! Or maybe the game is broken and you're not actually good at this. Who knows.";
    } else {
      gameOverDiv.innerHTML = "Game over :( That's all I have for you. Sorry that was such a waste of time. Click new game to try again! Or don't. I get it.";
    }
  }

}



module.exports = Board;