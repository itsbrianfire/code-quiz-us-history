var timer = document.getElementById('timer');
var timeRemaining = 100;
let interval;

const startBtn = document.getElementById('start-button');
const questionContainer = document.getElementById('question-container');
const quizQuestions = document.getElementById('quizQuestions');
const answerChoices = document.getElementById('answerOptions');
let currentQ, rearrange;

const userScore = document.getElementById('userScore');
let score = document.getElementById('score');
var initials = document.getElementById('initials');

const submit = document.getElementById('submit');

startBtn.addEventListener('click', quizInitiate);

function quizInitiate() {
    countdown();
    startBtn.classList.add('hide');
    questionContainer.classList.remove('hide');
    rearrange = questions.sort(()=> Math.random()- .5);
    currentQ = 0;
    nextQ();
}

function countdown() {
    interval = setInterval(function () {
        if (timeRemaining >1) {
            timer.textContent = timeRemaining + 'seconds remaining';
            timeRemaining -- ;
        } else if (timeRemaining === 1) {
            timer.textContent = timeRemaining + ' second remaining';
            timeRemaining--;
        } else {
            timer.textContent = 'Game Over';
            clearInterval(interval);
            gameEnd();   
        }
    }, 1000);
}

function nextQ() {
    reset();
    showQuestion(rearrange[currentQ]);
}

function showQuestion(question) {
    quizQuestions.innerText=question.question;
    question.answers.forEach(answers => {
        const button = document.createElement('button')
        button.innerText = answers.text;
        button.classList.add('btn');
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerChoices.appendChild(button);
    })
}

function reset() {
    while (answerChoices.firstChild) {
        answerChoices.removeChild
        (answerChoices.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatus(document.body, correct);
    Array.from(answerChoices.children).forEach(button => {
        setStatus(button, button.dataset.correct);
    })

    if (rearrange.length > currentQ + 1) {
        currentQ++
        setTimeout(nextQ, 500);   
    } else {
        gameEnd()
    }
}

function setStatus(element, correct){
    clearStatus(element);
    if(correct) {
        element.classList.add('correct')
        
    } else {
        element.classList.add('incorrect');
        timeRemaining --;
        timer.textContent = timeRemaining;
    }
}

function clearStatus(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

const questions = [
    {
        question: 'Whcih year was President JFK was born in?',
        answers: [
            {text: '1917', correct: true},
            {text: '1918', correct: false},
            {text: '1912', correct: false},
            {text: '1916', correct: false}
        ]
    },
    {
        question: 'The Bretton Woods system of monetary management established the rules for commercial and financial relations among the United States, Canada, Western European countries, Australia, and Japan. The Bretton Woods system required countries to guarantee convertibility of their currencies into US dollars. Which year did this take place?',
        answers: [
            {text: '1948', correct: false},
            {text: '1944', correct: true},
            {text: '1945', correct: false},
            {text: '1950', correct: false}
        ]
    },

    {
        question: 'After an assaination attempt in 1912, former President , Teddy Roosevelt would go on to give his campaign speech with a bullet lodged in his chest and live. In which year did President Teddy Roosevelt actually pass away?',
        answers: [
            {text: '1913', correct: false},
            {text: '1919', correct: true},
            {text: '1925', correct: false},
            {text: '1931', correct: false}
        ]
    },
    {
        question: 'What year did the Korean War officially end?',
        answers: [
            {text: '1950', correct: false},
            {text: '1951', correct: false},
            {text: '1952', correct: false},
            {text: `It's still ongoing`, correct: true}
        ]
    },
    {
        question: 'When was the US taken off the gold standard? In otherwords, in which year was the US dollar no longer backed by gold?',
        answers: [
            {text: '1945', correct: false},
            {text: '1971', correct: true},
            {text: '1999', correct: false},
            {text: `It's still backed by gold`, correct: false}
        ]
    }
]

function gameEnd() {
    clearInterval(interval);
    score.innerHTML = 'Your Score is ' + (timeRemaining) + '!';
    questionContainer.classList.add('hide');
    userScore.classList.remove('hide');
}

submit.addEventListener('click', function(event) {
    event.preventDefault();
    var userScore = {
        initials: initials.value.trim(),
        score: timeRemaining
    };
    
    localStorage.setItem('initials',JSON.stringify(userScore));
    
    saveScore();
});

function saveScore() {
    score.textContent = `Saved! Click 'High Scores' to view your score! :)`;
}