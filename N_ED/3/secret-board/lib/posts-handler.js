'use strict';
const jade = require('jade');
const Cookies = require('cookies');
const Post = require('./post');

const trackingIdKey = 'tracking_id';

function handle(req, res) {
  const cookies = new Cookies(req, res);
  addTrackingCookie(cookies);

  switch (req.method) {
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      Post.findAll().then((posts) => {
        res.end(jade.renderFile('./views/posts.jade', {
          posts: posts,
          user: req.user
        }));
        console.info(
        `閲覧されました: user: ${req.user}, ` +
        `trackingId: ${cookies.get(trackingIdKey) },` +
        `remoteAddress: ${req.connection.remoteAddress} `
      );
      });

      break;
    case 'POST':
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        const decode = decodeURIComponent(body);
        const content = decode.split('content=')[1];
        console.info('投稿されました：' + content);
        Post.create({
          content: content,
          trackingCookie: cookies.get(trackingIdKey),
          postedBy: req.user
        }).then(() => {
          handleRedirectPosts(req, res);
        });
      });
      break;
    default:
      break;
  }
}

//トラッキングIDを追加する関数
function addTrackingCookie(cookies) {
  //trackingIdKeyで指定された名前のCookieの値を取得し、存在するかチェック
  if (!cookies.get(trackingIdKey)) {
    const trackingId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    const tomorrow = new Date(new Date().getTime() + (1000 * 60 * 60 * 24));
    cookies.set(trackingIdKey, trackingId, { expires: tomorrow });
  }
}


function handleRedirectPosts(req, res) {
  res.writeHead(303, {
    'Location': '/posts'
  });
  res.end();
}

function handleDelete(req,res) {
  switch (req.method) {
    case 'POST':
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        const decoded = decodeURIComponent(body);
        const id = decoded.split('id=')[1];
        Post.findById(id).then((post) => {
          if (req.user === post.postedBy || user === 'admin') {
            post.destroy();
          }
          handleRedirectPosts(req, res);
        });
      });
      break;
    default:
      util.handleBadRequest(req, res);
      break;
  }
}

module.exports = {
  handle: handle,
  handleDelete: handleDelete
};
