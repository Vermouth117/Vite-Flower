#!/bin/bash

cd /var/www/html/

java -jar ./flower-0.0.1-SNAPSHOT.jar \
    >> ./flower-0.0.1-SNAPSHOT.log \
    2>&1 &
