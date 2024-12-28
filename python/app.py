# backend.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from transformers import pipeline
import string
import os

app = Flask(__name__)
CORS(app, resources={r"/chat": {"origins": "https://quizodyssey.onrender.com"}})

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

# Track whether the user has started the conversation
conversation_started = False  # Global variable to track conversation state


class ChatbotState:
    def __init__(self):
        self.conversation_started = False
        self.current_stage = 1
        self.question_history = []
        self.hints_used = 0
        self.MAX_HINTS = 5  # Added constant for maximum hints     

def chatbot_response(user_input, state=None):
    if state is None:
        state = ChatbotState()

    try:
        # Preprocess user input
        processed_input = preprocess_input(user_input.lower())

        # Initial conversation state
        if not state.conversation_started:
            if "start" in processed_input:
                state.conversation_started = True
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
            return {
                "response": "🎮 Type 'start' to begin your Quiz Odyssey adventure!"
            }

        # Handle various commands
        if "stage" in processed_input:
            return {
                "response": (
                    f"📍 You're currently on Stage {state.current_stage}!\n"
                    "Each stage has unique challenges waiting to be conquered.\n"
                    "Would you like a hint for your current question?"
                )
            }

        if "chest" in processed_input:
            return {
                "response": (
                    "📦 About Treasure Chests:\n\n"
                    "In Quiz Odyssey, treasure chests can contain various items:\n"
                    "🎟️ Pass Tokens - Special items that let you skip challenging questions\n"
                    "❌ Bokya - Empty chests with no rewards\n\n"
                    "Keep exploring different areas to find these chests! Good luck on your quest!"
                )
            }

        if "status" in processed_input:
            hints_remaining = max(0, state.MAX_HINTS - state.hints_used)
            return {
                "response": (
                    f"📊 Your Quest Status:\n"
                    f"Stage: {state.current_stage}\n"
                    f"Hints Used: {state.hints_used}\n"
                    f"Hints Remaining: {hints_remaining}\n"
                    f"Questions Answered: {len(state.question_history)}"
                )
            }

        if "hint" in processed_input:
            # Check if maximum hints limit reached
            if state.hints_used >= state.MAX_HINTS:
                return {
                    "response": (
                        "❌ You've used all 5 hints already!\n"
                        "I can't help you with any more hints.\n"
                        "Try your best to solve the question on your own, or look for a pass token in chests!"
                    )
                }
            
            state.hints_used += 1
            hints_remaining = state.MAX_HINTS - state.hints_used
            # Extract the question from user input after "hint"
            question = processed_input.split("hint", 1)[1].strip()
            if question:
                return {
                    "response": (
                        f"💡 Here's a hint for your question:\n"
                        f"[Specific hint would be generated based on: {question}]\n"
                        f"(This is your {state.hints_used}th hint used. You have {hints_remaining} hints remaining)"
                    )
                }
            return {
                "response": "❓ Please specify your question after 'hint' to get help!"
            }

        if "help" in processed_input:
            return {
                "response": (
                    "🎮 Quiz Odyssey Guide:\n\n"
                    "1. Answer questions to progress through stages\n"
                    "2. Explore the area to find chests containing pass tokens or bokya\n"
                    "3. Use 'hint' + your question for help (maximum 5 hints)\n"
                    "4. Type 'chest' to learn about possible chest contents\n"
                    "5. Check your 'status' anytime\n\n"
                    "Ready to continue your quest?"
                )
            }

        # Default response for unrecognized commands
        return {
            "response": (
                "🤔 I'm not sure what you mean.\n"
                "Try these commands:\n"
                "'stage' - Check your current stage\n"
                "'hint' + question - Get help (5 hints max)\n"
                "'chest' - Learn about treasure chests\n"
                "'status' - View your progress\n"
                "'help' - Game guide"
            )
        }

    except Exception as e:
        app.logger.error(f"Error in chatbot response: {e}")
        return {
            "response": "🚫 Oops! Something went wrong. Please try again."
        }


    except Exception as e:
        app.logger.error(f"Error in chatbot response: {e}")
        return {
            "response": "I encountered an error processing your message. Please try again.",
            "sentiment": "UNKNOWN",
            "confidence": 0.0
        }


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
        return jsonify({"error": "An internal error occurred"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)