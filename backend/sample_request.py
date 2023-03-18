import requests

resp = requests.post("http://localhost:5000/predict",
                     files={"file": open('./sample_image.jpg','rb')})

print(resp.json())