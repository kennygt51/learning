#!/bin/bash

DIR_ROOT="/home/vagrant/workspace/bot"
DIR_DL="niconico-ranking-rss"
DIR_TARGET="${DIR_ROOT}/${DIR_DL}"
FILE_NAME="${DIR_TARGET}/hourly-ranking-`date +'%Y%m%d%H%M'`.xml"

mkdir -p "${DIR_TARGET}"
curl -s -o "${FILE_NAME}" -H "User-Agent: CrawlBot; ken.al.15437@gmail.com" http://www.nicovideo.jp/ranking/fav/hourly/all?rss=2.0&lang=ja-jp
