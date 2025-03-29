function redirectToFamilyHome(event) {
    event.preventDefault(); // Prevent default form submission
    const joinCode = document.getElementById("joinCode").value.trim();

    if(joinCode == "123"){
        window.location.href = "../FamilyHomePage/userSelection.html";
    } else if (joinCode !== "") {
        showModal("This is an incorrect family join code.");
    } else {
        showModal("Please enter a join code.");
    }
}

function showModal(message) {
    document.getElementById("modalMessage").textContent = message;
    document.getElementById("errorModal").style.display = "block";
}

function closeModal() {
    document.getElementById("errorModal").style.display = "none";
}