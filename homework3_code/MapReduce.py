import findspark
findspark.init()

import pyspark
import sys
import itertools
import json

wordlist=sys.argv[2].split(",") #str->list of strings
weight=json.loads(sys.argv[3]) #dictionary

print(type(weight))
print(weight)

print(wordlist)
print(type(wordlist))

def m_weight(input):
     w,sen = input[0],input[1]
     if w not in sen:
        return (w, ("",-10)) # assign a random negative value to sentence not including the word
     else:
        letters = list(sen)
        value = 0
        for k, v in weight.items():
            value += letters.count(k)*v  # value=weight*occurance
        return (w,(sen, value))
        
def r_aggregate(v1, v2): 
        if int(v1[1]) > int(v2[1]):
            return v1
        return v2


sc = pyspark.SparkContext()
text = sc.textFile(sys.argv[1])
print("Spark Context initialized.")
wordrdd = sc.parallelize(wordlist)
sen = text.map(lambda line: str(line)).collect() # a list of all sentences

combine0 = list(itertools.product(wordlist, sen)) # make word-sentence combination
combined = list(map(list, combine0)) # make evey combination tuple to list

r=sc.parallelize(map(m_weight, combined)).reduceByKey(r_aggregate)

r.saveAsTextFile(sys.argv[4])
print("output saved!")
