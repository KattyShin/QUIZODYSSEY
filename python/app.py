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

def chatbot_response(user_input):
    try:
        # Preprocess user input
        processed_input = preprocess_input(user_input)

        # If no input or first interaction, guide the user
        if not user_input.strip() or "start" in processed_input:
            response = (
                "Welcome to Quiz Odyssey! 🎉 Here's how you can interact with me:\n"
                "- Type 'stage' to check your progress or proceed to the next stage.\n"
                "- Type 'hint' to get help with a question.\n"
                "- Type 'use pass' if you have a pass token to skip a question.\n"
                "- Type 'chest' to learn more about pass tokens.\n"
                "How can I assist you with the quiz today?"
            )
        elif "stage" in processed_input:
            response = (
                "Each stage contains questions that you must answer correctly to proceed. "
                "Do you need help with a specific question or a hint?"
            )
        elif "chest" in processed_input or "pass" in processed_input:
            response = (
                "You can find pass tokens in chests! These tokens allow you to skip difficult questions. "
                "Type 'use pass' when you're ready to use one."
            )
        elif "use" in processed_input and "pass" in processed_input:
            response = "Pass token used! The question has been skipped. Moving on to the next question."
        elif "hint" in processed_input:
            response = (
                "Hints are available! Let me know the question number, and I’ll provide a helpful tip. "
                "For example, you can say 'hint for question 2'."
            )
        elif "help" in processed_input:
            response = (
                "This is a quiz game! Complete all questions in a stage to proceed to the next. "
                "Ask for 'hint' to get help with a question or 'use pass' if you have a pass token to skip. "
                "What would you like to do next?"
            )
        else:
            # Fallback response for unrecognized input
            response = (
                "I didn’t quite get that. Remember, you can type 'stage', 'hint', 'use pass', or 'help' "
                "to get started. What can I help you with?"
            )

        return {
            "response": response,
            "sentiment": "NEUTRAL",  # Since sentiment analysis is not tied to game mechanics here
            "confidence": 1.0  # Confidence is set to maximum for rule-based responses
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