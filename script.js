let startButton = document.querySelector('#start');
let quizEl = document.querySelector('.quiz');
let timerEl = document.querySelector('#time-left');
let ulEl = document.querySelector('#answers');
let questionEl = document.querySelector('#question');
let correctEl = document.querySelector('.correct');
let initialsEl = document.querySelector('#initials');
let scoreEl = document.querySelector('.high-scores');
let submitEl = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;
let timeLeft = 10;

initialsEl.style.display = 'none';
scoreEl.style.display = 'none';
quizEl.style.display = 'none';
timerEl.style.display = 'none';

function highScore() {
    initialsEl.style.display = 'none';
    scoreEl.style.display = 'block';
}

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
    if(questionIndex == questions.length) {
        submitInfo();
    }
    console.log(timeLeft);
    nextQuestion();
})

submitEl.addEventListener('click', function() {
    initialsEl.style.display = 'none';
    scoreEl.style.display = 'block';
})

startButton.addEventListener('click', function() {
    startButton.style.display = 'none';
    quizEl.style.display = 'block';
    timerEl.style.display = 'block';
    startTimer();
})


nextQuestion();