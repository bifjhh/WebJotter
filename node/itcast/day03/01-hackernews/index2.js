// 当前项目 (包) 的入口文件
// 封装一个render()函数
// 将render 函数挂在res对象上,可以通过res.render()来访问
// 实现 get 方法添加新闻
// 实现在原来 list 数组的基础上追加新闻
// 实现 post 方法添加新闻

// 1. 加载 http 模块
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var url = require('url');
var querystring = require('querystring');

// 封装函数,用来处理不同页面的数据读取和返回


// 2. 创建服务
http.createServer(function (req, res) {
	// 要在这里写大量的代码(逻辑)

	// 为res 对象添加一个 render() 函数, 方便后续使用
	res.render = (filename) => {
		fs.readFile(filename, (err, data) => {
			if (err) {
				res.writeHead(404, 'Not Found', {
					'Content-Type': 'text/html;charset=utf-8'
				});
				res.end('404,Page Not Found');

				return;
			} else {
				// 通过第npm三方模块 mime 来判断不同的资源对应的Content-Type类型 
				res.setHeader('Content-Type', mime.getType(filename));
				// 如果找到了文件,直接返回该文件
				res.end(data);
			}
		})
	};

	// 设计路由
	// 当用户请求 / 或 index 时, 显示新闻列表页面 --get请求
	// 当用户请求 /item 时, 显示新闻详情页面 --get请求
	// 当用户请求 /submit 时, 显示添加新闻页面 --get请求
	// 当用户请求 /add 时, 将用户提交的新闻保存到data.json文件中 --get请求 
	// 当用户请求 /add 时, 将用户提交的新闻保存到data.json文件中 --post请求  

	// 使用toLowerCase() 方法,将用户请求的url 和 method 转换为小写字母
	req.url = req.url.toLowerCase();
	req.method = req.method.toLowerCase();
	// 通过 url 模块,调用 url.parse() 方法,解析用户请求的url(req.url)
	var urlObj = url.parse(req.url, true);
	// console.log(urlObj);



	//先根据用户请求的路径(路由),将对应的HTML页面显示出来
	if (req.url === '/' || req.url === '/index' && req.method === 'get') {
		// 1. 读取index.html 并返回
		res.render(path.join(__dirname, 'views', 'index.html'));
	} else if (req.url === '/submit' && req.method === 'get') {
		// 1. 读取submit.html 并返回
		res.render(path.join(__dirname, 'views', 'submit.html'));
	} else if (req.url === '/item' && req.method === 'get') {
		// 1. 读取details.html 并返回
		res.render(path.join(__dirname, 'views', 'details.html'));
	} else if (req.url.startsWith('/resources') && req.method === 'get') {
		res.render(path.join(__dirname, req.url));
	} else if (req.url.startsWith('/add') && req.method === 'get') {
		// 表示 get 方法提交一条新闻
		// 要获取用户 get 提交过来的数据,需要用到 url 模块(这个模块是node.js内置模块  不是第三方模块)
		// 既然是 get 提交过来的数据,可以通过req.url来获取,但是并不方便(因为要自己截取字符串,然后获取想要的数据)
		// 1. 获取用户 get 提交过来的新闻数据
		// URLObj.query.title
		// URLObj.query.url
		// URLObj.query.text


		fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', function (err, data) {
			// 因为第一次访问网站,data.json 文件本身就是不存在,所以肯定是会报错的
			// 但是这种错误,我们并不认为是网站出错了,所以并不需要抛出异常
			if (err && err.code !== 'ENOENT') throw err;
			// 如果读取到数据,那么就将读取到的数据 data 转换为 list 数组
			// 如果没有读取到数据,那么就把 '[]' 转换为数组
			var list = JSON.parse(data || '[]');
			list.push(urlObj.query);
			// 2. 把用户提交的新闻数据保存到 data.json 文件中
			// 把list数组中的数据写入到data.json文件中;
			fs.writeFile(path.join(__dirname, 'data', 'data.json'), JSON.stringify(list), function (err) {
				if (err) throw err;
				console.log('ok');
				// 设置响应报文头,通过响应报文头告诉浏览器,执行一次页面跳转操作
				// 3. 跳转到新闻列表页面
				// 重定向
				res.statusCode = 302; //设置响应状态码
				res.statusMessage = 'Found'; //设置响应信息
				res.setHeader('Location', '/'); //设置响应头

				res.end();
			});
		})

		// var list = []; //设置用来存放用户提交数据的数组
		// list.push(urlObj.query); // 将用户提交的信息存放到数组当中

	} else if (req.url.startsWith('/add') && req.method === 'post') {
		// 表示 post 方法提交一条新闻
		// 1. 读取 data.json 文件中的数据
		fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', function (err, data) {

			if (err && err.code !== 'ENOENT') throw err;
			var list = JSON.parse(data || '[]');
			// 2. 将读取到的数据转换为 list 数组
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

				// 3. 向 list 数组中 push 一条新闻
				list.push(postIofo);
				// 4. 把 list 数组转换为字符串重新输入到 data.json 文件中
				fs.writeFile(path.join(__dirname, 'data', 'data.json'), JSON.stringify(list), function (err) {
					if (err) throw err;
					console.log('ok');
					// 设置响应报文头,通过响应报文头告诉浏览器,执行一次页面跳转操作
					// 5. 重定向 跳转到新闻列表页面
					res.statusCode = 302; //设置响应状态码
					res.statusMessage = 'Found'; //设置响应信息
					res.setHeader('Location', '/'); //设置响应头

					res.end();
				});
			})

		});






	} else {

		res.end('404,Page Not Found');
	}


}).listen(8888, function () {
	console.log('http://localhost:8888');
});