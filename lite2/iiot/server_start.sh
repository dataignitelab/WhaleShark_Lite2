#!/bin/bash

pwd=`pwd`
cd /home/datacentric/WhaleShark_IIoT
p1=`ps -def | grep iiot_server.py | grep -v grep | awk '{print $2}'`
p2=`ps -def | grep iiot_mqtt_agent.py | grep -v grep | awk '{print $2}'`
p3=`ps -def | grep iiot_device_chk.py | grep -v grep | awk '{print $2}'`

#echo $p1 $p2 $p3

if [ "$p1$p2$p3" == "" ]
then
	echo 'start'
else
	kill -9 $p1 $p2 $p3
	echo 'restart'
fi

nohup python3 iiot_server.py > log/tcpserver.log &
nohup python3 iiot_mqtt_agent.py > log/agent.log &
nohup python3 iiot_device_chk.py > log/device_chk.log &

cd $pwd
