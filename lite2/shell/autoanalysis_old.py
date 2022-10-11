# coding: utf-8
import argparse
import os
import pandas as pd
#from matplotlib import pyplot as plt
#import codecs
#import chardet
#import io
#import cvthtml
#import numpy
import influxdb
import pymysql
import subprocess

def dbconn():
    conn = pymysql.connect(user="root", password="eoqkrWkd!@3", host="127.0.0.1", port=3306, database="whaleshark_lite", connect_timeout=28800, charset='utf8')
    conn.query('SET GLOBAL connect_timeout=28800')
    conn.query('SET GLOBAL max_allowed_packet=167772160')
    return conn
    
def analysis(row, userid, run_pid, run_log, cmds):
    try:
        state = "분석중"
        updatesql = "insert tb_algoinfo_history (id, run_pid, state, run_log, run_stime) values(%d, %s, %s, %s, now())"

        conn_sub = dbconn()
        cur_sub = conn_sub.cursor(pymysql.cursors.DictCursor)
        cur_sub.execute(updatesql,(row['id'],run_pid, state, run_log))
        conn_sub.commit()
        cur_sub.close()
        conn_sub.close()

        result = subprocess.run(cmds, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=3600, text=True)
        if result.returncode != 0:
            res = "error:"+str(result.returncode)+":"+result.stderr
            state = "분석불가"
        else:
            res = "success:"+result.stdout
            if len(result.stdout) == 0 :
                res += result.stdout
        state = "분석완료"
    except Exception as e:
        res = "error:"+str(e)
        state = "분석불가"
        
        
    updatesql = "update tb_algoinfo_history set run_result=%s, state=%s, run_etime=now() where id=%s and run_pid=%s"
    lines = res.split("\n")
    print("[",len(res),len(lines),"]")

    if len(lines)>500:
        lines = lines[:500]
        res = "\n".join(lines)
        
    conn_sub = dbconn()
    cur_sub = conn_sub.cursor(pymysql.cursors.DictCursor)
    cur_sub.execute(updatesql,(res, state, row['id'], run_pid))
    conn_sub.commit()

    return

def autoanalysis(ftype, userid, q, server, port, uid, pwd, db):
    conn = dbconn()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    rcnt = cur.execute( "select * from tb_algoinfo order by id" )
    rows = cur.fetchall()
    run_log = "start PID="+str(os.getpid())+"\n"
    
    updatesql = "update tb_algoinfo set run_log='%s' "%(run_log)
    cur.execute(updatesql)
    conn.commit()
    
    #data 준비 python 실행
    workfile = "/lite/upload/%s/autoanalysis.csv" % (userid)
    modelpath = "/lite/model/%s/" % (userid)
    cmds = ["/python/python", "/python/fetchdata.py", "-ftype", ftype, "-output_path", workfile, "-q", q, "-server", server, "-port", port, "-uid", uid, "-pwd", pwd, "-db", db]
    result = subprocess.run(cmds, stdout=subprocess.PIPE, text=True)
    if result.returncode != 0:
        run_log += "에러: 데이터 준비중 오류발생\n"
        updatesql = "update tb_algoinfo set run_log='%s' "%(run_log)
        cur.execute(updatesql)
        conn.commit()
        conn.close()
        return
    print("데이터 준비  ok......")
    
    input_df = pd.read_csv(workfile, encoding="UTF-8")
    columns = input_df.columns
    dep_column = columns[-1] # 종속변수 마지막 컬럼
    ind_columns = columns[0:-1] # 독립변수 마지막을 제외한 컬럼
    last_column_index = str(len(columns)-1)
    
    print("변수:%s"%(",".join(columns)))
    print("독립변수:%s"%(",".join(ind_columns)))
    print("종속변수:%s"%(dep_column))
    
    # 기초전처리...
    preprocess_cmd = ["/python/data_process.sh", workfile, workfile+".csv", "Y", ",".join(columns), ",".join(columns), "", "UTF-8"]
    
#    print(preprocess_cmd)
    # null제거 전체컬럼 이상치제거, 수치형변환 안함,

    result = subprocess.run(preprocess_cmd, stdout=subprocess.PIPE, text=True)
    print("기초전처리전처리 ok......")
    if result.returncode != 0:
        run_log += "에러: 기초 전처리에서 오류발생\n"
        updatesql = "update tb_algoinfo set run_log='%s' "%(run_log)
        cur.execute(updatesql)
        conn.commit()
        conn.close()
        return    
        
    print(result.stdout)
    
    workfile = workfile+".csv"
    
    input_df = pd.read_csv(workfile, encoding="UTF-8")
    columns = input_df.columns
    dep_column = columns[-1] # 종속변수 마지막 컬럼
    ind_columns = columns[0:-1] # 독립변수 마지막을 제외한 컬럼
    last_column_index = str(len(columns)-1)
    
    print("변수:%s"%(",".join(columns)))
    print("독립변수:%s"%(",".join(ind_columns)))
    print("종속변수:%s"%(dep_column))

#    print(preprocess_cmd)
    
    print("알고리즘 처리중......")
    
    updatesql = "update tb_algoinfo set run_log=%s,state=%s "
    cur.execute(updatesql,(run_log,'분석대기'))
    conn.commit()
    
    for i,row in enumerate(rows):
        print("분석중: %d/%d %s algorithm"%(i+1, rcnt, row['name']))
        run_log += "분석중: %d/%d %s algorithm\n"%(i+1, rcnt, row['name'])
        cmd = row['cmd']
        updatesql = "update tb_algoinfo set run_log=%s"
        cur.execute(updatesql,(run_log))
        conn.commit()
        
        if cmd is not None:
            updatesql = "update tb_algoinfo set run_stime=now(), state=%s, run_etime=NULL where id=%s"
            cur.execute(updatesql,('분석중', row['id']))
            conn.commit()
            cur.close()
            conn.close()
            cmds = cmd.split(' ')
            for i, v in enumerate(cmds):
                cmds[i] = cmds[i].replace("{model_path}", modelpath).replace("{input_file}", workfile).replace("{dep_column}", dep_column).replace("{ind_columns}", ",".join(ind_columns)).replace("{columns}", ",".join(columns)).replace("{last_column_index}", last_column_index)
                if cmds[i]=='""' or cmds[i]=="''":
                    cmds[i] = ""

            state = "분석완료"
            try:
                result = subprocess.run(cmds, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=3600, text=True)
                if result.returncode != 0:
                    res = "error:"+str(result.returncode)+":"+result.stderr
                    state = "분석불가"
                else:
                    res = "success:"+result.stdout
                    if len(result.stdout) == 0 :
                        res += result.stdout
            except Exception as e:
                res = "error:"+str(e)
                state = "분석불가"
            updatesql = "update tb_algoinfo set run_result=%s, state=%s, run_etime=now() where id=%s"
            
            lines = res.split("\n")
            print("[",len(res),len(lines),"]")

            if len(lines)>500:
                lines = lines[:500]
                res = "\n".join(lines)
            
            conn = dbconn()
            cur = conn.cursor(pymysql.cursors.DictCursor)
            cur.execute(updatesql,(res, state, row['id']))
            conn.commit()
        
        # shell 호출 
    
    run_log += "처리완료:"+str(rcnt)+" algorithms\n"
    updatesql = "update tb_algoinfo set run_log='%s' "%(run_log)
    cur.execute(updatesql)
    conn.commit()
    cur.close()
    conn.close()
    print("처리완료:"+str(rcnt)+" algorithms")

'''
python fetchdata.py -ftype 'influxdb' -q 'select * from TS0001 where time>=now()-600s' -server 'onsite-monitor.xip.kr' -port '8086' -uid 'whaleshark' -pwd 'whaleshark' -db 'facility'
'''
if __name__ == '__main__':
    parser = argparse.ArgumentParser(prog='argparser')
#    parser.add_argument('--fun', action='store_true', help='Statistics help')
#    subparsers = parser.add_subparsers(help='sub-command help', dest='fun')
    
    # 명령을 위한 파서를 만듭니다
    parser.add_argument('-ftype', type=str, help='ftype help', required=True)
    parser.add_argument('-userid', type=str, help='userid help', required=True)
    parser.add_argument('-q', type=str, help='q help', required=True) # 쿼리 또는 path 정보
    parser.add_argument('-server', type=str, help='server ip help', required=False, default='') # 서버 ip
    parser.add_argument('-port', type=str, help='server port help', required=False, default='') # 서버 port
    parser.add_argument('-uid', type=str, help='uid help', required=False, default='') # 서버 uid
    parser.add_argument('-pwd', type=str, help='pwd help', required=False, default='') # 서버 pwd
    parser.add_argument('-db', type=str, help='pwd help', required=False, default='') # 서버 db
    args = parser.parse_args()
    ftype = args.ftype
    userid = args.userid
    q = args.q
    server = args.server
    port = args.port
    uid = args.uid
    pwd = args.pwd
    db = args.db

    autoanalysis(ftype, userid, q, server, port, uid, pwd, db)
