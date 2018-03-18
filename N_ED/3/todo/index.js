'use strict';

const tasks = new Map();
const fs       = require('fs');
const fileName = './tasks.json';

// 同期的にファイルから復元
try {
    const data = fs.readFileSync(fileName, 'utf8');
    tasks = new Map(JSON.parse(data));
} catch (ignore) {
    console.log(fileName + 'から復元できませんでした');
}

/**
* タスクをファイルに保存する
*/
function saveTasks() {
  // tasks という連想配列を Array.from で配列に変換
  // JSON.stringify という関数で JSON の文字列に変換
  // 同期的にファイルに書き出す
  fs.writeFileSync(fileName,JSON.stringify(Array.from(tasks)),'utf8');
}

/**
* TODOを追加する
* @param {string} task
*/

function todo(task) {
  tasks.set(task,false);
  saveTasks();
}

/**
* タスクと完了したかどうかが含まれる配列を受取、完了したか返す
* @param {array} taskAndIsDonePair
* @return {boolean} 完了したかどうか
*/
function isDone(taskAndIsDonePair) {
  return taskAndIsDonePair[1];
}

/**
* タスクと完了したかどうかが含まれる配列を受け取って、完了してないかを返す
* @param {array} taskAndIsDonePair
* @return {boolean} 完了してないかどうか
*/
function isNotDone(taskAndIsDonePair) {
  return !isDone(taskAndIsDonePair);
}


/**
* TODOを完了状態にする
* @param {string} task
*/

function done(task) {
  if (tasks.has(task)) {
    tasks.set(task,true);
    saveTasks();
  }
}

/**
* TODOの一覧の配列を取得する
* @return {array}
*/

function list() {
  return Array.from(tasks)
    .filter(isNotDone)
    .map(t => t[0]);
}

/**
* 完了済TODOの一覧の配列を取得する
* @return {array}
*/

function donelist() {
  return Array.from(tasks)
    .filter(isDone)
    .map(t => t[0]);
}

/**
* 項目を削除する
* @param {string} task
*/
function del(task) {
  tasks.delete(task);
  saveTasks();
}


// todoという関数をパッケージの関数として外部に公開する実装
module.exports = {
  todo: todo,
  list: list,
  done: done,
  donelist: donelist,
  del: del
};
