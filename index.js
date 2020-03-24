const Game = require('./src/game');

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    root.innerHTML = "test";
    let game = new Game();
    game.runGame();

    root.innerHTML += game.board.strands;
}) 