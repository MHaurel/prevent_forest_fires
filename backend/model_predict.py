import os

from net import CNN

import torch
from torchvision.io import read_image
import torchvision.transforms as transforms
from PIL import Image

model = CNN()
model.load_state_dict(torch.load('./model.pth'))
model.eval()

def transform_image(image_path):
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
        transforms.Resize((350, 350))
    ])
    image = Image.open(image_path)
    return transform(image)

def get_prediction(image_path):
    try:
        with torch.no_grad():
            image = transform_image(image_path)
            outputs = model(image)
            # print(outputs)
            _, y_hat = torch.max(outputs.data, 1)
            return y_hat
    except TypeError as te:
        print("Could not achieve prediction")
        return -1

for file in os.listdir('../data/valid/nowildfire'):
    image_path = f"../data/valid/nowildfire/{file}"
    y_hat = get_prediction(image_path=image_path)
    print(y_hat)