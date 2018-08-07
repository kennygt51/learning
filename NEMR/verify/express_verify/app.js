"use strict"; //厳密なコーディングを開発者に求めるstrictモード
var http      = require('http'); //Node.jsの標準ライブラリであるhttpをインポート（Node.jsでHTTP通信が扱える様になる）
var express   = require('express'); //Expressをインポート
var path      = require('path') //pathモジュール（絶対パス作成のために使用）
var bodyparser  = require('body-parser') //body-parser
var mongoose  = require('mongoose') //mongodbに接続するモジュール
var Message   = require('./schema/Message') //DBに接続する為のスキーマを読み込む。
var fileUpload = require('express-fileUpload') //バイナリアップロードリクエストをパースする
var app       = express() //expressのインスタンスであるappに対して様々なミドルウェアを設定することで、Webアプリを実装していく。

// mongoDBへの接続の確立
mongoose.connect('mongodb://localhost:27017/chatapp',function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("successfully connected to mongoDB");
  }
});

//body-parserの設定
//実際にリクエストを返すルーティングよりも前の位置で設定すること
app.use(bodyparser());

//imageディレクトリの中の画像ファイルを/imageパスから配信する
app.use("/image",express.static(path.join(__dirname, 'image')));

// テンプレートエンジンの設定
app.set('views',path.join(__dirname,'views')); //テンプレートを入れているviewsディレクトリの絶対パスを作成する
app.set('view engine','pug');

//ExpressではHTTPリクエストに対して、res.sendに代表される応答用のメソッドは、
//応答をクライアントに送信して、要求と応答のサイクルを終了することができる。
//返答メソッドのいずれも呼び出されない場合は、クライアント要求はハングする

app.get("/", function(req,res,next) {
  //第一引数にオブジェクト形式でクエリを設定、最後の引数に結果を取得する為のコールバック関数を設定する
  //コールバック関数：第一引数にエラーオブジェクト　第二引数に結果が配列形式で格納されている
  //もしクエリに該当するデータが存在しない場合は、空の配列が返ってくる
  Message.find({}, function(err, msgs) {
    if(err) throw err;
    //投稿一覧のデータ（msgsオブジェクト）を、テンプレートエンジンに渡す
    return res.render('index',{messages: msgs});
  });
});

app.get("/update", function(req,res,next) {
  return res.render('update');
});

//fileUpload()を追加することで、画像などのバイナリデータをサーバで受け取ることができるようになる
app.post("/update",fileUpload(),function(req,res,next) {
  if(req.files && req.files.image) {
    req.files.image.mv('./image/' + req.files.image.name,function(err) {
      if(err) throw err;
      var newMessage = new Message({
        username: req.body.username,
        message: req.body.message,
        image_path: '/image/' + req.files.image.name
      });
      newMessage.save((err) => {
        if(err) throw err;
        return res.redirect("/");
      });
    });
  } else {
    // スキーマにデータ格納する為に、スキーマに入れるデータのインスタンスを作成
    var newMessage = new Message({
      username: req.body.username,
      message: req.body.message
    });
    //DBにデータを保存
    newMessage.save((err)=> {
      if(err) throw err;
      return res.redirect("/");
    });
  }
});

// Node.jsで定義したhttpサーバに、Expressのインスタンスであるappを設置して、ローカルホストの3000ポートに関連付けている
var server = http.createServer(app);
server.listen('3000');
