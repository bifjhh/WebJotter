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

// 2. 创建服务
http.createServer((req, res) => {
	// 调用 context.js 模块的返回值(函数), 并将 req 和 res 对象传递给 context.js 模块
	context(req,res);
	// 设计路由
	// 当用户请求 / 或 index 时, 显示新闻列表页面 --get请求
	// 当用户请求 /item 时, 显示新闻详情页面 --get请求
	// 当用户请求 /submit 时, 显示添加新闻页面 --get请求
	// 当用户请求 /add 时, 将用户提交的新闻保存到data.json文件中 --get请求 
	// 当用户请求 /add 时, 将用户提交的新闻保存到data.json文件中 --post请求  

	
	//先根据用户请求的路径(路由),将对应的HTML页面显示出来
	if (req.url === '/' || req.url === '/index' && req.method === 'get') {
		// 1. 调用 getInfo() 方法读取 读取 data.json 中的数据,并转换为 list 数组
		getInfo(function (info) {
			res.render(path.join(__dirname, 'views', 'index.html'), {
				"list": info
			});
		});

	} else if (req.url === '/submit' && req.method === 'get') {
		// 1. 调用 getInfo() 方法读取 读取submit.html 并返回
		getInfo(function (info) {
			res.render(path.join(__dirname, 'views', 'submit.html'), {
				"list": info
			});
		});
	} else if (req.pathname === '/item' && req.method === 'get') {
		// 1. 读取details.html 并返回
		// 1. 调用 getInfo() 方法读取 data.json 中的数据,并转换为 list 数组
		getInfo(function (info) {
			var item = info.filter(function (item) {
				// req.query.id 直接获取用户请求的新闻 id
				// 使用 filter() 过滤器方法筛选对应的 id 的新闻
				return item.id.toString() === req.query.id;
			});
			// 2. 在服务器端使用模板引擎,将 list 数组中的数据和index.html 文件中的内容组合起来,返回给客户端渲染
			// 2.1 读取 index.html 文件
			// 如果查询到了用户请求的 id 的新闻,则返回
			if (item.length > 0) {
				res.render(path.join(__dirname, 'views', 'details.html'), {
					"item": item[0]
				});
			} else {
				// 如果查询不到,则返回错误信息
				res.end('No This Item')
			}
		});
	} else if (req.url.startsWith('/resources') && req.method === 'get') {
		res.render(path.join(__dirname, req.url));
	} else if (req.url.startsWith('/add') && req.method === 'get') {
		// 表示 get 方法提交一条新闻
		// 要获取用户 get 提交过来的数据,需要用到 url 模块(这个模块是node.js内置模块  不是第三方模块)
		// 既然是 get 提交过来的数据,可以通过req.url来获取,但是并不方便(因为要自己截取字符串,然后获取想要的数据)
		// 1. 获取用户 get 提交过来的新闻数据
		// req.query.title // req.query.url // req.query.text
		getInfo(function (info) {
			req.query.id = info.length;
			info.push(req.query); // 将用户提交的信息存放到数组当中
			// 2. 把用户提交的新闻数据保存到 data.json 文件中
			// 调用 setInfo() 方法,把list数组中的数据写入到data.json文件中;
			setInfo(JSON.stringify(info), function () {
				// 设置响应报文头,通过响应报文头告诉浏览器,执行一次页面跳转操作
				// 3. 跳转到新闻列表页面
				// 重定向
				res.statusCode = 302; //设置响应状态码
				res.statusMessage = 'Found'; //设置响应信息
				res.setHeader('Location', '/'); //设置响应头
				res.end();
			});
		});

	} else if (req.url.startsWith('/add') && req.method === 'post') {
		// 表示 post 方法提交一条新闻
		// 1. 调用 getInfo() 方法读取 读取 data.json 文件中的数据
		getInfo(function (info) {
			// 2. 接收用户 post 请求发送过来的数据
			postBody(req, function (postData) {
				// 在把 新闻 添加到 list 之前，为新闻增加一个 id 属性
				postData.id = info.length;
				// 向 list 数组中 push 一条新闻
				info.push(postData);

				// 3. 调用 setInfo() 方法 把 list 数组转换为字符串重新输入到 data.json 文件中
				setInfo(JSON.stringify(info), function () {
					// 设置响应报文头,通过响应报文头告诉浏览器,执行一次页面跳转操作
					// 重定向 跳转到新闻列表页面
					res.statusCode = 302; //设置响应状态码
					res.statusMessage = 'Found'; //设置响应信息
					res.setHeader('Location', '/'); //设置响应头
					res.end();
				});
			});
		});
	} else {

		res.end('404 Page Not Found');
	}

}).listen(8888, () => console.log('http://localhost:8888'));

// 封装 读取 data.json 文件 函数,
function getInfo(callback) {
	fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', (err, data) => {

		if (err && err.code !== 'ENOENT') throw err;
		var list = JSON.parse(data || '[]');

		// 通过调用回调函数 callback() 将读取到的数据 list 传递出去
		callback(list);
	})
}
// 封装 写入 data.json 文件 函数,
function setInfo(data, callback) {
	fs.writeFile(path.join(__dirname, 'data', 'data.json'), data, (err) => {
		if (err) throw err;
		callback();
	});
}

// 封装用户 post 请求过来的数据 函数,
function postBody(req, callback) {
	// 因为 post 提交数据的时候,数据量可能比较大,所以会分多次进行提交,每次提交一部分数据
	// 此时要想在服务器中获取用户提交的所有数据,就必须监听 request 事件的 data 事件,(因为浏览器每次提交一部分数据到服务器,就会触发一次 data 事件)
	// 那么,什么时候才表示浏览器把所有的数据都提交到服务器了?就是当 request 对象的 end 事件被触发的时候.
	// 监听 request 对象的 data 事件 和 end 事件 代码如下
	// 声明一个数组,用来保存用户每次提交过来的数据
	var array = [];
	req.on('data', (chunk) => {
		// 此处的 chunk 参数,就是浏览器本次提交过来的一部分数据(不固定,可随意定名)
		// chunk 的数据类型是 Buffer (chunk 就是一个 Buffer对象)
		array.push(chunk);
	});

	// 监听 request 对象的 end 事件
	// 当 end 事件 被触发的时候,表示浏览器上的数据都已经提交完毕了
	req.on('end', () => {
		// 在这个事件中,只要把 array 中的所有数据汇总起来就好	 
		// Buffer.concat() 方法,将多个 Buffer 数据合成一个 Buffer
		var postIofo = Buffer.concat(array);

		// 把获取到的 Buffer 对象转换为一个字符串
		postIofo = postIofo.toString('utf8');

		// 把 post 请求的查询字符串转换为一个 json 对象  使用querystring.parse() 方法
		postIofo = querystring.parse(postIofo);
		callback(postIofo);
	});
}