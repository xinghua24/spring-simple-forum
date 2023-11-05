#!/bin/bash
NAME=spring-simple-forum-mysql
docker start $NAME
if [ $? -ne 0 ]; then
    echo 'docker run...'
    docker run --name $NAME -d \
      -e MYSQL_ROOT_PASSWORD=password \
      -p 127.0.0.1:3306:3306 \
      -v ${PWD}/.mysql-data:/var/lib/mysql \
      mysql:latest
fi