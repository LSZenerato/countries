const playbutton = document.getElementById("playbutton");
const score = document.getElementById("score");
let gameStart = false;
let pontuation = 0;

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key === "ArrowUp" && gameStart) {
        jump()
    }

    if (key === "ArrowDown" && gameStart) {
        down()
    }
    
    if (key === "Enter" && !gameStart) {
        startGame()
    }
});

function jump() {
    if(dino.classList != "jump") {
        dino.classList.add("jump");

        setTimeout(() => dino.classList.remove('jump'), 300);
    }
}

function down() {
    if(dino.classList != "down") {
        dino.classList.remove('jump');
        dino.classList.add("down");

        setTimeout(() => dino.classList.remove('down'), 300);
    }
}

function startGame() {
    pontuation = 0;
    gameStart = true;

    playbutton.style.visibility = "hidden";
    let game = document.getElementById("game");
    let dino = document.createElement("div");
    let cactus = document.createElement("div");
    cactus.setAttribute("id", "cactus");
    dino.setAttribute("id", "dino");

    game.appendChild(dino);
    game.appendChild(cactus);
    start();
}

function start() {
    const dino = document.getElementById("dino");
    const cactus = document.getElementById("cactus");

    let interval = setInterval(function() {
        let dinoTop = parseInt(window.getComputedStyle(dino).top);
        let cactusLeft = parseInt(window.getComputedStyle(cactus).left);

        //conditiions
        let conditionDino = dinoTop >= 25;
        let conditionCactus = cactusLeft < 70 && cactusLeft > 45;

        //detect collision
        if(conditionDino && conditionCactus) {
            clearInterval(interval);
            restartGame(dino, cactus);
        }

        pontuation++;
        score.textContent = "Score: " + pontuation;
    }, 10);
}

function restartGame(dino, cactus) {
    playbutton.style.visibility = "visible";
    cactus.remove();
    dino.remove();
    gameStart = false;
}