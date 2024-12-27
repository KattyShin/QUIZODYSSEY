from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app, resources={r"/chat": {"origins": "https://quizodyssey.onrender.com"}})

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")  # Make sure to set the OPENAI_API_KEY environment variable

def generate_ai_response(user_input):
    """Generate a conversational response using OpenAI's API."""
    try:
        # Call OpenAI API for text generation
        response = openai.Completion.create(
            model="text-davinci-003",  # Or "gpt-3.5-turbo" or "gpt-4" if you have access
            prompt=user_input,
            max_tokens=150,  # Adjust based on your requirements
            temperature=0.7  # Control creativity in the response
        )

        return response.choices[0].text.strip()

    except openai.error.OpenAIError as e:
        app.logger.error(f"Error generating AI response: {e}")
        return "I encountered an issue while generating a response."

def chatbot_response(user_input):
    """Generates a response using OpenAI API."""
    try:
        # Generate dynamic response using OpenAI's API
        response = generate_ai_response(user_input)

        return {
            "response": response,
            "sentiment": "UNKNOWN",  # Sentiment is not used anymore
            "confidence": 0.0
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
    