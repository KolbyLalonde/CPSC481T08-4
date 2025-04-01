document.getElementById("createButton").addEventListener("click", function() {
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


    // Store the referrer (previous page)
    localStorage.setItem("referrer", document.referrer);
    window.location.href = document.referrer;
});

function exit() {  
    window.history.back();
}