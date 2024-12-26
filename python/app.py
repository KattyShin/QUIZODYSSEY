from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from transformers import pipeline
import string
import os

app = Flask(__name__)

# Explicitly allow requests from specific origin
CORS(app, resources={r"/chat": {"origins": "https://quizodyssey.onrender.com"}})

# Setup NLTK and sentiment analysis (same as before)
nltk.data.path.append('./nltk_data')
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt', quiet=True)

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords', quiet=True)

try:
    sentiment_analysis = pipeline("sentiment-analysis")
except Exception as e:
    app.logger.error(f"Failed to initialize sentiment pipeline: {e}")
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
    sentiment = sentiment_analysis(user_input)[0]
    sentiment_label = sentiment['label']
    sentiment_score = sentiment['score']

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
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
