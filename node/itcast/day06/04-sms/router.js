// 路由模块
var express = require('express');
var handler = require('./handler.js');

// 1. 创建路由对象
var router = express.Router();

// 通过路由对象挂载路由

// 显示首页
router.get('/',handler.index);
// 显示首页
router.get('/index',handler.index);

// 显示学员列表页面
router.get('/students',handler.students);

// 显示添加学员界面
router.get('/add',handler.showAdd);

// post 添加一个学员
router.post('/add',handler.addSta);

// 查看学员信息
router.get('/info',  handler.info);

// 显示编辑学员页面 (get 请求 /edit)
router.get('/edit', handler.showEdit);

// 修改一个学员信息 (post 请求 /edit)
router.post('/edit',handler.updateOne);

// 删除一个学员信息
router.get('/delete',handler.removeStu);

// 因为没有使用静态资源,所以不需要再写一个请求静态资源的文件

// 导出 路由模块
module.exports = router;




