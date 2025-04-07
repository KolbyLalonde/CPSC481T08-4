
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
        document.getElementById("lewis").classList.remove("hidden");
    } 
    if (name === 'Leslie' || name2 === 'Leslie') {
        document.getElementById("leslie").classList.remove("hidden");
    }
    if (name === 'Kwong-wing' || name2 === 'Kwong-wing') {
        document.getElementById("kwong-wing").classList.remove("hidden");
    }
    if(name === 'everyone' || name2 === 'everyone'){
        document.getElementById("lewis").classList.remove("hidden");
        document.getElementById("leslie").classList.remove("hidden");
        document.getElementById("kwong-wing").classList.remove("hidden");
    }

    const allMembers = Array.from(document.querySelectorAll('.FullScreen-member'));
    const visibleMembers = allMembers.filter(el => !el.classList.contains('hidden'));
    
    
    let currentIndex = 0;
    console.log(visibleMembers);
    if (visibleMembers.length > 0) {
        hideAllMembers();
        showMember(currentIndex);

        // Left button
        document.getElementById('left').addEventListener('click', () => {
            hideAllMembers();
            currentIndex = (currentIndex - 1 + visibleMembers.length) % visibleMembers.length;
            showMember(currentIndex);
        });

        // Right button
        document.getElementById('right').addEventListener('click', () => {
            hideAllMembers();
            currentIndex = (currentIndex + 1) % visibleMembers.length;
            showMember(currentIndex);
        });
    }

    function hideAllMembers() {
        visibleMembers.forEach(el => el.classList.add('hidden'));
    }
    
    function showMember(index) {
        visibleMembers[index].classList.remove('hidden');
    }
    

    function back(){
        window.location.href = page;
    }


    function fullScreenToggle(){
        stopTimer();
        time = document.getElementById('timerDisplay').textContent 
        reset();
        window.location.href = `vCall Full Screen.html?name=${name}&name2=${name2}&page=${page}&time=${time}`;
    }

    function minScreenToggle(){
        stopTimer();
        time = document.getElementById('timerDisplay').textContent 
        reset();
        window.location.href = `vCall Interface.html?name=${name}&name2=${name2}&page=${page}&time=${time}`;
    }

    window.minScreenToggle = minScreenToggle;
    window.back = back;
    window.fullScreenToggle = fullScreenToggle;
    
});

function reset(){
    document.getElementById('lewis').classList.add('hidden');
    document.getElementById('leslie').classList.add('hidden');
    document.getElementById('kwong-wing').classList.add('hidden');  
}

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

