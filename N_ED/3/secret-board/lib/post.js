'use strict';
//sequelizeをモジュールとして読み込む。
const Sequelize = require('sequelize');
const sequelize = new Sequelize('secret_board','nodejs','nodejs',{
  host: 'localhost',
  dialect:'mysql'
});

////テストコネクション
//sequelize
//  .authenticate()
//  .then(() => {
//    console.log('Connection has been established successfully');
//  })
//  .catch(err => {
//    console.error('Unable to connect to the database:', err);
//  });

const Post = sequelize.define('Post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: Sequelize.TEXT
  },
  postedBy: {
    type: Sequelize.STRING
  },
  trackingCookie: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true,
  timestamps: true
});

Post.sync();
module.exports = Post;
