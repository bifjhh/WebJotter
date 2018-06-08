import Vue from 'vue'
import router from './router'; //导入路由模块
import axios from 'axios'; //导入axios路由的依赖包
import md5 from 'js-md5'; //导入axios路由的依赖包
import Qs from 'qs'
Vue.config.productionTip = false

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.common["Authorization"] = '';
// request interceptor
axios.interceptors.request.use(config => {
  console.log(config)
  // Do something before request is sent
  // config.headers['token'] = '1e56c95504a9a846e4c7043704a20f25' // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  config.data.token = md5('1e56c95504a9a846e4c7043704a20f25')
  // config.data={json:config.data}
  if (config.method == "post") {
    // config.data = Qs.stringify({json:config.data});
    let ret = ''
    for (let it in config.data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    console.log(config.data)
  }
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
