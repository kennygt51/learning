'use strict';

const tasks = new Map();

/**
* TODOを追加する
* @param {string} task
*/

function todo(task) {
  tasks.set(task,false);
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
* TODOの一覧の配列を取得する
* @return {array}
*/

function list() {
  return Array.from(tasks)
    .filter(isNotDone)
    .map(t => t[0]);
}

// todoという関数をパッケージの関数として外部に公開する実装
module.exports = {
  todo: todo
  list: list
};
