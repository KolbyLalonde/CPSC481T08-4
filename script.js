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
                // Close gallery if it's open when text area is focused
                const galleryContainer = document.querySelector(".gallery-container");
                if (galleryContainer && galleryContainer.style.display === "flex") {
                    galleryContainer.style.display = "none";
                }
                
                this.open(element.value, (currentValue) => {
                    element.value = currentValue;
                });
            });
        });
    
        // Click outside handler
        document.addEventListener("click", (event) => {
            const isKeyboard = event.target.closest(".keyboard");
            const isTextArea = event.target.closest(".text-area");
            const isGallery = event.target.closest(".gallery-container");
            
            if (!isKeyboard && !isTextArea && !isGallery) {
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
        // Instead of creating a file input, we'll show the gallery
        const galleryContainer = document.querySelector(".gallery-container");
        if (galleryContainer) {
            // Hide the keyboard but keep the input container visible
            this.elements.main.classList.add("keyboard--hidden");
            
            // Show the gallery without hiding the input container
            galleryContainer.style.display = "flex";
            
            // Reset selection state
            document.querySelectorAll('.image-wrapper').forEach(wrapper => {
                wrapper.classList.remove('selected');
            });
            
            // Disable send button initially
            const sendButton = document.querySelector('.gallery-send-button');
            if (sendButton) sendButton.disabled = true;
        }
    },
    

    _createKeyBtn(iconName, class1, onclick, class2) {
        this.keyElement = document.createElement("button");
    
        this.keyElement.setAttribute("type", "button");
        this.keyElement.classList.add("keyboard__key", class1);
        if (class2) this.keyElement.classList.add(class2);
    
        this.keyElement.innerHTML = iconName ? `<span class="material-icons">${iconName}</span>` : "";
        this.keyElement.addEventListener("click", onclick);
    
        return this.keyElement;
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="var(--textPurple)" class="icon" width="28" height="28">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>                
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
        inputContainer.classList.add("active");
        
        // Hide gallery if it's open
        const galleryContainer = document.querySelector(".gallery-container");
        if (galleryContainer) {
            galleryContainer.style.display = "none";
        }
        
        this.elements.main.classList.remove("keyboard--hidden");
    },
    
    close() {
        // Hide keyboard and move text area and input container down
        this.elements.main.classList.add("keyboard--hidden");
        
        const textArea = document.querySelector(".text-area");
        const inputContainer = document.querySelector(".input-container");
        
        textArea.classList.remove("active");
        inputContainer.classList.remove("active");
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="var(--textPurple)" class="icon" width="28" height="28">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
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
    
    // Add click event listener to text area to focus and show keyboard/hide gallery
    textArea.addEventListener("click", function() {
        const galleryContainer = document.querySelector(".gallery-container");
        if (galleryContainer && galleryContainer.style.display === "flex") {
            // Hide gallery and show keyboard instead
            galleryContainer.style.display = "none";
            Keyboard.open(textArea.value, (currentValue) => {
                textArea.value = currentValue;
            });
        }
    });
});

// Add this to the existing script.js file
document.addEventListener("DOMContentLoaded", function () {
    // Keep existing code and add the following:
    
    // Reference the gallery container (add this if it doesn't exist yet)
    const galleryContainer = document.querySelector(".gallery-container") || createGalleryContainer();
    
    // Function to create gallery container if it doesn't exist
    function createGalleryContainer() {
        const container = document.createElement("div");
        container.className = "gallery-container";
        document.body.appendChild(container);
        
        // Create a grid container for images
        const imagesGrid = document.createElement("div");
        imagesGrid.className = "images-grid";
        container.appendChild(imagesGrid);
        
        // Add sample images to the gallery
        const imageUrls = [
            "default-avatar.jpg", 
            "default-avatar.jpg", 
            "default-avatar.jpg", 
            "default-avatar.jpg", 
            "default-avatar.jpg", 
            "default-avatar.jpg", 
            "default-avatar.jpg", 
            "default-avatar.jpg", 
            "default-avatar.jpg", 
            "default-avatar.jpg", 
            "default-avatar.jpg"
        ];
        
        imageUrls.forEach(url => {
            const imageWrapper = document.createElement("div");
            imageWrapper.className = "image-wrapper";
            
            const image = document.createElement("img");
            image.src = url;
            image.className = "gallery-image";
            image.alt = "Gallery image";
            
            const checkmark = document.createElement("div");
            checkmark.className = "image-checkmark";
            checkmark.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24" height="24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
            `;
            
            imageWrapper.appendChild(image);
            imageWrapper.appendChild(checkmark);
            imageWrapper.appendChild(image);
            imageWrapper.appendChild(checkmark);
            imagesGrid.appendChild(imageWrapper); // Add to grid instead of directly to container
        });
        
        // Add send button for selected images
        const sendButtonContainer = document.createElement("div");
        sendButtonContainer.className = "gallery-send-container";
        
        const cancelButton = document.createElement("button");
        cancelButton.className = "gallery-cancel-button";
        cancelButton.textContent = "Cancel";
        
        const sendButton = document.createElement("button");
        sendButton.className = "gallery-send-button";
        sendButton.textContent = "Send";
        sendButton.disabled = true;
        
        sendButtonContainer.appendChild(cancelButton);
        sendButtonContainer.appendChild(sendButton);
        container.appendChild(sendButtonContainer);
        
        return container;
    }
    
    // Handle Media Button Click
    function handleMediaButtonClick() {
        const keyboard = document.querySelector(".keyboard");
        keyboard.classList.add("keyboard--hidden");
        
        // Show the gallery
        galleryContainer.style.display = "flex";
        
        // Keep the input container visible - remove any code that hides it
        // We're not adding 'active' class to it so it stays at the bottom
        
        // Reset selection state
        document.querySelectorAll('.image-wrapper').forEach(wrapper => {
            wrapper.classList.remove('selected');
        });
        
        // Disable send button initially
        const sendButton = document.querySelector('.gallery-send-button');
        if (sendButton) sendButton.disabled = true;
    }
    
    // Add click handler to the Upload Media button
    const uploadButtons = document.querySelectorAll(".keyboard__button");
    uploadButtons.forEach(button => {
        if (button.textContent === "Upload Media") {
            button.addEventListener("click", handleMediaButtonClick);
        }
    });
    
    // Add click handlers to image wrappers
    document.addEventListener('click', function(event) {
        // Handle image selection
        if (event.target.classList.contains('gallery-image')) {
            const wrapper = event.target.closest('.image-wrapper');
            
            // Toggle selection on the clicked image
            document.querySelectorAll('.image-wrapper').forEach(item => {
                item.classList.remove('selected');
            });
            
            wrapper.classList.add('selected');
            
            // Enable the send button
            const sendButton = document.querySelector('.gallery-send-button');
            if (sendButton) sendButton.disabled = false;
        }
        
        // Handle send button click
        if (event.target.classList.contains('gallery-send-button') && !event.target.disabled) {
            sendSelectedImage();
        }
        
        // Handle cancel button click
        if (event.target.classList.contains('gallery-cancel-button')) {
            galleryContainer.style.display = "none";
            
            // Focus back on the text area
            const textArea = document.querySelector(".text-area");
            if (textArea) {
                textArea.focus();
            }
        }
    });
    
    // Function to send the selected image
    function sendSelectedImage() {
        const selectedWrapper = document.querySelector('.image-wrapper.selected');
        if (!selectedWrapper) return;
        
        const selectedImage = selectedWrapper.querySelector('.gallery-image');
        const imageUrl = selectedImage.src;
        
        // Create and add the message with the image
        const chatContainer = document.querySelector(".chat-container");
        const messageElement = document.createElement("div");
        messageElement.classList.add("chat-message", "right");
        
        messageElement.innerHTML = ` 
            <div class="avatar-container">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="var(--textPurple)" class="icon" width="28" height="28">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <span class="user-name">Lewis</span>
            </div>
            <div class="message-content">
                <img src="${imageUrl}" alt="Shared image" class="shared-image">
            </div>
        `;
        
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Hide the gallery after sending
        galleryContainer.style.display = "none";
        
        // Clear selection
        selectedWrapper.classList.remove('selected');
        
        // Disable send button again
        const sendButton = document.querySelector('.gallery-send-button');
        if (sendButton) sendButton.disabled = true;
        
        // Focus back on the text area
        const textArea = document.querySelector(".text-area");
        if (textArea) {
            setTimeout(() => {
                textArea.focus();
            }, 0);
        }
    }
    
    // Ensure the text area stays clickable even when gallery is open
    const textArea = document.querySelector(".text-area");
    if (textArea) {
        textArea.addEventListener("click", function() {
            if (galleryContainer.style.display === "flex") {
                // Hide gallery and show keyboard when text area is clicked
                galleryContainer.style.display = "none";
                
                // Show keyboard
                const keyboard = document.querySelector(".keyboard");
                keyboard.classList.remove("keyboard--hidden");
                
                // Focus on text area
                this.focus();
            }
        });
    }
});