// 执行文件操作


// 实现文件写入操作
// 1. 加载文件操作模块, fs 模块
var fs = require('fs');

// 2. 实现文件写入
var msg = 'I miss you XiaoMaJia!'

// 调用 fs.writeFile 进行文件写入
fs.writeFile('./hello.txt', msg, 'utf8', function (err) {
  if (err) throw '出错了'+ err;
  console.log('写入完成');
})

// 实现文件的读取操作
// 1. 加载 fs 模块
// var fs = require('fs');
// 2. 调用 fs.readFile() 方法来读取文件
// 在读取文件的时候,如果传递了编码格式,那么回调函数中的data默认就会转换为字符串
fs.readFile('./hello.txt', 'utf8', function (err, data) {
  if (err) throw '出错了'+ err;
  // data 参数的数据类型是一个Buffer 对象 ,里面保存的是一个个字节(理解为字节数组) 
  // 把 Buffer 对象转换为一个字符串
  console.log(data);
  // Buffer 调用 toString('utf8')方法,转换为字符串,并指定转换编码为 utf8, 如果不指定编码格式,默认也是utf8的
  // console.log(data.toString('utf8'));
})