var scores = document.getElementById('scores');

function finalHighScore() {
    var initials = JSON.parse(localStorage.getItem('initials'));
    const scoreList = document.createElement('li');
    scoreList.innerText = initials.initials + ' - ' + initials.score;
    scores.appendChild(scoreList);
}
finalHighScore();