#!/bin/sh
head -v -n 8 /proc/meminfo; head -v -n 2 /proc/stat /proc/version /proc/uptime /proc/loadavg /proc/sys/fs/file-nr /proc/sys/kernel/hostname; tail -v -n 16 /proc/net/dev;echo '==> /proc/df <==';df;echo '==> /proc/who <==';who;echo '==> /proc/end <=='
