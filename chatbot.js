class Chatbot {
    constructor() {
        this.dialogOverlay = document.getElementById("npcHome1Bot");
        this.messagesContainer = document.getElementById("messagesContainer");
        this.chatInput = this.dialogOverlay.querySelector(".chat-input");
        this.sendButton = this.dialogOverlay.querySelector(".send-button");
        this.setupEventListeners();

        this.appendMessage("Good morning! Enter 'start' to begin.", "bot");
    }

    setupEventListeners() {
        this.sendButton.addEventListener("click", () => this.sendMessage());
        this.chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") this.sendMessage();
        });
    }

    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        this.appendMessage(message, "user");
        this.chatInput.value = "";
        this.sendButton.disabled = true;

        try {
            const response = await fetch("https://quizodyssey-py2.onrender.com/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.appendMessage(data.response, "bot");
        } catch (error) {
            console.error("Error:", error);
            this.appendMessage("Sorry, there was an error connecting to the server. Please try again later.", "bot");
        } finally {
            this.sendButton.disabled = false;
        }
    }

    appendMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", `${sender}-message`);
        messageDiv.textContent = text;
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

document.addEventListener("DOMContentLoaded", () => new Chatbot());
