import React from 'react'

import {Spin, Alert} from 'antd';

import fetchJSONP from 'fetch-jsonp';

export default class MovieList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      movies:[], // 电影列表
      nowPage:parseInt(props.match.params.page)||1,// 当前表示第几页的数据
      movieType:parseInt(props.match.params.type)||1,// 当前表示第几页的数据
      pageSize:14,//每页显示多少条数据
      total:0,// 当前电影分类下,总共有多少条数据
      isLoading:true,// 是否显示正在加载,为 true 表示正在加载
    }
  }


  componentWillMount(){
  //   console.log('ok')
    //   fetch('http://vue.studyit.io/api/getlunbo').then((response)=>{
    //     // 当时用 fetch 获取数据的时候,第一个 .then 中,是获取不到数据的
    //     // 第一个 .then 中拿到的是 Response 对象,我们可以用 Response.json()得到一个 promise
    //     // console.log(response)
    //     return response.josn()
    //  }).then(data=>{
    //    console.log(data);
  //  })

    this.loadMovieListByTypeAndPage();
  }

  render() {
    return (
      <div>MovieList-- 
        {this.props.match.params.type}---
        {this.props.match.params.page}
        {this.renderList()}
        
      </div>
    )
  } 

  // 根据电影类型和页码,获取电影数据
  loadMovieListByTypeAndPage=()=>{
    
  const state = this.state.pageSize*(this.state.nowPage-1)

  const url = `https://api.douban.com/v2/movie/${this.state.movieType}?start=${state}&count=${this.state.pageSize}`

    // 默认情况下 fetch 是收到跨域的限制的,使用第三方包  fetch-jsonp来发送 JSONP 请求, 使用方法和 内置的 fetch 完全一致
    // fetch('https://api.douban.com/v2/movie/in_theaters').then(res=>res.json()).then(data=>{
    //   console.log(data);
    // })
    // fetchJSONP('https://api.douban.com/v2/movie/in_theaters').then(res=>res.json()).then(data=>{
    //   console.log(data);
    //   console.log('ok')
    //   if(data){
    //     this.setState({
    //       isLoading:false,
    //       movies: data.subjects, // 为电影列表重新赋值
    //       total: data.total // 把总条数，保存到 state 上
    //     })
    //   }
    // })

    
  }

  // 渲染电影列表方法
  renderList=()=>{
    if(this.state.isLoading){
      return(
        <Spin tip="Loading...">
          <Alert
            message="正在加载...."
            description="精彩内容马上呈现~~~"
            type="info"
          />
        </Spin>
      )
    }else{
      <h1>加载完成</h1>
    }
  }

}

// 在 react 中,可以使用 fetch API 来获取数据, fetch API 是基于 promise 封装的


