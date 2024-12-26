from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from transformers import pipeline
import string
import os

app = Flask(__name__)

# Allow requests only from your frontend URL
CORS(app, resources={r"/*": {"origins": "https://quizodyssey.onrender.com", "allow_headers": ["Content-Type"]}})

# Ensure necessary NLTK data is downloaded
nltk.data.path.append('./nltk_data')  # Add a local path for NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt', quiet=True)

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords', quiet=True)

# Initialize sentiment analysis pipeline
try:
    sentiment_analysis = pipeline("sentiment-analysis")
except Exception as e:
    app.logger.error(f"Failed to initialize sentiment pipeline: {e}", exc_info=True)
    sentiment_analysis = None

def preprocess_input(user_input):
    tokens = word_tokenize(user_input.lower())
    tokens = [word for word in tokens if word not in string.punctuation]
    stop_words = set(stopwords.words('english'))
    filtered_tokens = [word for word in tokens if word not in stop_words]
    return filtered_tokens

def chatbot_response(user_input):
    if sentiment_analysis is None:
        return {
            "response": "Sorry, sentiment analysis is temporarily unavailable.",
            "sentiment": "UNKNOWN",
            "confidence": 0.0,
        }

    processed_input = preprocess_input(user_input)

    # Get sentiment analysis
    sentiment = sentiment_analysis(user_input)[0]
    sentiment_label = sentiment['label']
    sentiment_score = sentiment['score']

    # Basic response logic
    if "hi" in processed_input:
        response = "Hi langga ni kaon naka ara?"
    elif "wala" in processed_input:
        response = "Kaon na langga ayaw sig code kay MABOANG naka ana"
    elif "name" in processed_input:
        response = "I'm an AI-powered chatbot. What's your name?"
    elif "weather" in processed_input:
        response = "I'm not sure about the weather right now, but you can check a weather app!"
    else:
        if sentiment_label == "POSITIVE":
            response = "I'm glad you're feeling positive! How can I help you further?"
        else:
            response = "I sense some concern in your message. How can I help make things better?"

    return {
        "response": response,
        "sentiment": sentiment_label,
        "confidence": sentiment_score
    }

@app.route('/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        # This is the preflight request
        response = jsonify({'message': 'Preflight request successful'})
        response.headers.add('Access-Control-Allow-Origin', 'https://quizodyssey.onrender.com')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    try:
        data = request.json
        user_message = data.get('message', '')

        if not user_message or not isinstance(user_message, str):
            return jsonify({"error": "Invalid input. Please provide a valid message."}), 400

        response_data = chatbot_response(user_message)
        return jsonify(response_data)

    except Exception as e:
        app.logger.error(f"Unhandled exception: {e}", exc_info=True)
        return jsonify({"error": "An internal error occurred. Please try again later."}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
