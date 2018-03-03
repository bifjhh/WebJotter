// class 实现面向对象的新形式

import React from 'react';

function Hello(props) {
  return <div>
    <h1>这是在Hello.js组件中定义的元素 --- {props.name}</h1>
  </div>
}

// 把创建的组件暴露出去
export default Hello;