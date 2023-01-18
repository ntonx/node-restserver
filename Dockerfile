FROM node:16.19.0-buster-slim

# Create app directory
WORKDIR /usr/src/app

COPY server/ ./server
COPY public/ ./public
COPY uploads/ ./uploads
COPY package*.json .

RUN npm install

EXPOSE 3000
CMD [ "node", "./server/server.js" ]
