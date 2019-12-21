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
let correctEl = document.querySelector('.correct');

let score = 0;
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
        alert('all done');
    }
    console.log(questionIndex);
    nextQuestion();
})

startButton.addEventListener('click', function() {
    startButton.style.display = 'none';
    quizEl.style.display = 'block';
    timerEl.style.display = 'block';
    startTimer();
})

nextQuestion();