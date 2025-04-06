// Show the confirmation modal
function showConfirmationModal() {
    document.getElementById("confirmationModal").style.display = "block";
}

// Close the confirmation modal
function closeConfirmationModal() {
    document.getElementById("confirmationModal").style.display = "none";
}

// Confirm setup and show join code modal
function confirmSetup() {
    closeConfirmationModal();
    showJoinCodeModal();
}

// Open the add family member form modal
function openFamilyMemberForm() {
    document.getElementById("addFamilyMemberModal").style.display = "block";
}

// Close the add family member form modal
function closeFamilyMemberForm() {
    document.getElementById("addFamilyMemberModal").style.display = "none";
}

// Helper to create a list item with an edit icon
function createFamilyListItem(firstName, lastName, index) {
    const li = document.createElement("li");

    // Name text
    const nameSpan = document.createElement("span");
    nameSpan.textContent = `${firstName} ${lastName}`;
    li.appendChild(nameSpan);

    // Edit icon button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-icon";
    editBtn.title = "Edit member";
    editBtn.onclick = function () {
        // Navigate to edit page with index in URL
        window.location.href = `edit-family-member.html?index=${index}`;
    };

    li.appendChild(editBtn);

    return li;
}

// Save the new family member
function saveFamilyMember() {
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();

    if (firstName && lastName) {
        const newMember = { firstName, lastName };

        // Update localStorage
        let familyMembers = JSON.parse(localStorage.getItem("familyMembers")) || [];
        familyMembers.push(newMember);
        localStorage.setItem("familyMembers", JSON.stringify(familyMembers));

        // Add to list with edit icon
        const li = createFamilyListItem(firstName, lastName, familyMembers.length - 1);
        document.getElementById("family-member-list").appendChild(li);

        closeFamilyMemberForm();
    } else {
        alert("Please fill in both the first and last name.");
    }
}

// Load and display family members from localStorage
window.onload = function () {
    const familyMembers = JSON.parse(localStorage.getItem("familyMembers")) || [];
    const familyList = document.getElementById("family-member-list");

    familyMembers.forEach((member, index) => {
        const li = createFamilyListItem(member.firstName, member.lastName, index);
        familyList.appendChild(li);
    });
};

// Show the join code modal
function showJoinCodeModal() {
    document.getElementById("joinCodeModal").style.display = "block";
}

// Close the join code modal
function closeJoinCodeModal() {
    document.getElementById("joinCodeModal").style.display = "none";
}

// Confirm join code and redirect
function confirmJoinCode() {
    localStorage.removeItem("familyMembers");
    window.location.href = '/CPSC481T08-4/JoinPage/JoinPage.html';
}

// Copy the join code to clipboard
function copyJoinCode() {
    const joinCode = document.getElementById("joinCodeDisplay").textContent;
    navigator.clipboard.writeText(joinCode).then(() => {
        alert("Join code copied to clipboard!");
    });
}

function editMember(index) {
    localStorage.setItem("editIndex", index.toString());
    window.location.href = "EditFamilyMember.html";
}
