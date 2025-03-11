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
            
            // If we clicked outside both keyboard and text area, close the keyboard
            if (!isKeyboard && !isTextArea) {
                this.close();
            }
        });
    },

    _createKeyBtn(iconName, class1, onclick, class2) {
        this.keyElement = document.createElement("button");

        this.keyElement.setAttribute("type", "button");
        this.keyElement.classList.add("keyboard__key", class1);
        if (class2) this.keyElement.classList.add(class2);

        this.keyElement.innerHTML = iconName ? `<span class="material-icons">${iconName}</span>` : "";
        this.keyElement.addEventListener("click", onclick);
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
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput) {
        this.properties.value = initialValue || "";
        
        // Move the text area up and show keyboard simultaneously
        const textArea = document.querySelector(".text-area");
        textArea.classList.add("active");
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        // Hide keyboard and move text area down simultaneously
        this.elements.main.classList.add("keyboard--hidden");
        const textArea = document.querySelector(".text-area");
        textArea.classList.remove("active");
    },
};

// Initialize the keyboard
window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});