'use strict';
const http = require('http');
const jade = require('jade');

const server = http.createServer((req, res) => {
  const now = new Date();
  console.info('[' + now + '] Requested by ' + req.connection.remoteAddress);
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  switch(req.method) {
    case 'GET':
      //const fs = require('fs');
      //const rs = fs.createReadStream('./form.html');
      //rs.pipe(res)
      if (req.url === '/enquetes/yaki-shabu') {
        res.write(jade.renderFile('./form.jade', {
          path: req.url,
          firstItem: '焼き肉',
          secondItem: 'しゃぶしゃぶ'
        }));
      } else if (req.url === '/enquetes/rice-bread') {
        res.write(jade.renderFile('./form.jade', {
          path: req.url,
          firstItem: 'ごはん',
          secondItem: 'パン'
        }));
      }
      res.end();
      break;
    case 'POST':
      let body = [];
      /*
      * req と書かれているリクエストオブジェクトも、Stream と同様にイベントを発行するオブジェクトです。
      * そのため、データを受けとった際には data というイベントが発生します。
      * データは細切れな状態で chunk 変数に入れて受け取り、それらを　body 配列に追加し、全て受信したら配列を全てくっつけて文字列に変換しています。
      */
      req.on('data',(chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        //JavaScript の decodeURIComponent 関数を利用して、 URL エンコードされた値を元のものに修正する。
        const decoded = decodeURIComponent(body);
        console.info('[' + now + '] 投稿: ' + decoded);
        res.write('<!DOCTYPE html><html lang="ja"><body><h1>' +　decoded + 'が投稿されました</h1></body></html>');
        res.end();
      });
      break;
    default:
      break;
  }
}).on('error', (e) => {
    console.error('[' + new Date() + '] Server Error', e);
}).on('clientError', (e) => {
    console.error('[' + new Date() + '] Client Error', e);
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log('Listening on ' + port);
});
