var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// スキーマ
var SakeType = new Schema({
  _id: Number,
  type: String
});

var Temperature = new Schema({
  _id: Number,
  temperature: String
});

var Sake = new Schema({
  brand: String,
  type: { type: Number, ref: 'SakeType' },
  impressions: [{
    temperature: { type: Number, ref: 'Temperature' },
    impression: String
  }]
});

// mongoDBへの接続の確立
mongoose.connect('mongodb://localhost:27017/sake',function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("successfully connected to mongoDB");
  }
});

// スキーマからモデルをコンパイルし、モデルをエクスポートする
exports.Temperature = mongoose.model('Temperature', Temperature);
exports.SakeType    = mongoose.model('SakeType', SakeType);
exports.Sake        = mongoose.model('Sake', Sake);
exports.mongoose    = mongoose
