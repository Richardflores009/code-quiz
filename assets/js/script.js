//window.reload()
var timerEl = document.getElementById('countdown')
var startBtn = document.getElementById('start')
var questionEl = document.getElementById('question')
var pageContent = document.getElementById('page-content')
var divEl = document.getElementById("quiz");
var initialEl = document.getElementById("input")
var viewHs = document.getElementById("highscore")
var formEl = document.createElement("form")
var initialEl = document.createElement("input")
var fButtonEl = document.createElement("button")
var ScoreEl = document.createElement("p")
var final = document.createElement("ul")
var goHomeEl = document.createElement("button")
var clearEl = document.createElement("button")
var currentQuestion = 0
var points = 0

viewHs.setAttribute("onclick", "window.location.assign(finalScore(initialEl))")

var finalScore = function (initialEl) {
    divEl.innerHTML = ' ';
    var newScore = {
        points: points,
        name: initialEl.value
    }

    var scoresArray = JSON.parse(localStorage.getItem("highScores"))
    if (scoresArray == null) {
        scoresArray = []
    }
    console.log(scoresArray)
    scoresArray.push(newScore)
    localStorage.setItem("highScores", JSON.stringify(scoresArray));
    final.innerHTML = '';
    //localStorage.setItem("localInitial", localInitial)
    for (var i = 0; i < scoresArray.length; i++) {
        final.innerHTML += `<li id="final-hi-id">${scoresArray[i].name} - ${scoresArray[i].points}</li>`
    }

    questionEl.textContent = "High Scores"
    goHomeEl.textContent = "go home"
    clearEl.textContent = "Clear High Scores"
    goHomeEl.setAttribute("id", "home-bt-id")
    goHomeEl.setAttribute("onclick", "location.reload();")
    clearEl.setAttribute("id", "home-bt-id")
    clearEl.setAttribute("onclick", "localStorage.clear();")
    divEl.appendChild(final)
    divEl.appendChild(goHomeEl)
    divEl.appendChild(clearEl)


}

var highScore = function () {

    ScoreEl.textContent = "Your final score is " + points;
    ScoreEl.setAttribute("id", "score-id")
    formEl.appendChild(initialEl)
    console.log(fButtonEl)
    //fButtonEl.setAttribute('onclick', finalScore(initialEl)); // for FF
    fButtonEl.onclick = function () { finalScore(initialEl) }; // for IE
    fButtonEl.textContent = "Submit"
    fButtonEl.setAttribute("id", "submit-id")
    initialEl.setAttribute("type", "text")
    initialEl.setAttribute("placeholder", "Enter Initials")
    initialEl.setAttribute("id", "form-id")
    divEl.appendChild(ScoreEl)
    divEl.appendChild(formEl)
    divEl.appendChild(fButtonEl)

}

var myQuestions = [
    {
        question: "How do you spell JavaScript?",
        answers: ["jflksjf", "javapip", "JavaScript", "poody"],
        correctAnswer: 2
    },
    {
        question: "question 2",
        answers: ["1", "2", "true", "4"],
        correctAnswer: 2
    },
    {
        question: "question 3",
        answers: ["1", "2", "3", "true"],
        correctAnswer: 3
    },
    {
        question: "question 4",
        answers: ["1", "2", "true", "4"],
        correctAnswer: 2
    },
    {
        question: "All Done",
        answers: ''
    },

]

function countdown() {
    var timeLeft = 5;

    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {

        if (timeLeft > 1) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else if (myQuestions[currentQuestion].question === "All Done") {
            clearInterval(timeInterval)
        } else if (timeLeft === 0) {
            questionEl.textContent = 'You are a failure';
            divEl.innerHTML = '';
            clearInterval(timeInterval)
            return highScore()
            //setTimeout(countdown(), 3000);
        } else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
        }
    }, 1000);
    startQuiz()
}
startBtn.onclick = countdown;


var showQuestion = function (answerInd) {
    //select at least one answer
    //loop through the object


    if (myQuestions[currentQuestion].correctAnswer == answerInd) {
        currentQuestion++
        startQuiz()
    } else {
        currentQuestion++
        startQuiz()
        window.alert("nonono")
    }

}


var startQuiz = function () {
    var quest = myQuestions[currentQuestion].question;
    var currentAns = myQuestions[currentQuestion].answers;
    var ulEl = document.createElement("ul");

    divEl.innerHTML = '';
    console.log(currentAns)
    for (var i = 0; i < currentAns.length; i++) {
        if (i < currentAns.length) {
            // generate list and button
            var liEl = document.createElement("li")
            var buttonEl = document.createElement("button")
            // set buttons text to current answers
            buttonEl.textContent = currentAns[i];
            //set value of button to the index of the answer
            buttonEl.setAttribute("value", i)
            buttonEl.setAttribute("id", "answer-id")
            // connect button to list and list to unordered list
            liEl.appendChild(buttonEl);
            ulEl.appendChild(liEl);
            buttonEl.onclick = buttonClick
        }

    };

    if (quest === "All Done") {
        highScore()
    }

    divEl.appendChild(ulEl)

    questionEl.textContent = quest

};

var buttonClick = function () {
    // check value of element
    // var val = buttonEl.getAttribute("value")
    console.log(myQuestions[currentQuestion].correctAnswer)
    if (this.value === myQuestions[currentQuestion].correctAnswer.toString()) {
        points = points + 10
        currentQuestion++
        startQuiz()
    } else {
        //timeLeft = timeLeft - 20
        currentQuestion++
        startQuiz()
    }
}

//buttonEl.addEventListener("submit", finalScore);



