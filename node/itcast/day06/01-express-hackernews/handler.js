// 业务模块
const path = require('path');
const mongodb = require('mongodb');
const config = require('./config.js');
const db = require('./db.js');

// 处理新闻列表 index
module.exports.index = (req, res) => {

  db.findAll('news',(err,docs)=>{
    if(err) throw err;

    res.render('index', {list: docs.reverse()});
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
  var ObjectID = db.ObjectID(req.query._id);
  db.findOne('news',{_id:ObjectID},(err,doc)=>{
    if(err)throw err;
    if (doc) {
      res.render('details', {item: doc});
    } else {
      res.send('no such item');
    };
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
  db.insertOne('news',doc,(err,result)=>{
    if(err)throw err;
      // 3. 重定向
    res.redirect('/');
  });
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
  db.insertOne('news',doc,(err,result)=>{
    if(err)throw err;
      // 3. 重定向
    res.redirect('/');
  });
};