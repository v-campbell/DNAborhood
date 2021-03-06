const Game = require('./lib/game');

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    const newStrand = document.getElementById("new-strand");
    // --------start game--------

    let game = new Game();
    game.runGame(); 

    // --------create try again button--------

    let tryAgainButton = document.createElement("button");
    tryAgainButton.id = "tryAgainButton"
    tryAgainButton.innerHTML = "New Game";
    
    tryAgainButton.addEventListener('click', () => {
      game.runGame();
    })
    newStrand.appendChild(tryAgainButton);

    // --------type intro--------

    let l = 0;
    let txt = "DrFranklins-MacBook-Pro: ~DNAborhood$ > Hello, my name is Dr Rosalind Franklin and I need your help! > Guess the genome seqeunce by choosing the correct nucleotides. > Hint: In DNA strands, As are paired with Ts, and Cs are paired with Gs. > ";
    let speed = 30; /* The speed/duration of the effect in milliseconds */

    let intro = document.getElementById("intro");
    function typeWriter() {
        if (l < txt.length) {
            if ((txt.charAt(l + 1) === '>')) {
                intro.innerHTML += '<br />';
            }
            intro.innerHTML += txt.charAt(l);
            l++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();



    // --------image functionality--------

}) 

