FROM ubuntu:20.04

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

## setup nodejs
RUN apt-get update \
    && apt-get install -y curl gpg gnupg wget iputils-ping \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash \
    && apt-get install -y nodejs

## setup mongodb
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add - \
    && echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list \
    && apt-get update \
    && mkdir -p /data/db \
    && apt-get install -y mongodb-org 

# setup mysql  
RUN apt-get install -y mysql-server \
    && usermod -d /var/lib/mysql/ mysql

# setup init file 
RUN chmod +x ./setup.sh

# make port available
EXPOSE 3000

# run app
CMD ["sh","./setup.sh"]