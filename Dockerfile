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

FROM node:10.17.0 as build
WORKDIR /usr/src/app
COPY package.json .
COPY server/ ./server
COPY public/ ./public
COPY uploads/ ./uploads
RUN npm install


FROM node:10.17.0-alpine as main
COPY --from=build /usr/src/app /
EXPOSE 3000
CMD [ "node", "./server/server.js" ]
