FROM ubuntu:18.04

RUN apt-get update && \
    apt-get -y install apache2

RUN cd frontend && \
    npm i && \
    npm run build && \
    mkdir -p ../backend/src/main/resources/public && \
    cp ./dist/* ../backend/src/main/resources/public && \
    cd ../backend && \
    ./gradlew build && \
    mkdir -p ../build && \
    cp build/libs/flower-0.0.1-SNAPSHOT.jar ../build && \
    cp ../appspec.yml ../build && \
    cp ../deploy_script.sh ../build

COPY build/ /var/www/html/

RUN echo '. /etc/apache2/envvars' > /root/run_apache.sh && \
    echo 'mkdir -p /var/run/apache2' >> /root/run_apache.sh && \
    echo 'mkdir -p /var/lock/apache2' >> /root/run_apache.sh && \
    echo '/usr/sbin/apache2 -D FOREGROUND' >> /root/run_apache.sh && \
    echo 'cd /var/www/html/' >> /root/run_apache.sh && \
    echo 'sudo chown ec2-user:ec2-user ./flower-0.0.1-SNAPSHOT.log' >> /root/run_apache.sh && \
    echo 'sudo chmod +w ./flower-0.0.1-SNAPSHOT.log' >> /root/run_apache.sh && \
    echo 'java -jar ./flower-0.0.1-SNAPSHOT.jar &' >> /root/run_apache.sh && \
    chmod 755 /root/run_apache.sh

EXPOSE 80

CMD /root/run_apache.sh
