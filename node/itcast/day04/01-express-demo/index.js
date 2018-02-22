// 入口文件


// --------- 实现了一个基本的 hello world --------
// // 1. 加载 express 模块
// var express = require('express');

// //  2. 创建一个 app 对象 (类似于创建一个 server 对象)
// var app = express();
// // ---------- 注册路由 ----------
// // 通过 中间件 监听指定的路由的请求
// app.get('/index', (req, res) => {

//   // res.end('Hello express');
//   res.send('Hello express 使用send!');

//   // res.send() 和 res.end() 区别: 
//   // 1. 参数类型区别 :
//   // res.send() 参数可以是一个Buffer、一个 String、一个 object 或一个 array
//   // res.end() 参数只能是 Buffer 或 String 
//   // 2. res.send() 会自动发送更多的响应报文头,其中就包括 Content-Type,text/html;charset=utf-8, 所以,不会乱码

// })

// // 3. 启动服务
// app.listen(8888, () => console.log('http://localhost:8888'));

// ----------- express 中注册路由的方法
// 1. 加载 express 模块
var express = require('express');

//  2. 创建一个 app 对象 (类似于创建一个 server 对象)
var app = express();
// ---------- 注册路由 ----------
// 通过 中间件 监听指定的路由的请求

// req.url 中的 pathname部分必须和 /index 一致
// app.get('/index', (req, res) => {
//   res.send('Hello express 使用send!');
// });

// 1. 在进行路由匹配的时候,不限定方法,什么请求方法都可以
// 2. 请求路径中的第一部分,只要与 /inde 相等即可,并不要求请求路径 (pathname) 完全匹配
// app.use('/index', (req, res) => {
//   res.send('Hello express 使用send!');
// });

// app.get() 和 app.use() 注册路由的区别

// 通过 app.all() 注册路由: 1. 不限定请求方法, 2. 请求路径的 pathname 必须完全匹配
// app.all('/index', (req, res) => {
//   res.send('Hello express 使用send!');
// });

// 通过 正则表达式 注册路由
app.get(/^\/index(\/.+)$/i, (req, res) => {
  res.send('Hello express 使用send!');
});


// 通过 req.params 获取路由中的参数
app.get('/news/:year/:month/:day', function (req, res) {
  // console.log(req.params);
  res.send(req.params);
  // 返回的是一个 json 格式的对象
  /* http://localhost:8888/news/2018/02/22
    {
      year: "xxx",
      month: "xxx",
      day: "xxx",
    }
  */
});

// 注册一个 请求 / 的路由
app.get('/', (req, res) => {
  res.send('Index');
});

// 3. 启动服务
app.listen(8888, () => console.log('http://localhost:8888'));


