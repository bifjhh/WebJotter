// // 路由模块, 主要负责路由判断 function router(app) {   app.get('/', (req, res) => {});
// app.get('/index', (req, res) => {});   app.get('/submit', (req, res) => {});
// app.get('/item', (req, res) => {});   app.get('/add', (req, res) => {});
// app.all('/add', (req, res) => {}); } module.exports = router; // 路由模块,
// 主要负责路由判断

// 1. 创建一个 router 对象 (router 既是一个对象,也是一个函数);
var express = require('express');
var router = express.Router();
var handler = require('./handler.js');
var path = require('path');

// 2. 通过 router 对象设置(挂在)路由

// 首页新闻列表
router.get('/', handler.index);
router.get('/index', handler.index);
// 新闻详情页
router.get('/item', handler.item);
router.get('/submit', handler.submit);
router.get('/add', handler.addGet);
router.post('/add', handler.addPost);
// 处理浏览器请求 /favicon.ico 的问题
// 当用户请求 /favicon.ico 的时候,将请求地址替换为 /resources/images/y18.gif 
router.get('/favicon.ico', (req,res,next)=>{
  // req.url = '/resources/images/y18.gif';
  req.url = '/resources/images/favicon.png';
  next();
});

// 实现对 resource 静态资源托管
router.use('/resources', express.static(path.join(__dirname,'resources')));

// 注册一个错误处理中间件
router.use((err,req,res,next)=>{
  console.log('错误处理中间件被执行了!!!');
  res.status(500).send('服务器内部错误:'+err);
});

// 3. 返回一个 router 对象
module.exports = router;