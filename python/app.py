from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from transformers import pipeline
import string
import os

app = Flask(__name__)

# Configure CORS
CORS(app, 
     resources={
         r"/chat": {
             "origins": ["https://quizodyssey.onrender.com"],
             "methods": ["POST", "OPTIONS"],
             "allow_headers": ["Content-Type"],
             "supports_credentials": True,
             "max_age": 3600
         }
     })

# Setup NLTK data
nltk.download('punkt')
nltk.download('stopwords')
nltk.data.path.append(os.path.join(os.getcwd(), 'nltk_data'))

# Initialize sentiment analysis
try:
    sentiment_analysis = pipeline("sentiment-analysis")
except Exception as e:
    app.logger.error(f"Failed to initialize sentiment pipeline: {e}")
    sentiment_analysis = None

def preprocess_input(user_input):
    try:
        tokens = word_tokenize(user_input.lower())
        tokens = [word for word in tokens if word not in string.punctuation]
        stop_words = set(stopwords.words('english'))
        return [word for word in tokens if word not in stop_words]
    except Exception as e:
        app.logger.error(f"Tokenization error: {e}")
        return user_input.lower().split()

class ChatbotState:
    def __init__(self):
        self.conversation_started = False
        self.current_stage = 1
        self.question_history = []
        self.hints_used = 0
        self.MAX_HINTS = 5

# Create a global state object
global_state = ChatbotState()

def chatbot_response(user_input):
    global global_state
    
    try:
        processed_input = preprocess_input(user_input.lower())

        # Handle 'start' command
        if "start" in processed_input:
            global_state.conversation_started = True
            return {
                "response": (
                    "🎮 Welcome to Quiz Odyssey! 🎉\n\n"
                    "Ready to begin your quest for knowledge? Here's your adventure toolkit:\n"
                    "🤔 Need help? Type 'hint' followed by your question (max 5 hints)\n"
                    "🎁 Type 'chest' to learn about treasure chests\n"
                    "📖 Lost? Type 'help' for game mechanics\n"
                    "🎯 Type 'status' to see your current progress\n\n"
                    "What would you like to explore first?"
                )
            }

        # Check if game has started
        if not global_state.conversation_started:
            return {"response": "🎮 Type 'start' to begin your Quiz Odyssey adventure!"}

        # Handle other commands
        if "stage" in processed_input:
            return {
                "response": f"📍 You're currently on Stage {global_state.current_stage}!"
            }

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

        if "status" in processed_input:
            hints_remaining = max(0, global_state.MAX_HINTS - global_state.hints_used)
            return {
                "response": (
                    f"📊 Your Quest Status:\n"
                    f"Stage: {global_state.current_stage}\n"
                    f"Hints Used: {global_state.hints_used}\n"
                    f"Hints Remaining: {hints_remaining}\n"
                    f"Questions Answered: {len(global_state.question_history)}"
                )
            }

        if "hint" in processed_input:
            if global_state.hints_used >= global_state.MAX_HINTS:
                return {
                    "response": (
                        "❌ You've used all 5 hints already!\n"
                        "Try your best to solve the question on your own!"
                    )
                }
            global_state.hints_used += 1
            hints_remaining = global_state.MAX_HINTS - global_state.hints_used
            question = processed_input.split("hint", 1)[1].strip()
            if question:
                return {
                    "response": (
                        f"💡 Here's a hint for your question:\n"
                        f"[Hint for: {question}]\n"
                        f"(Hints remaining: {hints_remaining})"
                    )
                }
            return {"response": "❓ Please specify your question after 'hint'!"}

        if "help" in processed_input:
            return {
                "response": (
                    "🎮 Quiz Odyssey Guide:\n\n"
                    "1. Answer questions to progress\n"
                    "2. Explore chests for rewards\n"
                    "3. Use 'hint' for help (max 5 hints)\n"
                    "4. Type 'status' to view progress\n\n"
                    "Ready to continue?"
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
        response.headers.add('Access-Control-Allow-Origin', 'https://quizodyssey.onrender.com')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response, 200

    try:
        data = request.json
        user_message = data.get('message', '')

        if not user_message or not isinstance(user_message, str):
            return jsonify({"error": "Invalid input"}), 400

        response_data = chatbot_response(user_message)
        response = jsonify(response_data)
        response.headers.add('Access-Control-Allow-Origin', 'https://quizodyssey.onrender.com')
        return response

    except Exception as e:
        app.logger.error(f"Error: {str(e)}")
        return jsonify({"error": "Internal error occurred"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)