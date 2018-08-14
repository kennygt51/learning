var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed
require('date-utils');

var dt = new Date();
var dt_formatted = dt.toFormat("YYYYMMDDHH");

var feedparser = new FeedParser();
var options = {
  url: 'http://b.hatena.ne.jp/hotentry/it.rss',
  json: true,
  headers: {
    'User-Agent': 'request'
  }
};

req = request(options)

//todo:実行年月日時間を取得
var result = {'get_datetime': dt_formatted};
var hatenatech_items = [];


//errorイベントが発生した時にcconsoleに出力
req.on('error', function (error) {
  console.log("request error!");
});

//responseイベントが発生した時にconsole
req.on('response', function (res) {
  var stream = this; // `this` is `req`, which is a stream

  if (res.statusCode !== 200) {
    this.emit('error', new Error('Bad status code'));
  }
  else {
    stream.pipe(feedparser);
  }
});

feedparser.on('error', function (error) {
  console.log(error);
});

feedparser.on('readable', function () {
  while (item = this.read()) {
    hatenatech_items.push ({
      'title': item.title,
      'link' : item.link
    });
  }
});

feedparser.on('end', function () {
  hatenatech_items = hatenatech_items.slice(0,10)
  let rank_cnt = 1;
  for(let i = 0; i < hatenatech_items.length; i++) {
    hatenatech_items[i]["rank"] = rank_cnt;
    rank_cnt++;
  };
  result['hatenatech_items'] = hatenatech_items
  console.log(result);
});
