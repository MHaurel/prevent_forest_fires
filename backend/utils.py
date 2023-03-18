import io

from net import Net

import torch
from torchvision.io import read_image
import torchvision.transforms as transforms
from PIL import Image

model = Net()
model.load_state_dict(torch.load('./net.pth'))
model.eval()

def transform_image(image_bytes):
    my_transforms = transforms.Compose([
        transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
    ])
    image = Image.open(io.BytesIO(image_bytes))
    return my_transforms(image).unsqueeze(0)

def get_prediction(image_bytes):
    try:
        tensor = transform_image(image_bytes=image_bytes)
        outputs = model.forward(tensor)
        _, y_hat = outputs.max(1)
        return y_hat
    except:
        print("Could not achieve prediction")
        return -1


# with open('./sample_image.jpg', 'rb') as f:
#     image = f.read()
#     image = bytearray(image)
# prediction = get_prediction(image)