import socket
import time
import pandas as pd
import argparse
import os
import yaml
import pymysql

with open('config/config_server_develop.yaml', 'r') as file:
    config_obj = yaml.load(file, Loader=yaml.FullLoader)
    tcp_host = config_obj['iiot_server']['tcp_server']['ip_address']
    tcp_port = config_obj['iiot_server']['tcp_server']['port']

    operatingdb_host = config_obj['iiot_server']['operatingdb']['host']
    operatingdb_port = config_obj['iiot_server']['operatingdb']['port']
    operatingdb_id = config_obj['iiot_server']['operatingdb']['id']
    operatingdb_pwd= config_obj['iiot_server']['operatingdb']['pwd']
    operatingdb_db = config_obj['iiot_server']['operatingdb']['db']


def get_facilities_map(host, port, id, pwd, db):
    # MySQL Connection 연결
    conn = pymysql.connect(host=host, port=port, user=id, password=pwd, db=db, charset='utf8')
    # Connection 으로부터 Cursor 생성
    curs = conn.cursor()
    # SQL문 실행
    sql = """SELECT d.name, ds.sid, s.vname, s.name FROM tb_device_sensors ds 
    LEFT JOIN tb_device d ON d.id = ds.deviceid
    LEFT JOIN tb_sensor s ON s.id = ds.sensorid
    ORDER BY d.name,ds.sid
    """
    curs.execute(sql)
    # 데이타 Fetch
    rows = curs.fetchall()
    infos = {}
    for r in rows:
    #    print(r)
        dname = r[0]
        sid = r[1]
        sname = r[2]
        if dname in infos:
            dobj = infos[dname]
        else:
            dobj = {}
        dobj[sname] = int(sid)
        infos[dname] = dobj
    # Connection 닫기
    conn.close()        
    return infos


HOST = tcp_host
PORT = tcp_port

def make_packet(facility_id, sensor_code, pv):
    
    buff = []
    
    #STX
    buff.append(0x02) 
    #TIME
    buff.append(0x00)
    buff.append(0x00)
    buff.append(0x00)
    buff.append(0x00)
    #설비번호
    buff.append(ord(facility_id[0:1]))
    buff.append(ord(facility_id[1:2]))
    buff.append(int(facility_id[2:4], 16))
    buff.append(int(facility_id[4:6], 16))
    #센서코드
    buff.append(int(sensor_code[0:2], 16))
    buff.append(int(sensor_code[2:4], 16))
    #PV
    buff.append(ord('P'))
    buff.append(ord('V'))
    #val
    hex_pv = hex(pv)[2:].zfill(8)
    buff.append(int(hex_pv[0:2], 16))
    buff.append(int(hex_pv[2:4], 16))
    buff.append(int(hex_pv[4:6], 16))
    buff.append(int(hex_pv[6:8], 16))
    #decimal            
    buff.append(0x00)
    #ETX
    buff.append(0x03)
    
    gateway_packet = bytes(buff)

    print(gateway_packet)
                     
    return gateway_packet

def convert(fields):
    return tuple(field for field in fields)


if __name__ == '__main__':

    parser = argparse.ArgumentParser(prog='argparser')
#    parser.add_argument('--fun', action='store_true', help='Statistics help')
#    subparsers = parser.add_subparsers(help='sub-command help', dest='fun')
    
    # 명령을 위한 파서를 만듭니다
    parser.add_argument('-repeat', type=str, help='repeat(N) help', required=False, default="N")
    parser.add_argument('-datapath', type=str, help='datapath  help', required=True)
    parser.add_argument('-interval', type=float, help='interval(60 second) help', required=False, default=1)
    parser.add_argument('-host', type=str, help='host('+HOST+') help', required=False, default=HOST) 
    parser.add_argument('-port', type=int, help='port('+str(PORT)+') help', required=False, default=PORT)
    parser.add_argument('-deviceid', type=str, help='deviceid help', required=True)
    args = parser.parse_args()
    repeat = args.repeat
    datapath = args.datapath
    interval = args.interval
    HOST = args.host
    PORT = args.port
    deviceid = args.deviceid

#    while True:
    csvfiles = []
    
    if os.path.isdir(datapath):
        file_list = os.listdir(datapath)
        file_list.sort()
        for f in file_list:
            csvfiles.append(datapath+"/"+f)
    else:
        csvfiles.append(datapath)

        
    while True:

        sensor_id_map = get_facilities_map(operatingdb_host, operatingdb_port, operatingdb_id, operatingdb_pwd, operatingdb_db).get(deviceid)
#        print(sensor_id_map)
        if not sensor_id_map:
            print("device id not found...") 
            break;
    
        for csvf in csvfiles:

            csv_test = pd.read_csv(csvf)
        #    print(csv_test)

            Emulation_Data = csv_test #.drop(['name', 'time', 'INNER_PRESS_1', 'OVER_TEMP_1', 'PUMP_PRESS_1', 'TEMPERATURE1_1','TS_AMP1_(R)_1', 'TS_AMP1_(S)_1', 'TS_AMP1_(T)_1', 'TS_VOLT1_(RS)_1','TS_VOLT1_(RT)_1', 'TS_VOLT1_(ST)_1'], axis=1)

        #    print(Emulation_Data)

            Emulation_Data.columns.to_list()
            Emulation_Data_json = Emulation_Data.to_dict(orient='records')
            
        #    print(Emulation_Data_json)
            
            column_list = csv_test.columns # ['VOLT1_(RS)', 'VOLT1_(ST)', 'VOLT1_(RT)', 'AMP1_(R)', 'AMP1_(S)', 'AMP1_(T)', 'INNER_PRESS', 'PUMP_PRESS']
            
            client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            client_socket.connect((HOST, PORT))
            
            for i, emulation_data in enumerate(Emulation_Data_json):
                ci = 0
                for column in column_list:
                    print(i, column, 'code{:04d}'.format(sensor_id_map[column]), 'PV', int(emulation_data[column]))
                    packet = make_packet(facility_id=deviceid, sensor_code='{:04x}'.format(sensor_id_map[column]),
                                         pv=int(emulation_data[column]))
                    print('send bytes==>',len(packet))
        #            client_socket.send(packet.encode())
                    client_socket.send(packet)
                    if ci==0 :
                        time.sleep(1)
                    data = client_socket.recv(1024)
                    print('Received', repr(data.decode()))
    #                else:
    #                    time.sleep(0.1)
                    ci = ci + 1
                time.sleep(interval)

            client_socket.close()

        if repeat != "Y" and repeat != "y":
            break
