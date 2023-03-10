#FROM node:10.17.0
#WORKDIR /usr/src/app
#COPY server/ ./server
#COPY public/ ./public
#COPY uploads/ ./uploads
#COPY package*.json .
#RUN npm install
#EXPOSE 3000
#CMD [ "node", "./server/server.js" ]



# CREATE A PREVIOUS IMAGE CONTAINER

FROM node:19.0.0-alpine3.16 as builder


WORKDIR /usr/src/app
COPY server/ ./server
COPY public/ ./public
COPY uploads/ ./uploads
COPY package*.json .
RUN npm install
RUN wget https://gobinaries.com/tj/node-prune --output-document - | /bin/sh && node-prune


FROM gcr.io/distroless/nodejs18-debian11

COPY --from=builder /usr/src/app /usr/src/app
COPY --from=builder /app/express/node_modules /app/express/node_modules
COPY --from=builder /app/express/index.js /app/express/index.js

WORKDIR /app/express
EXPOSE 3000
CMD [ "node", "./server/server.js" ]
