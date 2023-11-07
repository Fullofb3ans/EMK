import json
f = open("ID.json", 'r')
ID = json.load(f)
f.close()

ID = int(ID["ID"]) + 1
print(ID)

jsn = {"ID" : ID} 

with open("ID.json", "w") as fh:
    json.dump(jsn, fh) 