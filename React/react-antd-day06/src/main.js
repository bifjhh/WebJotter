// js 入口文件 引包

import React from 'react'
import ReactDOM from 'react-dom'

import 'antd/dist/antd.css';

import App from './App.jsx'
// 引入全局的 css 样式

ReactDOM.render(
  (<div>
    <App />
  </div>), 
  
  document.getElementById('app')
);
