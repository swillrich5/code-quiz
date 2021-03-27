
var questionText = document.querySelector("#question-text");
var answersContainer = document.querySelector("#answers-container");
var answerText = document.querySelector("#answer-text");
var answer1Button = document.querySelector("#answer1-button");
var answer2Button = document.querySelector("#answer2-button");
var answer3Button = document.querySelector("#answer3-button");
var answer4Button = document.querySelector("#answer4-button");

var chosenQuestion;

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
        question: "The condition in and if / else statement is enclosed within _____",
        answer1: "1. quotes",
        answer2: "2. curly brackets",
        answer3: "3. parenthesis",
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
function loadGame() {
    questionText.textContent = "Coding Quiz Challenge";
    answerText.textContent = "Try to answer the following code-related questions within the time limit.  Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    var tag = document.createElement("button");
    tag.textContent= "Start Quiz";
    answersContainer.appendChild(tag);
    tag.setAttribute("id", "start-button");

    // answerText.textContent = "";
    answer1Button.style.display = "none";
    answer2Button.style.display = "none";
    answer3Button.style.display = "none";
    answer4Button.style.display = "none";
}


// displays the question
function displayQuestion() {
    if (quizArray.length === 0) {
        console.log("Game Over!");
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
    displayQuestion();
    
}

loadGame();



document.querySelector("#start-button").addEventListener("click", function() {
    console.log("Now we're cooking!");
    startQuiz();  // start asking the questions
});


answer1Button.addEventListener("click", function() {
    if  (chosenQuestion.correctAnswer === chosenQuestion.answer1) {
        console.log("Correct");
    } else {
        console.log("Wrong Answer");
    }
    displayQuestion();
});

answer2Button.addEventListener("click", function() {
    if  (chosenQuestion.correctAnswer === chosenQuestion.answer2) {
        console.log("Correct");
    } else {
        console.log("Wrong Answer");
    }
    displayQuestion();
});

answer3Button.addEventListener("click", function() {
    if  (chosenQuestion.correctAnswer === chosenQuestion.answer3) {
        console.log("Correct");
    } else {
        console.log("Wrong Answer");
    }
    displayQuestion();
});

answer4Button.addEventListener("click", function() {
    if  (chosenQuestion.correctAnswer === chosenQuestion.answer4) {
        console.log("Correct");
    } else {
        console.log("Wrong Answer");
    }
    displayQuestion();
});