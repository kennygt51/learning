var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed

var feedparser = new FeedParser();
var options = {
  url: 'http://b.hatena.ne.jp/hotentry/it.rss',
  json: true,
  headers: {
    'User-Agent': 'request'
  }
};

req = request(options)


req.on('error', function (error) {
  console.log("error!");
});

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
  // always handle errors
});

feedparser.on('readable', function () {
  // This is where the action is!
  var stream = this; // `this` is `feedparser`, which is a stream
  var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
  var item;

  while (item = stream.read()) {
    console.log(item["title"]);
    console.log(item["link"]);

  }
});
