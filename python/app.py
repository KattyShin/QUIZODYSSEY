from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer
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

# Initialize conversational model
try:
    model_name = "gpt2"  # Replace with a more advanced model if desired
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name)
except Exception as e:
    app.logger.error(f"Failed to load conversational model: {e}")
    model, tokenizer = None, None


def preprocess_input(user_input):
    try:
        tokens = word_tokenize(user_input.lower())
        tokens = [word for word in tokens if word not in string.punctuation]
        stop_words = set(stopwords.words('english'))
        return [word for word in tokens if word not in stop_words]
    except Exception as e:
        app.logger.error(f"Tokenization error: {e}")
        return user_input.lower().split()


def generate_ai_response(user_input):
    """Generate a conversational response using the AI model."""
    if not model or not tokenizer:
        return "Sorry, my conversational abilities are currently unavailable."
    
    try:
        inputs = tokenizer.encode(user_input, return_tensors="pt")
        outputs = model.generate(inputs, max_length=150, num_return_sequences=1, pad_token_id=tokenizer.eos_token_id)
        return tokenizer.decode(outputs[0], skip_special_tokens=True)
    except Exception as e:
        app.logger.error(f"Error generating AI response: {e}")
        return "I encountered an issue while generating a response."


def chatbot_response(user_input):
    """Generates a response using sentiment analysis and conversational AI."""
    if sentiment_analysis is None:
        return {
            "response": "Sorry, sentiment analysis is temporarily unavailable.",
            "sentiment": "UNKNOWN",
            "confidence": 0.0,
        }

    try:
        sentiment = sentiment_analysis(user_input)[0]
        sentiment_label = sentiment['label']
        sentiment_score = sentiment['score']

        # Generate dynamic response using AI
        response = generate_ai_response(user_input)

        return {
            "response": response,
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
