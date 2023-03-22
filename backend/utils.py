import io

from net import Net, CNN

import torch
from torchvision.io import read_image
import torchvision.transforms as transforms
from PIL import Image

model = CNN()
model.load_state_dict(torch.load('./net-2.pth'))
model.eval()

def transform_image(image_bytes):
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
        transforms.Resize((350, 350))
    ])
    image = Image.open(io.BytesIO(image_bytes))
    return transform(image)

def get_prediction(image_bytes):
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