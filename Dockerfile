FROM ubuntu:18.04

# DockerfileからDockerイメージにビルドする際に実行
RUN apt-get update && \
 apt-get -y install apache2 openjdk-17-jdk

COPY build/flower-0.0.1-SNAPSHOT.jar /var/www/html/

RUN echo '. /etc/apache2/envvars' > /root/run_apache.sh && \
 echo 'mkdir -p /var/run/apache2' >> /root/run_apache.sh && \
 echo 'mkdir -p /var/lock/apache2' >> /root/run_apache.sh && \
 echo '/usr/sbin/apache2' >> /root/run_apache.sh && \
 echo 'java -jar /var/www/html/flower-0.0.1-SNAPSHOT.jar -D FOREGROUND' >> /root/run_apache.sh && \
 chmod 755 /root/run_apache.sh

EXPOSE 8080

# Dockerfileからできたイメージをコンテナ化する際に実行
CMD /root/run_apache.sh
