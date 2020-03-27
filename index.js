const Game = require('./lib/game');

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    const big = document.getElementById("big");
    const top = document.getElementById("top");
    const bottom = document.getElementById("bottom");
    const pool = document.getElementById("pool");

    root.innerHTML = "test";
    let game = new Game();
    game.runGame();

    let l = 0;
    let txt = 'DrFranklins-MacBook-Pro: ~DNAluvr$ > Hello, my name is Dr Rosalind Franklin. > I need your help! > Guess the genome seqeunce by choosing the correct nucleotides. >';
    let speed = 30; /* The speed/duration of the effect in milliseconds */

    function typeWriter() {
        if (l < txt.length) {
            if ((txt.charAt(l + 1) === '>')) {
                document.getElementById("intro").innerHTML += '<br />';
            }
            document.getElementById("intro").innerHTML += txt.charAt(l);
            l++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();

    let guessesRemaining = document.getElementById("guesses");
    guessesRemaining.innerHTML = game.numGuesses + " guesses left";

    let clicks = 0;
    let topGuess = game.board.hiddenTopStrand
    let bottomGuess = game.board.hiddenBottomStrand
    
    game.board.hiddenTopStrand.map((letter, i) => {
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

    game.board.hiddenBottomStrand.map((letter, i) => {
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


    game.board.hiddenLetters.map((possible, i) => {
        let div = document.createElement("div");
        div.innerHTML = possible.charAt(0);
        div.className = "possibles"
        div.id = "possible" + i;
        div.addEventListener("click", () => {
            if (clicks === 0) {
                div.className += " selected"
                clicks += 1
            } else if (div.className.includes("possibles")){
                let selected = document.getElementsByClassName("selected").item(0);
                selected.className = selected.className.replace(" selected", "");
                div.className += " selected";
            }           
        })
        possible = div.innerHTML;
        console.log(possible, i)
        pool.appendChild(div);
    })

    let submit = document.getElementById("submit")
    submit.addEventListener("click", () => {
        game.receiveGuess([topGuess, bottomGuess]);
    });
}) 