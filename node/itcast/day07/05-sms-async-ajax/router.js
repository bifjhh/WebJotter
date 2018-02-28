// 路由模块

var express = require('express');
var router =express.Router();
var path = require('path');
var handler = require('./handler.js');

// 挂载路由
// 请求学员信息列表接口
router.post('/students',handler.students);
// 请求个人详情信息接口
router.post('/info',handler.info);
// 请求籍贯列表接口
router.post('/cities', handler.cities);
// 请求专业列表接口
router.post('/majors', handler.majors);
// 添加学员接口
router.post('/addStu', handler.addStu);
// 删除学员接口
router.post('/delete', handler.removeStu);
// 编辑学员信息接口
router.post('/updateOne', handler.updateOne);

// 1. 将 public 目录作为静态资源暴露给用户
router.use(express.static(path.join(__dirname,'public')));

// 注册一个错误处理中间件
router.use((err,req,res,next)=>{
  console.log('错误中间件被执行了');
  res.status(500).send('服务器内部错误 : '+err);
});

module.exports = router;




