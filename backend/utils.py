import io

from net import Net, CNN

import numpy as np

import torch
from torchvision.io import read_image, decode_image
import torchvision.transforms as transforms
from PIL import Image

import matplotlib.pyplot as plt

def transform_image(image_bytes):
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
        transforms.Resize((350, 350))
    ])
    image = Image.open(io.BytesIO(image_bytes))
    image = np.array(image)
    image = Image.fromarray(image)
    image = np.array(image)
    return transform(image)

def get_prediction(model, image_bytes):
    try:
        with torch.no_grad():
            image = transform_image(image_bytes=image_bytes)
            outputs = model(image)
            _, y_hat = torch.max(outputs.data, 1)
            return str(list(y_hat.numpy())[0]) # str for the output to be serializable
    except TypeError as te:
        print(te)
        # print("Could not achieve prediction")
        return -1
