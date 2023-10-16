#!/bin/bash
docker run --name spring-simple-forum-mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -p 3306:3306 \
  -d \
  -v ${PWD}/.mysql-data:/var/lib/mysql \
  mysql