// 加载 express 模块
var express = require('express');
var config = require('./config.js');
var bodyParser = require('body-parser');
var router = require('./router.js');

// 创建服务
var app = express();

// 设置 bodyparser 挂载路由模块
app.use(bodyParser.urlencoded({extended:false}));

// 挂载路由
app.use(router);


// 启动服务
app.listen(config.proto,()=>console.log('http://localhost:'+config.proto));