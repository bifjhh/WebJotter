

// 加载 模块
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

// 创建服务

http.createServer(function(req,res){
    // require,response
    // 1. 获取用户请求的路径
    // var url = req.url;
    // 2. 获取public目录的完整路径
    var publicDir = path.join(__dirname,'public');

    // 3. 根据public 的路径 和用户请求的路径,最终计算出用户所请求的静态资源的完整路径
    var filename = path.join(publicDir,req.url);

    // 4. 根据文件的完整路径去读取该文件,如果读取到了就返回给用户,如果读取不到,则返回404
    fs.readFile(filename,function (err,data) {
        
        if(err){
            res.setHeader('Content-Type', 'text/html;charset=utf-8');
            res.end('文件不存在 404');
        }else{
            // 通过第npm三方模块 mime 来判断不同的资源对应的Content-Type类型 
            res.setHeader('Content-Type',mime.getType(filename));
            // 如果找到了文件,直接返回该文件
            res.end(data);
        }
    })
    // res.end()


}).listen(8888,function(){
    console.log('http://localhost:8888');
})