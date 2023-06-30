#!/bin/sh
pwd=`pwd`
cd /lite2/shell
echo python3 /lite2/shell/syncproc_meta.py -metaid $1 -kill Y >> exec.log
python3 syncproc_meta.py -metaid $1 -kill Y
cd $pwd
