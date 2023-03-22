from flask import Flask, jsonify, request
from flask_cors import CORS

from utils import get_prediction

app = Flask(__name__)
CORS(app)

@app.route('/')
def root():
    return {"message": "hello world"}

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        file = request.files['file']
        img_bytes = file.read()
        prediction = get_prediction(image_bytes=img_bytes)
        return jsonify({'prediction': prediction})
    
if __name__ == "__main__":
    app.run()