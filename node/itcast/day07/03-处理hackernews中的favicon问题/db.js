// 封装对 数据 的增删改查操作

const mongodb = require('mongodb');
const path = require('path');
const config = require('./config.js');

// 因为在每个方法中都会用到链接数据库的代码,所以吧链接数据库的代码单独封装到一个函数内
function connectDB(callback){
  var MongoClient = mongodb.MongoClient;
  MongoClient.connect(config.url,(err,db)=>{
    // 这里只是 用来连接数据库,结果全部传递到 callback 回调函数内;不做判断
    callback(err,db);
  })
};

// 封装一个根据 字符串 id 返回 objectID对象的方法
module.exports.ObjectID= (strId)=>{
  return new mongodb.ObjectID(strId);
};

// 封装查询所有数据的方法

module.exports.findAll =(collectionName,callback)=>{
  // 1. 调用 connectDB 链接数据库
  connectDB((err,db)=>{
    if(err) throw err;
    // 2. 查询 news 集合中的所有数据
    db.collection(collectionName).find().toArray((err,docs)=>{
      db.close();
      // 将查询到的结果返回出去
      callback(err,docs);
    })
  })
};

// 封装一个根据条件查询返回一条数据的方法
module.exports.findOne=(collectionName,filter,callback)=>{
  // 1. 链接数据库
  connectDB((err,db)=>{
    if(err)throw err;

    // 2. 根据条件查询数据库
    db.collection(collectionName).findOne(filter,(err,doc)=>{
      db.close();
      callback(err,doc);
    })
  })
};

// 封装一个插入一条数据的方法
module.exports.insertOne=(collectionName,data,callback)=>{
  connectDB((err,db)=>{
    if(err)throw err;
    
    // 2. 获取集合对象,执行插入操作
    db.collection(collectionName).insertOne(data,(err,result)=>{
      db.close();
      callback(err,result);
    })
  })
};


