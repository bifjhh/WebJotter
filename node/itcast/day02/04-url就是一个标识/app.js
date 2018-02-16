

// 加载 模块
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

// 创建服务

http.createServer(function(req,res){
    // request,response
    // 1. 获取用户请求的路径
   if(req.url === '/index.html'||req.url === '/'){
       fs.readFile(path.join(__dirname,'index.html'),function (err,data) {
           if(err){
               throw err;
           }
           res.end(data);
       })
   }
    // res.end()


}).listen(8888,function(){
    console.log('http://localhost:8888');
})