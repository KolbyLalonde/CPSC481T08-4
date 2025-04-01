window.onload = function() {
    let eventData = localStorage.getItem("eventDetails");

    if (eventData) {
        let { eventName, members, date, time, meetingType, location } = JSON.parse(eventData);

        let membersList = Array.isArray(members) ? members.join(", ") : "None";

        document.getElementById("eventDetails").innerHTML = `
            <div class="date">
                <p><strong>${date}</strong></p>
                <p><strong>${time}</strong></p>
            </div>
            <div class="event">
                <p><strong>Event Name:</strong> ${eventName}</p>
                <p><strong>Members:</strong> ${membersList}</p>
                <p><strong>Location:</strong> ${location}</p>
                <p><strong>Meeting Type:</strong> ${meetingType}</p>
            </div>
            <hr>
        `;
    } 
};
