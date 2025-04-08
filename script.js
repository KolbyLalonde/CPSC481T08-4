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

        // Create "Suggest Message" button
        const AIButton = document.createElement("button");
        AIButton.textContent = "Suggest Message";
        AIButton.classList.add("keyboard__button");
        AIButton.addEventListener("click", () => {
            this.AIMessage();
        });
    
        // Append buttons
        buttonsContainer.appendChild(cameraButton);
        buttonsContainer.appendChild(uploadButton);
        buttonsContainer.appendChild(AIButton);
    
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

    // Modify the openCamera function in script.js
    openCamera() {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        
        // Create prompt box
        const prompt = document.createElement('div');
        prompt.className = 'camera-prompt';
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-button';
        closeBtn.innerHTML = '&times;'; // This is the "×" character
        
        // Add message
        const header = document.createElement('h3');
        const message = document.createElement('p');
        header.className = 'header-text';
        message.className = 'prompt-text';
        header.textContent = 'NOTE: This Camera Feature is Under Development';
        message.textContent = 'The camera feature is a proof of concept. It is still under development and pictures/videos taken will not be saved.';
        
        // Assemble components
        prompt.appendChild(closeBtn);
        prompt.appendChild(header);
        prompt.appendChild(message);
        overlay.appendChild(prompt);
        
        // Add to body
        document.body.appendChild(overlay);
        
        // Show overlay
        overlay.style.display = 'flex';
        
        // Close handlers
        const closeModal = () => document.body.removeChild(overlay);
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
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

    AIMessage() {
        const keyboard = document.querySelector(".keyboard");
        const textArea = document.querySelector(".text-area.use-keyboard-input");
        let aiContainer = document.querySelector(".ai-container");
    
        // Hide the keyboard when AI suggestions are shown
        if (keyboard) {
            keyboard.classList.add("keyboard--hidden");
        }
    
        if (!aiContainer) {
            aiContainer = document.createElement("div");
            aiContainer.classList.add("ai-container");
            document.body.appendChild(aiContainer);
        }
    
        aiContainer.innerHTML = "";
        aiContainer.style.display = "grid"; // Grid structure remains as functional styling
    
        const presetMessages = [
            "Hello!",
            "How are you?",
            "Good morning!",
            "Good afternoon!",
            "Do you have time to call right now?",
            "I miss you",
            "Did you eat yet?",
            "How's everyone?",
            "Good night!",
            "See you"
        ];
    
        presetMessages.forEach(message => {
            const aiOption = document.createElement("div");
            aiOption.textContent = message;
            aiOption.classList.add("ai-message-item");
    
            aiOption.addEventListener("click", function () {
                if (textArea) {
                    textArea.value = message;
                }
                aiContainer.style.display = "none";
    
                // Show the keyboard again after selection
                if (keyboard) {
                    keyboard.classList.remove("keyboard--hidden");
                }
            });
    
            aiContainer.appendChild(aiOption);
            
        });
        const sendButtonContainer = document.createElement("div");
        sendButtonContainer.className = "gallery-send-container";
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

        //Hide message suggestions if it's open
        const suggestionContainer = document.querySelector(".ai-container");
        if(suggestionContainer) {
            suggestionContainer.style.display = "none";
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

        const currentPage = window.location.pathname.split("/").pop();
        let username;

        if (currentPage === "childTextChat.html") {
            username = "Leslie";
        }
        else if (currentPage === "parentTextChat.html") {
            username = "Lewis";
        }
        else {
            username = "Kwong";
        }
    
        const messageElement = document.createElement("div");
        messageElement.classList.add("chat-message", "right");
    
        messageElement.innerHTML = ` 
            <div class="avatar-container">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="var(--textPurple)" class="icon" width="28" height="28">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <span class="user-name">${username}</span>
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

    function showProgressOnImage() {
        const containers = document.querySelectorAll(".shared-image-container");
        const latestContainer = containers[containers.length - 1];
        if (!latestContainer) return;
    
        // Remove any existing progress circles (cleanup)
        const existing = latestContainer.querySelector("#progress-circle");
        if (existing) existing.remove();
    
        // Create the progress circle
        const progressCircle = document.createElement("div");
        progressCircle.id = "progress-circle";
        latestContainer.appendChild(progressCircle);
    
        // Auto-remove after 2 seconds
        setTimeout(() => {
            progressCircle.remove();
        }, 2000);
    }    
    
    // Function to send the selected image
    function sendSelectedImage() {
        const selectedWrapper = document.querySelector('.image-wrapper.selected');
        if (!selectedWrapper) return;

        const currentPage = window.location.pathname.split("/").pop();
        let username;

        if (currentPage === "childTextChat.html") {
            username = "Leslie";
        }
        else if (currentPage === "parentTextChat.html") {
            username = "Lewis";
        }
        else {
            username = "Kwong";
        }
        
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
                <span class="user-name">${username}</span>
            </div>
            <div class="message-content">
                <div class="shared-image-container">
                    <div class="magnify-icon" title="Zoom">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="var(--textPurple)" class="magnify-svg">
                            <path d="M9 6a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 9 6Z" />
                            <path fill-rule="evenodd" d="M2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Zm7-5.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <img src="${imageUrl}" alt="Shared image" class="shared-image">
                </div>
            </div>
        `;



        
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        showProgressOnImage();
        
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


document.addEventListener("DOMContentLoaded", function() {
    // Create image viewer modal elements
    const imageViewerOverlay = document.createElement("div");
    imageViewerOverlay.className = "image-viewer-overlay";
    
    const imageViewerContainer = document.createElement("div");
    imageViewerContainer.className = "image-viewer-container";
    
    const imageElement = document.createElement("img");
    imageElement.className = "image-viewer-img";
    
    const closeButton = document.createElement("button");
    closeButton.className = "image-viewer-close";
    closeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24" height="24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
        </svg>
    `;
    
    // Assemble the viewer components
    imageViewerContainer.appendChild(imageElement);
    imageViewerContainer.appendChild(closeButton);
    imageViewerOverlay.appendChild(imageViewerContainer);
    document.body.appendChild(imageViewerOverlay);
    
    // Delegate event listener for all shared images in the chat
    document.addEventListener("click", function(event) {
        // Check if the clicked element is an image in a chat message
        if (event.target.classList.contains("shared-image")) {
            const imageSrc = event.target.src;
            
            // Set the image source in the viewer
            imageElement.src = imageSrc;
            
            // Show the overlay
            imageViewerOverlay.classList.add("active");
            document.body.classList.add("no-scroll");
        }
        
        // Close button functionality
        if (event.target.closest(".image-viewer-close") || 
            event.target.classList.contains("image-viewer-overlay")) {
            imageViewerOverlay.classList.remove("active");
            document.body.classList.remove("no-scroll");
        }
    });
    
    // Add swipe to close functionality for mobile
    let touchStartY = 0;
    
    imageViewerOverlay.addEventListener("touchstart", function(e) {
        touchStartY = e.touches[0].clientY;
    }, {passive: true});
    
    imageViewerOverlay.addEventListener("touchmove", function(e) {
        const touchY = e.touches[0].clientY;
        const diff = touchY - touchStartY;
        
        // If swiped down more than 50px, close the viewer
        if (diff > 50) {
            imageViewerOverlay.classList.remove("active");
            document.body.classList.remove("no-scroll");
        }
    }, {passive: true});
});