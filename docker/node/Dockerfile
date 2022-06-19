FROM node:12-alpine3.13
MAINTAINER Anderson Contreira <anderson.contreira@gmail.com>

ARG APP_PORT=3000
ARG ENVIRONMENT_NAME=development
ENV APP_ENV=$ENVIRONMENT_NAME \
    NODE_ENV=$ENVIRONMENT_NAME \
    APP_PORT=$APP_PORT

EXPOSE ${APP_PORT}

WORKDIR /app

# gcc requirement && python e pip
RUN apk add --no-cache build-base \
                       python3-dev \
                       py3-pip \
                       make \
                       gcc \
                       libcurl \
                       curl \
                       bash \
    && rm -rf /var/cache/apk/*

# upgrade pip
RUN pip install --upgrade pip

# install aws cli
RUN pip --no-cache-dir install --upgrade awscli

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /app

# Install requirements
RUN yarn install

# Copy project files
COPY . .

# entrypoint permission
RUN ["chmod", "+x", "./docker/node/entrypoint.sh"]

# dev mode
CMD ["npm", "run", "start:dev"]
