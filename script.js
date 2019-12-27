let startButton = document.querySelector('#start');
let quizEl = document.querySelector('.quiz');
let timerEl = document.querySelector('#time-left');
let ulEl = document.querySelector('#answers');
let questionEl = document.querySelector('#question');
let correctEl = document.querySelector('.correct');
let initialsEl = document.querySelector('#initials');
let scoreEl = document.querySelector('.score-div');
let submitEl = document.querySelector('#submit');
let scoreList = document.querySelector('.scores');
let clearScoresButton = document.querySelector('#clear-scores');

let userInfo;
let score = 0;
let questionIndex = 0;
let timeLeft = 30;
let highScores = [];
let playerResult = {};

//starts the game with no divs visible except start button
initialsEl.style.display = 'none';
scoreEl.style.display = 'none';
quizEl.style.display = 'none';
timerEl.style.display = 'none';

function highScoreList() {
    //hide submit button and display score div
    initialsEl.style.display = 'none';
    scoreEl.style.display = 'block';

    //retrieves highScore object from local storage if local storage is set
    if(localStorage.getItem("score-list") === null) {
        localStorage.setItem("score-list", JSON.stringify(score));
    }

    else {
        highScores = JSON.parse(localStorage.getItem("score-list"));
    }
    
    //add new user score and initials to highScores object
    highScores.push(playerResult);
    
    //sorts the highScores object by score value
    highScores.sort((a,b) => (a.score > b.score) ? 1 : -1);
    console.log(highScores);

    //save sorted highScores object into local storage
    localStorage.setItem("score-list", JSON.stringify(highScores));

    //create list of high scores from highest to lowest
    for(let i = highScores.length-1; i >= 0; i--) {
        let div = document.createElement('div');
        div.textContent = "player: " + highScores[i].player + " score: " + highScores[i].score;
        scoreList.appendChild(div);
    }
}

//hides quiz div and shows div to submit initials
function submitInfo() {
    quizEl.style.display = 'none';
    initialsEl.style.display = 'block';
}

function startTimer() {
    let timer = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if(timeLeft == 0) {
            clearInterval(timer);
            submitInfo();
        }
    }, 1000);
}

function nextQuestion() {
    questionEl.textContent = questions[questionIndex].title;
    for(let i = 0; i < questions[questionIndex].choices.length; i++) {
        let li = document.createElement('li');
        li.setAttribute("type", "button");
        li.textContent = questions[questionIndex].choices[i];
        ulEl.appendChild(li);
    }
}

//when user selects answer from list
ulEl.addEventListener('click', function(event) {
    ulEl.textContent = "";
    let answer = event.target;
    if(answer.textContent == questions[questionIndex].answer) {
        correctEl.textContent = "Correct!";
        score++;
    }
    else {
        correctEl.textContent = "Incorrect!";
    }
    questionIndex++;
    if(questionIndex < questions.length) {
        nextQuestion();
    }
    else {
        submitInfo();
        score = score + timeLeft;
    }
})

submitEl.addEventListener('click', function() {
    userInfo = document.querySelector('#user-info').value;

    playerResult = {
        player: userInfo, 
        score: score
    };



    highScoreList();
})

startButton.addEventListener('click', function() {
    startButton.style.display = 'none';
    quizEl.style.display = 'block';
    timerEl.style.display = 'block';
    startTimer();
})

//clear high scores out of local storage
clearScoresButton.addEventListener('click', function() {
    localStorage.setItem("score-list", 0);
    scoreList.textContent = "";
})


nextQuestion();