import urllib.request
import os

url = "https://raw.githubusercontent.com/ekelen/tarot-api/master/static/cards/ar00.jpg"
try:
    urllib.request.urlretrieve(url, "test.jpg")
    print("Success")
except Exception as e:
    print(e)
