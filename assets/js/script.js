
var questionText = document.querySelector("#question-text");
var answersContainer = document.querySelector("#answers-container");
var answerText = document.querySelector("#answer-text");
var answer1Button = document.querySelector("#answer1-button");
var answer2Button = document.querySelector("#answer2-button");
var answer3Button = document.querySelector("#answer3-button");
var answer4Button = document.querySelector("#answer4-button");
var answerResult = document.querySelector("#answer-result");
var gameTimerTag = document.querySelector("#game-timer");
var gameOverTag = document.querySelector("#game-over-tag");
var startButtonTag = document.querySelector("#start-button");


var chosenQuestion;
var resultTimer = 1;
var gameTimer = 30;
var score = 0;
var gameOverFlag = false;

// this is the array of questions/answer objects to be asked of the user
var quizArray = [
    {
        question: "Commonly used data types DO NOT include:",
        answer1: "1. Strings",
        answer2: "2. booleans",
        answer3: "3. alerts",
        answer4: "4. numbers",
        correctAnswer: "3. alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within _____.",
        answer1: "1. quotes",
        answer2: "2. curly brackets",
        answer3: "3. parentheses",
        answer4: "4. square backets",
        correctAnswer: "3. parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        answer1: "1. numbers and strings",
        answer2: "2. other arrays",
        answer3: "3. booleans",
        answer4: "4. all of the above",
        correctAnswer: "4. all of the above"

    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        answer1: "1. commas",
        answer2: "2. curly brackets",
        answer3: "3. quotes",
        answer4: "4. parentheses",
        correctAnswer: "3. quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer1: "1. JavaScript",
        answer2: "2. terminal / bash",
        answer3: "3. for loops",
        answer4: "4. console.log",
        correctAnswer: "4. console.log"
    }
];

// clear out every tag on the screen except for those related to 
// "View Highscore" and the timer.
function clearScreen() {

    questionText.textContent = "";
    answer1Button.style.display = "none";
    answer2Button.style.display = "none";
    answer3Button.style.display = "none";
    answer4Button.style.display = "none";
    gameOverTag.textContent = "";

}

// this function runs when the site first loads
// after this the code is waiting for the user to press "Start Quiz"
function loadGame() {
    questionText.textContent = "Coding Quiz Challenge";
    answerText.textContent = "Try to answer the following code-related questions within the time limit.  Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    gameTimerTag.textContent = "Time: " + gameTimer;

    // answerText.textContent = "";
    answer1Button.style.display = "none";
    answer2Button.style.display = "none";
    answer3Button.style.display = "none";
    answer4Button.style.display = "none";
}

function enterInitials() {

    questionText.textContent = "All Done!!!";
    answerText.style.display = "block";
    answerText.textContent = "Your final score is: " + score;
    var labelTag = document.createElement("label");
    labelTag.style.fontSize = "20px";
    labelTag.textContent= "Enter initials: ";
    labelTag.style.marginTop = "20px";
    answersContainer.appendChild(labelTag);
    // labelTag.setAttribute("id", "label-tag");
    var initialsTag = document.createElement("input");
    initialsTag.setAttribute.type = "text";
    initialsTag.style.fontSize = "20px";
    initialsTag.style.marginTop = "20px";
    initialsTag.textContent= "";
    answersContainer.appendChild(initialsTag);
    initialsTag.setAttribute("id", "initials-tag");

    startButtonTag.style.display = "block";

    
    var showHighscoresTag = document.createElement("button");
    showHighscoresTag.textContent= "Show High Scores";
    answersContainer.appendChild(showHighscoresTag);
    showHighscoresTag.setAttribute("id", "show-highscores-button");



 

}


// when the game is complete, go to game over screen to see your score and
// enter your initials for the scoreboard.
function gameOver() {
    var displayGameOverTimer = 3;
    gameOverFlag = true;
  
    gameTimer = 0;
    gameTimerTag.textContent = "Time: 0";
    gameOverTag.textContent = "⚡️  Game Over!  ⚡️";

    var gameOverInterval = setInterval(function() {
        displayGameOverTimer--;
        if (displayGameOverTimer === 0) {
            clearInterval(gameOverInterval);
            displayGameOverTimer = 3;
            clearScreen();
            enterInitials();
        }
        
    }, 1000);

}



// displays "Correct!" or "Wrong!" below the question for a short 
// period of time
function displayAnswerResult(right) {

    if (right) {
        answerResult.textContent = "Correct!!! 😃";
    }
    else {
        answerResult.textContent = "Wrong! 😱";
    }

    var timerInterval = setInterval(function() {
        resultTimer--;
        if (resultTimer === 0) {
            clearInterval(timerInterval);
            resultTimer = 1;
            answerResult.textContent = "";
            displayQuestions();
        }
        
    }, 1000);
}


function startGameTimer() {
    var gameTimerInterval = setInterval(function() {
        gameTimerTag.textContent = "Time: " + gameTimer;
        gameTimer--;

        if (gameTimer <= 0) {
            gameTimerTag.textContent = "Time: " + gameTimer;
            clearInterval(gameTimerInterval);
            if (!gameOverFlag) {
                gameOver();
            }
            gameTimer = 30;
        }
    }, 1000);
}


// displays a question
// the code then waits for the user to select an answer by pressing
// one of the answer choice buttons, which fires off one of the 
// event listeners
function displayQuestions() {
    if (quizArray.length === 0) {
        console.log("⚡️  Game Over!  ⚡️");
        gameOver();
    } else {
        console.log(quizArray);
        var questionIndex = Math.floor(Math.random() * quizArray.length);
        chosenQuestion = quizArray[questionIndex];
        quizArray.splice(questionIndex, 1);
        console.log(chosenQuestion);
        console.log(quizArray);
        questionText.textContent = chosenQuestion.question;
        answer1Button.style.display = "block";
        answer2Button.style.display = "block";
        answer3Button.style.display = "block";
        answer4Button.style.display = "block";
        answer1Button.textContent = chosenQuestion.answer1;
        answer2Button.textContent = chosenQuestion.answer2;
        answer3Button.textContent = chosenQuestion.answer3;
        answer4Button.textContent = chosenQuestion.answer4;    
    }

}




function startQuiz() {
    console.log("We're ready to start the Quiz!!!");
    // clear out the tags from the game introduction
    var startButtonTag = document.querySelector("#start-button");
    startButtonTag.style.display = "none";
    answerText.style.display = "none";


    // select a question from the questionArray
    displayQuestions();

}



// This is where the code starts running
loadGame();



/* ----------------- Event Listeners Below ----------------- */



// fires when the "Start Quiz" button is pressed by the user
document.querySelector("#start-button").addEventListener("click", function() {
    console.log("Now we're cooking!");
    startGameTimer();
    startQuiz();  // start asking the questions
});


//
answer1Button.addEventListener("click", function() {
    var correctAnswer = false;
    if  (chosenQuestion.correctAnswer === chosenQuestion.answer1) {
        console.log("Correct");
        correctAnswer = true;
        score = score + 20;
    } else {
        console.log("Wrong Answer");
        correctAnswer = false;
        gameTimer = gameTimer - 10;  // lose 10 seconds for an incorrect answer
    }
    displayAnswerResult(correctAnswer);  // displays "Correct" or "Wrong" on screen
});


//
answer2Button.addEventListener("click", function() {
    var correctAnswer = false;
    if  (chosenQuestion.correctAnswer === chosenQuestion.answer2) {
        console.log("Correct");
        correctAnswer = true;
        score = score + 20;
    } else {
        console.log("Wrong Answer");
        correctAnswer = false;
        gameTimer = gameTimer - 10;  // lose 10 seconds for an incorrect answer
    }
    displayAnswerResult(correctAnswer);  // displays "Correct" or "Wrong" on screen
});


//
answer3Button.addEventListener("click", function() {
    var correctAnswer = false;
    if  (chosenQuestion.correctAnswer === chosenQuestion.answer3) {
        console.log("Correct");
        correctAnswer = true;
        score = score + 20;
    } else {
        console.log("Wrong Answer");
        correctAnswer = false;
        gameTimer = gameTimer - 10;  // lose 10 seconds for an incorrect answer
    }
    displayAnswerResult(correctAnswer);  // displays "Correct" or "Wrong" on screen
});


//
answer4Button.addEventListener("click", function() {
    var correctAnswer = false;
    if  (chosenQuestion.correctAnswer === chosenQuestion.answer4) {
        console.log("Correct");
        correctAnswer = true;
        score = score + 20;
    } else {
        console.log("Wrong Answer");
        correctAnswer = false;
        gameTimer = gameTimer - 10;  // lose 10 seconds for an incorrect answer
    }
    displayAnswerResult(correctAnswer);  // displays "Correct" or "Wrong" on screen
});
