// 封装配置信息

const path = require('path');

module.exports = {
  "port": 8888,
  "dataPath":path.join(__dirname, 'data', 'data.json'),
  "viewPath":path.join(__dirname, 'views'),
}