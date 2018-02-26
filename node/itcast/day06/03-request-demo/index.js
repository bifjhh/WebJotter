
// 加载 request 模块
var request = require('request');
var fs = require('fs');
var path = require('path');

// 1. 直接调用 request 方法请求 url,并且通过回调函数获取返回值

// request("https://www.qiushibaike.com/", (err, res, body) => {
//   // console.log(err);
//   // console.log(res);
//   // console.log(body);
//   if(err)throw err;
// fs.writeFile(path.join(__dirname, 'body.html'), body, (err) => {
//     console.log('ok');
//   })
// })

// 2. 通过 request 直接下载文件
// request('https://www.baidu.com/img/bd_logo1.png').pipe(fs.createWriteStream('./Logo.png'));


request('https://www.qiushibaike.com/').pipe(fs.createWriteStream('./糗百.html'));