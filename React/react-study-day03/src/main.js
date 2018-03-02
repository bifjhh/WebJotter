// js 打包入口文件

// 1. 在 react 学习中,需要安装两个包 react react-dom
// 1.1 react 是专门用来创建 React 组建,生命周期这些东西的
// 1.2 react-dom 里面主要封装了和 DOM 操作相关的包,比如 要把组件渲染到页面上
console.log('hellole React');
import React from 'react';
import ReactDOM from 'react-dom';

// 2. 在 react 中,如果要创建 DMO 元素,只能使用 react 提供的 js API 来创建,不能直接像在 vue 中那样,手写 HTML 元素

// React.createElement() 方法,用于创建 虚拟DOM 对象,他接受 3个及以上的参数
// 参数1. 是个string 类型的参数,表示要创建的元素的类型
// 参数2. 是一个 属性对象 ,表示创建的这个元素上有哪些属性,
// 参数3. 是从第三个位置开始,后面可以放好多的 虚拟DOM 对象,这些参数,表示当前元素的子节点
// <div title="this is a div " id="mydiv">这是一个div</div>

// var myDiv = React.createElement('div', {title : 'this is a div ' ,id : 'mydiv',},'这是一个div');
// 由于 react官方 发现, 如果直接让用户手写 js 代码创建元素,用户会疯掉的,然后,用户就开始寻找新的前端框架了,于是
// react 就提出了一套 JSX 语法规范, 能够让我们在 js 文件中,书写类似于 HTML 那样的代码.快速定义 虚拟DOM 
// 我们写了 JSX 这样的标签，也并不是直接把 我们的 HTML 标签渲染到页面上，而是先转换成 React.createElement 这样的JS代码，再渲染到页面中；（JSX是一个对程序员友好的语法糖）
// var myDiv = <div>
//   <h1>hello React - JSX{1 + 1}</h1>
// </div>
// class Hello extends React.Component{
//   render(){
//     return(
//       <div><h1>Hello {this.props.name}</h1></div>
//     )
//   }
// }

// 注意：React在解析所有的标签的时候，是以标签的首字母来区分的，如果标签的首字母是小写，那么就按照 普通的 HTML 标签来解析，如果 首字母是大写，则按照 组件的形式去解析渲染
// 结论：组件的首字母必须是大写
// function Hello(props) {
//   // 在组件中，如果想要使用外部传递过来的数据，必须，显示的在 构造函数参数列表中，定义 props 属性来接收；
//   // 通过 props 得到的任何数据都是只读的，不能从新赋值
//   // props.name = '000'
//   return <div>
//     <h1>这是在Hello组件中定义的元素 --- {props.name}</h1>
//   </div>
// }


// var name = 'zs' var age = 20
var person = {
  name: 'react',
  age: 22,
  gender: '男',
  address: '北京'
}

// 引入外部组件
import Hello from './components/Hello.jsx';
import Class_study from './class_study.js';
// ReactDOM.render() 参数一: 要渲染的 DOM 元素, 参数二: 要渲染到那个位置 
// 注意: 第二个参数和 vue 不同,不接受 "#app" 这样的字符串,而是需要传递一个原生的 DOM 对象
ReactDOM.render(
  < Hello {...person}/>,
  document.getElementById('app'),
);
// 注意： ...Obj  语法，是 ES6中的属性扩散， 表示，把这个对象上的所有属性，展开了，放到这个位置