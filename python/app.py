from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests

app = Flask(__name__)

# Allow CORS for all routes and from your frontend origin
CORS(app, resources={r"/*": {"origins": "https://quizodyssey.onrender.com"}})

# Your Hugging Face API key
HUGGING_FACE_API_KEY = os.getenv('HUGGING_FACE_API_KEY')

# Hugging Face sentiment analysis model endpoint
HUGGING_FACE_URL = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english"

headers = {
    "Authorization": f"Bearer {HUGGING_FACE_API_KEY}"
}

def preprocess_input(user_input):
    return user_input  # Send as is to Hugging Face API

def chatbot_response(user_input):
    try:
        # Send request to Hugging Face API
        response = requests.post(HUGGING_FACE_URL, headers=headers, json={"inputs": user_input})
        
        if response.status_code != 200:
            return {"response": "Sorry, there was an issue with the AI service.", "sentiment": "UNKNOWN", "confidence": 0.0}
        
        response_data = response.json()
        sentiment_label = response_data[0]["label"]
        sentiment_score = response_data[0]["score"]

        response_message = "I'm glad you're feeling positive!" if sentiment_label == "POSITIVE" else "I sense some concern in your message."

        return {
            "response": response_message,
            "sentiment": sentiment_label,
            "confidence": sentiment_score
        }

    except Exception as e:
        app.logger.error(f"Error in chatbot response: {e}")
        return {"response": "I encountered an error processing your message.", "sentiment": "UNKNOWN", "confidence": 0.0}

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

        if not user_message:
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
