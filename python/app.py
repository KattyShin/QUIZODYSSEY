from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
import logging
from logging.handlers import RotatingFileHandler
import json

app = Flask(__name__)

# Enhanced logging setup
logging.basicConfig(level=logging.INFO)
handler = RotatingFileHandler('app.log', maxBytes=10000, backupCount=3)
handler.setFormatter(logging.Formatter(
    '[%(asctime)s] %(levelname)s in %(module)s: %(message)s'
))
app.logger.addHandler(handler)

# CORS setup
CORS(app, resources={
    r"/chat": {
        "origins": ["https://quizodyssey.onrender.com"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Environment variables with fallback
HUGGING_FACE_API_KEY = os.getenv('HUGGING_FACE_API_KEY')
if not HUGGING_FACE_API_KEY:
    app.logger.error("No Hugging Face API key found in environment variables")
    raise ValueError("HUGGING_FACE_API_KEY environment variable is required")

HUGGING_FACE_URL = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english"

headers = {
    "Authorization": f"Bearer {HUGGING_FACE_API_KEY}",
    "Content-Type": "application/json"
}

def make_api_request(user_input, max_retries=3):
    """Make API request with retry logic and detailed error logging."""
    for attempt in range(max_retries):
        try:
            # Log the exact payload being sent
            payload = {"inputs": user_input}
            app.logger.info(f"Request payload: {json.dumps(payload)}")
            app.logger.info(f"Request headers: {json.dumps({k: v for k, v in headers.items() if k != 'Authorization'})}")
            
            response = requests.post(
                HUGGING_FACE_URL,
                headers=headers,
                json=payload,
                timeout=10
            )
            
            # Log response details
            app.logger.info(f"Response Status Code: {response.status_code}")
            app.logger.info(f"Response Headers: {dict(response.headers)}")
            
            # Try to get response content, handle different formats
            try:
                response_content = response.json()
                app.logger.info(f"Response Content: {json.dumps(response_content)}")
            except json.JSONDecodeError:
                app.logger.error(f"Non-JSON response content: {response.text}")
                response_content = response.text

            # Check for specific error conditions
            if response.status_code == 400:
                app.logger.error(f"Bad Request Error. Response: {response_content}")
                if attempt < max_retries - 1:
                    app.logger.info("Retrying request...")
                    continue
                
            response.raise_for_status()
            return response_content

        except requests.exceptions.RequestException as e:
            app.logger.error(f"API request failed (attempt {attempt + 1}/{max_retries}): {str(e)}")
            if attempt == max_retries - 1:
                # On final attempt, include more detailed error information
                error_details = {
                    "error": str(e),
                    "url": HUGGING_FACE_URL,
                    "attempt": attempt + 1,
                    "max_retries": max_retries
                }
                if hasattr(e, 'response') and e.response is not None:
                    error_details["status_code"] = e.response.status_code
                    try:
                        error_details["response_content"] = e.response.json()
                    except:
                        error_details["response_content"] = e.response.text
                
                app.logger.error(f"Final error details: {json.dumps(error_details)}")
                raise

def validate_input(user_input):
    """Validate user input meets API requirements."""
    if not isinstance(user_input, str):
        raise ValueError("Input must be a string")
    
    # Remove leading/trailing whitespace
    user_input = user_input.strip()
    
    if len(user_input) == 0:
        raise ValueError("Input cannot be empty")
        
    if len(user_input) > 512:  # Adjust this limit based on model requirements
        raise ValueError("Input exceeds maximum length of 512 characters")
        
    return user_input

def chatbot_response(user_input):
    """Process user input and generate response."""
    try:
        # Validate and sanitize input
        validated_input = validate_input(user_input)
        
        # Make API request
        response_data = make_api_request(validated_input)
        
        # Validate response
        if not response_data or not isinstance(response_data, list):
            app.logger.error(f"Unexpected API response format: {response_data}")
            raise ValueError("Invalid API response format")

        sentiment_data = response_data[0]
        sentiment_label = sentiment_data.get("label", "UNKNOWN")
        sentiment_score = sentiment_data.get("score", 0.0)

        # Generate response message
        if sentiment_score < 0.6:
            response_message = "I'm not entirely sure, but I sense some mixed feelings in your message."
        else:
            response_message = (
                "I'm glad you're feeling positive!" if sentiment_label == "POSITIVE"
                else "I notice some concerns in your message. Would you like to talk about it?"
            )

        return {
            "response": response_message,
            "sentiment": sentiment_label,
            "confidence": sentiment_score,
            "status": "success"
        }

    except ValueError as e:
        app.logger.warning(f"Validation error: {str(e)}")
        return {
            "response": str(e),
            "sentiment": "UNKNOWN",
            "confidence": 0.0,
            "status": "error",
            "error_type": "validation"
        }

    except requests.exceptions.RequestException as e:
        app.logger.error(f"API error: {str(e)}")
        return {
            "response": "Sorry, I'm having trouble processing your message. Please try again later.",
            "sentiment": "UNKNOWN",
            "confidence": 0.0,
            "status": "error",
            "error_type": "api",
            "error_details": str(e)
        }

    except Exception as e:
        app.logger.error(f"Unexpected error: {str(e)}")
        return {
            "response": "An unexpected error occurred. Please try again later.",
            "sentiment": "UNKNOWN",
            "confidence": 0.0,
            "status": "error",
            "error_type": "internal",
            "error_details": str(e)
        }

@app.route('/chat', methods=['POST', 'OPTIONS'])
def chat():
    """Handle chat endpoint."""
    if request.method == 'OPTIONS':
        return handle_preflight()

    try:
        # Validate request
        if not request.is_json:
            raise ValueError("Content-Type must be application/json.")

        data = request.get_json()
        if not data or 'message' not in data:
            raise ValueError("Request must include 'message' field.")

        user_message = data['message']
        response_data = chatbot_response(user_message)

        return create_response(response_data)

    except ValueError as e:
        app.logger.warning(f"Invalid request: {str(e)}")
        return create_response({
            "error": str(e),
            "status": "error",
            "error_type": "validation"
        }), 400

    except Exception as e:
        app.logger.error(f"Server error: {str(e)}")
        return create_response({
            "error": "An internal server error occurred",
            "status": "error",
            "error_type": "internal"
        }), 500

def handle_preflight():
    """Handle CORS preflight requests."""
    response = jsonify({'status': 'ok'})
    response.headers.add('Access-Control-Allow-Origin', 'https://quizodyssey.onrender.com')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    return response

def create_response(data):
    """Create JSON response with CORS headers."""
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', 'https://quizodyssey.onrender.com')
    return response

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)