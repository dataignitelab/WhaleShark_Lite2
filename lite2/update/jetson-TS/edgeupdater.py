import json
import time
import requests
import os
import socket

#edge용 updater 모듈...

def getValue(obj, key, defval):
    if key in obj:
        v = obj[key]
        if type(v) == str:
            v = v.replace("$HOSTNAME", socket.gethostname())
        return v
    else:
        return defval
        

old_ver = ""
running_time = 0
start_time = -1
while True:
    #설정 파일 로드
    try:
        with open("./conf/config.json", "r") as json_file:
            config = json.load(json_file)
            if old_ver == "":
                old_ver = getValue(config,'version',"")
    except Exception as e: # config 파일 오류시 최종 config로 복구...
        print("config load error ... old version recovery",e)
        with open("./conf/config.json", 'w') as outfile:
            json.dump(config, outfile)
        
        #write...
        time.sleep(10)
        continue

    # print(config)

    if start_time<0 :
        start_time = time.time()
    else:
        running_time = time.time() - start_time # 운영시간 계산
    params = {'deviceid':getValue(config,'deviceid',""),'devicetype':getValue(config,'devicetype',""),"version":getValue(config,'version',""),"running_time":running_time}

    #print(params)

    #r = requests.get(url = getValue(config,'updateinfourl',""), params=params)
    #response = requests.post(url = getValue(config,'updateinfourl',""), data = json.dumps(params))
    try:
        response = requests.post(url = getValue(config,'update_info_url',""), data = params)
    except Exception as e: # url get 오류시...
        print("update info url get error",e)
        time.sleep(10)
        continue
        
    
    damfiles = []
    dpmfiles = []
    dtmfiles = []
    
    if response.status_code == 200:
        # print(response.text)
        uinfo = json.loads(response.text)
#        uinfo.filelist
#        print("update...", uinfo['filelist'])
        for f in uinfo['filelist']:
            destpath = os.path.dirname(f['path'])
            if 'destpath' in f: # 위치가 지정되면 해당 위치에 복사
                destpath = f['destpath']
            destname =  os.path.basename(f['path'])
            os.makedirs(config['base_path']+destpath, exist_ok=True)
            fname = (config['base_path']+destpath+"/"+destname).replace("//","/")
            
            if destpath.replace("/","") == "dam":
                damfiles.append(destname)
                
            if destpath.replace("/","") == "dpm":
                dpmfiles.append(destname)

            if destpath.replace("/","") == "dtm":
                dtmfiles.append(destname)
                
            fsize = 0
            if os.path.exists(fname):
                fsize = os.path.getsize(fname)
            if fsize != f['filesize']:
                print('updatefile...', fname)
                params = {'deviceid':getValue(config,'deviceid',""),'devicetype':getValue(config,'devicetype',""), 'downloadfile':f['path']}
                
                r = requests.post(url = getValue(config,'update_download_url',""), data = params)
                if r.status_code==200:
                    with open(fname, "wb") as code:
                        code.write(r.content)
        
    else:
        print(response.status_code, response.text)
    
    os.makedirs(config['base_path']+"dam/", exist_ok=True) # 데이터 센싱 모듈
    os.makedirs(config['base_path']+"dpm/", exist_ok=True) # 데이터 처리(모델실행포함) 모듈
    os.makedirs(config['base_path']+"dtm/", exist_ok=True) # 데이터 전송 모듈
    
    # dam, dpm, dtm 경로의 update 외의 파일은 모두 삭제
    dam_list = os.listdir(config['base_path']+"dam/")
    for f in dam_list:
        if not os.path.basename(f) in damfiles:
            os.remove(config['base_path']+"dam/"+f)
    
    dpm_list = os.listdir(config['base_path']+"dpm/")
    for f in dpm_list:
        if not os.path.basename(f) in dpmfiles:
            os.remove(config['base_path']+"dpm/"+f)
            
    dtm_list = os.listdir(config['base_path']+"dtm/")
    for f in dtm_list:
        if not os.path.basename(f) in dtmfiles:
            os.remove(config['base_path']+"dtm/"+f)
    
    afterscript = getValue(config,'update_after_script',"")
    if old_ver!=getValue(config,'version',"") and afterscript!="":
        print("update_after_script execute...", afterscript)
        os.system(afterscript)
    
    old_ver = getValue(config,'version',"")
    time.sleep(getValue(config,'update_interval',60))