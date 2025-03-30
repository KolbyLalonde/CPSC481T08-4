// Function to show the confirmation modal
function showConfirmationModal() {
    document.getElementById("confirmationModal").style.display = "block";
}

// Function to close the confirmation modal
function closeConfirmationModal() {
    document.getElementById("confirmationModal").style.display = "none";
}

// Function to confirm the setup (you can add further logic here if needed)
function confirmSetup() {
    closeConfirmationModal(); // Close the modal after confirmation
    // Show the join code modal after setup is confirmed
    showJoinCodeModal();
}

// Function to open the family member form
function openFamilyMemberForm() {
    document.getElementById("addFamilyMemberModal").style.display = "block";
}

// Function to close the family member form
function closeFamilyMemberForm() {
    document.getElementById("addFamilyMemberModal").style.display = "none";
}

// Function to save the new family member data
function saveFamilyMember() {
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();

    if (firstName && lastName) {
        // Create an object for the new family member
        const newMember = { firstName, lastName };

        // Save the new member to localStorage
        let familyMembers = JSON.parse(localStorage.getItem("familyMembers")) || [];
        familyMembers.push(newMember);
        localStorage.setItem("familyMembers", JSON.stringify(familyMembers));

        // Create a new list item for the family member
        const li = document.createElement("li");
        li.textContent = `${firstName} ${lastName}`;

        // Append the new family member to the list
        document.getElementById("family-member-list").appendChild(li);

        // Close the modal after saving
        closeFamilyMemberForm();
    } else {
        alert("Please fill in both the first and last name.");
    }
}

// Function to load and display family members on page load
window.onload = function() {
    
    // Retrieve the family members from localStorage
    const familyMembers = JSON.parse(localStorage.getItem("familyMembers")) || [];
    const familyList = document.getElementById("family-member-list");

    // Loop through the family members and display them
    familyMembers.forEach(member => {
        const li = document.createElement("li");
        li.textContent = `${member.firstName} ${member.lastName}`;
        familyList.appendChild(li);
    });
};

// Open the join code modal
function showJoinCodeModal() {
    document.getElementById("joinCodeModal").style.display = "block";
}

// Close the join code modal
function closeJoinCodeModal() {
    document.getElementById("joinCodeModal").style.display = "none";
}

// Redirect the user after confirming they saved the join code
function confirmJoinCode() {
    // Clear family members from localStorage
    localStorage.removeItem("familyMembers");
    window.location.href = '/CPSC481T08-4/JoinPage/JoinPage.html';
}

// Function to copy the join code to clipboard
function copyJoinCode() {
    const joinCode = document.getElementById("joinCodeDisplay").textContent;
    navigator.clipboard.writeText(joinCode).then(() => {
        alert("Join code copied to clipboard!");
    });
}