#!/bin/bash
cp .projectrc ./dist/.projectrc
cp -Rf ./env ./dist/env
#cp -Rf ./src/application/http/routes ./dist/application/http
sucrase ./src/application/http/routes -d ./dist/application/http/routes --transforms imports
