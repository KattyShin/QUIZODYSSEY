from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, AutoModelForCausalLM
import logging

# Set up logging for debugging purposes
logging.basicConfig(level=logging.INFO)

# Initialize the Flask app
app = Flask(__name__)
CORS(app, 
     resources={r"/*": {
         "origins": ["http://127.0.0.1:5501", "http://localhost:5501"],  
         "methods": ["POST", "OPTIONS"],
         "allow_headers": ["Content-Type"],
         "supports_credentials": True,
         "max_age": 3600
     }})

@app.route('/api/username', methods=['POST'])
def receive_username():
    try:
        data = request.json
        username = data.get('username')
        firstname = data.get('firstname')
        lastname = data.get('lastname')

        # Handle the username, firstname, lastname here (e.g., store it in a session or database)
        print(f"Username: {username}, Firstname: {firstname}, Lastname: {lastname}")

        return jsonify({"message": "Username received successfully", "username": username, "firstname": firstname, "lastname": lastname})
    
    except Exception as e:
        return jsonify({"error": "An error occurred while processing your request", "details": str(e)}), 500


@app.route('/api/quiz', methods=['POST'])
def receive_quiz_data():
    try:
        data = request.json
        quiz_id = data.get('quizId')
        best_score = data.get('bestScore')

        # Log or handle the quiz data (e.g., store it in a session or database)
        print(f"Received quiz data - Quiz ID: {quiz_id}, Best Score: {best_score}")

        return jsonify({"message": "Quiz data received successfully", "quizId": quiz_id, "bestScore": best_score})

    except Exception as e:
        return jsonify({"error": "An error occurred while processing your request", "details": str(e)}), 500


# Initialize tokenizer and models with error handling
try:
    logging.info("Loading tokenizer and models...")

    # FLAN-T5 for factual responses
    tokenizer_flant5 = AutoTokenizer.from_pretrained("google/flan-t5-large")
    model_flant5 = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-large", resume_download=True)

    # DialoGPT for conversational responses
    tokenizer_dialo = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
    model_dialo = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium", resume_download=True)

    logging.info("Models and tokenizers loaded successfully.")
except Exception as e:
    logging.error(f"Error loading models or tokenizers: {e}")
    tokenizer_flant5, model_flant5, tokenizer_dialo, model_dialo = None, None, None, None


@app.route("/")
def index():
    """Serve the chat interface HTML."""
    return render_template("chat.html")


@app.route("/get", methods=["POST"])
def chat():
    """Handle chat messages and generate responses."""
    if not tokenizer_flant5 or not model_flant5 or not tokenizer_dialo or not model_dialo:
        return jsonify({"response": "Model is not available. Please try again later."}), 500

    data = request.get_json()  # Retrieve JSON data from the request
    msg = data.get("msg", "").strip()  # Safely get and trim the 'msg' key

    if not msg:
        return jsonify({"response": "Please enter a valid message."}), 400

    try:
        response = generate_response(msg)
        return jsonify({"response": response})  # Return JSON response
    except Exception as e:
        logging.error(f"Error generating response: {e}")
        return jsonify({"response": "An error occurred while processing your request."}), 500


def generate_response(text):
    """
    Generate a conversational or factual response based on the input.

    Args:
        text (str): The input text.

    Returns:
        str: The response.
    """
    lower_text = text.lower()

    # Handle conversational responses using predefined responses
    conversational_responses = {
       "chest": "📦 About Treasure Chests:\n\nIn Quiz Odyssey, treasure chests can contain various items:\n🎟️ Pass Tokens - Special items that let you skip challenging questions\n❌ Bokya - Empty chests with no rewards\n\nKeep exploring different areas to find these chests!",
        "houses": "1. **The House of Wisdom (STAGE 1)**\n   - An ancient mansion filled with challenges. It is said that only those with true wisdom can pass through its trials.\n\n2. **The House of Mystery (STAGE 2)**\n   - A mansion shrouded in darkness and mystery. Its rooms are filled with cryptic riddles and secrets waiting to be uncovered.\n\n3. **The House of Strength (STAGE 3)**\n   - A fortress built for the bravest of adventurers. It is home to fierce trials that test not only your knowledge but your resilience.\n\nEach house offers different challenges, but only the wise and determined will succeed in their quests!",
        "help": "🎮 Quiz Odyssey Guide:\n\n1. Answer questions to progress\n2. Explore chests for rewards\n3. Type 'status' to view progress\n4. Type 'houses' to learn about the different houses\n5. Type 'stage' to see your current stage\n\n"
    }

    if lower_text in conversational_responses:
        return conversational_responses[lower_text]

    # Use FLAN-T5 for factual responses to avoid repetition
    if "?" in lower_text or lower_text.startswith(("who", "what", "where", "why", "how")):
        response = get_factual_response_flant5(text)

        # Check if the generated response is too similar to the input (avoid repetition)
        if response.strip().lower() == text.lower():
            response = "I am not sure how to answer that. Could you clarify?"
        return response

    # If it's a casual or conversational query, use DialoGPT
    return get_conversational_response_dialo(text)


def get_factual_response_flant5(text):
    """
    Generate a factual response using the FLAN-T5 model.

    Args:
        text (str): The input text/question.

    Returns:
        str: The model's response.
    """
    input_text = f"Provide a conversational yet factual response: {text}"

    # Tokenize the input
    input_ids = tokenizer_flant5.encode(input_text, return_tensors="pt")

    # Generate a response
    outputs = model_flant5.generate(input_ids, max_length=200, num_beams=3, early_stopping=True)

    # Decode and return the response
    response = tokenizer_flant5.decode(outputs[0], skip_special_tokens=True)

    # Check for repetition of the input and handle it
    if response.strip().lower() == text.lower():
        response = "I couldn't quite understand that. Could you ask in a different way?"
        
    return response


def get_conversational_response_dialo(text):
    """
    Generate a conversational response using DialoGPT and remove the input text from the response.

    Args:
        text (str): The input text/question.

    Returns:
        str: The model's response without the input text.
    """
    # Tokenize the input
    input_ids = tokenizer_dialo.encode(text + tokenizer_dialo.eos_token, return_tensors="pt")

    # Generate a response
    outputs = model_dialo.generate(input_ids, max_length=200, pad_token_id=tokenizer_dialo.eos_token_id)

    # Decode the response
    response = tokenizer_dialo.decode(outputs[0], skip_special_tokens=True)

    # Remove the input text from the response (basic filtering)
    if response.lower().startswith(text.lower()):
        response = response[len(text):].strip()

    # Check if the response still starts with the input text after stripping
    if response.strip().lower() == text.lower():
        response = "I didn't quite get that. Could you say it in a different way?"

    return response


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='127.0.0.1', port=port)
