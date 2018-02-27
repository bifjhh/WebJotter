// 主模块,负责启动服务

var express = require('express');
var config = require('./config.js');
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./router.js');

var app = express();

// 注册路由,模板引擎,body-parser

// 设置模板引擎

app.set('views',path.join(__dirname,'htmls'));

app.engine('html',require('ejs').renderFile);
app.set('view engine','html');

// 设置使用 body-parser 插件 (挂载 body-parser 中间件)
app.use(bodyParser.urlencoded({extended:false}));

// 挂载路由模块
app.use(router);

// 启动服务
app.listen(config.proto,()=>console.log('http://localhost:'+config.proto));



