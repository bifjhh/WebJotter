import React from 'react'

// 使用 路由模块, 首先下载依赖包 yarn add react-router-dom 然后 导入路由模块 HashRouter
// 表示一个路由的根容器,奖励啊所有和路由相关的东西,都要包裹在 HashRouter 里面,而且一个网站中,只需要使用一次 HashRouter Route
// 表示一个路由规则, 在 Route 上,有两个比较重要的属性, path component Link 表示一个路由的链接,就好比 vue 中的
// <router-Link to=""/></router-Link>
import {HashRouter, Route, Link} from "react-router-dom";

import Home from './components/Home.jsx'
import Movie from './components/Movie.jsx'
import About from './components/About.jsx'

export default class App extends React.Component{
  constructor(props) {
    super(props)
    this.state={}
  }

  render(){
    // 当使用 HashRouter 把 App 根组件包裹起来的时候,网站就已经启用路由了
    // 在一个 HashRouter 中,只能有一个唯一的根元素
    // 在一个网站中,只需要使用唯一的一次 <HashRouter > </ HashRouter>
    return(
      <HashRouter>
        <div>
          <h1>这是网站的App根组件</h1>
          <hr/>
          <Link to='/home'>首页</Link>&nbsp;&nbsp;
          <Link to='/movie/top250/10'>电影</Link>&nbsp;&nbsp;
          <Link to='/about'>关于</Link>&nbsp;&nbsp;

          <hr/>
          {/* Route 创建的标签木九十路由规则,其中 path 表示要匹配的路由,component 表示要展示的组件 */}
          {/* Route 具有两种身份 1: 他是一个路由匹配规则 2: 他是一个占位符,表示将来匹配到的组件都放到这个位置  */}
          <Route path='/home' component={Home}></Route>
           {/* 默认情况下,路由中的规则是模糊匹配的,如果路由可以部分匹配成功,就会展示路由对应的组件 */}
           {/* 如果要匹配参数,可以在匹配规则中,使用 : 修饰符,表示这个位置匹配到的是参数 */}
          <Route path='/movie/:type/:id' component={Movie} exact></Route>
          <Route path='/about' component={About}></Route>
        </div>
      </HashRouter>
    )
  }
  
}