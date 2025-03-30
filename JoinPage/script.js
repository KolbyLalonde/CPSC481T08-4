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

// Close the confirmation modal
function closeConfirmationModal() {
    document.getElementById("confirmationModal").style.display = "none";
}


// Close the confirmation modal
function closeConfirmationModal() {
    document.getElementById("confirmationModal").style.display = "none";
}

// Handle the confirmation action
function confirmSetup() {
    // You can add any additional logic for proceeding after confirmation
    alert('You have confirmed to set up the family group as Parent (Admin).');
    closeConfirmationModal();  // Close the modal after confirmation
}

// Attach the confirmation modal to the "Parent (Admin)" button
document.getElementById("SetupParent").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission
    showConfirmationModal(); // Show the confirmation modal
});