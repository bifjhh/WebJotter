import React from 'react';
// 使用 class 创建的类,通过 extends 关键字,继承了 React.Component 之后,这个类,就是一个 组件模板了
// 如果想要引用这个组件,可以这个 类名 ,以标签的形式,引入到 jsx 中 使用
class Hello2 extends React.Component {
  constructor(props) {
    // 如果使用 extends 实现了继承,那么在 constructor 内部的第一行,必须要调用 super() super() 表示 父类的构造函数
    super(props);
    // 在 constructor 中, 如果想要访问 props 属性,不能直接使用 this.props ,而是需要在 constructor
    // 的构造器参数列表中,定义 props(不固定) 参数来接收,才能正常使用 this.state ={} 固定写法, 表示当前组件实例中的 私有数据对象
    // ,如同 vue 中的 data(){return{}}
    this.state = {
      msg: '这是使用 this.state 定义的私有数据'
    }
  };
  // 在 class 声明的组件中,必须定义一个 render 函数
  render() {
    // 在 render 中,必须要 return 一个 内容 || null
    return (
      <div>
        <h3>class extends React.Component</h3>
        {/* 在 class 定义的组件中,使用外接传入的内容时,需要使用 this.props  */}
        <p>{this.props.name}</p>
        <p>{this.props.age}</p>
        {this.state.msg}
        <br/> {/*
          1. 在react 中绑定事件, 不能直接使用 onclick, 而是需要使用 驼峰命名法 onClick,
          2. 所有事件名,都需要使用驼峰命名法
          3. 在 react 的事件绑定中,需要通过 this.函数名 来吧函数的引用交给事件
        */}
        <input type="button" value="修改msg" id="btnChangeMsg" onClick={this.changeMsg}/>
      </div>
    )
  };
  changeMsg = () => {
    // 不同于传统页面, react 中,方法里的 this 指向默认是 undefined ,而不是指向方法调用者
    // 在函数内可以修改数据,但是页面上的内容却不改变, 所以 react 并不推荐使用这种方式更改 this.state.msg='changeMsg';
    // 如果要给 this.state 内的数据重新赋值,推荐使用 this.setState({}) this.setState 方法,只会修改指定的
    // 属性,没有定义修改的,并不会覆盖 this.setState 方法,也支持传递一个 function , 但是在 function 内部,必须
    // return 一个对象,(需要修改的 属性:值) 在 function 参数中, 支持传递两个参数,第一个为 prevState ,表示修改之前的
    // state 内的数据, 第二个参数为 props ,是外部 给当前组件传递过来的数据
    this.setState((prevState, props) => {
      // console.log(prevState) console.log(props)
      return {msg: 'changeMsg'};
      // this.setState 在调用的时候,内部是异步进行的

    }, () => {
      console.log(this.state);
    })
  }

}
// 只要是 组件中的 props ,其内容都是只读的.

// 将组件暴露出去
export default Hello2;

