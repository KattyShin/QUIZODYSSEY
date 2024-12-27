class Chatbot {
    constructor() {
        this.chatbox = document.getElementById('chatbox');
        this.userInput = document.getElementById('userInput');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && this.userInput.value.trim() !== '') {
                this.sendMessage();
            }
        });
    }

    async sendMessage() {
        const userMessage = this.userInput.value.trim();
        if (!userMessage) return;

        try {
            // Display user message
            this.appendMessage('User', userMessage);
            this.userInput.value = '';

            // Show loading indicator
            const loadingDiv = this.appendMessage('Assistant', 'Thinking...');
            
            const response = await fetch('https://quizodyssey-py2.onrender.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Remove loading indicator and show response
            loadingDiv.remove();
            this.appendMessage('Assistant', data.response);

        } catch (error) {
            console.error('Error:', error);
            // Remove loading indicator if it exists
            const loadingDiv = document.querySelector('.loading');
            if (loadingDiv) loadingDiv.remove();
            
            // Show error message to user
            this.appendMessage('System', 'Sorry, I encountered an error. Please try again later.');
        }
    }

    appendMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender.toLowerCase()}`;
        
        const senderSpan = document.createElement('strong');
        senderSpan.textContent = `${sender}: `;
        
        const messageSpan = document.createElement('span');
        messageSpan.textContent = message;
        
        messageDiv.appendChild(senderSpan);
        messageDiv.appendChild(messageSpan);
        
        this.chatbox.appendChild(messageDiv);
        this.chatbox.scrollTop = this.chatbox.scrollHeight;
        
        return messageDiv;
    }
}

// Initialize the chatbot
const chatbot = new Chatbot();