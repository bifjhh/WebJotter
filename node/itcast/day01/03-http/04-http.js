// 根据用户的不同请求 , 服务器作出不同的响应

// 1. 加载http模块
var http = require('http');

// 2. 创建http服务
http.createServer(function (require, response) {

    response.setHeader('Content-Type','text/html;charset=utf-8');
    // // 获取用户请求的路径 require下的url对象
    // console.log(require.url);

    // // 结束响应
    // require.end();

    // 通过 require.url 获取用户请求的路径,根据不同的请求路径,服务器作出不同的响应    
    if (require.url === '/' || require.url === '/index') {
        // response.write('hello index');
        // response.end();
        response.end('Hello Index');
    } else if (require.url === '/login') {
        response.end('Hello login');
    } else if (require.url === '/list') {
        response.end('Hello List');
    } else if (require.url === '/register') {
        response.end('Hello Register');
    } else {
        response.end('404, not Found。客户端错误！');
    }
}).listen(8080, function () {
    console.log('http://localhost:8080');
});