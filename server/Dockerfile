FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

VOLUME ["/data"]

ENV DB_PATH=/data/database.sqlite

EXPOSE 4000

CMD ["npm", "run", "start"]
