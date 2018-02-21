// 模块一(服务模块): 负责启动服务
// 模块二(扩展模块): 负责扩展 request 和 response 对象,为 req 和 res 增加一些更方便好用的 API
// 模块三(路由模块): 负责路由判断
// 模块四(业务模块): 负责处理具体路由的业务代码
// 模块五(数据操作模块): 负责进行数据库操作
// 模块六(配置模块): 负责保存各种项目中用到的配置信息

// 1. 加载 http 模块
const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const url = require('url');
const querystring = require('querystring');
const _ = require('underscore');

var context = require('./context.js');
var router = require('./router.js');
var config = require('./config.js');

// 2. 创建服务
http.createServer((req, res) => {
	// 调用 context.js 模块的返回值(函数), 并将 req 和 res 对象传递给 context.js 模块
	context(req,res);

	// 调用 router.js (路由)模块的返回值(函数),并将 req 和 res 对象传递给 router.js
	router(req,res);

	
}).listen(config.port, () => console.log('http://localhost:'+config.port));

