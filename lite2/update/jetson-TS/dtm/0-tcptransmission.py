import socket
import json
import time
import requests
import os

#edge용 데이터 전송모듈...(config-환경설정 json object,retobj-수집 처리된 data object

def getValue(obj, key, defval):
    if key in obj:
        v = obj[key]
        if type(v) == str:
            v = v.replace("$HOSTNAME", socket.gethostname())
        return v
    else:
        return defval


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

    #print(gateway_packet)
                     
    return gateway_packet

#데이터 전송 모듈 실행

host = getValue(config,'datagateway_ip',"")
port = getValue(config,'datagateway_port', 1233)

#print("data===>", retobj, host, port)

if host!="":
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect((host, port))
    for ci,column in enumerate(retobj.keys()):
        v = retobj[column]
        code = "%04x"%(int(column))
#            print("sensor_code==>",code)
        packet = make_packet(facility_id=getValue(config,'deviceid',""), sensor_code=code, pv=v)
#            client_socket.send(packet.encode())
        client_socket.send(packet)
        if ci==0 :
            time.sleep(0.5)
        data = client_socket.recv(1024)
        #print('Received', repr(data.decode()))
#                else:
#                    time.sleep(0.1)
#        time.sleep(interval)
    print('send packets==>',len(retobj.keys()))

    client_socket.close()    
