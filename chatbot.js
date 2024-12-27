// chatbot.js
class Chatbot {
    constructor() {
        this.dialogOverlay = document.getElementById("npcHome1Bot");
        this.messagesContainer = document.getElementById("messagesContainer");
        this.chatInput = this.dialogOverlay.querySelector(".chat-input");
        this.sendButton = this.dialogOverlay.querySelector(".send-button");
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.sendButton.addEventListener("click", () => this.sendMessage());
        this.chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.sendMessage();
            }
        });
    }

    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        try {
            this.appendMessage(message, "user");
            this.chatInput.value = "";
            this.sendButton.disabled = true;

            const response = await fetch("https://python-quizodyssey.onrender.com/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
                credentials: "omit"
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const data = await response.json();
            this.appendMessage(data.response, "bot");
        } catch (error) {
            console.error("Error:", error);
            this.appendMessage("Sorry, I encountered an error. Please try again.", "bot");
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

document.addEventListener("DOMContentLoaded", () => {
    const chatbot = new Chatbot();
});