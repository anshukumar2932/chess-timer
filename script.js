document.addEventListener('DOMContentLoaded', () => {
    const whiteDiv = document.getElementById('white');
    const blackDiv = document.getElementById('black');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const timeInput = document.getElementById('timeInput');

    let timer;
    let currentColor = 'white';
    let timeLimit = 0;

    function startTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
            alert("Time's up! You didn't click in time.");
            stopTimer();
        }, timeLimit * 60 * 1000);
    }

    function stopTimer() {
        if (timer) clearInterval(timer);
    }

    function switchColor() {
        if (currentColor === 'white') {
            currentColor = 'black';
            blackDiv.classList.add('active');
            whiteDiv.classList.remove('active');
        } else {
            currentColor = 'white';
            whiteDiv.classList.add('active');
            blackDiv.classList.remove('active');
        }
        startTimer();
    }

    whiteDiv.addEventListener('click', () => {
        if (currentColor === 'white') {
            switchColor();
        }
    });

    blackDiv.addEventListener('click', () => {
        if (currentColor === 'black') {
            switchColor();
        }
    });

    startButton.addEventListener('click', () => {
        timeLimit = parseInt(timeInput.value);
        if (isNaN(timeLimit) || timeLimit <= 0) {
            alert("Please enter a valid time in minutes.");
            return;
        }
        currentColor = 'white';
        switchColor();
    });

    stopButton.addEventListener('click', stopTimer);
});
