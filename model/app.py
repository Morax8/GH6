from flask import Flask, jsonify
import openai
import random
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)

dishes = [
    "Rendang", "Nasi Goreng", "Sate Ayam", "Bakso", "Soto Ayam",
    "Gado-Gado", "Pempek", "Ayam Penyet", "Gudeg", "Tahu Gejrot"
]

@app.route("/generate", methods=["GET"])
def generate_recipe():
    dish = random.choice(dishes)

    chat_response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a professional Indonesian chef."},
            {"role": "user", "content": f"Please give me a traditional recipe for {dish}. Include ingredients, steps, and a short fun intro."}
        ],
        temperature=0.7
    )
    recipe_text = chat_response.choices[0].message.content

    image_response = openai.images.generate(
        model="dall-e-2",
        prompt=f"illustration of {dish}, HD, a delicious traditional Indonesian food | NO TEXT",
        n=1,
        size="256x256"
    )
    image_url = image_response.data[0].url

    return jsonify({
        "dish": dish,
        "recipe": recipe_text,
        "image_url": image_url
    })

if __name__ == "__main__":
    app.run(debug=True)
