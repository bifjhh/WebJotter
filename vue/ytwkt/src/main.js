import Vue from 'vue'
import router from './router'; //导入路由模块
import axios from 'axios'; //导入axios路由的依赖包

Vue.config.productionTip = false

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common["Authorization"] = '';
// request interceptor
axios.interceptors.request.use(config => {
  // Do something before request is sent
  config.headers['token'] = '1e56c95504a9a846e4c7043704a20f25' // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
Vue.prototype.$http = axios //将 axios 改写为 Vue 的原型属性
Vue.prototype.$apiUrl = 'http://180.76.52.158' //将api地址写到 vue 原型中

// 使用 mint-ui 加载更多页面
// import 'mint-ui/lib/style.css'
// import { InfiniteScroll } from 'mint-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {
  Carousel,
  CarouselItem
} from 'element-ui';


Vue.use(Carousel);
Vue.use(CarouselItem);


// 导入组件页面
import './config/rem'
import App from './App' //根组件

new Vue({
  el: '#app',
  render: c => c(App),
  router,
})
