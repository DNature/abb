FROM node:12

WORKDIR /abb

COPY ./package.json .
COPY ./packages/server/package.json ./packages/server/
COPY ./packages/common/package.json ./packages/common/

RUN npm i -g yarn@1.21.1 --force
RUN yarn install --production

COPY ./packages/server/dist/ ./packages/server/
COPY ./packages/common/dist ./packages/common/dist

COPY ./packages/server/.env ./packages/server/
COPY ./ormconfig.json .

WORKDIR /abb/packages/server/

ENV NODE_ENV production

EXPOSE 4000

CMD ["node", "dist/index.js"]