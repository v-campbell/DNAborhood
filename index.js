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
    tryAgainButton.innerHTML = "New Strand";
    
    tryAgainButton.addEventListener('click', () => {
      game.runGame();
    //   console.log('is the console running? WE GOTTA BE IN HERE')
    //   tryAgainButton.innerHTML = "no worky"
    })
    newStrand.appendChild(tryAgainButton);

    // --------type intro--------

    let l = 0;
    let txt = 'DrFranklins-MacBook-Pro: ~DNAborhood$ > Hello, my name is Dr Rosalind Franklin. > I need your help! > Guess the genome seqeunce by choosing the correct nucleotides. > ';
    let speed = 30; /* The speed/duration of the effect in milliseconds */

    const intro = document.getElementById("intro");
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