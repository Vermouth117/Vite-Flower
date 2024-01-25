#!/bin/bash

cd /var/www/html/
sudo chown ec2-user:ec2-user ./flower-0.0.1-SNAPSHOT.log
sudo chmod +w ./flower-0.0.1-SNAPSHOT.log
java -jar ./flower-0.0.1-SNAPSHOT.jar &
#java -jar ./flower-0.0.1-SNAPSHOT.jar >> ./flower-0.0.1-SNAPSHOT.log 2>&1 &
