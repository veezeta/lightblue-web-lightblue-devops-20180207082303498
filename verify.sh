#!/bin/bash

tgt=`bx target`
usr=`echo $tgt | grep "User:" | awk '{print $2}'`
org=`echo $tgt | grep "Org:" | awk '{print $2}'`
spc=`echo $tgt | grep "Space:" | awk '{print $2}'`

if [ -z "$org"  ]
then
  printf "Your organization is empty please login using bx login command and set your target using bx target command"
  exit 
fi
if [ -z "$spc"  ]
then
  printf "Your target space is empty please login using bx login command and set your target using bx target command"
  exit 
fi

suffix=`date  +"%Y%m%d%H%M%S"`

bx app push lightblue-web-$suffix -n lightblue-web-$suffix

found=`curl http://lightblue-web-$suffix.mybluemix.net | grep LightBlueCompute | wc -l`


# edit title
sed -i public/resources/components/views/home.html 's/LightBlueCompute/DarkBlueCompute/g' *

bx app push lightblue-web-$suffix -n lightblue-web-$suffix

found=`curl http://lightblue-web-$suffix.mybluemix.net | grep DarkBlueCompute | wc -l`
