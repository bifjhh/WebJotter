/**
 * 该模块负责对 req 和 res 对象进行扩展
 * 希望的功能
 * 1. 为 req 增加一个 query 属性,该属性中保存的就是用户 get 请求提交过来的数据
 * - req.query
 * 2. 为 req 增加一个 pathname 属性
 * - req.pathname
 * 3. 为 res 增加一个 render 函数
 */

const fs = require('fs');
const url = require('url');
const mime = require('mime');
const _ = require('underscore');

// 让当前模块对外暴露一个函数,通过这个函数将 index.js 中的 req 和 res 对象传递到 context.js 这个模块中
module.exports = (req, res) => {
  // 1. 为 req 增加 query 属性
  var urlObj = url.parse(req.url.toLowerCase(), true);
  req.query = urlObj.query;
  // 2. 为 req 增加 pathname 属性
  req.pathname = urlObj.pathname;
  req.method = req.method.toLowerCase();
  // 3. 为 res 增加 render 函数 
  res.render = (filename, tplData) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        res.writeHead(404, 'Not Found', {
          'Content-Type': 'text/html;charset=utf-8'
        });
        res.end('404,Page Not Found');
        return;
      }
      // 通过第npm三方模块 mime 来判断不同的资源对应的Content-Type类型 
      res.setHeader('Content-Type', mime.getType(filename));
      // 如果找到了文件,直接返回该文件

      // 如果用户传递了 模板数据,则表示要进行模板替换			
      if (tplData) {
        // 如果用户传递了 模板数据,则表示要进行模板替换 使用 underscore 的 template 方法进行替换
        data = _.template(data.toString('utf8'))(tplData);
      }
      res.end(data);

    })
  };
};