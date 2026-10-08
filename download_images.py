import urllib.request
import json
import os
import shutil

req = urllib.request.Request("https://api.github.com/repos/kinangram/tarot_images/contents", headers={"User-Agent": "Mozilla/5.0"})
target_dir = os.path.join("public", "cards")

if not os.path.exists(target_dir):
    os.makedirs(target_dir)

with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())
    
    # We want to rename them to our standard format.
    # We can parse the number from the front.
    # 0-21: major_X
    # 22-35: minor_paus_X (where X = num - 21)
    # 36-49: minor_copas_X (where X = num - 35)
    # 50-63: minor_espadas_X (where X = num - 49)
    # 64-77: minor_ouros_X (where X = num - 63)
    
    for item in data:
        name = item['name']
        if not name.endswith('.jpg'): continue
        
        num_str = name.split('-')[0]
        num = int(num_str)
        
        if num <= 21:
            new_name = f"major_{num}.jpg"
        elif num <= 35:
            new_name = f"minor_paus_{num - 21}.jpg"
        elif num <= 49:
            new_name = f"minor_copas_{num - 35}.jpg"
        elif num <= 63:
            new_name = f"minor_espadas_{num - 49}.jpg"
        elif num <= 77:
            new_name = f"minor_ouros_{num - 63}.jpg"
        
        print(f"Downloading {name} as {new_name}")
        urllib.request.urlretrieve(item['download_url'], os.path.join(target_dir, new_name))
        
print("Done!")
