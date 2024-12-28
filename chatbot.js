class Chatbot {
    constructor() {
        this.dialogOverlay = document.getElementById("npcHome1Bot");
        this.messagesContainer = document.getElementById("messagesContainer");
        this.chatInput = this.dialogOverlay.querySelector(".chat-input");
        this.sendButton = this.dialogOverlay.querySelector(".send-button");
        this.setupEventListeners();

        // Initial chatbot message
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
            const response = await fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
        
        // Split the text by newlines and create paragraph elements
        const paragraphs = text.split('\n').filter(line => line.trim() !== '');
        
        paragraphs.forEach(paragraph => {
            const p = document.createElement("p");
            p.textContent = paragraph;
            p.style.margin = "0.5em 0"; // Add some spacing between paragraphs
            messageDiv.appendChild(p);
        });

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

document.addEventListener("DOMContentLoaded", () => new Chatbot());