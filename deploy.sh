#!/bin/bash

if [ "$1" == "-f" ]; then
  FORCE=true
fi

if [ ! -d /var/www/html/agilesimulations/ ]; then
    mkdir /var/www/html/agilesimulations/
    mkdir /var/www/html/agilesimulations/css
    mkdir /var/www/html/agilesimulations/js
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

if [ ! -d /var/www/html/agilesimulations/ ]; then
    mkdir /var/www/html/agilesimulations/
    mkdir /var/www/html/agilesimulations/css
    mkdir /var/www/html/agilesimulations/js
fi
rm /var/www/html/agilesimulations/css/*
rm /var/www/html/agilesimulations/js/*
cp -R dist/* /var/www/html/agilesimulations

if [ -f "src/server.js" ]; then
  SERVER=`ps -ef | grep server.js | grep "agilesimulations" | awk {'print $2'}`
  if [ "$SERVER" != "" ]; then
    kill -9 $SERVER
  fi
fi

rm -rf node_modules/.cache
rm -rf dist
