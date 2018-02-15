// 根据用户不同的请求,作出不同的响应(响应现有的HTML文件)
// 加载所需要的模块
var http = require('http');
var fs = require('fs');
var path = require('path');

// 封装函数,用来处理不同页面的数据读取和返回
function html(index, req, res) {
    fs.readFile(path.join(__dirname, 'htmls', index + '.html'), function (err, data) {
        if (err) {
            throw err;
        }
        res.end(data);
    })
}

http.createServer(function (req, res) {

    // 通过 req.url 获取用户请求的路径，根据不同的请求路径服务器做出不同的响应
    if (req.url === '/' || req.url === '/index') {
        html('index', req, res);
    } else if (req.url === '/login') {
        html('login', req, res);
    } else if (req.url === '/list') {
        html('list', req, res);
    } else if (req.url === '/register') {
        html('register', req, res);
    } else if (req.url === '/images/index.png') {
        fs.readFile(path.join(__dirname, 'images', 'index.png'), function (err, data) {
            if (err) {
                throw err;
            }
            res.setHeader('Content-Type', 'image/png');
            res.end(data);
        });
    } else {
        html('404', req, res);
    }
}).listen(8080, function () {
    console.log('http://localhost:8080');
});