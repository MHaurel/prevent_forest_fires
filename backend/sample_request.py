import requests
import os

resp = requests.post("http://localhost:5000/predict",
                     files={"file": open('./no_wildfire.jpg','rb')})

print(resp.json())

# for file in os.listdir('../data/valid/nowildfire'):
#     resp = requests.post("http://localhost:5000/predict",
#                      files={"file": open(f'../data/valid/nowildfire/{file}','rb')})
#     print(resp.json())