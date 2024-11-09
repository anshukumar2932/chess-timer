document.addEventListener('DOMContentLoaded', () => {
    const whiteTimer = document.getElementById('whiteTime');
    const blackTimer = document.getElementById('blackTime');
    const whiteDiv = document.getElementById('white');
    const blackDiv = document.getElementById('black');
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');
    const stopButton = document.getElementById('stopButton');
    const resetButton = document.getElementById('resetButton');
    const timeInput = document.getElementById('timeInput');
    const moveCountDisplay = document.getElementById('moveCountDisplay');

    let whiteTimeRemaining = 0;
    let blackTimeRemaining = 0;
    let currentPlayer = 'white';
    let whiteInterval, blackInterval;
    let moveCount = 0;
    let isPaused = false;

    function startTimer() {
        if (isPaused) {
            isPaused = false;
            return;
        }

        if (currentPlayer === 'white') {
            clearInterval(blackInterval);
            whiteInterval = setInterval(() => {
                whiteTimeRemaining--;
                updateDisplay();
                if (whiteTimeRemaining <= 0) {
                    alert("Time's up! Black wins.");
                    resetGame();
                }
            }, 1000);
        } else {
            clearInterval(whiteInterval);
            blackInterval = setInterval(() => {
                blackTimeRemaining--;
                updateDisplay();
                if (blackTimeRemaining <= 0) {
                    alert("Time's up! White wins.");
                    resetGame();
                }
            }, 1000);
        }
    }

    function stopTimers() {
        clearInterval(whiteInterval);
        clearInterval(blackInterval);
    }

    function updateDisplay() {
        whiteTimer.textContent = `${whiteTimeRemaining}s`;
        blackTimer.textContent = `${blackTimeRemaining}s`;
        moveCountDisplay.textContent = `Moves: ${moveCount}`;
    }

    function switchTurn() {
        if (isPaused) return;

        stopTimers();
        currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
        whiteDiv.classList.toggle('active', currentPlayer === 'white');
        blackDiv.classList.toggle('active', currentPlayer === 'black');
        moveCount++;
        updateDisplay();
        startTimer();
    }

    function resetGame() {
        stopTimers();
        whiteTimeRemaining = parseInt(timeInput.value) || 0;
        blackTimeRemaining = parseInt(timeInput.value) || 0;
        currentPlayer = 'white';
        moveCount = 0;
        isPaused = false;
        whiteDiv.classList.add('active');
        blackDiv.classList.remove('active');
        updateDisplay();
    }

    function pauseGame() {
        if (isPaused) {
            isPaused = false;
            startTimer();
        } else {
            isPaused = true;
            stopTimers();
        }
    }

    function stopGame() {
        stopTimers();
        isPaused = true;
    }

    startButton.addEventListener('click', () => {
        whiteTimeRemaining = parseInt(timeInput.value);
        blackTimeRemaining = parseInt(timeInput.value);

        if (isNaN(whiteTimeRemaining) || whiteTimeRemaining <= 0) {
            alert("Please enter a valid time in seconds.");
            return;
        }

        resetGame();
        startTimer();
    });

    pauseButton.addEventListener('click', pauseGame);
    stopButton.addEventListener('click', stopGame);
    resetButton.addEventListener('click', resetGame);

    whiteDiv.addEventListener('click', () => {
        if (currentPlayer === 'white') switchTurn();
    });

    blackDiv.addEventListener('click', () => {
        if (currentPlayer === 'black') switchTurn();
    });
});
