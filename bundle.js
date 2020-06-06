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
    game.runGame();
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

var STRANDLENGTH = 6;
var NUMHIDDEN = 4;
var nucleotides = "ATCG";

var Board = /*#__PURE__*/function () {
  function Board() {
    _classCallCheck(this, Board);

    this.strands = [];
    this.hiddenStrands = [];
    this.poss = [];
    this.setupStrands();
    this.hideStrands();
  }

  _createClass(Board, [{
    key: "setupStrands",
    value: function setupStrands() {
      var topStrand = [];
      var bottomStrand = [];

      for (var i = 0; i < STRANDLENGTH; i++) {
        topStrand[i] = nucleotides[Math.floor(Math.random() * nucleotides.length)];
      }

      for (var j = 0; j < STRANDLENGTH; j++) {
        if (topStrand[j] === "A") bottomStrand[j] = "T";
        if (topStrand[j] === "T") bottomStrand[j] = "A";
        if (topStrand[j] === "C") bottomStrand[j] = "G";
        if (topStrand[j] === "G") bottomStrand[j] = "C";
      }

      this.strands = [topStrand, bottomStrand];
    }
  }, {
    key: "hideStrands",
    value: function hideStrands() {
      var _this = this;

      var helper = function helper(strand) {
        var randomNums = [];
        var newStrand = strand.slice();

        while (randomNums.length < NUMHIDDEN) {
          var randomNum = Math.floor(Math.random() * STRANDLENGTH);

          if (randomNums.indexOf(randomNum) === -1) {
            randomNums.push(randomNum);

            _this.poss.push(newStrand[randomNum]);

            newStrand[randomNum] = "-";
          }
        }

        return newStrand;
      };

      this.hiddenStrands = [helper(this.strands[0]), helper(this.strands[1])];
      this.shufflePoss();
    }
  }, {
    key: "shufflePoss",
    value: function shufflePoss() {
      for (var i = this.poss.length - 1; i > 0; i -= 1) {
        var j = Math.floor(Math.random() * (i + 1));
        var _ref = [this.poss[j], this.poss[i]];
        this.poss[i] = _ref[0];
        this.poss[j] = _ref[1];
      }
    }
  }, {
    key: "receiveGuess",
    value: function receiveGuess(guess) {
      var win = true;

      for (var i = 0; i < 2; i++) {
        for (var j = 0; j < STRANDLENGTH; j++) {
          if (this.hiddenStrands[i][j] === '-') {
            if (this.strands[i][j] === guess[i][j]) {
              // this.poss[this.poss.indexOf(guess[i][j])] = "-";
              this.poss.splice(this.poss.indexOf(guess[i][j]), 1);
            } else {
              guess[i][j] = "-";
              win = false;
            }
          }
        }
      }

      this.hiddenStrands = guess;
      return win;
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

var Board = __webpack_require__(/*! ./board */ "./lib/board.js");

var Game = /*#__PURE__*/function () {
  function Game() {
    _classCallCheck(this, Game);

    this.board = new Board();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.gameOverDiv = document.getElementById("gameover");
    this.game = document.getElementById("game");
  }

  _createClass(Game, [{
    key: "runGame",
    value: function runGame() {
      this.board = new Board();
      this.numGuesses = 4;
      this.win = false;
      this.printBoard();
      this.gameOverDiv.className = "hide-game-over";
      this.game.className = "show-game";
    }
  }, {
    key: "handleGuess",
    value: function handleGuess(guess) {
      this.win = this.board.receiveGuess(guess);
      this.numGuesses--;
      this.printBoard();
      if (this.win || this.numGuesses < 1) this.gameEnd();
    }
  }, {
    key: "printBoard",
    value: function printBoard() {
      var guessesRemaining = document.getElementById("guesses");
      var top = document.getElementById("top");
      var bottom = document.getElementById("bottom");
      var pool = document.getElementById("pool");
      top.innerHTML = "";
      bottom.innerHTML = "";
      pool.innerHTML = "";

      if (this.numGuesses === 4) {
        guessesRemaining.innerHTML = this.numGuesses + " guesses left";
      } else if (this.numGuesses === 3) {
        guessesRemaining.innerHTML = "only " + this.numGuesses + " guesses left";
      } else if (this.numGuesses === 2) {
        guessesRemaining.innerHTML = "now only " + this.numGuesses + " guesses left";
      } else if (this.numGuesses === 1) {
        guessesRemaining.innerHTML = "last guess! make it count!";
      }

      var clicks = 0;

      var handleClick = function handleClick(div) {
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
        }
      };

      this.board.hiddenStrands[0].map(function (letter, i) {
        var div = document.createElement("div");
        div.innerHTML = letter;
        div.className = "letters";
        div.id = "topletter" + i;
        if (letter === '-') div.addEventListener("click", function () {
          return handleClick(div);
        });
        top.appendChild(div);
      });
      this.board.hiddenStrands[1].map(function (letter, i) {
        var div = document.createElement("div");
        div.innerHTML = letter;
        div.className = "letters";
        div.id = "bottomletter" + i;
        if (letter === '-') div.addEventListener("click", function () {
          return handleClick(div);
        });
        bottom.appendChild(div);
      });
      this.board.poss.map(function (possible, i) {
        var div = document.createElement("div");
        div.innerHTML = possible;
        div.className = "possibles";
        div.id = "possible" + i;
        div.addEventListener("click", function () {
          return handleClick(div);
        });
        possible = div.innerHTML;
        pool.appendChild(div);
      });
      var submit = document.getElementById("submit");
      submit.addEventListener("click", this.handleSubmit);
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit() {
      var topGuess = [];
      var bottomGuess = []; // change the hardcode value

      for (var i = 0; i < 6; i++) {
        var letter = document.getElementById('topletter' + i).innerHTML;
        topGuess.push(letter);
      }

      for (var _i = 0; _i < 6; _i++) {
        var _letter = document.getElementById('bottomletter' + _i).innerHTML;
        bottomGuess.push(_letter);
      }

      this.handleGuess([topGuess, bottomGuess]);
    }
  }, {
    key: "gameEnd",
    value: function gameEnd() {
      this.gameOverDiv.className = "show-game-over";
      this.game.className = "hide-game";

      if (this.win) {
        this.gameOverDiv.innerHTML = "You did it! Click new game to play again! Or don't. I definitely get it.";
      } else {
        this.gameOverDiv.innerHTML = "Oh no, game over. Click new game to try again! Or don't. I get it.";
      }
    }
  }]);

  return Game;
}();

module.exports = Game;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map