
/* --------- 链接数据库 ---------------------- */
// // 加载 mongode 模块
// var mongodb = require('mongodb');

// // 2. 连接数据库
// // 获取一个用来连接数据库的对象 MongoClient
// var MongoClient = mongodb.MongoClient;

// // 创建一个连接字符串
// var connStr = 'mongodb://localhost:27017/test';


// // 开始连接数据库
// MongoClient.connect(connStr,(err,db)=>{
//   if(err){
//     console.log('数据库连接失败!错误信息:');
//     console.log(err);
//   }else{
//     console.log('连接成功');
//     // 连接成功后,在这里执行数据库操作

//     // 对数据库操作完毕后,一定要关闭数据库链接
//     db.close();
//     console.log('数据库链接已关闭');
//   }
// })


/* ----------- 链接数据库 并且查询 aaa 集合中的所有数据 */

// 1. 加载 mongode 模块
var mongodb = require('mongodb');

// 2. 连接数据库
// 获取一个用来连接数据库的对象 MongoClient
var MongoClient = mongodb.MongoClient;

// 3. 创建一个连接字符串
var url = 'mongodb://localhost:27017/test';


// 4. 开始连接数据库
MongoClient.connect(url,(err,db)=>{
  if(err){
    console.log('数据库连接失败!错误信息:');
    throw err;
  }else{
    console.log('连接成功');
    // 连接成功后,在这里执行数据库操作
    
    db.collection('aaa').find().toArray(function (err, docs) {
      if(err)throw err;
      console.log(docs);
      db.close();
      // 对数据库操作完毕后,一定要关闭数据库链接
      console.log('数据库链接已关闭');
    });
  }
})



