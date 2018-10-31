// 根据用户不同的请求,作出不同的响应(响应现有的HTML文件)
// 加载所需要的模块
var http = require('http');
var fs = require('fs');
var path = require('path');

// 封装函数,用来处理不同页面的数据读取和返回
function html(type, index, req, res) {
  fs.readFile(path.join(__dirname, type, index), function (err, data) {
    if (err) {
      throw err;
    }
    if (type === 'css') {
      res.setHeader('Content-Type', 'text/css');
    } else if (type === 'images') {
      res.setHeader('Content-Type', 'image/png');
    }
    res.end(data);
  })
}

// http.createServer(function (req, res) {

//     // 通过 req.url 获取用户请求的路径，根据不同的请求路径服务器做出不同的响应
//     if (req.url === '/' || req.url === '/index') {
//         html('htmls', 'index.html', req, res);
//     } else if (req.url === '/login') {
//         html('htmls', 'login.html', req, res);
//     } else if (req.url === '/list') {
//         html('htmls', 'list.html', req, res);
//     } else if (req.url === '/register') {
//         html('htmls', 'register.html', req, res);
//     } else if (req.url === '/images/index.png') {
//         html('images', 'index.png', req, res);
//     } else if (req.url === '/css/index.css') {
//         html('css', 'index.css', req, res);
//     } else {
//         html('htmls', '404.html', req, res);
//     }
// }).listen(8080, function () {
//     console.log('http://localhost:8080');
// });


http.createServer(function (req, res) {
  let url = req.url;
  if (url === '/' || url === '/index') {
    html('htmls', 'index.html', req, res);
  } else if (url === '/login') {
    html('htmls', 'login.html', req, res);
  } else if (url === '/list') {
    html('htmls', 'list.html', req, res);
  } else if (url === '/register') {
    html('htmls', 'register.html', req, res);
  } else if (url === '/images/index.png') {
    html('images', 'index.png', req, res);
  } else if (url === '/css/index.css') {
    html('css', 'index.css', req, res);
  } else {
    html('htmls', '404.html', req, res);
  }
}).listen(7020, () => {
  console.log('http://localhost:7020')
})