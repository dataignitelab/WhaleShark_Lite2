#!/bin/sh

#usage: svcdeploy.sh <svcid> <svcfile.zip>
pwd=`pwd`
cd /lite2/

#if exist svc delete...
if [ -d /lite2/svc/$1 ] && [ -n "$1" ]; then
rm -rf /lite2/svc/$1
fi 
# deploy svc 
mkdir -p /lite2/svc/$1
cd /lite2/svc/$1
unzip /lite2/upload/$2
#rm /lite2/upload/$2
chmod +x *.sh
./init.sh

echo success
cd $pwd
