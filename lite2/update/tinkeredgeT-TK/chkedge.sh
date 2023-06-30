#!/bin/bash

pwd=`pwd`
cd /WhaleShark_Edge/

p1=`ps -def | grep edgeupdater.py | grep -v grep | awk '{print $2}'`
p2=`ps -def | grep edgedatamanager.py | grep -v grep | awk '{print $2}'`

#echo $p1 $p2

if [ "$p1" == "" ]
then
        echo "`date` process edgeupdater not found start" >> log/chkedge.log
		nohup python3 edgeupdater.py >> log/edgeupdater.log &
fi

if [ "$p2" == "" ]
then
        echo "`date` process edgedatamanager not found start" >> log/chkedge.log
		nohup python3 edgedatamanager.py >> log/edgedatamanager.log &
fi

cd $pwd
