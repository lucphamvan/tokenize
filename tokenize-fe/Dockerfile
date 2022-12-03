# build env
FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g serve
RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "build", "-p", "3000"]
