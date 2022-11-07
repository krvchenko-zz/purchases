FROM node:14.20.0

WORKDIR /app

RUN npm install

EXPOSE 8080