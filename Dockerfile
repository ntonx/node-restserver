# Creating a previous image container

FROM node:10.17.0 as build
WORKDIR /usr/src/app
COPY package.json .
COPY server/ ./server
COPY public/ ./public
COPY uploads/ ./uploads
RUN npm install

#FROM node:10.17.0-alpine as main
#COPY --from=build /usr/src/app /
#EXPOSE 3000
#CMD [ "node", "./server/server.js" ]

# Creating multistage image, based on previous step

FROM gcr.io/distroless/nodejs:14
COPY --from=build /usr/src/app /usr/src/app
WORKDIR /usr/src/app
COPY server/ ./server
COPY public/ ./public
COPY uploads/ ./uploads
CMD ["/server/server.js"]
