import json
import string
dict1 = {}
dict2 = {}

with open('part-00000') as f:  
    for line in f:
  
        # reads each line and trims of extra the spaces 
        # and gives only the valid words
        w,l = line.strip().split(', (')
        k= w.strip().replace(')','').replace('(','').replace('\'','')
        dict1[k] = l.strip().replace(')','').replace('(','').replace('\'','').rstrip(string.digits)

with open('part-00001') as f2:  
     for line in f2:
        w,l = line.strip().split(', (')
        k= w.strip().replace(')','').replace('(','').replace('\'','')
        dict1[k] = l.strip().replace(')','').replace('(','').replace('\'','').rstrip(string.digits)

dict1.update(dict2)
# creating json file
# the JSON file is named as test1
out_file = open("combined.json", "w")
json.dump(dict1, out_file, sort_keys = False)
out_file.close()
