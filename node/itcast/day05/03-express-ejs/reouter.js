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
router.get('/', handler.index);
router.get('/index', handler.index);
router.get('/submit', handler.submit);
router.get('/item', handler.item);
router.get('/add', handler.add);
router.post('/add', handler.add);

// 实现对 resource 静态资源托管
router.use('/resources', express.static(path.join(__dirname,'resources')));

// 3. 返回一个 router 对象
module.exports = router;