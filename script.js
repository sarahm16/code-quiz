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
let playerScore = document.querySelector('#you-scored');

let score = 0;
let questionIndex = 0;
let timer;
let timeLeft = 30;

//starts the game with no divs visible except start button
initialsEl.style.display = 'none';
scoreEl.style.display = 'none';
quizEl.style.display = 'none';
timerEl.style.display = 'none';

function highScoreList() {
    let highScores = [];
    let initialPlay = [{player: 0,
        score: 0
        }];

    //hide submit button and display score div
    initialsEl.style.display = 'none';
    scoreEl.style.display = 'block';

    //retrieve highScore object from local storage if local storage is set
    if(localStorage.getItem("score-list") === null) {
        localStorage.setItem("score-list", JSON.stringify(initialPlay));
    }
    else {
        highScores = JSON.parse(localStorage.getItem("score-list"));
    }

    console.log(localStorage.getItem("score-list"));
    
    //add new user score and initials to highScores object, sort by score value
    highScores.push(playerResult);
    highScores.sort((a,b) => (a.score > b.score) ? 1 : -1);

    //save sorted highScores array into local storage
    localStorage.setItem("score-list", JSON.stringify(highScores));

    //create list of high scores from highest to lowest
    for(let i = highScores.length-1; i >= 0; i--) {
        let div = document.createElement('div');
        div.setAttribute('class', 'newScore');
        div.textContent = highScores[i].player.toUpperCase() + " - score: " + highScores[i].score;
        scoreList.appendChild(div);
    }
}

//hide quiz div and show div to submit initials
function submitInfo() {
    quizEl.style.display = 'none';
    initialsEl.style.display = 'block';
}

//start timer, decrement time by 1s, and save score when player runs out of time
function startTimer() {
    timer = setInterval(function() {
        timeLeft--;
        console.log(timeLeft);
        timerEl.textContent = timeLeft;
        if(timeLeft <= 5) {
            timerEl.setAttribute('class', 'time-left low-time');
        }
        if(timeLeft == 0) {
            clearInterval(timer);
            playerScore.textContent = score;
            submitInfo();
        }
    }, 1000);
}

//change to next question and change to next set of answers
function nextQuestion() {
    questionEl.textContent = questions[questionIndex].title;
    for(let i = 0; i < questions[questionIndex].choices.length; i++) {
        let li = document.createElement('li');
        li.setAttribute("type", "button");
        li.textContent = questions[questionIndex].choices[i];
        ulEl.appendChild(li);
    }
}

//when user clicks on answer from list
ulEl.addEventListener('click', function(event) {
    ulEl.textContent = "";
    let answer = event.target;
    if(answer.textContent == questions[questionIndex].answer) {
        correctEl.setAttribute('class', 'correct');
        correctEl.textContent = "Correct!";
        score++;
    }
    else {
        correctEl.setAttribute('class', 'incorrect');
        correctEl.textContent = "Incorrect!";
    }
    questionIndex++;
    if(questionIndex < questions.length) {
        nextQuestion();
    }
    else {
        submitInfo();
        score = score + timeLeft;
        playerScore.textContent = score;
        clearInterval(timer);
    }
})

//save players initials and score when player submits initials
submitEl.addEventListener('click', function() {
    let userInfo = document.querySelector('#user-info').value;
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
    localStorage.removeItem("score-list");
    scoreList.textContent = "";
})

nextQuestion();