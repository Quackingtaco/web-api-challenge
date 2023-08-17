// Variable list
var score = 0;
var container = document.querySelector("#container");
var quizContent = document.querySelector("#quizContent");
var questionTitle = document.querySelector("#qTitle")
var timer = document.querySelector("#timer");
var startBtn = document.querySelector("#start");

// Quiz questions
var questions = [
    {
        title: "A for loop is an example of what kind of coding? ",
        choices: ["HTML", "CSS", "Javascript", "Flash"],
        answer: "Javascript"
    },
    {
        title: "What is an array?",
        choices: ["Tic-tac-toe", "a true false statement", "a loop", "a collection of variables"],
        answer: "a collection of variables"
    },
    {
        title: "Which of the following HTML tags would give a line break?",
        choices: ["< b >", "< br >", "< i >", "< html >"],
        answer: "< br >"
    },
    {
        title: "What would you use to format a header?",
        choices: ["CSS", "Javascript", "Web API", "A search engine"],
        answer: "CSS"
    }
];

// Question list and time variables
var questionArray = 0;
var createUl = document.createElement("ul");
createUl.setAttribute("id", "optionsUl")
var timeInterval = 0;
var countdown = 60;
var penalty = 5;
var i = 0;

// Function to begin quiz
startBtn.addEventListener("click", function() {
    if (timeInterval === 0) {
        timeInterval = setInterval(function() {
            countdown--;
            timer.textContent = "Time Remaining: " + countdown;
            if (countdown <= 0) {
                clearInterval(timeInterval);
                quizComplete();
            }
        }, 1000);
    }
    anotherQuestion(questionArray)
});

// Function to display questions and answer choices
function anotherQuestion(questionArray) {
    quizContent.innerHTML = "";
    createUl.innerHTML = "";
    var displayQuestion = document.createElement("h2");

    for (var i = 0; i < questions.length; i++) {
        displayQuestion.innerHTML = questions[questionArray].title;
        var displayChoices = questions[questionArray].choices;
        quizContent.appendChild(displayQuestion);
    }

    displayChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.innerHTML += "<button>" + newItem + "</button>";
        quizContent.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (checkAnswer));
    })
}

// Variables for next question button
var newDiv = document.createElement("div");
newDiv.setAttribute("id", "newDiv");

// Function to check for correct answer
function checkAnswer(event) {
        var choice = event.target;
        quizContent.appendChild(newDiv);
        var next = document.createElement("button");
        next.setAttribute("id", "nextButton");
        next.textContent = "Next Question";

// If correct move to next question
    if (choice.textContent == questions[questionArray].answer) {
        score++;
        newDiv.appendChild(next);
        next.addEventListener("click", (nextQuestion));

// If incorrect time is deducted until correct answer chosen
    } else {
        countdown = countdown - penalty;
    }
}

// Function for moving to next question or ending quiz
function nextQuestion(event) {
    newDiv.innerHTML = "";
    questionArray++;
    if (questionArray >= questions.length) {
        quizComplete();
    } 
    else { anotherQuestion(questionArray);
    } 
}

// Function for end of quiz
function quizComplete() {
    quizContent.innerHTML = "";
    timer.innerHTML = "";
    var newH1 = document.createElement("h1");
    newH1.setAttribute("id", "newH1");
    newH1.textContent = "All done!"
    quizContent.appendChild(newH1);

// Score calculation
    if (countdown >= 0) {
        score = countdown;
        clearInterval(timeInterval);
        var newP = document.createElement("p");
        newP.textContent = "Your final score is: " + score;
        quizContent.appendChild(newP);
    } 
    // If time runs out
    else {
        score = 0;
        var outOfTime = document.createElement("h2");
        outOfTime.textContent = "You ran out of time!";
        quizContent.appendChild(outOfTime);
        var newP = document.createElement("p");
        newP.textContent = "Your final score is: " + score;
        quizContent.appendChild(newP);
    }

// Text box for initials and submission
    var initials = document.createElement("label");
    initials.setAttribute("for", "inputBox");
    initials.textContent = "Enter your initials here: ";
    quizContent.appendChild(initials);

    var inputBox = document.createElement("input");
    inputBox.setAttribute("type", "text");
    inputBox.setAttribute("id", "inputBox")  
    inputBox.textContent = "";
    quizContent.appendChild(inputBox)
    
    var submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "submit");
    submit.textContent = "Submit";
    quizContent.appendChild(submit);

// Event listener for storing scores
    submit.addEventListener("click", function() {
        var initials = inputBox.value;
        if (initials === "") {
            window.alert("Please enter your initials");
        } 
        else {
            var finalScore = {
                initials: initials,
                score: score
            }

// Variable for storing scores
        var storeScores = localStorage.getItem("storeScores");
            if (storeScores === null) {
                storeScores = [];
            } 
            else {
                storeScores = JSON.parse(storeScores);
            }
        storeScores.push(finalScore);
        var newScore = JSON.stringify(storeScores);
        localStorage.setItem("storeScores", newScore);
        window.location.replace("highscores.html");
        }
    });
};