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

    const timeDifferenceInput = document.getElementById('timeDifference');
    const minutesPerPlayerInput = document.getElementById('minutesPerPlayer');
    const extraSecondsInput = document.getElementById('extraSeconds');
    const timingMethodInput = document.getElementById('timingMethod');
    const soundNotificationsInput = document.getElementById('soundNotifications');
    
    let whiteTimeRemaining = 0;
    let blackTimeRemaining = 0;
    let currentPlayer = 'white';
    let whiteInterval, blackInterval;
    let moveCount = 0;
    let isPaused = false;
    let isFischer = false;
    let soundNotificationsEnabled = true;
    let extraSeconds = 0;

    function playSound() {
        if (soundNotificationsEnabled) {
            const audio = new Audio('notification-sound.mp3');
            audio.play();
        }
    }

    function startTimer() {
        if (isPaused) return;

        stopTimers();

        if (currentPlayer === 'white') {
            whiteInterval = setInterval(() => {
                if (!isPaused) {
                    whiteTimeRemaining--;
                    updateDisplay();
                    if (whiteTimeRemaining <= 0) {
                        alert("Time's up! Black wins.");
                        resetGame();
                    }
                }
            }, 1000);
        } else {
            blackInterval = setInterval(() => {
                if (!isPaused) {
                    blackTimeRemaining--;
                    updateDisplay();
                    if (blackTimeRemaining <= 0) {
                        alert("Time's up! White wins.");
                        resetGame();
                    }
                }
            }, 1000);
        }
    }

    function stopTimers() {
        clearInterval(whiteInterval);
        clearInterval(blackInterval);
    }

    function updateDisplay() {
        whiteTimer.textContent = formatTime(whiteTimeRemaining);
        blackTimer.textContent = formatTime(blackTimeRemaining);
        moveCountDisplay.textContent = `Moves: ${moveCount}`;
    }

    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function resetGame() {
        whiteTimeRemaining = parseInt(minutesPerPlayerInput.value) * 60;
        blackTimeRemaining = parseInt(minutesPerPlayerInput.value) * 60;
        moveCount = 0;
        isPaused = false;
        updateDisplay();
    }

    startButton.addEventListener('click', () => {
        const timeDifference = parseInt(timeDifferenceInput.value);
        const extraSeconds = parseInt(extraSecondsInput.value);
        whiteTimeRemaining = (parseInt(minutesPerPlayerInput.value) * 60) + timeDifference;
        blackTimeRemaining = parseInt(minutesPerPlayerInput.value) * 60;
        isFischer = timingMethodInput.value === 'fischer';
        soundNotificationsEnabled = soundNotificationsInput.checked;
        resetGame();
        startTimer();
    });

    pauseButton.addEventListener('click', () => {
        isPaused = !isPaused;
        if (!isPaused) startTimer();
    });

    stopButton.addEventListener('click', stopTimers);

    resetButton.addEventListener('click', resetGame);

    whiteDiv.addEventListener('click', () => {
        if (currentPlayer === 'white') {
            moveCount++;
            currentPlayer = 'black';
            playSound();
            startTimer();
        }
    });

    blackDiv.addEventListener('click', () => {
        if (currentPlayer === 'black') {
            moveCount++;
            currentPlayer = 'white';
            playSound();
            startTimer();
        }
    });
});
