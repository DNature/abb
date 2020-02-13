#! /bin/bash
yarn build:web
netlify deploy --prod -d ./packages/web/build