// js 入口文件

// 引包 

import React from 'react'
import ReactDOM from 'react-dom'


// 在使用外部组件之前,先导入组件
import Hello from './components/Hello.jsx';
import Hello2 from './components/Hello2.jsx';
// 以上两种创建组件的方式,有着本质上的区别,其中, 
// 使用 function 构造函数创建的组件,内部没有 state 私有数据,只有一个 props 用来接收外界传递来的属性
// 使用 class 关键字,创建的组件内部出了有 this.props 这个只读属性外,还有一个专门用来存储 私有数据的 this.state ,state 是可读写的
// 基于上面两种区别-- 区分 使用 function 创建的组件,叫做[无状态组件];使用 class 创建的组件叫做[有状态组件]
// 两者最本质的区别,是有无 state 属性,而且 class 创建的组件,有自己的声明周期函数.


ReactDOM.render(
  // <Hello />,//使用function 创建的组件 首字母必须是大写
  <Hello2 name="bifjhh" age={24}/>,
  document.getElementById('app')
);
