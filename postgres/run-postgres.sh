#!/bin/bash
docker run --name spring-simple-forum-postgres \
  -e POSTGRES_PASSWORD=password \
  -p 127.0.0.1:5432:5432 \
  -d \
  -v ${PWD}/.postgres-data:/var/lib/postgresql/data \
  postgres