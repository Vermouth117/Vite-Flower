#!/bin/bash

cd /var/www/html/
chmod +x /var/www/html/flower-0.0.1-SNAPSHOT.jar
/usr/bin/java -jar ./flower-0.0.1-SNAPSHOT.jar
