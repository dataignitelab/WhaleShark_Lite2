import socket
import json
import time
import requests
import os

#edge용 데이터 수집 처리 전송 모듈 실행...

while True:
    #설정 파일 로드
    with open("./conf/config.json", "r") as json_file:
        config = json.load(json_file)

    # 데이터 access 모듈 실행
    input_obj = {}
    dam_list = os.listdir(config['base_path']+"dam/") 
    dam_list.sort()
    retobj = None
    for f in dam_list:
        fext = os.path.splitext(str(f))[1]
        if fext == ".py":
            try:
                exec(open(config['base_path']+"dam/"+str(f)).read())
                input_obj = retobj
            except Exception as e:
                print(f , e)

    #데이터 처리 모듈 실행
    dpm_list = os.listdir(config['base_path']+"dpm/")
    dpm_list.sort()
    for f in dpm_list:
        fext = os.path.splitext(str(f))[1]
        if fext == ".py":
            try:
                exec(open(config['base_path']+"dpm/"+str(f)).read())
#                retobj = result
                input_obj = retobj
            except Exception as e:
                print(f , e)

    #데이터 전송 모듈 실행
    dtm_list = os.listdir(config['base_path']+"dtm/")
    dtm_list.sort()
    for f in dtm_list:
        fext = os.path.splitext(str(f))[1]
        if fext == ".py":
            try:
                exec(open(config['base_path']+"dtm/"+str(f)).read())
#                retobj = result
                input_obj = retobj
            except Exception as e:
                print(f , e)
                
    time.sleep(getValue(config,'data_collect_interval',10))                
