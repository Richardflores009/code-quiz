var timerEl = document.getElementById('countdown')
var startBtn = document.getElementById('start')
var questionEl = document.getElementById('question')
var pageContent = document.getElementById('page-content')
var divEl = document.getElementById("quiz");
var currentQuestion = 0
var points = 0

var finalScore = function (initialEl) {
    var LocalStore = {
        points: points,
        name: initialEl.value
    }
    localStorage.setItem("localScore", JSON.stringify(LocalStore));
    //localStorage.setItem("localInitial", localInitial)
    var savedScores = localStorage.getItem("localScore")
    savedScores = JSON.parse(savedScores);
    console.log(savedScores)
    divEl.innerHTML = ' ';
    var final = document.createElement("h2")
    divEl.appendChild(final)
    final.textContent = savedScores.name + "-" + savedScores.points
    questionEl.textContent = "High Scores"
    var goHomeEl = document.createElement("button")
    goHomeEl.textContent = "go home"
    divEl.appendChild(goHomeEl)
}

var highScore = function (initialEl, timeInterval) {

    formEl = document.createElement("form")
    initialEl = document.createElement("input")
    fButtonEl = document.createElement("button")
    ScoreEl = document.createElement("p")
    ScoreEl.textContent = "Your final score is " + points;
    formEl.appendChild(initialEl)
    console.log(fButtonEl)
    fButtonEl.setAttribute('onclick', finalScore(initialEl)); // for FF
    fButtonEl.onclick = function () { finalScore(initialEl) }; // for IE
    fButtonEl.textContent = "Submit"
    initialEl.setAttribute("type", "text")
    initialEl.setAttribute("placeholder", "Enter Initials")

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
    var timeLeft = 75;

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
        window.alert("correct answer")
        points = points + 10
        currentQuestion++
        startQuiz()
    } else {
        //timeLeft = timeLeft - 20
        currentQuestion++
        startQuiz()
    }
}


