#! /bin/bash

yarn build:server
heroku container:push --app fathomless-12961 web
heroku container:release --app fathomless-12961 web
# docker build -t dnature/abb:latest .
docker push dnature/abb:latest
# ssh <YOUR_DOKKU_DROPLET> "docker pull dnature/abb:latest && docker tag dnature/abb:latest dokku/abb:latest && dokku tags:deploy abb latest"