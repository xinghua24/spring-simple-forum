#!/bin/bash
docker run --name spring-simple-forum-postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d \
  -v ${PWD}/.postgres-data:/var/lib/postgresql/data \
  postgres