FROM node:6.9.1

RUN mkdir /feedit_server

MAINTAINER zhuyali

WORKDIR /feedit_server

COPY . /feedit_server

RUN npm install --registry=https://registry.npm.taobao.org

EXPOSE 8080

CMD ["node index.js"]
