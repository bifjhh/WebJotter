// 入口文件 
// 模拟静态资源服务器(Apache服务器) 加载 express 模块

var express = require('express');
var path = require('path');

// 创建 app 对象
var app = express();

// // 处理静态资源的方法
// var fn = express.static(path.join(__dirname,'public'));
// // 注册路由
// // /index.html
// app.use('/', fn);

app.use('/', express.static(path.join(__dirname, 'public')));





// 启动服务
app.listen(8888,()=>console.log('http://localhost:8888'));