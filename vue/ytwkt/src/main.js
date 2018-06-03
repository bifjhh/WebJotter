import Vue from 'vue'
import router from './router'; //导入路由模块
import axios from 'axios'//导入axios路由的依赖包
Vue.config.productionTip = false

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common["Authorization"] = '';
Vue.prototype.$http = axios//将 axios 改写为 Vue 的原型属性
Vue.prototype.$apiUrl = 'http://localhost:8888/' //将api地址写到 vue 原型中

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
import  './config/rem'
import App from './App'//根组件

new Vue({
  el: '#app',
  render: c => c(App),
  router,
})
