#!/bin/bash

pwd=`pwd`
cd /WhaleShark_Edge/

p1=`ps -def | grep edgeupdater.py | grep -v grep | awk '{print $2}'`
p2=`ps -def | grep edgedatamanager.py | grep -v grep | awk '{print $2}'`

#echo $p1 $p2

if [ "$p1$p2" == "" ]
then
        echo 'start'
else
        kill -9 $p1 $p2
        echo 'restart'
fi

nohup python3 edgeupdater.py >> log/edgeupdater.log &
sleep 5
nohup python3 edgedatamanager.py >> log/edgedatamanager.log &

cd $pwd

echo "Edge started"