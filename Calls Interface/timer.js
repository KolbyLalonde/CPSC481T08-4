window.addEventListener('DOMContentLoaded', () => {
    // Initialize time

    // Get the element where we will display the timer
    const timerDisplay = document.getElementById('timerDisplay');
    minutes = timerDisplay.textContent.split(':')[0]; // Get the current minutes from the displayed time
    seconds = timerDisplay.textContent.split(':')[1]; // Get the current seconds from the displayed time


    if(seconds = null){
        minutes = 0;
        seconds = 0;
    }
    // Function to update the timer
    function updateTimer() {
        seconds++; // Increment seconds
        if (seconds === 60) { // If 60 seconds have passed, reset to 0 and increment minutes
            seconds = 0;
            minutes++;
        }

        // Format time as `minutes:seconds`, ensuring two digits for seconds
        const formattedTime = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        timerDisplay.textContent = formattedTime; // Update the display
    }

    // Set the timer to update every second (1000 milliseconds)
    setInterval(updateTimer, 1000);
  });
  