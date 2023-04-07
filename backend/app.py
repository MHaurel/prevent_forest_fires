from flask import Flask, jsonify, request
from flask_cors import CORS
import torch
import torchvision.transforms as transforms

from utils import get_prediction
from net import CNN

app = Flask(__name__)
CORS(app)

model = CNN()
model.load_state_dict(torch.load('./model.pth'))
model.eval()

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        file = request.files['file']
        img_bytes = file.read()
        prediction = get_prediction(model=model, image_bytes=img_bytes)
        return jsonify({'prediction': prediction})
    
if __name__ == "__main__":
    app.run()