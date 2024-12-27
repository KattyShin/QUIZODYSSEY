import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/chat": {"origins": "https://quizodyssey.onrender.com"}})

# Set your Hugging Face API token
HUGGING_FACE_API_KEY = os.getenv('HUGGING_FACE_API_KEY')  # Ensure this is set in your environment

# Hugging Face sentiment-analysis model endpoint
HUGGING_FACE_URL = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english"  # Example model

# Headers with your API token for authentication
headers = {
    "Authorization": f"Bearer {HUGGING_FACE_API_KEY}"
}

def preprocess_input(user_input):
    """Preprocess the user input (tokenize, lower case, remove stopwords, etc.)."""
    # This part can be adjusted as needed. For simplicity, we send the input as-is to the API.
    return user_input

def chatbot_response(user_input):
    """Generate a chatbot response using Hugging Face API."""
    try:
        # Preprocess input
        processed_input = preprocess_input(user_input)

        # Send request to Hugging Face API
        response = requests.post(HUGGING_FACE_URL, headers=headers, json={"inputs": processed_input})
        
        # Check if the API call was successful
        if response.status_code != 200:
            return {"response": "Sorry, there was an issue with the AI service.", "sentiment": "UNKNOWN", "confidence": 0.0}
        
        # Parse the API response
        response_data = response.json()

        # Extract sentiment label and score from the API response
        sentiment_label = response_data[0]["label"]
        sentiment_score = response_data[0]["score"]

        # Generate a response based on sentiment
        if sentiment_label == "POSITIVE":
            response_message = "I'm glad you're feeling positive! How can I help you further?"
        else:
            response_message = "I sense some concern in your message. How can I help make things better?"

        return {
            "response": response_message,
            "sentiment": sentiment_label,
            "confidence": sentiment_score
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
    """Handle chat requests."""
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
