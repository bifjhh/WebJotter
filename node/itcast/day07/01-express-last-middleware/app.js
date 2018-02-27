// // 加载 express 模块 var express = require('express'); // 创建一个服务 var
// app=express(); // 配置路由 app.get('/',(req,res)=>{   res.send('哈喽!!!'); }); //
// 把这个中间件放到最后,这样的话所有没有匹配到的路由请求,最后都会执行这个中间件 // 替代了 express 原来的 Can not GET/ 显示
// app.use((req,res)=>{   res.send('404~~~~ 找不到您请求的路径'); });
// app.listen(8888,()=>console.log('http://localhost:8888'));



/* ---------- 中间件演示 ------------ */

// 加载 express 模块
var express = require('express');
// 创建一个服务
var app = express();


app.listen(8888, () => console.log('http://localhost:8888'));







