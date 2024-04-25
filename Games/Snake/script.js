const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i")

let gameOver = false;

let foodX, foodY;
let snakeX = 5, snakeY = 10;

let snakeBody = [];
let velocityX = 0, velocityY = 0;

let setIntervalId;

let score = 0;

// getting high score from storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;



const changeFoodPosition = () => {
    // Random pos for food (0-30)
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;

}


const handleGameOver = () => {
    // clearing the timer and reloading page

    clearInterval(setIntervalId);
    alert("Game Over!! press OK to start again...");
    location.reload()

}

const changeDirection = (e) =>{

    // changing velocity based on key press

    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    initGame();

}

controls.forEach(key =>{
    //passing the click event to the change direction method
    key.addEventListener("click", () => changeDirection({key: key.dataset.key}));
})

const initGame = () => {
    if(gameOver) return handleGameOver();

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // check if snake has hit food
    if(snakeX  === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++; // increment score by 1
        
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);

        scoreElement.innerText = `Score: ${score}`; // updating score in html#
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    for (let i = snakeBody.length -1; i > 0; i--) {
        // shifting forward the values of the elements in the snake body by bone
        snakeBody[i] = snakeBody[i -1];
        
    }


    snakeBody[0] = [snakeX, snakeY];  // setting first box to snakes current position

    // update snake head position
    snakeX += velocityX;
    snakeY += velocityY;


// check if snake in valid bounds
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30 ){
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        // adding a div box for each part of the body
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;     
        }
        
    }

    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
setIntervalId = setInterval(initGame, 150);
document.addEventListener("keydown", changeDirection);

13.51           