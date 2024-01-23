#!/bin/bash

cd /var/www/html/
sudo
chmod u+x /var/html/flower-0.0.1-SNAPSHOT.jar
#/usr/bin/java -jar ./flower-0.0.1-SNAPSHOT.jar

java -jar ./flower-0.0.1-SNAPSHOT.jar \
    >> ./flower-0.0.1-SNAPSHOT.jar \
    2>&1 &
