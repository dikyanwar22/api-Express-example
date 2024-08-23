FROM node:18.14.1-alpine3.17
COPY . /www
RUN npm install nodemon -g
RUN npm install pm2 -g
RUN cd /www; npm install
ENV PORT 3000
EXPOSE  3000
WORKDIR /www
CMD nodemon bin/www\
