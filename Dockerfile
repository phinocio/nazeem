FROM node:lts-alpine3.20 AS app

WORKDIR /app

RUN npm install -g pnpm@9.11

COPY package.json /app/
COPY pnpm-lock.yaml /app/
RUN pnpm install

RUN apk add --no-cache curl

COPY . .
