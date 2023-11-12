#!/bin/bash
IMAGENAME=spring-simple-forum-mysql
CONTAINERNAME=spring-simple-forum-mysql
docker stop $CONTAINERNAME
docker rm $CONTAINERNAME
docker image rm $IMAGENAME

