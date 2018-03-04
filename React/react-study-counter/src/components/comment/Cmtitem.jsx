import React from 'react'

export default class CMTItem extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div>
        <h3>评论人:{this.props.user}</h3>
        <h5>评论内容:{this.props.content}</h5>
      </div>
    )
  }

}