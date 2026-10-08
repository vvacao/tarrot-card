import urllib.request
import json
import os
import shutil

# Try to find a repo with tarot images
req = urllib.request.Request("https://api.github.com/search/repositories?q=tarot+images", headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())
    for item in data['items'][:5]:
        print(item['html_url'])
