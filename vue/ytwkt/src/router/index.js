/* 导出路由模块 */

import Vue from 'vue'
import VueRouter from 'vue-router' //导入vue路由的依赖包
Vue.use(VueRouter) //在vue中使用路由

import home from '../views/home' //首页登录
import consume from '../views/consume' //商家操作
import create from '../views/create' //新用户开卡


// 定义路由规则
var router = new VueRouter({
  // mode: "history",
  routes: [
    { path: '/', redirect: '/home' },//自动跳转到首页
    { path: '/home', component: home },//自动跳转到首页
    { path: '/consume', component: consume },//商家操作
    { path: '/consume/create', component: create },//新用户开卡

  ]
});

/* 导出路由模块 */
export default router;
