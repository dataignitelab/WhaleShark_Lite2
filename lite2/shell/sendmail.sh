#!/bin/sh
echo "$3" | mutt -s "$2" "$1"
echo "$1 $2 $3 $4" >> /lite/shell/mail.log
