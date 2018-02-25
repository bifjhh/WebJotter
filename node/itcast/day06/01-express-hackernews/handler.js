// 业务模块
const path = require('path');
const mongodb = require('mongodb');
const config = require('./config.js');

// 处理新闻列表 index
module.exports.index = (req, res) => {

  // 1. 读取 MongoDB 中的新闻数据

   
  var MongoClient= mongodb.MongoClient;
  MongoClient.connect(config.url,(err,db)=>{
    if(err)throw err;
    console.log('链接成功');
    // 执行查询操作
    db.collection('news').find().toArray((err,docs)=>{
      if(err)throw err;
      
      // 关闭数据库链接
      db.close();
      console.log('关闭数据库');

      // 2. 调用 res.render() 方法 通过模板引擎实现读取 index.html 文件 并替换模板引擎代码,同时渲染给浏览器
      res.render('index',{list:docs.reverse()});
    })
  })


  // sendFile() 方法虽然可以读取对应的文件并返回,但是我们不使用 sendFile() 方法 
  //因为 将来要对 index.html 中的模板代码进行执行并替换 
  // res.sendFile(path.join(__dirname,'views','index.html')); 
  // 默认 render 方法是不能使用的,需要为 express配置一个模板引擎 才能使用
  // res.render('test', {title: 'test template EJS',message: 'hello ejs'});
};

module.exports.item = (req, res) => {
// 获取用户要查询的新闻的id
// req.qurey._id
// 把 req.query._id 转换为数据库中的 ObjectID 类型
var objId = new mongodb.ObjectID(req.query._id);

// 从MongoDB 中读取这条新闻的数据
var MongoClient= mongodb.MongoClient;
  MongoClient.connect(config.url,(err,db)=>{
    if(err)throw err;
    console.log('链接成功');
    // 执行查询操作
    db.collection('news').findOne({_id:objId},(err,doc)=>{
      // 关闭数据库链接
      db.close();
      console.log('关闭数据库');
      if(err)throw err;
      // 调用res.render() 渲染
      if(doc){
        res.render('details',{item:doc});
      }else{
        res.send('no such item');
      }
    });
  });
};
module.exports.submit = (req, res) => {
  res.render('submit');
};
module.exports.addGet = (req, res) => {
  // 1. 获取用户 get 提交的新闻数据
  var doc ={
    title:req.query.title,
    url:req.query.url,
    content:req.query.content,
  };
  // 2. 将新闻数据插入到 MongoDB 数据库中
  var MongoClient = mongodb.MongoClient;
  MongoClient.connect(config.url,(err,db)=>{
    db.collection('news').insertOne(doc,(err,result)=>{
      console.log('添加完成');
      db.close();
      if(err)throw err;
      // 3. 重定向
      res.redirect('/');
    })
  })

};
module.exports.addPost = (req, res) => {
  // express 已经为 req 对象扩展了一个 body 属性(req.body)
  // 默认 req.body 不能使用
  // 想要使用 req.body 必须配合一个 body-parser 插件(中间件) 才可以 使用 req.body
  // 类似 res.render()函数 ,虽然有,但是不能用,必须要先配置一个 模板引擎 才能使用
  var doc ={
    title:req.body.title,
    url:req.body.url,
    content:req.body.content,
  };
  // 2. 将新闻数据插入到 MongoDB 数据库中
  var MongoClient = mongodb.MongoClient;
  MongoClient.connect(config.url,(err,db)=>{
    db.collection('news').insertOne(doc,(err,result)=>{
      console.log('添加完成');
      db.close();
      if(err)throw err;
      // 3. 重定向
      res.redirect('/');
    })
  })
};