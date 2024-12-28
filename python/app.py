from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
import string
import os

app = Flask(__name__)





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
        self.current_stage = 1
        self.question_history = []

# Create a global state object
global_state = ChatbotState()

def chatbot_response(user_input):
    global global_state

    try:
        processed_input = preprocess_input(user_input.lower())

        # Start the game
        if "start" in processed_input:
            if global_state.conversation_started:
                return {"response": "🎮 You have already started your journey!"}
            global_state.conversation_started = True
            return {
                "response": (
                    "🎮 Welcome to Quiz Odyssey! 🎉\n\n"
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

        # Show current stage
        if "stage" in processed_input:
            return {
                "response": f"📍 You're currently on Stage {global_state.current_stage}!"
            }

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

        # Display player status
        if "status" in processed_input:
            return {
                "response": (
                    f"📊 Your Quest Status:\n"
                    f"Stage: {global_state.current_stage}\n"
                    f"Questions Answered: {len(global_state.question_history)}"
                )
            }

        # House lore or history
        if "houses" in processed_input:
            return {
                "response": (
                    "🏰 The Three Houses of Quiz Odyssey:\n\n"
                    "1. **The House of Wisdom**\n"
                    "   - An ancient mansion filled with puzzles and challenges. It is said that only those with true wisdom can pass through its trials.\n\n"
                    "2. **The House of Mystery**\n"
                    "   - A mansion shrouded in darkness and mystery. Its rooms are filled with cryptic riddles and secrets waiting to be uncovered.\n\n"
                    "3. **The House of Strength**\n"
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
            return {
                "response": (
                    "😄 Here's a joke for you:\n"
                    "Why don't skeletons fight each other? They don't have the guts!"
                )
            }

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
