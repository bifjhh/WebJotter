// app.js  模块职责: 负责启动服务

// 1. 加载 express 模块
var express = require('express');
// 加载 config.js 模块
var config = require('./config.js');
var reouter = require('./reouter.js');
var path = require('path');

// 2. 创建 app 对象
var app = express();

// 为 express 继承 ejs 模板引擎(配置 express 使用 ejs 模板引擎)
// 配置完毕后, res.render() 函数就可以使用了
// 配置模板引擎的代码要放到正式处理请求之前,否则可能不能用
// 当使用 ejs 模板引擎的时候,模板文件的后缀必须是 .ejs 
// 1. 安装 ejs 模块
// 2. 配置 express 使用 ejs 模板引擎
// - 告诉 express , 模板文件的存放路径
// - 告诉 express , 要使用的模板引擎 

// // 设置所有模板文件的存放路径
app.set('views', path.join(__dirname, 'htmls'));
// // 设置要使用 ejs 模板引擎
app.set('view engine', 'ejs');


// 3. 注册路由
// app.use('/', reouter); == // app.use(reouter);
app.use(reouter);

// 4. 启动服务

app.listen(config.port, () => console.log('http://localhost:' + config.port));