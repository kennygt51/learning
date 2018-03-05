// nodeが用意しているhttp,fsモジュールの読み込み
var http = require('http');
    fs   = require('fs');
    ejs  = require('ejs');
var settings = require('./settings')

// サーバを作る
var server = http.createServer();

// リクエストが来る前に、テンプレートファイルを読み込む。（ブロッキングな命令）
var template = fs.(__dirname + '/public_html/hello.ejs','utf-8');

var n = 0;
console.log(__dirname + '/public_html/hello.ejs')

// サーバにリクエストが飛んできた時に発火するイベントを結びつける
server.on('request', function(req,res) {
  n++;
  var data = ejs.render(template, {
    title: "hello",
    content: "<strong>World</strong>",
    n: n
  });
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
});
// サーバを待ち受け状態にする（ポートとIPアドレス）
server.listen(settings.port,settings.host);
console.log("server listening ...");
