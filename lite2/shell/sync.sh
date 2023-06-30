#!/bin/sh
pwd=`pwd`
cd /lite2/shell
echo python3 syncproc_meta.py -metaid $1 >> exec.log
nohup python3 syncproc_meta.py -metaid $1 > /dev/null 2>&1 &
sleep 3

cd $pwd
