FROM ubuntu:18.04

# Install dependencies
RUN apt-get update && \
 apt-get -y install apache2 openjdk-8-jdk

# Copy html file to apach directory
COPY build/flower-0.0.1-SNAPSHOT.jar /var/www/html/

# Configure apache
RUN echo '. /etc/apache2/envvars' > /root/run_apache.sh && \
 echo 'mkdir -p /var/run/apache2' >> /root/run_apache.sh && \
 echo 'mkdir -p /var/lock/apache2' >> /root/run_apache.sh && \
 echo '/usr/sbin/apache2 -D FOREGROUND' >> /root/run_apache.sh && \
 echo 'cd /var/www/html/' >> /root/run_apache.sh && \
 echo 'java -jar /var/www/html/flower-0.0.1-SNAPSHOT.jar &' >> /root/run_apache.sh && \
 chmod 755 /root/run_apache.sh

EXPOSE 80

CMD /root/run_apache.sh
