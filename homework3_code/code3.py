mport findspark
findspark.init()

import pyspark
import sys
import itertools
import json

wordlist=sys.argv[2]
weight=sys.argv[3]

def m_weight(word,sen,weight):
    if word not in sen:
       return (word, ("",-10))
    else:
       letters = list(y)
       value = 0
       for k, v in weight.items():
           value += letters.count(k)*v
       return (word,(sen, value))
        
def r_aggregate(v1, v2): 
        return v1 if int(v1[1])>int(v2[1]) else v2


sc = pyspark.SparkContext()
lines = sc.textFile(sys.argv[1])
print("Spark Context initialized.")

# split into letters

r=map(m_weight, wordlist, lines, weight).reduceByKey(r_aggregate)

r.saveAsTextFile(sys.argv[4])
