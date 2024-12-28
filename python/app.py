from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
import string
import os

app = Flask(__name__)

@app.route('/api/username', methods=['POST'])
def receive_username():
    try:
        data = request.json
        username = data.get('username')
        firstname = data.get('firstname')
        lastname = data.get('lastname')

        # Handle the username, firstname, lastname here (e.g., store it in a session or database)
        print(f"Username: {username}, Firstname: {firstname}, Lastname: {lastname}")

        # Store username in global_state (or session/cookie for persistent use)
        global_state.username = username

        return jsonify({"message": "Username received successfully", "username": username, "firstname": firstname, "lastname": lastname})
    
    except Exception as e:
        return jsonify({"error": "An error occurred while processing your request", "details": str(e)}), 500







# Configure CORS for local development (allow localhost:3000 as frontend)
CORS(app, 
     resources={r"/*": {
         "origins": ["http://127.0.0.1:5501", "http://localhost:5501"],  
         "methods": ["POST", "OPTIONS"],
         "allow_headers": ["Content-Type"],
         "supports_credentials": True,
         "max_age": 3600
     }})

# Setup NLTK data
nltk.download('punkt')
nltk.download('stopwords')

# Preprocess user input
def preprocess_input(user_input):
    try:
        tokens = nltk.word_tokenize(user_input.lower())
        tokens = [word for word in tokens if word not in string.punctuation]
        stop_words = set(nltk.corpus.stopwords.words('english'))
        return [word for word in tokens if word not in stop_words]
    except Exception as e:
        app.logger.error(f"Tokenization error: {e}")
        return user_input.lower().split()

class ChatbotState:
    def __init__(self):
        self.conversation_started = False
        self.username = None  # Store the username
        self.current_stage = 0
        self.question_history = []

# Create a global state object
global_state = ChatbotState()

import random  # Make sure to import random at the top of your script

def chatbot_response(user_input):
    global global_state

    try:
        processed_input = preprocess_input(user_input.lower())

        # Start the game
        if "start" in processed_input:
            if global_state.username is None:
                return {"response": "🚫 You need to log in first!"}

            if global_state.conversation_started:
                return {"response": "🎮 You have already started your journey!"}

            global_state.conversation_started = True
            return {
                "response": (
                    f"🎮 Welcome to Quiz Odyssey, {global_state.username} 🎉\n\n"  # Use global_state.username here
                    "Ready to begin your quest for knowledge? Here's your adventure toolkit:\n"
                    "🤔 Need help? Type 'help' for game mechanics\n"
                    "🎁 Type 'chest' to learn about treasure chests\n"
                    "📖 Type 'houses' to learn about the different houses\n"
                    "🎯 Type 'status' to see your current progress\n\n"
                    "What would you like to explore first?"
                )
            }

        # Ensure game is started
        if not global_state.conversation_started:
            return {"response": "🎮 Type 'start' to begin your Quiz Odyssey adventure!"}

        # Information about treasure chests
        if "chest" in processed_input:
            return {
                "response": (
                    "📦 About Treasure Chests:\n\n"
                    "In Quiz Odyssey, treasure chests can contain various items:\n"
                    "🎟️ Pass Tokens - Special items that let you skip challenging questions\n"
                    "❌ Bokya - Empty chests with no rewards\n\n"
                    "Keep exploring different areas to find these chests!"
                )
            }

        # Display player status and current stage
        # Ensure game is started before showing the status
        if "status" in processed_input:
            if global_state.current_stage == 0:
                return {"response": ("🚫 You haven't started your journey yet.\n"
                        "Enter The House of Wisdom fisrt to begin you journey")}

            house = ""
            if global_state.current_stage == 1:
                house = "The House of Wisdom"
            elif global_state.current_stage == 2:
                house = "The House of Mystery"
            elif global_state.current_stage == 3:
                house = "The House of Strength"

            # Placeholder values for demonstration (replace with actual logic)
            best_score = 200  # Replace with actual best score logic
            current_score = 150  # Replace with actual current score logic
            passes_used = 3  # Replace with actual passes used logic

            return {
                "response": (
                    f"📍 Current Stage: {global_state.current_stage} - {house}\n"
                    f"🏆 Best Score: {best_score}\n"
                    f"⭐ Current Score: {current_score}\n"
                    f"🎟️ Passes Used: {passes_used}\n"
                )
            }


        # House lore or history
        if "houses" in processed_input:
            return {
                "response": (
                    "🏰 The Three Houses of Quiz Odyssey:\n\n"
                    "1. **The House of Wisdom (STAGE 1)**\n"
                    "   - An ancient mansion filled with  challenges. It is said that only those with true wisdom can pass through its trials.\n\n"
                    "2. **The House of Mystery (STAGE 2)**\n"
                    "   - A mansion shrouded in darkness and mystery. Its rooms are filled with cryptic riddles and secrets waiting to be uncovered.\n\n"
                    "3. **The House of Strength (STAGE 3)**\n"
                    "   - A fortress built for the bravest of adventurers. It is home to fierce trials that test not only your knowledge but your resilience.\n\n"
                    "Each house offers different challenges, but only the wise and determined will succeed in their quests!"
                )
            }

        # Help command for game mechanics
        if "help" in processed_input:
            return {
                "response": (
                    "🎮 Quiz Odyssey Guide:\n\n"
                    "1. Answer questions to progress\n"
                    "2. Explore chests for rewards\n"
                    "3. Type 'status' to view progress\n"
                    "4. Type 'houses' to learn about the different houses\n"
                    "5. Type 'stage' to see your current stage\n\n"
                    "Ready to continue?"
                )
            }

        # Fun interaction: Jokes or casual conversation
        if "joke" in processed_input:
            jokes = [
                "😄 Here's a joke for you:\nWhy don't skeletons fight each other? They don't have the guts!",
                "😆 Here's a joke for you:\nWhy don't eggs tell jokes? They'd crack each other up!",
                "🤣 Here's a joke for you:\nWhy don’t scientists trust atoms? Because they make up everything!",
                "😂 Here's a joke for you:\nWhy was the math book sad? Because it had too many problems!"
            ]
            return {"response": random.choice(jokes)}

        return {"response": "🤔 Unrecognized command. Try 'help' for options!"}

    except Exception as e:
        app.logger.error(f"Error in chatbot response: {e}")
        return {"response": "🚫 Oops! Something went wrong."}



@app.route('/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200

    try:
        data = request.json
        user_message = data.get('message', '')

        if not user_message or not isinstance(user_message, str):
            return jsonify({"error": "Invalid input"}), 400

        response_data = chatbot_response(user_message)
        response = jsonify(response_data)
        response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response

    except Exception as e:
        app.logger.error(f"Error: {str(e)}")
        return jsonify({"error": "Internal error occurred"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='127.0.0.1', port=port)
