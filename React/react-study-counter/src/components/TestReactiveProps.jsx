import React from 'react'

// 父组件
export default class Parent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msg:'这是父组件身上的msg'
    }
  }

  render() {
    return (
      <div>
        <h1>这是父组件</h1>
        <input type="button" value="修改父组件msg值" onClick={this.changeMsg}/>
        <hr/>
        <Son Pmsg={this.state.msg}/>
      </div>
    )
  }

  changeMsg=()=>{
    this.setState({
      msg:'改变后的'
    })
  }

}

// 子组件
class Son extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div>
        <h3>这是子组件--{this.props.Pmsg}</h3>
      </div>
    )
  }

  // 组件将要接收外接传递过来的新的 props 属性值
  // 当子组件第一次被渲染到页面上的时候,并不会触发这个函数
  // 只有当 父组件中,重新修改了 传递给子组件的 props 数组之后,才会触发 componentWillReceiveProps 
  componentWillReceiveProps(nextProps){
    // console.log('触发了');
    // 在 componentWillReceiveProps 被触发的时候,使用 this.props 获取到的属性值,依然是没有更新过的属性值
    console.log(this.props.Pmsg+'----'+nextProps.Pmsg);
  }

}
