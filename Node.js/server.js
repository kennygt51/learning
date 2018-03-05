// nodeが用意しているhttp,fsモジュールの読み込み
var http = require('http');
    fs   = require('fs');
var settings = require('./settings')
var msg;
// サーバを作る
var server = http.createServer();
console.log(__dirname + '/public_html/hello.html')

// サーバにリクエストが飛んできた時に発火するイベントを結びつける
server.on('request', function(req,res) {
  //ファイルを読み込む。時間がかかる処理なので、コールバック関数を指定する。
  fs.readFile(__dirname + '/public_html/hello.html','utf-8',function(err,data){
    //エラー処理
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write("not found");
      return res.end();
    }
  //上手くファイルが読み込めた時の処理
  res.writeHead(200, {'Content-Type': 'text/html'});
  //読み込んだ内容はdataに渡ってくる
  res.write(data);
  res.end();
  });
});
// サーバを待ち受け状態にする（ポートとIPアドレス）
server.listen(settings.port,settings.host);
console.log("server listening ...");
