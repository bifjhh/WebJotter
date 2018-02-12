
// 执行文件操作


// 实现文件写入操作
// 1. 加载文件操作模块, fs 模块
var fs = require('fs');
// 2. 实现文件写入
var msg ='Hello XiaoMaJia!'

// 调用 fs.writeFile 进行文件写入

fs.writeFile('./hello.txt',msg,'utf8',function(err){
    if(err){
        console.log('出错了:'+err);
    }else{
        console.log('ok');
    }
})