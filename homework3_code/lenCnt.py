import findspark
findspark.init()

import pyspark
import sys
import json

#if len(sys.argv) != 3:
#       raise Exception("Exactly 2 arguments are required: <inputUri> <outputUri>")

inputUri=sys.argv[1]
#outputUri=sys.argv[2]

def myMapFunc(x): 
        return (x, 1)
        
def myReduceFunc(v1, v2): 
        return v1 + v2

sc = pyspark.SparkContext()
print("Spark Context initialized.")
# return it as an RDD (hadoop dataset) of strings
lines = sc.textFile(sys.argv[1])
# split func applied to each element of the dataset, then flatten the result.
lens = lines.map(lambda line: str(len(line)))
print(type(lens))
lenCnt = lens.map(myMapFunc).reduceByKey(myReduceFunc)


#lenCnt.saveAsTextFile(sys.argv[2])
print("Completed.")
print("Output saved as text file.")
