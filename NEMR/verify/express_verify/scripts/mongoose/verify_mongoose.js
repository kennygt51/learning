var model         = require('./model.js');
var Sake          = model.Sake;
var SakeType      = model.SakeType;
var Temperature   = model.Temperature;
var mongoose      = model.mongoose

// ドキュメントの作成
var kuheiji = new Sake({
  brand: '醸し人九平次',
  type: 9,
  impressions: [
    { temperature: 7, impression: 'めちゃうま' },
    { temperature: 10, impression: '激うま' }
  ]
});

var jokigen = new Sake({
  brand: '上喜元',
  type: 9,
  impressions: [
    { temperature: 7, impression: 'フルーティ' },
    { temperature: 9, impression: 'フレッシュ' }
  ]
});

jokigen.save(function(err) {
  if (err) throw err;
});

// ドキュメントの保存
kuheiji.save(function(err) {
  if (err) throw err;
});

Sake.findOne({ type: 9 }, function(err, result) {
  if (err) throw err;
  console.log(result.brand);  // 登録順の関係でこちらも'醸し人九平次'が出力される
  console.log(result.type);   // '9'が出力される
  mongoose.disconnect(); // connectionの切断
});


//process.on('SIGINT', function() { mongoose.disconnect(); });
