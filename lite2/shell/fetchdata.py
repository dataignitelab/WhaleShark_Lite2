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

class DataFetch():
    
    def __init__(self):
        pass
    def fetch(self, ftype, output_path, q, server, port, uid, pwd, db):

#        input_df.to_csv(output_path, index=False, sep=',', na_rep='NaN')
        client = influxdb.DataFrameClient(server, port, uid, pwd, db)

        res = client.query(q)
        k = list(res.keys())
        pd.DataFrame(res[k[0]]).to_csv(output_path, index=True, sep=',', na_rep='NaN')
    def fetchrdb(self, ftype, output_path, q):
        conn = pymysql.connect(user="root", password="pwd", host="{x.x.x.x}", port=3306, database="whaleshark_lite", charset='utf8')
        cur = conn.cursor(pymysql.cursors.DictCursor)
        rcnt = cur.execute( q )
        row = cur.fetchall()
        pd.DataFrame(row).to_csv(output_path, index=False, sep=',', na_rep='NaN')
        
    def fetchcsv(self, ftype, output_path, q):

        p0 = q.find("#")
        p1 = q.find("#", p0+1)
        
        input_path = "/lite/upload/"+q[0:p0]
        encoding = q[p0+1:p1]
        columns = q[p1+1:]

        # 최대 10000개만 불러옴
        tcnt = 0
        for cnt,input_df in enumerate(pd.read_csv(input_path, encoding=encoding, chunksize=10000)):
            tcnt += len(input_df)
            break
            
#        print("<=========",columns,"=======>",q)
        clist = columns.split(',')
        clist = list(clist.copy())
        input_df = input_df[clist]
        pd.DataFrame(input_df).to_csv(output_path, index=False, sep=',', na_rep='NaN')
'''
python fetchdata.py -ftype 'influxdb' -q 'select * from TS0001 where time>=now()-600s' -server '{influxserver}' -port '8086' -uid 'whaleshark' -pwd '{pwd}' -db 'facility'
'''
if __name__ == '__main__':
    parser = argparse.ArgumentParser(prog='argparser')
#    parser.add_argument('--fun', action='store_true', help='Statistics help')
#    subparsers = parser.add_subparsers(help='sub-command help', dest='fun')
    
    # 명령을 위한 파서를 만듭니다
    parser.add_argument('-ftype', type=str, help='ftype help', required=True)
    parser.add_argument('-output_path', type=str, help='output path help', required=True)
    parser.add_argument('-q', type=str, help='q help', required=True) # 쿼리 또는 path 정보
    parser.add_argument('-server', type=str, help='server ip help', required=False, default='') # 서버 ip
    parser.add_argument('-port', type=str, help='server port help', required=False, default='') # 서버 port
    parser.add_argument('-uid', type=str, help='uid help', required=False, default='') # 서버 uid
    parser.add_argument('-pwd', type=str, help='pwd help', required=False, default='') # 서버 pwd
    parser.add_argument('-db', type=str, help='pwd help', required=False, default='') # 서버 db
    args = parser.parse_args()
    ftype = args.ftype
    output_path = args.output_path
    q = args.q
    server = args.server
    port = args.port
    uid = args.uid
    pwd = args.pwd
    db = args.db
    
    if q.startswith("rdb#"):
        ftype = "rdb"
        q = q[4:]
    elif q.startswith("csv#"):
        ftype = "csv"
        q = q[4:]
        
    datafetch = DataFetch()
    if ftype == 'influxdb'  or ftype == "tsdb" :
        datafetch.fetch(ftype=ftype, output_path=output_path, q=q, server=server, port=port, uid=uid, pwd=pwd, db=db)
    elif ftype == "rdb":
        datafetch.fetchrdb(ftype=ftype, output_path=output_path, q=q)
    elif ftype == "csv":
         datafetch.fetchcsv(ftype=ftype, output_path=output_path, q=q)
    else:
        print('unknown ftype')