import React from 'react'
import CMTItem from './Cmtitem.jsx'
import CMTBox from './CmtBox.jsx'

export default class CMTlist extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      list: [
        { user: 'zs', content: '123' },
        { user: 'ls', content: 'qqq' },
        { user: 'xiaohong', content: 'www' }
      ]
    }
    
  }
  // 在组件尚未渲染的时候 调取数据
  componentWillMount(){
    this.loadCmts()
  }
  render(){
    return(
      <div>
        <h1>评论列表组件</h1>
        {/* 发表评论的组件 */}
        {/* 相对于 vue 中把父组件传递给 子组件的 普通属性和方法属性,区别对待  普通属性使用 props 来接受, 方法属性使用 this.$emit('方法名') 来接收*/}
        {/* react 中 ,只要是传递给 子组件的数据们不管是 普通类型还是方法,都可以通过 this.props 来接收 */}
        <CMTBox reload={this.loadCmts}/>
        {/* 循环渲染一些评论内容组件 */}
        {this.state.list.map((item,index)=>{
          return (
            <CMTItem {...item} key={index}/>
          )
        })}
      </div>
    )
  }

  // 从本地存储中 加载本地列表信息
  loadCmts=()=>{
      var list = JSON.parse(localStorage.getItem('cmts')||'[]');
      this.setState({
        list:list
      })
  }
  
}