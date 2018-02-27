// 封装一个 模拟 body-parser 中间件

var querystring  = require('querystring');

module.exports=(req,res,next)=>{
  // 获取用户 post 提交的数据,并且把这些数据设置到 req.body 属性中

  // 设置一个数组,用来接收用户 post 过来的数据
    var buffer = [];
  req.on('data',(chunk)=>{
    buffer.push(chunk);
  });

  req.on('end',()=>{
    // 调用 Buffer.concat 方法 将 buffer 数组内的多个 buffer 数据合并为一个 buffer 数据
    buffer=Buffer.concat(buffer).toString('utf8');
    // 已经报 用户 post 提交的数据转换为 ison 对象,并赋值给了 req.body 
    req.body = querystring.parse(buffer);
    // 调用 next() 将请求交给后续的 中间件处理
    next();
  })
};