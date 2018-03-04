import React from 'react'

export default class CMTBox extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div>
        <label>评论人:</label><br/>
        <input type="text" ref="user"/><br/>
        <label>评论内容:</label><br/>
        <textarea name="" id="" cols="30" rows="4" ref="content"></textarea>
        <br/>
        <input type="button" value="发表评论" onClick={this.postComment}/>
      </div>
    )
  }

  postComment = () => {
    // 1. 获取评论人和评论内容
    var cmtInfo = {
      user:this.refs.user.value,
      content:this.refs.content.value
    }
    // 2, 从本地存储中获取之前的评论数组
    var list = JSON.parse(localStorage.getItem('cmts')||'[]');
    // 3. 把最新的这条数组 unshift 进入
    list.unshift(cmtInfo);
    // 4. 把最新的数组更新到本地
    localStorage.setItem('cmts',JSON.stringify(list));
    this.refs.user.value='';
    this.refs.content.value='';
    // 调用父组件传递过来的方法,更新评论列表
    this.props.reload();

  }

}