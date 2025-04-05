
let intervalId; // Declare the variable to store the interval ID
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');  
    const name2 = urlParams.get('name2');  
    const page = urlParams.get('page');
    let time = urlParams.get('time');

    document.getElementById('timerDisplay').textContent = time;

    timer(time);

    if (name === 'Lewis' || name2 === 'Lewis') {
        document.getElementById("lewis").style.display = "block";
    } 
    if (name === 'Leslie' || name2 === 'Leslie') {
        document.getElementById("leslie").style.display = "block";
    }
    if (name === 'Kwong-wing' || name2 === 'Kwong-wing') {
        document.getElementById("kwong-wing").style.display = "block";
    }
    if(name === 'everyone' || name2 === 'everyone'){
        document.getElementById("lewis").style.display = "block";
        document.getElementById("leslie").style.display = "block";
        document.getElementById("kwong-wing").style.display = "block";
    }

    function back(){
        window.location.href = page;
    }


    function fullScreenToggle(){
        stopTimer();
        time = document.getElementById('timerDisplay').textContent 
        window.location.href = `vCall Full Screen.html?name=${name}&name2=${name2}&page=${page}&time=${time}`;
    }

    function minScreenToggle(){
        stopTimer();
        time = document.getElementById('timerDisplay').textContent 
        window.location.href = `vCall Interface.html?name=${name}&name2=${name2}&page=${page}&time=${time}`;
    }

    window.minScreenToggle = minScreenToggle;
    window.back = back;
    window.fullScreenToggle = fullScreenToggle;
    
    
});

function timer(time) {

    minutes = time.split(':')[0]; // Get the current minutes from the displayed time
    seconds = time.split(':')[1]; // Get the current seconds from the displayed time

    // Get the element where we will display the timer
    const timerDisplay = document.getElementById('timerDisplay');
    

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

    // Start the timer by setting the interval and storing the interval ID
    intervalId = setInterval(updateTimer, 1000);
  }
  
  // Function to stop the timer
function stopTimer() {
    clearInterval(intervalId); // Stop the timer
}