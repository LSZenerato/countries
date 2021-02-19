const menu_el = document.getElementById("menu");
const scenario_el = document.getElementById("scenario-div");
const background_el = document.getElementById("background");
const timer_el = document.getElementById("timer");
const score_el = document.getElementById("score");
const accuracy_el = document.getElementById("accuracy");
const shootSound_el = new Audio("../../assets/gun-gunshot-02.mp3");
const missSound_el = new Audio("../../assets/gun-gunshot-miss.mp3");
const hitSound_el = new Audio("../../assets/gun-gunshot-hit.mp3");
const victorySound_el = new Audio("../../assets/victory.mp3");
const looseSound_el = new Audio("../../assets/loose.mp3");
const unstoppable_el = new Audio("../../assets/unstoppable.mp3");
const dominating_el = new Audio("../../assets/dominating.mp3");
const godlike_el = new Audio("../../assets/godlike.mp3");
const minSize = 60;
const maxSize = 100;
const victoryLimit = 80;
const score_multiplier = 100;
let playStatus = false;
let timer;
let total_clicks;
let hit_points;
let total_score;
let score_sequence;
let accuracy_score;

timer_el.textContent = "Timer: 60s";
score_el.textContent = "Score: 0";
accuracy_el.textContent = "Accuracy: 100.0%";

function initParameters() {
    timer = 60;
    total_clicks = 0;
    hit_points = 0;
    score_sequence = 0;
    total_score = 0;
}

menu_el.addEventListener("click", () => {
    initParameters();
    play();
});

function play() {
    playStatus = true;
    menu_el.style.visibility = "hidden";
    initTarget();
    initTarget();
    initTarget();
    generalEffects();
}

function stop() {
    playStatus = false;
    menu_el.style.visibility = "visible";
    document.querySelectorAll("#target").forEach(item => item.remove());
    if(accuracy_score >= victoryLimit) {
        victorySound_el.play()
    } else {
        looseSound_el.play()
    }
    initParameters();
}

function initTarget() {
    const randomSize = Math.floor((Math.random() * maxSize) + minSize);
    const width = window.innerWidth - randomSize;
    const height = window.innerHeight - randomSize;
    const randomLeft = Math.floor(Math.random() * width);
    const randomTop = Math.floor(Math.random() * height);
    const target = document.createElement("div");
    target.style.width = randomSize;
    target.style.height = randomSize;
    target.style.left = randomLeft;
    target.style.top = randomTop;
    target.style.borderRadius = randomSize;
    target.setAttribute("id", "target");
    target.addEventListener("click", (event) => hit(event, target));

    scenario_el.appendChild(target);
}

function hit(event, target) {
    hit_points++;
    score_sequence++;
    total_score += score_sequence * score_multiplier;
    score_el.textContent = "Score: " + total_score;
    accuracyCalc();

    hitSound_el.pause()
    hitSound_el.currentTime = 0;
    hitSound_el.volume = 0.5;
    hitSound_el.playbackRate = 1.5;
    hitSound_el.play();

    switch (score_sequence) {
        case 15:
            unstoppable_el.play()
            break;
        case 25:
            dominating_el.play()
            break;
        case 40:
            godlike_el.play()
            break;
    
        default:
            break;
    }

    let x = event.x - 20;
    let y = event.y - 20;
    hitMarcker(x, y, "shoot");

    target.remove();
    initTarget();
}

function miss(event) {
    score_sequence = 0;
    accuracyCalc();

    missSound_el.pause();
    missSound_el.currentTime = 0;
    missSound_el.volume = 0.2;
    missSound_el.playbackRate = 1;
    missSound_el.play();
    let x = event.x - 10;
    let y = event.y - 10;
    hitMarcker(x, y, "missed");
}

function generalEffects() {
    document.addEventListener("click", () => {
        if(playStatus) {
            shootSound_el.playbackRate = 2;
            shootSound_el.play();
        }
    });
    background_el.addEventListener("click", (event) =>{ 
        if(playStatus) {
            miss(event)
        }
    });
    let timerInterval = setInterval(() => {
        timer--;
        timer_el.textContent = "Timer: " + timer + "s";
        if(timer === 0) {
            clearInterval(timerInterval);
            stop();
        };
    }, 1000)
}

function accuracyCalc() {
    total_clicks++;
    accuracy_score = (hit_points/total_clicks) * 100;
    accuracy_el.textContent = "Accuracy: " + accuracy_score.toFixed(1) + "%";
}

function hitMarcker(x, y, type) {
    let positionX = x;
    let positionY = y;
    let click = document.createElement("div");
    click.setAttribute("id", type);
    click.style.left = positionX;
    click.style.top = positionY;

    scenario_el.appendChild(click);
    
    setTimeout(() => scenario_el.removeChild(click), 1000);
}