var http = require('http');

http.createServer((req, res) => {

  // 实现弹框下载功能,(核心思想:设置相应的响应报文头)
  res.setHeader('Content-Type','appliction/octet-stream');
  res.setHeader('Content-Disposition','attachment;filename=demo.txt');
  

  res.end('hello');
  
}).listen(8888, () => console.log('http://localhost:8888'));