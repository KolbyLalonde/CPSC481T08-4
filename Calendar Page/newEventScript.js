window.addEventListener('DOMContentLoaded', () => {
    referrer = document.referrer;
    if(referrer.includes("grandparentCalendar.html")){
        document.body.style.fontSize = "20px";
        const input = document.getElementsByClassName("input");
        for (let i = 0; i < input.length; i++) {
            input[i].style.fontSize = "18px";
        }
        document.getElementsByClassName("FormContainer")[0].style.lineHeight = "1.5";
        const button = document.getElementsByTagName("button")
        for (let i = 0; i < button.length; i++) {
            button[i].style.fontSize = "20px";
        }
    }
});
document.getElementById("createButton").addEventListener("click", function(event) {
    // Store the referrer (previous page)
    localStorage.setItem("referrer", document.referrer);
    console.log("page: "+document.referrer);
    form = event.target.form;
    if(form.checkValidity() == false){
        preventDefault(); // Prevent form submission
    }
    event.preventDefault();
    // Get values from form
    let eventName = document.getElementById("event_name").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let meetingType = document.getElementById("meeting_type").value;
    let location = document.getElementById("location").value;

    // Get selected members
    let members = [];
    document.querySelectorAll('input[name="members[]"]:checked').forEach((checkbox) => {
        members.push(checkbox.value);
    });


    // Store data in localStorage
    localStorage.setItem("eventDetails", JSON.stringify({
        eventName, members, date, time, meetingType, location
    }));
    console.log("page: "+document.referrer);
    window.location.href = document.referrer;
    preventDefault();
    stopPropagation();
});

function ConfirmExit() {  
    document.getElementById("confirmationModal").style.display = "block";
}

function exit(){
    console.log("exit");
    window.history.back();
}

function showModal(message) {
    document.getElementById("modalMessage").textContent = message;
    document.getElementById("errorModal").style.display = "block";
}

function closeModal() {
    document.getElementById("errorModal").style.display = "none";
}

// Close the confirmation modal
function closeConfirmationModal() {
    document.getElementById("confirmationModal").style.display = "none";
}