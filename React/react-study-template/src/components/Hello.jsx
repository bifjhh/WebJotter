import React from 'react';

// 使用 js 语法 ,创建 虚拟DOM 元素
export default function Hello(props) {
  // 在 function 定义的组件中,如果想要使用 props ,必须先定义,否则是无法使用的 但是在 class 定义的组件中,可以直接通过
  // this.props 来直接访问,不需要预先接收 props
  return (
    <div>
      <h1>Hello function Component</h1>
    </div>
  );
}
