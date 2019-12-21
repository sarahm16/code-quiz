//grab elements from index.html
//prompt user to start quiz
//start the timer when prompt==confirm
//display question 1. userAnswer = event.target
//add click event to change to next question when answer = button
    //if userAnswer[i]=answer[i] displaymessage correct!



let startButton = document.querySelector('#start');
let quizEl = document.querySelector('.wrapper');
let timerEl = document.querySelector('#time-left');
let ulEl = document.querySelector('#answers');
let questionEl = document.querySelector('#question');

let questionIndex = 0;
let timer = 10;

quizEl.style.display = 'none';
timerEl.style.display = 'none';

function startTimer() {
    setInterval(function() {
        timer--;
        timerEl.textContent = timer;
    }, 1000);
}

function nextQuestion() {
    questionEl.textContent = questions[questionIndex].title;
    for(let i = 0; i < 4; i++) {
        let li = document.createElement('button');
        li.textContent = questions[questionIndex].choices[i];
        ulEl.appendChild(li);
        console.log(li);
    }
    questionIndex++;
}

ulEl.addEventListener('click', function() {
    ulEl.textContent = "";
    nextQuestion();
})

startButton.addEventListener('click', function() {
    startButton.style.display = 'none';
    quizEl.style.display = 'block';
    timerEl.style.display = 'block';
    startTimer();
    nextQuestion();
})

ulEl.addEventListener('click', function(event) {
    let target = event.target;

})