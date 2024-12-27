from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)

# Allow all origins for CORS; replace "*" with specific domains if needed
CORS(app, resources={r"/*": {"origins": "*"}})

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")  # Ensure this is set in your Render environment

# Generic fallback for OpenAI exceptions
OpenAIError = Exception

def generate_ai_response(user_input):
    """Generate a conversational response using OpenAI's API."""
    try:
        # Correct method to use for the chat model
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Or gpt-4 if you have access
            messages=[{"role": "user", "content": user_input}],
            max_tokens=150,
            temperature=0.7
        )
        return response['choices'][0]['message']['content'].strip()
    except OpenAIError as e:
        app.logger.error(f"OpenAI API error: {e}")
        return "I encountered an issue while generating a response."

@app.route('/chat', methods=['POST', 'OPTIONS'])
def chat():
    """Handle chat requests."""
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Origin', 'https://quizodyssey.onrender.com')  # Make sure this matches your frontend URL
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response, 200

    try:
        data = request.json
        user_message = data.get('message', '')

        if not user_message or not isinstance(user_message, str):
            return jsonify({"error": "Invalid input"}), 400

        response_data = {"response": generate_ai_response(user_message)}
        response = jsonify(response_data)
        response.headers.add('Access-Control-Allow-Origin', 'https://quizodyssey.onrender.com')  # Again, make sure this matches your frontend URL
        return response
    except Exception as e:
        app.logger.error(f"Error: {e}")
        return jsonify({"error": "An internal error occurred"}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
