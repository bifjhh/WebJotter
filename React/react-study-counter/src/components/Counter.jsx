import React from 'react'
// prop-types 包的只能比较单一,只提供了基本的数据类型用来校验
import ReactTypes from 'prop-types'

// 封装组件的目的,是为了团队协作开发更加方便, 根据不同的分工进行不同的工作,有的只负责组件封装,有的只负责调用
// 最好在组件封装的时候,为组件中的一些必要的数据,进行 类型校验 

export default class Counter extends React.Component {
  constructor(props) {
    super(props);

    // 初始化组件的私有状态,保存的是组件的私有数据
    this.state = {
      status:'ok',
      counter:props.initcount
    }

  }

  // 在封装一个组件的时候,在组件内部肯定有一些数据是必须要有的,哪怕用户没有传递初始化数据,组件内部也要有初始化的数据作为默认值的
  /* static defaultProps 固定写法 */
  static defaultProps={
    initcount:0,//如果外部没有传入 initcount ,那么就会有一个初始化的数值 0
  }

  /* static propsTypes 固定写法 创建一个固定的对象,在这个对象中,可以把 外加床底过来的数据,进行类型校验 */
  // 如果要使用类型校验,必须安装 react 提供的 第三方依赖包 prop-types (版本v15.+以上的才需要使用第三方包,v15一下的是包含在 react 内的)

  static propTypes ={
    initcount:ReactTypes.number,//使用 prop-types 包,来定义 initcount 必须为 number 类型
  }

  // 在组件即将挂载到页面上的时候执行,此时,组件尚未挂载到页面中
  // 虚拟 DOM 也尚未创建
  componentWillMount(){// 这个函数 等同于 vue 中的 created 生命周期函数
    // 在这个界面状态中,无法获取页面上的任何元素,因为 DOM 尚未创建
    // console.log(document.getElementById('myh3'));
    // console.log(this.state.status)

  }

  // 当执行到 render 函数的时候, 即将开始渲染内存中的 虚拟dom 了, 当执行完这个函数,内存中就有了一个渲染好的 虚拟DOM ,但是页面中尚未真正的显示 DOM 元素
  render() {
    // 正在 return 之前,虚拟DOM 尚未开始创建,
    // console.log(document.getElementById('myh3'));
    // 在组件运行阶段中,每次调用 render 函数的时候,页面上的 DOM元素,也是之前旧的
    // console.log(this.refs.h3&&this.refs.h3.innerHTML); // 短路运算
    
    //  不要在 render 中使用 setState,因为会陷入死循环--因为状态修改就会调用 render,而 setState 就是 修改状态的
    /* this.setState(
        {
          counter:this.state.counter+1
        }
      ) */
    return (
      <div>
        <h1>这是一个Counter 计数器</h1>
        <input id="btn" type="button" value="+1" onClick={this.increment}/>
        <h3 id="myh3" ref='h3'>当前的数量是:{this.state.counter}</h3>
      </div>
    )

    // 当 return 结束后,虚拟DOM创建好了,但是还未挂载到页面当中
  }

  increment=()=>{
    this.setState(
        {
          counter:this.state.counter+1
        }
      )
  }

  // 当组件挂载到页面上后,会进入这个生命周期函数,只要进入这个生命周期函数了,必然说明,页面上已经有了可见的 DOM元素 了,
  // 当组件执行完 componentDidMount 函数后,就进入到了运行中的状态,所以 componentDidMount 是创建就阶段的最后一个函数
  componentDidMount(){
    // 在这个函数中,我们就可以放心的操作页面上的 DOM 元素了
    // 想要操作 DOM 元素,最早只能在 componentDidMount 中进行
    // componentDidMount 相当于 vue 中的 mounted 函数
    // console.log(document.getElementById('myh3'));
   /*  document.getElementById('btn').onclick=()=>{
      // console.log('ok');
      this.setState(
        {
          counter:this.state.counter+1
        }
      )
  } */

  }

  // 从这里开始,就进入到了函数的运行阶段
  // 判断组件是否需要更新的
  shouldComponentUpdate(nextProps,nextState){
    // 1. 在 shouldComponentUpdate 中,必须要求返回一个布尔值
    // 2. 在 shouldComponentUpdate 中,如果返回值是 false,则不会继续执行后续的生命周期函数,而是直接退回了运行中的状态, 由于 render 函数并没有被调用,因此 页面并不会更新,但是组件中的 state 状态,却被修改了
    // return true;

    // 需求: 如果 state 中的 count 值是偶数,则更新页面,如果 count 值是 奇数,则不更新页面
    // 通过 this.state.couner 获取的值,是进行自加前的值 
    // console.log(nextState);
    // console.log(this.state.counter%2===1);
    // return nextState.counter%2===0?true:false;
    return true;
  }

  // 组件将要更新,但是尚未更新,在进入这个生命周期的时候,内存中的 虚拟DOM 是尚未更新的,页面上的 DOM 也是尚未更新的
  componentWillUpdate(){
    // 此时,页面上的 DOM 节点都是更新之前的.
    // console.log(document.getElementById('myh3').innerHTML);
    // console.log(this.refs.h3.innerHTML);

  }

  // 组件完成了更新,此时 state 中的数据卖虚拟DOM,页面上的DOM 都是更新后的,可以放心的操作了
  componentDidUpdate(){
    // console.log(this.refs.h3.innerHTML);
  }




}
