    // heading where the questions will be displayed
var questionText = document.querySelector("#question-text");
    // paragraph tag where answers will be displayed
var answerText = document.querySelector("#answer-text");
    // button to click for selecting answer #1
var answer1Button = document.querySelector("#answer1-button");
    // button to click for selecting answer #2
var answer2Button = document.querySelector("#answer2-button");
    // button to click for selecting answer #3
var answer3Button = document.querySelector("#answer3-button");
    // button to click for selecting answer #4
var answer4Button = document.querySelector("#answer4-button");
    // p tag where "Correct" or "Wrong" is displayed after an answer is chosen
var answerResult = document.querySelector("#answer-result");
    // p tag where the game timer is displayed (upper right corner)
var gameTimerTag = document.querySelector("#game-timer");
    // h3 tag where "Game Over" is displayed when either the timer expires or the users has gone through all of the questions
var gameOverTag = document.querySelector("#game-over-tag");
    // button tag, when clicked, starts the game going.
var startButtonTag = document.querySelector("#start-button");
    // label tag for input field allowing user to enter initials for the High Score list
var initialsLabel = document.querySelector("#initials-label");
    // input field where the user can enter their initials for the high score list
var initialsInput = document.querySelector("#initials-input");
    // button that submits the user's initials for the high score list
var initialsInputButton = document.querySelector("#initials-input-button");
    // link in upper left corner that takes a user to the high scores list
var showHighscoresButton = document.querySelector("#view-highscores");
    // this div is used when the table holding the high scores is built.
var highScoresDiv = document.querySelector("#high-scores-div");
    // button to allow the user to erase all of the high scores from the screen and local storage
var eraseHighscoresButton = document.querySelector("#erase-highscores-button");

var playerHighscores = [];  // array of key values (player initials and scores)
var highscore;              // users initials / score object to be inserted in player high scores array

var chosenQuestion;         // question that's pulled out of the question array to be presented to the user
var resultTimer = 1;        // used in showing "Correct" or "Wrong" a user answers a question
var gameTimer = 30;         // game countdown timer
var score = 0;              // user's score
var gameOverFlag = false;   // flag used to stop the timer if player answers all of the questions before time's up

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
    },
    {
        question: "What Document method can be used to return the first element within the document that matches the specified selector, or group of selectors?",
        answer1: "1. document.querySelector()",
        answer2: "2. document.style()",
        answer3: "3. console.log",
        answer4: "4. document--",
        correctAnswer: "1. document.querySelector()"
    },
    {
        question: "What string method is used to select a character from within a string?",
        answer1: "1. charAt()",
        answer2: "2. substr()",
        answer3: "3. length",
        answer4: "4. slice()",
        correctAnswer: "1. charAt()"
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


// pull any high scores from local storage
function getHighscoresFromStorage() {
    var storedHighscores = JSON.parse(localStorage.getItem("highscores"));

    if (playerHighscores !== null) {
        playerHighscores = storedHighscores;
    }
    else {
        playerHighscores = [];
    }
}



// this function runs when the site first loads
// after this the code is waiting for the user to press "Start Quiz"
function loadGame() {
    getHighscoresFromStorage();
    questionText.textContent = "Coding Quiz Challenge";
    answerText.textContent = "Try to answer the following code-related questions within the time limit.  Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    gameTimerTag.textContent = "Time: " + gameTimer;

    eraseHighscoresButton.style.display = "none";
    answer1Button.style.display = "none";
    answer2Button.style.display = "none";
    answer3Button.style.display = "none";
    answer4Button.style.display = "none";
}


// displays the screen for the user to enter their initials at the end of the game
function enterInitials() {
    questionText.textContent = "All Done!!!";
    answerText.style.display = "block";
    answerText.textContent = "Your final score is: " + score;
    initialsLabel.style.display = "inline";
    initialsInput.style.display = "inline";
    initialsInputButton.style.display = "inline";
}


// when the game is complete, "Game Over" is displayed on the screen
// for a few seconds.  Then the user is navigated to enter their initials
function gameOver() {
    var displayGameOverTimer = 2;
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
// period of time (one second)
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
            if (!gameOverFlag) {
                displayQuestions();
            }
        }
    }, 1000);
}


// sets up the game timer, starts it going, and updates the timer 
// display every second
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
        }
    }, 1000);
}


// displays a question chosen at random from the array of questions/answers
// the code then waits for the user to select an answer by pressing
// one of the answer choice buttons, which fires off one of the 
// answer event listeners
function displayQuestions() {
    if (quizArray.length === 0) {
        gameOver();
    } else {
        var questionIndex = Math.floor(Math.random() * quizArray.length);

        showHighscoresButton.style.visibility = "hidden";
        chosenQuestion = quizArray[questionIndex];
        quizArray.splice(questionIndex, 1);
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



// called when the "Start Quiz" button is clicked (event listenter)
// clears the opening screen and displays the first question
function startQuiz() {
    // clear out the tags from the game introduction
    clearScreen();
    score = 0;
    // document.querySelector("table").remove();
    var startButtonTag = document.querySelector("#start-button");
    eraseHighscoresButton.style.display = "none";
    startButtonTag.style.display = "none";
    answerText.style.display = "none";
    initialsLabel.style.display = "none";
    initialsInput.style.display = "none";
    gameOverFlag = false;

    // select a question from the questionArray
    displayQuestions();
}


// Adds the user's score to the high scores array and then writes
// the updated list to local storage
function saveHighscore() {
    highscore = {
        playerInitials: initialsInput.value,
        playerScore: score
    }

    // adding to the empty array required initialization
    if (playerHighscores == null) {
        playerHighscores = [{ playerInitials: initialsInput.value,
                              playerScore: score}];
    } else {
        playerHighscores.push(highscore);
    }

    // ** Still need to sort the high scores    
    localStorage.setItem("highscores", JSON.stringify(playerHighscores));

}


// clears the screen and displays the high scores screen
function showHighscores() {
    // set up the High Scores screen
    questionText.textContent = "High Scores";
    answerText.style.display = "none";
    showHighscoresButton.style.visibility = "hidden";

    // build a table to display the high scores
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var row, cell1, cell2, cell1Text, cell2Text;
    if (playerHighscores != null) {
        for (i = 0; i < playerHighscores.length; i++) {
            row = document.createElement("tr");
            cell1 = document.createElement("td");
            cell1Text = document.createTextNode(playerHighscores[i].playerInitials);
            cell2 = document.createElement("td");
            cell2Text = document.createTextNode(playerHighscores[i].playerScore);
            cell1.appendChild(cell1Text);
            row.appendChild(cell1);
            cell2.appendChild(cell2Text);
            cell2.style.textAlign = "right";
            row.appendChild(cell2);
            tbl.style.marginBottom = "20px";
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        highScoresDiv.appendChild(tbl);
        cell1.style.columnWidth = "200px";
        cell2.style.columnWidth = "20px";
        tbl.style.fontSize = "20px";  
        tbl.setAttribute("id", "highscore-table");
    } else if (document.querySelectorAll("table")) {
        document.querySelectorAll("#highscore-table").remove;
    }
    // add "Erase High Scores" button
    eraseHighscoresButton.style.display = "block";

    // make the "Start Quiz" button visible so user can play again
    startButtonTag.style.display = "block";
}



// --------->> This is where the code starts running <<---------
loadGame();
// --------->> This is where the code starts running <<---------


/* --------------------------------------------------------- */
/* ----------------- Event Listeners Below ----------------- */
/* --------------------------------------------------------- */


// fires when the "Start Quiz" button is clicked by the user
document.querySelector("#start-button").addEventListener("click", function() {
    if (gameOverFlag) {
        location.reload();
    }
    gameTimer = 30;
    startGameTimer();
    startQuiz();  // start asking the questions
});


// fires when the user clicks on the 1st answer in the list
// compares the answer chosen by the user to the correct answer
// and calls displayAnswerResult() to show "Correct" or "Wrong"
// decrements the clock by 10 seconds if the answer is wrong
// adds 10 points to the score if the answer is right
answer1Button.addEventListener("click", function() {
    var correctAnswer = false;
    if  (chosenQuestion.correctAnswer === chosenQuestion.answer1) {
        correctAnswer = true;
        score = score + 10;
    } else {
        correctAnswer = false;
        gameTimer = gameTimer - 10;  // lose 10 seconds for an incorrect answer
    }
    displayAnswerResult(correctAnswer);  // displays "Correct" or "Wrong" on screen
});


// fires when the user clicks on the 2nd answer in the list
// compares the answer chosen by the user to the correct answer
// and calls displayAnswerResult() to show "Correct" or "Wrong"
// decrements the clock by 10 seconds if the answer is wrong
// adds 10 points to the score if the answer is right
answer2Button.addEventListener("click", function() {
    var correctAnswer = false;
    if  (chosenQuestion.correctAnswer === chosenQuestion.answer2) {
        correctAnswer = true;
        score = score + 10;
    } else {
        correctAnswer = false;
        gameTimer = gameTimer - 10;  // lose 10 seconds for an incorrect answer
    }
    displayAnswerResult(correctAnswer);  // displays "Correct" or "Wrong" on screen
});


/// fires when the user clicks on the 3rd answer in the list
// compares the answer chosen by the user to the correct answer
// and calls displayAnswerResult() to show "Correct" or "Wrong"
// decrements the clock by 10 seconds if the answer is wrong
// adds 10 points to the score if the answer is right
answer3Button.addEventListener("click", function() {
    var correctAnswer = false;
    if  (chosenQuestion.correctAnswer === chosenQuestion.answer3) {
        correctAnswer = true;
        score = score + 10;
    } else {
        correctAnswer = false;
        gameTimer = gameTimer - 10;  // lose 10 seconds for an incorrect answer
    }
    displayAnswerResult(correctAnswer);  // displays "Correct" or "Wrong" on screen
});


// fires when the user clicks on the 4th answer in the list
// compares the answer chosen by the user to the correct answer
// and calls displayAnswerResult() to show "Correct" or "Wrong"
// decrements the clock by 10 seconds if the answer is wrong
// adds 10 points to the score if the answer is right
answer4Button.addEventListener("click", function() {
    var correctAnswer = false;
    if  (chosenQuestion.correctAnswer === chosenQuestion.answer4) {
        correctAnswer = true;
        score = score + 10;
    } else {
        correctAnswer = false;
        gameTimer = gameTimer - 10;  // lose 10 seconds for an incorrect answer
    }
    displayAnswerResult(correctAnswer);  // displays "Correct" or "Wrong" on screen
});


// fires when the user clicks on the "View Highscores" link
// at the top of the page.  displays the high scores list
showHighscoresButton.addEventListener("click", function() {
    showHighscores(); 
});


// fires when the user clicks the submit button to store the user's 
// initials on the "Highscores page". 
// calls saveHighscore to save the user's score to local storage
// call showHighscores() to display the list of high scores
initialsInputButton.addEventListener("click", function() {
    saveHighscore();

    // remove enter initials stuff from screen
    questionText.textContent = "";
    answerText.style.display = "none";
    answerText.textContent = "";
    initialsLabel.style.display = "none";
    initialsInput.style.display = "none";
    initialsInput.textContent = "";
    initialsInputButton.style.display = "none";
    
    showHighscores();
});


// fires when the user clicks the "Erase Highscores" button
// clears out local storage and the high scores array (playerHighscores)
eraseHighscoresButton.addEventListener("click", function() {
    window.localStorage.clear();
    playerHighscores = null;
    document.querySelector("#highscore-table").remove();
    showHighscores();
});

