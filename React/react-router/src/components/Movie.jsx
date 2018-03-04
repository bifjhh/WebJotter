import React from 'react'

export default class Movie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      routeParams:props.match.params
    }
  }

  render() {
    console.log(this.props.match.params);
    // 如果想要从路由规则中,提取匹配到的参数 ,可以使用 this.props.match.params.参数名  来访问
    return (

      <div>Movie---type:{this.state.routeParams.type}id:{this.state.routeParams.id}</div>
    )
  }

}