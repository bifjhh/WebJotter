// 抓数据用的模块 http https ,这两个都是核心(内置)模块
// post 请求的请求报文体
// const postData = querystring.stringify({'msg': 'Hello World!'});

// 1. 加载 https 模块
const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// 2. 构建 options (构建请求信息: 请求报文)

var options = {
  hostname: 'www.qiushibaike.com',
  port: 443,
  path: '/',
  method: 'GET',
  headers:{
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36',
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9'
  },
};


// 3. 调用 https 的 request 方法,向服务器发起请求,并且获取服务器返回的结果(页面代码)
var req = https.request(options,(res)=>{
  // 通过监听 response 的 data 事件 和 end 事件 获取服务器返回的数据
  var buffer = [];
  res.on('data',(chunk)=>{
    buffer.push(chunk);
  });

  res.on('end',()=>{
    buffer = Buffer.concat(buffer);
    var html = buffer.toString('utf8');
    var jokes = [];
   
    // 1. 提取所有的作者名称(h2 标签中的内容)
    // var result = html.match(/<h2>\s*.+\s*<\/h2>/ig);//提取的是所有的h2标签(包括代码)
    // 通过正则表达式的 exec 方法进行提取
    // 1. 创建正则表达式对象
    var regAuthor = /<h2>\s*(.+)\s*<\/h2>/ig;
    var regContent = /<div class="content">\s*<span>\s*(.+)\s*<\/span>(\s*<span class="contentForAll">查看全文<\/span>)?\s*<\/div>/ig;
    // 2. 调用 正则表达式 的 exec() 方法
    // exec() 方法,调用一次,只能匹配提取一个内容,通过反复多次调用,才可以将全部内容提取出来
    // 每次调用 exec() 方法,如果找到了匹配的结果则返回结果,找不到则 返回 null 

    var result;

    while(result = regAuthor.exec(html)){
      var content = regContent.exec(html);
      // console.log(result[1]);
      // console.log('-------------------------------------');
      // console.log(content[1]);
      // console.log(content[1]);
      jokes.push({
        author:result[1],
        content:content[1]
      });
    };

    // var result;
    // var regContent = /<div class="content">\s*<span>\s*(.+)\s*<\/span>(\s*<span class="contentForAll">查看全文<\/span>)?\s*<\/div>/ig;

    // while(result = regContent.exec(html)){
    //   console.log(result[1]);
    // }


    // 将 jokes 写到一个文件中
    fs.writeFile(path.join(__dirname,'jokes.json'),JSON.stringify(jokes),(err)=>{
      if(err)throw err;
      console.log('写入完成');
    });


  });
});

// 监听本次请求是否出错

req.on('error',(err)=>console.log('出错了'+err));

// 如果是 post 请求,需要设置请求报文体
// req.write(postData);


// 结束本次请求 
// 表示客户端向服务器发送的数据都已经发完了
console.log('结束了');
req.end();