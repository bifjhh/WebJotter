// js 入口文件 引包

import React from 'react'
import ReactDOM from 'react-dom'

// 由于 直接引入 Ant Design 的全部包,体积过大米锁义,建议大家使用 按需导入 这样就能减少 bundle.js 的体积了
// import 'antd/dist/antd.css';

import App from './App.jsx'
// 引入全局的 css 样式

ReactDOM.render(
  (<div>
    <App />
  </div>), 
  
  document.getElementById('app')
);
