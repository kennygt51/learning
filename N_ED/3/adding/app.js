'use strict';
// Node.jsに用意されたモジュールの呼び出し
const fs = require('fs')  //ファイルシステムを扱う為のモジュール
const readline = require('readline'); //ファイルを一行づつ読み込む為のモジュール
const rs = fs.ReadStream('./popu-pref.csv'); //ファイル読み込みStreamを生成
const rl = readline.createInterface({'input':rs,'output': {}});　//StreamとのI/Fオブジェクト生成
const map = new Map(); // key: 都道府県 value: 集計データのオブジェクト

// rlオブジェクトのStreamとのインタフェースを利用する・
// rlオブジェクトでlineというイベントが発生したら、無名関数を呼ぶ
rl.on('line',(lineString) => {
  // console.log(lineString); //lineイベントが発生したらlineString（読み込んだ一行の文字列）を出力
  const columns    = lineString.split(','); //,で分割して配列にする
  const year       = parseInt(columns[0]); //parseInt:文字列を整数値に変換する関数
  const prefecture = columns[2];
  const popu       = parseInt(columns[7]);

  if (year === 2010 || year === 2015) {
    let value = map.get(prefecture);
    if (!value) {
      value = {
        popu10:0,
        popu15:0,
        change:null
      };
    }

    if (year == 2010) {
        value.popu10 += popu;
    }
    if (year == 2015) {
        value.popu15 += popu;
    }
    map.set(prefecture,value);
  }
});

rl.resume(); //ストリームに情報を流し始めるメソッド
//全ての行を読み込み終わった際に呼び出される
rl.on('close', () => {
  for(let pair of map) {
    const value = pair[1];
    value.change = value.popu15 / value.popu10;
  }
  //Array.from(map) の部分で、連想配列を普通の配列に変換する
  // Array の sort 関数を呼んで無名関数を渡す。
  // sort に対して渡すこの関数は比較関数と言い、これによって並び替えをするルールを決める
  const rankingArray = Array.from(map).sort((pair1,pair2) => {
    return pair2[1].change - pair1[1].change;
  });

  //整形
  const rankingStrings = rankingArray.map((pair) => {
    return pair[0] + ': ' + pair[1].popu10 + '=>' + pair[1].popu15 + ' 変化率:' + pair[1].change;
  })

  console.log(rankingStrings);

});
