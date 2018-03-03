import React from 'react'

import CommentItem from './commentItem.jsx';

class CommentList extends React.Component {
  constructor(props) {
    super(props);

    // 定义当前评论列表组件的 私有数据
    this.state = {
      cmts: [
        {
          user: '张三',
          content: '哈哈，沙发'
        }, {
          user: '张三2',
          content: '哈哈，板凳'
        }, {
          user: '张三3',
          content: '哈哈，凉席'
        }, {
          user: '张三4',
          content: '哈哈，砖头'
        }, {
          user: '张三5',
          content: '哈哈，楼下山炮'
        }
      ]
    }
  }
  render() {
    return (
      < div >
        <h3 className='cmtlist-title'>评论列表</h3>
        {this.state.cmts.map((item, i) => {
            return (
              <CommentItem {...item} key={i} />
            )
          })}
      </div>
    );
  }
}

export default CommentList;