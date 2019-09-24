FROM node:10.16.0-stretch

LABEL MAINTAINER="Mahdi Imani"

ARG WORK_DIR

WORKDIR $WORK_DIR

COPY . $WORK_DIR

CMD [ "npm", "run", "start" ]