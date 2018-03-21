'use strict';
const http = require('http');
const auth = require('http-auth');
const router = require('./lib/router');
const basic = auth.basic({
  realm: 'Enter username and password.',
  file: './users.htpasswd'
});

const server = http.createServer(basic,(req, res) => {
  router.route(req,res); //routerモジュールでrouteという関数を呼ぶと、必要なリクエストの振り分け処理を行ってくれる（という予定）
}).on('error', (e) => {
  console.error('Server Error', e);
}).on('clientError', (e) => {
  console.error('Client Error', e);
});

const port = 8000;
server.listen(port, () => {
  console.info('Listening on ' + port);
});
