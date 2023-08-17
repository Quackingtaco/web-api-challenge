// Variable list
var scoreContainer = document.querySelector("#quizContent");
var highScores = document.querySelector("#displayScores");
var backButton = document.querySelector("#back");
var clearButton = document.querySelector("#clear");
var storeScores = localStorage.getItem("storeScores");
storeScores = JSON.parse(storeScores);
    if (storeScores !== null) {
        for (var i = 0; i < storeScores.length; i++) {
            var addScore = document.createElement("li");
            addScore.setAttribute("id", "scoreList");
            addScore.textContent = storeScores[i].initials + " " + storeScores[i].score;
            highScores.appendChild(addScore);
        }
};


// Event listener for returning to quiz
backButton.addEventListener("click", function() {
    window.location.replace("quackingtaco.github.io/web-api-challenge/index.html");
});

// Event listener for clearing scores
clearButton.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});