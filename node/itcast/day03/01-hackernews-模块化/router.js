// 该模块负责封装所有的路由判断代码

/**
 * 文档封装步骤
 * 1. 该模块中要封装什么代码?
 * 2. 这些代码有用到外部的数据吗? 如果用到了,是否需要通过 参数 将这些数据传递到当前模块中?
 * 3. 当前模块对外需要暴露的东西 (module.exports的值)
 */

var handler = require('./handler.js');
module.exports = (req, res) => {
  //先根据用户请求的路径(路由),将对应的HTML页面显示出来
  if (req.url === '/' || req.url === '/index' && req.method === 'get') {
    handler.index(req, res);
  } else if (req.url === '/submit' && req.method === 'get') {
    handler.submit(req, res);
  } else if (req.pathname === '/item' && req.method === 'get') {
    handler.item(req, res);
  } else if (req.url.startsWith('/resources') && req.method === 'get') {
    handler.resources(req, res);
  } else if (req.url.startsWith('/add') && req.method === 'get') {
    handler.get(req, res);
  } else if (req.url.startsWith('/add') && req.method === 'post') {
    handler.post(req, res);
  } else {
    handler.end(req, res);
  }

}