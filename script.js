document.addEventListener('DOMContentLoaded', () => {

    const display = document.getElementById('timer-display');
    const hoursInput = document.getElementById('hours-input');
    const minutesInput = document.getElementById('minutes-input');
    const secondsInput = document.getElementById('seconds-input');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const helloKittyImage = document.getElementById('hello-kitty-image');
    const alarmSound = new Audio('assets/hello_kitty.mp3')

    let timer;
    let totalSeconds = 0;
    let isPaused = false;

    function updateDisplay() {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function startTimer() {
        helloKittyImage.classList.remove('awake');
        if (timer) { clearInterval(timer); }
        if (!isPaused) {
            const hours = parseInt(hoursInput.value) || 0;
            const minutes = parseInt(minutesInput.value) || 0;
            const seconds = parseInt(secondsInput.value) || 0;
            totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        }
        if (totalSeconds <= 0) { alert("Por favor, defina um tempo válido."); return; }
        isPaused = false;
        timer = setInterval(() => {
            if (totalSeconds > 0 && !isPaused) {
                totalSeconds--;
                updateDisplay();
            } else if (totalSeconds === 0) {
                clearInterval(timer);
                alarmSound.play();
                helloKittyImage.classList.add('awake');
                display.classList.add('shake');
                setTimeout(() => { display.classList.remove('shake'); }, 800);
            }
        }, 1000);
    }

    function pauseTimer() {
        alarmSound.pause();
        alarmSound.currentTime = 0;
        helloKittyImage.classList.remove('awake');
        
        isPaused = true;
        clearInterval(timer);
    }

    function resetTimer() {
        alarmSound.pause();
        alarmSound.currentTime = 0;
        helloKittyImage.classList.remove('awake');
        clearInterval(timer);
        isPaused = false;
        hoursInput.value = 0;
        minutesInput.value = 0;
        secondsInput.value = 0;
        totalSeconds = 0;
        updateDisplay();
    }

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

    updateDisplay();
});