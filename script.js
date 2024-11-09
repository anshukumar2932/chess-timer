document.addEventListener('DOMContentLoaded', () => {
    const whiteTimer = document.getElementById('whiteTime');
    const blackTimer = document.getElementById('blackTime');
    const whiteDiv = document.getElementById('white');
    const blackDiv = document.getElementById('black');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const timeInput = document.getElementById('timeInput');

    let whiteTimeRemaining = 0;
    let blackTimeRemaining = 0;
    let currentPlayer = 'white';
    let whiteInterval, blackInterval;

    function startTimer() {
        console.log("Starting timer for:", currentPlayer);

        if (currentPlayer === 'white') {
            clearInterval(blackInterval); // Ensure black timer is stopped
            whiteInterval = setInterval(() => {
                whiteTimeRemaining--;
                updateDisplay();
                if (whiteTimeRemaining <= 0) {
                    alert("Time's up! Black wins.");
                    resetGame();
                }
            }, 1000);
        } else {
            clearInterval(whiteInterval); // Ensure white timer is stopped
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
        console.log("Stopping both timers");
        clearInterval(whiteInterval);
        clearInterval(blackInterval);
    }

    function updateDisplay() {
        whiteTimer.textContent = `${whiteTimeRemaining}s`;
        blackTimer.textContent = `${blackTimeRemaining}s`;
    }

    function switchTurn() {
        console.log("Switching turn from:", currentPlayer);
        stopTimers();
        currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
        whiteDiv.classList.toggle('active', currentPlayer === 'white');
        blackDiv.classList.toggle('active', currentPlayer === 'black');
        startTimer();
    }

    function resetGame() {
        console.log("Resetting game");
        stopTimers();
        whiteTimeRemaining = parseInt(timeInput.value) || 0;
        blackTimeRemaining = parseInt(timeInput.value) || 0;
        currentPlayer = 'white';
        whiteDiv.classList.add('active');
        blackDiv.classList.remove('active');
        updateDisplay();
    }

    startButton.addEventListener('click', () => {
        console.log("Start button clicked");
        whiteTimeRemaining = parseInt(timeInput.value);
        blackTimeRemaining = parseInt(timeInput.value);

        if (isNaN(whiteTimeRemaining) || whiteTimeRemaining <= 0) {
            alert("Please enter a valid time in seconds.");
            return;
        }

        resetGame();
        startTimer();
    });

    resetButton.addEventListener('click', resetGame);

    whiteDiv.addEventListener('click', () => {
        if (currentPlayer === 'white') switchTurn();
    });

    blackDiv.addEventListener('click', () => {
        if (currentPlayer === 'black') switchTurn();
    });
});
