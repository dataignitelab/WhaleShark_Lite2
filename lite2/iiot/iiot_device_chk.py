import yaml
import json
import pika
import sys
import redis
from influxdb import InfluxDBClient
import time
import logging
from logging import handlers
import os
import pymysql
import datetime

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.ERROR)
formatter = logging.Formatter('[%(asctime)s-%(name)s-%(levelname)s-%(filename)s:%(lineno)s-%(funcName)10s()]%(message)s')
os.makedirs('log', exist_ok=True)
logHandler = handlers.RotatingFileHandler('log/lite2_device_chk_debug.log',  maxBytes=1, backupCount=0)
logHandler.setLevel(logging.DEBUG)
logHandler.setFormatter(formatter)

errorLogHandler = handlers.RotatingFileHandler('log/lite2_device_chk_error.log', maxBytes=1, backupCount=0)
errorLogHandler.setLevel(logging.ERROR)
errorLogHandler.setFormatter(formatter)

logger.addHandler(logHandler)
logger.addHandler(errorLogHandler)

class DeviceMonitor:
    def __init__(self):
        with open('config/config_server_develop.yaml', 'r') as file:
            config_obj = yaml.load(file, Loader=yaml.FullLoader)
            self.rabbitmq_host = config_obj['iiot_server']['rabbit_mq']['ip_address']
            self.rabbitmq_port = config_obj['iiot_server']['rabbit_mq']['port']

            self.rabbitmq_id = config_obj['iiot_server']['rabbit_mq']['id']
            self.rabbitmq_pwd = config_obj['iiot_server']['rabbit_mq']['pwd']
            
            self.exchange = config_obj['iiot_server']['rabbit_mq']['exchange']
            self.exchange_type = config_obj['iiot_server']['rabbit_mq']['exchange_type']
       
            self.redis_host = config_obj['iiot_server']['redis_server']['ip_address']
            self.redis_port = config_obj['iiot_server']['redis_server']['port']
            self.redis_pwd = config_obj['iiot_server']['redis_server']['pwd']

            self.influx_host = config_obj['iiot_server']['influxdb']['ip_address']
            self.influx_port = config_obj['iiot_server']['influxdb']['port']
        
            self.influx_id = config_obj['iiot_server']['influxdb']['id']
            self.influx_pwd = config_obj['iiot_server']['influxdb']['pwd']
            self.influx_db = config_obj['iiot_server']['influxdb']['db']

            self.operatingdb_host = config_obj['iiot_server']['operatingdb']['host']
            self.operatingdb_port = config_obj['iiot_server']['operatingdb']['port']
            self.operatingdb_id = config_obj['iiot_server']['operatingdb']['id']
            self.operatingdb_pwd= config_obj['iiot_server']['operatingdb']['pwd']
            self.operatingdb_db = config_obj['iiot_server']['operatingdb']['db']


    def get_device_infos(self, host, port, id, pwd, db):
        # MySQL Connection 연결
        conn = pymysql.connect(host=host, port=port, user=id, password=pwd, db=db, charset='utf8')
        # Connection 으로부터 Cursor 생성
        curs = conn.cursor()
        # SQL문 실행
        sql = "SELECT id,name FROM tb_device WHERE STATE='ACTIVE'"
        curs.execute(sql)
        # 데이타 Fetch
        rows = curs.fetchall()
        # Connection 닫기
        conn.close()        
        return rows

    def update_device_infos(self, host, port, id, pwd, db, updates):
        # MySQL Connection 연결
        conn = pymysql.connect(host=host, port=port, user=id, password=pwd, db=db, charset='utf8')
        # Connection 으로부터 Cursor 생성
        curs = conn.cursor()
        # SQL문 실행
        
        for u in updates:
            sql = "update tb_device set last_datarecv_time='%s' where id='%s'"%(u[1],u[0])
            curs.execute(sql)
                
        sql = "insert tb_device_status_log (deviceid, last_datarecv_time, datacnt, duration) values (%s, %s, %s, %s)"
        #print(sql)
        curs.executemany(sql, updates)
        # 데이타 Fetch
        conn.commit()
        # Connection 닫기
        conn.close()        
        return 

    def get_influxdb(self, host, port, name, pwd, db):
        """
        :param host: InfluxDB access host ip
        :param port: InfluxDB access port
        :param name: InfluxDB access user name
        :param pwd: InfluxDB access user password
        :param db: Database to access
        :return: InfluxDB connector
        """
        client = None
        try:
            client = InfluxDBClient(host=host, port=port, username=name, password=pwd, database=db)
        except Exception as exp:
            logger.error(str(exp))
        return client
            
    def monitoring(self,interval):

        ct_ts = time.time()
        ct  = datetime.datetime.fromtimestamp(ct_ts)
        ctz = datetime.datetime(ct.year, ct.month, ct.day)
        ctz_ts = time.mktime(ctz.timetuple())
        
        last_chktime = ctz_ts
        while(True):
            ct_ts = time.time()
            dinfos = self.get_device_infos(self.operatingdb_host,self.operatingdb_port,self.operatingdb_id, self.operatingdb_pwd, self.operatingdb_db)
            updates = []
            for d in dinfos:
#                query = 'select max(ms_time) from %s'%(d[1])
                try:
                    query = 'select max(ms_time), count(ms_time) from %s where ms_time > %d'%(d[1], last_chktime)
                    did = d[0]
                    
                    #print('influxchk==>', query, did)
                    result = self.influxdb_mgr.query(query)
                    #print(result)
                    #print(len(result))
                    duration = int(ct_ts-last_chktime)
                    if len(result)>0 :
                        #print(result.raw['series'][0]['values'][0][1])
                        last_datarecv_time = datetime.datetime.fromtimestamp(result.raw['series'][0]['values'][0][1])
                        datacnt = result.raw['series'][0]['values'][0][2]
                        #해당 device last_data_time: result.raw['series'][0]['values'][0][1]
                        updates.append([did, last_datarecv_time, datacnt, duration])
                    else:
                        last_datarecv_time = ""
                        datacnt = 0
                except Exception as e:
                    print('예외가 발생했습니다.'+str(e))
                    continue
                #udatesql = "update tb_device set state='{\"last_datarecv_time\":\"%s\"}' where id='%s'"%(last_datarecv_time,did)
                #updates.append(udatesql)
#                updates.append([did, last_datarecv_time, datacnt, duration])
            last_chktime = ct_ts
            self.update_device_infos(self.operatingdb_host,self.operatingdb_port,self.operatingdb_id, self.operatingdb_pwd, self.operatingdb_db, updates)
                
            time.sleep(interval)
    
        return
        
if __name__ == '__main__':
    monitor = DeviceMonitor()
    #print('host', monitor.influx_host, monitor.influx_port, monitor.influx_id, monitor.influx_pwd, monitor.influx_db)
    monitor.influxdb_mgr = monitor.get_influxdb(host=monitor.influx_host, port=monitor.influx_port, name=monitor.influx_id, pwd=monitor.influx_pwd, db=monitor.influx_db)
    
    monitor.monitoring(60)