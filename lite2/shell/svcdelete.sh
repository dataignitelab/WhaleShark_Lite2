#!/bin/sh

#usage: svcdelete.sh <svcid>
pwd=`pwd`
cd /lite2/
if [ -n "$1" ]; then
rm -rf /lite2/svc/$1
fi
cd $pwd
