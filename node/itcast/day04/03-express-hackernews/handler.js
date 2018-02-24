// 业务模块
const path = require('path');
// 处理新闻列表 index 

module.exports.index = (req,res)=>{

  // sendFile() 方法虽然可以读取对应的文件并返回,但是我们不使用 sendFile() 方法
  // 因为 将来要对 index.html 中的模板代码进行执行并替换
  // res.sendFile(path.join(__dirname,'views','index.html'));
  // 默认 render 方法是不能使用的,需要为 express配置一个模板引擎 才能使用
  res.render(path.join(__dirname,'views','index.html'));
}
module.exports.submit = (req, res) => {

}
module.exports.item = (req, res) => {

}
module.exports.add = (req,res)=>{

}
module.exports.add = (req,res)=>{

}