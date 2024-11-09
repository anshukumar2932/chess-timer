document.addEventListener('DOMContentLoaded', () => {
    const whiteDiv = document.getElementById('white');
    const blackDiv = document.getElementById('black');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const timeInput = document.getElementById('timeInput');
    const counterDisplay = document.getElementById('counterDisplay');

    let timer;
    let currentColor = 'white';
    let timeLimit = 0;
    let gameStarted = false;
    let clickCounter = 0;

    function startTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
            alert("Time's up! You didn't click in time.");
            resetGame();
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
    }

    function handleClick(color) {
        if (!gameStarted) return;

        if (color === currentColor) {
            stopTimer();
            clickCounter++;
            updateCounterDisplay();
            switchColor();
            startTimer();
        } else {
            alert("Wrong color clicked! Game over.");
            resetGame();
        }
    }

    function updateCounterDisplay() {
        counterDisplay.textContent = `Clicks: ${clickCounter}`;
    }

    function resetGame() {
        stopTimer();
        gameStarted = false;
        clickCounter = 0;
        updateCounterDisplay();
        currentColor = 'white';
        whiteDiv.classList.add('active');
        blackDiv.classList.remove('active');
    }

    startButton.addEventListener('click', () => {
        timeLimit = parseInt(timeInput.value);
        if (isNaN(timeLimit) || timeLimit <= 0) {
            alert("Please enter a valid time in minutes.");
            return;
        }
        gameStarted = true;
        clickCounter = 0;
        updateCounterDisplay();
        currentColor = 'white';
        whiteDiv.classList.add('active');
        blackDiv.classList.remove('active');
        startTimer();
    });

    stopButton.addEventListener('click', resetGame);

    whiteDiv.addEventListener('click', () => handleClick('white'));
    blackDiv.addEventListener('click', () => handleClick('black'));
});
