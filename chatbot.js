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
    
        // Add user message
        this.appendMessage(message, "user");
        this.chatInput.value = "";
    
        try {
            console.log("Sending message:", message);  // Log the message being sent
            const response = await fetch("https://python-quizodyssey.onrender.com/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server response error:", errorText);  // Log error response
                throw new Error(`Server Error: ${errorText}`);
            }
    
            const data = await response.json();
            console.log("Received response:", data);  // Log the response data
    
            // Display bot response
            this.appendMessage(data.response, "bot");
        } catch (error) {
            console.error("Error:", error);
            this.appendMessage(
                "Sorry, I encountered an error. Please try again.",
                "bot"
            );
        }
    }
    

    appendMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.classList.add(
            sender === "user" ? "user-message" : "bot-message"
        );
        messageDiv.textContent = text;

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize the chatbot when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const chatbot = new Chatbot();
});
