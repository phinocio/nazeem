FROM node:20-alpine3.18 as app

WORKDIR /app

COPY package*.json /app/
RUN npm ci

COPY . .