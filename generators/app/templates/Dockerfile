FROM node:latest

LABEL MAINTAINER=""

# setup
RUN mkdir -p /root/<%= packageName %>
WORKDIR /root/<%= packageName %>

# install global dependencies
COPY . ./

# install local dependencies
RUN npm install --quiet --update-binary

# run build
RUN npm run build

# ports
EXPOSE 5000

# run server
ENTRYPOINT [ "npm" ]
CMD [ "run", "start" ]
