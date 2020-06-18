FROM node:12-alpine as node

WORKDIR /home/app

COPY package*.json ./

RUN yes | npm install

COPY . .

RUN npm run build:prod

####################################

FROM nginx:1.17.9-alpine

ENV NODE_URL=http://api:3000/api

COPY --from=node /home/app/dist/MEANApp /usr/share/nginx/html

COPY ./nginx.conf.template /home/

RUN apk add gettext

RUN envsubst < /home/nginx.conf.template > /etc/nginx/conf.d/default.conf
