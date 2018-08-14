//requestをrequire
const request = require('request');

//ヘッダーを定義
const headers = {
  'Content-Type':'application/json'
}

//オプションを定義
const options = {
  url: 'http://b.hatena.ne.jp/hotentry?mode=rss',
  method: 'GET',
  headers: headers,
  json: true
}

//リクエスト送信
request(options, function (error, response, body) {
  console.log(body)
})
