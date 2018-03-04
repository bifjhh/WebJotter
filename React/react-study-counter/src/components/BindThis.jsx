import React from 'react'

export default class BindThis extends React.Component{

    constructor(props) {
      super(props)
      
      this.state={
         mag:'默认的'
      }

      // 绑定 this 并传参的方式 2:
      // 当使用 bind 改变了 this指向后,bind 函数调用的结果,有一个返回值,就是被改变 this 指向 后的函数的引用
      // bind 不会修改 原函数的 this 指向
      this.changeMsg2=this.changeMsg2.bind(this);

    }

    render(){
      return(
        <div>
          <h1>绑定this并传参的几种方式</h1>
          {/*  
          bind 的作用: 为前面的函数,修改函数内部的 this 指向,让函数内部的 this 指向 bind 参数列表中的 第一个参数
          */}
          {/* 
          bind 和 call() apply() 之间的区别
          call() apply() 修改完 this 指向后,会立即调用前面的函数,但是 bind 只是修改 this的指向,并不会调用  
          */}
          {/* 
          bind 中的第一个参数,是用来修改 this指向 的,第一个参数后面的所有参数,都会当做将来调用 前面的函数的时候的参数传递进去 
          */}
          {/* 
          方式一,在事件处理函数中,直接使用 bind 绑定 this 并传递参数          
          */}
          <input type="button" value="绑定this并传参-1" onClick={this.changeMsg1.bind(this)}/>
          {/* 方式二 */}
          <input type="button" value="绑定this并传参-2" onClick={this.changeMsg2}/>
          {/* <input type="button" value="绑定this并传参-3" onClick={()=>{this.changeMsg3()}}/> */}
          <input type="button" value="绑定this并传参-3" onClick={()=>{this.changeMsg3('222')}}/>
          <hr/>
          <h3>{this.state.mag}</h3>
          {/* 在vue中,有 v-model 指令来实现数据双向绑定,但 react 中没有指令,也并不支持 双向数据绑定 */}
          {/* react 只支持吧数据从 state 传输到 页面,无法自动实现数据从 页面 传输到 state 中, react 不支持数据的 自动逆向传输 */}
          {/* 如果为表单元素提供了 value 属性绑定,那么必须同时为 表单元素 绑定 readOnly(表示这个元素是只读的属性) 或者一个 onChange (表示这个可以被修改,但是要自己定义自己修改的逻辑)事件 */}
          <input type="text" value={this.state.mag} ref='txt' onChange={this.txtChanged} />
        </div>
      )
    }
    // 为文本框绑定 Changed 事件
    txtChanged=(event)=>{
      // console.log('ok');
      // 如果要想让 文本框触发 onChange 事件,同时吧文本框最新的值保存到 state 中,那么,我们需要手动调用 this.setState 改变
      // 获取文本框的文本的三种方式 1. id 2. ref 3. 使用 事件对象的 event 来获取, event 表示触发这个事件的源对象,得到的是一个原生的 JS DOM 对象
      // console.log(this.refs.txt.value);
      // console.log(event.target.value);
      this.setState({
        mag:event.target.value
      })
    }

    changeMsg1(){
      // 普通方式声明的方法,是无法获取到this的
      // console.log(this)
      
    }
    changeMsg2(){
      // 普通方式声明的方法,是无法获取到this的
      // console.log(this)
      
    }
    // changeMsg3(){
    //   // 普通方式声明的方法,是无法获取到this的
    //   console.log(this)
      
    // }
    changeMsg3=(str)=>{
      // 普通方式声明的方法,是无法获取到this的
      console.log(str);
      console.log(this);
      
    }
    

}