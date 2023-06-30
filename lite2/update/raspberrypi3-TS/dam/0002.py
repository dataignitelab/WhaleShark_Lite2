import sys
import os
import json


retobj = {}

if input_obj:
    retobj = input_obj

retobj["0002"] = 2

result=json.dumps(retobj)