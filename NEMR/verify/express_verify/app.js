"use strict"; //厳密なコーディングを開発者に求めるstrictモード
var http      = require('http'); //Node.jsの標準ライブラリであるhttpをインポート（Node.jsでHTTP通信が扱える様になる）
var express   = require('express'); //Expressをインポート
var path      = require('path'); //pathモジュール（絶対パス作成のために使用）
var bodyparser  = require('body-parser'); //body-parser
var mongoose  = require('mongoose'); //mongodbに接続するモジュール
var Message   = require('./schema/Message'); //DBに接続する為のスキーマを読み込む。
var User   = require('./schema/User'); //DBに接続する為のスキーマを読み込む。
var fileUpload = require('express-fileUpload'); //バイナリアップロードリクエストをパースする
var passport   = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

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
//avatarディレクトリの中の画像ファイルを/avatarパスから配信する
app.use("/avatar",express.static(path.join(__dirname, 'avatar')));

//passport
app.use(session({ secret: 'HogeFuga'}));
app.use(passport.initialize());
app.use(passport.session());


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
    return res.render('index',
      {messages: msgs,
      user: req.session && req.session.user ? req.session.user : null
    });
  })
});

//会員登録用ページを表示する為のルーティング(GET)
app.get("/signin",function(req,res,next) {
  return res.render('signin');
});

//会員登録データを保存する為のルーティング(POST)
app.post("/signin",fileUpload(),function(req,res,next) {
  var avatar = req.files.avatar
  avatar.mv('./avatar/' + avatar.name,function(err) {
    if(err) throw err
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      avatar_path: '/avatar/' + avatar.name
    })
    newUser.save((err) => {
      if(err) throw err
      return res.redirect("/")
    })
  })
});

//ログイン（GET）
app.get("/login", function(req,res,next) {
  return res.render('login')
});

//Passportを利用した認証用のルーティング
//app.post('/login',passport.authenticate('local', function(res,res,next) {
  //認証が成功した際に呼ばれるコールバック関数
//});

//セッションの初期化に成功生た場合はトップにリダイレクト、失敗したらログインページにリダイレクト
//passport.authenticate('local'　：Cookieに保存されたセッションを検証して、だめな場合に、セッションを再生性する為のミドルウェアに再送信する為のミドルウェア
app.post('/login',passport.authenticate('local'),function(req,res,next) {
  User.findOne({_id: req.session.passport.user},function(err,user) {
    if(err||!req.session) return res.redirect('/login')

    req.session.user = {
      username: user.username,
      avatar_path: user.avatar_path
    }
    return res.redirect("/")
  })
 }
);

//passport.authenticate('local'でセッションが設定されていない場合に、処理が渡される。
//コールバック関数にセットされている2つの関数内の引数usernameとpasswordはPOST形式で/loginに送信されたパラメータから自動的にセットされる。
//POSTで送信されたユーザ名とパスワードからDBにクエリを投げ、ユーザの有無を確認
//認証用コールバック関数done()を呼び出す 第一引数にはエラーが発生した場合にtrueと評価される値を渡す
//第二引数には、認証が成功して登録済のユーザだと確認したばあいにtrueを、そうでないばあいはfalseを渡す
passport.use(new LocalStrategy(
  function(username,password,done) {
    User.findOne({username: username}, function(err,user) {
      if (err) { return done(err)}
      if (!user) {
        return done(null,false,{ message: 'Incorrect username.'});
      }
      if (user.password !== password) {
        return done(null,false,{ message: 'Incorrect password.'});
      }
      return done(null,user);
    });
  }
));


//シリアライゼーション
passport.serializeUser(function(user,done) {
  done(null,user._id);
});

//デシリアライゼーション
passport.deserializeUser(function(id,done) {
  User.findOne({_id:id},function(err,user) {
    done(err,user);
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
