import urllib.request
import json
import os

req = urllib.request.Request("https://api.github.com/repos/kinangram/tarot_images/contents", headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())
    for item in data:
        print(item['name'])
