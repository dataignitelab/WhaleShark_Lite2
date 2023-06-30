import argparse
import pandas as pd
import os
import pymysql
import paramiko
import signal

host = "mbd.xip.kr"
port = 3306
database = "whaleshark_lite2"
uid = "root"
pwd = "datacentric"

def killprocess(metaid):
    conn = pymysql.connect(user=uid, password=pwd, host=host, port=port, database=database, charset='utf8')
    cur = conn.cursor(pymysql.cursors.DictCursor)
    sql = "select * from tb_metainfo where id=%d" % (metaid)
    rcnt = cur.execute( sql )
    if(rcnt<1):
        return
    row = cur.fetchone()
    run_log = row['run_log']
    
    p1 = run_log.index("PID=")
    p2 = run_log.index("\n",p1+4)
    if p1>0 and p2>0:
        pid = run_log[p1+4:p2]
        print("pid=[%s]\n"%(pid))
        
        try:
            os.kill(int(pid), signal.SIGKILL) #or signal.SIGTERM
            run_log += "process(%s): kill\n"%(pid);
        except Exception as e:
            run_log += "에러발생:"+str(e)+"\n"
            print(e)
        updatesql = "update tb_metainfo set run_log='%s',run_etime=now() where id=%d"%(run_log,metaid)
        cur.execute(updatesql)
        
        conn.commit()
        conn.close()        
    else:
        return


def process(metaid):
    conn = pymysql.connect(user=uid, password=pwd, host=host, port=port, database=database, charset='utf8')
    cur = conn.cursor(pymysql.cursors.DictCursor)
    sql = "select * from tb_metainfo where id=%d" % (metaid)
    rcnt = cur.execute( sql )
    if(rcnt<1):
        return
    run_log = "start PID="+str(os.getpid())+"\n"
    row = cur.fetchone()
    mtype = row['mtype']
    mname = row['mname']
    mtable = row['mtable']
    mpath = row['mpath']
    ourl = row['ourl']
    opath = row['opath'] # id:pwd@~~
    odatabase = row['odatabase']
    otable = row['otable']
    mkey = row['mkey']
    mowner = row['mowner']
    
    if mtype == "rdb":
        
        colcnt = cur.execute("select * from information_schema.columns where table_name='%s' and table_schema='%s'" % (mtable,database))
        
        updatesql = "update tb_metainfo set run_log='%s',run_stime=now(),run_etime=NULL where id=%d"%(run_log,metaid)
        
        cur.execute(updatesql)
        conn.commit()

        try:
            p1 = opath.index(":")
            p2 = opath.rindex("@")
            p3 = opath.rindex(":")
            if p1>0 and p2 >0 and p3 >0:
                ouid = opath[:p1]
                opwd = opath[p1+1:p2]
                ohost = opath[p2+1:p3]
                oport = int(opath[p3+1:])
            oconn = pymysql.connect(user=ouid, password=opwd, host=ohost, port=oport, database=odatabase, charset='utf8')
            ocur = oconn.cursor(pymysql.cursors.DictCursor)
            ocur.execute("select * from information_schema.columns where table_name='%s' and table_schema='%s'" % (otable,odatabase))
            cols = ocur.fetchall()

            where = ""
            if colcnt==0: # table 없음
                colstr = []
                for c in cols:
                    colstr.append("`%s` %s comment '%s'"%(c['COLUMN_NAME'],c['COLUMN_TYPE'],c['COLUMN_COMMENT']))
                
                ddl = "create table `%s` ( %s );"%(mtable,",".join(colstr) )
                cur.execute(ddl)
                run_log += "table create(%s)\n"%(mtable)
                
#                print("table create(%s)\n"%(mtable))
#                print('ddl==>',ddl)
                if mkey != "":
                    where = " order by concat(%s)"%(mkey)
            else:
                if mkey != "":
                    rcnt = cur.execute("select ifnull(max(concat(%s)),'') maxkey from `%s`"%(mkey,mtable))
                    if rcnt>0:
                        maxkey = cur.fetchone()
                        maxkey = maxkey['maxkey']
                    where = " where concat(%s)>'%s' order by concat(%s)"%(mkey, maxkey, mkey)
            
            fetchsql = "select * from `%s` %s"%(otable,where)
            
            datacnt = ocur.execute(fetchsql)
            
            print('fetchsql==>',fetchsql, datacnt)
            
            
            run_log += "%d record found\n"%(datacnt)
            
            writecnt = 0
            colstr = []
            for c in cols:
                colstr.append("%%(%s)s"%(c['COLUMN_NAME']))
            insert_sql = "insert into `%s` values (%s);"%(mtable,",".join(colstr))

            print('insert_sql==>',insert_sql)            
            orec = ocur.fetchmany(5000)
            while orec:
                writecnt += cur.executemany(insert_sql, orec) 
                run_log += "처리중:"+str(writecnt)+"/"+str(datacnt)+"\n"

                print("처리중:"+str(writecnt)+"/"+str(datacnt)+"\n")
                orec = ocur.fetchmany(5000)
                
                updatesql = "update tb_metainfo set run_log='%s' where id=%d"%(run_log,metaid)
                cur.execute(updatesql)
                conn.commit()
            
            oconn.close()
            run_log += "처리완료:"+str(writecnt)+"\n"
            print("처리완료:"+str(writecnt)+"\n")

        except Exception as e:
            run_log += "에러발생:"+str(e)+"\n"
            print(e)
        
        updatesql = "update tb_metainfo set run_log='%s',run_etime=now() where id=%d"%(run_log,metaid)
#        print('updatesql==>',updatesql)
        cur.execute(updatesql)
        conn.commit()
        conn.close()
        
        #완료 기록, run_log. run_stime

    elif mtype == "file":
        print('ftp sync...')

        updatesql = "update tb_metainfo set run_log='%s',run_stime=now(),run_etime=NULL where id=%d"%(run_log,metaid)
        cur.execute(updatesql)
        conn.commit()

        try :
            p1 = opath.index(":")
            p2 = opath.rindex("@")
            p3 = opath.rindex(":")
            if p1>0 and p2 >0 and p3 >0:
                ouid = opath[:p1]
                opwd = opath[p1+1:p2]
                ohost = opath[p2+1:p3]
                oport = int(opath[p3+1:])
        
            srcpath = otable
            dstpath = "/lite/upload/"+mowner+"/"+mpath
            
            if not os.path.exists(dstpath):
                os.makedirs(dstpath)
        
            transport = paramiko.Transport(ohost, oport)
            transport.connect(username = ouid, password = opwd)
            sftp = paramiko.SFTPClient.from_transport(transport)
            flst = sftp.listdir(srcpath)
            run_log += "file수:"+str(len(flst))+"\n"
            writecnt = 0
            datacnt = len(flst)
            for f in flst:
                run_log += "복사중:"+str(writecnt+1)+"/"+str(datacnt)+"\n"
                updatesql = "update tb_metainfo set run_log='%s' where id=%d"%(run_log,metaid)
                cur.execute(updatesql)
                conn.commit()
                sftp.get(srcpath+"/"+f, dstpath+"/"+f)
                writecnt+=1;
                
            run_log += "복사완료:"+str(writecnt)+"\n"
                
            sftp.close()
            transport.close()
        
        except Exception as e:
            run_log += "에러발생:"+str(e)+"\n"
            print(e)
        
        updatesql = "update tb_metainfo set run_log='%s',run_etime=now() where id=%d"%(run_log,metaid)
        cur.execute(updatesql)
        conn.commit()
        
        '''
        상태 기록, run_log. run_stime
        ftp 접속
        ftp 파일목록
        ftp 복사
        완료기록, run_log. run_etime
        '''
    

    '''
    # 데이터 입력. dict 형 데이터 
    insert_data2 = [{'name': 'holland', 'age': 9}, {'name': 'lee', 'age': 7}, {'name': 'messi', 'age': 7}] 
    insert_sql2 = "INSERT INTO `people` VALUES (%(name)s, %(age)s);" 
    cur.executemany(insert_sql2, insert_data2) 
    conn.commit()
    '''
    
if __name__ == '__main__':
    parser = argparse.ArgumentParser(prog='argparser')
    # 명령을 위한 파서를 만듭니다
    parser.add_argument('-metaid', type=str, help='metaid help', required=True)
    parser.add_argument('-kill', type=str, help='kill help', required=False, default="N")
    args = parser.parse_args()
    metaid = int(args.metaid)
    kill = args.kill
    if kill=="Y" or  kill=="y":
        killprocess(metaid)
    else:
        process(metaid)
