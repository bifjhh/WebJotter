// js 入口文件 引包

import React from 'react'
import ReactDOM from 'react-dom'

import Counter from './components/Counter.jsx'


ReactDOM.render(
  /* 规定,每个用户在使用组件的时候,必须传递一个默认的数量值,作为 组件初始化的数据 */
  (<div>
    < Counter initcount={3}/>
  {/* 
    <hr />
    < Counter initcount={2}/> */}
  </div>), 
  
  document.getElementById('app')
);
