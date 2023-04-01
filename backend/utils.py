import io

import numpy as np

import torch
import torchvision.transforms as transforms
from PIL import Image

def transform_image(image_bytes):
    """
    Transforms the image bytes into an processable image for the model

    image_bytes : The bytes of the image posted
    return : The image as a matrix 
    """
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
