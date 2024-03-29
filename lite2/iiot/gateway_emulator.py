import socket
import time
import pandas as pd

HOST = '27.125.98.135'
PORT = 1233
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.connect((HOST, PORT))

'''
def make_packet(facility_id, sensor_code, pv):
    print(facility_id[0:1], facility_id[1:2], facility_id[2:4], facility_id[4:6])
    hd_fid1 = facility_id[0:1]
    hd_fid2 = facility_id[1:2]
    hd_fid3 = chr(int(facility_id[2:4], 16))
    hd_fid4 = chr(int(facility_id[4:6], 16))
    
    hd_sid1 = chr(int(sensor_code[0:2], 16))
    hd_sid2 = chr(int(sensor_code[2:4], 16))
    
    hex_pv = hex(pv)[2:].zfill(8)
    
    int_pv1 = chr(int(hex_pv[0:2], 16))
    int_pv2 = chr(int(hex_pv[2:4], 16))
    int_pv3 = chr(int(hex_pv[4:6], 16))
    int_pv4 = chr(int(hex_pv[6:8], 16))
    int_pv = bytes([int(hex_pv[0:2], 16), int(hex_pv[2:4], 16), int(hex_pv[4:6], 16), int(hex_pv[6:8], 16)])
    
    gateway_packet = '\x02\x00\x00\x00\x00' + hd_fid1 + hd_fid2 + hd_fid3 + hd_fid4 + hd_sid1 + hd_sid2 + 'PV' + int_pv + '\x00\x03'
#    gateway_packet = '\x02\x00\x00\x00\x00' + hd_fid1 + hd_fid2 + hd_fid3 + hd_fid4 + hd_sid1 + hd_sid2 + 'PV' + int_pv1 + int_pv2 + int_pv3 + int_pv4 + '\x00\x03'

    print("%s:%s:%d=>[%s:%02x] =>%d"%(hex_pv, hex_pv[6:8], int(hex_pv[6:8], 16), int_pv4, ord(int_pv4), len(gateway_packet)))

    print(gateway_packet.encode())
                     
    return gateway_packet
'''
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
    csv_test = pd.read_csv('sample_data/TS_small.csv')

#    print(csv_test)

    Emulation_Data = csv_test #.drop(['name', 'time', 'INNER_PRESS_1', 'OVER_TEMP_1', 'PUMP_PRESS_1', 'TEMPERATURE1_1','TS_AMP1_(R)_1', 'TS_AMP1_(S)_1', 'TS_AMP1_(T)_1', 'TS_VOLT1_(RS)_1','TS_VOLT1_(RT)_1', 'TS_VOLT1_(ST)_1'], axis=1)

#    print(Emulation_Data)

    Emulation_Data.columns.to_list()
    Emulation_Data_json = Emulation_Data.to_dict(orient='records')
    
#    print(Emulation_Data_json)
    
    column_list = ['VOLT1_(RS)', 'VOLT1_(ST)', 'VOLT1_(RT)', 'AMP1_(R)', 'AMP1_(S)', 'AMP1_(T)', 'INNER_PRESS', 'PUMP_PRESS']
    
    sensor_id_map = {'VOLT1_(RS)': 1,
                     'VOLT1_(ST)': 2,
                     'VOLT1_(RT)': 3,
                     'AMP1_(R)': 4,
                     'AMP1_(S)': 5,
                     'AMP1_(T)': 6,
                     'INNER_PRESS': 7,
                     'PUMP_PRESS': 8,
                     'TEMPERATURE1': 9,
                     'TEMPERATURE1(SV)': 10,
                     'OVER_TEMP': 11}
    
    # Sample packet (2, 0, 0, 0, 0, 84, 83, 0, 1, 0, 9, 80, 86, 0, 0, 1, 74, 1, 3)
    # Sample packet2 (2, 0, 0, 0, 0, 84, 83, 0, 101, 0, 1, 80, 86, 0, 0, 0, 175, 1, 3)
    # facility_id 설비명 / 설비 ID, sensor_code : 센서에 대한 설명(iiot server의 facilities_dict 참조), pv : 현재 센서 값
    for i, emulation_data in enumerate(Emulation_Data_json):
        for column in column_list:
            print(i, column, 'code{:04d}'.format(sensor_id_map[column]), 'PV', int(emulation_data[column]))
            packet = make_packet(facility_id='TS%04x'%(1), sensor_code='{:04x}'.format(sensor_id_map[column]),
                                 pv=int(emulation_data[column]))
#            byte_tuple = convert(list(packet))
#            print(byte_tuple)
#            client_socket.send(packet.encode())
            client_socket.send(packet)
            time.sleep(1)
            data = client_socket.recv(1024)
            print('Received', repr(data.decode()))
    client_socket.close()
