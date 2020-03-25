const Game = require('./lib/game');

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    const big = document.getElementById("big");
    const grid = document.getElementById("grid");
    const pool = document.getElementById("pool");
    root.innerHTML = "test";
    let game = new Game();
    game.runGame();

    // big.innerHTML += game.board.strands;
    // let selected = document.createElement("div");
    // selected.innerHTML = "-";

    let clicks = 0;
    let topGuess = game.board.hiddenTopStrand
    let bottomGuess = game.board.hiddenBottomStrand
    
    game.board.hiddenTopStrand.map((letter, i) => {
        let div = document.createElement("div");
        div.innerHTML = letter;
        div.className = "letters"
        div.id = "topletter" + i;
        div.addEventListener("click", () => {
            if (clicks === 0) {
                div.className += " selected"
                clicks += 1
            } else {
                // debugger
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
        grid.appendChild(div);
    })

    game.board.hiddenBottomStrand.map((letter, i) => {
        let div = document.createElement("div");
        div.innerHTML = letter;
        div.className = "letters"
        div.id = "bottomletter" + i;
        div.addEventListener("click", () => {
            if (clicks === 0) {
                div.className += " selected"
                clicks += 1
            } else {
                // debugger
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
        grid.appendChild(div);
    })


    game.board.hiddenLetters.map((possible, i) => {
        let div = document.createElement("div");
        div.innerHTML = possible;
        div.className = "possibles"
        div.id = "possible" + i;
        div.addEventListener("click", () => {
            if (clicks === 0) {
                div.className += " selected"
                clicks += 1
            } else if (div.className.includes("possibles")){
                let selected = document.getElementsByClassName("selected").item(0);
                selected.className = selected.className.replace(" selected", "")
                div.className += " selected"
            }
           
        })
        possible = div.innerHTML;
        pool.appendChild(div)
    })

    let submit = document.createElement("button");
    submit.innerHTML = "Submit"
    submit.addEventListener("click", () => {
        game.receiveGuess([topGuess, bottomGuess]);
    });
    big.appendChild(submit)


    let guessesRemaining = document.createElement("div");
    guessesRemaining.innerHTML = game.numGuesses;
    big.appendChild(guessesRemaining);
}) 