//OAuth2.0を利用したGitHub認証の実装解説

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');

//必要なモジュールの読込
var session = require('express-session')
var passport = require('passport')
//Strategyオブジェクトを取得している
var GitHubStrategy = require('passport-github2').Strategy;

//ClientIDとCliemtSecretを設定
//実際に公開する場合は秘匿する必要があるので、環境変数にセットすること
var GITHUB_CLIENT_ID = process.env.CLIENT_ID;
var GITHUB_CLIENT_SECRET = process.env.CLIENT_SECRET;

//意味：認証されたユーザー情報をどのようにセッションに保存し、どのようにセッションから読み出すかという処理
//serializeUser：ユーザーの情報をデータとして保存する処理を記述している
passport.serializeUser(function (user, done) {
  done(null, user);
});
//deserializeUser：保存されたデータをユーザの情報として読み出す処理
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

//passportモジュールに、 GitHub を利用した認証の戦略オブジェクトを設定している。
//また認証後に実行する処理を、 process.nextTick 関数を利用して設定しています。

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:8000/auth/github/callback'
},
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));


var routes = require('./routes/index');
var users = require('./routes/users');
var photos = require('./routes/photos');

var app = express();
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: '3c7cef219c34b515', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', ensureAuthenticated,  users);
app.use('/photos', photos);

//GitHub への認証を行うための処理を、GET で /auth/github にアクセスした際に行う
app.get('/auth/github',
  //GitHub に対して、 スコープを user:email として、認証を行うように設定しています。スコープというのは、 GitHub の OAuth2.0 で認可される権限の範囲です。
  passport.authenticate('github', { scope: ['user:email'] }),
  //今は何もしない。認証実行時にログを出力する必要性がある場合にはこの関数に記述。
  function (req, res) {
});

//OAuth2.0 の仕組みの中で用いられる、 GitHub が利用者の許可に対する問い合わせの結果を送るパス の /auth/github/callback のハンドラを登録しています。
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
