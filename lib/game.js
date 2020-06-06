const Board = require('./board');

class Game {
  constructor() {
    this.board = new Board();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.gameOverDiv = document.getElementById("gameover");
    this.game = document.getElementById("game");
  }
  runGame() {
    this.board = new Board();
    this.numGuesses = 4;
    this.win = false;
    this.printBoard();
    this.gameOverDiv.className = "hide-game-over"
    this.game.className = "show-game"
  }
  handleGuess(guess){
    this.win = this.board.receiveGuess(guess);
    this.numGuesses--;
    this.printBoard();
    if(this.win || this.numGuesses < 1) this.gameEnd();
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
    guessesRemaining.innerHTML = "only " + this.numGuesses + " guesses left"
  } else if (this.numGuesses === 2) {
    guessesRemaining.innerHTML = "now only " + this.numGuesses + " guesses left"
  } else if (this.numGuesses === 1) {
    guessesRemaining.innerHTML = "last guess! make it count!"
  }
  let clicks = 0;
  const handleClick = (div) => {
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
    }
  }
  this.board.hiddenStrands[0].map((letter, i) => {
    let div = document.createElement("div");
    div.innerHTML = letter;
    div.className = "letters";
    div.id = "topletter" + i;
    if (letter === '-') div.addEventListener("click", () => handleClick(div));
    top.appendChild(div);
  })
    this.board.hiddenStrands[1].map((letter, i) => {
    let div = document.createElement("div");
    div.innerHTML = letter;
    div.className = "letters";
    div.id = "bottomletter" + i;
    if (letter === '-') div.addEventListener("click", () => handleClick(div))
    bottom.appendChild(div);
  })
  this.board.poss.map((possible, i) => {
    let div = document.createElement("div");
    div.innerHTML = possible;
    div.className = "possibles"
    div.id = "possible" + i;
    div.addEventListener("click", () => handleClick(div))
    possible = div.innerHTML;
    pool.appendChild(div);
  })

  let submit = document.getElementById("submit")
  submit.addEventListener("click", this.handleSubmit);

}
  handleSubmit() {
    let topGuess = [];
    let bottomGuess = [];
    // change the hardcode value
    for (let i = 0; i< 6; i++){
      let letter = document.getElementById('topletter' +i).innerHTML;
      topGuess.push(letter);
    }
    for (let i = 0; i< 6; i++){
      let letter = document.getElementById('bottomletter' +i).innerHTML;
      bottomGuess.push(letter);
    }
    this.handleGuess([topGuess, bottomGuess]);
  }
  gameEnd() {
    this.gameOverDiv.className = "show-game-over"
    this.game.className = "hide-game"

    if (this.win) {
      this.gameOverDiv.innerHTML = "You did it! Click new game to play again! Or don't. I definitely get it.";
    } else {
      this.gameOverDiv.innerHTML = "Oh no, game over. Click new game to try again! Or don't. I get it.";
    }
  }
  
}

module.exports = Game;




