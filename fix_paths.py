import os

path = "src/data/cards.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('"/cards/', '"./cards/')

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
