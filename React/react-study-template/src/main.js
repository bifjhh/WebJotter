// js 入口文件 引包

import React from 'react'
import ReactDOM from 'react-dom'

// 引入评论列表组件
import CommentList from './components/comment1/commentList.jsx';
// 引入样式
import './css/commentList.scss'

ReactDOM.render(
  < CommentList />, 
  document.getElementById('app')
);
