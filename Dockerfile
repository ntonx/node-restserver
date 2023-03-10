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

FROM node:alpine as build
WORKDIR /usr/src/app
COPY package.json package.json
COPY server/ ./server
COPY public/ ./public
COPY uploads/ ./uploads
RUN npm install
# COPY all the files from Current Directory into the Container



FROM nginx:1.22-alpine as prod
COPY --from=build /usr/src/app/build /usr/share/nginx/html
# Tell that this image is going to Open a Port 
EXPOSE 80
# Default Command to launch the Application
CMD ["nginx", "-g", "daemon off;"]
