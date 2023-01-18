FROM node:10.17.0

# Create app directory
WORKDIR /usr/src/app

COPY server/ ./server
COPY public/ ./public
COPY uploads/ ./uploads
COPY package*.json .

RUN npm install

EXPOSE 3000
CMD [ "node", "./server/server.js" ]
