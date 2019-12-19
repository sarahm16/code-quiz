//grab elements from index.html
//prompt user to start quiz
//start the timer when prompt==confirm
//display question 1. userAnswer = event.target
//add click event to change to next question when answer = button
    //if userAnswer[i]=answer[i] displaymessage correct!

//click on answer => i++

// h1.textContent = questions title i

//function that switches question when user presses button?

//set attribute of list items to button

let startButton = document.querySelector('#start');
let quizEl = document.querySelector('.wrapper');
let timerEl = document.querySelector('#timer');

quizEl.style.display = 'none';
timerEl.style.display = 'none';

startButton.addEventListener('click', function() {
    startButton.style.display = 'none';
    quizEl.style.display = 'block';
    timerEl.style.display = 'block';
})