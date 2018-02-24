// 加载 ejs 模块

var ejs = require('ejs');
var path = require('path');
// render var html = '<h1><%= username %></h1>';
// ejs.render(html,{username:'ejs-demo'});

ejs.renderFile(path.join(__dirname, 'index.html'), {title: 'ejs-demo',msg: 'hello ejs '}, (req, res) => {
})