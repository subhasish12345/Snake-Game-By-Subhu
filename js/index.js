//game variables and constants
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("/items/eat.mp3");
const gameOverSound = new Audio("/items/gameOver.mp3");
const moveSound = new Audio('/items/move.mp3');
const musicSound = new Audio("/items/gameBg.mp3");
let speed = 9;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
food = { x: 6, y: 7 };

//GAME FUNCTIONS
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < (1 / speed)) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //AGAR KHUD SE TAKKAR MAR DE TO
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    //AGAR DIWAL ME GHUS GYE TO
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;

}

function gameEngine() {

    //UPDATING SNAKE ARR AND VARIABLES

    if (isCollide(snakeArr)) {
        gameOverSound.play();
        moveSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game over , press any key to play again");
        snakeArr = [{ x: 13, y: 15 }]
        musicSound.play();
        score = 0;
    }

    //IF YOU HAVE EATEN THE FOOD , INCREMENT THE SCORE AND REGENRATE THE FOOD
    if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Current score : " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //MOVING THE SNAKE
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //DISPLAY THE SNAKE
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);
    });

    //DISPLAY THE FOOD
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}
// Mobile controls
document.getElementById('up').addEventListener('click', () => {
    inputDir = { x: 0, y: -1 }; // Move up
    moveSound.play();
});

document.getElementById('down').addEventListener('click', () => {
    inputDir = { x: 0, y: 1 }; // Move down
    moveSound.play();
});

document.getElementById('left').addEventListener('click', () => {
    inputDir = { x: -1, y: 0 }; // Move left
    moveSound.play();
});

document.getElementById('right').addEventListener('click', () => {
    inputDir = { x: 1, y: 0 }; // Move right
    moveSound.play();
});


//MAIN LOGIC

musicSound.play();
let hiscore = localStorage.getItem('hiscore');

if (hiscore == null) {
    hiscoreval = 0;
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //start the game
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
            console.log("Up");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
        case "s":
        case "S":
            console.log("Down");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
        case "a":
        case "A":
            console.log("Left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
        case "d":
        case "D":
            console.log("Right");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    } 
});
