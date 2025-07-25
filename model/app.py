from flask import Flask, jsonify, request
import openai
import random
import os
import json
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)

dishes = [
    "Rendang", "Nasi Goreng", "Sate Ayam", "Bakso", "Soto Ayam",
    "Gado-Gado", "Pempek", "Ayam Penyet", "Gudeg", "Tahu Gejrot"
]

# Add a global pool of possible ingredients for distractors
GLOBAL_INGREDIENTS = [
    "Rice", "Chicken", "Beef", "Egg", "Tofu", "Tempeh", "Coconut Milk", "Chili", "Garlic", "Shallot", "Peanut", "Potato", "Noodle", "Fish", "Shrimp", "Soy Sauce", "Palm Sugar", "Tamarind", "Cabbage", "Carrot", "Cucumber", "Banana Leaf", "Lime", "Lemongrass", "Galangal", "Turmeric", "Coriander", "Bay Leaf", "Salt", "Pepper", "Oil"
]

@app.route("/generate", methods=["GET"])
def generate_recipe():
    dish = random.choice(dishes)

    chat_response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a professional Indonesian chef."},
            {"role": "user", "content": f"Please give me a traditional recipe for {dish}. Return a JSON object with keys: 'ingredients' (as a list of at least 4 items), and 'steps' (as a list). Example: {{\"ingredients\": [\"item1\", ...], \"steps\": [\"step1\", ...]}}. No explanation outside the JSON."}
        ],
        temperature=0.7
    )
    recipe_content = chat_response.choices[0].message.content.strip()

    try:
        recipe_json = json.loads(recipe_content)
        ingredients = recipe_json.get("ingredients", [])
        steps = recipe_json.get("steps", [])
    except Exception as e:
        return jsonify({"error": f"Failed to parse recipe from AI. Raw response: {recipe_content}"}), 500

    image_response = openai.images.generate(
        model="dall-e-2",
        prompt=f"Realistic picture of {dish}, HD, a delicious traditional Indonesian food | NO TEXT",
        n=1,
        size="512x512"
    )
    image_url = image_response.data[0].url

    return jsonify({
        "dish": dish,
        "ingredients": ingredients,
        "steps": steps,
        "image_url": image_url
    })


@app.route("/ingredients", methods=["GET"])
def get_ingredients():
    dish = request.args.get("dish")

    if not dish:
        return jsonify({"error": "Dish name is required. Use /ingredients?dish=Rendang"}), 400

    max_retries = 3
    for attempt in range(max_retries):
        chat_response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a professional Indonesian chef."},
                {"role": "user", "content": f"List only the ingredients to make {dish}. Return a raw JSON array of at least 4 items like this: [\"item1\", \"item2\", ...]. No explanation."}
            ],
            temperature=0.5
        )
        content = chat_response.choices[0].message.content.strip()
        try:
            ingredients = json.loads(content)
            if isinstance(ingredients, list) and len(ingredients) >= 4:
                break
        except Exception:
            pass
        ingredients = None
    if not isinstance(ingredients, list) or len(ingredients) < 4:
        return jsonify({"error": f"Failed to parse ingredients from AI after {max_retries} attempts. Last raw response: {content}"}), 500

    return jsonify({
        "dish": dish,
        "ingredients": ingredients
    })


@app.route("/false_ingredients", methods=["GET"])
def get_false_ingredients():
    dish = request.args.get("dish")
    n = int(request.args.get("n", 3))
    if not dish:
        return jsonify({"error": "Dish name is required. Use /false_ingredients?dish=Rendang"}), 400

    # Get real ingredients from the AI, with retry
    max_retries = 3
    for attempt in range(max_retries):
        chat_response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a professional Indonesian chef."},
                {"role": "user", "content": f"List only the ingredients to make {dish}. Return a raw JSON array of at least 4 items like this: [\"item1\", \"item2\", ...]. No explanation."}
            ],
            temperature=0.5
        )
        content = chat_response.choices[0].message.content.strip()
        try:
            real_ingredients = json.loads(content)
            if isinstance(real_ingredients, list) and len(real_ingredients) >= 4:
                break
        except Exception:
            pass
        real_ingredients = None
    if not isinstance(real_ingredients, list) or len(real_ingredients) < 4:
        return jsonify({"error": f"Failed to parse ingredients from AI after {max_retries} attempts. Last raw response: {content}"}), 500

    # Try to get false ingredients from AI (not in real ingredients, not starting with capital letter)
    ai_false_ingredients = []
    try:
        ai_false_response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a professional Indonesian chef."},
                {"role": "user", "content": f"List {n} plausible but incorrect ingredients for {dish}, that are NOT in this list: {real_ingredients}. Each ingredient must not start with a capital letter. Return a raw JSON array like this: [\"item1\", ...]. No explanation."}
            ],
            temperature=0.7
        )
        ai_false_content = ai_false_response.choices[0].message.content.strip()
        ai_false_ingredients = json.loads(ai_false_content)
        # Filter to ensure not in real ingredients and not starting with capital
        ai_false_ingredients = [item for item in ai_false_ingredients if item not in real_ingredients and (item and not item[0].isupper())]
    except Exception:
        ai_false_ingredients = []

    # Only use AI-generated false ingredients, return error if not enough
    if len(ai_false_ingredients) < n:
        return jsonify({"error": f"AI could not generate {n} false ingredients. Got: {ai_false_ingredients}"}), 500
    false_ingredients = ai_false_ingredients[:n]

    return jsonify({
        "dish": dish,
        "false_ingredients": false_ingredients
    })


if __name__ == "__main__":
    app.run(debug=True)
