#!/bin/bash

if [ "$1" == "-f" ]; then
  FORCE=true
fi

git stash
GIT=`git pull`
echo $GIT
if [ "$FORCE" != "true" -a "$GIT" == "Already up to date." ]; then
  exit 0
fi

npm install
npm run build
rm /var/www/html/css/*
rm /var/www/html/js/*
cp -R dist/* /var/www/html/
