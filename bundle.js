/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(/*! ./lib/game */ "./lib/game.js");

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById("root");
  var newStrand = document.getElementById("new-strand"); // --------start game--------

  var game = new Game();
  game.runGame(); // --------create try again button--------

  var tryAgainButton = document.createElement("button");
  tryAgainButton.id = "tryAgainButton";
  tryAgainButton.innerHTML = "New Game";
  tryAgainButton.addEventListener('click', function () {
    game.runGame(); //   console.log('is the console running? WE GOTTA BE IN HERE')
    //   tryAgainButton.innerHTML = "no worky"
  });
  newStrand.appendChild(tryAgainButton); // --------type intro--------

  var l = 0;
  var txt = "DrFranklins-MacBook-Pro: ~DNAborhood$ > Hello, my name is Dr Rosalind Franklin and I need your help! > Guess the genome seqeunce by choosing the correct nucleotides. > Hint: In DNA strands, As are paired with Ts, and Cs are paired with Gs. > ";
  var speed = 30;
  /* The speed/duration of the effect in milliseconds */

  var intro = document.getElementById("intro");

  function typeWriter() {
    if (l < txt.length) {
      if (txt.charAt(l + 1) === '>') {
        intro.innerHTML += '<br />';
      }

      intro.innerHTML += txt.charAt(l);
      l++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter(); // --------image functionality--------
});

/***/ }),

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Board = /*#__PURE__*/function () {
  function Board() {
    _classCallCheck(this, Board);

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
    this.gameOver = false; // this.m = 3;
    // this.nucleotides = ["A", "T", "C", "G"]
  }

  _createClass(Board, [{
    key: "runBoard",
    value: function runBoard() {
      this.numGuesses = 4;
      this.setupStrands(6);
      this.hideStrands();
      this.createPossibles();
    }
  }, {
    key: "setupStrands",
    value: function setupStrands() {
      var nucleotides = "ATCG"; //generate random topStrand

      for (var i = 0; i < this.strandLength; i++) {
        this.topStrand[i] = nucleotides[Math.floor(Math.random() * nucleotides.length)];
      } //generate bottomStrand based on topStrand


      for (var j = 0; j < this.strandLength; j++) {
        if (this.topStrand[j] === "A") this.bottomStrand[j] = "T";
        if (this.topStrand[j] === "T") this.bottomStrand[j] = "A";
        if (this.topStrand[j] === "C") this.bottomStrand[j] = "G";
        if (this.topStrand[j] === "G") this.bottomStrand[j] = "C";
      }

      this.strands = [this.topStrand, this.bottomStrand];
    }
  }, {
    key: "hideRandomStrands",
    value: function hideRandomStrands(strand) {
      var randomNums = [];
      var newStrand = strand.slice();
      newStrand = newStrand.map(function (letter) {
        return letter = letter + "X";
      });

      while (randomNums.length < this.hidden) {
        var randomNum = Math.floor(Math.random() * this.strandLength);

        if (randomNums.indexOf(randomNum) === -1) {
          randomNums.push(randomNum);
          this.hiddenLetters.push(newStrand[randomNum]);
          newStrand[randomNum] = "-";
        }
      }

      return newStrand;
    } // findPrepopulated() {
    //   this.prepopulated = this.hiddenLetters.filter(letter => letter !== "-");
    //   this.prepopulated.map(letter => {
    //     letter = "X" + letter;
    //   })
    //   return this.prepopulated;
    // }

  }, {
    key: "hideStrands",
    value: function hideStrands() {
      this.hiddenTopStrand = this.hideRandomStrands(this.topStrand);
      this.hiddenBottomStrand = this.hideRandomStrands(this.bottomStrand);
      this.hiddenStrands = [this.hiddenTopStrand, this.hiddenBottomStrand];
    }
  }, {
    key: "createPossibles",
    value: function createPossibles() {
      // shuffle the strands's characters to put into possibles array
      for (var i = this.hiddenLetters.length - 1; i > 0; i -= 1) {
        var j = Math.floor(Math.random() * (i + 1));
        var _ref = [this.hiddenLetters[j], this.hiddenLetters[i]];
        this.hiddenLetters[i] = _ref[0];
        this.hiddenLetters[j] = _ref[1];
      }

      return this.hiddenLetters;
    }
  }, {
    key: "printBoard",
    value: function printBoard() {
      var guessesRemaining = document.getElementById("guesses");
      var top = document.getElementById("top");
      var bottom = document.getElementById("bottom");
      var pool = document.getElementById("pool"); // debugger

      top.innerHTML = "";
      bottom.innerHTML = "";
      pool.innerHTML = "";
      guessesRemaining.innerHTML = this.numGuesses + " guesses left";
      var clicks = 0;
      var topGuess = this.hiddenTopStrand;
      var bottomGuess = this.hiddenBottomStrand;
      this.hiddenTopStrand.map(function (letter, i) {
        var div = document.createElement("div");
        if (letter.length > 1) div.innerHTML = letter.charAt(0);
        if (letter.length === 1) div.innerHTML = letter;
        div.className = "letters";
        div.id = "topletter" + i;
        div.addEventListener("click", function () {
          if (clicks === 0) {
            div.className += " selected";
            clicks += 1;
          } else {
            var selected = document.getElementsByClassName("selected").item(0);
            selected.className = selected.className.replace(" selected", "");
            var temp = div.innerHTML;
            div.innerHTML = selected.innerHTML;
            selected.innerHTML = temp;
            clicks = 0;
            topGuess[i] = div.innerHTML;
          }
        });
        console.log(letter, i);
        top.appendChild(div);
      });
      this.hiddenBottomStrand.map(function (letter, i) {
        var div = document.createElement("div");
        if (letter.length > 1) div.innerHTML = letter.charAt(0);
        if (letter.length === 1) div.innerHTML = letter;
        div.className = "letters";
        div.id = "bottomletter" + i;
        div.addEventListener("click", function () {
          if (clicks === 0) {
            div.className += " selected";
            clicks += 1;
          } else {
            var selected = document.getElementsByClassName("selected").item(0);
            selected.className = selected.className.replace(" selected", "");
            var temp = div.innerHTML;
            div.innerHTML = selected.innerHTML;
            selected.innerHTML = temp;
            clicks = 0;
            bottomGuess[i] = div.innerHTML;
          }
        }); // letter = div.innerHTML;

        console.log(letter, i);
        bottom.appendChild(div);
      });
      this.hiddenLetters.map(function (possible, i) {
        var div = document.createElement("div");
        div.innerHTML = possible.charAt(0);
        div.className = "possibles";
        div.id = "possible" + i;
        div.addEventListener("click", function () {
          if (clicks === 0) {
            div.className += " selected";
            clicks += 1;
          } else if (div.className.includes("possibles")) {
            var selected = document.getElementsByClassName("selected").item(0);
            selected.className = selected.className.replace(" selected", "");
            div.className += " selected";
          }
        });
        possible = div.innerHTML; // console.log(possible, i)

        pool.appendChild(div);
      });
      this.submit();
    }
  }, {
    key: "submit",
    value: function submit() {
      var _this = this;

      var topGuess = this.hiddenTopStrand;
      var bottomGuess = this.hiddenBottomStrand;
      var submit = document.getElementById("submit");
      submit.addEventListener("click", function () {
        _this.receiveGuess([topGuess, bottomGuess]);
      });
    }
  }, {
    key: "receiveGuess",
    value: function receiveGuess(guess) {
      this.match = true;

      for (var i = 0; i < 2; i++) {
        // debugger
        for (var j = 0; j < this.strandLength; j++) {
          // don't touch prepopulated values
          if (guess[i][j].charAt(1) !== "X") {
            // if incorrect (ie "A" !== "CX".charAt(0) or "-X")
            if (this.strands[i][j] !== guess[i][j]) {
              guess[i][j] = "-";
              this.match = false;
            } else {
              // if correct, remove the 1st instance of the correctly guessed nucleotide from possibles
              if (guess[i][j] === this.strands[i][j]) {
                var y = this.hiddenLetters.indexOf(guess[i][j] + "X");
                this.tempPool[y] = "-";
                guess[i][j] += "X";
              }
            }
          }
        }
      }

      this.updateFrontendAfterGuess(guess);
    }
  }, {
    key: "updateFrontendAfterGuess",
    value: function updateFrontendAfterGuess(guess) {
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
          guess[0].map(function (letter, i) {
            var topDiv = document.getElementById("topletter" + i);
            topDiv.innerHTML = letter.charAt(0);
          }); // re-show bottom

          guess[1].map(function (letter, i) {
            var bottomDiv = document.getElementById("bottomletter" + i);
            bottomDiv.innerHTML = letter.charAt(0);
          }); // re-show possibles

          this.tempPool.map(function (letter, i) {
            var possible = document.getElementById("possible" + i);
            possible.innerHTML = letter.charAt(0);
          });
        }

        ;
      }

      var guessesRemaining = document.getElementById("guesses");
      if (this.numGuesses > 0) guessesRemaining.innerHTML = this.numGuesses + " guesses left";
    }
  }, {
    key: "gameEnd",
    value: function gameEnd() {
      var gameOverDiv = document.getElementById("gameover");
      gameOverDiv.className = "show-game-over";
      var game = document.getElementById("game");
      game.className = "hide-game";

      if (this.win) {
        gameOverDiv.innerHTML = "You did it! Click new game to play again, since you're sooo good at this!";
      } else {
        gameOverDiv.innerHTML = "Uh oh, you ran out of guesses :( Click new game to try again! Unless you don't think you're good enough...";
      }
    }
  }]);

  return Board;
}();

module.exports = Board;

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Board = __webpack_require__(/*! ./board */ "./lib/board.js"); // const Timer = require('./timer');


var Game = /*#__PURE__*/function () {
  function Game() {
    _classCallCheck(this, Game);

    this.board = new Board(); // this.hoveredCount = 3;
  }

  _createClass(Game, [{
    key: "runGame",
    value: function runGame() {
      this.board = new Board();
      this.match = true;
      this.win = false;
      this.tempPool = this.board.hiddenLetters;
      this.numGuesses = 4;
      this.board.runBoard();
      var gameOverDiv = document.getElementById("gameover");
      gameOverDiv.className = "hide-game-over";
      var game = document.getElementById("game");
      game.className = "show-game";
      this.board.printBoard(); // let hint = document.getElementById("hint-content");
      // hint.onmouseover = this.counter();
    } //   counter() {
    //     let hint = document.getElementById("hint-content");
    //     const facts = ['Whole Genome Sequencing is critical in the development of vaccines, and for increasing the power of molecular epidemiology.', 'Fact 2', 'Fact 3', 'Fact 4'];
    //     this.hoveredCount = (this.hoveredCount + 1) % facts.length;
    //     hint.innerHTML = facts[this.hoveredCount];
    // } 

  }]);

  return Game;
}();

module.exports = Game;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map