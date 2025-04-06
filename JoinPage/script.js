function redirectToFamilyHome(event) {
    event.preventDefault(); // Prevent default form submission
    const joinCode = document.getElementById("joinCode").value.trim();

    if(joinCode == "123"){
        window.location.href = "../FamilyHomePage/userSelection.html";
    } 
    else if (joinCode == "abc"){
        window.location.href = "../FamilyHomePage/userSelectionP2.html";
    }
    else if (joinCode !== "") {
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

// Updated confirmation function
function confirmSetup() {
    closeConfirmationModal();  // Close the confirmation modal first
    showInputModal();  // Open the input modal instead of navigating immediately
}


// Close the confirmation modal
function closeConfirmationModal() {
    document.getElementById("confirmationModal").style.display = "none";
}

// Attach the confirmation modal to the "Parent (Admin)" button
document.getElementById("SetupParent").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission
    showConfirmationModal(); // Show the confirmation modal
});

// Function to open the input modal
function showInputModal() {
    document.getElementById("inputModal").style.display = "block";
}

// Close the input modal
function closeInputModal() {
    document.getElementById("inputModal").style.display = "none";
}

function submitDetails() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const familyJoinCode = document.getElementById("familyJoinCode").value.trim();
    
    if (firstName === "" || lastName === "" || familyJoinCode === "") {
        alert("Please enter all feilds.");
        return;
    }

    // Retrieve existing family members from localStorage or initialize an empty array
    let familyMembers = JSON.parse(localStorage.getItem("familyMembers")) || [];

    // Add the new member
    familyMembers.push({ firstName, lastName });

    // Store updated family members back to localStorage
    localStorage.setItem("familyMembers", JSON.stringify(familyMembers));

    // Store new familyJoinCode in localStorage
    localStorage.setItem("familyJoinCode", familyJoinCode);

    // Clear input fields
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("familyJoinCode").value = "";

    // Close the modal (assuming a modal is being used for input)
    closeInputModal();

    // Redirect to the Admin Homepage where members will be displayed
    window.location.href = "../NewAdminHomepage/NewAdminHomepage.html";
}
