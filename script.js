const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: [],
        capsKey: null,
    },

    properties: {
        value: "",
        capsLock: false,
        keyboardInputs: null,
        keyLayout: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ],
    },

    init() {
        // Create keyboard container
        this.elements.main = document.createElement("div");
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        document.body.appendChild(this.elements.main);
    
        // Create buttons container
        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("keyboard__buttons");
        this.elements.main.appendChild(buttonsContainer);
    
        // Create "Use Camera" button
        const cameraButton = document.createElement("button");
        cameraButton.textContent = "Use Camera";
        cameraButton.classList.add("keyboard__button");
        cameraButton.addEventListener("click", () => {
            this.openCamera();
        });
    
        // Create "Upload Media" button
        const uploadButton = document.createElement("button");
        uploadButton.textContent = "Upload Media";
        uploadButton.classList.add("keyboard__button");
        uploadButton.addEventListener("click", () => {
            this.openFileSelector();
        });
    
        // Append buttons
        buttonsContainer.appendChild(cameraButton);
        buttonsContainer.appendChild(uploadButton);
    
        // Create keys container
        this.elements.keysContainer = document.createElement("div");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.main.appendChild(this.elements.keysContainer);
    
        // Create keys
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    
        // Attach event listeners to text inputs
        this.properties.keyboardInputs = document.querySelectorAll(".use-keyboard-input");
        this.properties.keyboardInputs.forEach((element) => {
            element.addEventListener("focus", () => {
                this.open(element.value, (currentValue) => {
                    element.value = currentValue;
                });
            });
        });
    
        // Click outside handler
        document.addEventListener("click", (event) => {
            const isKeyboard = event.target.closest(".keyboard");
            const isTextArea = event.target.closest(".text-area");
            
            if (!isKeyboard && !isTextArea) {
                this.close();
            }
        });
    },

    openCamera() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                alert("Camera activated! You can now record or take a picture.");
                // You can integrate this with a `<video>` element to display the feed.
            })
            .catch((err) => {
                alert("Camera access denied or not supported.");
                console.error(err);
            });
    },
    
    openFileSelector() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*, video/*"; // Accept images and videos
        input.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                alert(`Selected file: ${file.name}`);
            }
        });
        input.click();
    },
    

    _createKeyBtn(iconName, class1, onclick, class2) {
        this.keyElement = document.createElement("button");
    
        this.keyElement.setAttribute("type", "button");
        this.keyElement.classList.add("keyboard__key", class1);
        if (class2) this.keyElement.classList.add(class2);
    
        this.keyElement.innerHTML = iconName ? `<span class="material-icons">${iconName}</span>` : "";
        this.keyElement.addEventListener("click", onclick);
    
        return this.keyElement;  // Add this return statement
    },    

    _createKeys() {
        const fragment = document.createDocumentFragment();

        this.properties.keyLayout.forEach((key) => {
            const insertLineBreak = ["backspace", "p", "enter", "?"].includes(key);

            switch (key) {
                case "backspace":
                    this._createKeyBtn("back", "keyboard__key--wide", () => {
                        this.properties.value = this.properties.value.slice(0, -1);
                        this._updateValueInTarget();
                    });
                    break;

                case "caps":
                    this._createKeyBtn("caps", "keyboard__key--activatable", () => {
                        this.elements.capsKey.classList.toggle("keyboard__key--active");
                        this._toggleCapsLock();
                    }, "keyboard__key--wide");
                    this.elements.capsKey = this.keyElement;
                    break;

                case "enter":
                    this._createKeyBtn("return", "keyboard__key--wide", () => {
                        // Send the message when Enter key is pressed
                        this._sendMessage();
                        
                        // Then add a new line in case we continue typing
                        this.properties.value += "\n";
                        this._updateValueInTarget();
                    });
                    break;

                case "space":
                    this._createKeyBtn("space", "keyboard__key--extra--wide", () => {
                        this.properties.value += " ";
                        this._updateValueInTarget();
                    });
                    break;

                case "done":
                    this._createKeyBtn("", "keyboard__key--dark", () => {
                        // Send the message when Done key is pressed
                        this._sendMessage();
                        
                        // Then close the keyboard
                        this.close();
                        this._updateValueInTarget();
                    }, "keyboard__key--wide");
                    break;

                default:
                    this._createKeyBtn();
                    this.keyElement.textContent = key.toLowerCase();
                    this.keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._updateValueInTarget();
                    });
                    break;
            }

            fragment.appendChild(this.keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _sendMessage() {
        const messageText = this.properties.value.trim();
        if (messageText === "") return;
    
        const chatContainer = document.querySelector(".chat-container");
        const messageElement = document.createElement("div");
        messageElement.classList.add("chat-message", "right");
    
        messageElement.innerHTML = ` 
            <div class="avatar-container">
                <img src="default-avatar.jpg" class="avatar" alt="Lewis">
                <span class="user-name">Lewis</span>
            </div>
            <div class="message-content">
                <p>${messageText}</p>
            </div>
        `;
    
        chatContainer.appendChild(messageElement);
        this.properties.value = ""; // Clear input after sending
        
        // Clear the text area
        this.properties.keyboardInputs.forEach((keyboard) => {
            keyboard.value = "";
        });
        
        // Auto-scroll to the bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
    },

    _updateValueInTarget() {
        this.properties.keyboardInputs.forEach((keyboard) => {
            keyboard.value = this.properties.value;
        });
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
    
        for (let key of this.elements.keys) {
            if (key.textContent && key.textContent.trim().length > 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            } else if (key.querySelector(".material-icons")) {
                let iconText = key.querySelector(".material-icons").textContent;
                key.querySelector(".material-icons").textContent = this.properties.capsLock ? iconText.toUpperCase() : iconText.toLowerCase();
            }
        }
    },    

    open(initialValue, oninput) {
        this.properties.value = initialValue || "";
    
        // Move both the text area and input container up
        const textArea = document.querySelector(".text-area");
        const inputContainer = document.querySelector(".input-container");
        
        textArea.classList.add("active");
        inputContainer.classList.add("active");  // Add this line
        
        this.elements.main.classList.remove("keyboard--hidden");
    },
    
    close() {
        // Hide keyboard and move text area and input container down
        this.elements.main.classList.add("keyboard--hidden");
        
        const textArea = document.querySelector(".text-area");
        const inputContainer = document.querySelector(".input-container");
        
        textArea.classList.remove("active");
        inputContainer.classList.remove("active");  // Add this line
    },

    // Handle keyboard visibility and adjust input container position
    _handleKeyboardVisibility() {
        const inputContainer = document.querySelector('.input-container');
        const textArea = document.querySelector('.text-area');
    
        // Check if the window's height is smaller (indicating the keyboard is showing)
        if (window.innerHeight < 600) {  // Adjust this threshold based on your needs
            // Add the 'active' class to move the input container up
            inputContainer.classList.add('active');
            textArea.classList.add('active');  // Move the text area up
        } else {
            // Remove the 'active' class to reset the position when the keyboard is hidden
            inputContainer.classList.remove('active');
            textArea.classList.remove('active');  // Move the text area back down
        }
    }
    
};

// Initialize the keyboard
window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});

// Handle sending messages
document.addEventListener("DOMContentLoaded", function () {
    const textArea = document.querySelector(".text-area");
    const sendButton = document.querySelector(".send-button");
    const chatContainer = document.querySelector(".chat-container");

    function sendMessage() {
        const messageText = textArea.value.trim();
        if (messageText === "") return;
    
        const messageElement = document.createElement("div");
        messageElement.classList.add("chat-message", "right");
    
        messageElement.innerHTML = ` 
            <div class="avatar-container">
                <img src="default-avatar.jpg" class="avatar" alt="Lewis">
                <span class="user-name">Lewis</span>
            </div>
            <div class="message-content">
                <p>${messageText}</p>
            </div>
        `;
    
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll
    
        // Save cursor position before clearing the text
        const cursorPosition = textArea.selectionStart;
    
        // Clear input without losing focus
        textArea.value = "";
        
        // Restore cursor position & keep focus without causing flicker
        setTimeout(() => {
            textArea.setSelectionRange(cursorPosition, cursorPosition);
            textArea.focus();
        }, 0);
    }
    
    

    sendButton.addEventListener("click", sendMessage);

    textArea.addEventListener("keypress", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const textArea = document.querySelector(".text-area");
    const sendButton = document.querySelector(".send-button");
    const chatContainer = document.querySelector(".chat-container");
    const uploadMediaButton = document.querySelector(".upload-media-button");
    const galleryContainer = document.querySelector(".gallery-container");
    const keyboardContainer = document.querySelector(".keyboard");

    // Handle sending text messages
    function sendMessage(messageText) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("chat-message", "right");

        messageElement.innerHTML = ` 
            <div class="avatar-container">
                <img src="default-avatar.jpg" class="avatar" alt="Lewis">
                <span class="user-name">Lewis</span>
            </div>
            <div class="message-content">
                <p>${messageText}</p>
            </div>
        `;

        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Send text when enter is pressed
    textArea.addEventListener("keypress", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage(textArea.value.trim());
            textArea.value = ""; // Clear input after sending
        }
    });

    // Send button click handler
    sendButton.addEventListener("click", function () {
        const messageText = textArea.value.trim();
        if (messageText !== "") {
            sendMessage(messageText);
            textArea.value = ""; // Clear input after sending
        }
    });

    // Handle media upload button click
    uploadMediaButton.addEventListener("click", function () {
        // Hide the keyboard if it's visible
        keyboardContainer.classList.add("keyboard--hidden");

        // Show the image gallery
        galleryContainer.style.display = "flex"; // Show the gallery
    });

    // Handle selecting an image from the gallery
    const galleryImages = document.querySelectorAll(".gallery-image");
    galleryImages.forEach((image) => {
        image.addEventListener("click", function () {
            const imageUrl = image.src; // Get the selected image's URL
            const messageElement = document.createElement("div");
            messageElement.classList.add("chat-message", "right");

            messageElement.innerHTML = ` 
                <div class="avatar-container">
                    <img src="default-avatar.jpg" class="avatar" alt="Lewis">
                    <span class="user-name">Lewis</span>
                </div>
                <div class="message-content">
                    <img src="${imageUrl}" alt="Uploaded Image" class="uploaded-image">
                </div>
            `;

            chatContainer.appendChild(messageElement);
            chatContainer.scrollTop = chatContainer.scrollHeight;

            // Hide the gallery after selection
            galleryContainer.style.display = "none";
        });
    });
});

