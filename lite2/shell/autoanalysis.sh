#!/bin/sh
pwd=`pwd`
cd /lite2/shell

echo python3 autoanalysis.py -ftype $1 -userid $2 -q $3 -server $4 -port $5 -uid $6 -pwd $7 -db $8 >> autoanalysis.log

nohup python3 autoanalysis.py -ftype $1 -userid "$2" -q "$3" -server "$4" -port $5 -uid "$6" -pwd "$7" -db "$8" > /dev/null 2>&1 &
sleep 3
cd $pwd
