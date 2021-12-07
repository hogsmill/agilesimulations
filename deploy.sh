#!/bin/bash

if [ "$1" == "-f" ]; then
  FORCE=true
fi

rm package-lock.json
rm -rf node_modules

git stash
GIT=`git pull`
echo $GIT
if [ "$FORCE" != "true" -a "$GIT" == "Already up to date." ]; then
  exit 0
fi

npm install --legacy-peer-deps
npm run build
rm /var/www/html/css/*
rm /var/www/html/js/*
cp -R dist/* /var/www/html/

if [ -f "src/server.js" ]; then
  SERVER=`ps -ef | grep server.js | grep "agilesimulations" | awk {'print $2'}`
  if [ "$SERVER" != "" ]; then
    kill -9 $SERVER
  fi
fi

rm -rf node_modules/.cache
rm -rf dist
