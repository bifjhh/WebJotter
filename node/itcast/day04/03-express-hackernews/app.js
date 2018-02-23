// app.js  模块职责: 负责启动服务

// 1. 加载 express 模块
var express = require('express');
// 加载 config.js 模块
var config = require('./config.js');
var reouter = require('./reouter.js');

// 2. 创建 app 对象
var app = express();
// 3. 注册路由
// app.use('/', reouter); == // app.use(reouter);
app.use('/', reouter);

// 4. 启动服务

app.listen(config.port, () => console.log('http://localhost:' + config.port));