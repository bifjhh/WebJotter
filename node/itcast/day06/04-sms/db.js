// 数据操作模块 封装了对数据库的操作代码

// 1. 加载 MongoDB 模块
var mongodb = require('mongodb');
var config = require('./config.js');

// 2. 封装 链接数据库 方法
function connectDB(callback) {
  var MongoClient = mongodb.MongoClient;
  MongoClient.connect(config.url, (err, db) => {
    callback(err, db);
  });
};

// 3. 封装查询所有数据方法
module.exports.findAll = (colleactionsName, callback) => {
  // 1. 链接数据库
  connectDB((err, db) => {
    if (err) 
      throw err;
    console.log('链接成功');
    // API 2.0写法
    /* db.colleaction(colleactionsName).find().toArray((err, docs) => {
        db.close();
        callback(err, docs);
      }); */

    //尝试 3.0 写法 成功
    const mydb = db.db('smsone');
    mydb.collection(colleactionsName).find().toArray((err, docs) => {
        db.close();
        console.log('关闭');
        callback(err, docs);
      });;
    // console.log('sss'); console.log(sss); db.close(); console.log('关闭');
  })
};

// 4. 封装根据条件查询单挑数据方法

// 5. 封装插入一条数据方法

// 6. 封装根据条件删除一条数据方法

// 7. 封装修改一条数据的方法

// 8. 封装一个把字符串 objectID 转换为 objectID 类型的方法