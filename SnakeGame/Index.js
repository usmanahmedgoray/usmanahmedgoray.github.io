// Game Constant & Variable

let direction = { x: 0, y: 0 };
const foodSound = new Audio("Material/food.mp3");
const gameOverSound = new Audio("Material/gameover.mp3");
const moveSound = new Audio("Material/move.mp3");
const musicSound = new Audio("Material/music.mp3");
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 12, y: 13 }];
let food = { x: 13, y: 15 };
let inputDir = { x: 0, y: 0 };
let updatedScore;

// Game Function
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    } else {
        lastPaintTime = ctime;
    }
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }

    }
    // If you bump into walls of the board
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;

    }
}

function gameEngine() {
    // Part 1 : Updating the snake array & Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over, Press any key to play Again!");
        snakeArr = [{ x: 12, y: 13 }];
        // musicSound.play();
        score = 0;
    }
    // If you have eaten the food , increament the score and regenrate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        // Score
        score += 1;
        scoreBox.innerHTML = "Score : " + score;
        if (score > highScoreVal) {
            highScoreVal = score;
            localStorage.setItem('highScoreBox', JSON.stringify(highScoreVal));
            highScoreBox.innerHTML = 'High Score : ' + highScoreVal;
        }


        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        });
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        };
    }

    // Move the Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i] };
    }
    snakeArr[0].x = snakeArr[0].x + inputDir.x;
    snakeArr[0].y = snakeArr[0].y + inputDir.y;

    // Part 2 : Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("Snake");
        }
        board.appendChild(snakeElement);
    });
    // Display the Food
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = food.y;
    snakeElement.style.gridColumnStart = food.x;
    snakeElement.classList.add("food");
    board.appendChild(snakeElement);
}

// Main Logic Here
let highScoreBox = localStorage.getItem('highScoreBox');
if (highScoreBox === null) {
    highScoreVal = 0;
    localStorage.setItem('highScoreBox', JSON.stringify(highScoreVal))
} else {
    highScoreVal = JSON.parse(highScoreBox);
    highScoreBox.innerHTML = 'High Score : ' + highScoreBox;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 1 }; //Start the game
    moveSound.play();
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});