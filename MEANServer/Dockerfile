FROM node:12-alpine

WORKDIR /home/api/server

COPY . /home/api/server

ENV MONGO_URL=mongodb://backend_db:27017/VideoPlayer

RUN npm install --production

ENTRYPOINT ["npm", "run", "start:container"]
