
var questionText = document.querySelector("#question-text");
var answersContainer = document.querySelector("#answers-container");
var answerText = document.querySelector("#answer-text");
var answer1Button = document.querySelector("#answer1-button");
var answer2Button = document.querySelector("#answer2-button");
var answer3Button = document.querySelector("#answer3-button");
var answer4Button = document.querySelector("#answer4-button");
var answerResult = document.querySelector("#answer-result");
var gameTimerTag = document.querySelector("#game-timer");


var chosenQuestion;
var resultTimer = 1;
var gameTimer = 30;
var score = 0;

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

// this function runs when the site first loads
// after this the code is waiting for the user to press "Start Quiz"
function loadGame() {
    questionText.textContent = "Coding Quiz Challenge";
    answerText.textContent = "Try to answer the following code-related questions within the time limit.  Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    var tag = document.createElement("button");
    tag.textContent= "Start Quiz";
    answersContainer.appendChild(tag);
    tag.setAttribute("id", "start-button");
    gameTimerTag.textContent = "Time: " + gameTimer;

    // answerText.textContent = "";
    answer1Button.style.display = "none";
    answer2Button.style.display = "none";
    answer3Button.style.display = "none";
    answer4Button.style.display = "none";
}


// displays "Correct!" or "Wrong!" below the question for a short 
// period of time
function displayAnswerResult(right) {

    if (right) {
        answerResult.textContent = "Correct!!! 😃"
    }
    else {
        answerResult.textContent = "Wrong! 😱"
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


        if (gameTimer === 0) {
            gameTimerTag.textContent = "Time: " + gameTimer;
            clearInterval(gameTimerInterval);
            gameOver();
        }



    }, 1000);
}



// when the game is complete, go to game over screen to see your score and
// enter your initials for the scoreboard.
function gameOver() {
    console.log("Game Over!")
}


// displays a question
// the code then waits for the user to select an answer by pressing
// one of the answer choice buttons, which fires off one of the 
// event listeners
function displayQuestions() {
    if (quizArray.length === 0) {
        console.log("Game Over!");
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
    startButtonTag.remove();
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
    } else {
        console.log("Wrong Answer");
        correctAnswer = false;
    }
    displayAnswerResult(correctAnswer);  // displays "Correct" or "Wrong" on screen
});


//
answer2Button.addEventListener("click", function() {
    var correctAnswer = false;
    if  (chosenQuestion.correctAnswer === chosenQuestion.answer2) {
        console.log("Correct");
        correctAnswer = true;
    } else {
        console.log("Wrong Answer");
        correctAnswer = false;
    }
    displayAnswerResult(correctAnswer);  // displays "Correct" or "Wrong" on screen
});


//
answer3Button.addEventListener("click", function() {
    var correctAnswer = false;
    if  (chosenQuestion.correctAnswer === chosenQuestion.answer3) {
        console.log("Correct");
        correctAnswer = true;
    } else {
        console.log("Wrong Answer");
        correctAnswer = false;
    }
    displayAnswerResult(correctAnswer);  // displays "Correct" or "Wrong" on screen
});


//
answer4Button.addEventListener("click", function() {
    var correctAnswer = false;
    if  (chosenQuestion.correctAnswer === chosenQuestion.answer4) {
        console.log("Correct");
        correctAnswer = true;
    } else {
        console.log("Wrong Answer");
        correctAnswer = false;
    }
    displayAnswerResult(correctAnswer);  // displays "Correct" or "Wrong" on screen
});
