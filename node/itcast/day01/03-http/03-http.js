// 创建一个简单的 http 服务器程序

// 1. 加载 http 模块
var http = require('http');

// 2. 创建一个 http 服务对象
var server = http.createServer();

// 3. 监听用户的请求事件 (request)
// request 对象包含了用户请求报文中的所有内容,通过request 对象可以获取所有用户提交过来的数据
// response 对象用来向用户相应一些数据,当服务器要向客服端相应数据的时候,必须使用response 对象
// 有了 request对象和 response 对象.就既可以获取用户提交的数据,也可以向用户相应数据了
server.on('request', function (request, response) {
    // bady...
    response.write('Hello HttpServer!!!');

    // 对于每一个请求,服务器必须结束响应,否则客服端(浏览器) 会一直等待服务器响应结束.
    // res.end()
    response.end();
});

// 4. 启动服务
server.listen(8080,function(){
    console.log('服务器启动了,请访问:http://localhost:8080');
})